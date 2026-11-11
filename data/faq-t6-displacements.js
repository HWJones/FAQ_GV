/*
 * Topic 6: Displacements and virtual work.
 * Threads #10 (+#66, #68), #12, #100 (+#39). Source text is verbatim and anonymised.
 * Steps are activity content written for this resource and need academic approval.
 */
(function () {
  const N = window.FAQ_N;
  const R = window.FAQ_REGISTRY = window.FAQ_REGISTRY || [];
  const ACAD = 'Academic (module staff)', STU = 'Student (anonymised)';
  const intg = (a, b) => `${N.oint} ${a}·${b} ${N.ds}`;

  /* ---------------------------------------------------------------- #10 */
  R.push({
    id: 'virtual-work-cross-terms', order: 20, status: 'awaiting-review', discussion: '10', pages: '1–2',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't6',
      title: 'Do the cross terms in the virtual work integral vanish?',
      summary: `Multiplying the real and virtual shear flows gives four terms. Find out why two of them were zero in Tutorial 3 Q1, and whether you can rely on that in other problems.`,
      concepts: ['virtual-work', 'basic-shear-flow', 'closed-section'],
      terms: ['qb integrating to zero', 'cross terms', 'Tutorial 3 Q1', 'Lecture 6', 'q bar'],
      questions: [
        'When the virtual and real q are multiplied, why are the central two terms zero?',
        'Does qb always integrate to zero around a closed section?',
        'Do I need to evaluate each case to know whether those terms can be neglected?',
        'Is the integral of q0 times virtual qb always zero?',
        'Is there a shorthand to tell which real and virtual shear flow terms are zero?'
      ],
      difficulties: ['assumptions', 'equations', 'misconceptions'],
      addresses: ['Treating a result from one problem as a general rule', 'Deciding by inspection whether an integral is zero'],
      objectives: [
        'Explain why the cross terms vanished in the Tutorial 3 Q1 calculation',
        'Recognise that the result depends on where s is started',
        'Decide when the integrals must be evaluated rather than assumed zero'
      ],
      types: ['branching', 'mcq'], added: '2026-11-11'
    },
    card: { heading: 'Virtual Work Cross Terms', tagline: 'When can you drop them?', intro: 'Why two of the four product terms were zero in Tutorial 3 Q1, and whether that is always true.', activity: 'Branching scenario + MCQs', minutes: 7 },
    source: {
      title: 'qb integrating to zero', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'q1', type: 'p', html: 'Hi sir,' },
        { id: 'q2', type: 'p', html: 'I was doing tutorial 3 Q1 and using lecture 6 as a guide. I saw that when the virtual and real q’s are multiplied it equals' },
        { id: 'q2m', type: 'math', html: `${N.qb}·${N.qbB} + ${N.qb}·${N.q0B} + ${N.q0}·${N.qbB} + ${N.q0}·${N.q0B}`, label: 'q b times q b bar, plus q b times q 0 bar, plus q 0 times q b bar, plus q 0 times q 0 bar' },
        { id: 'q3', type: 'p', html: 'What confused me is that the central 2 terms are equal to zero. I understand that in this case the q_b integrates to zero around this cross section but is that true for all cases?' },
        { id: 'q4', type: 'p', html: 'Many Thanks' }
      ]},
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: 'You raise an important point.' },
        { id: 'a2', type: 'p', html: 'You are correct that the integrals' },
        { id: 'a2m', type: 'math', html: `${intg(N.qb, N.q0B)} &amp; ${intg(N.qbB, N.q0)}`, label: 'the closed integral of q b times q 0 bar d s, and the closed integral of q b bar times q 0 d s' },
        { id: 'a3', type: 'p', html: 'are zero because' },
        { id: 'a3m', type: 'math', html: `${N.q0B} &amp; ${N.q0}`, label: 'q 0 bar and q 0' },
        { id: 'a4', type: 'p', html: 'are both constant (do not vary with <i>s</i>) and' },
        { id: 'a4m', type: 'math', html: `${N.oint} ${N.qb} ${N.ds} &amp; ${N.oint} ${N.qbB} ${N.ds}`, label: 'the closed integral of q b d s and the closed integral of q b bar d s' },
        { id: 'a5', type: 'p', html: 'are both zero.' },
        { id: 'a6', type: 'p', html: 'However, this is not a general result. We can see this by changing where we started <i>s</i>. If, for example, we had started <i>s</i> at the top left corner the above two integrals would not be zero.' },
        { id: 'a7', type: 'p', html: 'I hope the above explanation helps clarify this point.' }
      ]},
      followUps: [
        { author: STU, blocks: [
          { id: 'f1', type: 'p', html: 'Hello [academic],' },
          { id: 'f2', type: 'p', html: 'As a follow-up question, just to double-check, would we therefore need to evaluate each individual case to be able to know whether those terms can be neglected?' },
          { id: 'f3', type: 'p', html: 'Many thanks' }
        ]},
        { author: ACAD, blocks: [
          { id: 'f4', type: 'p', html: 'If it is not obvious by inspection that the integrals' },
          { id: 'f4m', type: 'math', html: `${intg(N.qb, N.q0B)} &amp; ${intg(N.qbB, N.q0)}`, label: 'the closed integral of q b times q 0 bar d s, and the closed integral of q b bar times q 0 d s' },
          { id: 'f5', type: 'p', html: 'are zero, then yes, you will need to evaluate these.' }
        ]}
      ],
      threads: [
        { discussion: '66', pages: '87', title: 'Virtual displacement integral - Shear Flow',
          question: { author: STU, blocks: [
            { id: 't66q1', type: 'p', html: 'Hi sir,' },
            { id: 't66q2', type: 'p', html: 'Hope you are well.' },
            { id: 't66q3', type: 'p', html: 'I was just wondering for cases like in tutorial sheet 3 Q1, is there a shorthand method to tell which combination of real and virtual shear flow components are zero so they do not have to be computed?' },
            { id: 't66q4', type: 'p', html: 'Kind regards,' }
          ]},
          answer: { author: ACAD, blocks: [
            { id: 't66a1', type: 'p', html: 'Hi [student], I am not sure I fully understand your question. In this tutorial problem and in the worked example that we did in class, we can see by inspection that the integrals' },
            { id: 't66a1m', type: 'math', html: `${intg(N.qb, N.q0B)} &amp; ${intg(N.qbB, N.q0)}`, label: 'the closed integral of q b times q 0 bar d s, and the closed integral of q b bar times q 0 d s' },
            { id: 't66a2', type: 'p', html: 'are zero. This is because' },
            { id: 't66a2m', type: 'math', html: `${N.q0B} &amp; ${N.q0}`, label: 'q 0 bar and q 0' },
            { id: 't66a3', type: 'p', html: 'are both constant (do not vary with <i>s</i>) and so we need to examine the integrals' },
            { id: 't66a3m', type: 'math', html: `${N.oint} ${N.qb} ${N.ds} &amp; ${N.oint} ${N.qbB} ${N.ds}`, label: 'the closed integral of q b d s and the closed integral of q b bar d s' },
            { id: 't66a4', type: 'p', html: 'both of which we can see by inspection are zero (i.e. no need to calculate).' },
            { id: 't66a5', type: 'p', html: 'There is a some more information on this issue in the thread "qb integrating to zero #10"' }
          ]},
          followUps: [{ author: STU, blocks: [{ id: 't66f1', type: 'p', html: 'Hi sir, Thank you very much, this helps a lot.' }] }]
        },
        { discussion: '68', pages: '93', title: 'Displacement of cross section',
          question: { author: STU, blocks: [
            { id: 't68q1', type: 'p', html: `Hi, Is ${N.oint} ${N.q0} ${N.qbB} ${N.ds} always equal to 0? Thanks` }
          ]},
          answer: { author: ACAD, blocks: [{ id: 't68a1', type: 'p', html: 'Please see the thread "qb integrating to zero #10".' }] }
        }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The question a student asked',
        html: `<p>To find a displacement by virtual work, you multiply the real shear flow (${N.qb} + ${N.q0}) by the virtual shear flow (${N.qbB} + ${N.q0B}) and integrate around the section. In Tutorial 3 Q1 the two middle terms came out as zero. Three students asked about this in separate threads.</p>`,
        showQuestion: ['q2', 'q2m', 'q3', 't68q1'] },
      { id: 'w1', stage: 'predict', type: 'mcq', topic: 'Why the cross terms were zero in Tutorial 3 Q1',
        prompt: `In Tutorial 3 Q1, why are ${intg(N.qb, N.q0B)} and ${intg(N.qbB, N.q0)} zero?`,
        options: [
          { id: 'a', html: `${N.q0B} and ${N.q0} are constant (do not vary with <i>s</i>), and ${N.oint} ${N.qb} ${N.ds} and ${N.oint} ${N.qbB} ${N.ds} are both zero.`, correct: true, refs: ['a2', 'a2m', 'a3', 'a3m', 'a4', 'a4m', 'a5'] },
          { id: 'b', html: `Because ${N.qb} is zero everywhere in a closed section.`, correct: false, refs: ['a3', 'a3m', 'a4', 'a4m', 'a5'] },
          { id: 'c', html: 'Because the real and virtual loads act at the same point.', correct: false, refs: ['a2', 'a3', 'a4', 'a5'] }
        ] },
      { id: 'w2', stage: 'predict', type: 'mcq', topic: 'Whether the result is general',
        prompt: 'Can you assume these two integrals are zero in every problem?',
        options: [
          { id: 'a', html: 'Yes. They are always zero for a closed section.', correct: false, refs: ['a6'], next: 'w2-branch' },
          { id: 'b', html: 'No. It depends on where you start <i>s</i>.', correct: true, refs: ['a6'] }
        ] },
      { id: 'w2-branch', stage: 'predict', type: 'mcq', branchOnly: true, assess: false, next: 'w3', topic: 'Starting s somewhere else',
        title: 'Try a different starting point',
        html: '<p>The academic tested the claim by changing one choice in the calculation.</p>',
        prompt: 'If <i>s</i> had been started at the top left corner instead, what would happen to the two integrals?',
        options: [
          { id: 'a', html: 'They would still be zero.', correct: false, refs: ['a6'] },
          { id: 'b', html: 'They would not be zero.', correct: true, refs: ['a6'] }
        ] },
      { id: 'w3', stage: 'feedback', type: 'mcq', title: 'Knowledge check', topic: 'When to evaluate the integrals',
        prompt: 'So in a new problem, how should you treat these two integrals?',
        options: [
          { id: 'a', html: 'If it is not obvious by inspection that they are zero, evaluate them.', correct: true, refs: ['f4', 'f4m', 'f5'] },
          { id: 'b', html: 'Always drop them. They only add small corrections.', correct: false, refs: ['a6', 'f4', 'f5'] },
          { id: 'c', html: 'Never judge by inspection. Always calculate every term in full.', correct: false, refs: ['t66a1', 't66a4'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Answer the student in #68',
        recall: ['w1', 'w2', 'w3'],
        prompt: `A student asked: <em>Is ${N.oint} ${N.q0} ${N.qbB} ${N.ds} always equal to 0?</em> Write a two-sentence answer using what you’ve seen here.`,
        reveal: 'full' }
    ],
    review: [
      { area: 'Library metadata', item: 'Title, summary, objectives, sticking points, tags and alternative search phrases were written for the library. Confirm.' },
      { area: 'Transcription', item: 'Integrals in #10, #66 and #68 were retyped from the images (overline = virtual quantity). Check against PDF pages 1, 2, 87 and 93.' },
      { area: 'Assessment', item: 'Confirm options and correct answers for w1, w2, w2-branch and w3.' },
      { area: 'Grouping', item: 'Threads #66 and #68 (both pointed to #10 by the academic) are shown as related threads in this activity. Confirm.' }
    ]
  });

  /* ---------------------------------------------------------------- #12 */
  R.push({
    id: 'unit-load-and-torque', order: 21, status: 'awaiting-review', discussion: '12', pages: '6–9',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't6',
      title: 'Where does the unit virtual load act, and what about the torque?',
      summary: 'Check whether the unit virtual load must act through the shear centre, then sort statements about shear flow and shear stress in open sections that carry an offset shear force.',
      concepts: ['virtual-work', 'shear-centre', 'torsion', 'open-section', 'basic-shear-flow', 'shear-stress'],
      terms: ['unit load', 'Eq. 5', 'virtual stress', 'theta dash G 2n', 'T*', 'rate of twist', 'GJ'],
      questions: [
        'Why is there no stress due to the torque in the virtual stress equation?',
        'Do we assume the unit load is applied at the shear centre?',
        'What are the shear stresses in an open section with a shear force not through the shear centre?',
        'Is there a q0 for an open section?',
        'How do I find the rate of twist of an open section with a shear force and a torque?'
      ],
      difficulties: ['misconceptions', 'equations', 'concept'],
      addresses: ['Thinking the unit virtual load is assumed to act at the shear centre', 'Applying closed-section equations to open sections'],
      objectives: [
        'State where the unit virtual load is applied, and how the offset is accounted for',
        'Describe the two shear stress components in an open section carrying an offset shear force',
        'Identify which equations apply only to single cell closed tubes'
      ],
      types: ['mcq', 'sort'], added: '2026-11-11'
    },
    card: { heading: 'Unit Load and Torque', tagline: 'Check an assumption', intro: 'Is the unit virtual load assumed to act through the shear centre? And what stresses does an offset load cause in an open section?', activity: 'MCQs + sorting statements', minutes: 9 },
    source: {
      title: 'Unit load and torque', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'qf1', type: 'figure', src: 'assets/figures/d12-student-lecture-notes.webp',
          alt: 'Extract from the Lecture Topic 6 notes, annotated by the student. Equation 4 gives the real strains in the tube, including a shear strain term with q b plus q 0 and a torque term. Equation 5 gives the virtual stresses: sigma z bar from the virtual bending moment, and tau z s bar equal to q b bar plus q 0 bar over t. The student has written "But no Torque" beside equation 5. Equation 6 gives the displacement in the y direction.',
          caption: 'Extract from the Lecture Topic 6 notes posted by the student, with their handwritten annotations.' },
        { id: 'q1', type: 'p', html: 'Hello [academic],' },
        { id: 'q2', type: 'p', html: 'When revising the lecture notes I am confused as to why in Eq. 5 there is not stress due to the torque produced from applying a unit load. Is this because we are assuming the applied load to be at the shear centre? I believe that is a very big assumption but could you explain that please?' },
        { id: 'q3', type: 'p', html: 'I am confused because in Eq. 4 we do take that torsion into account, the real strain due to a load. I would have expected the virtual stress do to the same load (Eq. 5) to be the same as Eq. 4 just without the <i>G</i> term. Could you clarify that?' },
        { id: 'q4', type: 'p', html: 'Thank you' }
      ]},
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: 'We do not assume that the unit virtual load is applied through the shear centre - the unit load is applied at the position where we want to determine the displacement.' },
        { id: 'a2', type: 'p', html: `When we calculate the virtual (${N.qb} + ${N.q0}), this will account for the fact that the line of action of the virtual force may be offset from the shear centre. (We could, of course consider the equivalent virtual force and virtual torque system acting at the shear centre but the result would be the same.)` }
      ]},
      followUps: [
        { author: STU, blocks: [
          { id: 'f1', type: 'p', html: 'Thank you for your answer. I misunderstood and thought we had to be applying virtual torque and shear but we only had to apply the unit load to know the displacement in this case. Thank you.' },
          { id: 'f2', type: 'p', html: `Also, if we had an open section subject to shear force and torsion instead, I was wondering what the real shear stresses would be. In an open section we take ${N.qb} to be the only resultant shear flow regardless of where the force is (because the shear flow arising from the torque due to the force not being applied at the SC is 0**). However, the actual shear stress along the wall will be that something of the form of: ${N.qb}/${N.t} + ${N.th}<i>G</i>2<i>n</i> where <i>n</i> is the thickness from the middle point of the wall. Would that ${N.th} already account for the shear stress due to pure torsion and that torsion of the shear force not applied at the SC like Eq. 1? Or would there be 2 separate shear stress terms like Eq. 2? How would ${N.th} look?` },
          { id: 'f2m1', type: 'math', html: `Eq. 1: ${N.th} = <span class="frac"><span>1</span><span>2<i>GA</i></span></span> ∮ <span class="frac"><span><i>q</i></span><span><i>t</i></span></span> <i>ds</i> + <span class="frac"><span><i>T</i></span><span>4<i>GA</i><sup>2</sup></span></span> ∮ <span class="frac"><span>1</span><span><i>t</i></span></span> <i>ds</i>`, label: 'Equation 1: theta dash equals 1 over 2 G A times the closed integral of q over t d s, plus T over 4 G A squared times the closed integral of 1 over t d s' },
          { id: 'f2m2', type: 'math', html: `Eq. 2: ${N.tau} = <span class="frac"><span>${N.qb}</span><span><i>t</i></span></span> + ${N.th}<i>G</i>2<i>n</i> + <span class="frac"><span><i>T</i></span><span>2<i>At</i></span></span>`, label: 'Equation 2: tau equals q b over t, plus theta dash G 2 n, plus T over 2 A t' },
          { id: 'f3', type: 'p', html: `** is the shear flow arising from a force not as SC in an open section which is 0 called ${N.q0}?` }
        ]},
        { author: ACAD, blocks: [
          { id: 'b0', type: 'p', html: 'Hi [student],' },
          { id: 'b1', type: 'p', html: 'Apologies for my delay in getting back to you about this.' },
          { id: 'b2', type: 'p', html: `i) You are correct that if an open section is subjected to a shear force not aligned with the shear centre, then the shear flow, <i>q</i>, does not change if the shear force is moved to be further from, or nearer to, the shear centre. (You refer to this shear flow as ${N.qb} but the concept of ${N.qb}, the basic shear flow, was only introduced when we looked at the determination of the shear flow in single cell closed tubes. You also asked whether there is a ${N.q0} which is equal to zero for an open section but I don't think it is helpful to think about the open section like this. The concept of ${N.q0} was only introduced when we looked at the shear flow in a single cell tube subjected to a shear force and it is the value of the shear flow at the position we chose to start <i>s</i> - the position we can imagine that we have 'cut' the section to make it open. The ${N.q0} will change if the line of action of the shear force is moved laterally. Remember, for an open section we start <i>s</i> at a free edge where we know the shear flow is zero.)` },
          { id: 'b3', type: 'p', html: 'ii) You are also correct that, for the case of the shear force not applied through the shear centre of an open section, the shear stress will be the summation of' },
          { id: 'b3a', type: 'p', html: '• the uniform stress due to the shear flow (i.e. <i>q</i>/<i>t</i>) and' },
          { id: 'b3b', type: 'p', html: `• the linearly varying shear stress due to the torque (equal to the applied shear force x perpendicular distance to the shear centre) which is given by ${N.th}<i>G</i>2<i>n</i> (in which ${N.th} = <i>T</i>/<i>GJ</i>).` },
          { id: 'b3c', type: 'p', html: '<em>But note that you would need to take care with the directions of these two shear stress components.</em>' },
          { id: 'b4', type: 'p', html: 'iii) If in addition to the shear force which is not acting through the shear centre, the open section is subjected to a torque, say <i>T</i>*, then to determine the rate of twist then you would simply take the total of the torque due to the shear force (see ii above) and <i>T</i>*, and divide the total by <i>GJ</i>. Your equation 1 is not applicable to an open section (remember <i>A</i> is the area enclosed by the wall midline). Your equation 2 is also incorrect as the final term is again only applicable to a single cell closed tube.' }
        ]}
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The question a student asked',
        html: '<p>In Lecture Topic 6 the displacement of a closed tube is found with a unit virtual load. The real strain (Eq. 4) includes a torque term, but the virtual stress (Eq. 5) seems not to. A student wondered whether that means the unit load is assumed to act at the shear centre.</p>',
        showQuestion: ['qf1', 'q2', 'q3'] },
      { id: 'u1', stage: 'predict', type: 'mcq', topic: 'Where the unit virtual load acts',
        prompt: 'Is the unit virtual load assumed to act through the shear centre?',
        options: [
          { id: 'a', html: `No. It is applied where you want the displacement, and the virtual (${N.qb} + ${N.q0}) accounts for any offset from the shear centre.`, correct: true, refs: ['a1', 'a2'] },
          { id: 'b', html: 'Yes. That is why Eq. 5 has no torque term.', correct: false, refs: ['a1', 'a2'] },
          { id: 'c', html: 'Yes. Virtual work only works for loads through the shear centre.', correct: false, refs: ['a1', 'a2'] }
        ] },
      { id: 'u2', stage: 'predict', type: 'mcq', topic: 'Shear stress in an open section with an offset load',
        prompt: 'An open section carries a shear force that does not act through its shear centre. What is the shear stress in the wall?',
        options: [
          { id: 'a', html: `The uniform stress <i>q</i>/<i>t</i> plus a linearly varying stress ${N.th}<i>G</i>2<i>n</i> due to the torque.`, correct: true, refs: ['b3', 'b3a', 'b3b', 'b3c'] },
          { id: 'b', html: 'Only <i>q</i>/<i>t</i>. The torque produces no stress in an open section.', correct: false, refs: ['b3', 'b3a', 'b3b'] },
          { id: 'c', html: `Only ${N.th}<i>G</i>2<i>n</i>. The shear flow is replaced by the torque.`, correct: false, refs: ['b3', 'b3a', 'b3b'] }
        ] },
      { id: 'u3', stage: 'feedback', type: 'sort', title: 'Sort the statements', topic: 'Open sections versus single cell closed tubes',
        prompt: 'Which of these statements match the academic’s reply?',
        categories: [{ id: 'yes', label: 'Matches the reply' }, { id: 'no', label: 'Does not match' }],
        items: [
          { html: 'For an open section, the shear flow does not change if the shear force moves nearer to or further from the shear centre.', cat: 'yes' },
          { html: `${N.q0} is the shear flow where you start <i>s</i> in a single cell tube, i.e. where you imagine the ‘cut’.`, cat: 'yes' },
          { html: 'For an open section, you start <i>s</i> at a free edge, where the shear flow is zero.', cat: 'yes' },
          { html: 'With an extra torque <i>T</i>*, the rate of twist is (torque due to the shear force + <i>T</i>*) divided by <i>GJ</i>.', cat: 'yes' },
          { html: 'Eq. 1, with the enclosed area <i>A</i>, can be used for an open section.', cat: 'no' },
          { html: 'The term <i>T</i>/(2<i>At</i>) applies to an open section.', cat: 'no' }
        ],
        refs: ['b2', 'b4'] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Explain it back',
        recall: ['u1', 'u2', 'u3'],
        prompt: 'In your own words: why does Eq. 5 not need a separate torque term, even when the unit load is offset from the shear centre?',
        reveal: 'full' }
    ],
    review: [
      { area: 'Library metadata', item: 'Title, summary, objectives, sticking points, tags and alternative search phrases were written for the library. Confirm.' },
      { area: 'Transcription', item: 'The student’s Eq. 1 and Eq. 2 and the expression θ′G2n were retyped from PDF pages 8–9. Check.' },
      { area: 'Assessment', item: 'Confirm options for u1 and u2, and the classification of the six statements in u3.' }
    ]
  });

  /* ---------------------------------------------------------------- #100 (+#39) */
  R.push({
    id: 'displacement-methods', order: 22, status: 'awaiting-review', discussion: '100', pages: '115–116',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't6',
      title: 'Which method for cross-section displacements?',
      summary: 'Decide when moving the force to the shear centre (plus a torque) saves effort, follow the academic’s symmetry argument step by step, and check what an exam question is really asking for.',
      concepts: ['virtual-work', 'shear-centre', 'symmetry', 'basic-shear-flow', 'bending'],
      terms: ['2 methods', 'move the force to the shear centre', 'Lecture Topic 6', '2018 Q2b', 'shear strain', 'deflection'],
      questions: [
        'When is moving the force to the shear centre and applying a torque quicker?',
        'If the shear centre is known and I cut through its line of action, is q0 zero?',
        'Why was Ix not needed in 2018 Q2(b)?',
        'Why was the bending integral with Mx and Mx bar not computed?'
      ],
      difficulties: ['calculations', 'concept', 'assumptions'],
      addresses: ['Choosing between two valid methods', 'Reading what an exam question asks for'],
      objectives: [
        'Choose the method that reduces calculation effort',
        'Explain why q0 is zero for a symmetric single cell when cut on the axis of symmetry',
        'Identify when only the shear-strain contribution to deflection is required'
      ],
      types: ['mcq', 'order'], added: '2026-11-11'
    },
    card: { heading: 'Displacement Methods', tagline: 'Choose the quicker route', intro: 'Direct calculation, or move the force to the shear centre and add a torque? And what does the question actually ask for?', activity: 'MCQs + ordering a method', minutes: 8 },
    source: {
      title: '2 methods for displacements', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'q1', type: 'p', html: 'Hi,' },
        { id: 'q2', type: 'p', html: 'When doing questions for the displacement of the cross section, we came across 2 methods, one where we work out the displacement directly and one where we move the force to the shear centre and then apply a torque.' },
        { id: 'q3', type: 'p', html: 'When would the second method be quicker/better than the first?' },
        { id: 'q4', type: 'p', html: 'The shear centre would have to be known (or deduced from geometry). But how do we work out the bending due to pure shear? Would that not also need us to work out qb and q0, and perform the integration as before, and then also work out the torque displacement?' },
        { id: 'q5', type: 'p', html: 'Or is it the case that if the shear centre is known, and the cut made to work out qb is done through the ‘line of action’ of the shear centre, is q0 zero? What is the pro of the second method that the first method doesn’t have?' },
        { id: 'q6', type: 'p', html: 'Thanks' }
      ]},
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: '<u>When would the second method be quicker/better than the first? / What is the pro of the second method that the first method doesn’t have?</u>' },
        { id: 'a2', type: 'p', html: 'When it reduces the calculation effort.' },
        { id: 'a3', type: 'p', html: '<u>(If we knew the location of the shear centre)Would that not also need us to work out qb and q0?</u>' },
        { id: 'a4', type: 'p', html: `In the example we did in class in Lecture Topic 6 we were considering a single cell closed section which was symmetric about the vertical axis which was subjected to a vertical shear force. In this case we knew the shear centre was positioned on the vertical axis of symmetry. We also know that if we move the applied shear force to the vertical axis of symmetry, then the total shear flow must be symmetric about the vertical axis of symmetry which means that the total shear flow will be zero at the centre of the upper and lower walls. If we "cut" the section at this position, <i>qb</i> will be zero and therefore so will <i>qo</i> i.e. no need to calculate <i>qo</i>.` },
        { id: 'a5', type: 'p', html: 'For a general single cell tube, you will not know where to cut the tube so that you have zero <i>qo</i> and so you would have to work out <i>qb</i> and <i>qo</i>.' }
      ]},
      threads: [
        { discussion: '39', pages: '44–45', title: '2018 Q2)b)',
          question: { author: STU, blocks: [
            { id: 't39q1', type: 'p', html: 'Hi Sir,' },
            { id: 't39q2', type: 'p', html: 'Hope you are well. I was just wondering for Q2)b) of the 2018 paper, why has I_x not been determined and furthermore why has the first integral for working out the displacement (the one with Mx and Mx bar) from the principle of virtual forces not been computed to work out the final displacement?' },
            { id: 't39q3', type: 'note', html: '[Exam question quoted by the student] (b) Figure 2c shows a cantilever beam with a thin-walled rectangular cross section which has been approximated as a boom-shear panel idealisation for bending about the horizontal axis. The beam is subjected to a vertical downward tip load of P = 3000 N at boom 1 of the cross section. The resulting shear flow in the section is shown in the figure. Figure 2d provides the shear flow due to a vertical downward load of 1 N applied at boom 4 of the cross section. Neglecting the influence of warping constraint at the built-in end, determine the vertical deflection at the tip of the beam of Figure 2c at boom 4 that results from the shear strain of the section walls. [20%]' }
          ]},
          answer: { author: ACAD, blocks: [
            { id: 't39a1', type: 'p', html: `In this question I ask for the vertical deflection due to the shear strain in the walls of the section. This means that you do not need to calculate the deflection that results from the direct strain due to bending (which, as you say, would require the real and virtual ${N.Mx}).` },
            { id: 't39a2', type: 'p', html: `I have given the real and virtual shear flows, and so you do not require ${N.Ix} to complete the calculation.` }
          ]},
          followUps: [{ author: STU, blocks: [{ id: 't39f1', type: 'p', html: 'Hi sir, Thank you very much, I misread the question. Kind regards,' }] }]
        }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The question a student asked',
        html: '<p>There are two ways to find the displacement of a cross section under a shear force: work it out directly, or move the force to the shear centre and add the equivalent torque. When is the second way worth it?</p>',
        showQuestion: ['q2', 'q3', 'q5'] },
      { id: 'd1', stage: 'predict', type: 'mcq', topic: 'When the second method is better',
        prompt: 'When is moving the force to the shear centre (and applying a torque) the better method?',
        options: [
          { id: 'a', html: 'When it reduces the calculation effort.', correct: true, refs: ['a2'] },
          { id: 'b', html: 'Always. It is the more accurate method.', correct: false, refs: ['a2', 'a5'] },
          { id: 'c', html: 'Never. It always needs more calculation.', correct: false, refs: ['a2', 'a4'] }
        ] },
      { id: 'd2', stage: 'interact', type: 'order', title: 'Follow the symmetry argument', topic: 'Why q0 can be zero in the class example',
        prompt: 'Put the academic’s reasoning for the Lecture Topic 6 example in order.',
        items: [
          { id: 's1', html: 'The single cell section is symmetric about the vertical axis, so the shear centre lies on that axis.' },
          { id: 's2', html: 'Move the applied vertical shear force to the vertical axis of symmetry.' },
          { id: 's3', html: 'The total shear flow must then be symmetric about that axis, so it is zero at the centre of the upper and lower walls.' },
          { id: 's4', html: `‘Cut’ the section at that position: ${N.qb} is zero there, so ${N.q0} is zero too, with no need to calculate it.` }
        ],
        refs: ['a4'] },
      { id: 'd3', stage: 'feedback', type: 'mcq', title: 'Knowledge check', topic: 'General single cell tubes',
        prompt: 'For a general single cell tube that is not symmetric, can you use the same shortcut?',
        options: [
          { id: 'a', html: `No. You won’t know where to cut so that ${N.q0} is zero, so you have to work out ${N.qb} and ${N.q0}.`, correct: true, refs: ['a5'] },
          { id: 'b', html: `Yes. Cutting through the shear centre’s line of action always makes ${N.q0} zero.`, correct: false, refs: ['a4', 'a5'] }
        ] },
      { id: 'd4', stage: 'feedback', type: 'mcq', title: 'Read the question', topic: 'What 2018 Q2(b) asks for',
        figure: 't39q3',
        prompt: `In 2018 Q2(b), why don’t you need ${N.Ix} or the bending integral with ${N.Mx} and ${N.MxB}?`,
        options: [
          { id: 'a', html: 'Only the deflection due to shear strain in the walls is asked for, and the real and virtual shear flows are given.', correct: true, refs: ['t39a1', 't39a2'] },
          { id: 'b', html: 'Because bending deflection is always negligible for thin-walled beams.', correct: false, refs: ['t39a1'] },
          { id: 'c', html: `Because ${N.Ix} cancels when the real and virtual terms are multiplied.`, correct: false, refs: ['t39a1', 't39a2'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Plan your next attempt',
        recall: ['d1', 'd2', 'd3', 'd4'],
        prompt: 'Before you start a displacement question, what two things will you check first?',
        reveal: 'full' }
    ],
    review: [
      { area: 'Library metadata', item: 'Title, summary, objectives, sticking points, tags and alternative search phrases were written for the library. Confirm.' },
      { area: 'Assessment', item: 'The order step d2 splits the academic’s paragraph (a4) into four steps. Confirm the wording and order. Confirm d1, d3 and d4.' },
      { area: 'Grouping', item: 'Thread #39 (2018 Q2b, what the question asks for) is included here as a related thread. Confirm.' },
      { area: 'Source', item: 'The exam question text quoted by the student in #39 is reproduced. Confirm it can be shown to students.' }
    ]
  });
})();
