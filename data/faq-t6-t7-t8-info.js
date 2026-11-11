/*
 * Topic 6 (signs and faces in Tutorial 3 Q1), Topic 7 (warping), Topic 8 (tapered beams)
 * and module/exam information (quick answers, no activity).
 * Threads #22 (+#43), #33 (+#13), #47 (+#34, #52), #14 (+#94, #56), #17 (+#36), #76.
 * Source text is verbatim and anonymised. Steps are activity content that needs academic approval.
 */
(function () {
  const N = window.FAQ_N;
  const R = window.FAQ_REGISTRY = window.FAQ_REGISTRY || [];
  const ACAD = 'Academic (module staff)', STU = 'Student (anonymised)';
  const fig = (id, src, alt, caption) => ({ id, type: 'figure', src: src.startsWith('data:') ? src : 'assets/figures/' + src + '.webp', alt, caption });
  const META_REVIEW = { area: 'Library metadata', item: 'Title, summary, objectives, sticking points, tags and alternative search phrases were written for the library. Confirm.' };
  const SyB = `<i class="ov">S</i><sub>y</sub>`;

  /* ---------------------------------------------------------------- #22 (+#43) */
  R.push({
    id: 'faces-and-arrows', order: 23, status: 'awaiting-review', discussion: '22', pages: '20–23',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't6',
      title: 'Positive and negative faces, and which way to draw the arrows',
      summary: 'Why the shear force is drawn upwards in one diagram and downwards in another, why the virtual shear force is 1 rather than −1, and how to draw shear flow arrows without double-counting a sign.',
      concepts: ['sign-convention', 'shear-flow', 'virtual-work', 'basic-shear-flow'],
      terms: ['+ve face', '-ve face', 'positive face', 'negative face', 'free body diagram', 'Sy bar = -1', 'actual direction', 'Tutorial 3 Q1', 'start z', 'clamped end'],
      questions: [
        'Why is the shear force upwards on the left-hand side when it was defined downwards?',
        'Why is the virtual shear force 1 instead of -1?',
        'If q is negative, should I flip the arrows and remove the minus sign?',
        'Can I start z from the clamped end if the question doesn’t specify?'
      ],
      difficulties: ['signs', 'visualising', 'misconceptions'],
      addresses: ['Mixing up the positive directions on the +ve and −ve faces', 'Accounting for a negative sign twice when drawing arrows'],
      objectives: [
        'State the positive direction of Sy on +ve and −ve faces',
        'Interpret a negative shear force from equilibrium on the opposite face',
        'Draw shear flow arrows consistently with the direction of s'
      ],
      types: ['mcq'], added: '2026-11-11'
    },
    card: { heading: 'Faces, Signs and Arrows', tagline: 'Which face are you looking at?', intro: 'Upwards here, downwards there: sort out positive faces, negative faces and shear flow arrows.', activity: 'MCQs on free body diagrams', minutes: 9 },
    source: {
      title: 'Tutorial 3 Q.1', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'q1', type: 'p', html: 'Good afternoon [academic],' },
        { id: 'q2', type: 'p', html: 'I hope you are doing well. I have some questions on tutorial 1:' },
        { id: 'q3', type: 'p', html: 'Firstly, regarding the use of shear or applied force for calculations. In the question, a distributed load is applied to a beam. The first step in the tutorial is to calculate the shear force. When carrying out the calculations, the shear force is used for the real case and for the virtual case, except when calculating q0:' },
        fig('qf1', 'd22-student-fbd', 'Solution extract: free body diagrams for the real case (30 N/mm distributed load, Sy = minus 30(2000 minus z) N, Mx = 30(2000 minus z) squared over 2 N mm) and the virtual case (unit load, Sy bar = minus 1, Mx bar = (2000 minus z)). Below, q0 by torsional equivalence about the cut for the real case with Sy shown upwards (q0 times 2 times 100 times 300 = minus Sy times 50) and q0 bar for the virtual case with 1 shown downwards (q0 bar times 60000 = 1 times 150, q0 bar = plus 150 over 60000).', 'Solution extract posted by the student.'),
        { id: 'q4', type: 'p', html: 'Why is the shear force upwards on the left hand side? It was defined downwards when calculated. On the right hand side, the force is in the direction defined when it was calculated, but the value is 1 instead of -1, why is this?' },
        { id: 'q5', type: 'p', html: 'Additionally, regarding the shear flow diagram, why are the directions as such?:' },
        fig('qf2', 'd22-shear-flow-diagram', 'Solution extract: q = q0 + qb, qb = Sy over Ix times Dx, cut at centre of 1-4. Dx for 6 to 1 = minus 250 s; Dx 1 to 2 = minus 37500 minus 250 s1 + 5/2 s1 squared. Shear flow diagrams for the real qb (with arrows marked "actual direction") and the virtual qb bar, with expressions (minus 37500 minus 250 s1 + 5/2 s1 squared) Sy over Ix and minus (minus 37500 minus 250 s1 + 5/2 s1 squared) over Ix.', 'Solution extract posted by the student.'),
        { id: 'q6', type: 'p', html: 'On the left hand side, the arrows have been switched, accounting for the change of sign. At the same time, it says "actual direction" regarding the arrows. Would not this be taking into account the negative sign twice? I.e. should the arrows be kept in the s direction if the value of the shear flow is kept the same and switched if the negative sign is "deleted" from the value of the shear flow? Can I confirm that, when drawing the shear flow, there are two options: Firstly, keep the arrows in the s direction defined and include the -ve sign (if it has one) in the value. Secondly, if there is a -ve sign, switch the direction of the arrows and therefore not include the -ve sign in the value. Is this correct?' },
        { id: 'q7', type: 'p', html: 'Sorry for the long question! Thank you very much,' }
      ]},
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: `In the free body diagrams (of length 2000-<i>z</i>), for both the real and virtual load cases, I show the positive direction of ${N.Sy} as downwards on the cut face at position <i>z</i>. (This a -ve face and the positive direction on this face is downwards according to our sign convention.) The positive direction on the +ve cut face at position <i>z</i> is upwards.` },
        { id: 'a2', type: 'p', html: `In the second set of diagrams for the calculation of the real and virtual ${N.q0} terms, I am showing the view on the +ve face at position <i>z</i> (rather than the face at position <i>z</i> in the free body diagram of the right hand part of the beam). (In class we always calculated the <i>q</i> distribution on the +ve face. We could calculate the <i>q</i> distribution for the -ve face but this would be just equal and opposite to that on the +ve face.)` },
        { id: 'a3', type: 'p', html: `The above explains why ${N.Sy} is shown as upwards in the second set of diagrams for the real loading case (this is the positive direction on the positive face).` },
        { id: 'a4', type: 'p', html: 'For the virtual loading case, vertical equilibrium of the free body diagram of the right part of the beam gives:' },
        { id: 'a4m', type: 'math', html: `${SyB} = −1`, label: 'S y bar equals minus 1' },
        { id: 'a5', type: 'p', html: `i.e. the shear force is actually acting upwards on the -ve face at position <i>z</i>. The shear force on the +ve face at position <i>z</i> is therefore equal in magnitude but opposite in direction i.e. the shear force =1 acting downwards (as shown in the diagram for the calculation of the virtual ${N.q0} term).` },
        { id: 'a6', type: 'p', html: 'Considering the second part of your question, positive shear flow acts in the direction of positive <i>s</i>. Having shown the directions of <i>s</i> for the various walls of the section, there is no need to indicate the positive direction of <i>q</i> and so I have chosen to indicate the actual direction of the shear flow (and have marked it as such). As you say, if <i>q</i> is -ve, then you could show the arrows in the opposite direction to <i>s</i> and multiply the <i>q</i> equation by -1 (&amp; indicate clearly what you have done), BUT I don’t recommend this because positive <i>q</i> will no longer act in the direction of positive <i>s</i>, and so you would need to be very careful with directions when performing any integrals like' },
        { id: 'a6m', type: 'math', html: '∫ <i>q</i> <i>ds</i>', label: 'the integral of q d s' }
      ]},
      threads: [
        { discussion: '43', pages: '46', title: 'Tutorial 3 sign convention',
          question: { author: STU, blocks: [
            { id: 't43q1', type: 'p', html: 'Hi sir, I hope you’re well' },
            { id: 't43q2', type: 'p', html: 'In tutorial 3, the diagram for the beam is drawn with the clamped side on the rhs, but in your solutions, you draw it with the clamped side on the left. When I did the question, I drew the beam with the clamp on the right and got the same bending moment as you but only because I defined z as starting from the clamped condition. In general, can we assume this to be the case if the question doesn’t specify?' },
            { id: 't43q3', type: 'p', html: 'Thanks' }
          ]},
          answer: { author: ACAD, blocks: [{ id: 't43a1', type: 'p', html: 'You can choose where you start <i>z</i> - just make it clear what you have done and also make sure you correctly apply the sign convention for shear forces and bending moments.' }] }
        }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The questions students asked',
        html: '<p>In Tutorial 3 Q1 the shear force seems to change direction between diagrams, and the virtual shear force changes sign. A student wanted to know why, and also how the shear flow arrows were drawn.</p>',
        showQuestion: ['q4', 'q6'] },
      { id: 'f1', stage: 'predict', type: 'mcq', topic: 'Positive Sy on each face',
        figure: 'qf1',
        prompt: `In the free body diagram of the right-hand part of the beam, the cut face at <i>z</i> is a −ve face. Which way is positive ${N.Sy} on it?`,
        options: [
          { id: 'a', html: 'Downwards. (On the +ve face at <i>z</i>, positive is upwards.)', correct: true, refs: ['a1'] },
          { id: 'b', html: 'Upwards, the same as on every face.', correct: false, refs: ['a1'] }
        ] },
      { id: 'f2', stage: 'predict', type: 'mcq', topic: 'Why Sy is drawn upwards for q0',
        prompt: `Why is ${N.Sy} drawn upwards in the diagrams used to find ${N.q0}?`,
        options: [
          { id: 'a', html: 'Those diagrams show the +ve face at <i>z</i>, where the positive direction is upwards.', correct: true, refs: ['a2', 'a3'] },
          { id: 'b', html: 'Because the shear force reverses between the two sets of diagrams.', correct: false, refs: ['a2', 'a3'] }
        ] },
      { id: 'f3', stage: 'predict', type: 'mcq', topic: 'The virtual shear force on the +ve face',
        prompt: `Equilibrium of the right-hand part gives ${SyB} = −1 on the −ve face. What is the virtual shear force on the +ve face?`,
        options: [
          { id: 'a', html: '1, acting downwards.', correct: true, refs: ['a4', 'a4m', 'a5'] },
          { id: 'b', html: '1, acting upwards.', correct: false, refs: ['a5'] },
          { id: 'c', html: 'Zero.', correct: false, refs: ['a5'] }
        ] },
      { id: 'f4', stage: 'feedback', type: 'mcq', title: 'Drawing the arrows', topic: 'Arrows and negative shear flow',
        figure: 'qf2',
        prompt: '<i>q</i> in a wall comes out negative. Should you flip the arrows and drop the minus sign?',
        options: [
          { id: 'a', html: 'You could, if you say clearly what you’ve done, but it isn’t recommended. Positive <i>q</i> would no longer act in the direction of positive <i>s</i>, so integrals like ∫<i>q ds</i> become error-prone.', correct: true, refs: ['a6', 'a6m'] },
          { id: 'b', html: 'Yes. Always flip the arrows so every value is positive.', correct: false, refs: ['a6'] },
          { id: 'c', html: 'No. It is never allowed.', correct: false, refs: ['a6'] }
        ] },
      { id: 'f5', stage: 'feedback', type: 'mcq', title: 'Knowledge check', topic: 'Choosing where z starts',
        prompt: 'The question doesn’t say where to start <i>z</i>. Can you start it from the clamped end?',
        options: [
          { id: 'a', html: 'Yes. Make clear what you’ve done, and apply the sign convention for shear forces and bending moments correctly.', correct: true, refs: ['t43a1'] },
          { id: 'b', html: 'No. <i>z</i> must start at the free end.', correct: false, refs: ['t43a1'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Draw it yourself',
        recall: ['f1', 'f2', 'f3', 'f4', 'f5'],
        prompt: 'Sketch a short beam segment with a +ve and a −ve face. Mark the positive direction of the shear force on each. Which one do your <i>q</i> diagrams use?',
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Grouping', item: 'Thread #43 (where to start z) is combined with #22. Confirm.' },
      { area: 'Source', item: 'In #22 the student says "tutorial 1" but the thread title and content are Tutorial 3 Q1. Kept as posted.' },
      { area: 'Assessment', item: 'Confirm f1–f5.' }
    ]
  });

  /* ---------------------------------------------------------------- #33 (+#13) */
  R.push({
    id: 'warping-and-constraint', order: 60, status: 'awaiting-review', discussion: '33', pages: '34',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't7',
      title: 'What is warping, and what happens when it is restrained?',
      summary: 'Tell planar displacement fields from warping ones using the academic’s iPad example, then see why a built-in end creates axial constraint stresses.',
      concepts: ['warping', 'torsion', 'closed-section'],
      terms: ['warping displacement', 'planar displacement', 'non planar', 'iPad', 'Lecture Topic 7 page 7', 'axial constraint stresses', 'built-in', 'cantilever', 'FE analysis'],
      questions: [
        'What is the difference between planar and warping displacements?',
        'Does warping mean the cross-section changes along z?',
        'What is an example of axial constraint stresses?',
        'How would I calculate axial constraint stresses?'
      ],
      difficulties: ['visualising', 'concept'],
      addresses: ['Confusing warping with a change of section along the beam'],
      objectives: [
        'Define a warping displacement field',
        'Classify displacement fields as planar or warping',
        'Explain why restraining warping at a built-in end produces axial stresses'
      ],
      types: ['mcq', 'sort'], added: '2026-11-11'
    },
    card: { heading: 'Warping', tagline: 'Is the surface still flat?', intro: 'Planar or warping? Use the academic’s iPad example, then see what a built-in end does.', activity: 'Sorting + MCQs', minutes: 7 },
    source: {
      title: 'warping displacements', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [{ id: 'q1', type: 'p', html: 'Hi sir, I’m a bit confused about planar and warping displacements. does warping mean that the cross section changes through the z direction and planar means it stays constant?' }] },
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: 'Hi,' },
        { id: 'a2', type: 'p', html: 'a warping displacement field is a displacement field which when applied to an originally planar surface results in a non planar surface.' },
        { id: 'a3', type: 'p', html: 'If you look at the screen surface of your ipad, all the points on the surface lie in a plane. If you move the ipad (eg. lift it up, rotate it about any axis), all the ponts on the surface remain in a plane i.e. you applying a planar (non-warping) displacement field.' },
        { id: 'a4', type: 'p', html: 'For an example of warping displacement field look at the diagram on page 7 of the lecture notes on warping displacements (Lecture topic 7). In that diagram we are showing the <i>z</i>-displacement of a thin-walled rectangular section subjected to torsion. You can see that the four corner points do not lie in a single plane - i.e. this displacement field has caused warping of the originally planar cross section.' }
      ]},
      threads: [
        { discussion: '13', pages: '10', title: 'Axial constraints and stresses',
          question: { author: STU, blocks: [
            { id: 't13q1', type: 'p', html: 'Hello [academic],' },
            { id: 't13q2', type: 'p', html: 'I was recapping on lecture 7 where you state the following:' },
            { id: 't13q3', type: 'note', html: '[Quoted from the Lecture Topic 7 notes] <strong>Axial constraint stresses</strong> We have neglected the stresses that will arise due to axial constraints which are usually present in real beams (and wings). Any restraint of the warping displacements will give rise to axial strains and therefore axial stresses. These constraint stresses will be local to the position of the axial constraint and will reduce with increasing distance from the constraint. As axial direct stress changes along the beam there will also be shear stresses introduced.' },
            { id: 't13q4', type: 'p', html: 'Would an example of this be a strengthening mechanism in the axial direction of a wing being the constraint for the "shell" to not warp? Could you please provide an example? And how would you go about calculating that stress?' },
            { id: 't13q5', type: 'p', html: 'Thank you' }
          ]},
          answer: { author: ACAD, blocks: [
            { id: 't13a1', type: 'p', html: 'In class we looked at the determining the warping of a rectangular thin walled tube due to torsion. If you imagine that this tube was a cantilever (e.g. built into a wall at one end) then the tube would not be free to warp at the the built-in support and so axial constraint stresses would result.' },
            { id: 't13a2', type: 'p', html: 'As for calculating these, I am sure there are various approximate methods available but FE analysis can be readily used to investigate the effect of the constraint of warping.' }
          ]}
        }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The questions students asked',
        html: '<p>Warping is easy to say and hard to picture. Two students asked what it is and what happens when it is prevented.</p>',
        showQuestion: ['q1', 't13q4'] },
      { id: 'v1', stage: 'predict', type: 'mcq', topic: 'Definition of warping',
        prompt: 'Which statement matches the academic’s definition of a warping displacement field?',
        options: [
          { id: 'a', html: 'Applied to an originally planar surface, it results in a non-planar surface.', correct: true, refs: ['a2'] },
          { id: 'b', html: 'The cross-section changes size along the <i>z</i> direction.', correct: false, refs: ['a2'] },
          { id: 'c', html: 'Any displacement in the <i>z</i> direction.', correct: false, refs: ['a2', 'a3'] }
        ] },
      { id: 'v2', stage: 'interact', type: 'sort', title: 'Planar or warping?', topic: 'Classifying displacement fields',
        prompt: 'Classify each displacement field.',
        categories: [{ id: 'planar', label: 'Planar (non-warping)' }, { id: 'warp', label: 'Warping' }],
        items: [
          { html: 'Lifting an iPad straight up: every point on the screen stays in a plane.', cat: 'planar' },
          { html: 'Rotating the iPad about any axis.', cat: 'planar' },
          { html: 'The <i>z</i>-displacement of a thin-walled rectangular section in torsion, where the four corners no longer lie in a single plane.', cat: 'warp' },
          { html: 'A displacement after which points of an originally plane cross-section no longer lie in one plane.', cat: 'warp' }
        ],
        refs: ['a2', 'a3', 'a4'] },
      { id: 'v3', stage: 'feedback', type: 'mcq', title: 'Restrain the warping', topic: 'Built-in end and constraint stresses',
        prompt: 'The rectangular thin-walled tube from class is built into a wall at one end and twisted. What happens at the support?',
        options: [
          { id: 'a', html: 'The tube isn’t free to warp there, so axial constraint stresses arise.', correct: true, refs: ['t13a1'] },
          { id: 'b', html: 'Nothing changes. Warping doesn’t depend on the supports.', correct: false, refs: ['t13a1', 't13q3'] }
        ] },
      { id: 'v4', stage: 'feedback', type: 'mcq', title: 'Knowledge check', topic: 'Where constraint stresses act and how to find them',
        prompt: 'Which statement matches the lecture notes and the academic’s reply?',
        options: [
          { id: 'a', html: 'They are local to the constraint and reduce with distance from it. FE analysis can readily be used to investigate them.', correct: true, refs: ['t13q3', 't13a2'] },
          { id: 'b', html: 'They are uniform along the beam and can be found with the free-warping formula.', correct: false, refs: ['t13q3', 't13a2'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Picture it',
        recall: ['v1', 'v2', 'v3', 'v4'],
        prompt: 'Describe, in your own words, what you would see at the end of a twisted rectangular tube that is free to warp, and what changes if that end is built into a wall.',
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Grouping', item: 'Thread #13 (axial constraint stresses) is combined with #33. Confirm.' },
      { area: 'Source', item: 'v4 quotes the Lecture Topic 7 notes as the student posted them in #13. Confirm the extract is accurate and can be used as feedback.' },
      { area: 'Assessment', item: 'Confirm v1–v4. Distractors were written for the activity.' }
    ]
  });

  /* ---------------------------------------------------------------- #47 (+#34, #52) */
  R.push({
    id: 'tapered-beam-boom-forces', order: 70, status: 'awaiting-review', discussion: '47', pages: '61',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't8',
      title: 'Boom forces in tapered beams: Pz, Py and the torque equation',
      summary: 'Find each boom’s axial force, decide the direction of its vertical component, and see why the full shear force goes into the torque equation.',
      concepts: ['tapered', 'idealisation', 'direct-stress', 'torsional-equivalence', 'sign-convention', 'basic-shear-flow'],
      terms: ['Pz', 'Py', 'Pz tan alpha', 'sigma_z = Mx y / Ix', 'boom area', 'Lecture Topic 8', 'two boom tapered beam', 'Tutorial 3 Q2', '2023 Q1c', 'web shear force', 'Syw'],
      questions: [
        'How do I calculate Pz for six booms of different area?',
        'Why are the Py forces positive for the top two booms?',
        'Why are the bottom booms’ Py forces not in the torque equation?',
        'Why use Sy instead of the web shear force when evaluating the torque for q0?',
        'Isn’t using Sy double counting the shear in the booms?'
      ],
      difficulties: ['signs', 'calculations', 'misconceptions'],
      addresses: ['Getting the sign of a boom’s vertical component', 'Thinking the full shear force double-counts the boom components'],
      objectives: [
        'Calculate boom axial forces from the bending stress and boom area',
        'Determine the direction of a boom force’s vertical component on each face',
        'Write vertical and torsional equivalence for a tapered beam'
      ],
      types: ['mcq'], added: '2026-11-11'
    },
    card: { heading: 'Tapered Beam Boom Forces', tagline: 'Booms carry some of the shear', intro: 'Find each boom force, the direction of its vertical component, and how the torque equation is set up.', activity: 'MCQs on worked solutions', minutes: 9 },
    source: {
      title: 'Tutorial 3 q2', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'q1', type: 'p', html: 'Hi prof' },
        { id: 'q2', type: 'p', html: 'Could you explain how you got this equation for calculating Pz. In lecture 8 with the simple 2 boom case, Pz was just Mx/h, but I’m not sure how you derived this eqn with 6 booms of varying area' },
        fig('qf1', 'd47-pz-equation', 'Solution extract: Calculate Pz for each boom: Pz1 = Mx over Ix times y1 times A1 = minus 4 × 10^5 × 5 × 2 over 200, circled in red; a sketch of a rectangular section with six booms numbered 1 to 6.', 'Solution extract posted by the student, with the equation circled.'),
        { id: 'q3', type: 'p', html: 'Thanks' }
      ]},
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: 'All I have done here is to calculate the direct stress due to bending:' },
        { id: 'a1m', type: 'math', html: `${N.sz} = <span class="frac"><span>${N.Mx} <i>y</i></span><span>${N.Ix}</span></span>`, label: 'sigma z equals M x y over I x' },
        { id: 'a2', type: 'p', html: 'and then multiplied this by the area of the boom.' },
        { id: 'a3', type: 'note', html: '(corrected slip in subscript of I in original answer)' }
      ]},
      threads: [
        { discussion: '34', pages: '35–37', title: 'Sign of P forces at the section',
          question: { author: STU, blocks: [
            { id: 't34q1', type: 'p', html: 'Hi Prof,' },
            { id: 't34q2', type: 'p', html: 'In this 2023 Structures 3 question 1c, I am confused about how the Py forces are positive for the top two booms. If it is Pz*tan(alpha), wouldn’t they be negative for the top two booms, and positive for the bottom two?' },
            { id: 't34q3', type: 'p', html: 'When I tried this question, these changes of signs later on affected the shear flow calculation (for balancing of torques).' },
            { id: 't34q4', type: 'p', html: 'Also, I don’t get why the bottom two booms’ Py forces are not taken for the equilibrium due to torques (only 0.167P for boom 1 was taken, but not the Py at boom 2 as well?)' },
            { id: 't34q5', type: 'p', html: 'Could you please clarify these?' },
            fig('t34f1', 'd34-boom-forces', 'Solution extract: z components of boom forces on a square section: minus 3.333P at the top left, minus 6.667P at the top right, 3.333P at the bottom left and 6.667P at the bottom right. y direction: 3.333 tan alpha = 0.167P upward at the top left, 0.333P upward at the top right, and 0 at the bottom booms.', 'Solution extract posted by the student: z and y components of the boom forces.'),
            fig('t34f2', 'd34-solution-torque', 'Solution extract: Equating torque of applied shear force to torque of qb and the vertical boom components: a section with booms 1 to 4, P upward, 0.167P and 0.333P at the top booms, 0.083 P/b and 0.167 P/b shear flows in the walls, and q0 in the cell.', 'Solution extract posted by the student: the torque equation.')
          ]},
          answer: { author: ACAD, blocks: [
            { id: 't34a1', type: 'p', html: 'Please take a look at the simple two boom tapered beam example that we considered in the lecture notes (Lecture Topic 8). The upper boom is in compression (as are the upper two booms in the exam question). You can see on page 9 how the compression force in the upper boom has an upward component on the + <i>z</i> face at the cut (i.e. on the left free body diagram) and downward on the -ve face (i.e. on the right free body diagram). This will also be the case in the exam question.' },
            { id: 't34a2', type: 'p', html: 'There are no vertical components of the boom forces for the lower booms of the exam question because these booms are horizontal (i.e. alpha = 0).' }
          ]}
        },
        { discussion: '52', pages: '72–74', title: 'Tutorial 3 Q2 (torque for q0)',
          question: { author: STU, blocks: [
            { id: 't52q1', type: 'p', html: 'Hi Sir,' },
            { id: 't52q2', type: 'p', html: 'For Tutorial 3 Q2, I have a question regarding evaluating the torque to find q0 in a vertically tapered beam. In the answer below we have previously determined that the y shear force in the web is 4000 N. After calculating qb using this, we evaluate the torque to find q0. In the answers it looks like the overall shear force Sy (8000 N) is used instead of the web shear force, even though we are incuding the boom vertical forces in the torque calculation. My question is why we go back to using Sy instead of Syw for evaluating torque, wouldn’t this be double counting the shear in the booms?' },
            fig('t52f1', 'd52-solution-extract', 'Solution extract: check: horizontal resultant = 0, vertical resultant = 10 × 400 = 4000 N. Determine q0: a sketch of the section with 8000 N applied, 1000 N and 500 N vertical boom components, 200 N/cm and 100 N/cm shear flows, and q0. Equating torque about 1: 8000 × 2 = 100 × 10 × 10 + 200 × 10 × 20 + 500 × 10 × 2 + 500 × 20 × 2 + q0 × 2 × 10 × 20; 16000 = 50000 + 30000 + 400 q0; minus 64000 = 400 q0; q0 = minus 160 N/cm.', 'Solution extract posted by the student.'),
            { id: 't52q3', type: 'p', html: 'Thanks, and Happy New Year!' }
          ]},
          answer: { author: ACAD, blocks: [
            { id: 't52a0', type: 'p', html: 'Happy New Year to you too.' },
            { id: 't52a1', type: 'p', html: 'The vertical applied shear force is carried by (i.e. equivalent to) the vertical components of the boom forces and the shear flow in the walls of the section.' },
            { id: 't52a2', type: 'p', html: 'Therefore:' },
            { id: 't52a3', type: 'p', html: '• the applied shear force must be equal to the vertical resultant of the boom vertical force components and the shear flow in the walls (as you say, we use this relationship to determine the shear force carried by the walls)' },
            { id: 't52a4', type: 'p', html: 'AND' },
            { id: 't52a5', type: 'p', html: '• the torque of the applied shear force about some point must be equal to the torque resultant, about the same point, of the boom vertical force components and the shear flow in the walls.' },
            { id: 't52a6', type: 'p', html: 'I hope the above answers your question.' }
          ]},
          followUps: [{ author: STU, blocks: [{ id: 't52f2', type: 'p', html: 'I understand now, thanks!' }] }]
        }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The questions students asked',
        html: '<p>In a tapered beam the inclined booms carry part of the shear force. Three students asked how the boom forces are found, which way their vertical components act, and how they enter the torque equation.</p>',
        showQuestion: ['q2', 't34q2', 't52q2'] },
      { id: 'p1', stage: 'predict', type: 'mcq', topic: 'Axial force in each boom',
        figure: 'qf1',
        prompt: 'With six booms of different areas, how is each boom’s axial force <i>P</i><sub>z</sub> found?',
        options: [
          { id: 'a', html: `Calculate the bending stress ${N.sz} = ${N.Mx}<i>y</i>/${N.Ix} at the boom and multiply by the boom area.`, correct: true, refs: ['a1', 'a1m', 'a2'] },
          { id: 'b', html: `Use ${N.Mx}/<i>h</i> for every boom, as in the two-boom case.`, correct: false, refs: ['a1', 'a2'] },
          { id: 'c', html: `Share ${N.Mx} equally between the booms.`, correct: false, refs: ['a1', 'a2'] }
        ] },
      { id: 'p2', stage: 'predict', type: 'mcq', topic: 'Direction of the vertical component',
        figure: 't34f1',
        prompt: 'The upper booms are in compression. On the +<i>z</i> face at the cut, which way does their vertical component act?',
        options: [
          { id: 'a', html: 'Upwards (and downwards on the −ve face), as in the Lecture Topic 8 two-boom example.', correct: true, refs: ['t34a1'] },
          { id: 'b', html: 'Downwards, because <i>P</i><sub>z</sub> tanα is negative for a compressive boom.', correct: false, refs: ['t34a1'] }
        ] },
      { id: 'p3', stage: 'feedback', type: 'mcq', title: 'Knowledge check', topic: 'Lower booms in 2023 Q1c',
        prompt: 'Why do the lower booms have no vertical force component in this question?',
        options: [
          { id: 'a', html: 'They are horizontal (α = 0).', correct: true, refs: ['t34a2'] },
          { id: 'b', html: 'They are in tension.', correct: false, refs: ['t34a2'] }
        ] },
      { id: 'p4', stage: 'feedback', type: 'mcq', title: 'The torque equation', topic: 'Using the full Sy in the torque equation',
        figure: 't52f1',
        prompt: `To find ${N.q0}, the torque equation uses the full ${N.Sy} (8000 N) as well as the boom vertical components. Is that double counting?`,
        options: [
          { id: 'a', html: 'No. The torque of the applied shear force must equal the torque resultant of the boom vertical components <em>and</em> the wall shear flow, so the full shear force belongs on one side.', correct: true, refs: ['t52a1', 't52a3', 't52a5'] },
          { id: 'b', html: 'Yes. Only the web shear force (4000 N) should be used.', correct: false, refs: ['t52a1', 't52a5'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Two equations',
        recall: ['p1', 'p2', 'p3', 'p4'],
        prompt: 'Write the two equivalence conditions (vertical force and torque) for a tapered beam in your own words.',
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Grouping', item: 'Threads #34 (2023 Q1c, sign of Py) and #52 (Tutorial 3 Q2, torque for q0) are combined with #47. Confirm.' },
      { area: 'Source', item: 'The #34 solution extract was cropped to remove the setter’s initials and course code header. Confirm.' },
      { area: 'Assessment', item: 'Confirm p1–p4.' }
    ]
  });

  /* ---------------------------------------------------------------- module information (quick answers, no activity) */
  const INFO = (o) => R.push(Object.assign({ status: 'awaiting-review', steps: [], review: [{ area: 'Library metadata', item: 'Title, summary and search phrases were written for the library. Confirm this information is still current for the next cohort.' }] }, o));

  INFO({
    id: 'whats-examinable', order: 90, discussion: '14', pages: '11',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 'info',
      title: 'What’s examinable: Lecture Topics 7 and 9',
      summary: 'Lecture Topic 9 is not examinable. Lecture Topic 7 (warping) is, even though it doesn’t appear in recent past papers.',
      concepts: ['exam', 'warping'], terms: ['topic 9', 'topic 7', 'examinable', 'non examinable', 'warping practice questions', 'past papers'],
      questions: ['Is topic 9 examinable?', 'Is lecture topic 7 examinable?', 'Where can I find practice questions on warping?', 'Are there past paper questions on warping?'],
      difficulties: [], addresses: [], objectives: [], types: ['info'], added: '2026-11-11'
    },
    card: { heading: 'What’s Examinable', tagline: 'Topics 7 and 9', intro: 'Topic 9 is not examinable. Topic 7 is.', activity: 'Quick answer', minutes: 2 },
    source: {
      title: 'Topic9', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [{ id: 'q1', type: 'p', html: 'Hi, I just wanted to check if topic 9 is examinable as I don’t recall going through it in class. Thank you!' }] },
      answer: { author: ACAD, blocks: [{ id: 'a1', type: 'p', html: 'Hi, Lecture topic 9 is not examinable. I believe I did say this in the class but I will send an announcement to make sure everyone is aware.' }] },
      threads: [
        { discussion: '94', pages: '112', title: 'Warping Problems And Lecture 7',
          question: { author: STU, blocks: [{ id: 't94q1', type: 'p', html: 'Hi Professor, looking back through the past papers, lectures and tutorials there seem to be no warping problems present. Hence I was wondering is lecture topic 7 non examinable just like you said lecture topic 9 was?' }] },
          answer: { author: ACAD, blocks: [{ id: 't94a1', type: 'p', html: 'Lecture topic 7 is examinable. A good understanding of what we covered in the lectures will be sufficient to answer any exam question I may set.' }] },
          followUps: [
            { author: STU, blocks: [{ id: 't94f1', type: 'p', html: 'I understand thanks professor, but do you know to find any practice questions?' }] },
            { author: ACAD, blocks: [{ id: 't94f2', type: 'p', html: 'I can only suggest that you take a look at some of the aircraft structures textbooks.' }] },
            { author: STU, blocks: [{ id: 't94f3', type: 'p', html: 'Ok thank you Professor' }] }
          ]
        },
        { discussion: '56', pages: '78–79', title: '2015 Q3 a) iii (warping in past papers)',
          question: { author: STU, blocks: [{ id: 't56q1', type: 'p', html: 'Also, could you give examples of some past paper questions where warping came up since they weren’t asked in the tutorials?' }] },
          answer: { author: ACAD, blocks: [{ id: 't56a1', type: 'p', html: '[student], on your query about warping examples in past papers, I have just had a quick look back through the recent past papers and cannot see a warping question. You may find some example problems in text books on this topic.' }] }
        }
      ]
    }
  });

  INFO({
    id: 'derivations-in-exam', order: 91, discussion: '17', pages: '117',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 'info',
      title: 'Do you need to know the derivations for the exam?',
      summary: 'You won’t be asked to reproduce a whole derivation, but a question may check your understanding of a particular part of, or step in, one.',
      concepts: ['exam'], terms: ['derivations', 'datasheet', 'derive', 'qb definition', 'warping displacement', 'deflections'],
      questions: ['Will we be required to perform derivations in the exam?', 'If an equation is in the datasheet, do we still need to derive it?'],
      difficulties: [], addresses: [], objectives: [], types: ['info'], added: '2026-11-11'
    },
    card: { heading: 'Derivations in the Exam', tagline: 'Understand the steps', intro: 'Not whole derivations, but expect questions on understanding parts of them.', activity: 'Quick answer', minutes: 2 },
    source: {
      title: 'Derivations', board: 'General',
      question: { author: STU, blocks: [{ id: 'q1', type: 'p', html: 'Hi sir will we be required to know/perform derivations during the exam?' }] },
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: 'Hi,' },
        { id: 'a2', type: 'p', html: 'The exam will test your knowledge and understanding of what you have been taught in the lectures. You will have seen that past exam questions have focussed on assessing your ability to apply your knowledge and understanding to solve previously unseen problems. While I have not asked you to reproduce a derivation that we developed in class, you should bear in mind that I may choose to ask a question that focusses on checking your understanding of a particular part of, or step in, a derivation.' }
      ]},
      threads: [
        { discussion: '36', pages: '38', title: 'Derivation of equations',
          question: { author: STU, blocks: [{ id: 't36q1', type: 'p', html: 'Hi, If we are given an equation in the datasheet, for example the definition of qb, or warping displacement or deflections due to bending/shear, are we still expected to be able to derive them in the exam? Thank you' }] },
          answer: { author: ACAD, blocks: [{ id: 't36a1', type: 'p', html: 'Please see my answer in the "Derivations" thread in the General category.' }] }
        }
      ]
    }
  });

  INFO({
    id: 'presenting-shear-flow-answers', order: 92, discussion: '76', pages: '88–91',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 'info',
      title: 'How to present shear flow distributions in the exam',
      summary: 'If not specified, a shear flow distribution can be left as a multiple of Fy/Ix, but later calculations usually need the simplest form.',
      concepts: ['exam', 'shear-flow', 'basic-shear-flow'], terms: ['Fy/Ix', 'Sx/Iy', 'multiple of', 'mark scheme', 'simplest form', '2022 Q1b', '2014 Q3', '2021 Q2b'],
      questions: ['Should I leave q as a multiple of Sy/Ix or expand it numerically?', 'What is expected for the form of qb and q0 in the exam?', 'Is it fine to leave qb in terms of Sx/Iy until the shear centre calculation?'],
      difficulties: [], addresses: [], objectives: [], types: ['info'], added: '2026-11-11'
    },
    card: { heading: 'Presenting Shear Flow Answers', tagline: 'Fy/Ix or numbers?', intro: 'When you can leave q as a multiple of Fy/Ix, and when to simplify.', activity: 'Quick answer', minutes: 3 },
    source: {
      title: 'q distributions', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [{ id: 'q1', type: 'p', html: 'Hi, In past papers, q/qb/q0 distribution (in questions as well as mark schemes) have sometimes been left as just -something- * Sy/Ix, and sometimes have been fully expanded out by numerically incorporating Ix (regardless of whether Ix is known or not). What is expected for us in this exam? Thank you' }] },
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: 'Thank you.' },
        { id: 'a2', type: 'p', html: `If it is not specified then the shear flow distribution can be left as a multiple of ${N.Fy}/${N.Ix} but bear in mind subsequent calculations (e.g. force resultant, shear stress or shear centre location) will normally require these to be expressed in the simplest form (rather than leaving it in terms of <i>Ix</i>).` },
        { id: 'a3', type: 'p', html: `In the case of 2022 q1bii, you are given the force resultants of ${N.qb} for each wall in terms of ${N.Fy} only and so ${N.q0} will also be determined in terms of ${N.Fy} only. When you sum ${N.q0} and ${N.qb} to determine the total <i>q</i>, it would seem appropriate to express this in terms of ${N.Fy} only too. (I do not recall anyone expressed ${N.q0} in terms of ${N.Fy}/${N.Ix} and then added it to the ${N.qb} expressions previously determined in terms of ${N.Fy}/${N.Ix}.)` }
      ]},
      followUps: [
        { author: STU, blocks: [{ id: 'f1', type: 'p', html: 'Hi, For 2014 question 3, where we need to work out qb, q0 and shear centre, I only multiplied out the Iy term right at the end when calculating shear centre, leaving the qb and q distributions as something * Sx/Iy. Would this be fine to do in tomorrow’s exam? Thanks' }] },
        { author: ACAD, blocks: [{ id: 'f2', type: 'p', html: 'Yes, unless directed otherwise in the exam question.' }] },
        { author: ACAD, blocks: [{ id: 'f3', type: 'p', html: 'Can you please point me to some papers where this ambiguity occurs?' }] },
        { author: STU, blocks: [
          { id: 'f4', type: 'p', html: 'Hi, In 2022 q1bi where shear flow is left as Fy/Ix vs 2022 q1bii where Ix is multiplied through, or 2021 Aircraft Structures q2bi and ii where Iy is calculated but shear flows left as *Sx/Iy and perhaps on some other occasions. Could you clarify what is required? Or what to look for in the question to figure out how to leave our shear flow distributions? Many thanks' },
          { id: 'f4n', type: 'note', html: '[The student’s screenshots of these past paper solutions are not reproduced here.]' }
        ]}
      ]
    }
  });
})();
