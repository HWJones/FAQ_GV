/*
 * Beat Your Best: game engine.
 * ------------------------------------------------------------------
 * Single player. Students compete only with their own previous attempts.
 * No accounts, no network calls, no leaderboards. Progress lives in this
 * browser's localStorage under KEY and can be cleared from "My progress".
 *
 * Scoring (see docs/GAME.md): every question is worth points by level
 * (Foundation 100, Application 150, Reasoning 200), one attempt, partial credit
 * where the question has parts. No timer and no speed bonus.
 */
(function () {
  'use strict';

  /* ================= configuration ================= */
  const CFG = Object.assign({ libraryUrl: 'index.html' }, window.GAME_CONFIG || {});
  const KEY = 'beat-your-best-v1';
  const LEVELS = { 1: { name: 'Foundation', pts: 100 }, 2: { name: 'Application', pts: 150 }, 3: { name: 'Reasoning', pts: 200 } };
  const INTERVAL_DAYS = [0, 0, 1, 3, 7, 16];          // Leitner boxes 1–5 (box 1 = next session)
  const RECOVERED_AFTER = 5;                          // leaves the queue after a correct answer in box 5
  const MASTERY_WINDOW = 5;
  const CHALLENGES = [
    { id: 'shear-flow', title: 'Shear Flow Sprint', topics: ['t3'], mix: { 1: 3, 2: 3, 3: 2 }, blurb: 'Basic shear flow, q₀, resultants and the shear centre.' },
    { id: 'torsion', title: 'Torsion & Multi-Cell', topics: ['t1', 't2', 't5', 't7'], mix: { 1: 3, 2: 3, 3: 2 }, blurb: 'Open and closed sections, enclosed area, multi-cell tubes and warping.' },
    { id: 'sections', title: 'Sections & Idealisation', topics: ['pre', 't4'], mix: { 1: 3, 2: 3, 3: 2 }, blurb: 'Second moments of area, principal axes and boom idealisation.' },
    { id: 'displacements', title: 'Displacements & Tapered Beams', topics: ['t6', 't8'], mix: { 1: 3, 2: 3, 3: 2 }, blurb: 'Virtual work, unit loads and tapered beams.' },
    { id: 'module', title: 'Whole Module Mix', topics: null, mix: { 1: 4, 2: 4, 3: 2 }, blurb: 'Ten questions from across Structures 3.' }
  ];
  const QUICK_MIX = { 1: 2, 2: 2, 3: 1 };
  const FINAL_MIX = { 1: 6, 2: 8, 3: 6 };
  const TOPIC_MIX = { 1: 3, 2: 4, 3: 3 };

  const T = window.FAQ_TAXONOMY;
  const BANK = window.GAME_BANK;
  const Qs = BANK.questions;
  const qById = id => Qs.find(q => q.id === id);
  const TOPICS = T.subjects[0].modules[0].topics;
  const topicLabel = id => (TOPICS.find(t => t.id === id) || { label: id }).label;
  const topicShort = id => topicLabel(id).replace(/^Topic \d+: /, '');
  const conceptLabel = id => (T.concepts[id] || { label: id }).label;
  const app = document.getElementById('app');

  /* ================= storage ================= */
  const blank = () => ({ v: 1, attempts: [], best: {}, seen: {}, mastery: {}, tiers: {}, recovery: {}, recovered: 0 });
  let S;
  try { S = Object.assign(blank(), JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) { S = blank(); }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked: progress lasts for this visit */ } }

  /* ================= helpers ================= */
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat(Infinity)) if (kid != null && kid !== false) el.append(kid.nodeType ? kid : document.createTextNode(kid));
    return el;
  }
  const text = html => { const d = document.createElement('div'); d.innerHTML = html || ''; return d.textContent.replace(/\s+/g, ' ').trim(); };
  /* Plain text for native <select> options, keeping simple sub/superscripts readable (q_b → qᵦ is not in Unicode, so use q_b). */
  const SUP = { 2: '²', 3: '³', 4: '⁴', '−': '⁻', '-': '⁻' }, SUB = { 0: '₀', 1: '₁', 2: '₂', x: 'ₓ', y: 'ᵧ' };
  const plain = html => text(String(html || '')
    .replace(/<sup>([^<]{1,3})<\/sup>/g, (m, t) => [...t].every(c => SUP[c]) ? [...t].map(c => SUP[c]).join('') : '^' + t)
    .replace(/<sub>([^<]{1,4})<\/sub>/g, (m, t) => [...t].every(c => SUB[c]) ? [...t].map(c => SUB[c]).join('') : '_' + t));
  const clip = (s, n) => s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s;
  const pct = (a, b) => b ? Math.round(100 * a / b) : 0;
  const mean = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;
  const DAY = 864e5;
  function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function shuffle(arr, r) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const maxPoints = qs => qs.reduce((s, q) => s + LEVELS[q.level].pts, 0);
  const mixMax = mix => Object.entries(mix).reduce((s, [l, n]) => s + LEVELS[l].pts * n, 0);
  const mixCount = mix => Object.values(mix).reduce((a, b) => a + b, 0);
  const mixText = mix => Object.entries(mix).filter(([, n]) => n).map(([l, n]) => `${n} ${LEVELS[l].name}`).join(', ');
  const TYPE = q => ({ mcq: q.kind === 'predict' ? 'Predict the outcome' : q.kind === 'scenario' ? 'Scenario' : 'Multiple choice', multi: 'Select all that apply', tf: 'True or false, with reasoning', order: 'Sequencing', match: 'Matching', numeric: 'Numerical', sort: 'Classify' })[q.type];
  const TYPE_KEY = q => q.type === 'mcq' && q.kind ? q.kind : q.type;
  const ICON = {
    src: '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 2h8v6H5l-3 2z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    add: '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1.5v9M1.5 6h9" stroke="currentColor" stroke-width="1.6"/></svg>',
    star: '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z" fill="currentColor"/></svg>'
  };
  const provSrc = who => h('span', { class: 'prov src', html: ICON.src + ' Original discussion · ' + who });
  const provAdd = txt => h('span', { class: 'prov add', html: ICON.add + ' ' + (txt || 'Added for revision · awaiting review') });

  /* ================= source rendering ================= */
  function renderBlock(b, hl) {
    if (b.type === 'figure') return h('figure', { class: hl ? 'hl' : null }, h('img', { src: b.src, alt: b.alt, loading: 'lazy' }), h('figcaption', {}, b.caption));
    if (b.type === 'math') return h('div', { class: 'math' + (hl ? ' hl' : ''), role: 'math', 'aria-label': b.label, html: b.html });
    if (b.type === 'note') return h('p', { class: 'note', html: b.html });
    return h('p', { class: hl ? 'hl' : null, html: b.html });
  }
  function quote(refs) {
    const groups = [];
    refs.forEach(r => {
      const f = BANK.faqById(r.faq); if (!f) return;
      BANK.blocksOf(f).filter(x => r.ids.includes(x.b.id)).forEach(x => {
        const last = groups[groups.length - 1];
        if (last && last.who === x.who && last.faq === r.faq) last.items.push(x); else groups.push({ who: x.who, kind: x.kind, faq: r.faq, items: [x] });
      });
    });
    if (!groups.length) return null;
    return h('div', { class: 'quotes' }, groups.map(g => h('div', { class: 'source' },
      provSrc(g.kind === 'annotation' ? g.who.toLowerCase() : g.kind === 'academic' ? 'academic response (verbatim)' : 'student question (anonymised)'),
      g.items.map(x => renderBlock(x.b)))));
  }
  const srcLine = q => q.src.map(s => `Discussion #${s.disc}, PDF p. ${s.pages}`).join(' · ');

  let dlg;
  function openSource(q, opener) {
    if (!dlg) {
      dlg = h('dialog', { class: 'src-dialog', 'aria-labelledby': 'dlg-title' });
      document.body.append(dlg);
      dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
      dlg.addEventListener('close', () => { if (dlg._opener) dlg._opener.focus(); });
    }
    dlg._opener = opener || null;
    dlg.innerHTML = '';
    const discs = new Set(q.src.map(s => String(s.disc)));
    const hl = new Set(q.refs.flatMap(r => r.ids));
    const parts = [];
    q.refs.forEach(r => {
      const f = BANK.faqById(r.faq);
      BANK.threadsOf(f).filter(t => discs.has(String(t.discussion))).forEach(t => {
        if (parts.some(p => p.disc === t.discussion)) return;
        const block = (title, author, blocks, kind) => h('section', { class: 'thread-part' }, h('h4', {}, title),
          h('div', { class: 'source' }, provSrc(kind === 'academic' ? 'academic response (verbatim)' : 'student question (anonymised)'),
            h('div', { class: 'who' }, author), blocks.map(b => renderBlock(b, hl.has(b.id)))));
        const kind = a => /academic/i.test(a || '') ? 'academic' : 'student';
        parts.push({ disc: t.discussion, el: h('section', { class: 'thread' },
          h('h3', {}, t.title, h('span', { class: 'thread-ref' }, ` · #${t.discussion}, PDF pages ${t.pages}`)),
          t.question ? block('Question', t.question.author, t.question.blocks, 'student') : null,
          t.answer ? block('Answer', t.answer.author, t.answer.blocks, 'academic') : null,
          (t.followUps || []).map(fu => block(kind(fu.author) === 'academic' ? 'Follow-up answer' : 'Follow-up question', fu.author, fu.blocks, kind(fu.author))),
          (t.annotations || []).length ? block('Annotations in the posted solution', 'Solution', t.annotations, 'academic') : null) });
      });
    });
    dlg.append(
      h('div', { class: 'dlg-head' },
        h('div', {}, h('div', { class: 'eyebrow' }, 'Source for question ' + q.id), h('h2', { id: 'dlg-title' }, 'Original discussion')),
        h('button', { class: 'btn', onclick: () => dlg.close() }, 'Close')),
      h('div', { class: 'dlg-body' },
        h('p', { class: 'thread-meta' }, 'Structures 3 discussion board, 2023/24. Student names removed. Academic wording unchanged. Passages used for this question are highlighted.'),
        parts.map(p => p.el)));
    dlg.showModal();
    const first = dlg.querySelector('.hl'); if (first) first.scrollIntoView({ block: 'center' });
  }

  /* ================= selection ================= */
  /* Draw `mix` (level -> count) from `pool`. Prefers questions not seen recently, spreads topics
     and activities, and never repeats a question within a set. Returns them ordered by level. */
  function draw(pool, mix, seed, avoid) {
    const r = rng(seed);
    avoid = avoid || new Set();
    const chosen = [];
    const usedFaq = {};
    for (const lvl of [1, 2, 3]) {
      const need = mix[lvl] || 0; if (!need) continue;
      let cands = shuffle(pool.filter(q => q.level === lvl && !chosen.includes(q)), r);
      const score = q => (avoid.has(q.id) ? 4 : 0) + ((S.seen[q.id] || {}).n || 0) * 0.5 + (usedFaq[q.faq] || 0) * 2.5 + r();
      for (let i = 0; i < need && cands.length; i++) {
        cands.sort((a, b) => score(a) - score(b));
        const q = cands.shift();
        chosen.push(q); usedFaq[q.faq] = (usedFaq[q.faq] || 0) + 1;
      }
    }
    return chosen;
  }
  const poolFor = topics => Qs.filter(q => q.topic !== 'info' || !topics).filter(q => !topics || topics.includes(q.topic));
  /* Final challenge: stratified across topics within each level. */
  function drawStratified(mix, seed) {
    const r = rng(seed);
    const out = [];
    for (const lvl of [1, 2, 3]) {
      const byTopic = {};
      shuffle(Qs.filter(q => q.level === lvl && q.topic !== 'info'), r).sort((a, b) => ((S.seen[a.id] || {}).n || 0) - ((S.seen[b.id] || {}).n || 0))
        .forEach(q => (byTopic[q.topic] = byTopic[q.topic] || []).push(q));
      const order = shuffle(Object.keys(byTopic), r);
      let n = mix[lvl], i = 0;
      while (n > 0 && order.some(t => byTopic[t].length)) {
        const t = order[i++ % order.length];
        const q = byTopic[t].find(x => !out.some(o => o.faq === x.faq && o.level === lvl)) || byTopic[t][0];
        if (q) { byTopic[t].splice(byTopic[t].indexOf(q), 1); out.push(q); n--; }
      }
    }
    return out;
  }

  /* ================= progress model ================= */
  const keyConcepts = q => (q.concepts || []).slice(0, 3);
  function record(q, frac, mode) {
    const now = Date.now();
    const s = S.seen[q.id] || (S.seen[q.id] = { n: 0 });
    s.n++; s.last = now; s.lastFrac = frac;
    keyConcepts(q).forEach(c => { const m = S.mastery[c] || (S.mastery[c] = []); m.push(frac); if (m.length > MASTERY_WINDOW) m.shift(); });
    const tt = S.tiers[q.topic] || (S.tiers[q.topic] = { 1: [], 2: [], 3: [] });
    tt[q.level].push(frac); if (tt[q.level].length > MASTERY_WINDOW) tt[q.level].shift();
    if (mode !== 'recovery' && frac < 0.8) {
      keyConcepts(q).slice(0, 2).forEach(c => {
        const e = S.recovery[c];
        if (!e) S.recovery[c] = { box: 1, due: now, q: q.id, missed: 1, added: now };
        else { e.box = 1; e.due = now; e.q = q.id; e.missed++; }
      });
    }
    save();
  }
  function recoveryResult(concept, frac) {
    const e = S.recovery[concept]; if (!e) return null;
    if (frac >= 0.8) {
      if (e.box >= RECOVERED_AFTER) { delete S.recovery[concept]; S.recovered++; save(); return { recovered: true }; }
      e.box++; e.due = Date.now() + INTERVAL_DAYS[e.box] * DAY;
    } else { e.box = 1; e.due = Date.now(); e.missed++; }
    save();
    return { box: e.box, due: e.due };
  }
  const dueItems = () => Object.entries(S.recovery).filter(([, e]) => e.due <= Date.now()).sort((a, b) => a[1].box - b[1].box || a[1].due - b[1].due);
  function masteryOf(c) {
    const m = S.mastery[c] || [];
    if (!m.length) return { key: 'none', label: 'Not tried yet', v: null };
    const v = mean(m);
    if (m.length >= 3 && v >= 0.8) return { key: 'secure', label: 'Secure', v };
    if (v >= 0.5) return { key: 'developing', label: 'Developing', v };
    return { key: 'work', label: 'Needs work', v };
  }
  function tierEarned(topic, lvl) { const a = ((S.tiers[topic] || {})[lvl]) || []; return a.length >= 3 && mean(a) >= 0.8; }
  const allTopics = () => TOPICS.filter(t => t.id !== 'info' && Qs.some(q => q.topic === t.id));
  const milestones = () => { let n = 0, of = 0; allTopics().forEach(t => [1, 2, 3].forEach(l => { if (Qs.some(q => q.topic === t.id && q.level === l)) { of++; if (tierEarned(t.id, l)) n++; } })); return { n, of }; };
  const conceptsInBank = () => [...new Set(Qs.flatMap(keyConcepts))].filter(c => T.concepts[c]);

  /* ================= marking ================= */
  function parseNumber(raw) {
    let s = String(raw || '').trim().replace(/[−–—]/g, '-').replace(/[\s,  ]/g, '');
    const sup = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', '⁺': '+' };
    s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g, c => sup[c]);
    const m = s.match(/^([-+]?(?:\d+\.?\d*|\.\d+))(?:(?:[x×*·]10\^?([-+]?\d+))|(?:e([-+]?\d+)))?$/i);
    if (!m) return null;
    return parseFloat(m[1]) * Math.pow(10, parseInt(m[2] || m[3] || '0', 10));
  }
  const within = (v, q) => q.tol.abs != null ? Math.abs(v - q.answer) <= q.tol.abs : Math.abs(v - q.answer) <= q.tol.rel * Math.abs(q.answer);
  function fmt(n) {
    if (Math.abs(n) >= 1e6) { const e = Math.floor(Math.log10(Math.abs(n))); return `${+(n / 10 ** e).toPrecision(4)} × 10<sup>${e}</sup>`; }
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace('-', '−');
  }

  /* ================= question UIs ================= */
  /* Each builder returns { el, value(), mark(value) -> {frac, detail}, reveal(value, result) } */
  const builders = {
    mcq(q, r, multi) {
      const name = 'opt-' + q.id;
      const opts = shuffle(q.options, r);
      const fs = h('fieldset', { class: 'options' }, h('legend', { class: 'sr-only' }, 'Answer options'));
      if (multi) fs.append(h('p', { class: 'hint' }, 'Select all that apply. Each wrong choice cancels a right one.'));
      const rows = opts.map((o, i) => {
        const inp = h('input', { type: multi ? 'checkbox' : 'radio', name, value: o.id, id: `${name}-${i}` });
        const lab = h('label', { class: 'opt', for: inp.id }, inp, h('span', { html: o.html }), h('span', { class: 'mark' }));
        fs.append(lab); return { o, inp, lab };
      });
      return {
        el: fs,
        value: () => { const v = rows.filter(x => x.inp.checked).map(x => x.o.id); return v.length ? v : null; },
        incomplete: multi ? 'Choose at least one option.' : 'Choose an option.',
        mark: v => {
          if (!multi) return { frac: q.options.find(o => o.id === v[0]).correct ? 1 : 0 };
          const nC = q.options.filter(o => o.correct).length;
          const tp = q.options.filter(o => o.correct && v.includes(o.id)).length;
          const fp = q.options.filter(o => !o.correct && v.includes(o.id)).length;
          return { frac: Math.max(0, (tp - fp) / nC), detail: `${tp} of ${nC} correct option${nC > 1 ? 's' : ''} chosen${fp ? `, ${fp} incorrect` : ''}.` };
        },
        reveal: v => {
          fs.classList.add('locked');
          rows.forEach(x => {
            x.inp.disabled = true;
            const picked = v.includes(x.o.id);
            if (picked || x.o.correct) {
              const good = picked === x.o.correct;
              x.lab.classList.add(x.o.correct ? 'is-correct' : 'is-wrong');
              x.lab.querySelector('.mark').textContent = x.o.correct ? (picked ? 'Correct' : multi ? 'Missed' : 'Correct answer') : 'Your choice';
              if (!good && !picked) x.lab.classList.add('missed');
            }
          });
        },
        explainRefs: v => {
          const ids = new Set(q.refs[0].ids);
          q.options.filter(o => o.correct || v.includes(o.id)).forEach(o => (o.refs || []).forEach(id => ids.add(id)));
          return [{ faq: q.refs[0].faq, ids: [...ids] }];
        }
      };
    },
    multi(q, r) { return builders.mcq(q, r, true); },
    tf(q, r) {
      const name = 'tf-' + q.id;
      const tfRows = [true, false].map(b => {
        const inp = h('input', { type: 'radio', name: name + '-v', value: String(b), id: `${name}-v-${b}` });
        return { b, inp, lab: h('label', { class: 'seg', for: inp.id }, inp, h('span', {}, b ? 'True' : 'False')) };
      });
      const reasons = shuffle(q.reasons.map((x, i) => Object.assign({ id: 'r' + i }, x)), r);
      const rRows = reasons.map((x, i) => {
        const inp = h('input', { type: 'radio', name: name + '-r', value: x.id, id: `${name}-r-${i}` });
        return { x, inp, lab: h('label', { class: 'opt', for: inp.id }, inp, h('span', { html: x.html }), h('span', { class: 'mark' })) };
      });
      const tfMark = h('span', { class: 'mark' });
      const el = h('div', { class: 'tf' },
        h('fieldset', { class: 'tf-part' }, h('legend', {}, h('span', { class: 'step-n' }, '1'), ' Is the statement true or false?'), h('div', { class: 'segs' }, tfRows.map(x => x.lab)), tfMark),
        h('fieldset', { class: 'tf-part options' }, h('legend', {}, h('span', { class: 'step-n' }, '2'), ' Which reason is consistent with the academic’s explanation?'), rRows.map(x => x.lab)));
      return {
        el,
        incomplete: 'Answer both parts: true or false, and a reason.',
        value: () => { const a = tfRows.find(x => x.inp.checked), b = rRows.find(x => x.inp.checked); return a && b ? { tf: a.b, reason: b.x.id } : null; },
        mark: v => { const a = v.tf === q.truth ? 0.5 : 0, b = reasons.find(x => x.id === v.reason).correct ? 0.5 : 0; return { frac: a + b, detail: `True/false: ${a ? 'correct' : 'incorrect'} · Reason: ${b ? 'correct' : 'incorrect'}` }; },
        reveal: v => {
          el.querySelectorAll('input').forEach(i => { i.disabled = true; });
          el.classList.add('locked');
          tfRows.forEach(x => { if (x.b === q.truth) x.lab.classList.add('is-correct'); else if (x.b === v.tf) x.lab.classList.add('is-wrong'); });
          tfMark.textContent = `The statement is ${q.truth ? 'true' : 'false'}.`;
          rRows.forEach(x => {
            if (x.x.correct) { x.lab.classList.add('is-correct'); x.lab.querySelector('.mark').textContent = x.x.id === v.reason ? 'Correct' : 'Correct reason'; }
            else if (x.x.id === v.reason) { x.lab.classList.add('is-wrong'); x.lab.querySelector('.mark').textContent = 'Your choice'; }
          });
        }
      };
    },
    sort(q, r) {
      const name = 'sort-' + q.id;
      const rows = q.items.map((it, i) => {
        const radios = q.categories.map(c => {
          const id = `${name}-${i}-${c.id}`;
          const inp = h('input', { type: 'radio', name: `${name}-${i}`, id, value: c.id });
          return { c, inp, lab: h('label', { class: 'seg', for: id }, inp, h('span', {}, c.label)) };
        });
        const mark = h('span', { class: 'mark' });
        return { it, radios, mark, row: h('fieldset', { class: 'sort-row' }, h('legend', { html: it.html }), h('div', { class: 'segs' }, radios.map(x => x.lab)), mark) };
      });
      return {
        el: h('div', { class: 'sort' }, rows.map(x => x.row)),
        incomplete: 'Place every statement in a group.',
        value: () => { const v = rows.map(x => (x.radios.find(y => y.inp.checked) || {}).c); return v.every(Boolean) ? v.map(c => c.id) : null; },
        mark: v => { const n = rows.filter((x, i) => v[i] === x.it.cat).length; return { frac: n / rows.length, detail: `${n} of ${rows.length} statements placed as in the academic’s explanation.` }; },
        reveal: v => rows.forEach((x, i) => {
          const ok = v[i] === x.it.cat;
          x.radios.forEach(y => { y.inp.disabled = true; });
          x.row.classList.add(ok ? 'is-correct' : 'is-wrong');
          x.mark.textContent = ok ? '✓' : '✕ ' + q.categories.find(c => c.id === x.it.cat).label;
        })
      };
    },
    order(q, r) {
      const correct = q.items.map(i => i.id);
      let cur = shuffle(correct, r); if (cur.join() === correct.join()) cur.reverse();
      let locked = false;
      const list = h('ol', { class: 'order' });
      const live = h('p', { class: 'sr-only', 'aria-live': 'polite' });
      const label = id => q.items.find(i => i.id === id).html;
      function render(marks) {
        list.innerHTML = '';
        cur.forEach((id, i) => {
          const txt = h('span', { class: 'order-txt', html: label(id) });
          const up = h('button', { class: 'btn icon', type: 'button', disabled: locked || i === 0, 'aria-label': 'Move up: ' + txt.textContent, onclick: () => move(i, -1) }, '↑');
          const dn = h('button', { class: 'btn icon', type: 'button', disabled: locked || i === cur.length - 1, 'aria-label': 'Move down: ' + txt.textContent, onclick: () => move(i, 1) }, '↓');
          list.append(h('li', { class: 'order-item' + (marks ? (marks[i] ? ' is-correct' : ' is-wrong') : '') }, h('span', { class: 'order-n' }, String(i + 1)), txt, locked ? null : h('span', { class: 'order-btns' }, up, dn)));
        });
      }
      function move(i, d) {
        const j = i + d; [cur[i], cur[j]] = [cur[j], cur[i]]; render();
        live.textContent = `Moved to position ${j + 1} of ${cur.length}.`;
        const btn = list.children[j].querySelectorAll('button')[d < 0 ? 0 : 1];
        (btn && !btn.disabled ? btn : list.children[j].querySelector('button:not([disabled])')).focus();
      }
      render();
      const answer = h('div', { class: 'order-answer', hidden: true });
      return {
        el: h('div', { class: 'order-wrap' }, h('p', { class: 'hint' }, 'Use the arrow buttons to reorder the steps. Marks are given for each pair of consecutive steps in the right order.'), list, live, answer),
        value: () => cur.slice(),
        mark: v => {
          let n = 0; for (let i = 0; i < v.length - 1; i++) if (correct.indexOf(v[i + 1]) === correct.indexOf(v[i]) + 1) n++;
          return { frac: n / (v.length - 1), detail: `${n} of ${v.length - 1} consecutive pairs in the academic’s order.` };
        },
        reveal: v => {
          locked = true; cur = v.slice(); render(v.map((id, i) => id === correct[i]));
          if (v.join() !== correct.join()) {
            answer.hidden = false;
            answer.append(h('div', { class: 'eyebrow' }, 'The academic’s order'), h('ol', { class: 'order-key' }, correct.map(id => h('li', { html: label(id) }))));
          }
        }
      };
    },
    match(q, r) {
      const rights = shuffle(q.pairs.map((p, i) => ({ id: 'm' + i, html: p.right })), r);
      const lefts = shuffle(q.pairs.map((p, i) => ({ id: 'm' + i, html: p.left })), r);
      const rows = lefts.map((L, i) => {
        const id = `match-${q.id}-${i}`;
        const sel = h('select', { id, class: 'match-sel' }, h('option', { value: '' }, 'Choose a match…'), rights.map(x => h('option', { value: x.id }, plain(x.html))));
        const mark = h('span', { class: 'mark' });
        return { L, sel, mark, row: h('div', { class: 'match-row' }, h('label', { for: id, class: 'match-l', html: L.html }), sel, mark) };
      });
      return {
        el: h('div', { class: 'match' }, h('p', { class: 'hint' }, 'Each item has one match. You can use the list in any order.'), rows.map(x => x.row)),
        incomplete: 'Choose a match for every item.',
        value: () => { const v = rows.map(x => x.sel.value); return v.every(Boolean) ? v : null; },
        mark: v => { const n = rows.filter((x, i) => v[i] === x.L.id).length; return { frac: n / rows.length, detail: `${n} of ${rows.length} matched correctly.` }; },
        reveal: v => rows.forEach((x, i) => {
          x.sel.disabled = true;
          const ok = v[i] === x.L.id;
          x.row.classList.add(ok ? 'is-correct' : 'is-wrong');
          x.mark.innerHTML = ok ? '✓' : '✕ Match: ' + rights.find(y => y.id === x.L.id).html;
        })
      };
    },
    numeric(q) {
      const id = 'num-' + q.id;
      const inp = h('input', { id, type: 'text', inputmode: 'decimal', autocomplete: 'off', spellcheck: 'false', class: 'num-in', 'aria-describedby': id + '-hint' });
      const single = q.units.length === 1;
      const unit = single ? h('span', { class: 'unit-fixed' }, q.units[0]) :
        h('select', { id: id + '-u', class: 'unit-sel', 'aria-label': 'Unit' }, h('option', { value: '' }, 'Unit…'), q.units.map(u => h('option', { value: u }, u)));
      const out = h('div', { class: 'num-out' });
      return {
        el: h('div', { class: 'num' },
          h('label', { for: id, class: 'num-l' }, 'Your answer'),
          h('div', { class: 'num-row' }, inp, unit),
          h('p', { class: 'hint', id: id + '-hint' }, 'Decimals or powers of ten are fine, e.g. 8.33e6 or 8.33×10^6. ' + (single ? '' : 'Choose the unit too: the value and the unit are marked separately.')),
          out),
        incomplete: single ? 'Enter a number.' : 'Enter a number and choose a unit.',
        focusEl: inp,
        value: () => { const v = parseNumber(inp.value); if (inp.value.trim() && v == null) return { bad: true }; if (v == null || (!single && !unit.value)) return null; return { v, raw: inp.value.trim(), u: single ? q.units[0] : unit.value }; },
        mark: v => {
          const ok = within(v.v, q), uok = v.u === q.unit;
          const frac = single ? (ok ? 1 : 0) : (ok ? 0.8 : 0) + (uok ? 0.2 : 0);
          return { frac, detail: single ? (ok ? 'Value within tolerance.' : 'Value outside tolerance.') : `Value: ${ok ? 'within tolerance' : 'outside tolerance'} · Unit: ${uok ? 'correct' : 'incorrect'}` };
        },
        reveal: v => {
          inp.disabled = true; if (!single) unit.disabled = true;
          out.append(h('div', { class: 'num-key' },
            h('span', {}, 'You entered ', h('b', { html: `${fmt(v.v)} ${v.u}` })),
            h('span', {}, 'Answer ', h('b', { html: `${fmt(q.answer)} ${q.unit}` })),
            h('span', { class: 'muted' }, 'Tolerance ' + (q.tol.abs != null ? `± ${q.tol.abs} ${q.unit}` : `± ${q.tol.rel * 100}%`))));
        }
      };
    }
  };

  /* ================= session runner ================= */
  let run = null; // { mode, key, title, questions, i, results[], seed, challenge?, recovery? }

  function startRun(cfg) {
    const seed = (Date.now() ^ (Math.random() * 1e9)) >>> 0;
    run = Object.assign({ i: 0, results: [], seed, started: Date.now() }, cfg);
    if (cfg.mode === 'recovery') run.phase = 'refresh';
    if (location.hash === '#play') render(); else location.hash = '#play'; // hashchange renders
  }

  function playView() {
    if (!run) { location.hash = '#'; return h('div'); }
    const q = run.questions[run.i];
    const r = rng(run.seed + run.i * 7919);
    const score = run.results.reduce((s, x) => s + x.points, 0);
    const max = maxPoints(run.questions);
    const bestRec = run.key && S.best[run.key];
    const wrap = h('div', { class: 'play' });

    // header strip: mode, progress, score
    const dots = h('ol', { class: 'dots', 'aria-label': 'Progress' }, run.questions.map((x, i) => {
      const res = run.results[i];
      const st = res ? (res.frac >= 0.999 ? 'ok' : res.frac > 0 ? 'part' : 'bad') : i === run.i ? 'cur' : '';
      return h('li', { class: 'dot ' + st, 'aria-current': i === run.i ? 'step' : null }, h('span', { class: 'sr-only' }, `Question ${i + 1}${res ? `: ${Math.round(res.frac * 100)}%` : i === run.i ? ', current' : ''}`));
    }));
    wrap.append(h('div', { class: 'play-head' },
      h('div', { class: 'play-title' }, h('span', { class: 'eyebrow' }, run.title), h('span', { class: 'play-count' }, `Question ${run.i + 1} of ${run.questions.length}`)),
      h('div', { class: 'scorebox', 'aria-live': 'off' },
        h('span', { class: 'score-now' }, h('b', {}, String(score)), ` / ${max}`),
        bestRec ? h('span', { class: 'score-best' }, `Best ${bestRec.score}`) : null),
      dots,
      h('button', { class: 'btn quiet small quit', type: 'button', onclick: quit }, 'End session')));

    if (run.mode === 'recovery' && run.phase === 'refresh') { wrap.append(refresherCard()); return wrap; }

    const ui = builders[q.type](q, r);
    const card = h('form', { class: 'qcard', novalidate: true, 'aria-labelledby': 'q-prompt' });
    card.append(h('div', { class: 'q-meta' },
      h('span', { class: 'lvl lvl-' + q.level }, LEVELS[q.level].name),
      h('span', { class: 'pill' }, TYPE(q)),
      h('span', { class: 'q-topic' }, topicShort(q.topic)),
      h('span', { class: 'q-pts' }, `${LEVELS[q.level].pts} pts`)));
    if (q.heading) card.append(h('p', { class: 'q-from' }, 'From the discussion on ', h('b', {}, q.heading), q.focus ? ` · ${q.focus}` : ''));
    if (q.follows) card.append(h('div', { class: 'q-follows' }, h('span', { class: 'eyebrow' }, 'Follows on from'), h('p', { html: q.follows })));
    if (q.context) card.append(h('div', { class: 'q-context', html: q.context }));
    if (q.figure) card.append(renderBlock(q.figure));
    card.append(h('h2', { id: 'q-prompt', class: 'q-prompt', tabindex: '-1', html: q.prompt }));
    if (q.origin === 'new') card.append(h('p', { class: 'q-origin' }, provAdd('Question written from the academic’s explanation · awaiting review')));
    card.append(ui.el);
    const msg = h('p', { class: 'form-msg', role: 'alert' });
    const submit = h('button', { class: 'btn primary', type: 'submit' }, 'Submit answer');
    const actions = h('div', { class: 'q-actions' }, msg, submit);
    card.append(actions);
    const fb = h('section', { class: 'qfeedback', 'aria-labelledby': 'fb-h', hidden: true });

    const done = run.results[run.i];
    function finish(v, res) {
      ui.reveal(v, res);
      submit.remove(); msg.textContent = '';
      fb.hidden = false; fb.innerHTML = '';
      const points = Math.round(LEVELS[q.level].pts * res.frac);
      const cls = res.frac >= 0.999 ? 'ok' : res.frac > 0 ? 'part' : 'bad';
      const head = res.frac >= 0.999 ? 'Correct' : res.frac > 0 ? 'Partly correct' : 'Not this time';
      fb.append(h('div', { class: 'verdict-row ' + cls },
        h('h3', { id: 'fb-h', tabindex: '-1' }, head),
        h('span', { class: 'pts' }, `+${points}`, h('small', {}, ` of ${LEVELS[q.level].pts}`))));
      if (res.detail) fb.append(h('p', { class: 'hint' }, res.detail));
      if (q.worked) fb.append(h('div', { class: 'worked' }, provAdd('Worked solution · added for revision · awaiting review'), h('p', { html: q.worked }), q.note ? h('p', { class: 'note', html: q.note }) : null));
      const refs = ui.explainRefs ? ui.explainRefs(v) : q.refs;
      const qt = quote(refs);
      if (qt) fb.append(h('h4', { class: 'eyebrow' }, 'What the academic said'), qt);
      const srcBtn = h('button', { class: 'linkbtn', type: 'button', onclick: () => openSource(q, srcBtn) }, 'Open the original discussion');
      fb.append(h('p', { class: 'src-line' }, h('span', {}, `Source: ${srcLine(q)} · Ref ${q.id}`), srcBtn));
      if (run.mode === 'recovery' && run.recoveryResult) {
        const rr = run.recoveryResult;
        fb.append(h('p', { class: 'rec-note' }, rr.recovered ? `${conceptLabel(run.recConcept)}: recovered. It leaves your recovery list.` :
          res.frac >= 0.8 ? `${conceptLabel(run.recConcept)} moves to box ${rr.box}. Next review ${whenText(rr.due)}.` : `${conceptLabel(run.recConcept)} stays in box 1. You’ll see it again next session.`));
      }
      const last = run.i === run.questions.length - 1;
      const next = h('button', { class: 'btn primary', type: 'button', onclick: () => {
        if (last) { finishRun(); return; }
        run.i++; if (run.mode === 'recovery') run.phase = 'refresh'; render();
      } }, run.mode === 'preview' ? 'Back to reviewer view' : last ? 'See your results' : 'Next question');
      fb.append(h('div', { class: 'q-actions' }, next));
      return next;
    }
    card.addEventListener('submit', e => {
      e.preventDefault();
      if (run.results[run.i]) return;
      const v = ui.value();
      if (!v || v.bad) { msg.textContent = v && v.bad ? 'That doesn’t look like a number. Try a format like 5000, 8.33e6 or 8.33×10^6.' : ui.incomplete; return; }
      const res = ui.mark(v);
      const points = Math.round(LEVELS[q.level].pts * res.frac);
      run.results[run.i] = { q: q.id, frac: res.frac, points, value: v, res };
      if (run.mode !== 'preview') record(q, res.frac, run.mode);
      if (run.mode === 'recovery') run.recoveryResult = recoveryResult(run.recConcept, res.frac);
      // update the live score
      const sn = wrap.querySelector('.score-now b'); if (sn) sn.textContent = String(run.results.reduce((s, x) => s + x.points, 0));
      const d = wrap.querySelectorAll('.dot')[run.i]; if (d) { d.className = 'dot ' + (res.frac >= 0.999 ? 'ok' : res.frac > 0 ? 'part' : 'bad'); }
      finish(v, res);
      requestAnimationFrame(() => { const fh = fb.querySelector('#fb-h'); fh.focus({ preventScroll: true }); fb.scrollIntoView({ block: 'nearest', behavior: reduced() ? 'auto' : 'smooth' }); });
    });
    wrap.append(card, fb);
    if (done) { ui.restore && ui.restore(done.value); finish(done.value, done.res); }
    run._focus = () => card.querySelector('#q-prompt').focus({ preventScroll: true });
    return wrap;
  }
  const reduced = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function whenText(t) { const d = Math.round((t - Date.now()) / DAY); return d <= 0 ? 'next session' : d === 1 ? 'in 1 day' : `in ${d} days`; }

  /* Knowledge Recovery: explanation first, then a different question on the same concept. */
  function refresherCard() {
    const item = run.recItems[run.i];
    const missed = qById(item.q);
    run.recConcept = item.concept;
    const others = Qs.filter(q => q.id !== item.q && keyConcepts(q).includes(item.concept));
    others.sort((a, b) => Math.abs(a.level - missed.level) - Math.abs(b.level - missed.level) || ((S.seen[a.id] || {}).n || 0) - ((S.seen[b.id] || {}).n || 0));
    const pick = others[0] || missed;
    run.questions[run.i] = pick;
    const box = h('section', { class: 'qcard refresher', 'aria-labelledby': 'rf-h' },
      h('div', { class: 'q-meta' }, h('span', { class: 'pill' }, 'Refresher'), h('span', { class: 'q-topic' }, `Box ${S.recovery[item.concept] ? S.recovery[item.concept].box : 1} of 5`)),
      h('h2', { id: 'rf-h', tabindex: '-1', class: 'q-prompt' }, conceptLabel(item.concept)),
      h('p', {}, `You missed a question on this earlier${missed.heading ? ` (from the discussion on ${missed.heading})` : ''}. Read what the academic said, then try ${pick === missed ? 'the question again with the options reordered (there is no other question on this concept yet)' : 'a different question on the same idea'}.`),
      quote(missed.refs),
      h('div', { class: 'q-actions' }, h('button', { class: 'btn primary', type: 'button', onclick: () => { run.phase = 'question'; render(); } }, 'I’ve read this. Show me the question')));
    run._focus = () => box.querySelector('#rf-h').focus();
    return box;
  }

  function quit() {
    const box = document.querySelector('.quit-confirm');
    if (box) { box.querySelector('button').focus(); return; }
    const c = h('div', { class: 'notice quit-confirm', role: 'alertdialog', 'aria-labelledby': 'qc-h' },
      h('p', { id: 'qc-h' }, run.results.length ? 'End now? Your answers so far count towards mastery and recovery, but this attempt won’t count as a score.' : 'End this session? Nothing has been answered yet.'),
      h('div', { class: 'q-actions' },
        h('button', { class: 'btn', type: 'button', onclick: () => c.remove() }, 'Keep going'),
        h('button', { class: 'btn primary', type: 'button', onclick: () => { run = null; location.hash = '#'; } }, 'End session')));
    document.querySelector('.play-head').after(c);
    c.querySelector('button').focus();
  }

  function finishRun() {
    if (run.mode === 'preview') { run = null; location.hash = '#review'; return; }
    const score = run.results.reduce((s, x) => s + x.points, 0);
    const max = maxPoints(run.questions);
    const prevBest = run.key ? S.best[run.key] : null;
    const prevAttempt = run.key ? S.attempts.filter(a => a.key === run.key).slice(-1)[0] : null;
    const att = { key: run.key, mode: run.mode, title: run.title, date: Date.now(), score, max, pct: pct(score, max),
      items: run.results.map(x => ({ q: x.q, f: +x.frac.toFixed(3) })) };
    S.attempts.push(att); if (S.attempts.length > 200) S.attempts.shift();
    const newBest = !!prevBest && score > prevBest.score;
    if (run.key && run.mode !== 'recovery' && (!prevBest || score > prevBest.score)) S.best[run.key] = { score, max, pct: att.pct, date: att.date };
    save();
    run.summary = { score, max, prevBest, prevAttempt, newBest, first: !prevBest };
    location.hash = '#results';
  }

  /* ================= results ================= */
  function resultsView() {
    if (!run || !run.summary) { location.hash = '#'; return h('div'); }
    const { score, max, prevBest, prevAttempt, newBest, first } = run.summary;
    const qs = run.questions, rs = run.results;
    const el = h('div', { class: 'results-view' });
    const p = pct(score, max);

    let compare;
    if (run.mode === 'recovery') compare = h('p', { class: 'cmp' }, `${rs.filter(x => x.frac >= 0.8).length} of ${rs.length} concepts moved up a box. ${dueItems().length ? dueItems().length + ' still due.' : 'Nothing else is due today.'}`);
    else if (first) compare = h('p', { class: 'cmp' }, 'First attempt. This is the score to beat next time.');
    else if (newBest) compare = h('p', { class: 'cmp up' }, `Up from your previous best of ${prevBest.score} (${prevBest.pct}%).`);
    else compare = h('p', { class: 'cmp' }, `Your best is ${prevBest.score} (${prevBest.pct}%). ${prevBest.score - score === 0 ? 'You matched it.' : `${prevBest.score - score} points to beat it.`}${prevAttempt && prevAttempt.score !== prevBest.score ? ` Last time you scored ${prevAttempt.score}.` : ''}`);

    el.append(h('section', { class: 'res-hero' + (newBest ? ' best' : '') },
      h('div', { class: 'eyebrow' }, run.title + ' · results'),
      newBest ? h('p', { class: 'newbest', role: 'status' }, h('span', { html: ICON.star }), ' New personal best') : null,
      h('h1', { tabindex: '-1' }, h('span', { class: 'big-score' }, String(score)), h('span', { class: 'of' }, ` / ${max} points`)),
      meter(p, prevBest && run.mode !== 'recovery' ? prevBest.pct : null),
      compare));

    // by level
    const lv = [1, 2, 3].map(l => { const ix = qs.map((q, i) => i).filter(i => qs[i].level === l); return { l, n: ix.length, got: ix.reduce((s, i) => s + rs[i].points, 0), of: ix.reduce((s, i) => s + LEVELS[l].pts, 0) }; }).filter(x => x.n);
    el.append(h('section', { class: 'panel' }, h('h2', {}, 'By level'), h('div', { class: 'bars' }, lv.map(x => bar(`${LEVELS[x.l].name} (${x.n})`, pct(x.got, x.of))))));

    if (run.mode === 'final' || run.mode === 'quick' || run.mode === 'best') {
      const topics = [...new Set(qs.map(q => q.topic))];
      const tp = topics.map(t => { const ix = qs.map((q, i) => i).filter(i => qs[i].topic === t); return { t, n: ix.length, p: pct(ix.reduce((s, i) => s + rs[i].points, 0), ix.reduce((s, i) => s + LEVELS[qs[i].level].pts, 0)) }; }).sort((a, b) => a.p - b.p);
      el.append(h('section', { class: 'panel' }, h('h2', {}, 'By topic'), h('div', { class: 'bars' }, tp.map(x => bar(`${topicShort(x.t)} (${x.n})`, x.p)))));
      if (run.mode === 'final') {
        const types = [...new Set(qs.map(TYPE))];
        el.append(h('section', { class: 'panel' }, h('h2', {}, 'By question type'), h('div', { class: 'bars' }, types.map(ty => { const ix = qs.map((q, i) => i).filter(i => TYPE(qs[i]) === ty); return bar(`${ty} (${ix.length})`, pct(ix.reduce((s, i) => s + rs[i].frac, 0), ix.length)); }))));
      }
    }

    // concept mastery touched in this session
    const cs = [...new Set(qs.flatMap(keyConcepts))].filter(c => T.concepts[c]);
    el.append(h('section', { class: 'panel' }, h('h2', {}, run.mode === 'topic' ? 'Concepts in this topic' : 'Concept mastery'),
      h('p', { class: 'hint' }, 'Based on your last five answers on each concept, across all modes.'),
      h('ul', { class: 'mastery-list' }, cs.map(c => { const m = masteryOf(c); return h('li', { class: 'm-' + m.key }, h('span', {}, conceptLabel(c)), h('span', { class: 'm-tag' }, m.label)); }))));

    // suggestions
    el.append(suggestions(qs, rs));

    // question review
    el.append(h('section', { class: 'panel' }, h('h2', {}, 'Your answers'),
      h('ol', { class: 'answer-list' }, qs.map((q, i) => {
        const res = rs[i];
        const btn = h('button', { class: 'linkbtn', type: 'button', onclick: () => openSource(q, btn) }, 'Source');
        return h('li', { class: res.frac >= 0.999 ? 'ok' : res.frac > 0 ? 'part' : 'bad' },
          h('span', { class: 'a-mark', 'aria-hidden': 'true' }, res.frac >= 0.999 ? '✓' : res.frac > 0 ? '◐' : '✕'),
          h('span', { class: 'a-q' }, clip(text(q.prompt), 140), h('small', {}, `${LEVELS[q.level].name} · ${TYPE(q)} · ${srcLine(q)}`)),
          h('span', { class: 'a-pts' }, `${res.points}/${LEVELS[q.level].pts}`), btn);
      }))));

    el.append(h('div', { class: 'q-actions end' },
      h('a', { class: 'btn', href: '#' }, 'Back to modes'),
      run.mode === 'recovery' ? (dueItems().length ? h('button', { class: 'btn primary', type: 'button', onclick: startRecovery }, 'Continue recovery') : null)
        : h('button', { class: 'btn primary', type: 'button', onclick: () => run.again() }, run.mode === 'best' ? 'Try to beat it again' : 'Play again')));
    run._focus = () => el.querySelector('h1').focus();
    return el;
  }
  function meter(p, best) {
    return h('div', { class: 'meter-wrap', role: 'img', 'aria-label': `${p}%${best != null ? `, previous best ${best}%` : ''}` },
      h('span', { class: 'meter' },
        h('span', { class: 'meter-fill', style: `width:${p}%` }),
        best != null ? h('span', { class: 'meter-best', style: `left:${best}%` }) : null),
      h('span', { class: 'meter-txt', 'aria-hidden': 'true' }, `${p}%`, best != null ? h('span', { class: 'meter-key' }, ` · previous best ${best}%`) : null));
  }
  function bar(label, p) {
    return h('div', { class: 'bar-row' }, h('span', { class: 'bar-l' }, label), h('span', { class: 'bar-t', 'aria-hidden': 'true' }, h('span', { style: `width:${p}%`, class: p >= 80 ? 'hi' : p >= 50 ? 'mid' : 'lo' })), h('span', { class: 'bar-p' }, p + '%'));
  }
  function libLink(faqId, label) {
    const href = CFG.libraryUrl + '#resource-' + faqId;
    return h('a', { href, target: '_blank', rel: 'noopener' }, label, h('span', { class: 'sr-only' }, ' (opens the Revision Library in a new tab)'));
  }
  function suggestions(qs, rs) {
    const weak = {};
    qs.forEach((q, i) => { if (rs[i].frac < 0.8) (weak[q.faq] = weak[q.faq] || { q, n: 0 }).n++; });
    const list = Object.values(weak).sort((a, b) => b.n - a.n).slice(0, 4);
    const due = dueItems().length;
    const weakTopic = (() => { const t = {}; qs.forEach((q, i) => { t[q.topic] = t[q.topic] || [0, 0]; t[q.topic][0] += rs[i].frac; t[q.topic][1]++; }); return Object.entries(t).map(([k, v]) => [k, v[0] / v[1]]).sort((a, b) => a[1] - b[1])[0]; })();
    return h('section', { class: 'panel suggest' }, h('h2', {}, 'What to do next'),
      h('ul', {},
        list.map(x => h('li', {}, 'Work through ', libLink(x.q.faq, x.q.heading), ` in the Revision Library (${x.n} question${x.n > 1 ? 's' : ''} missed).`)),
        due && run.mode !== 'recovery' ? h('li', {}, h('a', { href: '#recovery' }, `Knowledge Recovery: ${due} concept${due > 1 ? 's' : ''} due`), '. The academic’s explanation first, then a fresh question.') : null,
        weakTopic && weakTopic[1] < 0.8 && run.mode !== 'topic' ? h('li', {}, 'Try a ', h('a', { href: '#topic/' + weakTopic[0] }, `Topic Challenge on ${topicShort(weakTopic[0])}`), ' to build from foundation to reasoning.') : null,
        !list.length ? h('li', {}, 'Everything here was secure. Try a harder challenge, or the Final Challenge.') : null));
  }

  /* ================= mode starters ================= */
  function lastIds(key) { const a = S.attempts.filter(x => x.key === key).slice(-1)[0]; return new Set(a ? a.items.map(i => i.q) : []); }
  function startQuick() {
    const go = () => startRun({ mode: 'quick', key: 'quick', title: 'Quick Challenge', questions: draw(poolFor(null), QUICK_MIX, Date.now(), lastIds('quick')), again: go });
    go();
  }
  function startTopic(t) {
    const go = () => {
      const pool = poolFor([t]);
      const mix = Object.assign({}, TOPIC_MIX);
      // smaller topics: use what there is, keeping the foundation → reasoning order
      [1, 2, 3].forEach(l => { mix[l] = Math.min(mix[l], pool.filter(q => q.level === l).length); });
      let spare = mixCount(TOPIC_MIX) - mixCount(mix);
      [2, 1, 3].forEach(l => { const extra = Math.min(spare, pool.filter(q => q.level === l).length - mix[l]); mix[l] += extra; spare -= extra; });
      startRun({ mode: 'topic', key: 'topic:' + t, title: 'Topic Challenge · ' + topicShort(t), topic: t, questions: draw(pool, mix, Date.now(), lastIds('topic:' + t)), again: go });
    };
    go();
  }
  function startBest(c) {
    const go = () => startRun({ mode: 'best', key: 'best:' + c.id, title: c.title, challenge: c, questions: draw(poolFor(c.topics), c.mix, Date.now(), lastIds('best:' + c.id)), again: go });
    go();
  }
  function startFinal() {
    const go = () => startRun({ mode: 'final', key: 'final', title: 'Final Challenge', questions: drawStratified(FINAL_MIX, Date.now()), again: go });
    go();
  }
  function startRecovery() {
    const items = dueItems().slice(0, 6).map(([concept, e]) => ({ concept, q: e.q }));
    if (!items.length) { location.hash = '#recovery'; return; }
    startRun({ mode: 'recovery', key: 'recovery', title: 'Knowledge Recovery', recItems: items, questions: items.map(x => qById(x.q)), again: startRecovery });
  }

  /* ================= home / mode pages ================= */
  function frame(main, route) {
    const due = dueItems().length;
    const nav = (href, label, key, extra) => h('a', { href, class: 'navlink', 'aria-current': route === key ? 'page' : null }, label, extra || null);
    return [
      h('header', { class: 'bar' }, h('div', { class: 'bar-in' },
        h('a', { class: 'brand', href: '#' },
          h('span', { class: 'brand-mark', html: '<svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><path d="M5 22V9l9-5 9 5v13" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M9 22v-7h10v7" fill="none" stroke="var(--load)" stroke-width="2.6"/></svg>' }),
          h('span', { class: 'brand-txt' }, h('b', {}, 'Beat Your Best'), h('small', {}, 'Structures 3 knowledge challenge'))),
        h('nav', { class: 'mainnav', 'aria-label': 'Main' },
          nav('#', 'Modes', 'home'),
          nav('#recovery', 'Recovery', 'recovery', due ? h('span', { class: 'badge-n', 'aria-label': `${due} due` }, String(due)) : null),
          nav('#progress', 'My progress', 'progress')))),
      h('main', { id: 'main', class: 'wrap game' }, main),
      h('footer', { class: 'foot' }, h('div', { class: 'wrap foot-in' },
        h('p', {}, 'Questions are based on the 2023/24 Structures 3 discussion board. Academic answers are quoted verbatim, student names are removed, and every question is ', h('b', {}, 'awaiting academic review'), '.'),
        h('p', {}, 'Progress is stored only in this browser. ', h('a', { href: '#review' }, 'Reviewer view'), ' · ', h('a', { href: CFG.libraryUrl, target: '_blank', rel: 'noopener' }, 'Revision Library'), ' · ', h('a', { href: '#about' }, 'How scoring works'))))
    ];
  }
  function goalCards() {
    const bests = Object.values(S.best);
    const ms = milestones();
    const cs = conceptsInBank().map(masteryOf);
    const secure = cs.filter(m => m.key === 'secure').length;
    const tried = cs.filter(m => m.key !== 'none').length;
    return h('section', { class: 'goals', 'aria-label': 'Your three goals' },
      goal('Beat your previous score', bests.length ? `${bests.length} personal best${bests.length > 1 ? 's' : ''} set` : 'No scores yet', 'Each mode remembers your best. Same rules every time, so the comparison is fair.'),
      goal('Improve your mastery', `${secure} of ${cs.length} concepts secure`, tried ? `${tried} concepts tried. Missed ideas come back in Knowledge Recovery.` : 'Concepts become secure after consistent correct answers.'),
      goal('Complete new challenges', `${ms.n} of ${ms.of} milestones`, 'Earn Foundation, Application and Reasoning for each topic.'));
  }
  const goal = (t, v, d) => h('div', { class: 'goal' }, h('h3', {}, t), h('p', { class: 'goal-v' }, v), h('p', { class: 'hint' }, d));
  function modeCard(o) {
    return h('article', { class: 'mode' + (o.primary ? ' primary' : '') },
      h('div', { class: 'mode-top' }, h('h3', { id: 'm-' + o.id }, o.title), o.tag ? h('span', { class: 'pill' }, o.tag) : null),
      h('p', {}, o.desc),
      o.meta ? h('p', { class: 'mode-meta' }, o.meta) : null,
      h('div', { class: 'mode-act' }, o.action));
  }
  function homeView() {
    const due = dueItems().length;
    const lastQuick = S.best.quick;
    return [
      h('section', { class: 'g-hero' },
        h('h1', { tabindex: '-1' }, 'Compete with yourself, not each other'),
        h('p', { class: 'lead' }, 'A self-paced challenge built from real questions students asked about Structures 3, and the academic’s answers. Every question explains itself using the academic’s own words. There’s no timer and no leaderboard. The only score that matters is your last one.')),
      goalCards(),
      h('h2', { class: 'section-h' }, 'Choose a mode'),
      h('div', { class: 'modes' },
        modeCard({ id: 'quick', title: 'Quick Challenge', tag: '5 questions', primary: true,
          desc: 'A short mixed set for a quick revision break. Explanations after every answer.',
          meta: lastQuick ? `Best: ${lastQuick.score} / ${lastQuick.max}` : `${mixText(QUICK_MIX)}`,
          action: h('button', { class: 'btn primary', type: 'button', onclick: startQuick, 'aria-describedby': 'm-quick' }, 'Start') }),
        modeCard({ id: 'topic', title: 'Topic Challenge', tag: 'Up to 10',
          desc: 'Pick a topic. Questions build from foundation to reasoning, then show which concepts are secure.',
          action: h('a', { class: 'btn', href: '#topic', 'aria-describedby': 'm-topic' }, 'Choose a topic') }),
        modeCard({ id: 'best', title: 'Beat Your Best', tag: `${CHALLENGES.length} challenges`,
          desc: 'Repeat a defined challenge. Fresh questions each time, but the same difficulty mix and maximum score.',
          action: h('a', { class: 'btn', href: '#best', 'aria-describedby': 'm-best' }, 'See challenges') }),
        modeCard({ id: 'recovery', title: 'Knowledge Recovery', tag: due ? `${due} due` : 'Nothing due',
          desc: 'Concepts you missed come back at increasing intervals: next session, then 1, 3, 7 and 16 days. Explanation first.',
          action: due ? h('button', { class: 'btn', type: 'button', onclick: startRecovery, 'aria-describedby': 'm-recovery' }, 'Start recovery') : h('a', { class: 'btn', href: '#recovery' }, 'How it works') }),
        modeCard({ id: 'final', title: 'Final Challenge', tag: '20 questions',
          desc: 'A longer assessment across every topic, with a detailed breakdown and study suggestions.',
          meta: S.best.final ? `Best: ${S.best.final.score} / ${S.best.final.max}` : mixText(FINAL_MIX),
          action: h('button', { class: 'btn', type: 'button', onclick: startFinal, 'aria-describedby': 'm-final' }, 'Start') })),
      h('p', { class: 'hint center' }, `${Qs.length} questions in 8 formats, from ${new Set(Qs.flatMap(q => q.src.map(s => s.disc))).size} discussion threads. `, h('a', { href: '#about' }, 'How scoring works'))
    ];
  }
  function topicPickView() {
    return [
      h('a', { class: 'crumb', href: '#' }, '← Modes'),
      h('h1', { tabindex: '-1' }, 'Topic Challenge'),
      h('p', { class: 'lead' }, 'Questions are ordered Foundation → Application → Reasoning. Milestones show the levels you’ve secured in each topic.'),
      h('ul', { class: 'topic-list' }, allTopics().map(t => {
        const n = Qs.filter(q => q.topic === t.id).length;
        const b = S.best['topic:' + t.id];
        return h('li', { class: 'topic-row' },
          h('div', {}, h('h2', { class: 'topic-h' }, t.label), h('p', { class: 'hint' }, `${n} questions${b ? ` · Best ${b.score}/${b.max}` : ''}`)),
          tiers(t.id),
          h('button', { class: 'btn', type: 'button', onclick: () => startTopic(t.id), 'aria-label': 'Start ' + t.label }, 'Start'));
      }))
    ];
  }
  function tiers(topic) {
    return h('ul', { class: 'tiers', 'aria-label': 'Milestones' }, [1, 2, 3].filter(l => Qs.some(q => q.topic === topic && q.level === l)).map(l => {
      const e = tierEarned(topic, l);
      return h('li', { class: 'tier' + (e ? ' on' : '') }, h('span', { class: 'sr-only' }, e ? 'Earned: ' : 'Not yet: '), LEVELS[l].name);
    }));
  }
  function bestPickView() {
    return [
      h('a', { class: 'crumb', href: '#' }, '← Modes'),
      h('h1', { tabindex: '-1' }, 'Beat Your Best'),
      h('p', { class: 'lead' }, 'Each challenge keeps the same rules, the same number of questions at each level and the same maximum score. The questions are drawn fresh each attempt (avoiding the ones you saw last time), so you improve your understanding, not your memory of the answers.'),
      h('div', { class: 'challenges' }, CHALLENGES.map(c => {
        const b = S.best['best:' + c.id];
        const hist = S.attempts.filter(a => a.key === 'best:' + c.id).slice(-8);
        return h('article', { class: 'challenge' },
          h('h2', {}, c.title), h('p', {}, c.blurb),
          h('p', { class: 'mode-meta' }, `${mixCount(c.mix)} questions · ${mixText(c.mix)} · max ${mixMax(c.mix)} pts`),
          b ? h('div', { class: 'best-line' }, h('span', {}, 'Personal best ', h('b', {}, `${b.score}`), ` (${b.pct}%)`), spark(hist)) : h('p', { class: 'hint' }, 'Not attempted yet.'),
          h('button', { class: 'btn primary', type: 'button', onclick: () => startBest(c) }, b ? 'Beat it' : 'Set a score'));
      }))
    ];
  }
  function spark(hist) {
    if (hist.length < 2) return null;
    return h('span', { class: 'spark', role: 'img', 'aria-label': 'Recent attempts: ' + hist.map(a => a.pct + '%').join(', ') },
      hist.map(a => h('span', { style: `height:${Math.max(6, a.pct)}%`, title: `${a.pct}%` })));
  }
  function recoveryView() {
    const all = Object.entries(S.recovery).sort((a, b) => a[1].due - b[1].due);
    const due = dueItems();
    return [
      h('a', { class: 'crumb', href: '#' }, '← Modes'),
      h('h1', { tabindex: '-1' }, 'Knowledge Recovery'),
      h('p', { class: 'lead' }, 'When you miss a question, its key concepts join this list. Each review starts with the academic’s explanation, then asks a different question on the same idea. Get it right and the concept moves up a box and comes back later. Miss it and it goes back to box 1.'),
      h('ol', { class: 'boxes', 'aria-label': 'Review intervals' }, INTERVAL_DAYS.slice(1).map((d, i) => h('li', {}, h('b', {}, `Box ${i + 1}`), h('span', {}, d ? `${d} day${d > 1 ? 's' : ''}` : 'next session'), h('small', {}, `${all.filter(([, e]) => e.box === i + 1).length} concepts`)))),
      due.length ? h('div', { class: 'q-actions' }, h('button', { class: 'btn primary', type: 'button', onclick: startRecovery }, `Start recovery (${Math.min(6, due.length)} of ${due.length} due)`))
        : h('p', { class: 'notice' }, all.length ? 'Nothing is due right now. Come back later, or play another mode.' : 'Nothing to recover yet. Concepts appear here after you miss a question in any mode.'),
      all.length ? h('section', { class: 'panel' }, h('h2', {}, 'Your recovery list'), h('ul', { class: 'rec-list' }, all.map(([c, e]) => h('li', {}, h('span', {}, conceptLabel(c)), h('span', { class: 'muted' }, `Box ${e.box} · ${e.due <= Date.now() ? 'due now' : 'due ' + whenText(e.due)}`))))) : null,
      S.recovered ? h('p', { class: 'hint' }, `${S.recovered} concept${S.recovered > 1 ? 's' : ''} fully recovered so far.`) : null
    ];
  }
  function progressView() {
    const groups = allTopics().map(t => {
      const cs = [...new Set(Qs.filter(q => q.topic === t.id).flatMap(keyConcepts))].filter(c => T.concepts[c]);
      return { t, cs };
    });
    const bests = Object.entries(S.best);
    const confirmBox = h('div', { class: 'notice', hidden: true, role: 'alertdialog', 'aria-labelledby': 'clr-h' },
      h('p', { id: 'clr-h' }, 'Clear all scores, mastery and recovery data from this browser? This can’t be undone.'),
      h('div', { class: 'q-actions' }, h('button', { class: 'btn', type: 'button', onclick: () => { confirmBox.hidden = true; } }, 'Cancel'),
        h('button', { class: 'btn primary', type: 'button', onclick: () => { S = blank(); save(); render(); } }, 'Clear everything')));
    return [
      h('h1', { tabindex: '-1' }, 'My progress'),
      goalCards(),
      h('section', { class: 'panel' }, h('h2', {}, 'Personal bests'),
        bests.length ? h('ul', { class: 'best-list' }, bests.map(([k, b]) => {
          const hist = S.attempts.filter(a => a.key === k).slice(-8);
          return h('li', {}, h('span', {}, labelForKey(k)), h('span', {}, h('b', {}, `${b.score}`), ` / ${b.max} (${b.pct}%)`), spark(hist));
        })) : h('p', { class: 'hint' }, 'Finish any challenge to set a personal best.')),
      h('section', { class: 'panel' }, h('h2', {}, 'Mastery by topic'),
        h('p', { class: 'hint' }, 'Secure: at least 3 answers, averaging 80% or more over your last five. Developing: 50–79%. Needs work: under 50%.'),
        groups.map(g => h('div', { class: 'm-topic' },
          h('div', { class: 'm-topic-h' }, h('h3', {}, g.t.label), tiers(g.t.id)),
          h('ul', { class: 'mastery-list' }, g.cs.map(c => { const m = masteryOf(c); return h('li', { class: 'm-' + m.key }, h('span', {}, conceptLabel(c)), h('span', { class: 'm-tag' }, m.label)); }))))),
      h('section', { class: 'panel' }, h('h2', {}, 'Your data'),
        h('p', {}, `${S.attempts.length} completed session${S.attempts.length === 1 ? '' : 's'}. Everything is stored only in this browser. Nothing is sent anywhere.`),
        h('button', { class: 'btn', type: 'button', onclick: () => { confirmBox.hidden = false; confirmBox.querySelector('button').focus(); } }, 'Clear my progress'), confirmBox)
    ];
  }
  function labelForKey(k) {
    if (k === 'quick') return 'Quick Challenge';
    if (k === 'final') return 'Final Challenge';
    if (k.startsWith('topic:')) return 'Topic · ' + topicShort(k.slice(6));
    if (k.startsWith('best:')) return (CHALLENGES.find(c => 'best:' + c.id === k) || {}).title || k;
    return k;
  }
  function aboutView() {
    return [
      h('a', { class: 'crumb', href: '#' }, '← Modes'),
      h('h1', { tabindex: '-1' }, 'How scoring works'),
      h('section', { class: 'panel prose' },
        h('h2', {}, 'Points'),
        h('table', { class: 'tbl' }, h('thead', {}, h('tr', {}, h('th', { scope: 'col' }, 'Level'), h('th', { scope: 'col' }, 'What it asks'), h('th', { scope: 'col' }, 'Points'))),
          h('tbody', {},
            h('tr', {}, h('td', {}, 'Foundation'), h('td', {}, 'Recognise a principle or definition the academic explains'), h('td', {}, '100')),
            h('tr', {}, h('td', {}, 'Application'), h('td', {}, 'Apply it to a section, load case or calculation'), h('td', {}, '150')),
            h('tr', {}, h('td', {}, 'Reasoning'), h('td', {}, 'Reconstruct a method, read a real exam solution, or reason about a change'), h('td', {}, '200')))),
        h('p', {}, 'One attempt per question. No timer, no speed bonus, and no penalty for taking your time to read the explanation.'),
        h('h2', {}, 'Partial credit'),
        h('ul', {},
          h('li', {}, h('b', {}, 'Select all that apply: '), '(correct choices − incorrect choices) ÷ number of correct options, never below zero.'),
          h('li', {}, h('b', {}, 'True or false with reasoning: '), 'half for true/false, half for the reason.'),
          h('li', {}, h('b', {}, 'Classify and matching: '), 'the share of items placed correctly.'),
          h('li', {}, h('b', {}, 'Sequencing: '), 'the share of consecutive pairs in the academic’s order, so one misplaced step costs only a little.'),
          h('li', {}, h('b', {}, 'Numerical: '), '80% for a value within tolerance, 20% for the correct unit. Where there’s only one sensible unit, the value is worth everything.')),
        h('h2', {}, 'Fair comparisons'),
        h('p', {}, 'Beat Your Best challenges always use the same number of questions at each level, so the maximum score never changes. New questions are drawn each time, avoiding the ones you saw in your last attempt.'),
        h('h2', {}, 'Mastery and milestones'),
        h('p', {}, 'Each answer updates the key concepts of that question. A concept is secure when your last five answers average 80% or more (at least three answers). A topic milestone (Foundation, Application or Reasoning) is earned the same way for that topic and level.'),
        h('h2', {}, 'Where the questions come from'),
        h('p', {}, 'Most questions are the checked steps of the Revision Library activities. The numerical, true/false, matching and scenario questions were written from specific passages of the academic’s answers and are labelled as added. Every explanation is the academic’s own words, with a link to the original discussion.'),
        h('p', { class: 'notice' }, 'The levels, point values and added questions are proposals awaiting academic review.'))
    ];
  }

  /* ================= reviewer view ================= */
  function answerKey(q) {
    switch (q.type) {
      case 'mcq': case 'multi': return q.options.filter(o => o.correct).map(o => text(o.html)).join(' | ');
      case 'tf': return `${q.truth ? 'TRUE' : 'FALSE'} because: ${text(q.reasons.find(x => x.correct).html)}`;
      case 'sort': return q.items.map(i => `${text(i.html)} → ${q.categories.find(c => c.id === i.cat).label}`).join(' | ');
      case 'order': return q.items.map((i, n) => `${n + 1}. ${text(i.html)}`).join(' ');
      case 'match': return q.pairs.map(p => `${text(p.left)} ↔ ${text(p.right)}`).join(' | ');
      case 'numeric': return `${q.answer} ${q.unit} (tolerance ${q.tol.abs != null ? '±' + q.tol.abs : '±' + q.tol.rel * 100 + '%'})`;
    }
    return '';
  }
  function reviewView() {
    const filt = { origin: '', type: '', level: '' };
    const list = h('ol', { class: 'rv-list' });
    const count = h('p', { class: 'hint', 'aria-live': 'polite' });
    function fill() {
      const qs = Qs.filter(q => (!filt.origin || (filt.origin === 'new' ? q.origin === 'new' : q.origin !== 'new')) && (!filt.type || TYPE_KEY(q) === filt.type) && (!filt.level || String(q.level) === filt.level));
      count.textContent = `${qs.length} of ${Qs.length} questions`;
      list.innerHTML = '';
      qs.forEach(q => {
        const btn = h('button', { class: 'linkbtn', type: 'button', onclick: () => openSource(q, btn) }, 'View source');
        const tryIt = h('a', { href: '#try/' + encodeURIComponent(q.id) }, 'Try it (not scored)');
        list.append(h('li', { class: 'rv' },
          h('div', { class: 'rv-h' }, h('code', {}, q.id), h('span', { class: 'lvl lvl-' + q.level }, LEVELS[q.level].name), h('span', { class: 'pill' }, TYPE(q)), h('span', { class: 'pill awaiting-review' }, 'Awaiting review')),
          h('p', { class: 'rv-p', html: q.prompt }),
          h('dl', { class: 'rv-dl' },
            h('dt', {}, 'Answer'), h('dd', {}, answerKey(q)),
            h('dt', {}, 'Topic'), h('dd', {}, topicLabel(q.topic)),
            h('dt', {}, 'Concepts'), h('dd', {}, keyConcepts(q).map(conceptLabel).join(', ')),
            h('dt', {}, 'Origin'), h('dd', {}, q.origin === 'new' ? 'Written for the game from the academic’s explanation' : q.origin),
            h('dt', {}, 'Source blocks'), h('dd', {}, q.refs.map(r => `${r.faq}: ${r.ids.join(', ')}`).join(' · ')),
            h('dt', {}, 'PDF'), h('dd', {}, srcLine(q), ' ', btn, ' · ', tryIt),
            q.note ? [h('dt', {}, 'Note'), h('dd', { html: q.note })] : null)));
      });
    }
    const sel = (lab, key, opts) => h('label', { class: 'rv-f' }, lab, h('select', { onchange: e => { filt[key] = e.target.value; fill(); } }, h('option', { value: '' }, 'All'), opts.map(([v, t]) => h('option', { value: v }, t))));
    const dl = h('button', { class: 'btn', type: 'button', onclick: () => {
      const data = Qs.map(q => ({ id: q.id, type: q.type, kind: q.kind || null, level: q.level, topic: q.topic, concepts: q.concepts, prompt: text(q.prompt), answer: answerKey(q), origin: q.origin, refs: q.refs, source: q.src, status: q.status }));
      const a = h('a', { href: URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })), download: 'beat-your-best-question-bank.json' });
      document.body.append(a); a.click(); a.remove();
    } }, 'Download question bank (JSON)');
    fill();
    return [
      h('a', { class: 'crumb', href: '#' }, '← Modes'),
      h('h1', { tabindex: '-1' }, 'Reviewer view'),
      h('p', { class: 'lead' }, 'Every question with its answer key, level, origin and the exact source passages it relies on. Levels for converted questions are set by a rule (see docs/GAME.md) and can be overridden per step with level: 1–3.'),
      BANK.problems.length ? h('div', { class: 'notice' }, h('b', {}, 'Integrity problems: '), BANK.problems.join('; ')) : h('p', { class: 'notice ok' }, `Integrity check passed: all ${Qs.reduce((s, q) => s + q.refs.reduce((t, r) => t + r.ids.length, 0), 0)} source references resolve to passages in the PDF transcription.`),
      h('div', { class: 'rv-filters' },
        sel('Origin', 'origin', [['activity', 'From library activities'], ['new', 'Written for the game']]),
        sel('Type', 'type', [...new Set(Qs.map(TYPE_KEY))].map(k => [k, TYPE(Qs.find(q => TYPE_KEY(q) === k))])),
        sel('Level', 'level', [['1', 'Foundation'], ['2', 'Application'], ['3', 'Reasoning']]),
        dl),
      count, list
    ];
  }

  /* ================= router ================= */
  function render() {
    const hash = location.hash.replace(/^#/, '');
    let main, route = 'home';
    if (hash === 'play') { main = playView(); route = 'play'; }
    else if (hash === 'results') { main = resultsView(); route = 'results'; }
    else if (hash === 'topic') { main = topicPickView(); route = 'topic'; }
    else if (hash.startsWith('topic/')) { const t = hash.slice(6); startTopic(t); return; }
    else if (hash.startsWith('try/')) { const q = qById(decodeURIComponent(hash.slice(4))); if (q) { startRun({ mode: 'preview', key: null, title: 'Reviewer preview (not scored)', questions: [q], again: () => { location.hash = '#try/' + q.id; } }); return; } main = homeView(); }
    else if (hash === 'best') { main = bestPickView(); route = 'best'; }
    else if (hash === 'recovery') { main = recoveryView(); route = 'recovery'; }
    else if (hash === 'progress') { main = progressView(); route = 'progress'; }
    else if (hash === 'about') { main = aboutView(); route = 'about'; }
    else if (hash === 'review') { main = reviewView(); route = 'review'; }
    else main = homeView();
    if (route !== 'play' && route !== 'results' && run && !run.summary) run = null; // leaving a session ends it
    app.innerHTML = '';
    app.append(...frame(main, route));
    document.title = ({ play: run ? run.title : 'Play', results: 'Results', topic: 'Topic Challenge', best: 'Beat Your Best challenges', recovery: 'Knowledge Recovery', progress: 'My progress', about: 'How scoring works', review: 'Reviewer view' }[route] || 'Modes') + ' · Beat Your Best';
    requestAnimationFrame(() => {
      if (run && run._focus && (route === 'play' || route === 'results')) { run._focus(); run._focus = null; }
      else { const h1 = app.querySelector('main h1'); if (h1) h1.focus({ preventScroll: true }); }
      window.scrollTo(0, 0);
    });
  }
  window.addEventListener('hashchange', render);
  render();

  window.BYB = { bank: Qs, state: () => S, parseNumber, CHALLENGES };
})();
