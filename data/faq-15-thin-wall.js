/*
 * FAQ content: Discussion #15 — Tutorial 3, Ex 1, Ix (thin-walled approximation)
 * See data/faq-11-shear-centre.js for the content rules.
 */
window.FAQ_REGISTRY = window.FAQ_REGISTRY || [];
window.FAQ_REGISTRY.push({
  id: "thin-wall",
  order: 2,
  status: "awaiting-review",
  discussion: "15",
  pages: "12–13",
  title: "Thin-walled approximation",

  meta: {
    subject: "structures", module: "structures-3", topic: "pre",
    title: "When is a wall thin enough to neglect t³ terms?",
    summary: "Find out which second-moment terms the thin-walled method leaves out, measure how much difference they make, and see where the usual height-to-thickness guideline sits.",
    concepts: ["thin-wall-approx", "second-moment", "parallel-axis", "bending"],
    terms: ["Ix", "bh³/12", "midline dimensions", "h/t > 20", "Tutorial 3 Exercise 1", "box section"],
    questions: [
      "Is it ok to omit the Ix of the top and bottom walls?",
      "When can we assume the thickness is thin enough?",
      "When can I ignore the thickness in calculations?",
      "Why is there no extra term for the Ixx of the flanges about their own centroidal axes in Tutorial Sheet 1 Q2?",
      "Why does my Ix differ from the solution?",
      "What percentage difference does the thin-walled approximation make?"
    ],
    difficulties: ["assumptions", "equations", "calculations"],
    addresses: [
      "Which contributions to Ix are kept and which are neglected",
      "Treating h/t > 20 as a guideline to check, rather than a fixed rule"
    ],
    objectives: [
      "Identify the parallel-axis and own-axis contributions of each wall to Ix",
      "Evaluate the percentage change in Ix caused by the thin-walled approximation",
      "Judge whether the approximation is reasonable for a given section"
    ],
    types: ["calculator", "mcq"],
    added: "2026-11-04"
  },
  card: {
    heading: "Thin-Walled Sections",
    tagline: "Test an approximation",
    intro: "Which terms in I<sub>x</sub> are left out for a thin-walled box section, how much difference does it make, and when is a wall thin enough?",
    activity: "Parameter explorer + MCQs",
    minutes: 12
  },

  source: {
    title: "Tutorial 3 - Ex 1 Ix",
    board: "Lectures & Tutorials",
    question: {
      author: "Student (anonymised)",
      blocks: [
        { id: "q1", type: "p", html: "Helo [academic]," },
        { id: "q2", type: "p", html: "I was doing exercise 1 on tutorial 3 when I realise that the <i>I<sub>x</sub></i> term in the solutions does not take into account the <i>I<sub>x</sub></i> of the top and bottom bars. I understand this is because the thickness is cube from <i>I<sub>x, rectangle</sub></i> = <span class=\"frac\"><span><i>bh</i><sup>3</sup></span><span>12</span></span> but since it is finite here I still used it and get a different value. Is this something ok to omit? When can we assume the thickness is thin enough?" },
        { id: "q3", type: "p", html: "Thank you," },
        { id: "qf1", type: "figure", src: "assets/figures/d15-student-working.webp",
          alt: "Handwritten working titled 'Ix calc', noting '(midline dimensions!)'. A rectangular box section 300 wide and 100 high. Ix = (5 × 100³ / 12) × 2 + 300 × 5 × 50² × 2 = 8.333 × 10⁶ mm⁴. Page marker 2/9.",
          caption: "Working posted with the question (midline dimensions)." }
      ]
    },
    answer: {
      author: "Academic (module staff)",
      blocks: [
        { id: "b0", type: "p", html: "Hi [student]," },
        { id: "b1", type: "p", html: "I do include the parallel axis contribution of the top and bottom walls in my calculation of <i>I<sub>x</sub></i>. The part that is not included is the <i>I<sub>x</sub></i> value of each of these walls about its own centroidal axis (since this would involve the cube of the wall thickness)." },
        { id: "b2", type: "p", html: "When you included these missing parts in your calculation, what was the percentage change in <i>I<sub>x</sub></i>?" },
        { id: "b3", type: "p", html: "You ask when the thickness is thin enough (to use the thin walled approximation). Typically, people take a beam section as thin walled if the height of the section/wall thickness &gt;20 for vertical loading (but sometimes I have seen &gt;10). You could do a check to evaluate the effect of the thin-walled approximation on <i>I<sub>x</sub></i> and sigma<sub>z</sub>." }
      ]
    },
    followUps: [],
    threads: [
      { discussion: "51", pages: "70–71", title: "Tutorial Sheet 1 Q2",
        question: { author: "Student (anonymised)", blocks: [
          { id: "t51q1", type: "p", html: "Hello Professor," },
          { id: "t51q2", type: "p", html: "In the solutions for question 2 in tutorial sheet 1, im not sure how the results for Ixx and Iyy were obtained. For example, the step for Ixx in the solution sheet has (7th^3)/12, however i get an extra term that comes from the Ixx values of the individual flanges about their centroidal axes." },
          { id: "t51q3", type: "p", html: "Thank you; I hope you had a wonderful Christmas break" }
        ]},
        answer: { author: "Academic (module staff)", blocks: [
          { id: "t51a1", type: "p", html: "Hi," },
          { id: "t51a2", type: "p", html: "Thank you - I hope you had a good Christmas holiday too." },
          { id: "t51a3", type: "p", html: "I am using the thin wall approximations here - see section 7 of the lecture notes \"Pre-requisites...\"." },
          { id: "t51a4", type: "p", html: "Please also look at the discussion thread entitled \"Tutorial 3 - Ex 1 Ix\"." }
        ]}
      }
    ]
  },

  steps: [
    {
      id: "explore", stage: "explore", type: "intro",
      title: "The question a student asked",
      html: "<p>Tutorial 3, Exercise 1 uses a rectangular box section with 5&nbsp;mm walls, measured on the wall midlines. The worked value of <i>I<sub>x</sub></i> leaves out some terms. A student wanted to know whether that was acceptable.</p>",
      showQuestion: ["q2", "qf1"]
    },
    {
      id: "m1", stage: "predict", type: "mcq", topic: "Which top/bottom wall term is included",
      prompt: "In the worked solution, which contribution of the top and bottom walls <em>is</em> included in <i>I<sub>x</sub></i>?",
      options: [
        { id: "a", html: "The parallel-axis contribution, <i>b t</i> (<i>h</i>/2)<sup>2</sup> for each wall.", correct: true, refs: ["b1"] },
        { id: "b", html: "Each wall's <i>I<sub>x</sub></i> about its own centroidal axis, <i>b t</i><sup>3</sup>/12.", correct: false, refs: ["b1"] },
        { id: "c", html: "Neither. Only the vertical walls are included.", correct: false, refs: ["b1", "qf1"] }
      ]
    },
    {
      id: "m2", stage: "predict", type: "mcq", topic: "Which term is neglected, and why",
      prompt: "Which part is left out, and why?",
      options: [
        { id: "a", html: "Each top/bottom wall's <i>I<sub>x</sub></i> about its own centroidal axis, because it involves the cube of the wall thickness.", correct: true, refs: ["b1"] },
        { id: "b", html: "The parallel-axis term, because the walls are thin.", correct: false, refs: ["b1"] },
        { id: "c", html: "The vertical walls, because they are thin.", correct: false, refs: ["b1", "qf1"] }
      ]
    },
    {
      id: "m3", stage: "predict", type: "mcq", defer: true, topic: "Size of the effect for the tutorial section",
      title: "Make a prediction",
      html: "<p>The academic asked the student a question back: <em>what was the percentage change?</em> Predict it before you calculate it.</p>",
      prompt: "For the tutorial section (300 × 100&nbsp;mm midline, <i>t</i> = 5&nbsp;mm), how much does <i>I<sub>x</sub></i> change if you add the neglected terms?",
      options: [
        { id: "a", html: "Less than 1%", correct: true, refs: ["b2"], computed: true },
        { id: "b", html: "Between 1% and 10%", correct: false, refs: ["b2"], computed: true },
        { id: "c", html: "More than 10%", correct: false, refs: ["b2"], computed: true }
      ]
    },
    {
      id: "explorer", stage: "interact", type: "widget", widget: "thin-wall",
      title: "Explore the approximation",
      html: "<p>Change the section's width, height and wall thickness. Compare <i>I<sub>x</sub></i> with and without the neglected terms, and watch where the height-to-thickness ratio sits.</p>",
      config: {
        preset: { b: 300, h: 100, t: 5 },
        ranges: { b: [100, 600, 10], h: [40, 400, 10], t: [1, 40, 0.5] },
        thresholds: [10, 20]
      }
    },
    {
      id: "check", stage: "feedback", type: "feedback", questions: ["m3"],
      title: "Check your prediction"
    },
    {
      id: "m4", stage: "feedback", type: "mcq", topic: "How to treat the h/t > 20 guideline",
      prompt: "The academic mentions height/thickness &gt; 20 (and sometimes &gt; 10). How should you use this?",
      options: [
        { id: "a", html: "As a typical convention, then check the effect of the approximation for your own section.", correct: true, refs: ["b3"] },
        { id: "b", html: "As a strict rule: below 20 the thin-walled method is wrong.", correct: false, refs: ["b3"] },
        { id: "c", html: "As a ratio that applies whatever the loading direction.", correct: false, refs: ["b3"] }
      ]
    },
    {
      id: "reflect", stage: "reflect", type: "reflect",
      title: "Answer the academic's question",
      recall: ["m1", "m2", "m3", "m4"],
      prompt: "The academic asked: <em>what was the percentage change in I<sub>x</sub>?</em> Write down your answer from the explorer. Then try a section with height/thickness close to 10. Does your conclusion change?",
      placeholder: {
        title: "Effect on σ<sub>z</sub>: awaiting academic input",
        html: "The academic also suggests checking the effect on sigma<sub>z</sub>. That needs an approved bending moment, loading case and stress calculation, so it isn't modelled here yet."
      },
      reveal: "full"
    }
  ],

  review: [
    { area: "Library metadata", item: "Title, summary, learning objectives, sticking points, concept tags, difficulty tags and alternative search phrasings (meta block) were written for the library. Confirm they are accurate and that the objectives match the module's learning outcomes." },
    { area: "Calculation", item: "Thin-walled I_x = 2·(t·h³/12) + 2·(b·t·(h/2)²), using midline dimensions as in the posted working. Default values reproduce 8.333 × 10⁶ mm⁴. Verify." },
    { area: "Calculation", item: "Neglected term = 2·(b·t³/12) (each top/bottom wall about its own centroidal axis). Verify." },
    { area: "Calculation", item: "Percentage change is defined as (I_with − I_thin) / I_thin × 100. Confirm this is the definition the academic intended." },
    { area: "Calculation", item: "The model ignores corner overlap and the difference between midline and outer dimensions. Confirm whether a note or extra option is needed." },
    { area: "Parameter range", item: "Slider ranges: b 100–600 mm, h 40–400 mm, t 1–40 mm. Approve, or set permitted ranges." },
    { area: "Context", item: "The h/t > 20 (sometimes > 10) guidance is shown for vertical loading only, quoting the academic. Confirm the wording on the ratio gauge." },
    { area: "Assessment", item: "m3's correct answer (< 1%) is computed from the model (0.075% at the tutorial values). Confirm." },
    { area: "Placeholder", item: "The σ_z comparison is not built yet. Supply the loading case and an approved calculation." },
    { area: "Assessment", item: "Confirm options and correct answers for m1, m2 and m4." }
  ]
});
