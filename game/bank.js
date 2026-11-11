/*
 * Beat Your Best: question bank.
 * ------------------------------------------------------------------
 * Builds window.GAME_BANK from two sources:
 *   1. The checked steps of every library activity (mcq, select-all, sort, order).
 *      These are converted automatically, so editing an activity updates the game.
 *   2. window.GAME_EXTRA (game/questions-extra.js): numerical, true/false with
 *      reasoning, matching, predict and scenario questions.
 * Every question ends up with:
 *   refs   [{faq, ids}]          verbatim source blocks used as the explanation
 *   src    [{disc, pages, title}] internal reference to the PDF thread(s)
 *   origin 'activity:<faq>/<step>' or 'new'
 * Nothing here writes engineering content; it only reshapes what is already reviewed.
 */
(function () {
  'use strict';
  const REG = () => (window.FAQ_REGISTRY || []);
  const faqById = id => REG().find(f => f.id === id);

  function threadsOf(faq) {
    const s = faq.source;
    return [Object.assign({ discussion: faq.discussion, pages: faq.pages }, s), ...(s.threads || [])];
  }
  const kindOf = a => /academic/i.test(a || '') ? 'academic' : 'student';
  /* All blocks of an activity, tagged with author kind and the thread they came from. */
  function blocksOf(faq) {
    const out = [];
    threadsOf(faq).forEach(t => {
      const th = { disc: t.discussion, pages: t.pages, title: t.title };
      if (t.question) t.question.blocks.forEach(b => out.push({ b, who: t.question.author, kind: 'student', th }));
      if (t.answer) t.answer.blocks.forEach(b => out.push({ b, who: t.answer.author, kind: 'academic', th }));
      (t.followUps || []).forEach(f => f.blocks.forEach(b => out.push({ b, who: f.author, kind: kindOf(f.author), th })));
      (t.annotations || []).forEach(b => out.push({ b, who: b.label, kind: 'annotation', th }));
    });
    return out;
  }
  function srcFor(refs) {
    const seen = new Map();
    refs.forEach(r => {
      const f = faqById(r.faq); if (!f) return;
      blocksOf(f).filter(x => r.ids.includes(x.b.id)).forEach(x => {
        const k = x.th.disc; if (!seen.has(k)) seen.set(k, x.th);
      });
    });
    return [...seen.values()];
  }

  /* ---- level heuristic for converted activity steps (provisional, for review) ---- */
  function levelOf(step) {
    if (step.level) return step.level;                                   // explicit override in the content file
    if (step.branchOnly) return 1;
    if (step.type === 'order') return 3;                                 // reconstructing a whole method
    if (step.type === 'mcq' && step.multi) return 3;                     // several principles at once
    if (step.type === 'sort' && step.items.length >= 5) return 3;
    if (step.stage === 'feedback' && (step.figure || /solution|exam|question \d/i.test(step.title || ''))) return 3; // reading a real worked solution
    if (step.stage === 'predict' || step.stage === 'explore') return 1;
    return 2;
  }

  function fromActivity(faq) {
    const out = [];
    const m = faq.meta || {};
    const blocks = blocksOf(faq);
    const figure = id => { const x = blocks.find(y => y.b.id === id && y.b.type === 'figure'); return x ? x.b : null; };
    // Steps that lean on the previous step ("these integrals", "this solution") carry that step's
    // prompt and figure with them, so they still make sense when drawn on their own.
    const DEPENDS = /\b(also|these|that tell|same shortcut|instead|so in|this question|this solution|now you)\b/i;
    let prev = null, lastFig = null;
    (faq.steps || []).forEach(step => {
      if (step.figure) lastFig = step.figure;
      if (!['mcq', 'sort', 'order'].includes(step.type)) return;
      const plain = (step.prompt || '').replace(/<[^>]+>/g, '');
      const dep = prev && DEPENDS.test(plain);
      const follows = dep ? prev.prompt : null;
      const figId = step.figure || (dep ? lastFig : null);
      prev = step;
      let refIds, q;
      const base = {
        id: `${faq.id}--${step.id}`, level: levelOf(step), topic: m.topic, concepts: (m.concepts || []).slice(),
        heading: (faq.card && faq.card.heading) || m.title, focus: step.topic || step.title || '',
        context: step.html || null, follows, figure: figId ? figure(figId) : null,
        origin: `activity:${faq.id}/${step.id}`, faq: faq.id
      };
      if (step.type === 'mcq') {
        if (!step.options.some(o => o.correct)) return; // open prediction with no keyed answer
        refIds = step.refs || [...new Set(step.options.flatMap(o => o.refs || []))];
        q = Object.assign(base, {
          type: step.multi ? 'multi' : 'mcq', prompt: step.prompt,
          options: step.options.map(o => ({ id: o.id, html: o.html, correct: !!o.correct, refs: o.refs || null }))
        });
      } else if (step.type === 'sort') {
        refIds = step.refs || [];
        q = Object.assign(base, { type: 'sort', prompt: step.prompt, categories: step.categories, items: step.items.map((it, i) => ({ id: 'i' + i, html: it.html, cat: it.cat })) });
      } else {
        refIds = step.refs || [];
        q = Object.assign(base, { type: 'order', prompt: step.prompt, items: step.items });
      }
      q.refs = [{ faq: faq.id, ids: refIds }];
      out.push(q);
    });
    return out;
  }

  function fromExtra(q) {
    const firstFaq = faqById(q.refs[0].faq);
    return Object.assign({
      origin: 'new', faq: q.refs[0].faq,
      heading: firstFaq ? ((firstFaq.card && firstFaq.card.heading) || firstFaq.meta.title) : '',
      focus: ''
    }, q);
  }

  const bank = [];
  REG().slice().sort((a, b) => (a.order || 0) - (b.order || 0)).forEach(f => bank.push(...fromActivity(f)));
  (window.GAME_EXTRA || []).forEach(q => bank.push(fromExtra(q)));
  bank.forEach(q => { q.src = srcFor(q.refs); q.status = 'awaiting-review'; });

  /* Integrity check: every ref must resolve to a real block. Reported in the reviewer view. */
  const problems = [];
  bank.forEach(q => q.refs.forEach(r => {
    const f = faqById(r.faq);
    if (!f) { problems.push(`${q.id}: unknown activity ${r.faq}`); return; }
    const ids = new Set(blocksOf(f).map(x => x.b.id));
    r.ids.forEach(id => { if (!ids.has(id)) problems.push(`${q.id}: block ${r.faq}/${id} not found`); });
    if (!r.ids.length) problems.push(`${q.id}: no source blocks referenced`);
  }));

  window.GAME_BANK = { questions: bank, problems, blocksOf, threadsOf, faqById };
})();
