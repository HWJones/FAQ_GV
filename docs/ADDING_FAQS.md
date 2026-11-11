# Adding another FAQ

You usually only need to add **one content file** and **one `<script>` line**. A new widget is only needed if the FAQ needs a new kind of diagram.

## 1. Prepare the source

1. Extract the full thread: question, answer, follow-ups, equations and figures.
2. Anonymise it. Remove student names from the text and crop figures so that names and avatars are excluded. Replace salutations with `[academic]` / `[student]`.
3. Save figures to `assets/figures/` as `d<discussion>-<what>.png`.
4. **Do not paraphrase or correct the academic's wording.** If something looks wrong, add a review item instead.

## 2. Create `data/faq-<n>-<slug>.js`

Copy an existing file and edit it. The object has five parts. The `meta` block drives the library: search, filters, previews and recommendations.

```js
  meta: {
    subject: "structures", module: "thin-walled", topic: "tw-shear-open",   // ids from data/taxonomy.js
    title: "Descriptive, student-facing title",
    summary: "One or two sentences on what the student will do.",
    concepts: ["shear-centre", "torsion"],      // concept ids (first = primary)
    terms: ["Fy", "line of action"],            // extra terminology for this resource
    questions: ["The student's question in their own words", "..."],  // strongest search signal
    difficulties: ["visualising", "misconceptions"],                  // difficulty category ids
    addresses: ["Sticking point this activity covers"],
    objectives: ["Learning objective"],
    types: ["branching", "simulation"],
    added: "2026-11-04"
  },
```

If a concept, topic or synonym is missing, add it to `data/taxonomy.js` once. Every resource and view picks it up. Check search afterwards with `node tests/search-eval.js`, and add a test query for the new FAQ.

The other four parts:

```js
window.FAQ_REGISTRY.push({
  id: "my-topic",               // used in the URL: #activity-my-topic
  order: 4,                     // position on the home screen
  status: "draft",              // draft | awaiting-review | approved
  discussion: "27", pages: "40–41",
  card: { heading, tagline, intro, activity, minutes },

  source: {                     // VERBATIM, anonymised
    title, board,
    question:  { author, blocks: [ {id, type, html} ... ] },
    answer:    { author, blocks: [ ... ] },
    followUps: [ { author, blocks: [ ... ] } ],
    annotations: [ ... ]        // optional: text inside posted solutions
  },

  steps: [ ... ],               // ADDED activity content (see below)
  review: [ { area, item } ]    // what the academic must check
});
```

**Block types:** `p` (paragraph), `math` (needs `label` with a spoken version), `figure` (`src`, `alt`, `caption`), `note` (editorial note, shown in italics). Give every block an `id`. Feedback quotes blocks by id.

## 3. Write the steps

| `type` | What it does | Key fields |
|---|---|---|
| `intro` | Sets the scene, shows an excerpt of the question | `html`, `showQuestion: [blockIds]` |
| `mcq` | Single-answer question with verbatim feedback | `prompt`, `options[{id, html, correct, refs, next?}]`, `topic`, `defer?`, `branchOnly?`, `assess?` |
| `widget` | Mounts an interactive diagram | `widget` (name), `config`, `topic?` + `refs?` (to count it in the summary) |
| `feedback` | Shows deferred predictions with their feedback | `questions: [mcqIds]` |
| `reflect` | Recalls earlier answers, free-text reflection, reveals the full answer | `recall`, `prompt`, `figure?`, `placeholder?`, `reveal: "full"` |
| `mcq` with `multi: true` | Select-all question | `options[{id, html, correct}]`, `refs` (step-level feedback) |
| `sort` | Place each statement in a group | `categories[{id,label}]`, `items[{html, cat}]`, `refs`, `topic` |
| `order` | Put method steps in sequence | `items[{id, html}]` **in the correct order** (shuffled for display), `refs`, `topic` |

- Set every step's `stage` to one of `explore | predict | interact | feedback | reflect`.
- **Branching:** put `next: "stepId"` on an option to send that answer down a different path. Mark the target step `branchOnly: true` so the normal sequence skips it, and give it its own `next` to rejoin.
- **Deferred predictions:** `defer: true` records the answer without feedback. A later `feedback` step reveals it.
- `refs` must point to **source block ids**. Feedback never includes text written for the activity.
- The summary is added automatically. It counts every `mcq` (unless `assess: false`) and every `widget` that has a `topic`.

### Grouping related threads

If several threads cover the same concept, or the academic answered "please see thread #N", add them to the primary thread's source as `source.threads: [{ discussion, pages, title, question, answer, followUps }]`. They appear in the source dialog, the full-answer reveal and the content map. Block ids must be unique across all threads in the file. Prefixing them with `t<discussion>` keeps them unique.

### Quick answers

A thread that isn't suitable for an activity (exam arrangements, a one-line pointer) can be a quick answer: give it `steps: []` and `types: ['info']`. The library shows the original Q&A on its preview page.

### Figures and notation

Crop figures to `assets/figures/*.webp` and use the `fig(id, name, alt, caption)` helper. Exclude names, signatures and setters' details, and keep colour where the academic refers to it ("circled in red"). Write maths with `window.FAQ_N` (e.g. `${N.qb}`, `${N.q0B}`, `${N.oint}`), so symbols look the same everywhere.

## 4. Register it

Add a line to `index.html` above the widget scripts:

```html
<script src="data/faq-27-my-topic.js"></script>
```

## 5. (Optional) Add a widget

Create `js/widgets/my-widget.js`:

```js
(window.FAQ_WIDGETS = window.FAQ_WIDGETS || {})['my-widget'] = {
  mount(host, config, ctx) {
    // build DOM/SVG into host
    // ctx.get() / ctx.set({...}) : per-session widget state
    // ctx.quote([blockIds])     : verbatim source block(s)
    // ctx.set({ checked: true, firstCorrect: bool, wrong: [...] }) to feed the summary
  }
};
```

Add its `<script>` tag to `index.html`. Put any calculation or simulation rule in a comment at the top of the file, and list it in the FAQ's `review` array so the academic can verify it.

## 6. Review and release

1. Run `python3 build.py` and check the activity on a phone and a desktop.
2. Send the academic the link plus the **Review checklist** page (`#review`). Use "Highlight added content" to show what was added.
3. Once everything is signed off, set `status: "approved"`.
