/* Thin-Walled Beams FAQ Lab: library navigation and content discovery.
 * Views: home (#), library/search (#library, #module-*, #topic-*, #difficulty-*),
 * resource preview (#resource-*), guided finder (#find-help), my revision (#my-revision).
 * Uses window.FAQ_APP (core.js) for DOM helpers and activity progress,
 * window.FAQ_RESOURCES (catalogue.js) for metadata and window.FAQ_SEARCH for search.
 */
(function () {
  'use strict';
  const T = window.FAQ_TAXONOMY;
  const RES = () => window.FAQ_RESOURCES;
  const A = () => window.FAQ_APP;
  const h = (...a) => A().h(...a);
  const PAGE = 12;

  /* ---------- lookups ---------- */
  const MODULES = [], TOPICS = {};
  T.subjects.forEach(s => s.modules.forEach(m => { MODULES.push(Object.assign({ subject: s }, m)); m.topics.forEach(t => { TOPICS[t.id] = Object.assign({ module: m, subject: s }, t); }); }));
  const moduleById = id => MODULES.find(m => m.id === id);
  const typeLabel = id => (T.types.find(t => t.id === id) || {}).label || id;
  const diff = id => T.difficulties.find(d => d.id === id) || { label: id, short: id };
  const conceptLabel = id => (T.concepts[id] || {}).label || id;
  const resById = id => RES().find(r => r.id === id);
  let indexed = false;
  function ensureIndex() { if (!indexed) { window.FAQ_SEARCH.index(RES()); indexed = true; } }

  /* ---------- per-viewer progress: bookmarks + recently viewed (no personal data) ---------- */
  const LKEY = 'faq-lab-library-v1';
  let lib = { bookmarks: [], recent: [] };
  try { lib = Object.assign(lib, JSON.parse(localStorage.getItem(LKEY)) || {}); } catch (e) {}
  const saveLib = () => { try { localStorage.setItem(LKEY, JSON.stringify(lib)); } catch (e) {} };
  const isSaved = id => lib.bookmarks.includes(id);
  function toggleSaved(id) { lib.bookmarks = isSaved(id) ? lib.bookmarks.filter(x => x !== id) : [id, ...lib.bookmarks]; saveLib(); return isSaved(id); }
  function viewed(id) { lib.recent = [{ id, t: Date.now() }, ...lib.recent.filter(x => x.id !== id)].slice(0, 12); saveLib(); }
  const progressOf = id => A().progress(id); // 'done' | 'started' | null

  /* ---------- search / filter state (kept for back-navigation) ---------- */
  const FACETS = ['status', 'module', 'topic', 'difficulty', 'type', 'time'];
  let state = loadState();
  function blank() { return { q: '', filters: { status: [], module: [], topic: [], difficulty: [], type: [], time: [] }, sort: 'best', shown: PAGE }; }
  function loadState() { try { return Object.assign(blank(), JSON.parse(sessionStorage.getItem('faq-lab-lib-state')) || {}); } catch (e) { return blank(); } }
  function saveState() { try { sessionStorage.setItem('faq-lab-lib-state', JSON.stringify(state)); } catch (e) {} }
  const timeBand = m => (m <= 7 ? 'short' : m <= 11 ? 'medium' : 'long');
  const TIME = [['short', 'Up to 7 min'], ['medium', '8–11 min'], ['long', '12 min or more']];
  const STATUS_OPT = [['activity', 'Interactive activity'], ['info', 'Quick answer']];
  function value(r, facet) {
    switch (facet) {
      case 'status': return [r.kind || 'activity'];
      case 'module': return [r.module];
      case 'topic': return [r.topic];
      case 'difficulty': return r.difficulties || [];
      case 'type': return r.types || [];
      case 'time': return [timeBand(r.minutes)];
    }
    return [];
  }
  const passes = (r, f, except) => FACETS.every(k => k === except || !f[k].length || value(r, k).some(v => f[k].includes(v)));

  /* ---------- shared components ---------- */
  function statusBadge(r) {
    if (r.kind === 'info') return h('span', { class: 'pill info' }, 'Quick answer');
    if (r.placeholder) return h('span', { class: 'pill ph' }, 'Placeholder');
    return h('span', { class: 'pill ' + r.status }, A().STATUS[r.status] || r.status);
  }
  function saveButton(r, small) {
    const b = h('button', { class: 'save-btn' + (small ? ' small' : ''), type: 'button', 'aria-pressed': String(isSaved(r.id)),
      'aria-label': (isSaved(r.id) ? 'Remove from saved: ' : 'Save for later: ') + r.title });
    const paint = () => { const on = isSaved(r.id); b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', (on ? 'Remove from saved: ' : 'Save for later: ') + r.title);
      b.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2h8v12l-4-3-4 3z" fill="${on ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5"/></svg><span>${on ? 'Saved' : 'Save'}</span>`; };
    b.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); toggleSaved(r.id); paint(); announce(isSaved(r.id) ? 'Saved for later' : 'Removed from saved'); });
    paint();
    return b;
  }
  function progressTag(r) {
    const p = r.available && progressOf(r.id);
    if (p === 'done') return h('span', { class: 'prog done' }, '✓ Completed');
    if (p === 'started') return h('span', { class: 'prog started' }, 'In progress');
    return null;
  }
  function crumbs(r) {
    const t = TOPICS[r.topic];
    return t ? h('div', { class: 'crumb' }, h('a', { href: '#module-' + t.module.id }, t.module.label), h('span', { 'aria-hidden': 'true' }, ' › '), h('a', { href: '#topic-' + t.id }, t.label)) : null;
  }
  function metaRow(r) {
    const parts = [(r.types || []).map(typeLabel).join(' + '), `${r.minutes} min`, (r.difficulties || []).map(d => diff(d).short).join(', '), r.threads ? 'Thread' + (r.threads.length > 1 ? 's ' : ' ') + r.threads.map(n => '#' + n).join(', ') : ''].filter(Boolean);
    return h('ul', { class: 'meta meta-list', 'aria-label': 'Details' }, parts.map(p => h('li', {}, p)));
  }
  function resultCard(r, opts) {
    opts = opts || {};
    const reasons = (opts.reasons || []).slice(0, 2);
    const href = '#resource-' + r.id;
    return h('li', { class: 'rcard' + (r.placeholder ? ' is-ph' : '') },
      h('div', { class: 'rcard-top' }, statusBadge(r), progressTag(r), h('span', { style: 'margin-left:auto' }), saveButton(r, true)),
      h('h3', {}, h('a', { href, class: 'rlink' }, r.title)),
      crumbs(r),
      h('p', { class: 'rsum', html: r.summary }),
      metaRow(r),
      reasons.length ? h('p', { class: 'why' }, h('span', { class: 'why-k' }, 'Why this result: '),
        reasons.flatMap((x, i) => [i ? ' · ' : '', x.kind === 'question' ? h('span', {}, 'close to the question “' + x.text + '”') : h('span', {}, x.text)])) : null,
      r.available && !opts.noStart ? h('div', { class: 'rcard-actions' }, r.kind === 'info'
        ? h('a', { class: 'btn small', href: '#resource-' + r.id }, 'Read the answer')
        : h('a', { class: 'btn primary small', href: '#activity-' + r.id }, progressOf(r.id) === 'started' ? 'Continue activity' : 'Start activity')) : null);
  }
  let liveEl;
  function announce(msg) { if (!liveEl) { liveEl = h('div', { class: 'sr-only', 'aria-live': 'polite', role: 'status' }); document.body.append(liveEl); } liveEl.textContent = ''; setTimeout(() => { liveEl.textContent = msg; }, 30); }

  /* ---------- search box (ARIA 1.2 combobox with suggestions) ---------- */
  let sbCount = 0;
  function searchBox(opts) {
    opts = opts || {};
    const n = ++sbCount;
    const id = 'sb-' + n, lb = 'sb-list-' + n;
    const input = h('input', { type: 'search', id, class: 'sb-input', role: 'combobox', 'aria-expanded': 'false', 'aria-controls': lb, 'aria-autocomplete': 'list', autocomplete: 'off', spellcheck: 'true',
      placeholder: opts.compact ? 'Search the library' : 'Try “why does the beam twist?” or “shear flow”', value: opts.value || '', enterkeyhint: 'search' });
    const list = h('ul', { id: lb, role: 'listbox', class: 'sb-list', hidden: true, 'aria-label': 'Suggestions' });
    const form = h('form', { class: 'sb' + (opts.compact ? ' compact' : ''), role: 'search', 'aria-label': 'Revision library' },
      h('label', { for: id, class: opts.compact ? 'sr-only' : 'sb-label' }, opts.label || 'Search by topic, term or what you’re finding difficult'),
      h('div', { class: 'sb-row' },
        h('span', { class: 'sb-icon', html: '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><circle cx="7.5" cy="7.5" r="5.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 12l4.5 4.5" stroke="currentColor" stroke-width="2"/></svg>' }),
        input, h('button', { class: 'btn primary sb-go', type: 'submit' }, 'Search')),
      list);
    let items = [], active = -1, timer;
    const close = () => { list.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); active = -1; };
    function render() {
      ensureIndex();
      items = window.FAQ_SEARCH.suggest(input.value, 7);
      list.innerHTML = '';
      if (!items.length || document.activeElement !== input) return close();
      const kindLabel = { concept: 'Topic or term', question: 'Student question', resource: 'Resource', suggested: 'Suggested search' };
      items.forEach((it, i) => {
        const li = h('li', { role: 'option', id: `${lb}-${i}`, class: 'sb-opt', 'aria-selected': 'false' },
          h('span', { class: 'sb-k' }, kindLabel[it.kind]), h('span', { class: 'sb-t' }, it.text, it.alt ? h('span', { class: 'sb-alt' }, ` (also: ${it.alt})`) : null));
        li.addEventListener('mousedown', e => { e.preventDefault(); choose(i); });
        list.append(li);
      });
      list.hidden = false; input.setAttribute('aria-expanded', 'true');
    }
    function highlight(i) {
      active = i;
      [...list.children].forEach((li, k) => li.setAttribute('aria-selected', String(k === i)));
      if (i >= 0) { input.setAttribute('aria-activedescendant', `${lb}-${i}`); list.children[i].scrollIntoView({ block: 'nearest' }); } else input.removeAttribute('aria-activedescendant');
    }
    function choose(i) {
      const it = items[i]; close();
      if (it.kind === 'resource') { location.hash = 'resource-' + it.id; return; }
      input.value = it.text; run(it.text);
    }
    function run(q) { state.q = q.trim(); state.shown = PAGE; state.sort = state.q ? 'best' : 'recommended'; saveState(); if (location.hash === '#library') renderLibrary(); else location.hash = 'library'; }
    input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(render, 80); });
    input.addEventListener('focus', render);
    input.addEventListener('blur', () => setTimeout(close, 120));
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { if (list.hidden) render(); else highlight(Math.min(active + 1, items.length - 1)); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { highlight(Math.max(active - 1, -1)); e.preventDefault(); }
      else if (e.key === 'Escape') { if (!list.hidden) { close(); e.preventDefault(); } }
      else if (e.key === 'Enter' && active >= 0 && !list.hidden) { e.preventDefault(); choose(active); }
    });
    form.addEventListener('submit', e => { e.preventDefault(); close(); run(input.value); });
    return form;
  }

  /* ---------- HOME ---------- */
  function home() {
    const all = RES();
    const avail = all.filter(r => r.available);
    const recent = lib.recent.map(x => resById(x.id)).filter(Boolean);
    const started = avail.filter(r => progressOf(r.id) === 'started');
    const pick = Array.from(new Set([...started, ...recent, ...lib.bookmarks.map(resById).filter(Boolean)])).slice(0, 3);
    const cnt = f => all.filter(f).length;

    return h('main', { class: 'wrap', id: 'main' },
      h('section', { class: 'hero', 'aria-labelledby': 'hero-h' },
        h('div', { class: 'eyebrow' }, 'Structures revision library'),
        h('h1', { id: 'hero-h' }, 'What are you revising?'),
        h('p', { class: 'lead' }, 'Search for a topic or term, or describe what you’re finding difficult in your own words. Spelling mistakes are fine.'),
        searchBox({}),
        h('div', { class: 'tryrow' }, h('span', { class: 'try-k' }, 'Try:'),
          T.suggestedSearches.slice(0, 3).map(s => h('button', { class: 'chip', type: 'button', onclick: () => { state = Object.assign(blank(), { q: s }); saveState(); location.hash = 'library'; } }, s))),
        h('p', {}, h('a', { href: '#find-help', class: 'help-link' }, 'Not sure what to search for? Describe what you’re finding difficult →'))),

      pick.length ? h('section', { class: 'band', 'aria-labelledby': 'cont-h' },
        h('div', { class: 'band-head' }, h('h2', { id: 'cont-h' }, 'Pick up where you left off'), h('a', { href: '#my-revision' }, 'My revision →')),
        h('ul', { class: 'rgrid' }, pick.map(r => resultCard(r)))) : null,

      h('section', { class: 'band', 'aria-labelledby': 'top-h' },
        h('div', { class: 'band-head' }, h('h2', { id: 'top-h' }, MODULES.length === 1 ? `Browse ${MODULES[0].label} by topic` : 'Browse by topic'),
          h('a', { href: '#library', onclick: () => { state = blank(); state.sort = 'recommended'; saveState(); } }, `All ${all.length} resources →`)),
        h('ul', { class: 'topic-grid' }, Object.values(TOPICS).filter(t => cnt(r => r.topic === t.id)).map(t =>
          h('li', {}, h('a', { href: '#topic-' + t.id }, h('span', {}, t.label), h('span', { class: 'count', 'aria-label': `${cnt(r => r.topic === t.id)} resources` }, String(cnt(r => r.topic === t.id)))))))),

      h('section', { class: 'band', 'aria-labelledby': 'diff-h' },
        h('div', { class: 'band-head' }, h('h2', { id: 'diff-h' }, 'Browse by what you find difficult')),
        h('p', { class: 'muted', style: 'margin-top:-6px' }, 'These categories sit alongside topics. Pick the one that sounds most like you.'),
        h('ul', { class: 'tiles' }, T.difficulties.map(d => h('li', {}, h('a', { class: 'tile', href: '#difficulty-' + d.id },
          h('span', { class: 'tile-t' }, d.label), h('span', { class: 'tile-p' }, '“' + d.prompt + '”'),
          h('span', { class: 'tile-c' }, `${cnt(r => r.difficulties.includes(d.id))} resources`)))))),

      MODULES.length > 1 ? h('section', { class: 'band', 'aria-labelledby': 'mod-h' },
        h('div', { class: 'band-head' }, h('h2', { id: 'mod-h' }, 'Browse by module')),
        T.subjects.map(s => h('div', { class: 'subject' }, h('h3', { class: 'subject-h' }, s.label),
          h('ul', { class: 'modgrid' }, s.modules.map(m => h('li', { class: 'mod' },
            h('a', { class: 'mod-h', href: '#module-' + m.id }, m.label, h('span', { class: 'count' }, String(cnt(r => r.module === m.id)))),
            h('ul', { class: 'toplist' }, m.topics.map(t => h('li', {}, h('a', { href: '#topic-' + t.id }, t.label), h('span', { class: 'count' }, String(cnt(r => r.topic === t.id)))))))))))) : null,

      h('section', { class: 'band about', 'aria-labelledby': 'about-h' },
        h('h2', { id: 'about-h' }, 'About this library'),
        h('p', {}, `Every resource comes from a real question on the 2023/24 ${MODULES[0].label} discussion board (${new Set(all.flatMap(r => r.threads || [])).size} threads). There are ${cnt(r => r.kind !== 'info')} interactive activities and ${cnt(r => r.kind === 'info')} quick answers. The academic\u2019s own words are the feedback, and nothing here is graded.`),
        h('div', { class: 'legend-row' }, A().provSrc('academic response (verbatim)'), A().provAdd()),
        h('p', { class: 'muted' }, 'Each activity follows the same sequence: Explore → Predict → Interact → Feedback → Reflect. All activities are awaiting academic review.')));
  }

  /* ---------- LIBRARY / SEARCH RESULTS ---------- */
  let lastSearch = null;
  async function compute() {
    ensureIndex();
    const all = RES();
    let ranked, search = null;
    if (state.q) {
      search = await window.FAQ_SEARCH.search(state.q);
      const map = new Map(search.results.map(x => [x.id, x]));
      ranked = search.results.map(x => resById(x.id)).filter(Boolean);
      ranked.forEach(r => { r._reasons = map.get(r.id).reasons; r._score = map.get(r.id).score; });
    } else {
      ranked = all.slice(); ranked.forEach(r => { r._reasons = null; r._score = 0; });
    }
    const filtered = ranked.filter(r => passes(r, state.filters));
    const order = Object.keys(TOPICS);
    const sorts = {
      best: (a, b) => b._score - a._score,
      recommended: (a, b) => (b.available - a.available) || (order.indexOf(a.topic) - order.indexOf(b.topic)) || a.minutes - b.minutes,
      short: (a, b) => a.minutes - b.minutes || a.title.localeCompare(b.title),
      new: (a, b) => (b.added || '').localeCompare(a.added || '') || (b.available - a.available),
      az: (a, b) => a.title.localeCompare(b.title)
    };
    if (!state.q && state.sort === 'best') state.sort = 'recommended';
    filtered.sort(sorts[state.sort] || sorts.recommended);
    return { ranked, filtered, search };
  }

  function facetGroup(key, legend, options, ranked) {
    const sel = state.filters[key];
    const box = h('fieldset', { class: 'facet' }, h('legend', {}, legend));
    options.forEach(([val, label, indent]) => {
      const n = ranked.filter(r => passes(r, state.filters, key) && value(r, key).includes(val)).length;
      if (!n && !sel.includes(val)) return;
      const id = `f-${key}-${val}`;
      const cb = h('input', { type: 'checkbox', id, value: val });
      cb.checked = sel.includes(val);
      cb.addEventListener('change', () => {
        state.filters[key] = cb.checked ? [...sel, val] : sel.filter(v => v !== val);
        if (key === 'module' && !cb.checked) { const m = moduleById(val); state.filters.topic = state.filters.topic.filter(t => !m.topics.some(x => x.id === t)); }
        state.shown = PAGE; saveState(); renderLibrary({ keepFocus: id });
      });
      box.append(h('label', { class: 'fopt' + (indent ? ' indent' : ''), for: id }, cb, h('span', {}, label), h('span', { class: 'count' }, String(n))));
    });
    return box.children.length > 1 ? box : null;
  }

  function filtersPanel(ranked) {
    const mods = MODULES.map(m => [m.id, m.label]);
    const selMods = state.filters.module;
    const topics = (MODULES.length === 1 ? MODULES : MODULES.filter(m => selMods.includes(m.id))).flatMap(m => m.topics.map(t => [t.id, t.label]));
    const groups = [
      facetGroup('status', 'Resource', STATUS_OPT, ranked),
      MODULES.length > 1 ? facetGroup('module', 'Module', mods, ranked) : null,
      topics.length ? facetGroup('topic', 'Topic', topics, ranked) : null,
      facetGroup('difficulty', 'What you find difficult', T.difficulties.map(d => [d.id, d.label]), ranked),
      facetGroup('type', 'Activity type', T.types.map(t => [t.id, t.label]), ranked),
      facetGroup('time', 'Time needed', TIME, ranked)
    ];
    const n = FACETS.reduce((a, k) => a + state.filters[k].length, 0);
    const det = h('details', { class: 'filters', id: 'filters' },
      h('summary', {}, h('span', {}, 'Filters'), n ? h('span', { class: 'badge-n' }, String(n)) : null),
      h('div', { class: 'filters-body' }, groups, (MODULES.length === 1 || selMods.length) ? null : h('p', { class: 'muted small' }, 'Choose a module to filter by topic.')));
    if (window.matchMedia('(min-width: 900px)').matches) det.open = true;
    try { if (sessionStorage.getItem('faq-lab-filters-open') === '1') det.open = true; } catch (e) {}
    det.addEventListener('toggle', () => { try { sessionStorage.setItem('faq-lab-filters-open', det.open ? '1' : '0'); } catch (e) {} });
    return det;
  }

  function activeChips() {
    const chips = [];
    const lab = {
      status: v => STATUS_OPT.find(x => x[0] === v)[1], module: v => moduleById(v).label, topic: v => TOPICS[v].label,
      difficulty: v => diff(v).label, type: typeLabel, time: v => TIME.find(x => x[0] === v)[1]
    };
    FACETS.forEach(k => state.filters[k].forEach(v => chips.push(h('button', { class: 'fchip', type: 'button', 'aria-label': `Remove filter: ${lab[k](v)}`,
      onclick: () => { state.filters[k] = state.filters[k].filter(x => x !== v); state.shown = PAGE; saveState(); renderLibrary(); } }, lab[k](v), h('span', { 'aria-hidden': 'true' }, ' ×')))));
    if (!chips.length) return null;
    return h('div', { class: 'fchips', role: 'group', 'aria-label': 'Active filters' }, chips,
      h('button', { class: 'btn quiet small', type: 'button', onclick: () => { state.filters = blank().filters; state.shown = PAGE; saveState(); renderLibrary(); } }, 'Clear all filters'));
  }

  function interpretation(search) {
    if (!search) return null;
    const it = search.interpretation;
    const parts = [];
    if (search.autoCorrected) parts.push(h('p', {}, `No matches for “${search.query}”. Showing results for `, h('strong', {}, `“${search.usedQuery}”`), ' instead.'));
    else if (it.correction && it.correction.toLowerCase() !== search.query.toLowerCase()) parts.push(h('p', {}, 'Did you mean ', h('button', { class: 'linkbtn', type: 'button', onclick: () => { state.q = it.correction; saveState(); renderLibrary(); } }, `“${it.correction}”`), '?'));
    const cs = it.concepts.slice(0, 4);
    if (cs.length) parts.push(h('div', { class: 'interp-row' }, h('span', { class: 'interp-k' }, 'Matched to:'),
      cs.map(c => h('button', { class: 'chip', type: 'button', title: c.kind === 'cue' ? `From your words “${c.via}”` : '', onclick: () => { state.q = c.label; saveState(); renderLibrary(); } }, c.label, c.kind === 'cue' ? h('span', { class: 'chip-via' }, ` from “${c.via}”`) : null))));
    const rel = it.related.slice(0, 4);
    if (rel.length) parts.push(h('div', { class: 'interp-row' }, h('span', { class: 'interp-k' }, 'Related ideas:'),
      rel.map(c => h('button', { class: 'chip ghost', type: 'button', onclick: () => { state.q = conceptLabel(c); saveState(); renderLibrary(); } }, conceptLabel(c)))));
    const d = it.difficulties[0];
    if (d && !state.filters.difficulty.includes(d.id)) parts.push(h('div', { class: 'interp-row' },
      h('span', {}, 'Your wording sounds like it may be about ', h('strong', {}, diff(d.id).label.toLowerCase()), '. '),
      h('button', { class: 'linkbtn', type: 'button', onclick: () => { state.filters.difficulty = [d.id]; saveState(); renderLibrary(); } }, 'Show only these')));
    return parts.length ? h('div', { class: 'interp' }, parts) : null;
  }

  function emptyState() {
    return h('div', { class: 'empty' },
      h('h3', {}, 'No resources match yet'),
      h('ul', {},
        state.q ? h('li', {}, 'Try fewer words, or describe the situation, e.g. “why does it twist?”') : null,
        FACETS.some(k => state.filters[k].length) ? h('li', {}, h('button', { class: 'linkbtn', type: 'button', onclick: () => { state.filters = blank().filters; saveState(); renderLibrary(); } }, 'Remove all filters')) : null,
        h('li', {}, h('a', { href: '#find-help' }, 'Get help describing what you’re finding difficult')),
        h('li', {}, h('a', { href: '#' }, 'Browse modules and topics'))));
  }

  let libRoot = null;
  async function renderLibrary(opts) {
    opts = opts || {};
    if (!libRoot || !document.body.contains(libRoot)) return;
    const { ranked, filtered, search } = await compute();
    lastSearch = search;
    const ctxTitle = (() => {
      const f = state.filters;
      if (state.q) return `Results for “${state.q}”`;
      if (f.topic.length === 1 && FACETS.every(k => k === 'topic' || k === 'module' || !f[k].length)) return TOPICS[f.topic[0]].label;
      if (f.module.length === 1 && FACETS.every(k => k === 'module' || !f[k].length)) return moduleById(f.module[0]).label;
      if (f.difficulty.length === 1 && FACETS.every(k => k === 'difficulty' || !f[k].length)) return diff(f.difficulty[0]).label;
      return 'All resources';
    })();
    const crumb = (() => {
      const f = state.filters;
      if (!state.q && f.topic.length === 1) { const t = TOPICS[f.topic[0]]; return h('nav', { class: 'crumb', 'aria-label': 'Breadcrumb' }, h('a', { href: '#' }, 'Library'), ' › ', h('a', { href: '#module-' + t.module.id }, t.module.label), ' › ', h('span', { 'aria-current': 'page' }, t.label)); }
      return h('nav', { class: 'crumb', 'aria-label': 'Breadcrumb' }, h('a', { href: '#' }, 'Library'), ' › ', h('span', { 'aria-current': 'page' }, ctxTitle));
    })();
    const shown = filtered.slice(0, state.shown);
    const sortSel = h('select', { id: 'sort', 'aria-label': 'Sort results' },
      [state.q ? ['best', 'Best match'] : null, ['recommended', 'Available first'], ['short', 'Shortest first'], ['new', 'Recently added'], ['az', 'Title A–Z']].filter(Boolean)
        .map(([v, l]) => { const o = h('option', { value: v }, l); if (state.sort === v) o.selected = true; return o; }));
    sortSel.addEventListener('change', () => { state.sort = sortSel.value; saveState(); renderLibrary({ keepFocus: 'sort' }); });
    const nAvail = filtered.filter(r => r.available).length;
    const list = h('ul', { class: 'results', id: 'results' }, shown.map(r => resultCard(r, { reasons: state.q ? r._reasons : null })));
    const more = filtered.length > shown.length ? h('button', { class: 'btn', type: 'button', id: 'more', onclick: () => {
      const first = state.shown; state.shown += PAGE; saveState(); renderLibrary().then(() => { const a = document.querySelectorAll('#results .rlink')[first]; if (a) a.focus(); });
    } }, `Show ${Math.min(PAGE, filtered.length - shown.length)} more`) : null;

    const view = h('main', { class: 'wrap', id: 'main' },
      crumb,
      h('div', { class: 'lib-head' }, h('h1', { id: 'lib-title', tabindex: '-1' }, ctxTitle), searchBox({ value: state.q, label: 'Search the library' })),
      interpretation(search),
      h('div', { class: 'lib' },
        h('aside', { class: 'lib-side', 'aria-label': 'Filters' }, filtersPanel(ranked)),
        h('section', { class: 'lib-main', 'aria-labelledby': 'count' },
          h('div', { class: 'lib-bar' },
            h('p', { id: 'count', role: 'status' }, filtered.length ? `${filtered.length} resource${filtered.length > 1 ? 's' : ''}` : 'No resources', filtered.length ? h('span', { class: 'muted' }, ` · ${nAvail} available now`) : null),
            h('label', { class: 'sort-ctl', for: 'sort' }, h('span', {}, 'Sort'), sortSel)),
          activeChips(),
          filtered.length ? list : emptyState(),
          filtered.length ? h('div', { class: 'more-row' }, h('span', { class: 'muted' }, `Showing ${shown.length} of ${filtered.length}`), more) : null)));
    libRoot.replaceChildren(view);
    if (opts.keepFocus) { const el = document.getElementById(opts.keepFocus); if (el) el.focus(); }
    else if (opts.focusTitle) { const t = document.getElementById('lib-title'); if (t) t.focus({ preventScroll: true }); }
  }
  function library(preset) {
    if (preset) { state = Object.assign(blank(), { filters: Object.assign(blank().filters, preset), sort: 'recommended' }); saveState(); }
    libRoot = h('div', { class: 'lib-root' });
    setTimeout(() => renderLibrary({ focusTitle: true }), 0);
    return libRoot;
  }

  /* ---------- RESOURCE PREVIEW ---------- */
  function related(id, n) {
    const r = resById(id); if (!r) return [];
    return RES().filter(x => x.id !== id).map(x => {
      const shared = x.concepts.filter(c => r.concepts.includes(c));
      const sharedD = x.difficulties.filter(d => r.difficulties.includes(d));
      const score = shared.length * 3 + (x.topic === r.topic ? 2 : 0) + (x.module === r.module ? 1 : 0) + sharedD.length * 0.8 + (x.available ? 1.5 : 0) - (x.title.startsWith('Quick check') ? 3.5 : 0);
      const why = shared.length ? 'Shares: ' + shared.slice(0, 3).map(conceptLabel).join(', ') : (x.topic === r.topic ? 'Same topic' : sharedD.length ? 'Similar difficulty: ' + diff(sharedD[0]).short.toLowerCase() : 'Same module');
      return { x, score, why };
    }).filter(o => o.score >= 3).sort((a, b) => b.score - a.score).slice(0, n || 4);
  }
  function relatedSection(id, title) {
    const list = related(id, 4);
    if (!list.length) return null;
    return h('section', { class: 'band', 'aria-labelledby': 'rel-h' },
      h('div', { class: 'band-head' }, h('h2', { id: 'rel-h' }, title || 'Related resources')),
      h('ul', { class: 'rgrid' }, list.map(o => resultCard(o.x, { reasons: [{ kind: 'related', text: o.why }] }))));
  }
  function quickAnswer(r) {
    const faq = A().byId(r.id);
    const RB = A().renderBlock;
    return h('div', { class: 'qa' }, A().threadsOf(faq).map(t => h('section', { class: 'thread' },
      h('h2', {}, t.title, h('span', { class: 'thread-ref' }, ` · #${t.discussion}`)),
      t.question ? h('div', { class: 'source' }, A().provSrc('student question (anonymised)'), t.question.blocks.map(b => RB(b))) : null,
      t.answer ? h('div', { class: 'source' }, A().provSrc('academic response (verbatim)'), t.answer.blocks.map(b => RB(b))) : null,
      (t.followUps || []).map(f => h('div', { class: 'source' }, A().provSrc(/academic/i.test(f.author) ? 'academic response (verbatim)' : 'student follow-up (anonymised)'), f.blocks.map(b => RB(b)))))));
  }
  function resource(id) {
    const r = resById(id);
    if (!r) return h('main', { class: 'wrap', id: 'main' }, h('h1', {}, 'Resource not found'), h('p', {}, h('a', { href: '#' }, 'Back to the library')));
    viewed(r.id);
    const t = TOPICS[r.topic];
    return h('main', { class: 'wrap', id: 'main' },
      h('nav', { class: 'crumb', 'aria-label': 'Breadcrumb' }, h('a', { href: '#' }, 'Library'), ' › ', h('a', { href: '#module-' + t.module.id }, t.module.label), ' › ', h('a', { href: '#topic-' + t.id }, t.label)),
      h('article', { class: 'res' + (r.placeholder ? ' is-ph' : '') },
        h('div', { class: 'rcard-top' }, statusBadge(r), progressTag(r)),
        h('h1', { id: 'res-title', tabindex: '-1' }, r.title),
        h('p', { class: 'lead', html: r.summary }),
        metaRow(r),
        h('div', { class: 'res-actions' },
          r.kind !== 'info' ? h('a', { class: 'btn primary', href: '#activity-' + r.id }, progressOf(r.id) === 'started' ? 'Continue activity' : progressOf(r.id) === 'done' ? 'Revisit activity' : 'Work through the activity') : null,
          r.kind !== 'info' ? h('button', { class: 'btn', type: 'button', onclick: () => A().openSource(A().byId(r.id)) }, 'Read the original answer') : null,
          saveButton(r)),
        r.kind !== 'info' ? h('p', { class: 'hint' }, `Work through the activity to test yourself (about ${r.minutes} min), or read the original thread if you only need to check a detail.`) : null,
        r.kind === 'info' ? quickAnswer(r) : null,
        h('div', { class: 'res-grid' },
          r.objectives.length ? h('section', {}, h('h2', {}, 'What you’ll be able to do'), h('ul', {}, r.objectives.map(o => h('li', {}, o)))) : null,
          r.questions.length ? h('section', {}, h('h2', {}, 'Questions this helps with'), h('ul', { class: 'qlist' }, r.questions.map(q => h('li', {}, q)))) : null,
          r.addresses.length ? h('section', {}, h('h2', {}, 'Common sticking points it covers'), h('ul', {}, r.addresses.map(o => h('li', {}, o)))) : null,
          h('section', {}, h('h2', {}, 'Concepts'), h('div', { class: 'chips' }, r.concepts.map(c => h('button', { class: 'chip', type: 'button', onclick: () => { state = Object.assign(blank(), { q: conceptLabel(c) }); saveState(); location.hash = 'library'; } }, conceptLabel(c)))),
            h('p', { class: 'muted small', style: 'margin-top:10px' }, `Source: ${(A().threadsOf(A().byId(r.id)) || []).map(t => `#${t.discussion} (PDF p. ${t.pages})`).join(', ')}, 2023/24 discussion board.`)))),
      relatedSection(r.id));
  }

  /* ---------- GUIDED FINDER ---------- */
  function findHelp() {
    const sel = { module: '', difficulty: '' };
    const out = h('div', { 'aria-live': 'polite', class: 'fh-out' });
    const radio = (name, val, label, sub) => {
      const id = `fh-${name}-${val || 'any'}`;
      const inp = h('input', { type: 'radio', name: 'fh-' + name, id, value: val });
      if (!val) inp.checked = true;
      inp.addEventListener('change', () => { sel[name] = val; });
      return h('label', { class: 'opt fh-opt', for: id }, inp, h('span', {}, h('span', { class: 'fh-l' }, label), sub ? h('span', { class: 'fh-s' }, sub) : null));
    };
    const txt = h('textarea', { id: 'fh-text', rows: 3, placeholder: 'e.g. I don’t get why the stress is the same all the way through the wall' });
    async function go(e) {
      e.preventDefault();
      ensureIndex();
      let list;
      const q = txt.value.trim();
      if (q) { const s = await window.FAQ_SEARCH.search(q); const m = new Map(s.results.map(x => [x.id, x])); list = s.results.map(x => resById(x.id)).filter(Boolean).map(r => ({ r, reasons: m.get(r.id).reasons })); }
      else list = RES().slice().sort((a, b) => b.available - a.available).map(r => ({ r, reasons: null }));
      list = list.filter(({ r }) => (!sel.module || r.module === sel.module));
      if (sel.difficulty) {
        const match = list.filter(({ r }) => r.difficulties.includes(sel.difficulty));
        list = match.length ? match : list;
      }
      const top = list.slice(0, 6);
      out.innerHTML = '';
      out.append(h('h2', { id: 'fh-res', tabindex: '-1' }, top.length ? 'These might help' : 'Nothing matched those choices'),
        h('p', { class: 'muted' }, 'Suggestions based on what you chose and wrote. They aren’t an assessment of what you know, so open the ones that sound right.'),
        top.length ? h('ul', { class: 'rgrid' }, top.map(({ r, reasons }) => resultCard(r, { reasons }))) : null,
        h('p', {}, h('a', { href: '#library', class: 'btn', onclick: () => {
          state = Object.assign(blank(), { q, filters: Object.assign(blank().filters, { module: sel.module ? [sel.module] : [], difficulty: sel.difficulty ? [sel.difficulty] : [] }) }); saveState();
        } }, 'See all matches in the library →')));
      document.getElementById('fh-res').focus();
    }
    return h('main', { class: 'wrap', id: 'main' },
      h('nav', { class: 'crumb', 'aria-label': 'Breadcrumb' }, h('a', { href: '#' }, 'Library'), ' › ', h('span', { 'aria-current': 'page' }, 'Find help')),
      h('div', { class: 'intro' }, h('h1', { tabindex: '-1', id: 'fh-title' }, 'Not sure what to search for?'),
        h('p', { class: 'lead' }, 'Answer up to three quick questions. You don’t need the technical terms, and every question is optional.')),
      h('form', { class: 'fh', onsubmit: go },
        h('fieldset', { class: 'fh-step' }, h('legend', {}, h('span', { class: 'fh-n' }, '1'), 'Which module is it in?'),
          h('div', { class: 'fh-chips' }, radio('module', '', 'Not sure / any'), MODULES.map(m => radio('module', m.id, m.label)))),
        h('fieldset', { class: 'fh-step' }, h('legend', {}, h('span', { class: 'fh-n' }, '2'), 'Which sounds most like your difficulty?'),
          h('div', { class: 'fh-list' }, radio('difficulty', '', 'None of these / not sure'), T.difficulties.map(d => radio('difficulty', d.id, '“' + d.prompt + '”', d.label)))),
        h('fieldset', { class: 'fh-step' }, h('legend', {}, h('span', { class: 'fh-n' }, '3'), h('label', { for: 'fh-text' }, 'Describe it in your own words')),
          txt, h('p', { class: 'muted small' }, 'What you type stays on this device. It’s only used to search the library.')),
        h('div', {}, h('button', { class: 'btn primary', type: 'submit' }, 'Show suggestions'))),
      out);
  }

  /* ---------- MY REVISION ---------- */
  function myRevision() {
    const avail = RES().filter(r => r.available);
    const saved = lib.bookmarks.map(resById).filter(Boolean);
    const started = avail.filter(r => progressOf(r.id) === 'started');
    const done = avail.filter(r => progressOf(r.id) === 'done');
    const recent = lib.recent.map(x => resById(x.id)).filter(Boolean).slice(0, 6);
    const sec = (id, title, list, empty) => h('section', { class: 'band', 'aria-labelledby': id },
      h('div', { class: 'band-head' }, h('h2', { id }, title), h('span', { class: 'muted' }, String(list.length))),
      list.length ? h('ul', { class: 'rgrid' }, list.map(r => resultCard(r))) : h('p', { class: 'muted' }, empty));
    const confirmBox = h('div', { class: 'confirm', hidden: true },
      h('p', {}, 'Clear saved items, recently viewed and activity progress on this device?'),
      h('div', { class: 'chips' },
        h('button', { class: 'btn', type: 'button', onclick: () => { lib = { bookmarks: [], recent: [] }; saveLib(); A().clearAllProgress(); location.hash = ''; } }, 'Yes, clear everything'),
        h('button', { class: 'btn quiet', type: 'button', onclick: () => { confirmBox.hidden = true; } }, 'Cancel')));
    return h('main', { class: 'wrap', id: 'main' },
      h('div', { class: 'intro' }, h('h1', { tabindex: '-1' }, 'My revision'),
        h('p', { class: 'lead' }, 'Saved resources, activities in progress and what you’ve looked at recently.'),
        h('p', { class: 'muted small' }, 'This is stored only in this browser on this device. There’s no account, and nothing is sent anywhere.')),
      h('div', { class: 'stats' },
        h('div', { class: 'stat' }, h('b', {}, String(done.length)), h('span', {}, 'Activities completed')),
        h('div', { class: 'stat' }, h('b', {}, String(started.length)), h('span', {}, 'In progress')),
        h('div', { class: 'stat' }, h('b', {}, String(saved.length)), h('span', {}, 'Saved for later'))),
      sec('mr-saved', 'Saved for later', saved, 'Use the Save button on any resource to keep it here.'),
      sec('mr-started', 'In progress', started, 'Nothing in progress.'),
      sec('mr-done', 'Completed', done, 'No activities completed yet.'),
      sec('mr-recent', 'Recently viewed', recent, 'Resources you open will appear here.'),
      h('div', { class: 'band' }, h('button', { class: 'btn', type: 'button', onclick: () => { confirmBox.hidden = false; } }, 'Clear my progress'), confirmBox));
  }

  /* ---------- router hook (called by core.js) ---------- */
  function route(hash) {
    if (hash === '') return { view: home(), title: 'Structures Revision Library' };
    if (hash === 'library') return { view: library(), title: 'Library' };
    if (hash === 'find-help') return { view: findHelp(), title: 'Find help', focus: 'fh-title' };
    if (hash === 'my-revision') return { view: myRevision(), title: 'My revision' };
    let m;
    if ((m = hash.match(/^module-(.+)$/)) && moduleById(m[1])) return { view: library({ module: [m[1]] }), title: moduleById(m[1]).label };
    if ((m = hash.match(/^topic-(.+)$/)) && TOPICS[m[1]]) return { view: library({ module: [TOPICS[m[1]].module.id], topic: [m[1]] }), title: TOPICS[m[1]].label };
    if ((m = hash.match(/^difficulty-(.+)$/)) && T.difficulties.some(d => d.id === m[1])) return { view: library({ difficulty: [m[1]] }), title: diff(m[1]).label };
    if ((m = hash.match(/^resource-(.+)$/))) return { view: resource(m[1]), title: (resById(m[1]) || {}).title || 'Resource', focus: 'res-title' };
    return null;
  }

  window.FAQ_LIBRARY = { route, searchBox, relatedSection, related, viewed, saveButton, isSaved, resById };
})();
