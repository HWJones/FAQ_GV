/*
 * Topic 3: Shear flow and the shear centre.
 * Threads #16, #26 (+#95), #27 (+#55, #58), #31 (+#57, #30), #48 (+#86), #50 (+#65, #90).
 * Source text is verbatim and anonymised. Steps are activity content that needs academic approval.
 */
(function () {
  const N = window.FAQ_N;
  const R = window.FAQ_REGISTRY = window.FAQ_REGISTRY || [];
  const ACAD = 'Academic (module staff)', STU = 'Student (anonymised)';
  const fig = (id, src, alt, caption) => ({ id, type: 'figure', src: src.startsWith('data:') ? src : 'assets/figures/' + src + '.webp', alt, caption });
  const META_REVIEW = { area: 'Library metadata', item: 'Title, summary, objectives, sticking points, tags and alternative search phrases were written for the library. Confirm.' };

  /* ---------------------------------------------------------------- #16 */
  R.push({
    id: 'tutorial-solution-checks', order: 30, status: 'awaiting-review', discussion: '16', pages: '14–16',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't3',
      title: 'Four checks on the Tutorial 1 Q4 and Tutorial 2 Q2 solutions',
      summary: 'Work through the four questions a student marked in red on the tutorial solutions: the Ix of an inclined wall, vertical equivalence, why q0 is zero, and the sign of a moment.',
      concepts: ['second-moment', 'parallel-axis', 'basic-shear-flow', 'shear-centre', 'sign-convention', 'torsional-equivalence'],
      terms: ['Tutorial 1 Q4', 'Tutorial 2 Q2', 'inclined wall', 'vertical equivalence', '3Bd^2/2', 'YE', 'q0 = 0'],
      questions: [
        'Why is no parallel axis theorem needed for the Ix of the inclined wall?',
        'How is vertical equivalence satisfied?',
        'How does the diagram of qb imply that q0 = 0?',
        'Why is the sign of YE wrong in my shear centre calculation?'
      ],
      difficulties: ['calculations', 'signs', 'equations'],
      addresses: ['Choosing the axis for a second moment of area', 'Spotting zero twist by inspection', 'Sign of a moment when anticlockwise is positive'],
      objectives: [
        'Explain when a parallel axis contribution is or isn’t needed',
        'Recognise by inspection when no q0 is needed for zero twist',
        'Assign the sign of a moment consistently with the chosen positive direction'
      ],
      types: ['mcq'], added: '2026-11-11'
    },
    card: { heading: 'Tutorial Solution Checks', tagline: 'Four questions in red', intro: 'A student marked four steps they couldn’t follow in the Tutorial 1 and 2 solutions. Test yourself on each.', activity: 'MCQs on worked solutions', minutes: 8 },
    source: {
      title: 'Tutorials', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'q1', type: 'p', html: 'I’ve looked over all three tutorials from this term and have 4 questions about them I haven’t been able to figure out. My questions are shown in the picture in red. Thank you.' },
        fig('qf1', 'd16-t1q4-ix-working', 'Handwritten working for Tutorial 1 Q4: Ix of the inclined wall found by integrating y squared t ds with y equal to s over root 2, giving t d cubed over 6; Ix of the vertical wall root 2 d cubed t over 12; Ix of the section t d cubed (1/3 + root 2 over 6) = 0.5690 t d cubed. Red note: "Why no parallel axis theorem needed? I thought the origin would be shifted by dy."', 'Question 1 (Tutorial 1 Q4), from the student’s post.'),
        fig('qf2', 'd16-t2q2-vertical-equivalence', 'Tutorial 2 Q2: a two-cell rectangular section with booms 1 to 7, widths d, height d, with Fy applied. Dx values listed for each wall and qb values in terms of Bd Fy over 2 Ix. Red note: "How is equivalence satisfied?" beside Bd Fy over 2 Ix times d times 3 equals 3/2 Bd squared over Ix times Fy, not equal to Fy.', 'Question 2 (Tutorial 2 Q2): vertical equivalence.'),
        fig('qf3', 'd16-t2q2-qb-diagram', 'Tutorial 2 Q2: q0 = minus the integral of qb ds over the integral of ds = 0, or by inspection. A sketch of the qb diagram shows minus Bd Fy over 2 Ix in one vertical wall and plus in the other. Red note: "How does this diagram of qb imply that q0 = 0?"', 'Question 3 (Tutorial 2 Q2): why q0 = 0.'),
        fig('qf4', 'd16-t2q2-moments', 'Tutorial 2 Q2: taking moments about position 4 with anticlockwise positive: Fx YE = 2A q0 + integral of p qb ds, leading to YE = minus 9/2 Bd cubed over Iy and YE = minus 9/8 d. Red note: "Why wrong sign?"', 'Question 4 (Tutorial 2 Q2): sign of YE.')
      ]},
      answer: { author: ACAD, blocks: [
        { id: 'a0', type: 'p', html: 'Thanks for these questions.' },
        { id: 'a1h', type: 'p', html: '<u>First question</u>' },
        { id: 'a1', type: 'p', html: `You will see that I have calculated the ${N.Ix} of the inclined wall about the y=0 position (i.e. about the centroidal axis of the whole section not about the centroid of the inclined wall) and so no parallel axis contribution is required. If I had chosen to calculate ${N.Ix} of the inclined wall about its centroid then the <i>y</i> term in the integral would have been` },
        { id: 'a1m', type: 'math', html: `( <span class="frac"><span><i>s</i></span><span>√2</span></span> − <span class="frac"><span><i>d</i></span><span>2√2</span></span> )`, label: 's over root 2, minus d over 2 root 2' },
        { id: 'a1b', type: 'p', html: `and then we would have had to add the parallel axis contribution. (You could try this and check you get the same overall ${N.Ix} value.)` },
        { id: 'a2h', type: 'p', html: '<u>Second question</u>' },
        { id: 'a2', type: 'p', html: `${N.Ix} for this section is` },
        { id: 'a2m', type: 'math', html: '<span class="frac"><span>3<i>Bd</i><sup>2</sup></span><span>2</span></span>', label: '3 B d squared over 2' },
        { id: 'a2b', type: 'p', html: 'and so your vertical equivalence equation will be satisfied.' },
        { id: 'a3h', type: 'p', html: '<u>Third question</u>' },
        { id: 'a3', type: 'p', html: `The two vertical walls in your ${N.qb} diagram have the same thickness and so the corresponding shear strains will be the same (assume the same material in each wall). It can therefore be seen that the section will not twist due to this ${N.qb} distribution and so no additional ${N.q0} is required to achieve zero twist i.e. ${N.q0} = 0.` },
        { id: 'a4h', type: 'p', html: '<u>Fourth question</u>' },
        { id: 'a4', type: 'p', html: `I assume that your <i>Y</i><sub>E</sub> is measured vertically upwards from position 4 (as in my solution). If so, and given that you are taking anticlockwise as positive, then the moment due to ${N.Fy} should be negative (and then <i>Y</i><sub>E</sub> will be positive).` }
      ]}
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The questions a student asked',
        html: '<p>A student posted their working for two tutorial questions, with four steps they couldn’t follow marked in red. Each question below takes one of those steps.</p>',
        showQuestion: ['q1'] },
      { id: 'c1', stage: 'predict', type: 'mcq', title: 'Question 1: Tutorial 1 Q4', topic: 'Ix of an inclined wall',
        figure: 'qf1',
        prompt: `Why does the solution need no parallel axis term for the ${N.Ix} of the inclined wall?`,
        options: [
          { id: 'a', html: `${N.Ix} was calculated about <i>y</i> = 0, the centroidal axis of the whole section, not about the wall’s own centroid.`, correct: true, refs: ['a1', 'a1m', 'a1b'] },
          { id: 'b', html: 'Because the wall is thin, so its parallel axis term is negligible.', correct: false, refs: ['a1', 'a1b'] },
          { id: 'c', html: 'Because the parallel axis terms of the two inclined walls cancel.', correct: false, refs: ['a1', 'a1b'] }
        ] },
      { id: 'c2', stage: 'predict', type: 'mcq', title: 'Question 2: Tutorial 2 Q2', topic: 'Vertical equivalence',
        figure: 'qf2',
        prompt: 'The student’s check seemed to give 3/2 × (<i>Bd</i><sup>3</sup>/<i>I<sub>x</sub></i>) × <i>F<sub>y</sub></i> rather than <i>F<sub>y</sub></i>. What resolves this?',
        options: [
          { id: 'a', html: `Using ${N.Ix} = 3<i>Bd</i><sup>2</sup>/2 for this section, the vertical equivalence equation is satisfied.`, correct: true, refs: ['a2', 'a2m', 'a2b'] },
          { id: 'b', html: 'Vertical equivalence doesn’t need to hold for an idealised section.', correct: false, refs: ['a2', 'a2b'] },
          { id: 'c', html: 'The booms carry the rest of the shear force directly.', correct: false, refs: ['a2', 'a2b'] }
        ] },
      { id: 'c3', stage: 'predict', type: 'mcq', title: 'Question 3: Tutorial 2 Q2', topic: 'Seeing that q0 = 0 by inspection',
        figure: 'qf3',
        prompt: `Looking at the ${N.qb} diagram, how can you tell that no ${N.q0} is needed?`,
        options: [
          { id: 'a', html: `The two vertical walls have the same thickness, so their shear strains are the same and the section doesn’t twist under this ${N.qb}.`, correct: true, refs: ['a3'] },
          { id: 'b', html: `${N.q0} is always zero for a section that is symmetric about the <i>x</i>-axis.`, correct: false, refs: ['a3'] },
          { id: 'c', html: `Because ${N.qb} is zero in the horizontal walls.`, correct: false, refs: ['a3'] }
        ] },
      { id: 'c4', stage: 'feedback', type: 'mcq', title: 'Question 4: Tutorial 2 Q2', topic: 'Sign of the moment due to Fy',
        figure: 'qf4',
        prompt: `<i>Y</i><sub>E</sub> is measured upwards from position 4 and anticlockwise is taken as positive. What sign should the moment due to ${N.Fy} have?`,
        options: [
          { id: 'a', html: 'Negative, so that <i>Y</i><sub>E</sub> comes out positive.', correct: true, refs: ['a4'] },
          { id: 'b', html: 'Positive, so <i>Y</i><sub>E</sub> is negative as in the working.', correct: false, refs: ['a4'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Which step tripped you up?',
        recall: ['c1', 'c2', 'c3', 'c4'],
        prompt: 'The academic suggests recalculating the inclined wall’s <i>I<sub>x</sub></i> about its own centroid and adding the parallel axis term. Try it, and note whether you get the same total.',
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Transcription', item: 'The y-term (s/√2 − d/(2√2)) and Ix = 3Bd²/2 were retyped from PDF page 16. Check.' },
      { area: 'Figures', item: 'The student’s working (PDF page 15) is split into four crops, one per question. Check the alt text.' },
      { area: 'Assessment', item: 'Confirm options and correct answers for c1–c4. The c2 prompt paraphrases the student’s red note.' }
    ]
  });

  /* ---------------------------------------------------------------- #26 (+#95) */
  R.push({
    id: 'torque-resultant-of-shear-flow', order: 31, status: 'awaiting-review', discussion: '26', pages: '25–27',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't3',
      title: 'What goes into the torque resultant of the shear flow?',
      summary: 'Why one solution has a 2Aq0 term and another doesn’t, and why qb can drop out when you take torques about the cut.',
      concepts: ['torsional-equivalence', 'shear-centre', 'basic-shear-flow', 'enclosed-area'],
      terms: ['2Aq0', 'torque resultant', '2021 Q2b(iii)', 'Tutorial 1 Q6', 'taking torques about the cut', 'total shear flow'],
      questions: [
        'Why is there no 2Aq0 term in the exam solution when there is one in the tutorial?',
        'Do we need the torsional equivalence of qb and Sy, not just Sy?',
        'Why is qb ignored in the torsional equivalence equation?',
        'How do I find the shear centre by equating torques?'
      ],
      difficulties: ['equations', 'calculations', 'misconceptions'],
      addresses: ['Comparing two correct ways of writing the same torque resultant', 'Why a term disappears for a particular moment centre'],
      objectives: [
        'State what torsional equivalence equates',
        'Show that summing the qb and q0 resultants gives the same torque as the total shear flow',
        'Explain why qb has no resultant torque about the cut in the example shown'
      ],
      types: ['mcq'], added: '2026-11-11'
    },
    card: { heading: 'Torque Resultant of Shear Flow', tagline: 'Where did 2Aq0 go?', intro: 'One solution has a 2Aq0 term and another doesn’t. Another drops qb altogether. Find out why both are right.', activity: 'MCQs', minutes: 7 },
    source: {
      title: '2021 Q2biii', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'q1', type: 'p', html: 'In 2021 2biii I noticed that to find the shear centre by equating Fx YE to the torsional resultant, there was no 2Aq0 term on the RHS. However, this term is present in tutorial 1 question 6. Why is this so?' },
        fig('qf1', 'd26-student-working', 'Handwritten working: Pick point at the red dot, anticlockwise positive. F XE = torsional resultant of the shear flow. F XE = 2A q0 + (1/650 F) times 400 times 800. F XE = 2(240 000)(minus 1.0430...×10^-4 F) + 6400/13 F. XE = 442.2414069 mm. XE = 442.2 mm from left wall.', 'Working posted by the student.')
      ]},
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: `As you say, to determine the location of the shear centre (having found the ${N.q0}s which in combination with ${N.qb}, produce no rate of twist) we equate the torque of the applied shear force to the torque resultant of the total shear flow.` },
        { id: 'a2', type: 'p', html: 'In the tutorial question, I didn’t evaluate the total shear flow in each wall; I simply took the torque resultant of the total shear flow to be the sum of' },
        { id: 'a2a', type: 'p', html: `• the torque resultant of ${N.qb}` },
        { id: 'a2b', type: 'p', html: 'and' },
        { id: 'a2c', type: 'p', html: `• the torque resultant of ${N.q0} (which for this single cell case is given by 2<i>A</i>${N.q0}).` },
        { id: 'a3', type: 'p', html: 'For the exam question, I have evaluated the total shear flow in each wall (presumably I asked for this in the question) and then calculated the torque resultant using this total shear flow.' },
        { id: 'a4', type: 'p', html: '(You could check that you get the same answer if you use the approach that I used for the tutorial question.)' },
        { id: 'a5', type: 'note', html: '(Edited on 22/12/23 to tidy up text format)' }
      ]},
      threads: [
        { discussion: '95', pages: '113–114', title: 'Torsional Equivalence',
          question: { author: STU, blocks: [
            { id: 't95q1', type: 'p', html: 'Hi Sir,' },
            { id: 't95q2', type: 'p', html: 'For a torsional equivalence to find qo would we not have to do the torsional equivalence of qb and Sy not just Sy, since Sy does not act through the shear centre?' },
            fig('t95f1', 'd95-solution-extract', 'Extract from a worked solution for a single cell section with two triangular regions. Left column, real case: qb diagram with minus 250 s Sy over Ix and the expression (minus 37500 minus 250 s1 plus 5/2 s1 squared) Sy over Ix; q0 found by torsional equivalence about the cut, noting the torsional resultant of qb = 0; q0 times 2 times 100 times 300 = minus Sy times 50, so q0 = minus Sy times 50/60000. Right column, virtual case: qb bar with plus 250 s over Ix; q0 bar times 60000 = 1 times 150, so q0 bar = plus 150/60000.', 'Solution extract posted by the student.'),
            { id: 't95q3', type: 'p', html: 'Why is qb ignored in this case?' }
          ]},
          answer: { author: ACAD, blocks: [
            { id: 't95a1', type: 'p', html: 'You are correct that when we write a torsional equivalence equation we are saying:' },
            { id: 't95a2', type: 'p', html: 'torque about some point due to the applied shear force' },
            { id: 't95a3', type: 'p', html: 'is equal to' },
            { id: 't95a4', type: 'p', html: 'the torque of the total shear flow (i.e. qb and qo) about the same point.' },
            { id: 't95a5', type: 'p', html: 'In this case we have chosen to take torques about the "cut" but qb does not have a resultant torque about this position (as noted in the working above) and so does not appear in the final torsional equivalence equation.' }
          ]},
          followUps: [{ author: STU, blocks: [{ id: 't95f2', type: 'p', html: 'Thank you' }] }]
        }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The questions students asked',
        html: '<p>Two students noticed that a term they expected was missing from a torsional equivalence equation. In one case it was 2<i>Aq</i><sub>0</sub>, and in the other it was <i>q</i><sub>b</sub>.</p>',
        showQuestion: ['q1', 't95q2'] },
      { id: 'r1', stage: 'predict', type: 'mcq', topic: 'What torsional equivalence equates',
        prompt: 'To locate the shear centre, what do you equate?',
        options: [
          { id: 'a', html: 'The torque of the applied shear force and the torque resultant of the <em>total</em> shear flow, about the same point.', correct: true, refs: ['a1', 't95a1', 't95a2', 't95a3', 't95a4'] },
          { id: 'b', html: `The torque of the applied shear force and the torque of ${N.qb} only.`, correct: false, refs: ['a1', 't95a4'] },
          { id: 'c', html: `The torque of the applied shear force and 2<i>A</i>${N.q0} only.`, correct: false, refs: ['a1', 'a2', 'a2a', 'a2c'] }
        ] },
      { id: 'r2', stage: 'predict', type: 'mcq', topic: 'Two ways of writing the torque resultant',
        figure: 'qf1',
        prompt: 'The tutorial solution has a 2<i>Aq</i><sub>0</sub> term but the 2021 exam solution doesn’t. Why?',
        options: [
          { id: 'a', html: `The tutorial adds the torque resultants of ${N.qb} and ${N.q0} (2<i>A</i>${N.q0}). The exam solution works out the total shear flow in each wall first. Both give the same answer.`, correct: true, refs: ['a2', 'a2a', 'a2b', 'a2c', 'a3', 'a4'] },
          { id: 'b', html: `There was no ${N.q0} in the exam question.`, correct: false, refs: ['a1', 'a3'] },
          { id: 'c', html: 'One of the two solutions is wrong.', correct: false, refs: ['a3', 'a4'] }
        ] },
      { id: 'r3', stage: 'feedback', type: 'mcq', title: 'Knowledge check', topic: 'Why qb drops out about the cut',
        figure: 't95f1',
        prompt: `In this solution, torques are taken about the ‘cut’. Why doesn’t ${N.qb} appear in the equation?`,
        options: [
          { id: 'a', html: `${N.qb} has no resultant torque about that position.`, correct: true, refs: ['t95a5'] },
          { id: 'b', html: `${N.qb} is ignored because ${N.Sy} acts through the shear centre.`, correct: false, refs: ['t95a4', 't95a5'] },
          { id: 'c', html: `${N.qb} only matters for the virtual case.`, correct: false, refs: ['t95a5'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Check it yourself',
        recall: ['r1', 'r2', 'r3'],
        prompt: 'The academic suggests checking that both approaches give the same answer. Which would you use in an exam, and why?',
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Grouping', item: 'Thread #95 (qb ignored in torsional equivalence about the cut) is combined with #26. Confirm.' },
      { area: 'Figures', item: 'The #95 solution extract (PDF page 113) appears to be from a posted solution. Confirm it can be reused, and check the alt text.' },
      { area: 'Assessment', item: 'Confirm options and correct answers for r1–r3.' }
    ]
  });

  /* ---------------------------------------------------------------- #27 (+#55, #58) */
  R.push({
    id: 'signs-in-torsional-equivalence', order: 32, status: 'awaiting-review', discussion: '27', pages: '28',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't3',
      title: 'Getting the signs right in torsional equivalence',
      summary: 'Three students asked why a term was negative, why q0 was subtracted, and how to tell the direction of a quadratic shear flow. Learn the rule the academic gives for all three.',
      concepts: ['torsional-equivalence', 'sign-convention', 'shear-flow', 'shear-centre'],
      terms: ['sign of p', 'p = -h', 'anticlockwise positive', 'clockwise positive', 'positive q in direction of positive s', 'Tutorial 1 Q3', 'Tutorial 2 Q2'],
      questions: [
        'Why is there a minus in front of the shear flow term in torsional equivalence?',
        'How do I know the direction of the torque from a quadratic shear flow?',
        'Why is the q0 value subtracted in the moment calculation when it is summed in the lectures?',
        'Isn’t p negative, so the term should be positive?',
        'Do I need to determine the sign of qb?'
      ],
      difficulties: ['signs', 'misconceptions', 'equations'],
      addresses: ['Trying to find the actual direction of q before writing the equation', 'Equivalence versus equilibrium'],
      objectives: [
        'State the sign convention for p',
        'Write a torsional equivalence equation without first finding the direction of q',
        'Handle a negative q0 under a chosen positive direction'
      ],
      types: ['mcq', 'sort'], added: '2026-11-11'
    },
    card: { heading: 'Signs in Torsional Equivalence', tagline: 'One rule for every sign', intro: 'Why is that term negative? Why is q0 subtracted? Three threads, one rule.', activity: 'MCQs + sorting statements', minutes: 9 },
    source: {
      title: 'tutorial 1 q2', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'q1', type: 'p', html: 'Hi sir, in tutorial 1 q3, why is there a minus in front of the when you do the torsional equilibrium. The force Fy gives an anticlockwise moment and the shear flow gives a clockwise moment but when taken to other side of the equals sign, the sign becomes positive. This doesn’t affect the end result but I am confused as to how you know the direction of the torque from the shear flow to be anticlockwise which gives the result that you have in the solutions?' },
        { id: 'q2', type: 'p', html: 'In general if the shear flow= -12 s1 then this is easy to know the direction but in this case it was a quadratic expression so not sure??' }
      ]},
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: 'It is important to note that we are writing an equation of torsional equivalence (not equilibrium) i.e.' },
        { id: 'a2', type: 'p', html: 'torsional resultant of the applied shear force = torsional resultant of the shear flow.' },
        { id: 'a3', type: 'p', html: 'As you say the applied shear force, as drawn, gives an anticlockwise torque about position A.' },
        { id: 'a4', type: 'p', html: 'Bearing in mind that positive <i>q</i> is in the direction of positive <i>s</i>, then all we need to think about is whether the positive <i>q</i> produces an anticlockwise or clockwise torque about position A (the equation of <i>q</i> will deal with the actual direction). In this case we can see that a positive <i>q</i> (ie from node 1 towards node 2) will produce a clockwise moment about A and therefore appears as negative in the torsional equivalence equation (since we are taking anticlockwise as positive).' }
      ]},
      threads: [
        { discussion: '55', pages: '75–77', title: 'tutorial 1 qn.3 Sign in torsional equivalence',
          question: { author: STU, blocks: [
            { id: 't55q1', type: 'p', html: 'Hi Sir,' },
            { id: 't55q2', type: 'p', html: 'I am a bit confused here, isn’t the RHS meant to have a -tive sign right from the beginning cuz qb causes clockwise moment about A? and wont the p which is (-h) make it positive (excluding qb.ds term)?' },
            { id: 't55q3', type: 'p', html: 'Thank you' },
            fig('t55fig', 'd55-student-working', 'Student’s sketch for Tutorial 1 Q3: an open section with a top flange of length h, a vertical wall with points A, 2 and 1, Fy applied upward at distance XE from A, s measured from point 1 towards 2, and q = Fy over 5h cubed times (minus 6hs + 9s squared). Taking moments about A: Fy XE = integral of p qb ds = minus h times integral of qb ds = minus h Fy over 5h cubed times integral of (minus 6hs + 9s squared) ds.', 'Working posted by the student.'),
            { id: 't55q4', type: 'p', html: 'This is tutorial 1 qn.3 - though I am not sure which direction the q is exactly acting in, in this qn Since it is in terms of s? at s=h, it gives a positive answer but the maximum q as a negative number?' }
          ]},
          answer: { author: ACAD, blocks: [
            { id: 't55a1', type: 'p', html: 'The sign convention for <i>p</i> is:' },
            { id: 't55a2', type: 'p', html: '<i>p</i> is positive if positive <i>q</i> at a point produces positive torque (anti-clockwise) about the position where torsional equivalence is being considered.' },
            { id: 't55a3', type: 'p', html: '(See page 13 of the notes for Lecture Topic 3.)' },
            { id: 't55a4', type: 'p', html: 'In this problem, the magnitude of <i>p</i> for side 1-2 is <i>h</i>. Noting that positive <i>q</i> is in the direction of positive <i>s</i>, we can see that positive <i>q</i> along 1-2 will produce a negative torque (clockwise) about position A and so <i>p</i>=-<i>h</i>.' },
            { id: 't55a5', type: 'p', html: 'You are correct that <i>q</i> changes sign along 1-2 but this does not affect <i>p</i> as the sign convention only depends on the torque produced by positive <i>q</i>.' },
            { id: 't55a6', type: 'p', html: 'Incidentally, you will note that there is no need for the <i>b</i> subscript on <i>q</i> as this is an open section. I will change this in the tutorial solutions.' }
          ]},
          followUps: [
            { author: STU, blocks: [{ id: 't55f1', type: 'p', html: 'Sorry, this might be a bit too late to ask - but I was wondering now how you determined that qb is positive here (i.e. qb acts in the same direction as the s defined)? I know that in linear equations this is easy to determine - just look at the sign perhaps - but what about in quadratic cases for q? as in this example' }] },
            { author: ACAD, blocks: [
              { id: 't55f2', type: 'p', html: 'You do not need to determine the sign of qb.' },
              { id: 't55f3', type: 'p', html: 'As noted above: <i>p</i> is positive if positive <i>q</i> at a point produces positive torque (anti-clockwise) about the position where torsional equivalence is being considered. And positive <i>q</i> is in the direction of positive <i>s</i>. See above for more on this issue.' }
            ]}
          ]
        },
        { discussion: '58', pages: '81–82', title: 'Tutorial 2 Q2',
          question: { author: STU, blocks: [
            fig('t58f1', 'd58-solution-extract', 'Extract from the Tutorial 2 Q2 solution: q0 = minus the integral of qb over t ds divided by the integral of 1 over t ds = minus 5 B d Fx over 4 Iy. Taking moments about point 4: Fx YE = 2 B d Fx over Iy times d times d, minus minus 5/4 B d Fx over Iy times 2 d squared. Fx YE = 9/2 Fx B d cubed over Iy, giving YE = 9/8 d.', 'Solution extract posted by the student.'),
            { id: 't58q1', type: 'p', html: 'Hi sir,' },
            { id: 't58q2', type: 'p', html: 'I wanted to ask about the second question on tutorial 2.' },
            { id: 't58q3', type: 'p', html: 'In the solution when calculating the shear centre there the q0 value is taken away from the moment calculation when in the lectures its summed.' }
          ]},
          answer: { author: ACAD, blocks: [
            { id: 't58a1', type: 'p', html: `We have found the ${N.q0} (which, in combination with ${N.qb}, produces no rate of twist) is negative i.e. it acts in the clockwise direction.` },
            { id: 't58a2', type: 'p', html: `When writing the torsional equivalence equation about point 4, I have taken clockwise as positive and so the torsional resultant of ${N.q0} appears as positive on the right hand side.` }
          ]},
          followUps: [{ author: STU, blocks: [{ id: 't58f2', type: 'p', html: 'Thank you that has solved my problem.' }] }]
        }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The questions students asked',
        html: '<p>Three students got stuck on a sign in a torsional equivalence equation. Two worked on Tutorial 1 Q3 and one on Tutorial 2 Q2.</p>',
        showQuestion: ['q1', 'q2', 't58q3'] },
      { id: 'g1', stage: 'predict', type: 'mcq', topic: 'Equivalence, not equilibrium',
        prompt: 'What kind of equation is being written?',
        options: [
          { id: 'a', html: 'Torsional <em>equivalence</em>: the torsional resultant of the applied shear force equals the torsional resultant of the shear flow.', correct: true, refs: ['a1', 'a2'] },
          { id: 'b', html: 'Torsional <em>equilibrium</em>: the sum of all torques about a point is zero.', correct: false, refs: ['a1', 'a2'] }
        ] },
      { id: 'g2', stage: 'predict', type: 'mcq', topic: 'Deciding the sign of the shear flow term',
        figure: 't55fig',
        prompt: `<i>q</i> along 1–2 is quadratic in <i>s</i> and changes sign. How do you decide the sign of its term?`,
        options: [
          { id: 'a', html: 'Ask whether <em>positive</em> <i>q</i> (in the direction of positive <i>s</i>) gives an anticlockwise or clockwise torque. The equation for <i>q</i> deals with the actual direction.', correct: true, refs: ['a4', 't55a4', 't55a5', 't55f2', 't55f3'] },
          { id: 'b', html: 'Find where <i>q</i> is largest and use its sign there.', correct: false, refs: ['t55a5', 't55f2'] },
          { id: 'c', html: 'Evaluate <i>q</i> at the end of the wall and use that sign.', correct: false, refs: ['t55a5', 't55f2'] }
        ] },
      { id: 'g3', stage: 'feedback', type: 'sort', title: 'Sort the statements', topic: 'The sign convention for p and q0',
        prompt: 'Which of these match the academic’s explanations?',
        categories: [{ id: 'yes', label: 'Matches' }, { id: 'no', label: 'Does not match' }],
        items: [
          { html: 'Positive <i>q</i> acts in the direction of positive <i>s</i>.', cat: 'yes' },
          { html: '<i>p</i> is positive if positive <i>q</i> at a point produces an anticlockwise (positive) torque about the point you take torques about.', cat: 'yes' },
          { html: 'In Tutorial 1 Q3, <i>p</i> = −<i>h</i> for side 1–2 about A.', cat: 'yes' },
          { html: 'Because <i>q</i> changes sign along 1–2, <i>p</i> changes sign too.', cat: 'no' },
          { html: `You need to determine the sign of ${N.qb} before you write the equation.`, cat: 'no' },
          { html: `In Tutorial 2 Q2, ${N.q0} is negative (clockwise). With clockwise taken as positive, its torsional resultant appears as positive on the right-hand side.`, cat: 'yes' }
        ],
        refs: ['t55a2', 't55a4', 't55a5', 't55f2', 't58a1', 't58a2'] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Write the rule down',
        recall: ['g1', 'g2', 'g3'],
        prompt: 'Write the sign rule for <i>p</i> in one sentence, in a form you could use in an exam.',
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Grouping', item: 'Threads #55 and #58 (signs in torsional equivalence) are combined with #27. Confirm.' },
      { area: 'Transcription', item: 'In #55 the student wrote "in terms of s?" (probably s²). It is kept as posted. Check.' },
      { area: 'Assessment', item: 'Confirm g1, g2 and the six statements in g3.' }
    ]
  });

  /* ---------------------------------------------------------------- #31 (+#57, #30) */
  R.push({
    id: 'resultants-of-shear-flow', order: 33, status: 'awaiting-review', discussion: '31', pages: '31–32',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't3',
      title: 'Force and torque resultants of a shear flow',
      summary: 'When you can use the 1/3 × base × height shortcut, when you must integrate, and two ways to find the torque of a resultant on an inclined wall.',
      concepts: ['resultants', 'shear-flow', 'basic-shear-flow', 'inclined-walls', 'torsional-equivalence'],
      terms: ['resultant force', '1/3 base height', 'q proportional to s squared', 'Tutorial 1 Q4', 'Tutorial 1 Q6', '2023 Q1b(ii)', 'moment arm', 'perpendicular distance'],
      questions: [
        'How did you find the resultant of qb on wall 1-2?',
        'Why integrate q_b ds instead of using the shortcut from lecture 3?',
        'How do I find the moment arm for an angled shear flow?',
        'Why did you renumber the booms in Tutorial 1 Q6?'
      ],
      difficulties: ['calculations', 'equations', 'assumptions'],
      addresses: ['Using a shortcut outside the case it was derived for', 'Finding the torque of a force on an inclined wall'],
      objectives: [
        'Find the force resultant of qb by integration or, where valid, by the 1/3 × base × height shortcut',
        'Recognise when the shortcut does not apply',
        'Choose a method for the torque of a resultant on an inclined wall'
      ],
      types: ['mcq'], added: '2026-11-11'
    },
    card: { heading: 'Resultants of Shear Flow', tagline: 'Shortcut or integrate?', intro: 'When does the 1/3 × base × height shortcut work, and how do you take torques for an inclined wall?', activity: 'MCQs (incl. select-all)', minutes: 8 },
    source: {
      title: 'Tutorial 1 Q4', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'q1', type: 'p', html: 'Dear Professor,' },
        { id: 'q2', type: 'p', html: 'Could you kindly explain how you found the resultant (Green) here? If I understand correctly, the denominator is the Ix but I am unsure where the numerator came from' },
        fig('qf1', 'd31-solution-extract', 'Extract from the Tutorial 1 Q4 solution: the qb distribution sketched on a triangular section with points 1, 2 and 3. qb values written as F over t d cubed (1/3 + root 2 over 6) times terms, about minus 1.061 F over d and minus 0.621 F over d. A green ring highlights "Resultant = F over (1/3 + root 2 over 6) times ... = F over 2(root 2 + 1)".', 'Solution extract posted by the student, with the resultant circled in green.')
      ]},
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: 'Hello,' },
        { id: 'a2', type: 'p', html: `Are you happy with the determination of ${N.qb} along side 1-2? (Take <i>D</i><sub>x for 1 to 2</sub>, which was determined to be <i>s</i><sup>2</sup><i>t</i>/(2sqrt2) earlier in the solution, and multiply by <i>F</i>/${N.Ix}.)` },
        { id: 'a3', type: 'p', html: 'To determine the resultant force for wall 1-2 you can:' },
        { id: 'a4', type: 'p', html: 'EITHER' },
        { id: 'a5', type: 'p', html: `Integrate ${N.qb} with respect to <i>s</i> between the limits <i>s</i>=0 to <i>s</i>=<i>d</i>.` },
        { id: 'a6', type: 'p', html: 'OR' },
        { id: 'a7', type: 'p', html: `Noting that ${N.qb} varies as <i>s</i><sup>2</sup>, we can determine the resultant as 1/3 * <i>d</i> * ${N.qb} <sub>at position 2</sub> (i.e. 1/3 * base * height as shown on p27 of the lecture notes for topic 3). (This is the approach that I have used in the part marked in green above.)` }
      ]},
      followUps: [{ author: STU, blocks: [{ id: 'f1', type: 'p', html: 'Thanks a lot, it’s all clear now' }] }],
      threads: [
        { discussion: '57', pages: '80', title: '2023 Q1b(ii)',
          question: { author: STU, blocks: [{ id: 't57q1', type: 'p', html: 'Hi sir, hope you are well. in this question, your actually calculated the integral of (q_b ds)? Why did you do this as appose to using the trick you showed us in lecture 3 for calculating the resultant?' }] },
          answer: { author: ACAD, blocks: [{ id: 't57a1', type: 'p', html: 'In this problem, the equation for <i>q</i><sub>AB</sub> contains <i>s</i><sub>1</sub> and the square of <i>s</i><sub>1</sub>. The shortcut I showed in class was for a <i>q</i> which was proportional to <i>s</i><sup>2</sup> only and so is not applicable for determining the resultant of <i>q</i><sub>AB</sub>.' }] }
        },
        { discussion: '30', pages: '30', title: 'tutorial 1 q6',
          question: { author: STU, blocks: [{ id: 't30q1', type: 'p', html: 'Hi sir, in tut1 q6, why did you rearrange the order of the booms from what was shown in the question. If you kept the same order as in the question then you would get a non zero shear flow for the angled walls. and to find the shear centre, how would you find the moment arm for this angled shear flow, is it just basic trig or would we consider anything else because the shear flow doesn’t act at a single point?' }] },
          answer: { author: ACAD, blocks: [
            { id: 't30a1', type: 'p', html: 'Hi,' },
            { id: 't30a2', type: 'p', html: 'thanks, I hadn’t noticed that I had renumbered the boom positions (and no one has pointed this out previously) but there is no significance to this change in numbering (it doesn’t affect the solution).' },
            { id: 't30a3', type: 'p', html: `As you say, if I had ‘cut’ the section in the one of the vertical walls then we would have a non-zero value of ${N.qb} in the inclined walls. To evaluate the torque of the shear force resultant of ${N.qb} in this wall you could` },
            { id: 't30a4', type: 'p', html: 'EITHER' },
            { id: 't30a5', type: 'p', html: '• Calculate the perpendicular distance to this wall from the point about which you are taking torques. As you say, this is a basic geometry problem.' },
            { id: 't30a6', type: 'p', html: 'OR' },
            { id: 't30a7', type: 'p', html: '• Split the shear force resultant into horizontal &amp; vertical components and then determine the torque resultants of these. (You can consider these components acting at any single convenient point along the line of action of the force i.e. at any point along the line of the inclined side - or the extension of this line.) With this second method, you avoid the geometry problem of calculating the perpendicular distance to the inclined wall.' }
          ]}
        }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The questions students asked',
        html: '<p>Once you have the shear flow in a wall, you often need its force resultant and the torque of that resultant. Three students asked how the solutions did this.</p>',
        showQuestion: ['q2', 'qf1', 't57q1'] },
      { id: 'm1', stage: 'predict', type: 'mcq', multi: true, topic: 'Finding the force resultant on wall 1–2',
        prompt: `In Tutorial 1 Q4, ${N.qb} along wall 1–2 varies as <i>s</i><sup>2</sup>. Which methods give its resultant force?`,
        options: [
          { id: 'a', html: `Integrate ${N.qb} with respect to <i>s</i> from <i>s</i> = 0 to <i>s</i> = <i>d</i>.`, correct: true, refs: ['a5'] },
          { id: 'b', html: `1/3 × <i>d</i> × ${N.qb} at position 2 (1/3 × base × height).`, correct: true, refs: ['a7'] },
          { id: 'c', html: `<i>d</i> × ${N.qb} at position 2 (base × height).`, correct: false }
        ],
        refs: ['a3', 'a4', 'a5', 'a6', 'a7'] },
      { id: 'm2', stage: 'predict', type: 'mcq', topic: 'When the shortcut does not apply',
        prompt: 'In 2023 Q1b(ii), <i>q</i><sub>AB</sub> contains both <i>s</i><sub>1</sub> and <i>s</i><sub>1</sub><sup>2</sup>. Can you use the 1/3 × base × height shortcut?',
        options: [
          { id: 'a', html: 'No. The shortcut is only for a <i>q</i> proportional to <i>s</i><sup>2</sup>, so you integrate.', correct: true, refs: ['t57a1'] },
          { id: 'b', html: 'Yes. The shortcut works for any quadratic.', correct: false, refs: ['t57a1'] }
        ] },
      { id: 'm3', stage: 'feedback', type: 'mcq', multi: true, title: 'Knowledge check', topic: 'Torque of a resultant on an inclined wall',
        prompt: `Tutorial 1 Q6: if the section is cut in a vertical wall, ${N.qb} in the inclined walls is non-zero. Which are valid ways to find the torque of its resultant?`,
        options: [
          { id: 'a', html: 'Find the perpendicular distance from the point you take torques about to the inclined wall.', correct: true, refs: ['t30a5'] },
          { id: 'b', html: 'Split the resultant into horizontal and vertical components, acting at any convenient point on the line of the inclined side (or its extension).', correct: true, refs: ['t30a7'] },
          { id: 'c', html: 'Multiply the resultant by the horizontal distance to the midpoint of the wall.', correct: false }
        ],
        refs: ['t30a3', 't30a4', 't30a5', 't30a6', 't30a7'] },
      { id: 'm4', stage: 'feedback', type: 'mcq', title: 'Knowledge check', topic: 'Renumbering the booms',
        prompt: 'In Tutorial 1 Q6 the solution numbers the booms differently from the question. Does that change the solution?',
        options: [
          { id: 'a', html: 'No. The change in numbering doesn’t affect the solution.', correct: true, refs: ['t30a2'] },
          { id: 'b', html: 'Yes. The shear flow in the inclined walls depends on the numbering.', correct: false, refs: ['t30a2', 't30a3'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Which method saves you time?',
        recall: ['m1', 'm2', 'm3', 'm4'],
        prompt: 'The academic says the second torque method avoids a geometry problem. Sketch an inclined wall and note where you would put the two components.',
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Grouping', item: 'Threads #57 (shortcut not applicable) and #30 (inclined wall torque, boom renumbering) are combined with #31. Confirm.' },
      { area: 'Assessment', item: 'm1 and m3 are select-all questions. Distractors m1(c) and m3(c) were written for the activity, so confirm they are clearly wrong. Confirm m2 and m4.' },
      { area: 'Transcription', item: 'Check s²t/(2√2) and the 1/3 × d × qb wording against PDF page 32.' }
    ]
  });

  /* ---------------------------------------------------------------- #48 (+#86) */
  R.push({
    id: 'two-ways-to-find-q0', order: 34, status: 'awaiting-review', discussion: '48', pages: '62–65',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't3',
      title: 'Two ways to find q0, and when to use each',
      summary: 'Torsional equivalence with a known line of action, or zero rate of twist to find the shear centre? Sort situations into the right method and order the steps for locating a shear centre.',
      concepts: ['basic-shear-flow', 'shear-centre', 'torsional-equivalence', 'closed-section', 'multicell'],
      terms: ['q0', 'rate of twist', 'zero twist', 'torsional equivalence', 'Lecture 3 worked example', '2017 Q2', 'q01 q02', 'two cell'],
      questions: [
        'What is the difference between q0 found from the rate of twist and q0 found from torsional equivalence?',
        'Why does q0 change if it is the same Fy?',
        'Is the method always to start with zero rate of twist?',
        'How do I find the shear centre of a two cell section?',
        'Can I locate the shear centre with a torsional equivalence using the q0 values from the given load?'
      ],
      difficulties: ['concept', 'misconceptions', 'calculations'],
      addresses: ['Mixing up the two q0 calculations', 'Using the loaded case to locate the shear centre'],
      objectives: [
        'Choose the q0 method from what the question gives you',
        'Explain why the two q0 values differ unless Fy acts through the shear centre',
        'Order the steps for locating the shear centre of a closed section'
      ],
      types: ['branching', 'sort', 'order'], added: '2026-11-11'
    },
    card: { heading: 'Two Ways to Find q0', tagline: 'Pick the right method', intro: 'Given the line of action, or asked for the shear centre? The choice changes how you find q0.', activity: 'Sorting + ordering a method', minutes: 10 },
    source: {
      title: 'Lecture 3 q_0', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'q1', type: 'p', html: 'Could you please explain the difference between the q_0 found through rate of twist (q_b/t) method and the q_0 found through the torsional equivalence (q_b*p). Both result in 2 expressions for the same q_0 after taking moments about the line of action of the F_y. So I wanted to know they they are the same in value or arise from different loading etc.' },
        { id: 'q2', type: 'p', html: 'EG in Lecture 3 worked example,<br>q_b = -11/48 * F_y/b<br>and later found to be<br>q_b = -2F_y/5b' }
      ]},
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: `If you know the line of action of the applied shear force then to find ${N.q0} you use the torsional equivalence equation.` },
        { id: 'a2', type: 'p', html: `If you need to find the location of the shear centre then you find ${N.q0} which in combination with ${N.qb} produces no rate of twist and use the torsional equivalence equation to determine the location of the shear centre.` },
        { id: 'a3', type: 'p', html: 'Let me know if you are still puzzled by the above.' }
      ]},
      followUps: [
        { author: STU, blocks: [
          { id: 'f1', type: 'p', html: 'so they are simply 2 different problems which result in 2 different q_0 values. One where the force acts through some distance and another where it acts through the shear centre?' },
          { id: 'f2', type: 'p', html: 'E.g. I still dont understand why if its the same Fy acting through the same point/direction why the q_0 has changed' },
          { id: 'f3', type: 'p', html: 'or to clarify my misunderstanding' },
          { id: 'f4', type: 'p', html: 'from below: is q_0,1 the real q_0 from the actual loading / F_y and q_0,2 leads to the total shear flow that gives no twist. Therefore 1 and 2 are different cases where the former is the actual loading and the latter simply locates the shear centre' }
        ]},
        { author: ACAD, blocks: [
          { id: 'b1', type: 'p', html: '<u>E.g. I still dont understand why if its the same Fy acting through the same point/direction why the q_0 has changed</u>' },
          { id: 'b2', type: 'p', html: `The ${N.q0} will only be the same from the two methods if ${N.Fy} is applied through the shear centre.` },
          { id: 'b3', type: 'p', html: `You use the first method if you know the line of action of ${N.Fy}.` },
          { id: 'b4', type: 'p', html: 'You use the second method if you are told that' },
          { id: 'b5', type: 'p', html: `• the section does not twist (but the line of action of ${N.Fy} is not given) or` },
          { id: 'b6', type: 'p', html: `• ${N.Fy} acts through the shear centre (but the location is not given) or` },
          { id: 'b7', type: 'p', html: '• you need to find the location of the shear centre' }
        ]}
      ],
      threads: [
        { discussion: '86', pages: '103–104', title: 'Clarification regarding 2017 qn2',
          question: { author: STU, blocks: [
            { id: 't86q1', type: 'p', html: 'Hi [academic],' },
            { id: 't86q2', type: 'p', html: 'The 2017 paper qn. 2 does not mention that the Sy force is applied at the shear centre. Yet, in the MS - this property of the twist rate being 0 has been used.' },
            { id: 't86q3', type: 'p', html: 'Is this a typo in the qn? Or am I missing out on something here?' },
            { id: 't86q4', type: 'p', html: 'Also on this note, I was wondering how this qn can be done if Sy didn’t act through the structure’s shear centre. Firstly, the rate of twists of the 2 cells can be equated, to get a relation between q01 and q02. Then, a torsional equivalence can be solved for - taking moments about the point such that the moment arm for Sy is 0 - hence getting another equation relating q01 and q02. Then the two q0(s) can be solved, following which the actual shear centre position can be located - using a torsional equivalence about a suitable point, involving all the qb(s), q0(s), and Sy force? Could you please confirm if this approach is correct?' },
            { id: 't86q5', type: 'p', html: 'Thank you in advance' }
          ]},
          answer: { author: ACAD, blocks: [
            { id: 't86a1', type: 'p', html: `In q2 part bi you are asked to find the basic shear flow, ${N.qb}, in the "cut" (i.e. open) section shown in Fig 2c. For the calculation of ${N.qb}, you do not need to know the location of the shear force (${N.qb} does not change with the location of the shear force - see p 3 of the lecture notes of Topic 3.)` },
            { id: 't86a2', type: 'p', html: `In part bii you are asked to find the shear centre. We do this by finding the values of <i>q</i><sub>0<i>i</i></sub> which in combination with ${N.qb} produces no rate of twist. Once we have determined the <i>q</i><sub>0<i>i</i></sub> values, we write a torsional equivalence equation to determine where ${N.Sy} must act to be equivalent to the total shear flow. This location is the <i>x</i> location of the shear centre.` },
            { id: 't86a3', type: 'p', html: `Now let’s consider the solution if the question had specified the location of the applied shear force and asked you to determine the shear flow distribution. Having determined ${N.qb} as before, you can proceed as you suggest to determine the <i>q</i><sub>0<i>i</i></sub> values (but note you can write the torsional equivalence equation about any point - not just the position which gives the torque of ${N.Sy} to be zero). (See also the example on p21-25 of the notes on Topic 5 where a the total shear flow is determined for a two cell tube subjected to a shear force acting at a specified location.)` },
            { id: 't86a4', type: 'p', html: 'However your final step:' },
            { id: 't86a5', type: 'p', html: '"Then the two q0(s) can be solved, following which the actual shear centre position can be located - using a torsional equivalence about a suitable point, involving all the qb(s), q0(s), and Sy force? "' },
            { id: 't86a6', type: 'p', html: `is not correct - this is not the method to find the shear centre location. If you write a torsional equivalence equation you will find the location of the shear force which was specified in the question. The shear centre can only be located having found the values of <i>q</i><sub>0<i>i</i></sub> which in combination with ${N.qb}, produces no rate of twist.` }
          ]},
          followUps: [
            { author: STU, blocks: [{ id: 't86f1', type: 'p', html: 'Thank you very much Prof! So always the method is to start with zero rate of twist? If I’m not mistaken' }] },
            { author: ACAD, blocks: [{ id: 't86f2', type: 'p', html: '<u>So always the method is to start with zero rate of twist?</u>' }, { id: 't86f3', type: 'p', html: 'Yes, if you are asked to find the shear centre.' }] }
          ]
        }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The questions students asked',
        html: `<p>In the Lecture 3 worked example, ${N.q0} is found twice and comes out with two different values. A second student asked about the same choice of method for a two-cell exam question.</p>`,
        showQuestion: ['q1', 'q2', 'f2'] },
      { id: 'z1', stage: 'predict', type: 'mcq', topic: 'Why the two q0 values differ',
        prompt: `The same ${N.Fy} acts in both calculations, yet the two ${N.q0} values differ. When would they be the same?`,
        options: [
          { id: 'a', html: `Only if ${N.Fy} is applied through the shear centre.`, correct: true, refs: ['b2'] },
          { id: 'b', html: 'Always. One of the calculations must contain an error.', correct: false, refs: ['b2'], next: 'z1-branch' },
          { id: 'c', html: 'Never. They describe different loads.', correct: false, refs: ['b2'] }
        ] },
      { id: 'z1-branch', stage: 'predict', type: 'mcq', branchOnly: true, assess: false, next: 'z2', topic: 'Two different questions',
        title: 'Two different questions',
        html: '<p>The two calculations answer different questions, even with the same section and the same force.</p>',
        prompt: `Which calculation finds the ${N.q0} for the <em>actual</em> line of action of ${N.Fy}?`,
        options: [
          { id: 'a', html: 'Torsional equivalence with the known line of action.', correct: true, refs: ['a1', 'b3'] },
          { id: 'b', html: `Finding the ${N.q0} that gives zero rate of twist.`, correct: false, refs: ['a2', 'b4', 'b5', 'b6', 'b7'] }
        ] },
      { id: 'z2', stage: 'interact', type: 'sort', title: 'Choose the method', topic: 'Matching the situation to the method',
        prompt: `For each situation, which method do you use to find ${N.q0}?`,
        categories: [{ id: 'te', label: 'Torsional equivalence (line of action known)' }, { id: 'zt', label: 'Zero rate of twist' }],
        items: [
          { html: `You are given the line of action of ${N.Fy}.`, cat: 'te' },
          { html: `You are told the section does not twist, but not where ${N.Fy} acts.`, cat: 'zt' },
          { html: `You are told ${N.Fy} acts through the shear centre, but not where that is.`, cat: 'zt' },
          { html: 'You need to find the location of the shear centre.', cat: 'zt' },
          { html: 'A two-cell question gives the position of the shear force and asks for the shear flow distribution.', cat: 'te' }
        ],
        refs: ['b3', 'b4', 'b5', 'b6', 'b7', 't86a3'] },
      { id: 'z3', stage: 'interact', type: 'order', title: 'Locate a shear centre', topic: 'Steps to locate the shear centre',
        prompt: 'Put the academic’s method for locating the shear centre (2017 Q2) in order.',
        items: [
          { id: 's1', html: `Find ${N.qb} in the ‘cut’ (open) section. You don’t need to know where the shear force acts for this.` },
          { id: 's2', html: `Find the <i>q</i><sub>0<i>i</i></sub> values that, with ${N.qb}, produce no rate of twist.` },
          { id: 's3', html: `Write a torsional equivalence equation for where ${N.Sy} must act to be equivalent to the total shear flow.` },
          { id: 's4', html: 'That location is the <i>x</i> location of the shear centre.' }
        ],
        refs: ['t86a1', 't86a2'] },
      { id: 'z4', stage: 'feedback', type: 'mcq', title: 'Knowledge check', topic: 'Locating the shear centre from the loaded case',
        prompt: `A student found the <i>q</i><sub>0<i>i</i></sub> for a shear force at a <em>given</em> position, then wrote another torsional equivalence to “locate the shear centre”. What does that equation actually give?`,
        options: [
          { id: 'a', html: 'The location of the shear force that was specified in the question, not the shear centre.', correct: true, refs: ['t86a5', 't86a6'] },
          { id: 'b', html: 'The shear centre, as long as torques are taken about a suitable point.', correct: false, refs: ['t86a6'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Make a decision rule',
        recall: ['z1', 'z2', 'z3', 'z4'],
        prompt: `Write a one-line rule you could use at the start of any ${N.q0} question to decide which method to use.`,
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Grouping', item: 'Thread #86 (2017 Q2, two-cell shear centre) is combined with #48. Confirm.' },
      { area: 'Assessment', item: 'z2 includes one situation paraphrased from #86 (given position, find distribution → torsional equivalence). Confirm. Confirm the order of the steps in z3, and z1, z1-branch and z4.' },
      { area: 'Source', item: 'The #48 thread appears twice in the PDF (pages 62–63 and 64–65). It is reproduced once.' }
    ]
  });

  /* ---------------------------------------------------------------- #50 (+#65, #90) */
  R.push({
    id: 'symmetry-of-shear-flow', order: 35, status: 'awaiting-review', discussion: '50', pages: '66–69',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't3',
      title: 'When can you use symmetry for shear flow?',
      summary: 'Symmetry about the y-axis, symmetry about the x-axis, and where you cut a closed section all give different results. Check the direction of qb and the flow at a junction.',
      concepts: ['symmetry', 'shear-flow', 'basic-shear-flow', 'open-section', 'closed-section', 'sign-convention'],
      terms: ['Tutorial 1 Q4', 'wall 1-3', 'junction', 'flow in equals flow out', 'mirror symmetry', '2019 Q2a(ii)', 'symmetrical closed section'],
      questions: [
        'Why is the direction of qb in wall 1-3 not the same as in wall 1-2?',
        'When can I use symmetry to avoid calculating qb in a side?',
        'Does the negative sign disappear because of the direction of the shear flow?',
        'Is qb always symmetrical for a symmetrical closed section?',
        'How do I get the direction of shear flow right on the other half?'
      ],
      difficulties: ['signs', 'visualising', 'misconceptions'],
      addresses: ['Assuming a symmetric section always gives a symmetric shear flow', 'Reading a negative shear flow as a direction'],
      objectives: [
        'State what symmetry of the shear flow to expect for symmetry about the y-axis and about the x-axis',
        'Use flow in = flow out at a junction to check directions',
        'Explain when qb in a closed section is symmetric'
      ],
      types: ['mcq'], added: '2026-11-11'
    },
    card: { heading: 'Symmetry of Shear Flow', tagline: 'Mirror the magnitudes, not always the directions', intro: 'When does a symmetric section give a symmetric shear flow, and what happens to the directions?', activity: 'MCQs', minutes: 8 },
    source: {
      title: 'Tutorial 1 q4', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'q1', type: 'p', html: 'Good morning Sir,' },
        { id: 'q2', type: 'p', html: 'I hope you are well. I have a question on tutorial 1 question 4 I am a bit confused as to how you determine qb in wall 1-3. Here are your solutions:' },
        fig('qf1', 'd50-section', 'Tutorial 1 Q4 solution: a triangular thin-walled section with points 1, 2 and 3; walls of length d at 45 degrees; Fy applied; s from 1 to 2 and s1 from 2 to 3; t throughout. q = q0 + qb, qb of section cut at s = 0 is F over Ix times Dx.', 'Tutorial 1 Q4 solution: section and set-up.'),
        fig('qf2', 'd50-qb-directions', 'Tutorial 1 Q4 solution: qb distribution sketched on the section with arrows. qb values approximately minus 1.061 F over d and minus 0.621 F over d. The arrow in wall 1-3 points from 3 towards 1.', 'Tutorial 1 Q4 solution: the qb distribution and its directions.'),
        { id: 'q3', type: 'p', html: 'Why is the direction of qb as such in wall 1-3? From symmetry, wouldn’t the direction be the same as that for 1-2? i.e. saying we create the direction s3 going from 1 to 3 (equivalent to s, going from 1 to 2), wouldn’t qb in 1-3 be going in the positive direction and therefore "mimic" or be symmetric to what happens in 1-2? I don’t understand how to obtain the above.' },
        { id: 'q4', type: 'p', html: 'Thank you very much in advance and happy New Year!' }
      ]},
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: `As you say, you could use a parameter <i>s</i><sub>3</sub> going from 1 to 3 to calculate ${N.qb}. You would find that ${N.qb} would be negative i.e. it will act in the direction shown in the diagram above.` },
        { id: 'a2', type: 'p', html: 'Two other things you should recognise are' },
        { id: 'a3', type: 'p', html: '• the shear flow in 2-3 does not obey your symmetry argument (the direction in the upper half is not symmetric with the direction in the lower half.)' },
        { id: 'a4', type: 'p', html: '• for this non-idealised section, shear flow into a junction has to equal shear flow out. This would not be satisfied at junction 3 if the shear flow direction in 1-3 was reversed.' }
      ]},
      followUps: [
        { author: STU, blocks: [
          { id: 'f1', type: 'p', html: 'Thank you very much! So for this section we would bot be able to use symmetry to find qb from 1 to 3? How can we know when it is possible to use symmetry to avoid calculating qb in a side(in this case for example x is a symmetry axis)?' },
          { id: 'f2', type: 'p', html: 'Additionally, when checking if the shear flow in is equal to the shear flow out, I notice that, the side 1-3 it has a negative sign that the side 2-3 doesn’t have. Can I confirm that this negative sign “disappears” because of the direction of the shear flow? I’m a bit puzzled by this.' },
          { id: 'f3', type: 'p', html: 'Again, thank you so much!' }
        ]},
        { author: ACAD, blocks: [
          { id: 'b1', type: 'p', html: `For an open section subjected to ${N.Fy}` },
          { id: 'b2', type: 'p', html: '• if the section is symmetric about the <i>y</i>-axis then the shear flow distribution will be symmetric about the <i>y</i>-axis (see the example on pages 7-9 of Lecture Topic 3);' },
          { id: 'b3', type: 'p', html: `• if the section is symmetric about the <i>x</i>-axis then the magnitudes of the shear flow distribution will have mirror symmetry about the <i>x</i>-axis but the directions will not (as in the ${N.qb} determined in Q4 of Tutorial sheet 1).` },
          { id: 'b4', type: 'p', html: 'On the shear flow at junction 3:' },
          { id: 'b5', type: 'p', html: 'You have established that the shear flow from 1 to 3 is negative and so the actual direction of the shear flow is from 3 to 1 i.e. the shear flow is flowing out from 3 in wall 1-3. In wall 2-3 the shear flow is positive (in the direction from 2 towards 3) and so the shear flow is flowing into 3 in wall 2-3.' }
        ]}
      ],
      threads: [
        { discussion: '65', pages: '92', title: 'Symmetrical shear flow',
          question: { author: STU, blocks: [{ id: 't65q1', type: 'p', html: 'Hi prof, If you have a symmetrical closed cross-section, is qb always symmetrical or do you have to cut in a way that retains the symmetry such as 2019 q2 a) ii ? Thanks' }] },
          answer: { author: ACAD, blocks: [
            { id: 't65a1', type: 'p', html: 'Hi [student],' },
            { id: 't65a2', type: 'p', html: `${N.qb} will only be symmetrical (in this case about the vertical centroidal axis due to a vertical shear force) if the open section created by the "cut" is symmetric about the vertical axis.` },
            { id: 't65a3', type: 'p', html: 'You can find more about the symmetry of shear flows in the thread "Tutorial 1 q4 #50"' }
          ]}
        },
        { discussion: '90', pages: '107–108', title: 'symmetry in shear flow',
          question: { author: STU, blocks: [
            { id: 't90q1', type: 'p', html: 'Hi Sir' },
            { id: 't90q2', type: 'p', html: 'I get confused when applying symmetry for shear flows in structures, like regarding the direction in which they would act on the other half. I am not sure if my qn is clear, but do you have any techniques to get the same correct, please? For example, here in this qn' },
            fig('t90f1', 'd90-figure', 'A closed rectangular section with a central vertical wall and narrow slits, loaded by a vertical force P. Shear flow expressions: q = minus P over Ix times 15 t squared s1 in the top wall; q = minus P over Ix (225 t cubed + 15 t squared s2 minus t s2 squared over 2) in the side wall; q = minus P over Ix (225 t cubed minus 15 t squared s3) in the bottom wall; q = minus P over Ix (30 t squared s4 minus t s4 squared) in the central wall. Note: rest of shear flow diagram follows from symmetry.', 'Example posted by the student.'),
            { id: 't90q3', type: 'p', html: 'Thank you' }
          ]},
          answer: { author: ACAD, blocks: [{ id: 't90a1', type: 'p', html: 'Please see the thread "Tutorial 1 q4 #50" but do let me know if you are still uncertain.' }] }
        }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The questions students asked',
        html: '<p>Symmetry saves work when drawing shear flow diagrams, but it can also mislead. Three students asked when they could rely on it.</p>',
        showQuestion: ['q3', 'qf2', 't65q1'] },
      { id: 'y1', stage: 'predict', type: 'mcq', topic: 'Direction of qb in wall 1–3',
        figure: 'qf2',
        prompt: `If you used a parameter <i>s</i><sub>3</sub> from 1 to 3 to calculate ${N.qb}, what would you find?`,
        options: [
          { id: 'a', html: `${N.qb} would be negative, so it acts in the direction shown in the solution (from 3 towards 1).`, correct: true, refs: ['a1'] },
          { id: 'b', html: `${N.qb} would be positive, mirroring wall 1–2.`, correct: false, refs: ['a1', 'a3'] }
        ] },
      { id: 'y2', stage: 'predict', type: 'mcq', topic: 'Symmetry about the x-axis',
        prompt: `Tutorial 1 Q4’s section is symmetric about the <i>x</i>-axis and loaded by ${N.Fy}. What symmetry does the shear flow have?`,
        options: [
          { id: 'a', html: 'The magnitudes have mirror symmetry about the <i>x</i>-axis, but the directions do not.', correct: true, refs: ['b1', 'b3'] },
          { id: 'b', html: 'Both magnitudes and directions are symmetric about the <i>x</i>-axis.', correct: false, refs: ['b1', 'b3', 'a3'] },
          { id: 'c', html: 'There is no symmetry at all.', correct: false, refs: ['b3'] }
        ] },
      { id: 'y3', stage: 'feedback', type: 'mcq', title: 'Knowledge check', topic: 'Checking directions at a junction',
        prompt: 'How can you check the directions at junction 3?',
        options: [
          { id: 'a', html: 'Shear flow into the junction must equal shear flow out. Wall 1–3 flows out of 3 (negative from 1 to 3) and wall 2–3 flows in (positive from 2 to 3).', correct: true, refs: ['a4', 'b5'] },
          { id: 'b', html: 'Both walls should flow into the junction, since the section is symmetric.', correct: false, refs: ['a4', 'b5'] }
        ] },
      { id: 'y4', stage: 'feedback', type: 'mcq', title: 'Knowledge check', topic: 'Symmetry of qb in a closed section',
        prompt: `A closed section is symmetric about the vertical axis and carries a vertical shear force. When is ${N.qb} symmetric?`,
        options: [
          { id: 'a', html: 'Only if the open section created by the ‘cut’ is symmetric about the vertical axis.', correct: true, refs: ['t65a2'] },
          { id: 'b', html: 'Always, wherever you cut, because the section is symmetric.', correct: false, refs: ['t65a2'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Apply it to another example',
        recall: ['y1', 'y2', 'y3', 'y4'],
        figure: 't90f1',
        prompt: 'Look at this example from thread #90. The note says the rest of the diagram “follows from symmetry”. Which symmetry applies, and what will you check at the junctions?',
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Grouping', item: 'Threads #65 and #90 (both pointed to #50 by the academic) are combined with #50. Confirm.' },
      { area: 'Figures', item: 'The #90 figure looks like it comes from a textbook or past solution. Confirm it can be reused.' },
      { area: 'Assessment', item: 'Confirm options and correct answers for y1–y4. The reflection on the #90 figure asks students to apply the rule but gives no model answer.' }
    ]
  });
})();
