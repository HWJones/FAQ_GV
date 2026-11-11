/*
 * Topic 4 (structural idealisation) and Topic 5 (multi-cell sections).
 * Threads #45, #92, #35 (+#62, #88), #44.
 * Source text is verbatim and anonymised. Steps are activity content that needs academic approval.
 */
(function () {
  const N = window.FAQ_N;
  const R = window.FAQ_REGISTRY = window.FAQ_REGISTRY || [];
  const ACAD = 'Academic (module staff)', STU = 'Student (anonymised)';
  const fig = (id, src, alt, caption) => ({ id, type: 'figure', src: src.startsWith('data:') ? src : 'assets/figures/' + src + '.webp', alt, caption });
  const META_REVIEW = { area: 'Library metadata', item: 'Title, summary, objectives, sticking points, tags and alternative search phrases were written for the library. Confirm.' };
  const dx = (a, b, val) => ({ type: 'math', html: `<i>D</i><sub>x ${a}→${b}</sub> = ${val}`, label: `D x from ${a} to ${b} equals ${val}` });

  /* ---------------------------------------------------------------- #45 */
  R.push({
    id: 'material-passed-dx', order: 40, status: 'awaiting-review', discussion: '45', pages: '54–60',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't4',
      title: 'Calculating Dx: which material have you passed?',
      summary: 'Follow the academic’s step-by-step Dx calculation for a six-boom section, then pick out which booms you have ‘passed’ at a point. That is the idea that makes the result independent of the order.',
      concepts: ['idealisation', 'basic-shear-flow', 'closed-section', 'shear-flow'],
      terms: ['Dx', 'qb distribution', 'cut', 'passed', 'boom', 'six booms', 'position A', 'hold the section ahead'],
      questions: [
        'Are there rules for where to make cuts and which Dx to take continuously?',
        'Why do I get a different answer when I keep adding Dx all along the path?',
        'Which booms must be included when calculating Dx between 3 and 4?',
        'Where should I stop and start when summing Dx?'
      ],
      difficulties: ['calculations', 'visualising', 'misconceptions'],
      addresses: ['Summing Dx along one continuous path through a branched section'],
      objectives: [
        'State that cuts can be placed anywhere, and that qb changes with the cut but the total shear flow does not',
        'Identify the material passed at a point on a branched idealised section',
        'Calculate Dx at a point from the booms passed'
      ],
      types: ['mcq'], added: '2026-11-11'
    },
    card: { heading: 'Dx and Material Passed', tagline: 'Hold the section ahead', intro: 'Why summing Dx along one path goes wrong, and the ‘material passed’ idea that fixes it.', activity: 'MCQs on a structural diagram', minutes: 10 },
    source: {
      title: 'Calculating qb distribution', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'q1', type: 'p', html: 'Good evening Prof,' },
        { id: 'q2', type: 'p', html: 'Sorry if this has been asked multiple times already. But are there any rules in general for making cuts/ to determine up to which point in the structure we take Dx continuously?' },
        { id: 'q3', type: 'p', html: 'For instance, in this question here - if I make a cut below boom 1, I would get Dx1-2 = 0, whereas Dx2-3 = +7500, and so on. And if I keep on continuing along that path when I would be essentially taking the sum all along the path (sum incorporating the signs in the Dx terms) like from 1-2, 2-3, 3-6, 3-4, 4-5, 5-6, 6-1. Something is not correct here since it will not give the same answer. Can you please tell me where I am going wrong?' },
        { id: 'q4', type: 'p', html: 'Whereas if I make 2 cuts on either side of boom 6, and do 6-1,1-2,2-3; then 6-2; then 6-5,5-4,4-3, i get the same answer as in the solution that you have given.' },
        { id: 'q5', type: 'p', html: 'But i don’t fully understand why they are different and how to avoid that difference.' },
        fig('qf1', 'd45-posted-solution', 'Handwritten solution: an idealised two-cell section. Booms 1 and 2 (100 mm squared) on the left web of height 150, booms 6 and 3 (400 mm squared) on the central web of height 220, booms 5 and 4 (300 mm squared) on the right web of height 58. Widths 120 and 360. Sy acts upward. Ix = 2(100 × 75 squared + 400 × 110 squared + 300 × 29 squared) = 11 309 600 mm to the fourth. Dx = minus the integral of y t ds, but only booms contribute: Dx 1 to 2 = minus 100 × 75 = minus 7500; Dx 2 to 3 = 0; Dx 1-prime to 6 = 0; Dx 5-prime to 6 = 0; Dx 5 to 4 = minus 300 × 29 = minus 8700; Dx 4 to 3 = 0; Dx 6 to 3 = minus 400 × 110 = minus 44 000 mm cubed.', 'The solution posted by the student.'),
        { id: 'q6', type: 'p', html: 'I don’t get your solution here either, how you have chosen each segment separately (in a continuous manner, but where to stop and start for Dx rather than adding the effect of all of them continuously) since in this particular qn - the cut’s location was already given.' }
      ]},
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: 'First, I should make it clear that you can place your ‘cuts’ anywhere to make the closed section open.' },
        { id: 'a2', type: 'p', html: `${N.Dx} (and therefore ${N.qb}) will change with the ‘cut’ location but the total shear flow will not.` },
        { id: 'a3', type: 'p', html: `To help you understand my calculation of ${N.Dx}, I will take you through this step by step.` },
        { id: 'a4', type: 'p', html: `I started at the cut to the right of Boom 1 and proceeded towards Boom 2. Immediately I pass Boom 1 and, since the wall has no direct stress carrying capacity (and so does not contribute to ${N.Dx}), ${N.Dx} is constant and given by` },
        Object.assign({ id: 'a4m' }, dx('1', '2', '−100 × 75 = −7500 mm<sup>3</sup>')),
        { id: 'a5', type: 'p', html: `As we pass the Boom 2, ${N.Dx} drops to zero and this value remains constant to immediately before Boom 3:` },
        Object.assign({ id: 'a5m' }, dx('2', '3', '0')),
        { id: 'a6', type: 'p', html: `At this point I have returned to the cut to the right of Boom 1 and calculated ${N.Dx} from the cut towards Boom 6:` },
        Object.assign({ id: 'a6m' }, dx('1′', '6', '0')),
        { id: 'a7', type: 'p', html: 'Similarly, from the cut to the left of Boom 5 towards Boom 6:' },
        Object.assign({ id: 'a7m' }, dx('5′', '6', '0')),
        { id: 'a8', type: 'p', html: 'I could have next continued from Boom 6 towards Boom 3, but instead I went from the cut to the left of Boom 5 towards Boom 4 and then from there towards Boom 3 giving:' },
        Object.assign({ id: 'a8m' }, dx('5', '4', '−300 × 29 = −8700 mm<sup>3</sup>')),
        Object.assign({ id: 'a8n' }, dx('4', '3', '0')),
        { id: 'a9', type: 'p', html: `Finally, noting that we have zero ${N.Dx} for the parts 1′-6 &amp; 5′-6, I continued from Boom 6 towards Boom 3 giving:` },
        Object.assign({ id: 'a9m' }, dx('6', '3', '−400 × 110 = −44000 mm<sup>3</sup>')),
        { id: 'a10', type: 'p', html: `The sequence in which I calculated ${N.Dx} is not unique. For example after calculating ${N.Dx} for 2-3, I could have passed Boom 3 and continued towards Boom 4 BUT it is important to note that the ${N.Dx} calculation has to be done for <u>all</u> the material ‘passed’. Just to be clear what this means, having calculated Dx for 2-3, we have ‘passed’ the part highlighted in pink below:` },
        fig('af1', 'd45-passed-after-2-3', 'The section with booms 1 and 2 and the walls from the cut to boom 3 highlighted in pink: the material passed after calculating Dx for 2-3.', 'Academic’s diagram: material passed after 2–3 (pink).'),
        { id: 'a11', type: 'p', html: 'If we now continue along 3-4 we will have passed the part highlighted in pink below:' },
        fig('af2', 'd45-passed-on-3-4', 'The section with booms 1, 2, 3 and 6, the left and central webs and the upper wall to boom 5 highlighted in pink: the material passed when continuing along 3-4.', 'Academic’s diagram: material passed on 3–4 (pink).'),
        { id: 'a12', type: 'p', html: `To understand this, think about holding the section ahead of the position <i>s</i> (i.e. in this case ahead of your position on 3-4) and imagine cutting the section at the position <i>s</i>. The part highlighted in pink would fall away - this is the part that you have ‘passed’ and this is the part for which you need to calculate ${N.Dx}. In other words the calculation of ${N.Dx} at this position between 3 and 4 would need to consider Booms 1, 2, 3 &amp; 6. You could try this alternative sequence for calculating ${N.Dx} and check that it gives the same ${N.Dx} distribution.` }
      ]},
      followUps: [
        { author: STU, blocks: [
          { id: 'f1', type: 'p', html: 'Thank you very much Sir for your detailed explanation, I now understand what you have done in the solution given.' },
          { id: 'f2', type: 'p', html: 'I could follow everything until the last part, where you have the final figure showing which Dx(s) must be considered if going 3-4.' },
          { id: 'f3', type: 'p', html: 'I am attaching my working below. The working in orange has given me the correct values, but those in purple are wrong.' },
          { id: 'f4', type: 'p', html: 'Is it because the Dx (and hence qb) at 6-5 has to be 0 due to the free surface/ cut made there, so we align the directions in which we consider each segment in the structure for Dx calculations accordingly?' },
          fig('ff1', 'd45-student-working', 'The student’s working on squared paper: the section sketched with arrows in orange and purple, and two columns of Dx values. Purple: Dx 1-2 = minus 100 × 75 (tick); Dx 2-3 = minus 100 × 75 + 100 × 75 = 0 (tick); Dx 3-4 = minus 400 × 110 (cross); Dx 3-6 = minus 400 × 110 (tick); Dx 1-6 = 0 (tick); Dx 6-5 = minus 400 × 110, should be 0? (cross); Dx 5-4 = minus 300 × 29 (tick). Orange: Dx 1-2 = minus 100 × 75; Dx 2-3 = 0; Dx 1-6 = 0; Dx 5-6 = 0; Dx 6-3 = minus 400 × 110; Dx 3-4 = 0; Dx 5-4 = minus 300 × 29, all ticked.', 'The student’s working: orange values correct, purple values not.'),
          { id: 'f5', type: 'p', html: 'Once again, thank you!' }
        ]},
        { author: ACAD, blocks: [
          { id: 'b1', type: 'p', html: 'Hi,' },
          { id: 'b2', type: 'p', html: 'When calculating <i>Dx</i> as you move past Boom 3 towards Boom 4, you need to consider all the material that you have passed. (We encountered this concept for non-idealised sections in the example on pages 7-9 of Lecture Topic 3.) I said above that you need to "think about holding the section ahead of the position s (i.e. in this case ahead of your position on 3-4) and imagine cutting the section at the position s." So, in the diagram below, if we are progressing along 3-4 (in the direction indicated by the arrow) and have reached position <i>A</i>, imagine holding the remaining part of the section ahead of <i>A</i> (for example at the position marked in green) and now cutting the section at <i>A</i>. The part highlighted in pink would fall away and so this is the material that you have passed up to position <i>A</i>.' },
          fig('bf1', 'd45-position-A', 'The section with an arrow along wall 3-4 reaching position A, a green dot further along the wall towards boom 4, and booms 1, 2, 3 and 6 with their walls highlighted in pink.', 'Academic’s diagram: position A on 3–4, the green holding point, and the material passed (pink).'),
          { id: 'b3', type: 'p', html: `With this is mind, the calculation of ${N.Dx} at <i>A</i> between 3 and 4 would need to consider Booms 1, 2, 3 &amp; 6 (all the booms in the part that you have passed) i.e.` },
          { id: 'b4', type: 'p', html: `${N.Dx} at <i>A</i> between 3 and 4 (moving towards 4) = - (100*75+100*(-75)+400*110+400*(-110))=0` },
          { id: 'b5', type: 'p', html: 'The other way to think about this is to consider what lies ahead of you if you continue along 3-4 from <i>A</i> in the direction of 4. You can see that you only have Booms 4 &amp; 5 ahead of you (i.e. the booms in the walls connected to and ahead of your current position) so you have passed all the other booms (i.e. Booms 1, 2, 3 &amp; 6).' },
          { id: 'b6', type: 'p', html: 'If, instead of moving past Boom 3 towards Boom 4, we moved past Boom 3 towards Boom 6 then the part we would have passed would contain Booms 1, 2, 3, 4 &amp; 5 i.e.' },
          { id: 'b7', type: 'p', html: `${N.Dx} at a point between 3 and 6 (moving towards 6) = - (100*75+100*(-75)+400*(-110)+300*29+300*(-29))=400*110` },
          { id: 'b8', type: 'p', html: 'I hope the above helps.' }
        ]},
        { author: STU, blocks: [{ id: 'f6', type: 'p', html: 'That’s clear now. Thank you very much, Sir!' }] }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The question a student asked',
        html: `<p>In a branched idealised section, ${N.Dx} has to be built up wall by wall. A student summed it along one continuous path and got the wrong answer. This activity uses the six-boom section from their question.</p>`,
        showQuestion: ['q2', 'q3', 'qf1'] },
      { id: 'x1', stage: 'predict', type: 'mcq', topic: 'Where you can cut, and what changes',
        prompt: 'Can you place the cuts anywhere to make the closed section open?',
        options: [
          { id: 'a', html: `Yes. ${N.Dx} and ${N.qb} change with the cut location, but the total shear flow does not.`, correct: true, refs: ['a1', 'a2'] },
          { id: 'b', html: 'No. The cuts must go where the question shows them, or the total shear flow changes.', correct: false, refs: ['a1', 'a2'] }
        ] },
      { id: 'x2', stage: 'predict', type: 'mcq', topic: 'Why Dx is constant between booms',
        prompt: `Just after the cut to the right of Boom 1, heading for Boom 2, why is ${N.Dx} constant?`,
        options: [
          { id: 'a', html: `The wall has no direct stress carrying capacity, so it doesn’t contribute to ${N.Dx}.`, correct: true, refs: ['a4', 'a4m'] },
          { id: 'b', html: '<i>y</i> is constant along that wall.', correct: false, refs: ['a4'] }
        ] },
      { id: 'x3', stage: 'interact', type: 'mcq', multi: true, title: 'What have you passed?', topic: 'Booms passed on 3–4',
        figure: 'qf1',
        prompt: `You have moved past Boom 3 and are at position A on wall 3–4, heading towards Boom 4. Which booms are in the material you have passed, and so count towards ${N.Dx}?`,
        options: [
          { id: 'b1', html: 'Boom 1', correct: true }, { id: 'b2', html: 'Boom 2', correct: true }, { id: 'b3', html: 'Boom 3', correct: true },
          { id: 'b4', html: 'Boom 4', correct: false }, { id: 'b5', html: 'Boom 5', correct: false }, { id: 'b6', html: 'Boom 6', correct: true }
        ],
        refs: ['b2', 'bf1', 'b3', 'b4', 'b5'] },
      { id: 'x4', stage: 'interact', type: 'mcq', multi: true, title: 'Change direction', topic: 'Booms passed on 3–6',
        prompt: 'Now you move past Boom 3 towards Boom 6 instead. Which booms have you passed?',
        options: [
          { id: 'b1', html: 'Boom 1', correct: true }, { id: 'b2', html: 'Boom 2', correct: true }, { id: 'b3', html: 'Boom 3', correct: true },
          { id: 'b4', html: 'Boom 4', correct: true }, { id: 'b5', html: 'Boom 5', correct: true }, { id: 'b6', html: 'Boom 6', correct: false }
        ],
        refs: ['b6', 'b7'] },
      { id: 'x5', stage: 'feedback', type: 'mcq', title: 'A quicker check', topic: 'Looking ahead instead of behind',
        prompt: 'At A, moving towards Boom 4, what is the quick way to see which booms you’ve passed?',
        options: [
          { id: 'a', html: 'Look at what lies ahead: only Booms 4 and 5, so you’ve passed all the others.', correct: true, refs: ['b5'] },
          { id: 'b', html: 'Count the booms you have walked past along your own path only.', correct: false, refs: ['b2', 'b5'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Find the mistake',
        recall: ['x1', 'x2', 'x3', 'x4', 'x5'],
        figure: 'ff1',
        prompt: 'The student’s purple value for 3–4 was −400 × 110. Using “material passed”, explain why the academic’s value at A is 0.',
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Transcription', item: 'The Dx values in the academic’s step-by-step reply were retyped from handwritten images (PDF pages 56–57). Check.' },
      { area: 'Assessment', item: 'x3 and x4 are select-all questions taken directly from the academic’s lists of booms. Confirm. Confirm x1, x2 and x5.' }
    ]
  });

  /* ---------------------------------------------------------------- #92 */
  R.push({
    id: 'idealisation-bending-shear-torsion', order: 41, status: 'awaiting-review', discussion: '92', pages: '109–111',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't4',
      title: 'Idealising for bending, then adding shear and torsion',
      summary: 'Can you use the stress ratio σ2/σ1 = y2/y1 to size booms when the shear force might not act through the shear centre? Order the academic’s approach and check the reasoning.',
      concepts: ['idealisation', 'direct-stress', 'bending', 'torsion', 'shear-centre', 'principal-axes'],
      terms: ['boom areas', 'stress ratio', 'sigma2/sigma1 = y2/y1', '2016 Q1c', 'Lecture Topic 4', 'Lecture Topic 1', 'bending only'],
      questions: [
        'Can I use the ratio of y-coordinates to find boom areas when the shear force is not at the shear centre?',
        'The lecture notes say the stress ratio only applies to bending. Why was it used here?',
        'How do I idealise a section that has torsion as well?'
      ],
      difficulties: ['assumptions', 'concept'],
      addresses: ['Thinking the idealisation must change when there is torsion'],
      objectives: [
        'Explain what boom-shear panel idealisation simplifies',
        'Order the steps from idealisation to bending stresses, shear flow and torsion',
        'Recognise that torsion is analysed separately'
      ],
      types: ['mcq', 'order'], added: '2026-11-11'
    },
    card: { heading: 'Idealisation with Shear and Torsion', tagline: 'What the boom areas are for', intro: 'Boom areas come from bending. So what happens when the shear force adds torsion?', activity: 'MCQs + ordering a method', minutes: 6 },
    source: {
      title: '2016 Q1ci Structural Idealization', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'q1', type: 'p', html: 'Dear Professor,' },
        { id: 'q2', type: 'p', html: 'Hello, while trying out the 2016 Structural Mechanics and Dynamics exam problem 1(c),' },
        fig('qf1', 'd92-exam-question', 'Exam question 1(c): Consider the thin-walled section in Figure 1c. Assume the coordinates of the centroid are at x bar = 3a/8, y bar = a. i. Assuming the section is subjected to a vertical shear load Sy, idealise the thin-walled structure into booms and shear panels [8%]. ii. Evaluate Ixx for the idealised thin-walled section [5%]. iii. Evaluate the shear flow [7%]. Figure 1c: a section with a vertical web of height 2a and thickness 2t, a top flange of width a and thickness 2t, and a bottom flange of width 2a and thickness t; corners labelled 1 to 4; Sy upward.', 'The exam question, as posted by the student.'),
        fig('qf2', 'd92-student-working', 'Solution extract: boom areas B1 = 2at/6 (2 + 1) = at; B2 = at + 2a 2t/6 (2 minus 1) = 5/3 at; B3 = 2/3 at + at = 5/3 at; B4 = at. Ixx = sum of Bi yi squared = 16/3 a squared t. q = minus Sy over Ixx times sum of Bi yi minus Sx over Iyy times sum of Bi xi.', 'Solution extract posted by the student.'),
        { id: 'q3', type: 'p', html: 'it seemed like' },
        { id: 'q3m', type: 'math', html: '<span class="frac"><span><i>σ</i><sub>2</sub></span><span><i>σ</i><sub>1</sub></span></span> = <span class="frac"><span><i>y</i><sub>2</sub></span><span><i>y</i><sub>1</sub></span></span>', label: 'sigma 2 over sigma 1 equals y 2 over y 1' },
        { id: 'q4', type: 'p', html: 'us used while solving the question. The lecture note says it is appliable only when the structure is subjected to bending only.' },
        { id: 'q5', type: 'p', html: 'However, in the problem, there is no mention about the position of vertical shear (which I understand as torsion might exist).' },
        { id: 'q6', type: 'p', html: 'Is it okay to use the relationship between stress and y-position ratio for any structural idealization problem dealing with shear force at any position?' },
        { id: 'q7', type: 'p', html: 'Thank you,' }
      ]},
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: 'The boom-shear panel idealisation technique is about simplifying the direct stress carrying components in a section. So if the section is subjected to a bending moment acting about the principal <i>x</i>-axis, then we use the ratio of the <i>y</i>-coordinates when determining the boom areas (as described in Lecture Topic 4).' },
        { id: 'a2', type: 'p', html: 'The idealised section geometry can then be used to determine the bending stresses at the boom positions due to the bending moment and the shear flow in the walls due to the associated shear force. If there is additionally torsion (for example where the shear force does not act through the shear centre), then the stresses due to the torque can be analysed separately using the techniques developed in Lecture Topic 1.' }
      ]}
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The question a student asked',
        html: '<p>Boom areas are often found using the ratio of direct stresses, which comes from bending. A student wondered whether that is still valid when the shear force might not act through the shear centre.</p>',
        showQuestion: ['q3', 'q3m', 'q4', 'q5', 'q6'] },
      { id: 'b1', stage: 'predict', type: 'mcq', topic: 'What idealisation simplifies',
        prompt: 'What does boom-shear panel idealisation simplify?',
        options: [
          { id: 'a', html: 'The direct stress carrying components in the section.', correct: true, refs: ['a1'] },
          { id: 'b', html: 'The shear stress distribution in the walls.', correct: false, refs: ['a1'] },
          { id: 'c', html: 'The torsional stiffness of the section.', correct: false, refs: ['a1', 'a2'] }
        ] },
      { id: 'b2', stage: 'predict', type: 'mcq', topic: 'Using the y-ratio when there may be torsion',
        prompt: 'The shear force may not act through the shear centre. Can you still use the ratio of <i>y</i>-coordinates to find the boom areas?',
        options: [
          { id: 'a', html: 'Yes. The boom areas come from bending about the principal <i>x</i>-axis. Any torsion is analysed separately.', correct: true, refs: ['a1', 'a2'] },
          { id: 'b', html: 'No. The section must be idealised differently when there is torsion.', correct: false, refs: ['a2'] }
        ] },
      { id: 'b3', stage: 'interact', type: 'order', title: 'Order the approach', topic: 'From idealisation to stresses',
        prompt: 'Put the academic’s approach in order.',
        items: [
          { id: 's1', html: 'Find the boom areas using the ratio of <i>y</i>-coordinates (bending about the principal <i>x</i>-axis, Lecture Topic 4).' },
          { id: 's2', html: 'Use the idealised geometry to find the bending stresses at the booms due to the bending moment.' },
          { id: 's3', html: 'Use the same idealised geometry to find the shear flow in the walls due to the associated shear force.' },
          { id: 's4', html: 'If there is also torsion, analyse the stresses due to the torque separately (Lecture Topic 1 techniques).' }
        ],
        refs: ['a1', 'a2'] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Apply it',
        recall: ['b1', 'b2', 'b3'],
        figure: 'qf2',
        prompt: 'In this solution, which lines come from bending and which from shear? Where would torsion appear, if the question asked for it?',
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Source', item: '2016 Q1(c) is a Structural Mechanics and Dynamics paper. Confirm the question and solution extracts can be reused.' },
      { area: 'Assessment', item: 'b3 splits the academic’s two paragraphs into four steps. Confirm. Confirm b1 and b2.' }
    ]
  });

  /* ---------------------------------------------------------------- #35 (+#62, #88) */
  R.push({
    id: 'multicell-torsion', order: 50, status: 'awaiting-review', discussion: '35', pages: '39',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't5',
      title: 'Torsion of multi-cell tubes: shear flows and maximum shear stress',
      summary: 'Why there is no qb in torsion, which walls to ignore when using J for a multi-cell tube, and how to find the maximum shear stress from q/t.',
      concepts: ['multicell', 'torsion', 'basic-shear-flow', 'shear-stress', 'torsion-constant', 'closed-section'],
      terms: ['multi tube', 'q0i', 'radial walls', 'zero shear flow', 'q/t', 'maximum shear stress', 'thickest wall', '2020 Q2a(ii)', '2016 Q2a(iii)', 'Lecture 5'],
      questions: [
        'Why do we not consider q0 and qb separately for a multi tube in torsion?',
        'Can I find the torque carried by each tube from GJ theta dash and then the maximum shear stress?',
        'Does the maximum shear stress occur in the thickest wall?',
        'Do I use the total q or just q1 or q2 for the maximum shear stress?'
      ],
      difficulties: ['concept', 'misconceptions', 'calculations'],
      addresses: ['Expecting qb in a torsion problem', 'Assuming the maximum shear stress is in the thickest wall'],
      objectives: [
        'Explain why there is no qb when a tube carries only torsion',
        'Identify walls with zero shear flow that can be ignored',
        'Find the maximum shear stress by comparing q/t across the walls'
      ],
      types: ['mcq', 'sort'], added: '2026-11-11'
    },
    card: { heading: 'Multi-Cell Torsion', tagline: 'Shear flows and q/t', intro: 'No qb in torsion, ignore the walls with zero shear flow, and the maximum shear stress is not always where you expect.', activity: 'MCQs + sorting', minutes: 9 },
    source: {
      title: 'torsion in multi tube', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [{ id: 'q1', type: 'p', html: 'Hi sir, why do we not consider q0 and qb separately for the multi tube in torsion case in Lecture 5?' }] },
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: `We use ${N.qb} and ${N.q0} when considering a closed single cell tube subjected to an applied shear force. (See Lecture Topic 3, pages 18-23.)` },
        { id: 'a2', type: 'p', html: `We use ${N.qb} and <i>q</i><sub>0<i>i</i></sub> (<i>i</i>=1,<i>N</i>) when considering a closed multi cell tube subjected to an applied shear force (where <i>N</i> is the number of cells). (See Lecture Topic 5, pages 14-20.)` },
        { id: 'a3', type: 'p', html: `For both the single cell and multi cell cases, ${N.qb} is the basic shear flow due to an applied shear force in the tube which has been ‘cut’ to make it open. ${N.qb} is calculated using the open tube shear flow formula. (See Lecture Topic 3, pages 5-6.).` },
        { id: 'a4', type: 'p', html: `For a tube (single or multi cell) subjected to torsion there is no applied shear force and so there is no ${N.qb}.` },
        { id: 'a5', type: 'p', html: 'The analysis for single cell tube subjected to torsion is developed in Lecture Topic 2 pages 1-6 and the analysis for a multi cell tube subjected to torsion is developed in Lecture Topic 5 pages 4-11.' }
      ]},
      threads: [
        { discussion: '62', pages: '83', title: '2020 Aircraft Structures q2aii',
          question: { author: STU, blocks: [
            { id: 't62q1', type: 'p', html: 'Hi,' },
            { id: 't62q2', type: 'p', html: 'For this question:' },
            fig('t62f1', 'd62-question', 'Exam question extract: To stiffen and strengthen the section, additional 1 mm thick plates of the same material are welded in place to form the modified section shown in Figure 2b. ii. Calculate the maximum shear stress in the modified section [20%]. The figure shows a square tube rotated 45 degrees with an inner tube and radial additional plates, t = 1; dimensions to the wall midline; G = 30 GPa.', 'Exam question extract, as posted by the student.'),
            { id: 't62q3', type: 'p', html: 'Can we follow the same procedure as in part i, where we work out the new θ′ by working out the J of the inner tube, outer tube and plates and using θ′ = T/GJ.' },
            { id: 't62q4', type: 'p', html: 'Then work out the torque carried by the outer tube as G*J_outer*θ′ and then using max shear stress = T_outer/2At, then doing the same for the inner tube? The answer I get is remarkably accurate to the answer obtained by following the ‘correct’ procedure of calculating shear flows.' },
            { id: 't62q5', type: 'p', html: 'Thanks!' }
          ]},
          answer: { author: ACAD, blocks: [{ id: 't62a1', type: 'p', html: 'Almost. For multicell tubes subjected to a torque, you ignore any walls which have zero shear flow (i.e. we ignore the ‘radial’ walls in this question). Doing this and using your approach will give the same result as my solution.' }] }
        },
        { discussion: '88', pages: '105–106', title: '2016 Q2a(iii)',
          question: { author: STU, blocks: [
            { id: 't88q1', type: 'p', html: 'Hi Sir,' },
            { id: 't88q2', type: 'p', html: 'I was under the assumption maximum shear stress occurs in the wall with the maximum thickness.' },
            { id: 't88q3', type: 'p', html: '1) For this question would we not do MaxShearStress = q/t_max which is on the outer wall where thickness is 5mm not 3mm?' },
            { id: 't88q4', type: 'p', html: '2) Additionally, do we use total q in this calculation or just the q1 or q2 that the wall is experiencing.' },
            { id: 't88q5', type: 'p', html: '3) And in the case of the latter, since on diagonal wall experiences q1 =7.5N/mm and the other one experiences q2 = 6.0N/mm do we use: MaxShearStress = q1/5?' },
            fig('t88f1', 'd88-solution-extract', 'Solution extract: q1 = T over 3600 (2 × 0.794 + 1) = 70 × 10 cubed over 3600 (2 × 0.794 + 1) = 7.5 N/mm, and q2 = 7.5 × 77/97 = 6.0 N/mm, corrected in red. Max stress occurs in thin external walls of section: tau max = 6.0/3 = 2.0 N/mm squared, with corrections in red.', 'Solution extract posted by the student.'),
            { id: 't88q6', type: 'p', html: 'Thank You!' }
          ]},
          answer: { author: ACAD, blocks: [
            { id: 't88a1', type: 'p', html: 'For the maximum shear stress we need the maximum value of <i>q</i>/<i>t</i>.' },
            { id: 't88a2', type: 'p', html: 'If we look at the shear stresses in the exterior walls due to <i>q</i><sub>1</sub> then we have 6/3 N/mm<sup>2</sup> in the thin wall and 6/5 N/mm<sup>2</sup> in the thick wall. Clearly 6/3 is &gt; 6/5.' },
            { id: 't88a3', type: 'p', html: 'We should also check the other walls in the section to determine the maximum shear stress in the section.' }
          ]},
          followUps: [{ author: STU, blocks: [{ id: 't88f2', type: 'p', html: 'Thank you very much!' }] }]
        }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The questions students asked',
        html: '<p>Three students asked about multi-cell tubes under torque: what happened to the basic shear flow, whether a shortcut through <i>J</i> works, and where the maximum shear stress is.</p>',
        showQuestion: ['q1', 't62q3', 't88q2'] },
      { id: 'k1', stage: 'predict', type: 'mcq', topic: 'No qb in pure torsion',
        prompt: `Why is there no ${N.qb} when a single or multi-cell tube carries only a torque?`,
        options: [
          { id: 'a', html: `${N.qb} is the basic shear flow due to an applied shear force. Under pure torsion there is no applied shear force.`, correct: true, refs: ['a3', 'a4'] },
          { id: 'b', html: `${N.qb} cancels between neighbouring cells.`, correct: false, refs: ['a4'] },
          { id: 'c', html: `${N.qb} is included in the constant cell shear flows.`, correct: false, refs: ['a3', 'a4'] }
        ] },
      { id: 'k2', stage: 'interact', type: 'sort', title: 'Sort by loading', topic: 'What you use for each loading',
        prompt: 'For each statement, which loading case does it describe?',
        categories: [{ id: 'sf', label: 'Applied shear force' }, { id: 'tq', label: 'Pure torsion' }],
        items: [
          { html: `Single cell: use ${N.qb} and ${N.q0}.`, cat: 'sf' },
          { html: `Multi-cell: use ${N.qb} and <i>q</i><sub>0<i>i</i></sub> (<i>i</i> = 1 to <i>N</i>).`, cat: 'sf' },
          { html: `${N.qb} from the open tube shear flow formula, after ‘cutting’ the tube.`, cat: 'sf' },
          { html: `There is no ${N.qb} at all.`, cat: 'tq' }
        ],
        refs: ['a1', 'a2', 'a3', 'a4'] },
      { id: 'k3', stage: 'feedback', type: 'mcq', title: 'Check a shortcut', topic: 'Walls with zero shear flow',
        figure: 't62f1',
        prompt: 'A student found θ′ from the <i>J</i> values of the inner tube, outer tube and plates, then the torque in each tube. What must they change to get the same result as the solution?',
        options: [
          { id: 'a', html: 'Ignore any walls with zero shear flow, here the ‘radial’ plates.', correct: true, refs: ['t62a1'] },
          { id: 'b', html: 'Nothing. Including every wall is correct.', correct: false, refs: ['t62a1'] },
          { id: 'c', html: 'The approach can’t work for a multi-cell tube.', correct: false, refs: ['t62a1'] }
        ] },
      { id: 'k4', stage: 'feedback', type: 'mcq', title: 'Find the maximum', topic: 'Maximum shear stress from q/t',
        figure: 't88f1',
        prompt: 'Where is the maximum shear stress?',
        options: [
          { id: 'a', html: 'Where <i>q</i>/<i>t</i> is largest. In the exterior walls, 6/3 in the thin wall beats 6/5 in the thick wall, and the other walls must be checked too.', correct: true, refs: ['t88a1', 't88a2', 't88a3'] },
          { id: 'b', html: 'In the thickest wall.', correct: false, refs: ['t88a1', 't88a2'] },
          { id: 'c', html: 'In the wall with the largest <i>q</i>, whatever its thickness.', correct: false, refs: ['t88a1', 't88a2', 't88a3'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Make a checklist',
        recall: ['k1', 'k2', 'k3', 'k4'],
        prompt: 'Write a three-step checklist for finding the maximum shear stress in a multi-cell tube under torque.',
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Grouping', item: 'Threads #62 (2020 Q2a(ii), J shortcut) and #88 (2016 Q2a(iii), maximum shear stress) are combined with #35. Confirm.' },
      { area: 'Transcription', item: 'In #88 the academic writes "due to q1" with values 6/3 and 6/5, while the student quotes q2 = 6.0 N/mm. The text is kept verbatim. Check, and note that k4 quotes these numbers.' },
      { area: 'Assessment', item: 'Confirm k1–k4.' }
    ]
  });

  /* ---------------------------------------------------------------- #44 */
  R.push({
    id: 'multicell-symmetry', order: 51, status: 'awaiting-review', discussion: '44', pages: '47–53',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't5',
      title: 'Using symmetry to assign shear flows in multi-cell sections',
      summary: 'Why two cells share q1, how rotational symmetry and superposition remove the radial walls, and why a modified section only has symmetry about one axis.',
      concepts: ['multicell', 'symmetry', 'torsion', 'superposition', 'basic-shear-flow'],
      terms: ['rotational symmetry', '60 degrees', 'radial wall', 'qI', 'qII', 'superposition', 'modified section', 'q1 = q5', 'q2 = q4', 'Tutorial 2 Q1', '2019'],
      questions: [
        'Which cells have the same shear flow, and why?',
        'Is the shear flow the same because the cells have equal area?',
        'Why are the qI all the same for the identical outer cells?',
        'Why is rotational symmetry not applied to the modified section?',
        'Is the shear flow being the same only valid for total q and not q0?'
      ],
      difficulties: ['visualising', 'misconceptions', 'concept'],
      addresses: ['Assigning equal shear flows because cell areas are equal', 'Applying rotational symmetry to a section that has lost it'],
      objectives: [
        'Assign equal shear flows to cells from the symmetry of the section and loading',
        'Use superposition to find the shear flow in shared walls',
        'Tell which symmetry a modified section still has'
      ],
      types: ['mcq'], added: '2026-11-11'
    },
    card: { heading: 'Symmetry in Multi-Cell Sections', tagline: 'Symmetry, not equal areas', intro: 'Which cells share a shear flow, and why it is symmetry rather than equal area that decides.', activity: 'MCQs on diagrams', minutes: 10 },
    source: {
      title: 'Closed cells in torsion', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'q1', type: 'p', html: 'Hi Prof,' },
        { id: 'q2', type: 'p', html: 'I am a bit confused about this solution. In which of the 3 cells have you considered the shear flow to be the same (since the 2Aq1 term is repeating twice in the Torque eqtn, is it in the bottom 2 cells, and q2 in the top triangle cell) ?' },
        { id: 'q3', type: 'p', html: 'And why is the shear flow constant for those two cells in particular, since in this case all the 3 cells are of equal area if I am not mistaken?' },
        { id: 'q4', type: 'p', html: 'Thank you very much!' },
        fig('qf1', 'd44-figure-2b', 'Figure 2b: a square section of 120 mm diagonal formed from triangles with 60 mm dimensions, divided by additional plates of thickness 5 mm into three triangular cells. Note: dimensions are to midline of wall thickness.', 'Figure 2b from the exam question.'),
        fig('qf2', 'd44-solution-extract', 'Solution extract: the section with cells labelled q1, q1 and q2, t = 5, 60 mm dimensions; T = 2A q1 × 2 + 2A q2 = 2A(2q1 + q2); A = 60 × 60 / 2 = 1800 mm squared; T = 3600(2q1 + q2).', 'Solution extract posted by the student.')
      ]},
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: 'Perhaps the diagram in my solution is not so clear. The triangular cells at the bottom left and top are both shown with <i>q</i><sub>1</sub> and the remaining cell (bottom right) is shown with <i>q</i><sub>2</sub>. This <i>q<sub>i</sub></i> pattern results from symmetry (not because the area of the cells is the same although this is the case).' }
      ]},
      followUps: [
        { author: STU, blocks: [
          { id: 'f1', type: 'p', html: 'That makes sense now, thank you, Prof.' },
          { id: 'f2', type: 'p', html: 'One more question related to this - is this shear flow being the same only valid to the total shear flow ‘q’? But not for ‘q0’, since they would be equal and opposite of each other for symmetric cells.' },
          { id: 'f3', type: 'p', html: 'Am I thinking of it correctly? Came across these 2 scenarios in different questions, so thought of confirming. Thank you!' }
        ]},
        { author: ACAD, blocks: [{ id: 'b1', type: 'p', html: 'I am not sure I fully understand your question. Do you have a specific example from a tutorial or exam paper?' }] },
        { author: STU, blocks: [
          { id: 'f4', type: 'p', html: 'Referring back to my previous question - this is the example where the ‘q0’ is equal and opposite, even though the cells are symmetric.' },
          { id: 'f4n', type: 'note', html: '[The student’s image of the 2019 exam solution was not captured in the PDF.]' },
          { id: 'f5', type: 'p', html: 'Whereas in the previous question I had posted above, the upper triangle and the lower left triangles have the same ‘q’ due to symmetry. Thank you:)' }
        ]},
        { author: ACAD, blocks: [
          { id: 'c1', type: 'p', html: 'In the first question that you posted, the section was subjected to torsion.' },
          { id: 'c2', type: 'p', html: 'In the exam question immediately above (from 2019), the section was subjected to two separate loading cases.' },
          { id: 'c3', type: 'p', html: 'The first loading case was an applied torque (like in your first question). For this loading case, we recognise the symmetry of the section and assign the same <i>q</i> to each cell.' },
          { id: 'c4', type: 'p', html: `In the second loading case the section was subjected to a vertical shear force acting along the vertical centroidal axis which is an axis of symmetry. We can therefore expect that the total shear flow will be symmetric about this vertical axis. The location of the ‘cuts’ that I chose, meant that the ‘cut’ section was symmetric about this axis and so the ${N.qb} distribution was symmetric about the same axis. For this ‘cut’ section, (given the symmetry of ${N.qb} and of the total shear flow) the ${N.q0}s must be symmetric about the vertical centroidal axis. (In the solution I point out that the symmetry of the ${N.q0}s can be proven by equating the torque resultant of the applied shear force to the torque resultant of the total shear flow about a point on the vertical axis of symmetry.)` }
        ]},
        { author: STU, blocks: [
          { id: 'f6', type: 'p', html: 'Thank you Prof, in tutorial 2 qn. 1 - when taking the shear flows for the original section, I was wondering why the qI are all the same for the identical outer cells? And how they get combined into one single q1 at the end removing the walls in between?' },
          { id: 'f7', type: 'p', html: 'For the modified section, it makes sense how q1,q2,q3 came up (due to symmetry I presume). Thank you' }
        ]},
        { author: ACAD, blocks: [
          { id: 'd1', type: 'p', html: 'As you say the outer cells are identical - this section exhibits rotational symmetry. (The section is identical if it is rotated by 60 degrees, 120 degrees ........) Therefore we assign the same <i>q</i><sub>I</sub> to all the outer cells.' },
          { id: 'd2', type: 'p', html: 'If you consider a radial wall between two adjacent outer cells, you can see that the superposition of the shear flow of the two cells results in zero shear flow in the radial wall. So we have <i>q</i><sub>I</sub> in the outer hexagonal wall and, from superposition, <i>q</i><sub>II</sub>-<i>q</i><sub>I</sub> on the inner hexagonal wall. I then made the substitutions <i>q</i><sub>1</sub>=<i>q</i><sub>I</sub> and <i>q</i><sub>2</sub>=<i>q</i><sub>II</sub>-<i>q</i><sub>I</sub>.' },
          { id: 'd3', type: 'p', html: 'I hope the above helps clear up these issues.' }
        ]},
        { author: STU, blocks: [
          { id: 'f8', type: 'p', html: 'Okay, I understand that now.' },
          { id: 'f9', type: 'p', html: 'But now it makes me wonder why the concept of rotational symmetry is not applied to the modified section. Since all the cells in that do not have the same q? But rather I do see a pattern of symmetry in there too (if the cells highlighted in the same colour are symmetric?) Am I correct in thinking it is not a closed-loop figure as in the original section? Since it misses one cell on the right hand side in between?' },
          { id: 'f10', type: 'p', html: 'Thank you very much again!' }
        ]},
        { author: ACAD, blocks: [
          { id: 'e1', type: 'p', html: 'The full section has 60 degree rotational symmetry as shown below i.e. when the section is rotated by 60 degrees it looks identical to the original section.' },
          fig('ef1', 'd44-rotation', 'Two pairs of hexagonal sections. Top: the full section with six outer cells around an inner hexagon, rotated anticlockwise by 60 degrees, looks identical. Bottom: the modified section, with one outer cell missing, rotated anticlockwise by 60 degrees, looks different. A dashed horizontal axis of symmetry is drawn on the unrotated modified section.', 'Academic’s diagrams: the full section (top) and the modified section (bottom), each rotated by 60°.'),
          { id: 'e2', type: 'p', html: 'However, the modified section does not look the same when rotated through 60 degrees.' },
          { id: 'e3', type: 'p', html: 'As you say, this modified section has symmetry about the horizontal axis (in the left, unrotated image above) and this leads to the pattern of shear flows that you have shown in your diagram. You can see this is the case by considering the tube with the modified section drawn in 3-D below:' },
          { id: 'e3n', type: 'note', html: '[The academic’s 3-D diagrams of the tube were not captured in the PDF.]' },
          { id: 'e4', type: 'p', html: 'The tube is subjected to opposing toques <i>T</i> and the cells at the near end (end <i>A</i>) have been labelled with shear flows <i>q<sub>i</sub></i> with <i>i</i>= 1 to 5 (i.e. not exploiting symmetry). The horizontal axis of symmetry of the section at end <i>A</i> is also shown. At the far end of the tube (end <i>B</i>), there will be equal and opposite shear flows acting in each cell (only those acting in cells 1 and 5 are shown).' },
          { id: 'e5', type: 'p', html: 'Now consider rotating the tube (and the associated loading and shear flows) through 180 degrees about the symmetry axis at end <i>A</i> so that end <i>B</i> is now the nearest end:' },
          { id: 'e6', type: 'p', html: 'The tube and the torque loading look identical to the original position of the tube. Therefore the shear flow in a given cell (for example the top right cell) at the near end of both the original and the rotated tubes must be the same i.e.' },
          { id: 'e6m', type: 'math', html: '<i>q</i><sub>1</sub>=<i>q</i><sub>5</sub> &amp; <i>q</i><sub>2</sub>=<i>q</i><sub>4</sub>', label: 'q 1 equals q 5, and q 2 equals q 4' }
        ]},
        { author: STU, blocks: [{ id: 'f11', type: 'p', html: 'Understood now, thank you so much, Prof!' }] }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The question a student asked',
        html: '<p>This long thread follows one student through three multi-cell sections. Each time, the question is the same: which cells can be given the same shear flow, and why?</p>',
        showQuestion: ['q2', 'q3', 'qf1'] },
      { id: 'm1', stage: 'predict', type: 'mcq', topic: 'Why two cells share q1',
        figure: 'qf2',
        prompt: 'The bottom-left and top cells are both given <i>q</i><sub>1</sub>. Why?',
        options: [
          { id: 'a', html: 'Symmetry of the section. The cells happen to have equal areas, but that isn’t the reason.', correct: true, refs: ['a1'] },
          { id: 'b', html: 'Because the two cells have equal areas.', correct: false, refs: ['a1'], next: 'm1-branch' }
        ] },
      { id: 'm1-branch', stage: 'predict', type: 'mcq', branchOnly: true, assess: false, next: 'm2', topic: 'Equal area is not enough',
        title: 'Test the idea',
        html: '<p>In this section all three cells have equal area, yet only two share <i>q</i><sub>1</sub>.</p>',
        prompt: 'What does that tell you?',
        options: [
          { id: 'a', html: 'Equal area alone doesn’t make shear flows equal. The pattern comes from symmetry.', correct: true, refs: ['a1'] },
          { id: 'b', html: 'The solution must have an error.', correct: false, refs: ['a1'] }
        ] },
      { id: 'm2', stage: 'interact', type: 'mcq', title: 'Tutorial 2 Q1: the full section', topic: 'Rotational symmetry and the radial walls',
        figure: 'ef1',
        prompt: 'In the full hexagonal section, all six outer cells are given <i>q</i><sub>I</sub>. What is the shear flow in a radial wall between two outer cells?',
        options: [
          { id: 'a', html: 'Zero. The two cells’ shear flows superpose and cancel in the radial wall.', correct: true, refs: ['d1', 'd2'] },
          { id: 'b', html: '2<i>q</i><sub>I</sub>, the sum of the two cells.', correct: false, refs: ['d2'] },
          { id: 'c', html: '<i>q</i><sub>II</sub> − <i>q</i><sub>I</sub>, as in the inner wall.', correct: false, refs: ['d2'] }
        ] },
      { id: 'm3', stage: 'interact', type: 'mcq', title: 'The modified section', topic: 'Which symmetry the modified section keeps',
        prompt: 'With one outer cell removed, why can’t every cell have the same <i>q</i>?',
        options: [
          { id: 'a', html: 'It no longer looks the same when rotated by 60°. It is only symmetric about the horizontal axis, which gives <i>q</i><sub>1</sub> = <i>q</i><sub>5</sub> and <i>q</i><sub>2</sub> = <i>q</i><sub>4</sub>.', correct: true, refs: ['e1', 'ef1', 'e2', 'e3', 'e6', 'e6m'] },
          { id: 'b', html: 'Because removing a cell makes the section open.', correct: false, refs: ['e2', 'e3'] }
        ] },
      { id: 'm4', stage: 'feedback', type: 'mcq', title: 'A shear force case', topic: 'Symmetry with a vertical shear force',
        prompt: 'In the 2019 question’s second loading case, a vertical shear force acts along the vertical axis of symmetry and the cuts are chosen symmetrically. What can you say about the shear flows?',
        options: [
          { id: 'a', html: `The total shear flow, ${N.qb} and the ${N.q0}s are all symmetric about the vertical centroidal axis.`, correct: true, refs: ['c4'] },
          { id: 'b', html: `Only ${N.qb} is symmetric. The ${N.q0}s are equal and opposite.`, correct: false, refs: ['c4'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Your own rule',
        recall: ['m1', 'm2', 'm3', 'm4'],
        prompt: 'Write a rule for deciding which cells can share a shear flow. Include what to check about the section and about the loading.',
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Source', item: 'Two images in this thread (the student’s 2019 solution and the academic’s 3-D tube diagrams) were not captured in the PDF export. They are marked as missing. Supply them if available.' },
      { area: 'Source', item: 'Replies are shown in logical order. In the PDF they appear in a slightly different order because of threading.' },
      { area: 'Assessment', item: 'Confirm m1, m1-branch, m2, m3 and m4.' }
    ]
  });
})();
