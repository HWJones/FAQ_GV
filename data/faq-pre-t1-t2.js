/*
 * Section properties (pre-requisites), Topic 1 (torsion of open sections) and Topic 2 (torsion of closed sections).
 * Threads #64 (+#29, #81), #32 (+#80), #38 (+#82), #37 (+#56).
 * Source text is verbatim and anonymised. Steps are activity content that needs academic approval.
 */
(function () {
  const N = window.FAQ_N;
  const R = window.FAQ_REGISTRY = window.FAQ_REGISTRY || [];
  const ACAD = 'Academic (module staff)', STU = 'Student (anonymised)';
  const fig = (id, src, alt, caption) => ({ id, type: 'figure', src: src.startsWith('data:') ? src : 'assets/figures/' + src + '.webp', alt, caption });
  const META_REVIEW = { area: 'Library metadata', item: 'Title, summary, objectives, sticking points, tags and alternative search phrases were written for the library. Confirm.' };

  /* ---------------------------------------------------------------- #64 (+#29, #81) */
  R.push({
    id: 'inclined-walls', order: 10, status: 'awaiting-review', discussion: '64', pages: '84–86',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 'pre',
      title: 'Coordinates and section properties of inclined walls',
      summary: 'Write the y-coordinate along an inclined wall and check it at a point, use bh³/12 + A(dy)² correctly for an angled wall, and read a y-coordinate in an exam solution.',
      concepts: ['inclined-walls', 'second-moment', 'parallel-axis', 'sign-convention'],
      terms: ['y = s1 - d sqrt(2)/2', 'projected height', 'd/sqrt2', 't*sqrt2', '-L + s sin30', 'Tutorial 4 Q4', 'Tutorial 1 Q4', '2020 Q2a'],
      questions: [
        'Why is y = s1 - d*sqrt(2)/2 and not d*sqrt(2)/2 - s1?',
        'Can I use bh^3/12 + A(dy)^2 for each angled wall instead of integrating?',
        'Why is the y-coordinate -L + s sin30 and not -L sin(theta)?',
        'Is the sign in the solution wrong?'
      ],
      difficulties: ['equations', 'signs', 'calculations'],
      addresses: ['Writing coordinates along an inclined wall', 'Using the standard rectangle formula for an inclined wall'],
      objectives: [
        'Write y as a function of s along an inclined wall and check it at a known point',
        'Choose the correct b and h when applying bh³/12 to an inclined wall',
        'Interpret coordinate expressions in a worked solution'
      ],
      types: ['mcq'], added: '2026-11-11'
    },
    card: { heading: 'Inclined Walls', tagline: 'Coordinates you can check', intro: 'Get y along an angled wall right, and know when bh³/12 works for an inclined wall.', activity: 'MCQs on worked solutions', minutes: 8 },
    source: {
      title: 'tutorial 4 q4', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'q1', type: 'p', html: 'Hi' },
        { id: 'q2', type: 'p', html: 'I am confused on why the y = s1 - d * sqrt(2) / 2, instead of y= d * sqrt(2) / 2 - s1' },
        { id: 'q3', type: 'p', html: 'Is it because s1 is going up, if s1 was to go down from 3 to 2, would it be the second one instead?' },
        { id: 'q4', type: 'p', html: 'Many thanks,' },
        fig('qf1', 'd64-student-working', 'Handwritten solution extract: at 2, Dx = d squared t over 2 root 2. Dx for 2-3 = d squared t over 2 root 2 minus the integral from 0 to s1 of y t ds1 = d squared t over 2 root 2 minus the integral of (s1 minus d root 2 over 2) t ds1 = d squared t over 2 root 2 minus (s1 squared over 2 minus d s1 over root 2) t.', 'Solution extract posted by the student.')
      ]},
      answer: { author: ACAD, blocks: [
        fig('af1', 'd64-academic-red-cross', 'The academic’s annotated copy of the section: a triangle with points 1, 2 and 3, Fy at the top, s1 running up the vertical wall from 2 to 3, and a red cross on the vertical wall above the x-axis with an arrow labelled y measured up from the x-axis.', 'Diagram posted by the academic, with the point marked by a red cross.'),
        { id: 'a1', type: 'p', html: 'It may help to think about the point I have marked with red cross in the diagram above.' },
        { id: 'a2', type: 'p', html: 'Hopefully you can now see that <i>y</i> = <i>s</i><sub>1</sub> - <i>d</i> * sqrt(2) / 2. Whenever you determine an equation like this, you can always check some specific point to see if it is correct. For example here you could check point 2 (i.e. <i>s</i><sub>1</sub> = 0) which gives <i>y</i> = - <i>d</i> * sqrt(2) / 2 which is correct.' }
      ]},
      threads: [
        { discussion: '29', pages: '29', title: 'tutorial 1 q4',
          question: { author: STU, blocks: [{ id: 't29q1', type: 'p', html: 'Hi sir, hope you are well. For this question, why do we have to use integrals to work out Ix for the angled sections, can we not just do bh^3/12+A(dy)^2 for each angled section?' }] },
          answer: { author: ACAD, blocks: [
            { id: 't29a1', type: 'p', html: 'Hi, the answer to this is yes BUT you need to use' },
            { id: 't29a2', type: 'p', html: '• for <i>h</i>: the projected height (in the <i>y</i>-direction) (i.e <i>h</i>=<i>d</i>/sqrt2), and' },
            { id: 't29a3', type: 'p', html: '• for <i>b</i>: the thickness of the inclined wall as measured in the <i>x</i>-direction (i.e. <i>b</i>=<i>t</i>*sqrt2)' }
          ]}
        },
        { discussion: '81', pages: '97–100', title: '2020 Q2a (Structural Mechanics and Dynamics)',
          question: { author: STU, blocks: [
            { id: 't81q1', type: 'p', html: 'Hi Sir,' },
            { id: 't81q2', type: 'note', html: '[The student posted an extract of the exam solution for a hexagonal closed section with walls of length L, 30° angles and points 1–8.]' },
            { id: 't81q3', type: 'p', html: '1) Should q not be q=T/(5.2L^2)' },
            { id: 't81q4', type: 'p', html: 'And for' },
            fig('t81f1', 'd81-solution-circled', 'Exam solution extract for a hexagonal section: qT = T over 2A, A = 2.6 L squared, q = T over 2.6 L squared. Ixx = 2 t L cubed over 12 plus 4 times the integral from 0 to L of t (minus L + s sin 30) squared ds = 5 L cubed t over 2. q7 = 0; q78 = S over Ixx times the integral of t (minus L + s sin 30) ds = 2S over 5L cubed times the integral of (minus L + s/2) ds = minus S over 5L cubed (2Ls + s squared over 2). The minus L in the bracket is circled in red in two places, and the plus sign before s squared over 2 is circled in green. q8 = minus 3S over 10L; q81 and q1 = minus 7S over 20L follow.', 'Solution extract re-posted by the student, with terms circled in red and green.'),
            { id: 't81q5', type: 'p', html: 'Is the term circled in red not meant to be -Lsin(pheta)? And the sign circled in green be a minus? At q_8 where s=L would q_78 not give you -1/2 according to that equation?' },
            { id: 't81q6', type: 'p', html: 'I may be wrong but I’m slightly confused with this solution.' },
            { id: 't81q7', type: 'p', html: 'Thank you in advance!' }
          ]},
          answer: { author: ACAD, blocks: [
            { id: 't81a0', type: 'p', html: 'I cannot see your red and green circles. Can you please check and re-post.' },
            { id: 't81a0b', type: 'note', html: '[The student re-posted the extract above: “Sorry, I uploaded the wrong snippet”.]' },
            { id: 't81a1', type: 'p', html: 'Thank you.' },
            { id: 't81a2', type: 'p', html: '<u>Red circled terms</u> The term (-<i>L</i>+<i>s</i>*sin30) is the <i>y</i>-coordinate at the position <i>s</i> along 7-8. I hope the diagram below helps.' },
            fig('t81af1', 'd81-academic-diagram', 'The academic’s diagram of the hexagonal section with points 2 to 8, the y-axis measured upwards from the horizontal centroidal axis, the distance L from the axis down to wall 7-8, and the 30 degree angle at point 8.', 'Diagram posted by the academic.'),
            { id: 't81a3', type: 'p', html: `<u>Green circled term</u> Yes, this sign is incorrect. The value of <i>q</i><sub>8</sub> has been calculated using the correct sign.` }
          ]},
          followUps: [{ author: STU, blocks: [{ id: 't81f2', type: 'p', html: 'Thank you very much, I hadn’t factored in the L/2 from the midline to point 8.' }] }]
        }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The questions students asked',
        html: '<p>Inclined walls cause trouble in three places: writing <i>y</i> along the wall, finding its second moment of area, and reading a solution that does both. These three threads cover each one.</p>',
        showQuestion: ['q2', 'q3', 't29q1'] },
      { id: 'i1', stage: 'predict', type: 'mcq', topic: 'Writing y along an inclined wall',
        figure: 'qf1',
        prompt: '<i>s</i><sub>1</sub> runs up the wall from point 2 to point 3. Which expression for <i>y</i> does the solution use?',
        options: [
          { id: 'a', html: '<i>y</i> = <i>s</i><sub>1</sub> − <i>d</i>√2/2', correct: true, refs: ['af1', 'a1', 'a2'] },
          { id: 'b', html: '<i>y</i> = <i>d</i>√2/2 − <i>s</i><sub>1</sub>', correct: false, refs: ['af1', 'a1', 'a2'], next: 'i1-branch' }
        ] },
      { id: 'i1-branch', stage: 'predict', type: 'mcq', branchOnly: true, assess: false, next: 'i2', topic: 'Checking a coordinate at a point',
        title: 'Check it at a point',
        html: '<p>The academic’s tip: check the expression at a point where you already know the answer.</p>',
        prompt: 'At point 2, <i>s</i><sub>1</sub> = 0. Which expression gives the correct <i>y</i> there (below the <i>x</i>-axis)?',
        options: [
          { id: 'a', html: '<i>y</i> = <i>s</i><sub>1</sub> − <i>d</i>√2/2, giving <i>y</i> = −<i>d</i>√2/2', correct: true, refs: ['a2'] },
          { id: 'b', html: '<i>y</i> = <i>d</i>√2/2 − <i>s</i><sub>1</sub>, giving <i>y</i> = +<i>d</i>√2/2', correct: false, refs: ['a2'] }
        ] },
      { id: 'i2', stage: 'predict', type: 'mcq', topic: 'Using bh³/12 for an inclined wall',
        prompt: `Can you use <i>bh</i><sup>3</sup>/12 + <i>A</i>(<i>dy</i>)<sup>2</sup> for each angled wall instead of integrating for ${N.Ix}?`,
        options: [
          { id: 'a', html: 'Yes, with <i>h</i> = the projected height in the <i>y</i>-direction (<i>d</i>/√2) and <i>b</i> = the wall thickness measured in the <i>x</i>-direction (<i>t</i>√2).', correct: true, refs: ['t29a1', 't29a2', 't29a3'] },
          { id: 'b', html: 'Yes, with <i>h</i> = <i>d</i> (the wall length) and <i>b</i> = <i>t</i>.', correct: false, refs: ['t29a1', 't29a2', 't29a3'] },
          { id: 'c', html: 'No. Inclined walls must always be integrated.', correct: false, refs: ['t29a1'] }
        ] },
      { id: 'i3', stage: 'feedback', type: 'mcq', title: 'Read a solution', topic: 'Interpreting (−L + s sin30)',
        figure: 't81f1',
        prompt: 'In 2020 Q2a, the red-circled term is (−<i>L</i> + <i>s</i> sin30). What is it?',
        options: [
          { id: 'a', html: 'The <i>y</i>-coordinate at position <i>s</i> along wall 7–8.', correct: true, refs: ['t81a2', 't81af1'] },
          { id: 'b', html: 'A mistake. It should be −<i>L</i> sinθ.', correct: false, refs: ['t81a2', 't81af1'] }
        ] },
      { id: 'i4', stage: 'feedback', type: 'mcq', title: 'Read a solution', topic: 'A sign slip in a solution',
        prompt: 'The student also queried the green-circled sign. What did the academic say?',
        options: [
          { id: 'a', html: `The sign is incorrect in that line, but <i>q</i><sub>8</sub> was calculated using the correct sign.`, correct: true, refs: ['t81a3'] },
          { id: 'b', html: 'The sign is correct as written.', correct: false, refs: ['t81a3'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Build the habit',
        recall: ['i1', 'i2', 'i3', 'i4'],
        prompt: 'Pick a coordinate expression from your own tutorial working. Check it at one point where you know <i>y</i>. Did it pass?',
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Grouping', item: 'Threads #29 (Tutorial 1 Q4, bh³/12) and #81 (2020 Q2a, coordinates) are combined with #64. Confirm.' },
      { area: 'Source', item: '#81 is a Structural Mechanics and Dynamics paper set by another member of staff. The setter’s name and signature have been cropped out. Confirm it can be used, and confirm the student’s unanswered question 1) can be left as posted.' },
      { area: 'Assessment', item: 'Confirm i1, i1-branch, i2, i3 and i4.' }
    ]
  });

  /* ---------------------------------------------------------------- #32 (+#80) */
  R.push({
    id: 'principal-axes', order: 11, status: 'awaiting-review', discussion: '32', pages: '33',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 'pre',
      title: 'Principal axes versus centroidal axes',
      summary: 'Are principal axes always the centroidal axes? Sort statements about centroidal and principal axes, then check how a solution confirms its axes are principal.',
      concepts: ['principal-axes', 'second-moment', 'parallel-axis', 'idealisation'],
      terms: ['principal axis', 'centroidal axis', 'Ixy = 0', 'product moment of area', 'Dx+', 'Dx-', '2020 Q1c', 'Structures 3 Pre-requisites section 6.5'],
      questions: [
        'Are principal axes always the same as the centroidal axes?',
        'What are Dx+ and Dx-?',
        'Do we not need the parallel axis theorem since we are not working with principal axes?',
        'How do I know the axes are principal?'
      ],
      difficulties: ['concept', 'misconceptions'],
      addresses: ['Treating "centroidal" and "principal" as the same thing'],
      objectives: [
        'Distinguish centroidal axes from principal axes',
        'Use Ixy = 0 to confirm that a pair of axes is principal',
        'Interpret Dx values either side of a boom'
      ],
      types: ['mcq', 'sort'], added: '2026-11-11'
    },
    card: { heading: 'Principal Axes', tagline: 'Centroidal is not the same as principal', intro: 'There are infinitely many centroidal axes. Only some are principal. Find out how to tell.', activity: 'MCQs + sorting statements', minutes: 6 },
    source: {
      title: 'question on principal axes', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [{ id: 'q1', type: 'p', html: 'are principal axis always the same as the centroidal axis?' }] },
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: 'A centroidal orthogonal pair of axes has the origin at the centroid of the cross-section. There are an infinite number of these centroidal axis pairs. (Think about a convenient centrodial axis set -most commonly vertical and horizontal - and then rotate this set about the origin to any angle to create another set.)' },
        { id: 'a2', type: 'p', html: `Principal axes are the centroidal axes which have the product moment of area, ${N.Ixy}, equal to zero. For determining the orientation of principal axes, please see section 6.5 of "Structures 3 Pre-requisites: what you need to know about beam theory from Structures 1" (and of course your lecture notes from the Structures 1 module).` }
      ]},
      threads: [
        { discussion: '80', pages: '94–96', title: '2020 Q1c (Structural Mechanics and Dynamics)',
          question: { author: STU, blocks: [
            { id: 't80q1', type: 'p', html: 'Hi Sir,' },
            fig('t80f1', 'd80-solution-extract', 'Handwritten solution: a five-boom section with booms of area B and 2B, an upward shear force Sy, widths 3, 2 and 1 and height 3. The centroid is 1 unit to the right of and 1.5 units above the left boom. Ixy = 3/2 × 1 × 2B + 3/2 × 1 × 2B minus 3/2 × 2 × B minus 3/2 × 2 × B = 0. Ixx = 27/2 B. Dx values listed boom by boom as 1−, 1+, 2−, 2+, 3−, 3+, 5+, 5− and so on, with q = 2 Sy Dx over 27 B.', 'Solution extract posted by the student.'),
            { id: 't80q2', type: 'p', html: 'What method is this, what is Dx+ and Dx-? And do we not need to use the parallel axis theorem since we are not working with the principal axis?' }
          ]},
          answer: { author: ACAD, blocks: [
            { id: 't80a1', type: 'p', html: `<i>D</i><sub>x+</sub> and <i>D</i><sub>x-</sub> refer to the ${N.Dx} values before and after the boom position.` },
            { id: 't80a2', type: 'p', html: `The calculation for ${N.Ixy} (immediately to the right of the diagram) shows this to be zero i.e. the horizontal and vertical centroidal axes are the principal axes.` }
          ]},
          followUps: [{ author: STU, blocks: [{ id: 't80f2', type: 'p', html: 'Thank you sir' }] }]
        }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The questions students asked',
        html: '<p>“Centroidal” and “principal” are easy to mix up, especially when a solution doesn’t say which axes it is using.</p>',
        showQuestion: ['q1', 't80q2'] },
      { id: 'p1', stage: 'predict', type: 'mcq', topic: 'Principal versus centroidal axes',
        prompt: 'Are principal axes always the same as the centroidal axes?',
        options: [
          { id: 'a', html: `No. There are infinitely many centroidal axis pairs. The principal axes are the centroidal pair with ${N.Ixy} = 0.`, correct: true, refs: ['a1', 'a2'] },
          { id: 'b', html: 'Yes. Any axes through the centroid are principal axes.', correct: false, refs: ['a1', 'a2'] },
          { id: 'c', html: 'No. Principal axes don’t pass through the centroid.', correct: false, refs: ['a2'] }
        ] },
      { id: 'p2', stage: 'interact', type: 'sort', title: 'Sort the statements', topic: 'Centroidal and principal axes',
        prompt: 'Which statements match the academic’s answer?',
        categories: [{ id: 'yes', label: 'Matches' }, { id: 'no', label: 'Does not match' }],
        items: [
          { html: 'A centroidal orthogonal pair of axes has its origin at the centroid of the cross-section.', cat: 'yes' },
          { html: 'Each cross-section has exactly one pair of centroidal axes.', cat: 'no' },
          { html: 'Rotating a convenient centroidal pair about the origin gives another centroidal pair.', cat: 'yes' },
          { html: `Principal axes are the centroidal axes with ${N.Ixy} = 0.`, cat: 'yes' }
        ],
        refs: ['a1', 'a2'] },
      { id: 'p3', stage: 'feedback', type: 'mcq', title: 'Read a solution', topic: 'Confirming the axes are principal',
        figure: 't80f1',
        prompt: 'In this 2020 Q1c solution, how do you know the horizontal and vertical centroidal axes are principal?',
        options: [
          { id: 'a', html: `The ${N.Ixy} calculation next to the diagram gives zero.`, correct: true, refs: ['t80a2'] },
          { id: 'b', html: 'Horizontal and vertical axes are always principal.', correct: false, refs: ['a1', 'a2', 't80a2'] }
        ] },
      { id: 'p4', stage: 'feedback', type: 'mcq', title: 'Read a solution', topic: 'Dx+ and Dx−',
        prompt: `What do <i>D</i><sub>x+</sub> and <i>D</i><sub>x−</sub> mean in this solution?`,
        options: [
          { id: 'a', html: `The ${N.Dx} values before and after the boom position.`, correct: true, refs: ['t80a1'] },
          { id: 'b', html: `The positive and negative parts of ${N.Dx}.`, correct: false, refs: ['t80a1'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Check your next solution',
        recall: ['p1', 'p2', 'p3', 'p4'],
        prompt: 'Before using the simple bending and shear flow formulas, what will you check about your axes, and how?',
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Grouping', item: 'Thread #80 (2020 Q1c, Ixy = 0, Dx+ and Dx−) is combined with #32. Confirm.' },
      { area: 'Source', item: '#80 is a Structural Mechanics and Dynamics paper. Confirm the solution extract can be reused.' },
      { area: 'Assessment', item: 'Confirm p1–p4. Distractor p3(b) was written for the activity.' }
    ]
  });

  /* ---------------------------------------------------------------- #38 (+#82) */
  R.push({
    id: 'torsion-constant-midline', order: 12, status: 'awaiting-review', discussion: '38', pages: '42–43',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't1',
      title: 'Midline dimensions, corners and the torsion constant J',
      summary: 'Should you subtract the corner overlaps when you calculate J from midline dimensions? Learn why the answer is no, and how to approach sections with open and closed parts under torsion.',
      concepts: ['torsion-constant', 'thin-wall-approx', 'torsion', 'open-section', 'closed-section'],
      terms: ['J', 'midline dimensions', 'corners', 'soap film', 'membrane analogy', 'Peery', '2017 B Q1', 'Bredt-Batho', 'open and closed parts'],
      questions: [
        'When should I subtract the corners when calculating J?',
        'Why are the corners neglected in J when midline dimensions are used?',
        'Is it a good thing to ignore corners when the analysis is based on parts without corners?',
        'Can I assume the closed cell carries all the torque?'
      ],
      difficulties: ['assumptions', 'calculations', 'concept'],
      addresses: ['Correcting for corner overlaps that the method already ignores', 'Assuming one part of a section carries all the torque'],
      objectives: [
        'Calculate J for an open section from midline dimensions without corner adjustment',
        'Explain the approximation behind ignoring the corners',
        'Recognise when a question expects you to assess the contributions of open and closed parts'
      ],
      types: ['mcq', 'sort'], added: '2026-11-11'
    },
    card: { heading: 'Torsion Constant J', tagline: 'What about the corners?', intro: 'Should you subtract the corner overlaps from J? And can a closed cell take all the torque?', activity: 'MCQs + sorting statements', minutes: 8 },
    source: {
      title: 'Midline dimensions for J', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'q1', type: 'p', html: 'Good morning,' },
        { id: 'q2', type: 'p', html: 'I am not sure about when to subtract corners or not for J. In 2017 B q1 we need to calculate the J constant for the maximum shear stress, and here I subtracted the corners from the calculation as shown below in the figure attached. However in the answers this corners are neglected. Why is this?' },
        { id: 'q3', type: 'p', html: 'All dimensions given are midline dimensions.' },
        { id: 'q4', type: 'p', html: 'Thank you!' },
        fig('qf1', 'd38-student-working', 'Student’s working: J open = 1/3 times the integral of t cubed ds = [4 cubed (60 minus 1 + 30 minus 1) + 2 cubed (120 minus 2)] times 1/3 = 2240 mm to the fourth, with the corner lengths struck through in red. theta dash = T over JG = 50 over 2240 × 10^-12 × 80 × 10^9 = 0.279 rad/m. A sketch of the section with the corner overlaps highlighted in orange.', 'Working posted by the student, subtracting the corner overlaps.')
      ]},
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: 'You will recall from the lecture notes for Lecture Topic 1 where we used the membrane (soap film analogy), that we made an approximation that the soap film was prismatic along the length of the midline of a wall with constant thickness i.e. we ignored the curvature of the film that occurs at the ends and corners of a section. This approximation becomes more accurate the thinner the wall is in comparison to its length. (There is some data which assesses the level of approximation for single straight walls in "Aircraft Structures" by David J. Peery (Mineola, N.Y. : Dover Publications; 2011) - this is available online in our library.' },
        { id: 'a2', type: 'p', html: 'We have chosen to approximate an open section using the midline dimensions for the torsional analysis but it is worth noting that this is not universally adopted. Peery’s book contains an example of an unequal thin-walled I-section subjected to torsion in which the section is broken down into thin rectangular elements and the torsion constant is calculated as the sum of the torsion constants of each of these thin rectangular elements. This will give an expression for the total J which is different from the one that results from using the midline dimensions but for thin-walled sections the difference will be small. (Peery also considers the same thin walled ‘split’ circular section that is included in our lecture notes and for this he uses the midline dimension.)' },
        { id: 'a3', type: 'p', html: 'You are suggesting, I believe, that you could choose the length of each straight side such that there is no overlap between the individual thin rectangles at the intersection points. This approach could be used but, again, it should result in only a slight difference in the torsion constant from that using the midline dimensions provided that the section is thin walled.' }
      ]},
      followUps: [
        { author: STU, blocks: [{ id: 'f1', type: 'p', html: 'The question said midline dimensions if I’m not mistaken' }] },
        { author: ACAD, blocks: [
          { id: 'b1', type: 'p', html: 'As both [student] and you have said, the dimensions given in this exam question are midline dimensions.' },
          { id: 'b2', type: 'p', html: 'When calculating J we use the midline dimensions without any adjustment for the corners. Please see the example on page 25 of the notes for Lecture Topic 1.' }
        ]},
        { author: STU, blocks: [{ id: 'f2', type: 'p', html: 'Hello, Thank you and [student] for the answer, however I do not really understand the significance of not subtracting the corners even in midline dimensions. If you look at the figure I drew above even midline dimensions "interact" with corners and therefore I understand that we should be taking these out. Is it because we assume the thickness is so small in comparison to the length that we do not take the corners away? And if so, is that a good thing to do knowing that our analysis is based on parts which do not have corners or "edges"? Thank you' }] }
      ],
      threads: [
        { discussion: '82', pages: '101–102', title: 'Shear Flow',
          question: { author: STU, blocks: [
            { id: 't82q1', type: 'p', html: 'Would an answer like this be sufficient in our exam?' },
            fig('t82f1', 'd82-question-and-answer', 'Exam question: iii. If the structure is loaded by a pure torsion, T, it can be assumed this will be carried by a constant shear flow around the closed cell only. Use the Bredt-Batho theory to find the shear flow, q0, in the closed-section. [4%]. The figure shows a section with a closed square cell of side l joined to an open part, wall thicknesses t l/2, and an idealised version with booms B1 to B6. The student’s answer: From the Bredt-Batho theory q = T over 2A = T over 2a squared.', 'Exam question and the student’s answer, as posted.')
          ]},
          answer: { author: ACAD, blocks: [{ id: 't82a1', type: 'p', html: 'No, you should not make this assumption unless you are directed to do so in the question. For our module, a question which involves open and closed parts in a section subjected to torsion is most often seeking to establish that you can assess the relative contributions of those parts.' }] },
          followUps: [{ author: STU, blocks: [{ id: 't82f2', type: 'p', html: 'Thank you sir' }] }]
        }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The questions students asked',
        html: '<p>For a thin-walled open section, J is calculated from the midline dimensions. Where walls meet, the thin rectangles overlap at the corners. Should you correct for that?</p>',
        showQuestion: ['q2', 'qf1'] },
      { id: 'j1', stage: 'predict', type: 'mcq', topic: 'Corners in J with midline dimensions',
        prompt: 'The dimensions given are midline dimensions. When calculating J, do you subtract the corner overlaps?',
        options: [
          { id: 'a', html: 'No. Use the midline dimensions without any adjustment for the corners.', correct: true, refs: ['b1', 'b2'] },
          { id: 'b', html: 'Yes. Otherwise the corners are counted twice.', correct: false, refs: ['b2'], next: 'j1-branch' }
        ] },
      { id: 'j1-branch', stage: 'predict', type: 'mcq', branchOnly: true, assess: false, next: 'j2', topic: 'How big is the difference?',
        title: 'How much would it change?',
        html: '<p>The academic acknowledged the no-overlap approach as an option.</p>',
        prompt: 'If you chose side lengths with no overlap, how would the torsion constant compare with the midline result for a thin-walled section?',
        options: [
          { id: 'a', html: 'Only slightly different.', correct: true, refs: ['a3'] },
          { id: 'b', html: 'Very different. The midline result would be wrong.', correct: false, refs: ['a3'] }
        ] },
      { id: 'j2', stage: 'predict', type: 'mcq', topic: 'Why the corners can be ignored',
        prompt: 'Why is it acceptable to ignore the corners?',
        options: [
          { id: 'a', html: 'The soap film analogy already assumes the film is prismatic along each wall midline, ignoring the curvature at ends and corners. This is more accurate the thinner the wall is compared with its length.', correct: true, refs: ['a1'] },
          { id: 'b', html: 'Corners carry no shear stress in torsion.', correct: false, refs: ['a1'] },
          { id: 'c', html: 'It is an exam convention with no physical basis.', correct: false, refs: ['a1', 'a2'] }
        ] },
      { id: 'j3', stage: 'feedback', type: 'sort', title: 'Sort the statements', topic: 'Approaches to J for thin-walled sections',
        prompt: 'Which statements match the academic’s answer?',
        categories: [{ id: 'yes', label: 'Matches' }, { id: 'no', label: 'Does not match' }],
        items: [
          { html: 'Using midline dimensions for torsion is not universally adopted.', cat: 'yes' },
          { html: 'Summing the torsion constants of thin rectangular elements gives a different J, but the difference is small for thin-walled sections.', cat: 'yes' },
          { html: 'Choosing side lengths with no overlap gives a very different J from the midline approach.', cat: 'no' },
          { html: 'In this module, J is calculated from midline dimensions without corner adjustment.', cat: 'yes' }
        ],
        refs: ['a2', 'a3', 'b2'] },
      { id: 'j4', stage: 'feedback', type: 'mcq', title: 'Knowledge check', topic: 'Open and closed parts under torsion',
        figure: 't82f1',
        prompt: 'A section with open and closed parts carries a pure torque. In general, can you assume the closed cell carries all of it?',
        options: [
          { id: 'a', html: 'Only if the question directs you to. These questions are usually testing whether you can assess the relative contributions of the parts.', correct: true, refs: ['t82a1'] },
          { id: 'b', html: 'Yes. The open parts are always negligible in torsion.', correct: false, refs: ['t82a1'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Answer the follow-up',
        recall: ['j1', 'j2', 'j3', 'j4'],
        prompt: 'The student’s last follow-up asked: <em>is it a good thing to ignore corners, knowing our analysis is based on parts without corners?</em> Using the academic’s first answer, what would you say?',
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Grouping', item: 'Thread #82 (open and closed parts under torsion) is combined with #38. Confirm.' },
      { area: 'Context', item: 'In #82, the quoted exam question appears to say the torque "can be assumed" to be carried by the closed cell. The academic replied that the assumption should not be made unless directed. j4 is phrased generally to avoid the apparent conflict. Confirm the intended context.' },
      { area: 'Source', item: 'The student’s last follow-up in #38 has no reply in the PDF. It is used as the reflection prompt.' },
      { area: 'Assessment', item: 'Confirm j1, j1-branch, j2, j3 and j4.' }
    ]
  });

  /* ---------------------------------------------------------------- #37 (+#56) */
  R.push({
    id: 'enclosed-area', order: 13, status: 'awaiting-review', discussion: '37', pages: '40–41',
    meta: {
      subject: 'structures', module: 'structures-3', topic: 't2',
      title: 'Which area is A in 2Aq0?',
      summary: 'A is the area enclosed by the midline of the wall. Work it out for the two examples a student asked about, and see where the J equation for a single cell comes from.',
      concepts: ['enclosed-area', 'torsion', 'closed-section', 'basic-shear-flow', 'torsion-constant'],
      terms: ['A', '2Aq0', 'area enclosed by the midline', '2b^2', 'd^2/2', 'Lecture Topic 4 page 20', 'Tutorial 1 Q4', 'Lecture Topic 2 page 4', 'J single cell'],
      questions: [
        'How is the area A determined when finding q0?',
        'How is the area 2b^2 in the Lecture Topic 4 example?',
        'Why is A = d^2/2 in Tutorial 1 Q4?',
        'Where does the equation for J of a single cell closed section come from?'
      ],
      difficulties: ['equations', 'calculations'],
      addresses: ['Using the wrong area in 2Aq0'],
      objectives: [
        'Define A as the area enclosed by the wall midline',
        'Calculate A for rectangular and triangular single cells from midline dimensions'
      ],
      types: ['mcq'], added: '2026-11-11'
    },
    card: { heading: 'Enclosed Area A', tagline: 'Which area?', intro: 'The A in 2Aq0 is the area enclosed by the midline. Practise on the two examples a student asked about.', activity: 'MCQs', minutes: 5 },
    source: {
      title: 'Area for finding q0', board: 'Lectures & Tutorials',
      question: { author: STU, blocks: [
        { id: 'q1', type: 'p', html: 'Hi Sir,' },
        { id: 'q2', type: 'p', html: 'This is the second time I am a bit confused regarding the area when finding q0 in, one in the tutorial and one in here. Like how is it actually determined?' },
        { id: 'q2m', type: 'math', html: `<i>Fx</i> = 2<i>Aq</i><sub>0</sub> + ${N.oint} <i>pq</i><sub>b</sub><i>ds</i>`, label: 'F x equals 2 A q 0 plus the closed integral of p q b d s' },
        fig('qf1', 'd37-lecture-example', 'Lecture Topic 4, page 20 extract: a rectangular single cell idealised into six booms, height 2b and width b, with a vertical force F. 3-4: Dx = plus 7/6 t b squared minus 5/6 t b (minus b) = 2 t b squared, so qb = 2 t b squared over 4 t b cubed times Fy = Fy over 2b. The qb diagram shows 7/24 Fy/b at top and bottom. To find q0, take moments about point 4 of (q0 + qb) and equate to the moment of Fy: q0 times 2b times b times 2 + 7/24 Fy/b times b times 2b = 0, with "2b . b" underlined in green. q0 = minus 7/48 Fy/b. Therefore q = q0 + qb.', 'Lecture Topic 4, page 20 example, as posted by the student.'),
        { id: 'q3', type: 'p', html: '1) Could you explain how the area here is 2b^2? (Lecture Topic 4, page 20)' },
        fig('qf2', 'd37-tutorial-extract', 'Tutorial 1 Q4 solution extract: A = d squared over 2, boxed in green. 0 = F d over 2(root 2 + 1) + q0 d squared, so q0 = minus F over 2(root 2 + 1) d, about minus 0.207 F over d. A triangular section with the total shear flow sketched: 0.207, 0.414 and 0.154 F over d.', 'Tutorial 1 Q4 solution, as posted by the student.'),
        { id: 'q4', type: 'p', html: '2) Same question here for Tutorial 1 Q4.' },
        { id: 'q5', type: 'p', html: 'Thanks a lot.' }
      ]},
      answer: { author: ACAD, blocks: [
        { id: 'a1', type: 'p', html: 'Hi, <i>A</i> is the area enclosed by the midline of the wall. (See Lecture Topic 2, page 4.)' },
        { id: 'a2', type: 'p', html: 'For the example from Lecture Topic 4, page 20, the rectangular tube has midline dimensions of height 2<i>b</i> and width <i>b</i>. Hence <i>A</i> = 2<i>b</i><sup>2</sup>.' },
        { id: 'a3', type: 'p', html: 'For Q4 from tutorial 1, the triangular tube has midline dimensions of height d and base d. Hence <i>A</i> = <i>d</i><sup>2</sup>/2' }
      ]},
      threads: [
        { discussion: '56', pages: '78–79', title: '2015 Q3 a) iii',
          question: { author: STU, blocks: [
            { id: 't56q1', type: 'p', html: 'Hi prof' },
            { id: 't56q2', type: 'p', html: 'Where did you get this equation from?' },
            fig('t56f1', 'd56-student-working', 'Solution extract: open part (1): J = 1/3 × 30 × 2 cubed × 2 = 160 mm to the fourth. Closed cell (2): J = 4 A squared over the closed integral of ds over t, circled in red.', 'Solution extract posted by the student, with the J equation circled.'),
            { id: 't56q3', type: 'note', html: '[The student also asked about past paper questions on warping. That part of the thread is in the module information entry “What’s examinable”.]' }
          ]},
          followUps: [
            { author: STU, blocks: [{ id: 't56r1', type: 'p', html: '[Another student replied:] lecture 2' }] },
            { author: STU, blocks: [{ id: 't56r2', type: 'p', html: 'Thanks' }] }
          ],
          answer: { author: ACAD, blocks: [{ id: 't56a1', type: 'p', html: 'Thanks, [student], that is correct. Page 6 of the lecture notes for Topic 2 shows the derivation of this equation for J of a single cell closed section.' }] }
        }
      ]
    },
    steps: [
      { id: 'explore', stage: 'explore', type: 'intro', title: 'The question a student asked',
        html: `<p>The torsional equivalence equation for a single cell contains the term 2<i>A</i>${N.q0}. A student wasn’t sure which area <i>A</i> is, after meeting it in a lecture example and a tutorial.</p>`,
        showQuestion: ['q2', 'q2m'] },
      { id: 'e1', stage: 'predict', type: 'mcq', topic: 'What A is',
        prompt: `What is <i>A</i> in 2<i>A</i>${N.q0}?`,
        options: [
          { id: 'a', html: 'The area enclosed by the midline of the wall.', correct: true, refs: ['a1'] },
          { id: 'b', html: 'The cross-sectional area of the wall material.', correct: false, refs: ['a1'] },
          { id: 'c', html: 'The total boom area.', correct: false, refs: ['a1'] }
        ] },
      { id: 'e2', stage: 'interact', type: 'mcq', title: 'Lecture Topic 4, page 20', topic: 'A for a rectangular cell',
        figure: 'qf1',
        prompt: 'The rectangular tube has midline dimensions of height 2<i>b</i> and width <i>b</i>. What is <i>A</i>?',
        options: [
          { id: 'a', html: '2<i>b</i><sup>2</sup>', correct: true, refs: ['a2'] },
          { id: 'b', html: '<i>b</i><sup>2</sup>', correct: false, refs: ['a2'] },
          { id: 'c', html: '4<i>b</i><sup>2</sup>', correct: false, refs: ['a2'] }
        ] },
      { id: 'e3', stage: 'interact', type: 'mcq', title: 'Tutorial 1 Q4', topic: 'A for a triangular cell',
        figure: 'qf2',
        prompt: 'The triangular tube has midline dimensions of height <i>d</i> and base <i>d</i>. What is <i>A</i>?',
        options: [
          { id: 'a', html: '<i>d</i><sup>2</sup>/2', correct: true, refs: ['a3'] },
          { id: 'b', html: '<i>d</i><sup>2</sup>', correct: false, refs: ['a3'] },
          { id: 'c', html: '√2 <i>d</i><sup>2</sup>/2', correct: false, refs: ['a3'] }
        ] },
      { id: 'reflect', stage: 'reflect', type: 'reflect', title: 'Where else does A appear?',
        recall: ['e1', 'e2', 'e3'],
        figure: 't56f1',
        prompt: 'A also appears in the torsion constant J for a single cell closed section, derived on page 6 of the Topic 2 notes. Write down where you have used the enclosed area so far in the module.',
        reveal: 'full' }
    ],
    review: [
      META_REVIEW,
      { area: 'Grouping', item: 'Thread #56 (J of a single cell) is included here. Its second part (warping in past papers) is in the module information entry. Confirm.' },
      { area: 'Assessment', item: 'Confirm e1–e3. Distractors were written for the activity.' },
      { area: 'Anonymisation', item: 'Several names in this part of the PDF were already blank in the source. Remaining student names are replaced with [student].' }
    ]
  });
})();
