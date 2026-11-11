# Beat Your Best: gamified knowledge challenge

This is an alternative, single-player version of the Structures 3 revision resource. It uses the same academic-sourced content as the Revision Library and keeps the same rules: academic answers are quoted verbatim, students are anonymised, added content is labelled, and everything is **awaiting academic review**.

Entry point: `game.html`. Single-file build: `dist/beat-your-best.html`.

## What students do

Students compete only with their own previous attempts. There is no multiplayer, no leaderboard, no timer and no speed bonus. The home page tracks three personal goals:

| Goal | How it is measured |
|---|---|
| Beat your previous score | A personal best is stored for each mode and challenge, and the results page compares the new score with it |
| Improve your mastery | Each concept is rated *Secure*, *Developing* or *Needs work* from the student's last five answers on it |
| Complete new challenges | 25 milestones: Foundation, Application and Reasoning for each topic |

## Modes

| Mode | Length and mix | Notes |
|---|---|---|
| **Quick Challenge** | 5 questions: 2 Foundation, 2 Application, 1 Reasoning | Drawn from the whole bank. Explanation after every answer, then a summary |
| **Topic Challenge** | Up to 10 questions (3/4/3), ordered Foundation → Application → Reasoning | Smaller topics use what's available. The results show concept mastery and milestones for the topic |
| **Beat Your Best** | 5 defined challenges: four with 8 questions (3/3/2) and *Whole Module Mix* with 10 (4/4/2) | Same rules, same level mix and same maximum score every attempt. Questions are drawn fresh each time, avoiding the previous attempt's, so students improve understanding rather than memory of answers. Results show the previous best on the score bar |
| **Knowledge Recovery** | Up to 6 due concepts per session | Leitner spaced repetition. Each item starts with the academic's explanation, then asks a *different* question on the same concept (the same question, reshuffled, only when no other question exists) |
| **Final Challenge** | 20 questions (6/8/6), stratified across topics | Breakdown by level, topic and question type, concept mastery, and study suggestions that link to the matching Revision Library activities |

### Spaced repetition (Knowledge Recovery)

- A question scoring under 80% adds its first two key concepts to the recovery list (box 1, due next session).
- A correct recovery answer (80% or more) moves the concept up a box. The review intervals are box 1 next session, box 2 after 1 day, box 3 after 3 days, box 4 after 7 days and box 5 after 16 days. A correct answer in box 5 removes it ("recovered").
- A miss sends it back to box 1.

## Scoring (assumed: section 6 of the brief was cut off)

The brief stopped at the heading "Scoring and personal progression", so these rules are proposals:

- **Points by level:** Foundation 100, Application 150, Reasoning 200. One attempt per question.
- **Partial credit:**
  - **Multiple choice:** right or wrong.
  - **Select all that apply:** (correct choices − incorrect choices) ÷ number of correct options, floored at 0.
  - **True/false with reasoning:** half for true/false, half for the reason.
  - **Classify and matching:** the share of items placed correctly.
  - **Sequencing:** the share of consecutive pairs in the academic's order, so one misplaced step doesn't zero the score.
  - **Numerical:** 80% for a value within tolerance and 20% for the unit, or 100% for the value when only one unit makes sense. Accepted formats include `8.333e6`, `8.333×10^6` and `−7 500`.
- **Mastery:** the mean of the last 5 results per concept. *Secure* needs at least 3 answers and a mean of 80% or more; *Developing* is 50–79%. Milestones use the same rule per topic and level.

To change any of these, edit the constants at the top of `game/engine.js` (`LEVELS`, `INTERVAL_DAYS`, `CHALLENGES`, the `*_MIX` objects) and the "How scoring works" page in the same file.

## Question bank

`game/bank.js` builds `window.GAME_BANK` from two sources:

1. **The library activities' checked steps** (single and select-all MCQ, classify, sequencing), converted automatically. Editing an activity updates the game. Open-ended steps (widgets, reflections) are not used.
   - **Steps that refer back** ("these integrals", "this solution") carry the previous step's prompt and figure as a *Follows on from* panel.
   - **Level rule.** This is provisional; set `level: 1|2|3` on a step to override it.
     - **Level 1:** branch questions and predict/explore steps.
     - **Level 3:** sequencing, select-all, classifying 5+ statements, and feedback-stage questions on a real exam or tutorial solution.
     - **Level 2:** everything else.
2. **`game/questions-extra.js`:** 29 questions in the formats the activities don't cover. All are labelled *Question written from the academic's explanation · awaiting review*:
   - 11 numerical (with tolerances, unit checking and worked solutions)
   - 10 true/false with reasoning
   - 3 matching
   - 5 predict-the-outcome / scenario
   - Values chosen for a question (e.g. *b* = 50 mm) are stated in a `note`.

Every question has:

- `refs`: the exact source blocks used as its explanation (shown verbatim after answering)
- `src`: the PDF discussion number and pages (derived from the refs)
- `origin`: `activity:<id>/<step>` or `new`

The **Reviewer view** (footer link) lists every question with:

- its answer key, level, origin, concepts and source
- a *Try it (not scored)* link
- a *View source* dialog with the passages highlighted
- a JSON export

`tests/game-bank.js` checks that:

- every ref resolves
- each single-answer question has exactly one key
- numerical questions have worked solutions
- every challenge's level mix can be drawn at least 1.5× over, for variety

`build.py` runs it and writes `docs/QUESTION_BANK.md` as a tick-box review list.

### Current bank

124 questions from 43 discussion threads: 59 Foundation, 38 Application and 27 Reasoning. By type: 86 multiple choice (including 5 predict/scenario), 4 select-all, 7 classify, 3 sequencing, 3 matching, 10 true/false with reasoning, and 11 numerical.

## Items for academic review (in addition to docs/REVIEW_CHECKLIST.md)

- [ ] The scoring rules above (section 6 of the brief was missing).
- [ ] Levels for converted activity steps (rule-based).
- [ ] The 29 added questions in `game/questions-extra.js`: answer keys, distractors, tolerances, chosen values and worked solutions.
- [ ] `n-ix-pct` relies on the draft "neglected terms" calculation from the Thin-Walled Sections activity, which is itself awaiting verification.
- [ ] `tf-zstart` paraphrases the academic's reply in #43 ("you can choose where to start z"). Confirm the wording.
- [ ] Whether to name the academic.

## Accessibility and privacy

- **Accessibility:**
  - Native controls are used for every interaction: radios, checkboxes, selects, a text input, and buttons for reordering.
  - The heading receives focus on each new question and on feedback. Score and position use text as well as colour.
  - Contrast is ≥ 4.5:1 in both themes, including the level badges.
  - Reduced motion disables the new-best animation.
  - There is no horizontal scrolling at 375 px.
- **Privacy:** progress is stored only in `localStorage` (`beat-your-best-v1`). There are no accounts, analytics or network calls, and *My progress → Clear my progress* removes everything.
