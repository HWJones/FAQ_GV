/*
 * Beat Your Best: additional question types written FROM the academic's answers.
 * ------------------------------------------------------------------------------
 * Every question points to the verbatim source blocks it is based on (refs) and to
 * the PDF thread/pages (src is derived from the refs automatically). Numbers used
 * in numerical questions come from the posted solutions or the academic's replies.
 * Where a value had to be chosen (e.g. b = 50 mm), this is stated in `note`, and the
 * question is flagged for academic review like every other item.
 *
 * Types: numeric | tf (true/false with reasoning) | match | mcq (scenario / predict)
 * level: 1 = foundation, 2 = application, 3 = reasoning / multi-step
 */
(function () {
  const N = window.FAQ_N;
  const Q = window.GAME_EXTRA = [];
  const r = (faq, ...ids) => ({ faq, ids });

  /* ---------------- Numerical (value + unit, with tolerance and worked solution) ---------------- */
  Q.push(
    { id: 'n-area-rect', type: 'numeric', level: 1, topic: 't2', concepts: ['enclosed-area'],
      prompt: 'A single cell rectangular tube has midline dimensions of height 2<i>b</i> and width <i>b</i>, with <i>b</i> = 50 mm. What is the enclosed area <i>A</i> used in 2<i>Aq</i><sub>0</sub>?',
      answer: 5000, tol: { rel: 0.005 }, unit: 'mm²', units: ['mm', 'mm²', 'mm³', 'mm⁴'],
      worked: '<i>A</i> is the area enclosed by the wall midline: <i>A</i> = 2<i>b</i> × <i>b</i> = 2<i>b</i><sup>2</sup> = 2 × 50<sup>2</sup> = 5000 mm<sup>2</sup>.',
      note: 'The value b = 50 mm was chosen for this question.',
      refs: [r('enclosed-area', 'a1', 'a2')] },
    { id: 'n-area-tri', type: 'numeric', level: 1, topic: 't2', concepts: ['enclosed-area'],
      prompt: 'The triangular tube in Tutorial 1 Q4 has midline height <i>d</i> and base <i>d</i>. For <i>d</i> = 120 mm, what is <i>A</i>?',
      answer: 7200, tol: { rel: 0.005 }, unit: 'mm²', units: ['mm', 'mm²', 'mm³', 'mm⁴'],
      worked: '<i>A</i> = <i>d</i><sup>2</sup>/2 = 120<sup>2</sup>/2 = 7200 mm<sup>2</sup>.',
      note: 'The value d = 120 mm was chosen for this question.',
      refs: [r('enclosed-area', 'a1', 'a3')] },
    { id: 'n-ix-tut3', type: 'numeric', level: 2, topic: 'pre', concepts: ['thin-wall-approx', 'second-moment', 'parallel-axis'],
      prompt: 'Tutorial 3 Ex 1: a box section, 300 mm wide and 100 mm high on the midline, with 5 mm walls. Using the thin-walled approach in the solution (vertical walls about their own axis + parallel-axis terms for the top and bottom walls), find <i>I</i><sub>x</sub>.',
      answer: 8.333e6, tol: { rel: 0.005 }, unit: 'mm⁴', units: ['mm²', 'mm³', 'mm⁴'],
      worked: '<i>I</i><sub>x</sub> = 2 × (5 × 100<sup>3</sup>/12) + 2 × (300 × 5 × 50<sup>2</sup>) = 0.833 × 10<sup>6</sup> + 7.5 × 10<sup>6</sup> = 8.333 × 10<sup>6</sup> mm<sup>4</sup> (as in the posted working).',
      refs: [r('thin-wall', 'qf1', 'b1')] },
    { id: 'n-ix-pct', type: 'numeric', level: 3, topic: 'pre', concepts: ['thin-wall-approx', 'second-moment'],
      prompt: 'The academic asked: if you add the neglected own-axis terms of the top and bottom walls (2 × <i>bt</i><sup>3</sup>/12) for the same section, what is the percentage change in <i>I</i><sub>x</sub>?',
      answer: 0.075, tol: { abs: 0.003 }, unit: '%', units: ['%'],
      worked: 'Neglected terms: 2 × (300 × 5<sup>3</sup>/12) = 6250 mm<sup>4</sup>. Change = 6250 / 8.333 × 10<sup>6</sup> × 100 ≈ 0.075 %.',
      note: 'The calculation follows the draft model in the Thin-Walled Sections activity, which is awaiting academic verification.',
      refs: [r('thin-wall', 'b1', 'b2', 'b3')] },
    { id: 'n-dx-12', type: 'numeric', level: 1, topic: 't4', concepts: ['idealisation', 'basic-shear-flow'],
      prompt: 'In the six-boom section of thread #45, Boom 1 has area 100 mm<sup>2</sup> at <i>y</i> = 75 mm. Starting at the cut to the right of Boom 1 and moving towards Boom 2, what is <i>D</i><sub>x</sub> along wall 1–2?',
      answer: -7500, tol: { abs: 1 }, unit: 'mm³', units: ['mm²', 'mm³', 'mm⁴'],
      worked: 'Only booms contribute (the wall has no direct stress carrying capacity): <i>D</i><sub>x</sub> = −100 × 75 = −7500 mm<sup>3</sup>.',
      refs: [r('material-passed-dx', 'a4', 'a4m')] },
    { id: 'n-dx-A', type: 'numeric', level: 2, topic: 't4', concepts: ['idealisation', 'basic-shear-flow'],
      prompt: 'Same section: Booms 1 and 2 (100 mm<sup>2</sup>, <i>y</i> = ±75), Booms 3 and 6 (400 mm<sup>2</sup>, <i>y</i> = ∓110). You are at position A on wall 3–4, moving towards Boom 4. What is <i>D</i><sub>x</sub> at A?',
      answer: 0, tol: { abs: 1 }, unit: 'mm³', units: ['mm²', 'mm³', 'mm⁴'],
      worked: 'You have passed Booms 1, 2, 3 and 6: <i>D</i><sub>x</sub> = −(100 × 75 + 100 × (−75) + 400 × 110 + 400 × (−110)) = 0.',
      refs: [r('material-passed-dx', 'b2', 'b3', 'b4')] },
    { id: 'n-dx-36', type: 'numeric', level: 3, topic: 't4', concepts: ['idealisation', 'basic-shear-flow'],
      prompt: 'Now move past Boom 3 towards Boom 6 instead (Booms 4 and 5 are 300 mm<sup>2</sup> at <i>y</i> = ∓29 and +29 mm). What is <i>D</i><sub>x</sub> at a point between 3 and 6?',
      answer: 44000, tol: { abs: 1 }, unit: 'mm³', units: ['mm²', 'mm³', 'mm⁴'],
      worked: 'Passed: Booms 1, 2, 3, 4 and 5. <i>D</i><sub>x</sub> = −(100 × 75 + 100 × (−75) + 400 × (−110) + 300 × 29 + 300 × (−29)) = 400 × 110 = 44 000 mm<sup>3</sup>.',
      refs: [r('material-passed-dx', 'b6', 'b7')] },
    { id: 'n-ix-45', type: 'numeric', level: 2, topic: 't4', concepts: ['idealisation', 'second-moment'],
      prompt: 'For the same idealised section (two booms each of 100 mm<sup>2</sup> at ±75 mm, 400 mm<sup>2</sup> at ±110 mm and 300 mm<sup>2</sup> at ±29 mm), find <i>I</i><sub>x</sub>.',
      answer: 11309600, tol: { rel: 0.002 }, unit: 'mm⁴', units: ['mm²', 'mm³', 'mm⁴'],
      worked: '<i>I</i><sub>x</sub> = 2(100 × 75<sup>2</sup> + 400 × 110<sup>2</sup> + 300 × 29<sup>2</sup>) = 11 309 600 mm<sup>4</sup> (as in the posted solution).',
      refs: [r('material-passed-dx', 'qf1')] },
    { id: 'n-ix-21', type: 'numeric', level: 2, topic: 't4', concepts: ['idealisation', 'second-moment'],
      prompt: 'Tutorial 1 Q6: booms of 500 mm<sup>2</sup> at <i>y</i> = ±100 mm and 200 mm<sup>2</sup> at <i>y</i> = ±200 mm. Only the booms contribute. Find <i>I</i><sub>x</sub>.',
      answer: 2.6e7, tol: { rel: 0.002 }, unit: 'mm⁴', units: ['mm²', 'mm³', 'mm⁴'],
      worked: '<i>I</i><sub>x</sub> = (500 × 100<sup>2</sup> + 200 × 200<sup>2</sup>) × 2 = 2.6 × 10<sup>7</sup> mm<sup>4</sup>.',
      refs: [r('boom-idealisation', 'c1', 'qf1')] },
    { id: 'n-tau-88', type: 'numeric', level: 2, topic: 't5', concepts: ['shear-stress', 'multicell'],
      prompt: 'In 2016 Q2a(iii), the exterior walls carry a shear flow of 6.0 N/mm. One is 3 mm thick and the other 5 mm thick. What is the larger of the two shear stresses?',
      answer: 2.0, tol: { abs: 0.02 }, unit: 'N/mm²', units: ['N/mm', 'N/mm²', 'N'],
      worked: 'Shear stress = <i>q</i>/<i>t</i>: 6/3 = 2.0 N/mm<sup>2</sup> in the thin wall, and 6/5 = 1.2 N/mm<sup>2</sup> in the thick wall. The thin wall governs here. You should also check the other walls.',
      refs: [r('multicell-torsion', 't88a1', 't88a2', 't88a3')] },
    { id: 'n-q0-52', type: 'numeric', level: 3, topic: 't8', concepts: ['tapered', 'torsional-equivalence'],
      prompt: 'Tutorial 3 Q2 (tapered beam): taking torques about point 1, the solution gives 8000 × 2 = 50 000 + 30 000 + 400 <i>q</i><sub>0</sub> (N·cm). Solve for <i>q</i><sub>0</sub>.',
      answer: -160, tol: { abs: 0.5 }, unit: 'N/cm', units: ['N', 'N/cm', 'N/cm²'],
      worked: '16 000 = 80 000 + 400 <i>q</i><sub>0</sub>, so 400 <i>q</i><sub>0</sub> = −64 000 and <i>q</i><sub>0</sub> = −160 N/cm.',
      refs: [r('tapered-beam-boom-forces', 't52f1', 't52a5')] }
  );

  /* ---------------- True / false with reasoning ---------------- */
  const tf = (id, level, topic, concepts, statement, truth, reasons, refs) =>
    Q.push({ id, type: 'tf', level, topic, concepts, prompt: statement, truth, reasons, refs });
  tf('tf-crossterms', 2, 't6', ['virtual-work', 'basic-shear-flow'],
    `The integrals ${N.oint} ${N.qb}·${N.q0B} <i>ds</i> and ${N.oint} ${N.qbB}·${N.q0} <i>ds</i> are always zero for a closed section.`, false,
    [{ html: 'It depends on where <i>s</i> starts. If <i>s</i> started at the top left corner in Tutorial 3 Q1, they would not be zero.', correct: true },
     { html: `${N.q0} varies around the section, so the integrals can’t be zero.` },
     { html: `${N.qb} is zero everywhere in a closed section.` }],
    [r('virtual-work-cross-terms', 'a6')]);
  tf('tf-unitload', 1, 't6', ['virtual-work', 'shear-centre'],
    'The unit virtual load is assumed to act through the shear centre.', false,
    [{ html: `It is applied where the displacement is wanted. The virtual (${N.qb} + ${N.q0}) accounts for any offset from the shear centre.`, correct: true },
     { html: 'Virtual work can only be used for loads through the shear centre.' },
     { html: 'The torque from the offset is added as a separate virtual torque.' }],
    [r('unit-load-and-torque', 'a1', 'a2')]);
  tf('tf-openq', 2, 't3', ['shear-centre', 'shear-flow', 'shear-stress'],
    'For an open section, the shear flow does not change when the shear force is moved away from the shear centre.', true,
    [{ html: 'The shear <em>stresses</em> do change, though: they are a superposition of the uniform part due to <i>q</i> and a linearly varying part due to the torque.', correct: true },
     { html: 'The section does not twist, so nothing about it changes.' },
     { html: `${N.q0} adjusts to cancel the torque.` }],
    [r('shear-centre', 'a4')]);
  tf('tf-corners', 2, 't1', ['torsion-constant', 'thin-wall-approx'],
    'When calculating <i>J</i> from midline dimensions, you should subtract the corner overlaps.', false,
    [{ html: 'The soap film approximation already ignores the curvature at ends and corners. Midline dimensions are used without adjustment, and the difference is small for thin walls.', correct: true },
     { html: 'Corners carry no shear stress in torsion.' },
     { html: 'Subtracting the corners would make <i>J</i> larger, not smaller.' }],
    [r('torsion-constant-midline', 'a1', 'a3', 'b2')]);
  tf('tf-principal', 1, 'pre', ['principal-axes'],
    'Principal axes are always the same as the centroidal axes.', false,
    [{ html: `There are infinitely many centroidal axis pairs. The principal axes are the pair with ${N.Ixy} = 0.`, correct: true },
     { html: 'Principal axes do not pass through the centroid.' },
     { html: 'Only horizontal and vertical axes can be principal.' }],
    [r('principal-axes', 'a1', 'a2')]);
  tf('tf-thickest', 1, 't5', ['shear-stress', 'multicell'],
    'In a multi-cell tube under torque, the maximum shear stress is always in the thickest wall.', false,
    [{ html: 'You need the maximum <i>q</i>/<i>t</i>, so check every wall.', correct: true },
     { html: 'It is always in the wall with the largest <i>q</i>.' },
     { html: 'It is always in the radial walls.' }],
    [r('multicell-torsion', 't88a1', 't88a2', 't88a3')]);
  tf('tf-panelthick', 2, 't4', ['idealisation', 'basic-shear-flow'],
    `In a boom-shear panel idealisation, the panel thickness doesn’t affect ${N.Ix} or ${N.Dx}.`, true,
    [{ html: `Only the direct stress carrying booms contribute. The thickness is needed when calculating ${N.q0}.`, correct: true },
     { html: 'The panels are assumed to have zero thickness.' },
     { html: 'The thickness cancels in every calculation.' }],
    [r('boom-idealisation', 'c1', 'c2')]);
  tf('tf-cut', 2, 't3', ['basic-shear-flow', 'closed-section'],
    'Moving the ‘cut’ in a closed section changes the total shear flow.', false,
    [{ html: `The basic shear flow ${N.qb} changes with the cut, but the total shear flow does not.`, correct: true },
     { html: `Neither ${N.qb} nor the total shear flow changes.` },
     { html: `The total shear flow changes, but ${N.qb} does not.` }],
    [r('boom-idealisation', 'c4'), r('material-passed-dx', 'a2')]);
  tf('tf-warping', 1, 't7', ['warping'],
    'Warping means the cross-section changes size along the beam.', false,
    [{ html: 'A warping displacement field makes an originally planar surface non-planar.', correct: true },
     { html: 'Warping only occurs in open sections.' },
     { html: 'Warping is any displacement in the <i>z</i> direction.' }],
    [r('warping-and-constraint', 'a2', 'a3')]);
  tf('tf-zstart', 1, 't6', ['sign-convention'],
    'You must always measure <i>z</i> from the free end of a cantilever.', false,
    [{ html: 'You can choose where to start <i>z</i>. Make clear what you’ve done, and apply the sign convention correctly.', correct: true },
     { html: 'The sign convention only works if <i>z</i> starts at the support.' }],
    [r('faces-and-arrows', 't43a1')]);

  /* ---------------- Matching ---------------- */
  Q.push(
    { id: 'm-definitions', type: 'match', level: 1, topic: 'pre', concepts: ['enclosed-area', 'principal-axes', 'warping', 'basic-shear-flow'],
      prompt: 'Match each term to its meaning, as the academic defines it.',
      pairs: [
        { left: 'Enclosed area <i>A</i>', right: 'The area enclosed by the midline of the wall' },
        { left: 'Principal axes', right: 'The centroidal axes with <i>I</i><sub>xy</sub> = 0' },
        { left: 'Warping displacement field', right: 'Makes an originally planar surface non-planar' },
        { left: `${N.q0} (single cell, shear force)`, right: 'The shear flow where <i>s</i> starts, i.e. at the ‘cut’' },
        { left: `${N.qb}`, right: 'The basic shear flow in the ‘cut’ (open) tube, from the open tube formula' }
      ],
      refs: [r('enclosed-area', 'a1'), r('principal-axes', 'a2'), r('warping-and-constraint', 'a2'), r('unit-load-and-torque', 'b2'), r('multicell-torsion', 'a3')] },
    { id: 'm-methods', type: 'match', level: 2, topic: 't3', concepts: ['basic-shear-flow', 'resultants', 'torsional-equivalence'],
      prompt: 'Match each situation to the method the academic recommends.',
      pairs: [
        { left: `The line of action of ${N.Fy} is known`, right: `Find ${N.q0} from torsional equivalence` },
        { left: 'You need the location of the shear centre', right: `Find the ${N.q0} that gives zero rate of twist` },
        { left: `${N.qb} along a wall is proportional to <i>s</i><sup>2</sup> only`, right: 'Resultant = 1/3 × base × height' },
        { left: `${N.qb} contains both <i>s</i> and <i>s</i><sup>2</sup>`, right: `Integrate ${N.qb} with respect to <i>s</i>` }
      ],
      refs: [r('two-ways-to-find-q0', 'a1', 'a2'), r('resultants-of-shear-flow', 'a7', 't57a1')] },
    { id: 'm-symbols', type: 'match', level: 2, topic: 't3', concepts: ['torsional-equivalence', 'idealisation', 'shear-stress', 'direct-stress'],
      prompt: 'Match each expression to what it represents.',
      pairs: [
        { left: '<i>D</i><sub>x+</sub> and <i>D</i><sub>x−</sub>', right: `The ${N.Dx} values before and after a boom` },
        { left: `${N.th}<i>G</i>2<i>n</i>`, right: 'The linearly varying shear stress due to torque in an open section' },
        { left: `2<i>A</i>${N.q0}`, right: `The torque resultant of ${N.q0} in a single cell` },
        { left: `${N.sz} = ${N.Mx}<i>y</i>/${N.Ix}`, right: 'The direct stress due to bending, used for boom forces' }
      ],
      refs: [r('principal-axes', 't80a1'), r('unit-load-and-torque', 'b3b'), r('torque-resultant-of-shear-flow', 'a2c'), r('tapered-beam-boom-forces', 'a1', 'a1m')] }
  );

  /* ---------------- Scenario / predict the outcome ---------------- */
  Q.push(
    { id: 's-twist', type: 'mcq', kind: 'predict', level: 2, topic: 't3', concepts: ['shear-centre', 'torsion', 'superposition'],
      prompt: 'Predict the outcome: a channel section carries <i>F</i><sub>y</sub> through its shear centre. You move <i>F</i><sub>y</sub> a distance <i>d</i> away. What happens to the rate of twist d<i>θ</i>/d<i>z</i>?',
      options: [
        { id: 'a', html: 'It changes from zero to non-zero, due to the torque <i>F</i><sub>y</sub>·<i>d</i>.', correct: true },
        { id: 'b', html: 'It stays zero, because the shear flow is unchanged.' },
        { id: 'c', html: 'It becomes non-zero only if the section is closed.' }
      ],
      refs: [r('shear-centre', 'af2', 'a4')] },
    { id: 's-twocell', type: 'mcq', kind: 'scenario', level: 3, topic: 't5', concepts: ['multicell', 'basic-shear-flow', 'torsional-equivalence'],
      prompt: `Scenario: an exam question gives a two-cell section with ${N.Sy} at a specified position and asks for the shear flow distribution. You’ve found ${N.qb} in the cut section. What do you do next?`,
      options: [
        { id: 'a', html: 'Equate the rates of twist of the cells and write a torsional equivalence equation (about any point) to find the <i>q</i><sub>0<i>i</i></sub>.', correct: true },
        { id: 'b', html: 'Find the <i>q</i><sub>0<i>i</i></sub> that give zero rate of twist, as for the shear centre.' },
        { id: 'c', html: 'Torsional equivalence must be written about the point where the torque of the shear force is zero.' }
      ],
      refs: [r('two-ways-to-find-q0', 't86q4', 't86a3')] },
    { id: 's-builtin', type: 'mcq', kind: 'scenario', level: 2, topic: 't7', concepts: ['warping'],
      prompt: 'Scenario: a thin-walled rectangular tube is built into a wall at one end and twisted. Where do axial constraint stresses arise, and how do they vary?',
      options: [
        { id: 'a', html: 'At the built-in end, where warping is restrained. They are local to the constraint and reduce with distance from it.', correct: true },
        { id: 'b', html: 'Uniformly along the whole length.' },
        { id: 'c', html: 'Only at the free end, where the twist is largest.' }
      ],
      refs: [r('warping-and-constraint', 't13a1', 't13q3')] },
    { id: 's-examform', type: 'mcq', kind: 'scenario', level: 1, topic: 'info', concepts: ['exam', 'shear-flow'],
      prompt: `Scenario: an exam question doesn’t say what form your shear flow should take. You have ${N.qb} as a multiple of ${N.Fy}/${N.Ix}. Is that acceptable?`,
      options: [
        { id: 'a', html: `Yes, but later calculations (force resultant, shear stress, shear centre) will normally need the simplest form, not in terms of ${N.Ix}.`, correct: true },
        { id: 'b', html: 'No. Every answer must be fully numerical.' },
        { id: 'c', html: `Yes, and you can leave everything in terms of ${N.Ix} to the end.` }
      ],
      refs: [r('presenting-shear-flow-answers', 'a2')] },
    { id: 's-taperS', type: 'mcq', kind: 'predict', level: 3, topic: 't8', concepts: ['tapered', 'torsional-equivalence'],
      prompt: 'Predict: in a tapered beam, if you replaced the full applied shear force with only the web shear force in the torque equation (still including the boom vertical components), what would happen to <i>q</i><sub>0</sub>?',
      options: [
        { id: 'a', html: 'It would be wrong. The torque of the full applied force must equal the torque of the boom components plus the wall shear flow.', correct: true },
        { id: 'b', html: 'It would be unchanged, as the boom components cancel.' },
        { id: 'c', html: 'It would be correct, because using the full shear force double counts.' }
      ],
      refs: [r('tapered-beam-boom-forces', 't52a1', 't52a5')] }
  );
})();
