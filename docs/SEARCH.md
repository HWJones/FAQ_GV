# Search: how it works, and how to add semantic search later

## Current implementation (no paid service, no API)

`js/search.js` runs entirely in the browser over the metadata in `FAQ_RESOURCES`.

1. **Normalisation**: lower case, accents removed, UK/US spellings unified (`center` → `centre`, `idealization` → `idealisation`), light stemming (`twisting`, `twists` → `twist`).
2. **Spelling tolerance**: tokens match with an edit distance of 1 (4–7 letters) or 2 (8+ letters). Unknown words get a "Did you mean" suggestion from the index vocabulary. If a misspelt query finds nothing, it is re-run with the correction automatically.
3. **Concept detection**: the query is matched against each concept's `terms` (terminology and synonyms, full weight) and `cues` (everyday descriptions, 0.6 weight) in `data/taxonomy.js`. "Why does the beam twist when I move the force?" matches *shear centre* through "twist" and "move the force".
4. **Difficulty detection**: phrases such as "when can I", "ignore", "can't picture" suggest a difficulty category. This gives a small boost, and a larger one when the query names no subject at all ("I can't picture what is happening").
5. **Scoring** for each resource: weighted word matches across fields (title 3, students' questions 2.5, terms/concepts 2, topic 1.5, summary/objectives 1) × IDF, plus concept overlap, difficulty overlap and similarity to the students' recorded questions. Built activities get a ×1.15 preference over placeholders. Weak tail matches below 22% of the top score are dropped.
6. **Explanations**: each result returns `reasons`, which the UI shows as "Why this result".

### Evaluation

`tests/search-queries.js` holds test queries with their expected results: the brief's examples, difficulty-style wording, synonyms, misspellings and placeholder topics. Run:

```
node tests/search-eval.js
```

Current result: **hit@1 94%, hit@3 100%, MRR 0.97** over 36 queries and the 26 real resources. The queries cover the brief's examples, difficulty-style wording, terminology, module information and common misspellings (e.g. "principle axes", "warpping"). Add real student queries (anonymised) as they are collected. That set becomes the benchmark for any future provider.

## Adding AI semantic search (future phase)

The search module is built around **providers**, so semantic search can be added and compared without changing the UI:

```js
FAQ_SEARCH.register({
  id: 'semantic-embeddings',
  weight: 1,                       // relative weight in rank fusion
  async search(query, ctx) {
    // ctx.index.docs[i].r  -> resource metadata
    // ctx.buildSearchDocument(resource) -> the exact text to embed
    // ctx.interpretation   -> concepts/difficulties detected by the local provider
    return [{ id, score, reasons: [{ kind: 'semantic', text: 'Similar meaning' }] }];
  }
});
```

With more than one provider, rankings are combined with **weighted reciprocal-rank fusion**, a standard hybrid-search method that doesn't need the providers' scores to be on the same scale. The local provider stays in place for exact terminology, misspellings and explanations.

### Suggested options, cheapest first

1. **In-browser embeddings, no server.** Pre-compute an embedding for each resource from `buildSearchDocument()` at build time and ship it as `data/embeddings.json`. Embed the query in the browser with a small open model, e.g. a MiniLM-class sentence model through transformers.js (about 25 MB, cached after first load). Rank by cosine similarity. No API cost and nothing leaves the device.
2. **Hosted embeddings.** Same pre-computed vectors, with the query embedded by a university-approved endpoint. Smaller download, but queries leave the device, so a privacy review is needed.
3. **LLM re-ranking or query rewriting.** Ask a model to rewrite a vague description into concept terms, or to re-rank the top 20 results. Most capable and most expensive. Keep it to suggestion only, with no free-text answers, so it can't invent engineering explanations.

### Evaluating it

- Run `tests/search-eval.js` with the provider registered (local only, semantic only, fused) and compare hit@1, hit@3 and MRR.
- Track zero-result rate and "Did you mean" usage on real queries (anonymised, aggregated, opt-in).
- Usability test with students who describe a difficulty in their own words and see whether they reach a relevant activity in under a minute.

### Guardrails

- Providers return resource ids only, never generated explanations.
- Wording stays non-diagnostic: search suggests resources and doesn't tell students what they misunderstand.
- No student identifiers in queries or logs.
