/* Thin-Walled Beams FAQ Lab — application engine.
 * Reads FAQ content from window.FAQ_REGISTRY (data/*.js) and interactive
 * widgets from window.FAQ_WIDGETS (js/widgets/*.js). No content lives here.
 */
(function () {
  'use strict';

  const STAGES = [['explore', 'Explore'], ['predict', 'Predict'], ['interact', 'Interact'], ['feedback', 'Feedback'], ['reflect', 'Reflect']];
  const STATUS = { draft: 'Draft', 'awaiting-review': 'Awaiting academic review', approved: 'Approved' };
  const KEY = 'faq-lab-session-v1';
  const app = document.getElementById('app');
  const faqs = () => (window.FAQ_REGISTRY || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));
  const byId = id => faqs().find(f => f.id === id);

  /* ---------- session storage (no personal data; cleared when the tab closes) ---------- */
  let store = {};
  // Activity progress is kept on this device only (localStorage), so students can come back to it.
  // It holds answers and reflections, never names or accounts. "My revision" offers a clear button.
  try { store = JSON.parse(localStorage.getItem(KEY)) || JSON.parse(sessionStorage.getItem(KEY)) || {}; } catch (e) { store = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* storage unavailable: progress lasts for this view only */ } }
  function S(id) { return store[id] || (store[id] = { answers: {}, reflections: {}, widgets: {}, step: null, done: false }); }
  function resetFaq(id) { delete store[id]; save(); }

  /* ---------- DOM helpers ---------- */
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid.nodeType ? kid : document.createTextNode(kid));
    return el;
  }
  const ICON = {
    src: '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 2h8v6H5l-3 2z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    add: '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1.5v9M1.5 6h9" stroke="currentColor" stroke-width="1.6"/></svg>'
  };
  const provSrc = (who) => h('span', { class: 'prov src', html: ICON.src + ' Original discussion · ' + who });
  const provAdd = (txt) => h('span', { class: 'prov add', html: ICON.add + ' ' + (txt || 'Added for revision · awaiting review') });

  /* ---------- source rendering ---------- */
  /* An activity can draw on several threads: the primary one (faq.source) plus
     source.threads[] (related threads, e.g. where the academic pointed to this one).
     Block ids must be unique across all threads of an activity. */
  function threadsOf(faq) {
    const s = faq.source;
    return [Object.assign({ discussion: faq.discussion, pages: faq.pages }, s), ...(s.threads || [])];
  }
  const kindOf = author => /academic/i.test(author || '') ? 'academic' : 'student';
  function allSourceBlocks(faq) {
    const out = [];
    threadsOf(faq).forEach(t => {
      if (t.question) t.question.blocks.forEach(b => out.push({ b, who: t.question.author, kind: 'student' }));
      if (t.answer) t.answer.blocks.forEach(b => out.push({ b, who: t.answer.author, kind: 'academic' }));
      (t.followUps || []).forEach(f => f.blocks.forEach(b => out.push({ b, who: f.author, kind: kindOf(f.author) })));
      (t.annotations || []).forEach(b => out.push({ b, who: b.label, kind: 'annotation' }));
    });
    return out;
  }
  function renderBlock(b, hl) {
    const cls = hl ? 'hl' : null;
    if (b.type === 'figure') {
      return h('figure', { class: cls, id: b.domId },
        h('img', { src: b.src, alt: b.alt, loading: 'lazy' }),
        h('figcaption', {}, b.caption));
    }
    if (b.type === 'math') return h('div', { class: 'math ' + (cls || ''), role: 'math', 'aria-label': b.label, html: b.html });
    if (b.type === 'note') return h('p', { class: 'note', html: b.html });
    return h('p', { class: cls, html: b.html });
  }
  /* Quote a set of source items (by id) as verbatim blocks, grouped by author. */
  function quote(faq, refs) {
    const items = allSourceBlocks(faq).filter(x => refs.includes(x.b.id));
    if (!items.length) return null;
    const groups = [];
    items.forEach(x => {
      const last = groups[groups.length - 1];
      if (last && last.who === x.who) last.items.push(x); else groups.push({ who: x.who, kind: x.kind, items: [x] });
    });
    return h('div', { class: 'feedback-quotes', style: 'display:grid;gap:10px' }, groups.map(g =>
      h('div', { class: 'source' },
        provSrc(g.kind === 'annotation' ? g.who.toLowerCase() : (g.kind === 'academic' ? 'academic response (verbatim)' : 'student question (anonymised)')),
        g.items.map(x => renderBlock(x.b))
      )));
  }
  function questionExcerpt(faq, ids) {
    const blocks = allSourceBlocks(faq).filter(x => x.kind === 'student' && ids.includes(x.b.id)).map(x => x.b);
    return h('details', { class: 'question', open: true },
      h('summary', {}, 'The student’s question'),
      h('div', { class: 'source' }, provSrc('student question (anonymised, excerpt)'), blocks.map(b => renderBlock(b))));
  }

  /* ---------- source dialog ---------- */
  let dlg;
  function openSource(faq, highlight) {
    highlight = highlight || [];
    if (!dlg) { dlg = h('dialog', { class: 'src-dialog', 'aria-labelledby': 'dlg-title' }); document.body.append(dlg); dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); }); }
    dlg.innerHTML = '';
    const ts = threadsOf(faq);
    const block = (title, author, blocks, kind) => h('section', { class: 'thread-part' },
      h('h4', {}, title),
      h('div', { class: 'source' }, provSrc(kind === 'academic' ? 'academic response (verbatim)' : 'student question (anonymised)'),
        h('div', { class: 'who' }, author),
        blocks.map(b => renderBlock(b, highlight.includes(b.id)))));
    const threadView = (t, i) => h('section', { class: 'thread' },
      h('h3', {}, (ts.length > 1 ? `Thread ${i + 1}: ` : '') + t.title, h('span', { class: 'thread-ref' }, ` · #${t.discussion}, PDF pages ${t.pages}`)),
      t.question ? block('Question', t.question.author, t.question.blocks, 'student') : null,
      t.answer ? block('Answer', t.answer.author, t.answer.blocks, 'academic') : null,
      (t.followUps || []).map(f => block(kindOf(f.author) === 'academic' ? 'Follow-up answer' : 'Follow-up question', f.author, f.blocks, kindOf(f.author))),
      (t.annotations || []).length ? block('Annotations in the posted solution', 'Solution', t.annotations, 'academic') : null);
    dlg.append(
      h('div', { class: 'dlg-head' },
        h('div', {}, h('div', { class: 'eyebrow' }, ts.length > 1 ? `${ts.length} discussion threads` : `Discussion #${faq.discussion} · PDF pages ${faq.pages}`), h('h2', { id: 'dlg-title' }, 'Original discussion')),
        h('button', { class: 'btn', onclick: () => dlg.close(), 'aria-label': 'Close original discussion' }, 'Close')),
      h('div', { class: 'dlg-body' },
        h('p', { class: 'thread-meta' }, `${faq.source.board || 'Lectures & Tutorials'}. Student names have been removed. Academic wording is unchanged. Highlighted passages relate to the activity you came from.`),
        ts.map(threadView)));
    dlg.showModal();
    const first = dlg.querySelector('.hl');
    if (first) first.scrollIntoView({ block: 'center' });
  }

  /* ---------- header / footer ---------- */
  function header(route) {
    const L = window.FAQ_LIBRARY;
    const saved = (() => { try { return (JSON.parse(localStorage.getItem('faq-lab-library-v1')) || {}).bookmarks.length; } catch (e) { return 0; } })();
    const nav = (href, label, key, extra) => h('a', { href, class: 'navlink', 'aria-current': route === key ? 'page' : null }, label, extra || null);
    return h('header', { class: 'bar' }, h('div', { class: 'bar-in' },
      h('a', { class: 'brand', href: '#' },
        h('span', { html: '<svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><path d="M22 5H8v18h14" fill="none" stroke="currentColor" stroke-width="3.2"/><circle cx="4.5" cy="14" r="2.2" fill="var(--load)"/></svg>' }),
        h('span', { class: 'brand-txt' }, h('b', {}, 'Structures Revision Library'), h('small', {}, 'FAQ Lab · prototype'))),
      route !== 'home' && route !== 'library' && L ? h('div', { class: 'bar-search' }, L.searchBox({ compact: true })) : null,
      h('nav', { class: 'mainnav', 'aria-label': 'Main' },
        nav('#library', 'Browse', 'library'),
        nav('#find-help', 'Find help', 'find-help'),
        nav('#my-revision', 'My revision', 'my-revision', saved ? h('span', { class: 'badge-n', 'aria-label': `${saved} saved` }, String(saved)) : null))));
  }
  function footer() {
    const review = h('input', { type: 'checkbox', id: 'review-toggle' });
    try { review.checked = sessionStorage.getItem('faq-lab-review') === '1'; } catch (e) {}
    document.body.classList.toggle('review-on', review.checked);
    review.addEventListener('change', () => {
      document.body.classList.toggle('review-on', review.checked);
      try { sessionStorage.setItem('faq-lab-review', review.checked ? '1' : '0'); } catch (e) {}
    });
    return h('footer', { class: 'foot' }, h('div', { class: 'bar-in' },
      h('span', { class: 'muted small' }, 'Engineering EdTech · Digital Media R&D prototype. No accounts and no tracking.'),
      h('span', { class: 'foot-tools' }, h('span', { class: 'muted small' }, 'For reviewers:'),
        h('label', { class: 'toggle', for: 'review-toggle' }, review, 'Highlight added content'),
        h('a', { class: 'btn quiet small', href: '#review' }, 'Review checklist'))));
  }

  /* ---------- activity ---------- */
  function stepIndex(faq, id) { return faq.steps.findIndex(s => s.id === id); }
  function nextAfter(faq, step) {
    if (step.next) return step.next;
    for (let i = stepIndex(faq, step.id) + 1; i < faq.steps.length; i++) if (!faq.steps[i].branchOnly) return faq.steps[i].id;
    return 'summary';
  }
  const history = {};
  function go(faq, id, push) {
    const st = S(faq.id);
    if (push !== false && st.step) (history[faq.id] = history[faq.id] || []).push(st.step);
    st.step = id; save();
    renderActivity(faq, true);
  }
  function back(faq) {
    const hst = history[faq.id] || [];
    if (hst.length) { S(faq.id).step = hst.pop(); save(); renderActivity(faq, true); }
    else location.hash = 'resource-' + faq.id;
  }

  function activityView(faq) {
    const st = S(faq.id);
    if (!st.step) st.step = faq.steps[0].id;
    const step = st.step === 'summary' ? { id: 'summary', stage: 'reflect', type: 'summary' } : faq.steps[stepIndex(faq, st.step)] || faq.steps[0];
    const stageIdx = STAGES.findIndex(s => s[0] === step.stage);
    const root = h('main', { class: 'wrap', id: 'main' },
      h('div', { class: 'act-head' },
        h('div', { style: 'display:flex;gap:10px;align-items:center;flex-wrap:wrap' }, h('a', { href: '#resource-' + faq.id, class: 'btn quiet', style: 'padding-left:0' }, '← About this activity'), window.FAQ_LIBRARY ? window.FAQ_LIBRARY.saveButton(window.FAQ_LIBRARY.resById(faq.id), true) : null),
        h('div', { class: 'row' },
          h('div', { style: 'display:grid;gap:6px' },
            h('div', { class: 'eyebrow' }, `${threadsOf(faq).length > 1 ? 'Discussions ' + threadsOf(faq).map(t => '#' + t.discussion).join(', ') : 'Discussion #' + faq.discussion} · ${faq.card.activity}`),
            h('h1', {}, faq.card.heading)),
          h('div', { class: 'actions' },
            h('span', { class: 'pill ' + faq.status, style: 'align-self:center' }, STATUS[faq.status]),
            h('button', { class: 'btn', onclick: () => openSource(faq) }, 'Original discussion'),
            h('button', { class: 'btn', onclick: () => { resetFaq(faq.id); history[faq.id] = []; renderActivity(faq, true); } }, 'Start again')))),
      h('ol', { class: 'stages', 'aria-label': 'Learning sequence' }, STAGES.map(([k, l], i) =>
        h('li', { class: i < stageIdx || st.done ? 'done' : '', 'aria-current': i === stageIdx && step.type !== 'summary' ? 'step' : null }, l))));
    const body = step.type === 'summary' ? summaryView(faq) : renderStep(faq, step);
    root.append(body);
    return root;
  }

  function stepFrame(faq, step, wide) {
    const box = h('section', { class: 'step' + (wide ? ' wide' : ''), 'aria-labelledby': 'step-title' });
    const stage = STAGES.find(s => s[0] === step.stage);
    box.append(h('div', { class: 'step-head' },
      h('div', { class: 'eyebrow' }, stage ? stage[1] : ''),
      step.title ? h('h2', { id: 'step-title', tabindex: '-1' }, step.title) : h('h2', { id: 'step-title', tabindex: '-1', class: 'sr-only' }, stage ? stage[1] : 'Step')));
    return box;
  }
  function navRow(faq, step, nextLabel, onNext, extra) {
    return h('div', { class: 'nav' },
      h('button', { class: 'btn quiet', onclick: () => back(faq) }, '← Back'),
      h('div', { class: 'right' }, extra || null,
        onNext ? h('button', { class: 'btn primary', onclick: onNext }, nextLabel || 'Continue →') : null));
  }

  function renderStep(faq, step) {
    const box = stepFrame(faq, step, step.type === 'widget');
    const body = h('div', { class: 'step-body' });
    box.append(body);
    if (step.html) body.append(h('div', { class: 'is-added', style: 'display:grid;gap:10px', html: step.html }));
    if (step.figure) body.append(quote(faq, [step.figure]));

    if (step.type === 'intro') {
      if (step.showQuestion) body.append(questionExcerpt(faq, step.showQuestion));
      body.append(h('p', { style: 'color:var(--muted);font-size:.92rem' }, 'You can open the full thread, including the academic’s answer, at any time with “Original discussion”. Try the activity first.'));
      box.append(navRow(faq, step, 'Start →', () => go(faq, nextAfter(faq, step))));
    } else if (step.type === 'mcq') {
      mcq(faq, step, body, box);
    } else if (step.type === 'sort' || step.type === 'order') {
      (step.type === 'sort' ? sortStep : orderStep)(faq, step, body, box);
    } else if (step.type === 'widget') {
      const host = h('div');
      body.append(host);
      const w = (window.FAQ_WIDGETS || {})[step.widget];
      if (w) w.mount(host, step.config || {}, widgetCtx(faq, step));
      else host.append(h('div', { class: 'placeholder' }, h('h3', {}, 'Widget not found'), `No widget called “${step.widget}” is registered.`));
      box.append(navRow(faq, step, null, () => go(faq, nextAfter(faq, step))));
    } else if (step.type === 'feedback') {
      step.questions.forEach(qid => {
        const q = faq.steps.find(s => s.id === qid);
        const a = S(faq.id).answers[qid];
        const p = h('div', { class: 'panel' }, h('div', { class: 'prompt', style: 'font-size:1.05rem', html: q.prompt }));
        if (!a) p.append(h('p', { class: 'tick none' }, 'No prediction recorded.'));
        else {
          const opt = q.options.find(o => o.id === a.first);
          p.append(h('div', {}, h('div', { class: 'eyebrow', style: 'margin-bottom:4px' }, 'Your prediction'), h('div', { html: opt.html })));
          p.append(verdict(opt.correct));
          p.append(quote(faq, opt.refs || []));
          if (!opt.correct) {
            const right = q.options.find(o => o.correct);
            p.append(h('div', { class: 'is-added' }, h('div', { class: 'eyebrow', style: 'margin-bottom:4px' }, 'The answer consistent with the academic’s explanation'), h('div', { html: right.html })));
          }
        }
        body.append(p);
      });
      box.append(navRow(faq, step, null, () => go(faq, nextAfter(faq, step))));
    } else if (step.type === 'reflect') {
      reflect(faq, step, body, box);
    }
    return box;
  }

  function verdict(ok, deferred) {
    if (deferred) return h('div', { class: 'verdict saved', role: 'status' }, 'Prediction saved. You’ll compare it with the academic’s explanation after you explore.');
    return h('div', { class: 'verdict ' + (ok ? 'ok' : 'bad'), role: 'status' },
      ok ? '✓ Consistent with the academic’s explanation' : '✕ Not what the academic’s explanation says');
  }

  function mcq(faq, step, body, box) {
    const st = S(faq.id);
    const name = 'q-' + faq.id + '-' + step.id;
    const fs = h('fieldset', { class: 'options' }, h('legend', { class: 'prompt', html: step.prompt, style: 'margin-bottom:10px' }));
    const multi = !!step.multi;
    if (multi) fs.append(h('p', { class: 'hint' }, 'Select all that apply.'));
    const inputs = step.options.map(o => {
      const inp = h('input', { type: multi ? 'checkbox' : 'radio', name, value: o.id, id: name + '-' + o.id });
      const lab = h('label', { class: 'opt', for: inp.id }, inp, h('span', { html: o.html }), h('span', { class: 'mark' }));
      fs.append(lab);
      return { o, inp, lab };
    });
    body.append(fs);
    const fb = h('div', { class: 'feedback', 'aria-live': 'polite' });
    body.append(fb);
    const checkBtn = h('button', { class: 'btn primary' }, step.defer ? 'Lock in prediction' : 'Check answer');
    const tryBtn = h('button', { class: 'btn', hidden: true }, 'Try again');
    const contBtn = h('button', { class: 'btn primary', hidden: true }, 'Continue →');
    let chosen = null;

    function showMulti(ids) {
      inputs.forEach(x => { x.inp.disabled = true; x.inp.checked = ids.includes(x.o.id); });
      fs.classList.add('locked'); fb.innerHTML = '';
      const ok = inputs.every(x => !!x.o.correct === ids.includes(x.o.id));
      inputs.forEach(x => {
        const picked = ids.includes(x.o.id);
        if (picked || x.o.correct) {
          const good = picked === !!x.o.correct;
          x.lab.classList.add(good ? 'is-correct' : 'is-wrong');
          x.lab.querySelector('.mark').textContent = good ? (picked ? 'Consistent' : '') : (picked ? 'Not consistent' : 'Missed');
        }
      });
      fb.append(verdict(ok));
      const refs = step.refs || Array.from(new Set(step.options.filter(o => o.correct).flatMap(o => o.refs || [])));
      if (refs.length) { fb.append(h('div', { class: 'eyebrow' }, 'What the academic said')); fb.append(quote(faq, refs)); }
      checkBtn.hidden = true; tryBtn.hidden = ok; contBtn.hidden = false;
    }
    function showResult(optId) {
      if (multi) return showMulti(optId);
      const r = inputs.find(x => x.o.id === optId);
      inputs.forEach(x => { x.inp.disabled = true; x.inp.checked = x.o.id === optId; });
      fs.classList.add('locked');
      fb.innerHTML = '';
      if (step.defer) {
        fb.append(verdict(null, true));
      } else {
        r.lab.classList.add(r.o.correct ? 'is-correct' : 'is-wrong');
        r.lab.querySelector('.mark').textContent = r.o.correct ? 'Consistent' : 'Not consistent';
        fb.append(verdict(r.o.correct));
        if (r.o.refs) {
          fb.append(h('div', { class: 'eyebrow' }, 'What the academic said'));
          fb.append(quote(faq, r.o.refs));
        }
        if (!r.o.correct && r.o.next) fb.append(h('p', { class: 'is-added', style: 'font-size:.95rem' }, 'Continue to look at this from another angle, or try again.'));
      }
      chosen = r.o;
      checkBtn.hidden = true;
      tryBtn.hidden = step.defer || r.o.correct;
      contBtn.hidden = false;
    }
    checkBtn.addEventListener('click', () => {
      if (multi) {
        const ids = inputs.filter(x => x.inp.checked).map(x => x.o.id);
        if (!ids.length) { fb.innerHTML = ''; fb.append(h('p', { class: 'verdict bad' }, 'Choose at least one option.')); return; }
        const ok = inputs.every(x => !!x.o.correct === ids.includes(x.o.id));
        if (!st.answers[step.id]) st.answers[step.id] = { first: ids, firstCorrect: ok, latest: ids }; else st.answers[step.id].latest = ids;
        save(); return showResult(ids);
      }
      const sel = inputs.find(x => x.inp.checked);
      if (!sel) { fb.innerHTML = ''; fb.append(h('p', { class: 'verdict bad' }, 'Choose an option first.')); return; }
      const rec = st.answers[step.id];
      if (!rec) st.answers[step.id] = { first: sel.o.id, firstCorrect: !!sel.o.correct, latest: sel.o.id };
      else { rec.latest = sel.o.id; }
      save();
      showResult(sel.o.id);
    });
    tryBtn.addEventListener('click', () => {
      inputs.forEach(x => { x.inp.disabled = false; x.inp.checked = false; x.lab.classList.remove('is-correct', 'is-wrong'); x.lab.querySelector('.mark').textContent = ''; });
      fs.classList.remove('locked'); fb.innerHTML = '';
      checkBtn.hidden = false; tryBtn.hidden = true; contBtn.hidden = true;
      inputs[0].inp.focus();
    });
    contBtn.addEventListener('click', () => go(faq, (chosen && chosen.next) || nextAfter(faq, step)));
    const prev = st.answers[step.id];
    if (prev) showResult(prev.latest);
    box.append(navRow(faq, step, null, null, [tryBtn, checkBtn, contBtn]));
  }

  /* ---------- sort: place each statement in a group (radio group per item, keyboard friendly) ---------- */
  function checkedStep(faq, step, body, box, ui) {
    const st = S(faq.id);
    const fb = h('div', { class: 'feedback', 'aria-live': 'polite' });
    const checkBtn = h('button', { class: 'btn primary' }, 'Check answers');
    const tryBtn = h('button', { class: 'btn', hidden: true }, 'Try again');
    const contBtn = h('button', { class: 'btn primary', hidden: true }, 'Continue →');
    body.append(ui.el, fb);
    function show(value) {
      const res = ui.mark(value);
      fb.innerHTML = '';
      fb.append(verdict(res.ok));
      if (!res.ok && res.msg) fb.append(h('p', { class: 'hint' }, res.msg));
      if (step.refs) { fb.append(h('div', { class: 'eyebrow' }, 'What the academic said')); fb.append(quote(faq, step.refs)); }
      checkBtn.hidden = true; tryBtn.hidden = res.ok; contBtn.hidden = false;
    }
    checkBtn.addEventListener('click', () => {
      const v = ui.value();
      if (v == null) { fb.innerHTML = ''; fb.append(h('p', { class: 'verdict bad' }, ui.incomplete)); return; }
      const res = ui.mark(v, true);
      if (!st.answers[step.id]) st.answers[step.id] = { first: v, firstCorrect: res.ok, latest: v, wrong: res.wrong }; else st.answers[step.id].latest = v;
      save(); show(v);
    });
    tryBtn.addEventListener('click', () => { ui.reset(); fb.innerHTML = ''; checkBtn.hidden = false; tryBtn.hidden = true; contBtn.hidden = true; });
    contBtn.addEventListener('click', () => go(faq, nextAfter(faq, step)));
    const prev = st.answers[step.id];
    if (prev) { ui.restore(prev.latest); show(prev.latest); }
    box.append(navRow(faq, step, null, null, [tryBtn, checkBtn, contBtn]));
  }
  function sortStep(faq, step, body, box) {
    const name = 'sort-' + faq.id + '-' + step.id;
    const rows = step.items.map((it, i) => {
      const radios = step.categories.map(c => {
        const id = `${name}-${i}-${c.id}`;
        const inp = h('input', { type: 'radio', name: `${name}-${i}`, id, value: c.id });
        return { c, inp, lab: h('label', { class: 'seg', for: id }, inp, h('span', {}, c.label)) };
      });
      const mark = h('span', { class: 'mark' });
      const row = h('fieldset', { class: 'sort-row' }, h('legend', { html: it.html }), h('div', { class: 'segs' }, radios.map(r => r.lab)), mark);
      return { it, radios, row, mark };
    });
    const el = h('div', { class: 'sort' }, h('p', { class: 'prompt', html: step.prompt }), rows.map(r => r.row));
    checkedStep(faq, step, body, box, {
      el, incomplete: 'Place every statement in a group first.',
      value: () => { const v = rows.map(r => (r.radios.find(x => x.inp.checked) || {}).c); return v.every(Boolean) ? v.map(c => c.id) : null; },
      mark: (v, dry) => {
        const wrong = [];
        rows.forEach((r, i) => {
          const ok = v[i] === r.it.cat;
          if (!ok) wrong.push(i);
          if (dry) return;
          r.radios.forEach(x => { x.inp.disabled = true; x.inp.checked = x.c.id === v[i]; });
          r.row.classList.remove('is-correct', 'is-wrong'); r.row.classList.add(ok ? 'is-correct' : 'is-wrong');
          r.mark.textContent = ok ? '✓' : '✕ ' + step.categories.find(c => c.id === r.it.cat).label;
        });
        return { ok: !wrong.length, wrong, msg: wrong.length ? `${wrong.length} of ${rows.length} placed differently from the academic’s explanation. The correct group is shown next to each one.` : '' };
      },
      reset: () => rows.forEach(r => { r.radios.forEach(x => { x.inp.disabled = false; x.inp.checked = false; }); r.row.classList.remove('is-correct', 'is-wrong'); r.mark.textContent = ''; }),
      restore: v => rows.forEach((r, i) => r.radios.forEach(x => { x.inp.checked = x.c.id === v[i]; }))
    });
  }
  /* ---------- order: put method steps in sequence (move up / move down buttons) ---------- */
  function orderStep(faq, step, body, box) {
    const correct = step.items.map(i => i.id);
    // deterministic shuffle so the starting order is the same each visit
    let cur = correct.slice().sort((a, b) => ((a.charCodeAt(0) * 7 + a.length * 13) % 11) - ((b.charCodeAt(0) * 7 + b.length * 13) % 11));
    if (cur.join() === correct.join()) cur.reverse();
    const start = cur.slice();
    let locked = false;
    const list = h('ol', { class: 'order' });
    const live = h('p', { class: 'sr-only', 'aria-live': 'polite' });
    const label = id => step.items.find(i => i.id === id).html;
    function render(marks) {
      list.innerHTML = '';
      cur.forEach((id, i) => {
        const txt = h('span', { class: 'order-txt', html: label(id) });
        const up = h('button', { class: 'btn icon', type: 'button', disabled: locked || i === 0, 'aria-label': 'Move up: ' + txt.textContent, onclick: () => move(i, -1) }, '↑');
        const dn = h('button', { class: 'btn icon', type: 'button', disabled: locked || i === cur.length - 1, 'aria-label': 'Move down: ' + txt.textContent, onclick: () => move(i, 1) }, '↓');
        const li = h('li', { class: 'order-item' + (marks ? (marks[i] ? ' is-correct' : ' is-wrong') : '') }, h('span', { class: 'order-n' }, String(i + 1)), txt, h('span', { class: 'order-btns' }, up, dn));
        list.append(li);
      });
    }
    function move(i, d) {
      const j = i + d; [cur[i], cur[j]] = [cur[j], cur[i]]; render();
      live.textContent = `Moved to position ${j + 1}.`;
      const btn = list.children[j].querySelectorAll('button')[d < 0 ? 0 : 1];
      (btn && !btn.disabled ? btn : list.children[j].querySelector('button:not([disabled])')).focus();
    }
    render();
    checkedStep(faq, step, body, box, {
      el: h('div', { class: 'order-wrap' }, h('p', { class: 'prompt', html: step.prompt }), h('p', { class: 'hint' }, 'Use the arrow buttons to reorder the steps.'), list, live),
      incomplete: '', value: () => cur.slice(),
      mark: (v, dry) => {
        const marks = v.map((id, i) => id === correct[i]);
        if (!dry) { locked = true; cur = v.slice(); render(marks); }
        const wrong = marks.map((m, i) => m ? null : i).filter(x => x != null);
        return { ok: !wrong.length, wrong, msg: wrong.length ? `${wrong.length} step${wrong.length > 1 ? 's are' : ' is'} in a different position from the academic’s method.` : '' };
      },
      reset: () => { locked = false; cur = start.slice(); render(); },
      restore: v => { cur = v.slice(); }
    });
  }

  function recallList(faq, ids) {
    const st = S(faq.id);
    return h('div', { class: 'recall' }, ids.map(id => {
      const q = faq.steps.find(s => s.id === id);
      const a = st.answers[id];
      const single = q.type === 'mcq' && !q.multi;
      const opt = a && single ? q.options.find(o => o.id === a.first) : null;
      const ans = !a ? '<em>Not answered</em>' : single ? opt.html : q.type === 'mcq' ? q.options.filter(o => a.first.includes(o.id)).map(o => o.html).join('; ') : (q.type === 'sort' ? 'Sorting task' : 'Ordering task');
      const ok = a ? a.firstCorrect : null;
      return h('div', { class: 'recall-row' },
        h('div', {}, h('div', { class: 'q', html: q.prompt }), h('div', { html: ans })),
        h('span', { class: 'tick ' + (a ? (ok ? 'ok' : 'bad') : 'none') }, a ? (ok ? '✓ First try' : '✕ First try') : '—'));
    }));
  }

  function reflect(faq, step, body, box) {
    const st = S(faq.id);
    if (step.recall) body.append(h('div', { class: 'panel' }, h('h3', {}, 'Your earlier answers'), recallList(faq, step.recall)));
    if (step.recapClassify) {
      const w = st.widgets[step.recapClassify];
      if (w && w.wrong && w.wrong.length) body.append(h('div', { class: 'panel' }, h('h3', {}, 'Elements you classified incorrectly on the first check'),
        h('p', {}, w.wrong.join(', ')), quote(faq, ['c1', 'sol-note'])));
    }
    if (step.figure) body.append(quote(faq, [step.figure]));
    const ta = h('textarea', { id: 'reflect-' + faq.id, 'aria-labelledby': 'reflect-prompt-' + faq.id, placeholder: 'Write a few sentences. This stays in this browser tab and isn’t sent anywhere.' });
    ta.value = st.reflections[step.id] || '';
    ta.addEventListener('input', () => { st.reflections[step.id] = ta.value; save(); });
    body.append(h('div', { class: 'is-added', style: 'display:grid;gap:8px' }, h('div', { class: 'prompt', id: 'reflect-prompt-' + faq.id, html: step.prompt }), ta));
    if (step.placeholder) body.append(h('div', { class: 'placeholder' }, h('h3', { html: step.placeholder.title }), h('p', { html: step.placeholder.html })));
    const revealBox = h('div', { hidden: true, style: 'display:grid;gap:10px' });
    const tsr = threadsOf(faq);
    revealBox.append(h('h3', {}, tsr.length > 1 ? 'The academic’s full answers' : 'The academic’s full answer'),
      tsr.map(t => [
        tsr.length > 1 ? h('h4', {}, `#${t.discussion}: ${t.title}`) : null,
        t.answer ? h('div', { class: 'source' }, provSrc('academic response (verbatim)'), t.answer.blocks.map(b => renderBlock(b))) : null,
        (t.followUps || []).length ? h('div', { class: 'source' }, provSrc('follow-up exchange (verbatim, anonymised)'),
          t.followUps.map(f => [h('div', { class: 'who' }, f.author), f.blocks.map(b => renderBlock(b))])) : null]));
    const revealBtn = h('button', { class: 'btn' }, 'Show the academic’s full answer');
    revealBtn.addEventListener('click', () => { revealBox.hidden = !revealBox.hidden; revealBtn.textContent = revealBox.hidden ? 'Show the academic’s full answer' : 'Hide the academic’s full answer'; });
    body.append(h('div', {}, revealBtn), revealBox);
    box.append(navRow(faq, step, 'See revision summary →', () => go(faq, 'summary')));
  }

  function widgetCtx(faq, step) {
    const st = S(faq.id);
    return {
      faq, step, h, quote: refs => quote(faq, refs), provAdd, provSrc,
      get: () => st.widgets[step.id],
      set: (data) => { st.widgets[step.id] = Object.assign(st.widgets[step.id] || {}, data); save(); }
    };
  }

  /* ---------- summary ---------- */
  function assessed(faq) {
    const st = S(faq.id);
    const rows = [];
    faq.steps.forEach(s => {
      if ((s.type === 'mcq' || s.type === 'sort' || s.type === 'order') && s.assess !== false) {
        const a = st.answers[s.id];
        const refs = s.refs || (s.options ? (s.options.find(o => o.correct) || {}).refs : null) || [];
        rows.push({ topic: s.topic, done: !!a, ok: a ? a.firstCorrect : null, refs });
      }
      if (s.type === 'widget' && s.topic) {
        const w = st.widgets[s.id];
        rows.push({ topic: s.topic, done: !!(w && w.checked), ok: w && w.checked ? w.firstCorrect : null, refs: s.refs || [], extra: w && w.wrong && w.wrong.length ? 'First check: ' + w.wrong.join(', ') : null });
      }
    });
    return rows;
  }
  function summaryView(faq) {
    const st = S(faq.id);
    st.done = true; save();
    const rows = assessed(faq);
    const attempted = rows.filter(r => r.done).length;
    const right = rows.filter(r => r.ok).length;
    const weak = rows.filter(r => r.done && !r.ok);
    const box = h('section', { class: 'step', 'aria-labelledby': 'step-title' },
      h('div', { class: 'step-head' }, h('div', { class: 'eyebrow' }, 'Revision summary'), h('h2', { id: 'step-title', tabindex: '-1' }, 'How this activity went')),
      h('div', { class: 'stats' },
        h('div', { class: 'stat' }, h('b', {}, `${attempted}/${rows.length}`), h('span', {}, 'Questions attempted')),
        h('div', { class: 'stat' }, h('b', {}, String(right)), h('span', {}, 'Consistent with the academic on the first try')),
        h('div', { class: 'stat' }, h('b', {}, String(weak.length)), h('span', {}, 'Worth revisiting'))),
      h('div', {}, h('h3', { style: 'margin-bottom:8px' }, 'By topic'),
        h('div', { class: 'topics' }, rows.map(r => h('div', { class: 'topic' },
          h('span', { class: 'badge ' + (r.ok ? 'ok' : r.done ? 'bad' : 'none'), 'aria-hidden': 'true' }, r.ok ? '✓' : r.done ? '!' : '–'),
          h('div', { class: 't' }, h('div', {}, r.topic), h('div', { style: 'font-size:.8rem;color:var(--muted)' }, r.ok ? 'Consistent first time' : r.done ? 'May benefit from further revision' : 'Not attempted'), r.extra ? h('div', { style: 'font-size:.8rem;color:var(--bad)' }, r.extra) : null),
          h('button', { class: 'btn quiet', onclick: () => openSource(faq, r.refs), 'aria-label': 'Read the academic’s explanation for ' + r.topic }, 'Read explanation'))))),
      weak.length ? h('p', { style: 'color:var(--muted)' }, '“Read explanation” opens the original thread with the relevant passage highlighted.') : null,
      window.FAQ_LIBRARY ? window.FAQ_LIBRARY.relatedSection(faq.id, 'Keep revising: related resources') : null,
      h('div', { class: 'nav' },
        h('a', { class: 'btn quiet', href: '#library' }, '← Library'),
        h('div', { class: 'right' },
          h('button', { class: 'btn', onclick: () => openSource(faq) }, 'Original discussion'),
          h('button', { class: 'btn primary', onclick: () => { resetFaq(faq.id); history[faq.id] = []; renderActivity(faq, true); } }, 'Retry activity'))));
    return box;
  }

  /* ---------- review checklist ---------- */
  function reviewView() {
    let checks = {};
    try { checks = JSON.parse(sessionStorage.getItem('faq-lab-checks')) || {}; } catch (e) {}
    return h('main', { class: 'wrap', id: 'main' },
      h('div', { class: 'intro' },
        h('div', { class: 'eyebrow' }, 'For academic and learning design review'),
        h('h1', {}, 'Academic review checklist'),
        h('p', {}, 'These are the parts of each activity that were added or inferred and need the academic’s approval before student use. Each activity shows its review status on its card. Ticks here last only for this browser tab, so record decisions in the shared review document.')),
      faqs().filter(f => (f.review || []).length).map(f => h('section', { class: 'review-faq' },
        h('div', { style: 'display:flex;gap:12px;flex-wrap:wrap;align-items:center;justify-content:space-between' },
          h('div', {}, h('div', { class: 'eyebrow' }, `Discussion #${f.discussion} · pages ${f.pages}`), h('h2', {}, f.card.heading)),
          h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap' }, h('span', { class: 'pill ' + f.status }, STATUS[f.status]), h('a', { class: 'btn', href: (f.steps && f.steps.length ? '#activity-' : '#resource-') + f.id }, 'Open'))),
        h('ul', { class: 'review-list' }, f.review.map((r, i) => {
          const id = `chk-${f.id}-${i}`;
          const cb = h('input', { type: 'checkbox', id });
          cb.checked = !!checks[id];
          cb.addEventListener('change', () => { checks[id] = cb.checked; try { sessionStorage.setItem('faq-lab-checks', JSON.stringify(checks)); } catch (e) {} });
          return h('li', {}, h('label', { for: id }, cb, h('span', { class: 'area' }, r.area), h('span', { class: 'txt' }, r.item)));
        })))));
  }

  /* ---------- router ---------- */
  function page(routeKey, view, title, focusId) {
    app.replaceChildren(header(routeKey), view, footer());
    document.title = title + ' · Structures Revision Library';
    window.scrollTo({ top: 0 });
    const t = focusId ? document.getElementById(focusId) : view.querySelector('h1');
    if (t && routeKey !== 'home' && routeKey !== 'library') { if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); }
  }
  let lastRoute = null;
  function renderActivity(faq, focus) {
    const view = activityView(faq);
    app.replaceChildren(header('activity'), view, footer());
    if (focus) { const t = document.getElementById('step-title'); if (t) t.focus({ preventScroll: true }); window.scrollTo({ top: 0 }); }
  }
  function route() {
    const hash = location.hash.replace(/^#/, '');
    const first = lastRoute === null; lastRoute = hash;
    if (hash.startsWith('activity-')) {
      const f = byId(hash.slice(9));
      if (f && !(f.steps && f.steps.length)) { location.replace('#resource-' + f.id); return; }
      if (f) {
        if (window.FAQ_LIBRARY) window.FAQ_LIBRARY.viewed(f.id);
        renderActivity(f, !first); document.title = f.card.heading + ' · Structures Revision Library'; return;
      }
    }
    if (hash === 'review') return page('review', reviewView(), 'Review checklist');
    const r = window.FAQ_LIBRARY && window.FAQ_LIBRARY.route(hash);
    if (r) return page(hash === '' ? 'home' : (/^(module|topic|difficulty)-/.test(hash) ? 'library' : hash), r.view, r.title, first ? null : r.focus);
    location.hash = ''; // unknown route: back to the library home
  }

  window.FAQ_APP = {
    h, provSrc, provAdd, STATUS, openSource, faqs, byId, threadsOf, renderBlock,
    progress: id => { const st = store[id]; return st ? (st.done ? 'done' : (st.step ? 'started' : null)) : null; },
    clearAllProgress: () => { Object.keys(store).forEach(k => delete store[k]); save(); }
  };
  window.addEventListener('hashchange', route);
  route();
})();
