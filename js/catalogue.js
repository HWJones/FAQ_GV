/* Builds the unified resource list used by navigation, search and recommendations.
 * Built activities (window.FAQ_REGISTRY, with steps) and placeholder entries
 * (window.FAQ_CATALOGUE) share one metadata shape:
 *
 *   { id, title, summary, subject, module, topic, concepts[], terms[], questions[],
 *     difficulties[], addresses[], objectives[], types[], minutes, status,
 *     available, placeholder, discussion, pages, added }
 *
 * No DOM access, so the same file runs in the browser and in tests/search-eval.js.
 */
(function () {
  'use strict';
  const T = window.FAQ_TAXONOMY;
  const where = {};
  T.subjects.forEach(s => s.modules.forEach(m => m.topics.forEach(t => { where[t.id] = { subject: s.id, module: m.id }; })));

  function fromFaq(f) {
    const m = f.meta || {};
    return {
      id: f.id, available: true, placeholder: false, status: f.status,
      kind: (f.steps && f.steps.length) ? 'activity' : 'info',
      threads: [f.discussion, ...((f.source.threads || []).map(t => t.discussion))],
      title: m.title || f.card.heading, shortTitle: f.card.heading, summary: m.summary || f.card.intro,
      topic: m.topic, subject: m.subject || (where[m.topic] || {}).subject, module: m.module || (where[m.topic] || {}).module,
      concepts: m.concepts || [], terms: m.terms || [], questions: m.questions || [], difficulties: m.difficulties || [],
      addresses: m.addresses || [], objectives: m.objectives || [], types: (f.steps && f.steps.length) ? (m.types || []) : ['info'], minutes: f.card.minutes,
      discussion: f.discussion, pages: f.pages, added: m.added || ''
    };
  }
  function fromPlaceholder(p) {
    return Object.assign({ available: false, placeholder: true, shortTitle: p.title }, p, where[p.topic] || {});
  }
  window.FAQ_RESOURCES = [
    ...(window.FAQ_REGISTRY || []).map(fromFaq),
    ...(window.FAQ_CATALOGUE || []).map(fromPlaceholder)
  ];
})();
