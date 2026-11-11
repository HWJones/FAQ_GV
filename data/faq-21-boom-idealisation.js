/*
 * FAQ content: Discussion #21 — Tutorial 1 Q6 (boom and shear panel idealisation)
 * See data/faq-11-shear-centre.js for the content rules.
 */
window.FAQ_REGISTRY = window.FAQ_REGISTRY || [];
window.FAQ_REGISTRY.push({
  id: "boom-idealisation",
  order: 3,
  status: "awaiting-review",
  discussion: "21",
  pages: "17–19",
  title: "Boom and shear panel idealisation",

  meta: {
    subject: "structures", module: "structures-3", topic: "t4",
    title: "Booms, shear panels and where to cut a closed section",
    summary: "Classify each element of an idealised closed section, check what contributes to Ix and Dx, and explore what changes when you cut the section in a different panel.",
    concepts: ["idealisation", "direct-stress", "shear-flow", "closed-section", "symmetry", "shear-centre", "second-moment"],
    terms: ["Ix", "Dx", "q0", "qb", "basic shear flow", "total shear flow", "Tutorial 1 Q6", "2 mm panels"],
    questions: [
      "Why are only the booms considered when calculating Ix and Dx?",
      "Why is the panel thickness given if it isn't used?",
      "Why is the force assumed to be in the y-direction?",
      "Does the shear flow depend on where the cut is taken?",
      "Which parts of the structure carry the load?"
    ],
    difficulties: ["concept", "visualising", "misconceptions"],
    addresses: [
      "The different roles of booms and shear panels in an idealised section",
      "The difference between basic and total shear flow when the cut moves"
    ],
    objectives: [
      "Classify booms and shear panels by the stresses they carry in the idealisation",
      "Explain why the panel thickness is needed for q0 but not for Ix and Dx",
      "State how the basic and total shear flow depend on the cut position"
    ],
    types: ["diagram", "mcq"],
    added: "2026-11-04"
  },
  card: {
    heading: "Boom and Shear Panel Idealisation",
    tagline: "Explore a structural diagram",
    intro: "Why do only the booms count towards I<sub>x</sub> and D<sub>x</sub>, why is the force vertical, and what changes when you move the cut?",
    activity: "Diagram classification + knowledge checks",
    minutes: 10
  },

  source: {
    title: "Tutorial 1 Q6",
    board: "Lectures & Tutorials",
    question: {
      author: "Student (anonymous on the board)",
      blocks: [
        { id: "q1", type: "p", html: "Hi Sir," },
        { id: "q2", type: "p", html: "In the solution to question 6 on Tutorial 1, why have only the booms been considered when calculating I_x and D_x and not the shear panels as well? They are said to have a thickness of 2mm, so would they not play a role as well?" },
        { id: "q3", type: "p", html: "Furthermore, why is the force assumed to be in the y-direction, since it does not specify this in the question?" },
        { id: "q4", type: "p", html: "Thank you." },
        { id: "qf1", type: "figure", src: "assets/figures/d21-tutorial-solution.webp",
          alt: "Handwritten tutorial solution headed '6. Boom-shear panel idealization (already idealised!)'. A four-boom closed section, 800 wide. Booms 2 and 3 on the left are 500 mm² at ±100 mm. Booms 1 and 4 on the right are 200 mm² at ±200 mm. A vertical force F is applied, with s measured from boom 1. Ix = (500 × 100² + 200 × 200²) × 2. Basic shear flow q_b = (F/Ix) Dx, with Dx for panels 1-2, 2-3, 3-4 and 4-1, and the note 'walls only effective in resisting shear stress'.",
          caption: "Tutorial 1 Q6 solution, as shown in the discussion thread." }
      ]
    },
    answer: {
      author: "Academic (module staff)",
      blocks: [
        { id: "c1", type: "p", html: "This section is a boom shear panel idealization. Only the direct stress carrying parts contribute to <i>I<sub>x</sub></i> and <i>D<sub>x</sub></i>, i.e. only the booms." },
        { id: "c2", type: "p", html: "The thickness is specified because this is needed when calculating <i>q</i><sub>0</sub>. (Actually, in this case I could have simply specified that the wall thickness is constant throughout as it will cancel in the <i>q</i><sub>0</sub> calculation.)" },
        { id: "c3", type: "p", html: "We are asked to find the shear centre. We know this lies on the axis of symmetry (i.e. <i>y</i> = 0) and so we need to find the <i>x</i> location. To do this we must apply a vertical shear force as shown in the solution." }
      ]
    },
    followUps: [
      { author: "Student (anonymous on the board)", blocks: [
        { id: "f1", type: "p", html: "Thank you." },
        { id: "f2", type: "p", html: "I further wanted to clarify, in boom idealisation problems, wouldn't the calculated D_x values and thus shear flows differ depending on where the cut is taken?" }
      ]},
      { author: "Academic (module staff)", blocks: [
        { id: "c4", type: "p", html: "Yes, for a boom shear panel idealisation of a closed tube, the basic shear flow will change dependent on where you 'cut' the section. However, the total shear flow will be the same regardless of where the section is 'cut'. (The same applies to non-idealised sections.)" }
      ]}
    ],
    annotations: [
      { id: "sol-note", type: "p", html: "walls only effective in resisting shear stress", label: "Annotation in the tutorial solution" }
    ]
  },

  steps: [
    {
      id: "explore", stage: "explore", type: "intro",
      title: "The question a student asked",
      html: "<p>Tutorial 1, Question 6 gives a closed section that is already idealised into booms and shear panels. The panels have a stated thickness of 2&nbsp;mm, yet the solution leaves them out of <i>I<sub>x</sub></i> and <i>D<sub>x</sub></i>. Start by sorting out what each part of the idealisation does.</p>",
      showQuestion: ["q2", "q3"]
    },
    {
      id: "classify", stage: "interact", type: "widget", widget: "boom-section",
      title: "Identify and classify each element",
      html: "<p>Select an element on the diagram or in the list, then choose its role. On a desktop you can also drag items into a group. When every element is placed, check your answers.</p>",
      config: { mode: "classify" },
      topic: "Classifying booms and shear panels",
      refs: ["c1", "sol-note"]
    },
    {
      id: "k1", stage: "feedback", type: "mcq", title: "Knowledge check", topic: "What contributes to Ix and Dx",
      prompt: "Which elements contribute to <i>I<sub>x</sub></i> and <i>D<sub>x</sub></i> in this idealisation?",
      options: [
        { id: "a", html: "The booms only.", correct: true, refs: ["c1"] },
        { id: "b", html: "The booms and the shear panels.", correct: false, refs: ["c1", "sol-note"] },
        { id: "c", html: "The booms, plus the panels in proportion to their 2&nbsp;mm thickness.", correct: false, refs: ["c1", "c2"] }
      ]
    },
    {
      id: "k2", stage: "feedback", type: "mcq", title: "Knowledge check", topic: "Why the panel thickness is given",
      prompt: "If the panels don't contribute to <i>I<sub>x</sub></i>, why is their thickness given?",
      options: [
        { id: "a", html: "It is needed to calculate <i>q</i><sub>0</sub>.", correct: true, refs: ["c2"] },
        { id: "b", html: "It adds a small correction to <i>I<sub>x</sub></i>.", correct: false, refs: ["c1", "c2"] },
        { id: "c", html: "It is needed to find the direct stress in the panels.", correct: false, refs: ["c1", "sol-note"] }
      ]
    },
    {
      id: "k3", stage: "feedback", type: "mcq", title: "Knowledge check", topic: "Why the force is vertical",
      prompt: "The question doesn't say which way the force acts. Why does the solution apply it in the <i>y</i>-direction?",
      options: [
        { id: "a", html: "The shear centre lies on the axis of symmetry (<i>y</i> = 0), so only its <i>x</i> location is unknown. A vertical force finds it.", correct: true, refs: ["c3"] },
        { id: "b", html: "A vertical force is the convention whenever a direction isn't given.", correct: false, refs: ["c3"] },
        { id: "c", html: "A vertical force gives the largest shear flow.", correct: false, refs: ["c3"] }
      ]
    },
    {
      id: "k4", stage: "predict", type: "mcq", defer: true, topic: "Effect of the cut position",
      title: "Predict: moving the cut",
      html: "<p>To find the shear flow in a closed section, you 'cut' it at one point. Lock in a prediction before you try different cut positions.</p>",
      prompt: "If you take the cut in a different panel, what happens?",
      options: [
        { id: "a", html: "The basic shear flow changes, but the total shear flow is the same.", correct: true, refs: ["c4"] },
        { id: "b", html: "Both the basic and the total shear flow change.", correct: false, refs: ["c4"] },
        { id: "c", html: "Neither changes.", correct: false, refs: ["c4"] },
        { id: "d", html: "The total shear flow changes, but the basic shear flow is the same.", correct: false, refs: ["c4"] }
      ]
    },
    {
      id: "cut", stage: "interact", type: "widget", widget: "boom-section",
      title: "Try different cut positions",
      html: "<p>Choose where to cut the closed section. The diagram marks the cut and shows what the academic says about each shear flow.</p>",
      config: { mode: "cut" }
    },
    {
      id: "check", stage: "feedback", type: "feedback", questions: ["k4"],
      title: "Check your prediction"
    },
    {
      id: "reflect", stage: "reflect", type: "reflect",
      title: "Recap",
      recall: ["k1", "k2", "k3", "k4"],
      recapClassify: "classify",
      prompt: "Explain to another student why the 2&nbsp;mm panel thickness appears in the question but not in <i>I<sub>x</sub></i>.",
      reveal: "full"
    }
  ],

  review: [
    { area: "Library metadata", item: "Title, summary, learning objectives, sticking points, concept tags, difficulty tags and alternative search phrasings (meta block) were written for the library. Confirm they are accurate and that the objectives match the module's learning outcomes." },
    { area: "Diagram", item: "Section redrawn from the tutorial solution: booms 2 and 3 (500 mm², y = ±100 mm) and booms 1 and 4 (200 mm², y = ±200 mm), 800 mm apart. Not to scale vertically. Approve the redraw, or supply an approved diagram." },
    { area: "Diagram", item: "The force arrow position is indicative only (the solution sketch shows F near boom 1). Confirm." },
    { area: "Classification", item: "Group labels: 'Direct stress carrying (booms)' and 'Shear panels: only effective in resisting shear stress' (from the solution annotation). Confirm the wording." },
    { area: "Placeholder", item: "The cut-position explorer shows qualitative statements from the academic's reply only. Approved q_b distributions for each cut position are needed before any values are shown." },
    { area: "Assessment", item: "Confirm options and correct answers for k1–k4 and the classification key." },
    { area: "Source", item: "The question figure is the handwritten tutorial solution. Confirm that it can be reused, or supply a clean version." }
  ]
});
