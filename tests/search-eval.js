#!/usr/bin/env node
/* Offline evaluation of search quality: hit@1, hit@3, MRR over tests/search-queries.js.
 *   node tests/search-eval.js            (local provider)
 * To evaluate a semantic provider, register it before the run (see docs/SEARCH.md). */
const path = require('path');
global.window = {};
const root = path.join(__dirname, '..');
// load the same data files as the app, in the same order (read from index.html)
const html = require('fs').readFileSync(path.join(root, 'index.html'), 'utf8');
[...html.matchAll(/<script src="(data\/[^"]+)"/g)].map(m => m[1]).concat(['js/catalogue.js', 'js/search.js'])
  .forEach(f => require(path.join(root, f)));
const S = window.FAQ_SEARCH;
S.index(window.FAQ_RESOURCES);
const Q = require('./search-queries.js');
(async () => {
  let h1 = 0, h3 = 0, mrr = 0;
  for (const t of Q) {
    const r = await S.search(t.q);
    const ids = r.results.map(x => x.id);
    if (t.expectCount) { const ok = ids.length >= t.expectCount; if (ok) { h1++; h3++; mrr++; } console.log(`${ok ? '  ok ' : ' MISS'} n=${ids.length}  ${t.q}  (difficulty-only query, expects ${t.expectCount}+ results)`); continue; }
    const rank = Math.min(...t.expect.map(e => { const i = ids.indexOf(e); return i < 0 ? Infinity : i + 1; }));
    if (rank === 1) h1++; if (rank <= 3) h3++; if (rank < Infinity) mrr += 1 / rank;
    const flag = rank === 1 ? '  ok ' : rank <= 3 ? ' top3' : ' MISS';
    console.log(`${flag} #${rank === Infinity ? '-' : rank}  ${t.q}${r.autoCorrected ? `  (corrected: ${r.usedQuery})` : ''}  -> ${ids.slice(0, 3).join(', ')}`);
  }
  console.log(`\n${window.FAQ_RESOURCES.length} resources, ${Q.length} queries. hit@1 ${(h1 / Q.length * 100).toFixed(0)}%  hit@3 ${(h3 / Q.length * 100).toFixed(0)}%  MRR ${(mrr / Q.length).toFixed(2)}`);
})();
