/*
 * FAQ content: Discussion #11 — Shear stress distribution along section
 * ---------------------------------------------------------------------
 * CONTENT RULES (see docs/ADDING_FAQS.md)
 *  - source.*  : verbatim from the discussion board, anonymised. Do not edit wording.
 *  - steps.*   : activity text written for this resource. Everything here is
 *                "added content" and must be approved by the academic.
 *  - refs      : ids of source paragraphs/figures quoted as feedback.
 */
window.FAQ_REGISTRY = window.FAQ_REGISTRY || [];
window.FAQ_REGISTRY.push({
  id: "shear-centre",
  order: 1,
  status: "awaiting-review", // draft | awaiting-review | approved
  discussion: "11",
  pages: "3–5",
  title: "Shear stress distribution",

  /* Library metadata: drives search, filters and recommendations. */
  meta: {
    subject: "structures", module: "structures-3", topic: "t3",
    title: "Why the section twists when the shear force moves",
    summary: "Predict what happens when a shear force acts through, or away from, the shear centre of a channel section, then test your predictions on a diagram.",
    concepts: ["shear-centre", "torsion", "shear-flow", "shear-stress", "open-section", "superposition"],
    terms: ["line of action", "Fy", "Dx", "rate of twist", "dθ/dz", "q = Fy Dx / Ix", "channel section"],
    questions: [
      "Why is the shear stress constant through the thickness of the wall?",
      "Would the shear stress be different if the force did not act through the shear centre?",
      "Why doesn't the shear flow change when I move the force?",
      "Why does the beam twist when I move the force?",
      "Why is the torque resultant of the shear flow only equivalent to the applied shear force if it acts through the shear centre?",
      "What is the difference between shear due to a shear force and shear due to torque?"
    ],
    difficulties: ["visualising", "misconceptions", "concept"],
    addresses: [
      "Telling apart the stress from a shear force and the stress from a torque",
      "What changes, and what stays the same, when the force moves away from the shear centre"
    ],
    objectives: [
      "Describe whether an open section twists when a shear force acts through its shear centre",
      "Distinguish the uniform shear stress due to shear flow from the linearly varying stress due to torque",
      "Explain why the shear flow is unchanged but the shear stresses change when the force moves"
    ],
    types: ["branching", "simulation"],
    added: "2026-11-04"
  },
  card: {
    heading: "Shear Stress Distribution",
    tagline: "Explore a branching scenario",
    intro: "Why is shear stress from a shear force treated as constant through the wall thickness, and why doesn't the shear flow change when the force moves?",
    activity: "Branching scenario + interactive diagram",
    minutes: 10
  },

  source: {
    title: "Shear stress distribution along section",
    board: "Lectures & Tutorials",
    question: {
      author: "Student (anonymised)",
      blocks: [
        { id: "q1", type: "p", html: "Hi [academic]," },
        { id: "q2", type: "p", html: "On topic 3, we learnt the following:" },
        { id: "q2f", type: "note", html: "[The student pasted the first panel of the Lecture Topic 3 figure here. The full figure appears in the academic's answer below.]" },
        { id: "q3", type: "p", html: "First question: Why is the shear stress distribution constant along the thickness of the section when applying a shear force (would it be different if <i>F<sub>y</sub></i> were not to act through the shear centre?)? I think I'm getting confused with applying a torque and how the shear stress varies linearly..." },
        { id: "q4", type: "p", html: "Question 2: I'm also confused why the shear flow does not change with respect to the position of <i>F<sub>y</sub></i>, i.e. if shear flow in an open section (in principal axes) is given by:" },
        { id: "q4e", type: "math", html: "<i>q</i> = <span class=\"frac\"><span><i>F<sub>y</sub></i></span><span><i>I<sub>x</sub></i></span></span> <i>D<sub>x</sub></i>", label: "q equals F y over I x, times D x" },
        { id: "q5", type: "p", html: "we are taking <i>F<sub>y</sub></i> to be constant, as if it were the same shear force that each section sees irrespective of where the <i>F<sub>y</sub></i> acts." },
        { id: "qf1", type: "figure", src: "assets/figures/d11-student-sketches.webp",
          alt: "Student's hand sketches: two C-sections with a vertical force Fy acting at different positions, and two square-cornered channel sections with points labelled 1, 2, 3 and 4, again with Fy at different positions.",
          caption: "Student's sketches (original post)." },
        { id: "q6", type: "p", html: "In the above picture, if we take the 2 sections on the RHS, and we do <i>q</i> = (<i>F<sub>y</sub></i>/<i>I<sub>x</sub></i>) <i>D<sub>x</sub></i>, then the only thing that changes from 2-1, 1-3, 3-4 would be the <i>D<sub>x</sub></i> term, and the position of <i>F<sub>y</sub></i> would not be reflected, so on the 2 sections on the RHS the <i>q</i> for the section 1-3 would be the same, but if <i>F<sub>y</sub></i> is acting at different points, then intuitively in real life I'd think that the shear flow, hence shear stresses must be different." },
        { id: "q7", type: "p", html: "Thanks!" }
      ]
    },
    answer: {
      author: "Academic (module staff)",
      blocks: [
        { id: "a1", type: "p", html: "For your first question: in the first lecture topic we saw that if an open thin-walled section is subjected to torque, then the section will twist (as we expect) and we found that the shear stress acting on the wall cross section parallel to the wall mid-line is zero on the mid-line and varies linearly across the wall thickness." },
        { id: "a2", type: "p", html: "If a shear force is applied through the shear centre, then there is no twist of the section (by definition of the shear centre). We know that twist of the open section is associated with a linearly varying shear stress over the wall thickness and so we know (from lecture topic 1) that there will be&nbsp;no shear stresses due to twisting." },
        { id: "a3", type: "p", html: "You can also think about this practically; consider a beam with a single vertical wall like the one below. Imagine that you marked a rectangular grid on each of the longitudinal faces. If a shear force is now applied through the shear centre (in this case aligned with the midline of the wall), the beam will deflect vertically but will not twist and so we would expect that the shear deformation of the grid on each side of the wall will be the same." },
        { id: "af1", type: "figure", src: "assets/figures/d11-academic-beam-grid.webp",
          alt: "A cantilever beam consisting of a single thin vertical wall, fixed at the left. A vertical load P acts upward at the free end. The two longitudinal faces are labelled Face A and Face B.",
          caption: "Academic's figure: single-wall cantilever with load P, Face A and Face B." },
        { id: "a4", type: "p", html: "For your second question, as you correctly state, the shear flow in an open section does not change if you change the line of action of the applied shear force. However, as shown in the full figure from Lecture Topic 3 (see below, compare the first image, with the shear force through the shear centre, and the third image, with the shear force at distance <i>d</i> from the shear centre), the shear stresses <u>do</u> change as they will be the superposition of the uniform shear stress due to the shear flow and the linearly varying stress due to the torque." },
        { id: "af2", type: "figure", src: "assets/figures/d11-academic-lecture-figure.webp",
          alt: "Lecture Topic 3 figure in three panels joined by plus and equals signs. Panel 1: C-section with Fy acting upward through the shear centre, which lies outside the section to the left of the web. Beneath: dθ/dz = 0; q ≠ 0; τ = q/t, sketched as uniform across the wall. Panel 2: the same section under a torque Fy·d. Beneath: dθ/dz ≠ 0; q = 0; τ sketched as varying linearly across the wall. Panel 3: Fy acting at distance d from the shear centre. Beneath, with handwritten notes: dθ/dz ≠ 0 (due to Fy·d); q ≠ 0 (equal to that due to Fy acting through the shear centre); τ: superposition of the constant & linearly varying components.",
          caption: "Full figure from Lecture Topic 3, with the academic's handwritten annotations." },
        { id: "a5", type: "p", html: "I hope the above clears up these issues for you." }
      ]
    },
    followUps: [],
    threads: [
      { discussion: "24", pages: "24", title: "L3 slide 12 shear centre for open tube",
        question: { author: "Student (anonymised)", blocks: [
          { id: "t24q1", type: "p", html: "Hi sir, hope you are well. I don't really understand the explanation for this slide about why the force resultant. torque resultant of the shear flow is only equivalent to to that from the applied shear force if the shear force is through he shear centre?" }
        ]},
        answer: { author: "Academic (module staff)", blocks: [
          { id: "t24a1", type: "p", html: "Hi," },
          { id: "t24a2", type: "p", html: "Please take a look at the thread entitled \"Shear stress distribution along section\" and let me know if you are still not clear about this issue." }
        ]}
      }
    ]
  },

  steps: [
    {
      id: "explore", stage: "explore", type: "intro",
      title: "The question a student asked",
      html: "<p>A thin-walled open section (a channel) carries a vertical shear force <i>F<sub>y</sub></i>. A student asked two things about it on the discussion board. You'll make predictions about each one, then test them on a diagram and compare them with the academic's answer.</p>",
      showQuestion: ["q3", "q4", "q4e", "q5"]
    },
    {
      id: "p1", stage: "predict", type: "mcq", topic: "Twist when the force acts through the shear centre",
      prompt: "<i>F<sub>y</sub></i> acts through the shear centre. Does the section twist?",
      options: [
        { id: "a", html: "No. The section deflects but does not twist.", correct: true, refs: ["a2"] },
        { id: "b", html: "Yes, a little, because the section is open.", correct: false, refs: ["a2"], next: "p1-branch" },
        { id: "c", html: "It depends on how thick the walls are.", correct: false, refs: ["a2"], next: "p1-branch" }
      ]
    },
    {
      id: "p1-branch", stage: "predict", type: "mcq", branchOnly: true, assess: false, next: "p2",
      topic: "Practical check: the single-wall beam",
      title: "Try it a different way",
      html: "<p>The academic suggested a practical way to think about this. Look at the single-wall beam below.</p>",
      figure: "af1",
      prompt: "Imagine a rectangular grid marked on Face A and Face B. A shear force acts through the shear centre, which for this beam is aligned with the midline of the wall. How would the grid deform on the two faces?",
      options: [
        { id: "a", html: "The same on both faces.", correct: true, refs: ["a3"] },
        { id: "b", html: "Differently on each face.", correct: false, refs: ["a3"] }
      ]
    },
    {
      id: "p2", stage: "predict", type: "mcq", topic: "Shear stress across the wall thickness",
      prompt: "With <i>F<sub>y</sub></i> through the shear centre, how does the shear stress vary across the wall thickness?",
      options: [
        { id: "a", html: "It is uniform across the thickness: <i>τ</i> = <i>q</i>/<i>t</i>.", correct: true, refs: ["a2", "af2"] },
        { id: "b", html: "It is zero on the mid-line and varies linearly across the thickness.", correct: false, refs: ["a1", "a2"], next: "p2-branch" }
      ]
    },
    {
      id: "p2-branch", stage: "predict", type: "mcq", branchOnly: true, assess: false, next: "p3",
      topic: "Which loading causes the linear distribution?",
      title: "Where does the linear distribution come from?",
      html: "<p>The pattern you chose does appear in the course, but under a different loading.</p>",
      prompt: "Which loading produces a shear stress that is zero on the mid-line and varies linearly across the wall thickness?",
      options: [
        { id: "a", html: "A torque, which makes the open section twist.", correct: true, refs: ["a1", "a2"] },
        { id: "b", html: "A shear force through the shear centre.", correct: false, refs: ["a2"] }
      ]
    },
    {
      id: "p3", stage: "predict", type: "mcq", defer: true, topic: "Shear flow when the force moves",
      title: "Now move the force",
      html: "<p>The force now acts a distance <i>d</i> from the shear centre. Lock in your predictions. You'll check them after you explore the diagram.</p>",
      prompt: "What happens to the shear flow <i>q</i>?",
      options: [
        { id: "a", html: "It stays the same as when <i>F<sub>y</sub></i> acts through the shear centre.", correct: true, refs: ["a4"] },
        { id: "b", html: "It increases as <i>d</i> increases.", correct: false, refs: ["a4"] },
        { id: "c", html: "It becomes zero.", correct: false, refs: ["a4", "af2"] }
      ]
    },
    {
      id: "p4", stage: "predict", type: "mcq", defer: true, topic: "Shear stress when the force moves",
      prompt: "What happens to the shear stresses in the wall?",
      options: [
        { id: "a", html: "Nothing. They are the same, because <i>q</i> is the same.", correct: false, refs: ["a4"] },
        { id: "b", html: "They change. They are a superposition of a uniform part and a linearly varying part.", correct: true, refs: ["a4", "af2"] },
        { id: "c", html: "They become purely linear across the thickness.", correct: false, refs: ["a4", "af2"] }
      ]
    },
    {
      id: "explorer", stage: "interact", type: "widget", widget: "shear-centre",
      title: "Move the line of action",
      html: "<p>Drag the force arrow, or use the slider. Watch how the load splits into a shear force through the shear centre plus a torque <i>F<sub>y</sub></i>·<i>d</i>, and how each indicator responds.</p>",
      config: {}
    },
    {
      id: "check", stage: "feedback", type: "feedback", questions: ["p3", "p4"],
      title: "Check your predictions"
    },
    {
      id: "reflect", stage: "reflect", type: "reflect",
      title: "Go back to the student's sketches",
      recall: ["p1", "p2", "p3", "p4"],
      figure: "qf1",
      prompt: "The student thought that if <i>F<sub>y</sub></i> acts at different points, the shear flow and the shear stresses must be different. In your own words, which part of that is right and which part isn't?",
      reveal: "full"
    }
  ],

  review: [
    { area: "Library metadata", item: "Title, summary, learning objectives, sticking points, concept tags, difficulty tags and alternative search phrasings (meta block) were written for the library. Confirm they are accurate and that the objectives match the module's learning outcomes." },
    { area: "Diagram", item: "C-section redraw: shape, proportions and position of the shear centre (drawn to the left of the web, matching the Lecture Topic 3 figure)." },
    { area: "Simulation rule", item: "Twist is shown at one fixed, exaggerated angle whenever d ≠ 0. Its direction follows the sense of Fy·d. The size does not scale with d. Confirm, or supply an approved rule." },
    { area: "Simulation rule", item: "The 'stress through the wall' strip shows a fixed linear component added to a uniform one when d ≠ 0, flipping with the sign of d. Its magnitude is schematic. Confirm which face sees the larger stress for each sign of d." },
    { area: "Diagram", item: "Torque arrow size scales with |d| (statics: T = Fy·d). Confirm this is acceptable." },
    { area: "Assessment", item: "Answer options and correct answers for p1, p1-branch, p2, p2-branch, p3 and p4 were written from the academic's text. Confirm each correct answer and each distractor." },
    { area: "Transcription", item: "Alt text for the Lecture Topic 3 figure transcribes the handwritten annotations. Check it is accurate." },
    { area: "Attribution", item: "Confirm whether the academic wishes to be named. They currently appear as 'Academic (module staff)', and the salutation is replaced with [academic]." }
  ]
});
