# Navigation and content discovery

How a student finds the right activity in a library of 100+ resources, and why the design works the way it does.

## Three ways in

Students arrive in one of three states. The home page offers an entry point for each, all visible without scrolling on desktop.

| The student… | Entry point | What happens |
|---|---|---|
| has a specific question ("why does the beam twist when I move the force?") | **Search box**, the first thing on the page | Natural-language search, autocomplete, spelling tolerance and synonyms, with a panel explaining what it matched |
| knows something is hard but not what it's called | **"Not sure what to search for?"** link and **"Browse by what you find difficult"** tiles | A guided finder (module → difficulty described in plain language → own words) or a difficulty-filtered list |
| wants to revise a module | **"Browse by module"**: subject → module → topic, with counts | Opens the library already filtered to that module or topic, with a breadcrumb |

The header (Browse · Find help · My revision, plus a compact search box) is identical on every page, so students can switch approach at any point.

## Design decisions and the principles behind them

- **Search first, browse alongside.** Most knowledge bases and learning repositories (e.g. university library discovery layers, Khan Academy, Stack Overflow) put search at the top and show the browse hierarchy underneath, so a student doesn't have to know the structure to start.
- **Difficulty categories complement topics.** "What you find difficult" is a separate facet and browse route. It never replaces module/topic navigation. Each category is shown as a statement in the student's own words ("I can't picture what is physically happening"), because students recognise their problem more easily than they can name it.
- **Interpret, don't diagnose.** When search detects a difficulty in the wording, it says "Your wording sounds like it *may* be about visualising physical behaviour" and offers "Show only these". It never filters automatically. The guided finder says its suggestions "aren't an assessment of what you know".
- **Explainable results.** Each result gives a short "Why this result" line, such as *"twist" → Shear centre* or *similar to a student question: "…"*. Students and reviewers can see why something matched, which also helps evaluate search quality.
- **Faceted filtering with counts.** The facets are availability, module, topic (shown once a module is chosen, to avoid a 22-item list), difficulty, activity type and time. Options with no results are hidden, counts reflect the other active filters, and active filters appear as removable chips with "Clear all".
- **Previews before commitment.** Cards show status, title, module › topic, summary, type, time and difficulty. The preview page adds learning objectives, the students' original questions, sticking points covered, concepts and related resources.
- **Recognisable states.** Built activities have a solid card and status pill ("Awaiting academic review"). Placeholders have a dashed outline, a "Placeholder" pill and a notice on their preview page, and can't be started. Completed and in-progress activities are tagged on every card.
- **Recovery paths.** "Did you mean…" for misspellings, automatic correction when a misspelt query finds nothing, related-idea chips to broaden or redirect, and an empty state that suggests fewer words, removing filters, the guided finder or browsing.
- **Pagination by "Show more".** Results come 12 at a time, and focus moves to the first newly loaded result, which suits revision browsing better than numbered pages on mobile.
- **My revision.** Saved resources, in progress, completed and recently viewed, with a count badge in the header. It is stored only in this browser, with a clear-all control and an in-page confirmation.

## Accessibility (WCAG 2.2 AA)

- The search box follows the ARIA 1.2 combobox pattern (`aria-expanded`, `aria-activedescendant`, arrow keys, Enter, Escape) and uses a visible label on full-size instances.
- Filters are native checkboxes in `fieldset`/`legend` groups. On narrow screens the panel collapses into a `<details>` disclosure, with no custom widget.
- Result counts, save/unsave and the finder's results are announced through live regions. On every route change focus moves to the page heading.
- Target sizes are at least 24 × 24 px (2.5.8). `scroll-padding-top` keeps focused items clear of the sticky header (2.4.11). Text contrast is at least 4.5:1 in both themes. Each card has a single link (the title), stretched over the card, so screen readers don't hear duplicate links.
- No information is carried by colour alone: resource kind, status and progress all have text labels.
- Checked at 360 px, 390 px and 1280 px: no horizontal scrolling on any view.

## Information architecture

See `data/taxonomy.js` (structure and vocabulary) and `js/catalogue.js` (resource shape). Each resource carries:

| Field | Used for |
|---|---|
| `subject`, `module`, `topic` | browse hierarchy, breadcrumbs, facets, related resources |
| `concepts[]` (ids from the taxonomy) | synonym expansion, related ideas, recommendations |
| `terms[]` | extra terminology specific to this resource |
| `questions[]` | students' own phrasings; strongest search signal |
| `difficulties[]` | difficulty browse, facet and search cues |
| `addresses[]` | "sticking points it covers" on the preview |
| `objectives[]` | preview page |
| `types[]`, `minutes` | facets, sorting, card metadata |
| `status`, `kind` (activity or quick answer) | review workflow, resource facet, visual state |

Adding a topic, concept or synonym in the taxonomy updates navigation, filters, search and recommendations at the same time. No UI changes are needed as the library grows.
