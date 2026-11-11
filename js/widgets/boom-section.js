/* Widget: boom-section — Tutorial 1 Q6 idealised closed section.
 * Geometry redrawn from the posted solution (pending approval):
 *   boom 1: 200 mm², top right  (y = +200)   boom 2: 500 mm², top left  (y = +100)
 *   boom 3: 500 mm², bottom left (y = −100)  boom 4: 200 mm², bottom right (y = −200)
 *   panels 1-2, 2-3, 3-4, 4-1; width 800 mm. Vertical scale exaggerated.
 * Modes: "classify" (identify + classify elements) and "cut" (choose cut position;
 * qualitative statements from the academic only, no shear flow values).
 */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const s = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };
  const X = mm => 92 + mm * (236 / 800);
  const Y = mm => 135 - mm * 0.5;
  const BOOMS = [
    { id: 'B1', n: 1, area: 200, x: 800, y: 200 },
    { id: 'B2', n: 2, area: 500, x: 0, y: 100 },
    { id: 'B3', n: 3, area: 500, x: 0, y: -100 },
    { id: 'B4', n: 4, area: 200, x: 800, y: -200 }
  ];
  const PANELS = [
    { id: 'P12', a: 'B1', b: 'B2', name: 'Panel 1–2 (top)' },
    { id: 'P23', a: 'B2', b: 'B3', name: 'Panel 2–3 (left web)' },
    { id: 'P34', a: 'B3', b: 'B4', name: 'Panel 3–4 (bottom)' },
    { id: 'P41', a: 'B4', b: 'B1', name: 'Panel 4–1 (right web)' }
  ];
  const boom = id => BOOMS.find(b => b.id === id);
  const label = id => id[0] === 'B' ? `Boom ${boom(id).n} (${boom(id).area} mm²)` : PANELS.find(p => p.id === id).name;
  const CATS = [
    { id: 'boom', title: 'Direct stress carrying (booms)', hint: 'Contributes to Iₓ and Dₓ' },
    { id: 'panel', title: 'Shear panels', hint: '“walls only effective in resisting shear stress” (solution annotation)' }
  ];
  const answer = id => id[0] === 'B' ? 'boom' : 'panel';

  function drawSection(svg, onPick) {
    svg.append(s('path', { d: `M40 ${Y(0)}H360`, class: 'svg-axis', 'stroke-width': 1 }));
    const xl = s('text', { x: 364, y: Y(0) + 4, class: 'svg-small' }); xl.textContent = 'x'; svg.append(xl);
    const els = {};
    PANELS.forEach(p => {
      const A = boom(p.a), B = boom(p.b);
      const g = s('g', { class: 'el', tabindex: 0, role: 'button', 'data-id': p.id, 'aria-label': label(p.id) });
      const dd = `M${X(A.x)} ${Y(A.y)}L${X(B.x)} ${Y(B.y)}`;
      g.append(s('path', { d: dd, class: 'hit' }), s('path', { d: dd, class: 'panel-line' }));
      svg.append(g); els[p.id] = g;
    });
    BOOMS.forEach(b => {
      const g = s('g', { class: 'el', tabindex: 0, role: 'button', 'data-id': b.id, 'aria-label': label(b.id) });
      const r = b.area === 500 ? 11 : 7.5;
      g.append(s('circle', { cx: X(b.x), cy: Y(b.y), r: r + 8, fill: 'transparent' }), s('circle', { cx: X(b.x), cy: Y(b.y), r, class: 'boom' }));
      const tx = s('text', { x: X(b.x) + (b.x ? 14 : -16), y: Y(b.y) + (b.y > 0 ? -8 : 16), class: 'svg-text', 'text-anchor': b.x ? 'start' : 'end' }); tx.textContent = b.n;
      const ar = s('text', { x: X(b.x) + (b.x ? 14 : -16), y: Y(b.y) + (b.y > 0 ? 6 : 30), class: 'svg-small', 'text-anchor': b.x ? 'start' : 'end' }); ar.textContent = b.area + ' mm²';
      g.append(tx, ar);
      svg.append(g); els[b.id] = g;
    });
    // dimensions
    const dl = s('path', { d: `M${X(0)} 262H${X(800)}M${X(0)} 257V267M${X(800)} 257V267`, class: 'svg-muted', 'stroke-width': 1 }); svg.append(dl);
    const dt = s('text', { x: X(400) - 22, y: 258, class: 'svg-mono' }); dt.textContent = '800 mm'; svg.append(dt);
    // force (indicative position)
    svg.append(s('path', { d: `M${X(740)} 40V14`, class: 'svg-load', 'stroke-width': 2.5 }), s('path', { d: `M${X(740) - 6} 20L${X(740)} 8L${X(740) + 6} 20Z`, class: 'svg-load-fill' }));
    const ft = s('text', { x: X(740) - 16, y: 16, class: 'svg-mono', fill: 'var(--load)' }); ft.textContent = 'F'; svg.append(ft);
    const note = s('text', { x: 30, y: 285, class: 'svg-small' }); note.textContent = 'Redrawn from the solution. Vertical scale exaggerated.'; svg.append(note);
    Object.values(els).forEach(g => {
      g.addEventListener('click', () => onPick(g.dataset.id));
      g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(g.dataset.id); } });
    });
    return els;
  }

  function classify(host, cfg, ctx) {
    const { h } = ctx;
    const st = Object.assign({ place: {}, checked: false }, ctx.get() || {});
    let sel = null;
    const svg = s('svg', { viewBox: '0 0 400 295', role: 'group', 'aria-label': 'Idealised section. Select an element to classify it.' });
    const els = drawSection(svg, id => pick(id));
    const info = h('div', { class: 'ind', 'aria-live': 'polite' }, h('div', { class: 'k' }, 'Selected'), h('div', { class: 'v' }, 'Nothing selected'), h('div', { class: 'n' }, 'Select an element on the diagram or below.'));
    const tray = h('div', { class: 'chips', role: 'group', 'aria-label': 'Unclassified elements' });
    const bins = h('div', { class: 'bins' });
    const binEls = {};
    CATS.forEach(c => {
      const list = h('div', { class: 'chips' });
      const btn = h('button', { class: 'btn bin-btn', type: 'button', onclick: () => { if (sel) place(sel, c.id); } }, 'Place selected here');
      const bin = h('div', { class: 'bin', 'data-cat': c.id }, h('h3', {}, c.title), h('div', { class: 'hint' }, c.hint), list, btn);
      bin.addEventListener('dragover', e => { e.preventDefault(); bin.classList.add('over'); });
      bin.addEventListener('dragleave', () => bin.classList.remove('over'));
      bin.addEventListener('drop', e => { e.preventDefault(); bin.classList.remove('over'); const id = e.dataTransfer.getData('text/plain'); if (id) place(id, c.id); });
      bins.append(bin); binEls[c.id] = { bin, list, btn };
    });
    const fb = h('div', { class: 'feedback', 'aria-live': 'polite' });
    const checkBtn = h('button', { class: 'btn primary', type: 'button' }, 'Check classification');
    const resetBtn = h('button', { class: 'btn', type: 'button' }, 'Clear');
    host.append(h('div', { class: 'widget' }, h('div', { class: 'widget-grid' },
      h('div', { class: 'stage-fig' }, svg, info),
      h('div', { class: 'readout' }, h('div', { class: 'k eyebrow' }, 'Unclassified'), tray, bins, h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap' }, checkBtn, resetBtn), fb))));

    function pick(id) {
      if (st.checked) return;
      sel = sel === id ? null : id;
      render();
    }
    function place(id, cat) { if (st.checked) return; st.place[id] = cat; sel = null; ctx.set({ place: st.place }); render(); }
    function render() {
      const all = [...BOOMS.map(b => b.id), ...PANELS.map(p => p.id)];
      tray.innerHTML = '';
      Object.values(binEls).forEach(b => { b.list.innerHTML = ''; b.btn.disabled = !sel || st.checked; });
      all.forEach(id => {
        const g = els[id];
        g.classList.toggle('sel', sel === id);
        g.classList.remove('cat-boom', 'cat-panel', 'res-ok', 'res-bad');
        if (st.place[id]) g.classList.add('cat-' + st.place[id]);
        const item = h('button', { class: 'item', type: 'button', draggable: st.checked ? 'false' : 'true', 'aria-pressed': String(sel === id) }, label(id));
        item.addEventListener('click', () => pick(id));
        item.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', id); });
        if (st.checked) {
          const ok = st.place[id] === answer(id);
          item.classList.add(ok ? 'ok' : 'bad');
          g.classList.add(ok ? 'res-ok' : 'res-bad');
          item.textContent = (ok ? '✓ ' : '✕ ') + label(id);
        }
        (st.place[id] ? binEls[st.place[id]].list : tray).append(item);
        g.setAttribute('aria-label', label(id) + (st.place[id] ? `, placed in ${CATS.find(c => c.id === st.place[id]).title}` : ', not classified') + (sel === id ? ', selected' : ''));
      });
      if (!tray.children.length) tray.append(h('span', { style: 'font-size:.85rem;color:var(--muted)' }, 'All elements placed.'));
      const v = info.querySelector('.v'), n = info.querySelector('.n');
      if (sel) { v.textContent = label(sel); n.textContent = 'Now choose “Place selected here” in one of the groups.'; }
      else { v.textContent = 'Nothing selected'; n.textContent = st.checked ? 'Classification checked.' : 'Select an element on the diagram or below.'; }
      checkBtn.disabled = st.checked || Object.keys(st.place).length < all.length;
      checkBtn.textContent = st.checked ? 'Checked' : `Check classification (${Object.keys(st.place).length}/${all.length})`;
      fb.innerHTML = '';
      if (st.checked) {
        const wrong = all.filter(id => st.place[id] !== answer(id));
        fb.append(h('div', { class: 'verdict ' + (wrong.length ? 'bad' : 'ok') }, wrong.length ? `✕ ${wrong.length} element${wrong.length > 1 ? 's' : ''} placed in the wrong group` : '✓ All elements classified as in the academic’s explanation'));
        fb.append(ctx.quote(['c1', 'sol-note']));
      }
    }
    checkBtn.addEventListener('click', () => {
      const all = [...BOOMS.map(b => b.id), ...PANELS.map(p => p.id)];
      const wrong = all.filter(id => st.place[id] !== answer(id));
      const prev = ctx.get() || {};
      st.checked = true;
      ctx.set({ checked: true, place: st.place, firstCorrect: prev.firstCorrect != null ? prev.firstCorrect : wrong.length === 0, wrong: prev.wrong || wrong.map(label) });
      render();
    });
    resetBtn.addEventListener('click', () => { st.place = {}; st.checked = false; sel = null; const prev = ctx.get() || {}; ctx.set({ place: {}, checked: false, firstCorrect: prev.firstCorrect, wrong: prev.wrong }); render(); });
    render();
  }

  function cut(host, cfg, ctx) {
    const { h } = ctx;
    const saved = ctx.get() || {};
    let at = saved.at || 'P12';
    const svg = s('svg', { viewBox: '0 0 400 295', role: 'img', 'aria-labelledby': 'cut-t' });
    const t = s('title', { id: 'cut-t' }); svg.append(t);
    const els = drawSection(svg, id => { if (id[0] === 'P') set(id); });
    const mark = s('g', {}); svg.append(mark);
    const chips = h('div', { class: 'chips', role: 'group', 'aria-label': 'Cut position' });
    PANELS.forEach(p => chips.append(h('button', { class: 'chip', type: 'button', 'data-id': p.id, onclick: () => set(p.id) }, 'Cut in ' + p.name.toLowerCase())));
    const basic = h('div', { class: 'ind changed' }, h('div', { class: 'k' }, 'Basic shear flow, q', h('sub', {}, 'b')), h('div', { class: 'v' }, 'Changes with the cut position'));
    const total = h('div', { class: 'ind steady' }, h('div', { class: 'k' }, 'Total shear flow'), h('div', { class: 'v' }, 'The same wherever you cut'));
    const pos = h('p', { 'aria-live': 'polite', style: 'font-weight:500' });
    host.append(h('div', { class: 'widget' }, h('div', { class: 'widget-grid' },
      h('div', { class: 'stage-fig' }, svg, chips),
      h('div', { class: 'readout' }, pos, basic, total, ctx.quote(['c4']),
        h('div', { class: 'placeholder' }, h('h3', {}, 'Shear flow values: awaiting academic input'),
          h('p', {}, 'This view doesn’t calculate q', h('sub', {}, 'b'), ' or q', h('sub', {}, '0'), ' for each cut position. Approved distributions are needed before values or plots can be shown.'))))));
    function set(id) {
      at = id; ctx.set({ at, tried: Array.from(new Set([...(ctx.get() || {}).tried || [], id])) });
      const p = PANELS.find(x => x.id === id);
      const A = boom(p.a), B = boom(p.b);
      const mx = (X(A.x) + X(B.x)) / 2, my = (Y(A.y) + Y(B.y)) / 2;
      const ang = Math.atan2(Y(B.y) - Y(A.y), X(B.x) - X(A.x)) * 180 / Math.PI;
      mark.innerHTML = '';
      const g = s('g', { transform: `translate(${mx} ${my}) rotate(${ang})` });
      g.append(s('rect', { x: -5, y: -10, width: 10, height: 20, fill: 'var(--paper)' }), s('path', { d: 'M-4 -13V13M4 -13V13', class: 'svg-load', 'stroke-width': 2.5 }));
      mark.append(g);
      const lt = s('text', { x: mx + 10, y: my + (id === 'P34' ? 26 : -14), class: 'svg-mono', fill: 'var(--load)' }); lt.textContent = 'cut'; mark.append(lt);
      Object.entries(els).forEach(([k, el]) => el.classList.toggle('sel', k === id));
      chips.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', String(c.dataset.id === id)));
      t.textContent = `Idealised section cut in ${p.name.toLowerCase()}`;
      const tried = (ctx.get() || {}).tried || [];
      pos.textContent = `Cut in ${p.name.toLowerCase()}. You have tried ${tried.length} of 4 cut positions.`;
    }
    set(at);
  }

  (window.FAQ_WIDGETS = window.FAQ_WIDGETS || {})['boom-section'] = { mount: (host, cfg, ctx) => (cfg.mode === 'cut' ? cut : classify)(host, cfg, ctx) };
})();
