# Interaction rationale

Each FAQ was matched to the learning problem behind the student's question. We did not apply one format to all three.

All three activities follow the same sequence: **Explore → Predict → Interact → Feedback → Reflect**. Students commit to an answer before they see the academic's explanation. The feedback is always the academic's own words, quoted verbatim and visually separated from the added activity text.

## 1. Shear stress distribution (Discussion #11): branching scenario + interactive diagram

**Learning problem.** The student was mixing up two loading cases: a shear force through the shear centre (no twist, uniform τ = q/t) and a torque (twist, τ linear across the wall). They also had an intuition that moving F<sub>y</sub> must change the shear flow. That is half right: q doesn't change, but τ does.

**Why this format.**
- *Prediction questions* expose the specific misconception before any explanation is shown.
- *Branching* sends a wrong answer to a different path instead of just marking it. Choosing "the section twists" leads to the academic's practical single-wall beam example. Choosing "linear across the thickness" leads to a question that separates torque from shear.
- *Deferred predictions* (p3, p4) are locked in before the diagram and only checked afterwards. The student then sees the result as a test of their own prediction.
- *The interactive diagram* splits the load into "F<sub>y</sub> through the shear centre + torque F<sub>y</sub>·d", which is the decomposition in the academic's Lecture Topic 3 figure. The shear-flow indicator stays fixed while the twist and stress indicators change.
- *Reflection* returns to the student's own sketches and asks which part of their intuition was right.

**Limits.** The diagram is qualitative. Indicator wording is taken from the lecture figure. Twist angle and stress magnitudes are fixed schematic values until the academic approves a rule.

## 2. Thin-walled approximation (Discussion #15): parameter explorer + MCQs

**Learning problem.** The question was about whether an approximation is valid. Which term is dropped, how much it matters, and when a wall is "thin enough". The academic answered by asking the student to work out the percentage change, which suggests the aim is understanding, not a memorised threshold.

**Why this format.**
- *MCQs* (m1, m2) check whether the student can say which term is included (parallel axis) and which is neglected (own centroidal axis, t³). That can be tested without a long written answer.
- *A prediction* (m3) about the size of the effect comes before the calculation.
- *Sliders* let the student answer the academic's question themselves and then push the geometry towards h/t = 10 to see where the approximation starts to matter.
- *The h/t gauge* shows the academic's "> 20 for vertical loading (sometimes > 10)" in context as a convention, not a rule. m4 tests that reading directly.

**Limits.** The calculation is a draft pending verification. The σ<sub>z</sub> check the academic mentions is a marked placeholder.

## 3. Boom and shear panel idealisation (Discussion #21): diagram classification + knowledge checks

**Learning problem.** The student couldn't map the idealised model onto the real structure. Why does a 2 mm panel not count towards I<sub>x</sub>? The follow-up about cut position shows a second confusion, between basic and total shear flow.

**Why this format.**
- *Click-to-identify and classify* puts the distinction the academic draws (direct-stress-carrying booms versus shear panels) on the diagram itself. Keyboard and touch users select an item and press "Place selected here". Desktop users can also drag.
- *Knowledge checks* (k1–k3) cover the three things the academic explains: what contributes to I<sub>x</sub> and D<sub>x</sub>, why the thickness is given (q<sub>0</sub>), and why the force is vertical (shear centre on the axis of symmetry).
- *The cut-position explorer* lets the student try all four cut positions against the academic's statement that the basic shear flow changes but the total does not. No values are shown until the academic supplies approved distributions.
- *The recap* lists any elements the student misclassified on the first check.

## Cross-cutting design decisions

- **Provenance is always visible.** Tinted blocks are verbatim source material. Added prompts carry an "Added for revision" label, and a header toggle outlines every added element for reviewers.
- **No penalty.** Every question has "Try again". The summary reports first attempts only so students can see where to revise. Every activity can be restarted.
- **Review status is part of the product.** Each activity has a status (Draft → Awaiting academic review → Approved) shown on its card. The in-app Review checklist lists what needs sign-off.
