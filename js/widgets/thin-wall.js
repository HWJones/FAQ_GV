/* Widget: thin-wall — box section Ix with and without the neglected terms.
 * CALCULATION (pending academic verification — see review checklist). Midline dimensions:
 *   vertical walls, own axis       : 2 · t·h³/12                (included)
 *   top/bottom walls, parallel axis: 2 · b·t·(h/2)²             (included)
 *   top/bottom walls, own axis     : 2 · b·t³/12                (neglected)
 *   % change = neglected / Ix_thin × 100
 * Tutorial 3 Ex 1 values (b=300, h=100, t=5) reproduce 8.333×10⁶ mm⁴ from the posted working.
 */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const s = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };

  function compute(b, h, t) {
    const vert = 2 * (t * h ** 3 / 12);
    const para = 2 * (b * t * (h / 2) ** 2);
    const own = 2 * (b * t ** 3 / 12);
    const thin = vert + para;
    return { vert, para, own, thin, full: thin + own, pct: own / thin * 100 };
  }
  function sci(v) {
    if (v === 0) return '0';
    const e = Math.floor(Math.log10(Math.abs(v)));
    const m = v / 10 ** e;
    return `${m.toFixed(3)} × 10<sup>${e}</sup>`;
  }
  const pctFmt = p => p < 0.01 ? p.toFixed(4) : p < 1 ? p.toFixed(3) : p.toFixed(2);

  function mount(host, cfg, ctx) {
    const { h } = ctx;
    const R = cfg.ranges, P = cfg.preset;
    const saved = ctx.get() || {};
    const v = { b: saved.b || P.b, h: saved.h || P.h, t: saved.t || P.t };

    const svg = s('svg', { viewBox: '0 0 340 230', role: 'img', 'aria-labelledby': 'tw-title tw-desc' });
    const tt = s('title', { id: 'tw-title' }); tt.textContent = 'Box section, midline dimensions'; svg.append(tt);
    const desc = s('desc', { id: 'tw-desc' }); svg.append(desc);
    const g = s('g', {}); svg.append(g);

    const slider = (key, label, unit) => {
      const [mn, mx, st] = R[key];
      const inp = h('input', { type: 'range', id: 'tw-' + key, min: mn, max: mx, step: st, value: v[key] });
      const out = h('output', { for: 'tw-' + key });
      inp.addEventListener('input', () => { v[key] = +inp.value; update(); });
      return { inp, out, el: h('div', { class: 'ctl' }, h('label', { for: 'tw-' + key }, h('span', { html: label }), out), inp), unit };
    };
    const sb = slider('b', 'Width, <i>b</i> (midline)', 'mm');
    const sh = slider('h', 'Height, <i>h</i> (midline)', 'mm');
    const st = slider('t', 'Wall thickness, <i>t</i>', 'mm');
    const presetBtn = h('button', { class: 'chip', type: 'button', onclick: () => { Object.assign(v, P); sync(); update(); } }, 'Tutorial 3 Ex 1 values');
    const tenBtn = h('button', { class: 'chip', type: 'button', onclick: () => { v.h = 100; v.t = 10; v.b = P.b; sync(); update(); } }, 'h/t = 10');

    const ratioBig = h('div', { class: 'big' });
    const gauge = s('svg', { viewBox: '0 0 300 54', role: 'img', 'aria-labelledby': 'tw-g' });
    const gt = s('title', { id: 'tw-g' }); gt.textContent = 'Height to thickness ratio against the typical thin-walled thresholds'; gauge.append(gt);
    const GX = x => 10 + Math.min(x, 50) / 50 * 280;
    gauge.append(s('rect', { x: 10, y: 18, width: 280, height: 8, rx: 4, fill: 'var(--grid)' }));
    cfg.thresholds.forEach(th => {
      gauge.append(s('path', { d: `M${GX(th)} 12V32`, class: 'svg-added', 'stroke-width': 2 }));
      const tx = s('text', { x: GX(th) - 8, y: 46, class: 'svg-small' }); tx.textContent = '>' + th; gauge.append(tx);
    });
    [0, 30, 40, 50].forEach(n => { const tx = s('text', { x: GX(n) - (n ? 6 : 2), y: 46, class: 'svg-small' }); tx.textContent = n === 50 ? '50+' : n; gauge.append(tx); });
    const marker = s('path', { class: 'svg-accent-fill' }); gauge.append(marker);

    const tbody = h('tbody');
    const tfoot = h('tfoot');
    const pctBig = h('div', { class: 'big' });
    const live = h('p', { class: 'sr-only', 'aria-live': 'polite' });

    host.append(h('div', { class: 'widget' }, h('div', { class: 'widget-grid' },
      h('div', { class: 'stage-fig' }, svg, sb.el, sh.el, st.el, h('div', { class: 'chips' }, presetBtn, tenBtn)),
      h('div', { class: 'readout' },
        h('div', { class: 'placeholder', style: 'padding:10px 12px' }, h('h3', {}, 'Draft calculation: awaiting academic verification'),
          h('p', { style: 'font-size:.85rem' }, 'Uses midline dimensions and the terms named in the thread. Corner overlap is not modelled.')),
        h('div', { class: 'ind' }, h('div', { class: 'k' }, 'Change in I', h('sub', {}, 'x'), ' if the neglected terms are added'), pctBig),
        h('div', { class: 'scroll-x' }, h('table', { class: 'terms' },
          h('caption', { class: 'sr-only' }, 'Contributions to Ix'),
          h('thead', {}, h('tr', {}, h('th', {}, 'Contribution'), h('th', { style: 'text-align:right' }, 'mm⁴'))), tbody, tfoot)),
        h('div', { class: 'ind' }, h('div', { class: 'k' }, 'Height / wall thickness, h/t'), ratioBig, gauge,
          h('div', { class: 'source', style: 'padding:10px 12px;gap:6px' }, ctx.provSrc('academic response (verbatim)'),
            h('p', { style: 'font-size:.92rem', html: '“Typically, people take a beam section as thin walled if the height of the section/wall thickness &gt;20 for vertical loading (but sometimes I have seen &gt;10).”' }))),
        live))));

    function sync() { [['b', sb], ['h', sh], ['t', st]].forEach(([k, o]) => { o.inp.value = v[k]; }); }
    function update() {
      if (v.t > v.h / 2) v.t = v.h / 2;
      if (v.t > v.b / 2) v.t = v.b / 2;
      sync();
      sb.out.value = v.b + ' mm'; sh.out.value = v.h + ' mm'; st.out.value = v.t + ' mm';
      const r = compute(v.b, v.h, v.t);
      // drawing: fit midline box into 300x170
      const sc = Math.min(260 / v.b, 150 / v.h);
      const W = v.b * sc, H = v.h * sc, T = Math.max(1, v.t * sc);
      const x0 = (340 - W) / 2, y0 = 20 + (160 - H) / 2;
      g.innerHTML = '';
      // vertical walls (included, own axis) and top/bottom (parallel axis included)
      g.append(s('rect', { x: x0 - T / 2, y: y0 - T / 2, width: W + T, height: T, fill: 'var(--accent)', opacity: .85 }));
      g.append(s('rect', { x: x0 - T / 2, y: y0 + H - T / 2, width: W + T, height: T, fill: 'var(--accent)', opacity: .85 }));
      g.append(s('rect', { x: x0 - T / 2, y: y0, width: T, height: H, fill: 'var(--ink)', opacity: .75 }));
      g.append(s('rect', { x: x0 + W - T / 2, y: y0, width: T, height: H, fill: 'var(--ink)', opacity: .75 }));
      g.append(s('rect', { x: x0, y: y0, width: W, height: H, fill: 'none', stroke: 'var(--surface)', 'stroke-width': .8, 'stroke-dasharray': '3 3' }));
      g.append(s('path', { d: `M${x0 - 20} ${y0 + H / 2}H${x0 + W + 20}`, class: 'svg-axis', 'stroke-width': 1 }));
      const xl = s('text', { x: x0 + W + 24, y: y0 + H / 2 + 4, class: 'svg-small' }); xl.textContent = 'x'; g.append(xl);
      const bl = s('text', { x: x0 + W / 2 - 22, y: y0 + H + T / 2 + 16, class: 'svg-mono' }); bl.textContent = `b = ${v.b}`; g.append(bl);
      const hl = s('text', { x: x0 + T / 2 + 6, y: y0 + H / 2 - 8, class: 'svg-mono' }); hl.textContent = `h = ${v.h}`; g.append(hl);
      const tl = s('text', { x: x0 + W / 2 - 22, y: y0 - T / 2 - 6, class: 'svg-mono' }); tl.textContent = `t = ${v.t}`; g.append(tl);
      const lg = s('text', { x: 10, y: 222, class: 'svg-small' }); lg.textContent = 'Blue: top and bottom walls. Dark: vertical walls. Dashed: midline.'; g.append(lg);
      desc.textContent = `Box section ${v.b} mm wide and ${v.h} mm high on the midline, walls ${v.t} mm thick.`;

      tbody.innerHTML = '';
      const row = (label, formula, val, neg) => h('tr', { class: neg ? 'neg' : '' }, h('td', {}, h('div', { html: label }), h('div', { style: 'font-size:.78rem;color:var(--muted);font-family:var(--f-mono)', html: formula })), h('td', { class: 'num', html: sci(val) }));
      tbody.append(
        row('Vertical walls, own axis <span style="color:var(--muted)">(included)</span>', '2 · t h³ / 12', r.vert),
        row('Top &amp; bottom walls, parallel axis <span style="color:var(--muted)">(included)</span>', '2 · b t (h/2)²', r.para),
        row('Top &amp; bottom walls, own axis <b>(neglected)</b>', '2 · b t³ / 12', r.own, true));
      tfoot.innerHTML = '';
      tfoot.append(h('tr', {}, h('td', {}, 'I', h('sub', {}, 'x'), ', thin-walled'), h('td', { class: 'num', html: sci(r.thin) })),
        h('tr', {}, h('td', {}, 'I', h('sub', {}, 'x'), ', with neglected terms'), h('td', { class: 'num', html: sci(r.full) })));
      pctBig.innerHTML = `${pctFmt(r.pct)}<small> %</small>`;
      const ratio = v.h / v.t;
      ratioBig.innerHTML = `${ratio.toFixed(1)}`;
      const mx = GX(ratio);
      marker.setAttribute('d', `M${mx - 6} 4L${mx + 6} 4L${mx} 14Z`);
      live.textContent = `h/t ${ratio.toFixed(1)}. Ix changes by ${pctFmt(r.pct)} percent if the neglected terms are added.`;
      ctx.set({ b: v.b, h: v.h, t: v.t });
    }
    update();
  }

  (window.FAQ_WIDGETS = window.FAQ_WIDGETS || {})['thin-wall'] = { mount, compute };
})();
