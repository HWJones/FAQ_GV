/* Widget: shear-centre — move the line of action of Fy on an open channel section.
 * DISPLAY RULES (pending academic approval — see review checklist):
 *  - Indicator states are taken from the Lecture Topic 3 figure:
 *      d = 0 : dθ/dz = 0, q ≠ 0, τ = q/t (uniform)
 *      d ≠ 0 : dθ/dz ≠ 0 (due to Fy·d), q ≠ 0 (equal to that due to Fy through the SC),
 *              τ = superposition of the constant and linearly varying components
 *  - Torque arrow size ∝ |d| (T = Fy·d). Twist angle and the linear stress component
 *    are FIXED schematic magnitudes; only their sign follows the sign of d.
 */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const s = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };

  function mount(host, config, ctx) {
    const { h } = ctx;
    const saved = ctx.get() || {};
    let d = saved.d || 0; // -100..100 (arbitrary display units)
    let showTwist = saved.showTwist !== false;

    // geometry
    const SCX = 120, SCY = 140, WEBX = 175, FL = 95, TOP = 70, BOT = 210, K = 1.1; // K: px per unit d
    const svg = s('svg', { viewBox: '0 0 360 300', role: 'img', 'aria-labelledby': 'sc-title sc-desc' });
    const title = s('title', { id: 'sc-title' }); title.textContent = 'Open channel section with a vertical shear force';
    const desc = s('desc', { id: 'sc-desc' });
    svg.append(title, desc);

    const section = s('g', {});
    section.append(s('path', { d: `M${WEBX + FL} ${TOP} H${WEBX} V${BOT} H${WEBX + FL}`, class: 'svg-wall', 'stroke-width': 7 }));
    svg.append(section);
    // ghost of undeformed section
    const ghost = s('path', { d: `M${WEBX + FL} ${TOP} H${WEBX} V${BOT} H${WEBX + FL}`, class: 'svg-muted', 'stroke-width': 1, 'stroke-dasharray': '3 3', opacity: 0 });
    svg.append(ghost);
    // axes
    svg.append(s('path', { d: `M${SCX - 30} ${SCY} H330`, class: 'svg-axis', 'stroke-width': 1 }));
    const xl = s('text', { x: 334, y: SCY + 4, class: 'svg-small' }); xl.textContent = 'x'; svg.append(xl);
    // shear centre
    svg.append(s('circle', { cx: SCX, cy: SCY, r: 7, class: 'svg-ink', 'stroke-width': 1.6, fill: 'var(--surface)' }));
    svg.append(s('path', { d: `M${SCX - 5} ${SCY - 5}l10 10M${SCX + 5} ${SCY - 5}l-10 10`, class: 'svg-ink', 'stroke-width': 1.6 }));
    const scl = s('text', { x: SCX - 46, y: SCY + 26, class: 'svg-small' }); scl.textContent = 'shear centre'; svg.append(scl);
    // torque arc
    const torque = s('path', { class: 'svg-load', 'stroke-width': 2.2, 'marker-end': 'url(#sc-arrow)' });
    const defs = s('defs', {});
    const mk = s('marker', { id: 'sc-arrow', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' });
    mk.append(s('path', { d: 'M0 0L10 5L0 10z', class: 'svg-load-fill' }));
    defs.append(mk); svg.prepend(defs);
    svg.append(torque);
    const tl = s('text', { class: 'svg-mono', fill: 'var(--load)' }); svg.append(tl);
    // force
    const force = s('g', { tabindex: 0, role: 'slider', 'aria-label': 'Line of action of Fy', 'aria-valuemin': -100, 'aria-valuemax': 100, style: 'cursor:ew-resize' });
    force.append(s('rect', { x: -16, y: 20, width: 32, height: 250, fill: 'transparent' }));
    force.append(s('path', { d: 'M0 268V40', class: 'svg-load', 'stroke-width': 1, 'stroke-dasharray': '4 4' }));
    force.append(s('path', { d: 'M0 150V44', class: 'svg-load', 'stroke-width': 3 }));
    force.append(s('path', { d: 'M-7 50L0 34L7 50Z', class: 'svg-load-fill' }));
    force.append(s('circle', { cx: 0, cy: 150, r: 6, class: 'svg-load-fill' }));
    const fl = s('text', { x: 8, y: 40, class: 'svg-mono', fill: 'var(--load)' }); fl.textContent = 'Fy'; force.append(fl);
    svg.append(force);
    // dimension d
    const dim = s('g', {});
    const dimLine = s('path', { class: 'svg-muted', 'stroke-width': 1 });
    const dimTxt = s('text', { class: 'svg-mono', y: 290 }); dimTxt.textContent = 'd';
    dim.append(dimLine, dimTxt); svg.append(dim);

    // through-thickness strip (schematic)
    const strip = s('svg', { viewBox: '0 0 220 120', role: 'img', 'aria-labelledby': 'st-title', style: 'width:100%;max-width:240px;height:auto;display:block;margin:6px auto' });
    const stt = s('title', { id: 'st-title' }); stt.textContent = 'Shear stress across the wall thickness (schematic)'; strip.append(stt);
    strip.append(s('rect', { x: 70, y: 10, width: 80, height: 96, fill: 'var(--surface)', stroke: 'var(--ink)', 'stroke-width': 1.5 }));
    strip.append(s('path', { d: 'M110 6V112', class: 'svg-axis', 'stroke-width': 1 }));
    const fa = s('text', { x: 4, y: 62, class: 'svg-small' }); fa.textContent = 'one face'; strip.append(fa);
    const fb = s('text', { x: 156, y: 62, class: 'svg-small' }); fb.textContent = 'other face'; strip.append(fb);
    const ml = s('text', { x: 96, y: 119, class: 'svg-small' }); ml.textContent = 'mid-line'; strip.append(ml);
    const arrows = s('g', {}); strip.append(arrows);

    // controls + readout
    const range = h('input', { type: 'range', id: 'sc-d', min: -100, max: 100, step: 1, value: d, 'aria-describedby': 'sc-d-out' });
    const out = h('output', { id: 'sc-d-out', for: 'sc-d' });
    const presets = h('div', { class: 'chips', role: 'group', 'aria-label': 'Preset positions' });
    [['Through shear centre', 0], ['On the web', Math.round((WEBX - SCX) / K)], ['At flange tips', 100], ['Left of shear centre', -60]].forEach(([l, v]) => {
      presets.append(h('button', { class: 'chip', type: 'button', 'aria-pressed': 'false', 'data-v': v, onclick: () => set(v) }, l));
    });
    const twistT = h('input', { type: 'checkbox', id: 'sc-twist' }); twistT.checked = showTwist;
    twistT.addEventListener('change', () => { showTwist = twistT.checked; update(); });

    const ind = (k) => { const v = h('div', { class: 'v' }); const n = h('div', { class: 'n' }); const box = h('div', { class: 'ind' }, h('div', { class: 'k', html: k }), v, n); return { box, v, n }; };
    const iLoad = ind('Load splits into');
    const iTwist = ind('Rate of twist, d<i>θ</i>/d<i>z</i>');
    const iQ = ind('Shear flow, <i>q</i>');
    const iTau = ind('Shear stress across the wall thickness, <i>τ</i>');
    const live = h('p', { class: 'sr-only', 'aria-live': 'polite' });

    host.append(h('div', { class: 'widget' }, h('div', { class: 'widget-grid' },
      h('div', { class: 'stage-fig' }, svg,
        h('div', { class: 'ctl' }, h('label', { for: 'sc-d' }, h('span', {}, 'Distance of Fy from the shear centre, d'), out), range),
        presets,
        h('label', { class: 'toggle', for: 'sc-twist' }, twistT, 'Show twist (exaggerated, schematic)')),
      h('div', { class: 'readout' },
        iLoad.box, iTwist.box, iQ.box,
        h('div', { class: 'ind' }, h('div', { class: 'k', html: 'Shear stress across the wall thickness, <i>τ</i>' }), strip, iTau.v, iTau.n, h('div', { class: 'schematic' }, 'Schematic. Magnitudes not to scale.')),
        h('p', { class: 'added-flag', style: 'display:block', html: 'The indicator labels come from the academic’s Lecture Topic 3 figure. The drawing and its motion were added for this activity and await review.' }),
        live))));

    function set(v) { d = Math.max(-100, Math.min(100, Math.round(v))); if (Math.abs(d) <= 2) d = 0; range.value = d; update(); }
    range.addEventListener('input', () => set(+range.value));
    force.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { set(d - 5); e.preventDefault(); }
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { set(d + 5); e.preventDefault(); }
      if (e.key === 'Home') { set(0); e.preventDefault(); }
    });
    let dragging = false;
    const toUnits = (ev) => { const pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY; const p = pt.matrixTransform(svg.getScreenCTM().inverse()); return (p.x - SCX) / K; };
    force.addEventListener('pointerdown', e => { dragging = true; force.setPointerCapture(e.pointerId); e.preventDefault(); });
    force.addEventListener('pointermove', e => { if (dragging) set(toUnits(e)); });
    force.addEventListener('pointerup', () => { dragging = false; });
    svg.addEventListener('pointerdown', e => { if (!force.contains(e.target)) set(toUnits(e)); });

    function update() {
      const x = SCX + d * K;
      force.setAttribute('transform', `translate(${x} 0)`);
      force.setAttribute('aria-valuenow', d);
      force.setAttribute('aria-valuetext', d === 0 ? 'through the shear centre' : `${Math.abs(d)} units ${d > 0 ? 'right' : 'left'} of the shear centre`);
      out.value = d === 0 ? '0 (through the shear centre)' : `${d > 0 ? '+' : '−'}${Math.abs(d)}`;
      presets.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', String(+c.dataset.v === d)));
      // dimension
      if (d === 0) { dimLine.setAttribute('d', ''); dimTxt.textContent = ''; }
      else { dimLine.setAttribute('d', `M${SCX} 272V284M${x} 272V284M${SCX} 278H${x}`); dimTxt.textContent = 'd'; dimTxt.setAttribute('x', (SCX + x) / 2 - 3); }
      // torque arc: anticlockwise on screen when force right of SC (moment Fy·d positive about z)
      if (d === 0) { torque.setAttribute('d', ''); tl.textContent = ''; }
      else {
        const r = 22 + Math.abs(d) * 0.18;
        const sweep = d > 0 ? 0 : 1; // 0 = anticlockwise in SVG coords
        const a0 = Math.PI * 0.15, a1 = Math.PI * 0.95;
        const p0 = [SCX + r * Math.cos(-a0), SCY + r * Math.sin(-a0)], p1 = [SCX + r * Math.cos(-a1), SCY + r * Math.sin(-a1)];
        torque.setAttribute('d', d > 0 ? `M${p0[0]} ${p0[1]}A${r} ${r} 0 0 ${sweep} ${p1[0]} ${p1[1]}` : `M${p1[0]} ${p1[1]}A${r} ${r} 0 0 ${sweep} ${p0[0]} ${p0[1]}`);
        tl.textContent = 'Fy·d'; tl.setAttribute('x', SCX - 18); tl.setAttribute('y', SCY - r - 8);
      }
      // twist (fixed schematic angle, sign only)
      const ang = d === 0 || !showTwist ? 0 : (d > 0 ? -5 : 5);
      section.setAttribute('transform', `rotate(${ang} ${SCX} ${SCY})`);
      section.style.transition = 'transform .25s';
      ghost.setAttribute('opacity', ang ? 1 : 0);
      // stress strip
      arrows.innerHTML = '';
      const n = 7, base = 30, lin = d === 0 ? 0 : (d > 0 ? 1 : -1) * 22;
      for (let i = 0; i < n; i++) {
        const xx = 76 + i * (68 / (n - 1));
        const frac = (i / (n - 1)) * 2 - 1; // -1 .. 1 across thickness
        const len = base + lin * frac;
        const y0 = 96, y1 = 96 - len;
        arrows.append(s('path', { d: `M${xx} ${y0}V${y1}`, class: 'svg-accent', 'stroke-width': 2 }));
        arrows.append(s('path', { d: `M${xx - 3} ${y1 + 5}L${xx} ${y1}L${xx + 3} ${y1 + 5}`, class: 'svg-accent', 'stroke-width': 2 }));
      }
      // indicators (wording from the Lecture Topic 3 figure)
      if (d === 0) {
        iLoad.v.textContent = 'Fy through the shear centre';
        iLoad.n.textContent = 'No torque about the shear centre.';
        iTwist.v.textContent = 'dθ/dz = 0'; iTwist.n.textContent = 'No twist (by definition of the shear centre).'; iTwist.box.className = 'ind steady';
        iTau.v.textContent = 'τ = q / t'; iTau.n.textContent = 'Uniform across the thickness.';
      } else {
        iLoad.v.textContent = 'Fy through the shear centre + torque Fy·d';
        iLoad.n.textContent = d > 0 ? 'Force to the right of the shear centre.' : 'Force to the left of the shear centre.';
        iTwist.v.textContent = 'dθ/dz ≠ 0'; iTwist.n.textContent = 'Due to Fy·d.'; iTwist.box.className = 'ind changed';
        iTau.v.textContent = 'Superposition'; iTau.n.textContent = 'Of the constant and linearly varying components.';
      }
      iQ.v.textContent = 'q ≠ 0 (unchanged)';
      iQ.n.textContent = 'Equal to that due to Fy acting through the shear centre.';
      iQ.box.className = 'ind steady';
      desc.textContent = d === 0 ? 'The force acts through the shear centre. The section does not twist.' : `The force acts a distance d ${d > 0 ? 'to the right' : 'to the left'} of the shear centre, adding a torque Fy·d. The section twists.`;
      live.textContent = desc.textContent;
      ctx.set({ d, showTwist, moved: (ctx.get() || {}).moved || d !== 0 });
    }
    update();
  }

  (window.FAQ_WIDGETS = window.FAQ_WIDGETS || {})['shear-centre'] = { mount };
})();
