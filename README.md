# Structures Revision Library (FAQ Lab prototype)

An R&D prototype from Engineering EdTech (Digital Media). It turns every thread on the 2023/24 Structures 3 Lectures & Tutorials discussion board into a searchable revision library. The academic's original answers are the feedback. The tool does not generate new engineering explanations.

**Contents:** 26 resources built from all 52 threads in the PDF:

- **23 interactive activities.** Related threads are grouped where they cover the same concept.
- **3 quick answers** for module and exam information.

They are organised by the lecture topics the academic refers to (Topics 1–8 plus the section-properties prerequisites). See `docs/CONTENT_MAP.md` for which thread went where.

**Alternative version: Beat Your Best** (`game.html`). A single-player knowledge challenge built from the same content: five modes, eight question types, personal bests, concept mastery and spaced repetition. See `docs/GAME.md`.

**Status of every resource: Awaiting academic review.** Don't release to students until the items in `docs/REVIEW_CHECKLIST.md` are signed off.

## Components

Every activity follows Explore → Predict → Interact → Feedback → Reflect and is built from the same reusable step types:

| Step type | What the student does |
|---|---|
| `intro` | Reads the student's original question (excerpt) |
| `mcq` | Single answer, or select-all (`multi: true`). Can branch to a remedial step, or defer feedback until after exploring |
| `sort` | Places each statement in a group, using radio buttons per statement (keyboard and touch friendly) |
| `order` | Puts the academic's method into sequence with move-up/move-down buttons |
| `widget` | Interactive diagram (three bespoke widgets, used in the first three activities) |
| `feedback` | Compares deferred predictions with the academic's explanation |
| `reflect` | Recalls earlier answers, writes a reflection, reveals the full original answers |

Feedback always quotes the academic verbatim. Added activity text is labelled, and "Highlight added content" in the footer outlines all of it.

## Design choices: speed, accessibility, clarity, consistency

- **Speed:** system font stack (no web-font requests), WebP figures (about 1 MB for 50+ figures), lazy-loaded images, no frameworks or external scripts.
- **Accessibility (WCAG 2.2 AA):** ≥ 4.5:1 text contrast in light and dark themes, 24 px minimum targets, visible focus, the ARIA combobox pattern for search, native form controls for every question type, live-region feedback, and alt text for every figure. Tested at 360/375/390/1280 px with no horizontal scrolling.
- **Visual clarity:** one token set for colour, type and space. Verbatim source is always shown in the same tinted block, added content in the same amber notice, and status in the same badge.
- **Component consistency:** `css/styles.css` defines each component once (button, badge, chip, card, option, notice, source block, figure) and every view reuses them.

## Structure

```
index.html                 entry page (loads taxonomy, content, widgets, discovery, engine)
data/taxonomy.js           subjects > modules > topics, difficulty categories, types, concepts + synonyms + cues
js/catalogue.js            merges activities and quick answers into one resource list
js/search.js               local search (synonyms, spelling tolerance, difficulty cues); plug-in providers
js/library.js              home, library/search, filters, previews, find help, my revision, related
tests/search-eval.js       search quality benchmark (node tests/search-eval.js)
css/styles.css             all styling, light + dark themes
data/faq-*.js              CONTENT ONLY: activities grouped by topic (source threads, steps, metadata, review items)
data/notation.js           shared maths notation (q_b, q̄_0, ∮ …) so symbols render identically
js/widgets/*.js            interactive diagrams, referenced by name from content files
js/core.js                 engine: routing, step types, feedback, summary, review page
game.html                  Beat Your Best entry page (reuses data/ and css/styles.css)
game/questions-extra.js    numerical, true/false, matching, scenario questions (with source refs)
game/bank.js               builds the question bank from activities + extra questions
game/engine.js             modes, scoring, mastery, spaced repetition, reviewer view
css/game.css               game-only components
tests/game-bank.js         question bank integrity checks (node tests/game-bank.js)
assets/figures/*.png       figures cropped from the original PDF (student names excluded)
build.py                   bundles everything into one self-contained HTML file
docs/                      rationale, review checklist, guide to adding FAQs
```

Content and logic are separate. Each `data/*.js` file is a JSON-shaped object passed to `window.FAQ_REGISTRY.push(...)`. It uses a script file rather than a `.json` fetch so the resource also works when opened from disk or uploaded to Canvas as a single file.

## Running it

- **Locally:** open `index.html` in a browser. No server or build is needed.
- **GitHub Pages / any static host:** upload the folder as is.
- **Single file:** run `python3 build.py`. This writes `dist/thin-walled-faq-lab.html` and `dist/beat-your-best.html`, with CSS, JS, data and figures all inlined (about 1.8 MB each). Use them for Canvas file upload or email. Add `--library-url <url>` so the game's study suggestions link to a hosted copy of the library.
- **Canvas:** either link to the hosted URL, embed it with an iframe in a Canvas page (if your instance allows external iframes), or upload the single-file build to Files and link to it.

## Data and privacy

- No accounts, no analytics and no network calls.
- Activity progress, reflections, saved items and recently viewed are kept in this browser's `localStorage`, so students can return to them. They are never sent anywhere, and "My revision" has a "Clear my progress" button. Search text is used only on the device.
- Student names were removed from the source text and figures. Salutations to the academic appear as `[academic]`. Confirm whether the academic wishes to be named.

## Docs

- `docs/NAVIGATION.md`: student journeys, UX decisions, accessibility, information architecture
- `docs/SEARCH.md`: how search works, the evaluation benchmark, and adding semantic search later
- `docs/CONTENT_MAP.md`: every thread and the resource it appears in (generated)
- `docs/RATIONALE.md`: why each FAQ gets the interaction it does
- `docs/REVIEW_CHECKLIST.md`: everything that needs academic validation
- `docs/ADDING_FAQS.md`: how to add another discussion
- `docs/GAME.md`: Beat Your Best modes, scoring, spaced repetition, question bank
- `docs/QUESTION_BANK.md`: every game question with answer key and source (generated)
