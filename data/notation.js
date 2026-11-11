/* Shared notation for content files, so symbols render identically everywhere.
 * Usage inside a data file:  const N = window.FAQ_N;  `${N.qb} + ${N.q0}` */
window.FAQ_N = (function () {
  const v = (s, sub) => `<i>${s}</i>${sub ? `<sub>${sub}</sub>` : ''}`;
  const bar = (s, sub) => `<i class="ov">${s}</i>${sub ? `<sub>${sub}</sub>` : ''}`;
  const oint = '<span class="oint" aria-hidden="true">∮</span>';
  return {
    v, bar, oint,
    q: v('q'), qb: v('q', 'b'), q0: v('q', '0'), qbB: bar('q', 'b'), q0B: bar('q', '0'),
    Fy: v('F', 'y'), Fx: v('F', 'x'), Sy: v('S', 'y'), Sx: v('S', 'x'),
    Ix: v('I', 'x'), Iy: v('I', 'y'), Ixy: v('I', 'xy'), Dx: v('D', 'x'), Dy: v('D', 'y'), Mx: v('M', 'x'), MxB: bar('M', 'x'),
    J: v('J'), G: v('G'), A: v('A'), t: v('t'), s: v('s'), d: v('d'), p: v('p'), T: v('T'),
    th: '<i>θ</i>′', sz: '<i>σ</i><sub>z</sub>', tau: '<i>τ</i>',
    ds: '<i>ds</i>'
  };
})();
