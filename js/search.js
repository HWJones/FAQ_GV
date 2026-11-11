/* Thin-Walled Beams FAQ Lab: content discovery / search.
 *
 * ARCHITECTURE
 *   FAQ_SEARCH.index(resources)   builds a search index from library metadata
 *   FAQ_SEARCH.search(query)      runs every registered provider and fuses the rankings
 *   FAQ_SEARCH.suggest(text)      autocomplete suggestions (concepts, questions, titles)
 *   FAQ_SEARCH.register(provider) adds another provider, e.g. a semantic/embedding one
 *
 *   A provider is { id, weight, search(query, ctx) -> Promise<[{ id, score, reasons[] }]> }.
 *   With one provider its ranking is used as is. With several, results are combined by
 *   weighted reciprocal-rank fusion, so a future semantic provider can be A/B tested
 *   against, or blended with, the local one without changing the UI. See docs/SEARCH.md.
 *
 * LOCAL PROVIDER (no external service)
 *   - normalisation: case, accents, UK/US spellings, light stemming
 *   - spelling tolerance: edit distance against the index vocabulary, plus "did you mean"
 *   - synonym and terminology expansion from FAQ_TAXONOMY.concepts[].terms
 *   - plain-language cues: FAQ_TAXONOMY.concepts[].cues and difficulties[].cues map
 *     everyday descriptions ("why does it twist") to concepts and difficulty categories
 *   - similarity to students' own questions stored on each resource
 *   Matches are reported as reasons ("twist → Shear centre") so results are explainable.
 *   Cues only SUGGEST resources. Nothing here infers what a student knows.
 */
(function () {
  'use strict';
  const T = window.FAQ_TAXONOMY;
  const STOP = new Set('a an the of to in on at for and or is are was be been it its this that these those i me my we you your do does did doing can could would should will with as by from about into how what why when where which who there their them then than so if not no but just also any some very really much get got have has had am im dont don t isn t s isnt doesnt cant wont didnt arent'.split(' '));
  const FIELD_W = { title: 3, questions: 2.5, terms: 2, concepts: 2, topic: 1.5, summary: 1, objectives: 1 };

  /* ---------- text processing ---------- */
  function norm(s) {
    let x = String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
      .replace(/[‘’]/g, "'").replace(/τ/g, ' tau ').replace(/σ/g, ' sigma ').replace(/θ/g, ' theta ');
    for (const [k, v] of Object.entries(T.spellings)) if (k.includes('-')) x = x.split(k).join(v);
    x = x.replace(/[^a-z0-9_]+/g, ' ').trim();
    return x.split(/\s+/).map(w => T.spellings[w] || w).join(' ');
  }
  function stem(w) {
    if (w.length <= 4 || /^\d/.test(w)) return w;
    let s = w;
    if (s.endsWith('ies') && s.length > 5) s = s.slice(0, -3) + 'y';
    else if (s.endsWith('ing') && s.length > 6) s = s.slice(0, -3);
    else if (s.endsWith('ed') && s.length > 5) s = s.slice(0, -2);
    else if (s.endsWith('es') && s.length > 5 && /(ss|x|ch|sh)es$/.test(s)) s = s.slice(0, -2);
    else if (s.endsWith('s') && !s.endsWith('ss') && s.length > 4) s = s.slice(0, -1);
    if (s.endsWith('e') && s.length > 4) s = s.slice(0, -1);
    if (/(.)\1$/.test(s) && s.length > 4 && !/(ss|ll)$/.test(s)) s = s.slice(0, -1); // twisting->twist, cutt->cut
    return s;
  }
  const toks = s => norm(s).split(' ').filter(Boolean).map(stem);
  const content = arr => arr.filter(t => !STOP.has(t));

  function lev(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i]; let best = i;
      for (let j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        best = Math.min(best, cur[j]);
      }
      if (best > max) return max + 1;
      prev = cur;
    }
    return prev[b.length];
  }
  const allow = w => (w.length >= 8 ? 2 : w.length >= 4 ? 1 : 0);
  /* Match quality of a query token against a document token: 1 exact, 0.75 typo, 0.55 prefix. */
  function tokSim(q, d) {
    if (q === d) return 1;
    const m = allow(q);
    if (m && lev(q, d, m) <= m) return 0.75;
    if (q.length >= 4 && d.startsWith(q)) return 0.55;
    return 0;
  }
  /* Contiguous phrase match (stopwords kept, so cues like "when can i" work). */
  function phraseIn(qt, pt) {
    if (!pt.length || pt.length > qt.length) return 0;
    let best = 0;
    for (let i = 0; i + pt.length <= qt.length; i++) {
      let s = 1;
      for (let j = 0; j < pt.length && s; j++) { const v = tokSim(qt[i + j], pt[j]); s = v >= 0.75 ? Math.min(s, v) : (pt[j].length <= 3 && qt[i + j] === pt[j] ? s : 0); }
      best = Math.max(best, s);
    }
    return best;
  }

  /* ---------- index ---------- */
  let IDX = null;
  const conceptLabel = id => (T.concepts[id] || {}).label || id;
  const prepPhrases = list => (list || []).map(p => ({ text: p, t: toks(p) })).filter(p => p.t.length);
  const CONCEPTS = Object.entries(T.concepts).map(([id, c]) => ({ id, label: c.label, related: c.related || [],
    terms: prepPhrases([c.label, ...(c.terms || [])]), cues: prepPhrases(c.cues) }));
  const DIFFS = T.difficulties.map(d => ({ id: d.id, label: d.label, cues: prepPhrases(d.cues) }));

  function topicPath(topicId) {
    for (const s of T.subjects) for (const m of s.modules) for (const t of m.topics) if (t.id === topicId) return { subject: s, module: m, topic: t };
    return {};
  }
  /* The text a semantic provider would embed for each resource (kept in one place). */
  function buildSearchDocument(r) {
    const p = topicPath(r.topic);
    return [r.title, r.summary, ...(r.questions || []), ...(r.objectives || []), ...(r.addresses || []),
      (r.concepts || []).map(conceptLabel).join(', '), (r.terms || []).join(', '),
      p.module && p.module.label, p.topic && p.topic.label].filter(Boolean).join('\n');
  }

  function index(resources) {
    const docs = resources.map(r => {
      const p = topicPath(r.topic);
      const conceptTerms = (r.concepts || []).flatMap(c => [conceptLabel(c), ...((T.concepts[c] || {}).terms || [])]);
      const f = {
        title: toks(r.title), summary: toks(r.summary),
        questions: (r.questions || []).map(toks),
        terms: toks((r.terms || []).join(' ')), concepts: toks(conceptTerms.join(' ')),
        topic: toks([p.topic && p.topic.label, p.module && p.module.label].join(' ')),
        objectives: toks([...(r.objectives || []), ...(r.addresses || [])].join(' '))
      };
      const bag = new Set([...f.title, ...f.summary, ...f.questions.flat(), ...f.terms, ...f.concepts, ...f.topic, ...f.objectives]);
      return { r, f, bag };
    });
    const df = new Map();
    docs.forEach(d => d.bag.forEach(t => df.set(t, (df.get(t) || 0) + 1)));
    const N = docs.length;
    const idf = t => Math.log(1 + N / (1 + (df.get(t) || 0)));
    const vocab = Array.from(df.keys()).filter(t => t.length >= 3 && !STOP.has(t));
    IDX = { docs, idf, vocab, byId: new Map(docs.map(d => [d.r.id, d])) };
    return IDX;
  }

  /* ---------- interpretation: what the query seems to be about ---------- */
  function interpret(q) {
    const qt = toks(q);
    const concepts = [];
    CONCEPTS.forEach(c => {
      let best = 0, via = null;
      c.terms.forEach(p => { const s = phraseIn(qt, p.t); if (s > best) { best = s; via = p.text; } });
      c.cues.forEach(p => { const s = phraseIn(qt, p.t) * 0.6; if (s > best) { best = s; via = p.text; } });
      if (best > 0) concepts.push({ id: c.id, label: c.label, score: best, via, kind: best > 0.6 ? 'term' : 'cue' });
    });
    concepts.sort((a, b) => b.score - a.score);
    const difficulties = [];
    DIFFS.forEach(d => {
      let n = 0, via = null;
      d.cues.forEach(p => { if (phraseIn(qt, p.t) >= 0.75) { n++; via = via || p.text; } });
      if (n) difficulties.push({ id: d.id, label: d.label, score: n, via });
    });
    difficulties.sort((a, b) => b.score - a.score);
    // spelling: words not found in the vocabulary, with their closest neighbour
    const words = norm(q).split(' ').filter(Boolean);
    let changed = false;
    const corrected = words.map(w => {
      const s = stem(w);
      if (STOP.has(s) || s.length < 4 || !IDX || IDX.idf(s) < Math.log(1 + IDX.docs.length) - 1e-9 || /\d/.test(s)) return w;
      let best = null, bd = 9;
      for (const v of IDX.vocab) { const d = lev(s, v, allow(s)); if (d < bd) { bd = d; best = v; if (d === 1) break; } }
      if (best && bd <= allow(s)) { changed = true; return displayWord(best); }
      return w;
    });
    const related = Array.from(new Set(concepts.flatMap(c => (T.concepts[c.id].related || [])))).filter(id => !concepts.some(c => c.id === id));
    return { tokens: qt, concepts, difficulties, correction: changed ? corrected.join(' ') : null, related };
  }
  // Map a stemmed vocabulary token back to a readable word for "did you mean".
  let DISPLAY = null;
  function displayWord(stemmed) {
    if (!DISPLAY) {
      DISPLAY = new Map();
      const add = text => norm(text).split(' ').forEach(w => { const s = stem(w); if (!DISPLAY.has(s) || w.length < DISPLAY.get(s).length) DISPLAY.set(s, w); });
      IDX.docs.forEach(d => { add(d.r.title); add(d.r.summary); (d.r.questions || []).forEach(add); });
      Object.values(T.concepts).forEach(c => { add(c.label); (c.terms || []).forEach(add); });
    }
    return DISPLAY.get(stemmed) || stemmed;
  }

  /* ---------- local provider ---------- */
  const local = {
    id: 'local-keyword-synonym', weight: 1,
    async search(query, ctx) {
      const it = ctx.interpretation;
      const qc = content(it.tokens);
      const out = [];
      for (const d of IDX.docs) {
        const r = d.r, reasons = [];
        let lex = 0;
        const hitWords = new Set();
        for (const q of qc) {
          let best = 0;
          for (const [field, w] of Object.entries(FIELD_W)) {
            const list = field === 'questions' ? d.f.questions.flat() : d.f[field];
            let m = 0;
            for (const t of list) { const s = tokSim(q, t); if (s > m) { m = s; if (m === 1) break; } }
            if (m * w > best) best = m * w;
          }
          if (best) { lex += best * IDX.idf(q); hitWords.add(q); }
        }
        let con = 0;
        (r.concepts || []).forEach((c, i) => {
          const m = it.concepts.find(x => x.id === c);
          if (m) { con += m.score * 5 * (i === 0 ? 1.3 : 1); reasons.push({ kind: 'concept', text: m.via && norm(m.via) !== norm(m.label) ? `“${m.via}” → ${m.label}` : m.label }); }
          else if (it.related.includes(c)) con += 0.8;
        });
        let dif = 0;
        // A difficulty description with no subject terms ("I can't picture what happens") browses by difficulty.
        const difW = it.concepts.length ? 1.2 : 4.5;
        it.difficulties.forEach(x => { if ((r.difficulties || []).includes(x.id)) { dif += difW; } });
        let qs = 0, qtext = null;
        (d.f.questions || []).forEach((qq, i) => {
          const qset = content(qq);
          if (!qset.length || !qc.length) return;
          let hit = 0; qc.forEach(q => { if (qset.some(t => tokSim(q, t) >= 0.75)) hit++; });
          const sim = hit / Math.max(qc.length, qset.length);
          if (sim > qs) { qs = sim; qtext = r.questions[i]; }
        });
        if (qs >= 0.5) reasons.unshift({ kind: 'question', text: qtext });
        // Slight preference for activities students can open now over catalogue entries.
        const score = (lex + con + dif + qs * 8) * (r.available ? 1.15 : 1);
        const coverage = qc.length ? hitWords.size / qc.length : 0;
        if (score > 3.5 && (con > 0 || coverage >= 0.5 || qs >= 0.4 || dif >= 4.5)) {
          if (!reasons.some(x => x.kind === 'concept') && hitWords.size) reasons.push({ kind: 'words', text: 'Matches your words' });
          out.push({ id: r.id, score, reasons });
        }
      }
      out.sort((a, b) => b.score - a.score);
      // Relative cut-off: drop weak tail matches that only share a common word.
      const top = out.length ? out[0].score : 0;
      return out.filter(x => x.score >= top * 0.22);
    }
  };

  const providers = [local];
  function register(p) { if (p && typeof p.search === 'function') providers.push(Object.assign({ weight: 1 }, p)); }

  async function search(query) {
    if (!IDX) throw new Error('FAQ_SEARCH.index(resources) must be called first');
    const interpretation = interpret(query);
    let usedQuery = query, autoCorrected = false;
    const ctx = { interpretation, index: IDX, buildSearchDocument };
    let lists = await Promise.all(providers.map(p => p.search(query, ctx).catch(() => [])));
    if (!lists.some(l => l.length) && interpretation.correction) {
      // nothing found: retry with the spelling correction
      usedQuery = interpretation.correction; autoCorrected = true;
      const it2 = interpret(usedQuery); Object.assign(ctx, { interpretation: it2 });
      lists = await Promise.all(providers.map(p => p.search(usedQuery, ctx).catch(() => [])));
      interpretation.concepts = it2.concepts; interpretation.difficulties = it2.difficulties; interpretation.related = it2.related;
    }
    let results;
    if (lists.length === 1) results = lists[0];
    else {
      const fused = new Map();
      lists.forEach((l, k) => l.forEach((x, rank) => {
        const e = fused.get(x.id) || { id: x.id, score: 0, reasons: [] };
        e.score += providers[k].weight / (60 + rank + 1);
        e.reasons = e.reasons.concat(x.reasons || []);
        fused.set(x.id, e);
      }));
      results = Array.from(fused.values()).sort((a, b) => b.score - a.score);
    }
    return { query, usedQuery, autoCorrected, interpretation, results, providers: providers.map(p => p.id) };
  }

  /* ---------- autocomplete ---------- */
  function suggest(text, limit) {
    limit = limit || 7;
    const t = norm(text);
    if (!t) return T.suggestedSearches.slice(0, 5).map(s => ({ text: s, kind: 'suggested' }));
    const last = t.split(' ').pop();
    const qt = toks(text);
    const seen = new Set(), out = [];
    const push = (txt, kind, extra) => { const k = txt.toLowerCase(); if (!seen.has(k) && out.length < limit) { seen.add(k); out.push(Object.assign({ text: txt, kind }, extra || {})); } };
    // concepts and terminology whose name starts with / closely matches what's typed
    CONCEPTS.forEach(c => {
      const names = [c.label, ...(T.concepts[c.id].terms || [])];
      const hit = names.find(n => { const nn = norm(n); return nn.startsWith(t) || (last.length >= 3 && nn.split(' ').some(w => w.startsWith(last))) || phraseIn(qt, toks(n)) >= 0.75; });
      if (hit) push(c.label, 'concept', { id: c.id, alt: norm(hit) !== norm(c.label) ? hit : null });
    });
    // student questions and titles containing what's typed
    if (IDX && t.length >= 3) {
      const qc = content(qt);
      IDX.docs.forEach(d => (d.r.questions || []).forEach(q => {
        const qq = toks(q);
        if (qc.length && qc.every(x => qq.some(y => tokSim(x, y) >= 0.55))) push(q, 'question');
      }));
      IDX.docs.forEach(d => {
        if (qc.length && qc.every(x => d.f.title.some(y => tokSim(x, y) >= 0.55))) push(d.r.title, 'resource', { id: d.r.id });
      });
    }
    return out;
  }

  window.FAQ_SEARCH = { index, search, suggest, register, interpret, buildSearchDocument, _internals: { norm, stem, toks, lev, phraseIn } };
})();
