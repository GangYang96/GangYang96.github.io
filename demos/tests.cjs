/* Run with Node.js; no test dependency. Uses independent invariants and known totals. */
const assert = require('node:assert/strict');
const L = require('./loan-lab/core.js'),
  M = require('./message-lab/core.js'),
  G = require('./gallery-lab/core.js');
const input = L.validate(L.parseCsv(L.sample));
const multiline = L.parseCsv('id,unit,due_date,balance\n\nT1,"Unit\nOne",2026-01-01,1.00\nT2,East,2026-01-01,2.00');
assert.deepEqual(multiline.map(r => r.line), [3, 5]);
assert.equal(multiline[0].raw, 'T1,"Unit\nOne",2026-01-01,1.00');
const report = L.analyze(input.valid, {
  asOf: '2026-10-28',
  minDays: 30
});
assert.equal(report.hit_count, 6);
assert.equal(report.hit_balance_cents, 73500075);
assert.deepEqual(report.hits.map(r => r.id), ['DEMO-001', 'DEMO-003', 'DEMO-004', 'DEMO-006', 'DEMO-008', 'DEMO-011']);
assert.equal(L.validate(L.parseCsv(L.anomaly)).rejected.length, 3);
assert.equal(L.analyze(input.valid, {
  asOf: '2026-10-28',
  minDays: 30,
  unit: 'West'
}).hit_balance_cents, 9600025);
assert.throws(() => L.dateValue('2026-02-30'));
assert.throws(() => L.parseCsv('id,unit,due_date,balance\n"unterminated'));
assert.equal(L.validate(L.parseCsv('id,unit,due_date,balance\nT1,"A,B",2026-09-28,0.01')).valid[0].balance_cents, 1);
assert.deepEqual(L.parseQuery('截至2026-10-28，逾期30天及以上'), {
  asOf: '2026-10-28',
  minDays: 30
});
assert.throws(() => L.parseQuery('截至2026-10-28，逾期30天及以上且余额超过100万'));
assert.equal(L.analyze(L.validate(L.parseCsv('id,unit,due_date,balance\nT1,__proto__,2026-01-01,1.00')).valid, {
  asOf: '2026-10-28',
  minDays: 30
}).groups.__proto__.balance_cents, 100);
const clean = M.parse(M.samples.complete),
  missing = M.parse(M.samples.missing),
  conflict = M.parse(M.samples.conflict);
assert.deepEqual(M.inspect(clean, {}, ''), []);
assert.equal(M.inspect(missing, {}, '')[0].reason, 'MISSING');
assert.equal(M.inspect(missing, {
  DEADLINE: '2026-11-05'
}, '')[0].reason, 'REVIEW_NOTE');
assert.deepEqual(M.inspect(missing, {
  DEADLINE: '2026-11-05'
}, 'Synthetic follow-up confirms date'), []);
assert.equal(M.inspect(clean, {
  REFERENCE: 'bad !'
}, 'Reviewed')[0].reason, 'INVALID');
assert.equal(M.inspect(clean, {
  DEADLINE: '2026-02-30'
}, 'Reviewed')[0].reason, 'INVALID');
assert.equal(conflict.fields.REFERENCE.issue, 'CONFLICT');
assert.equal(conflict.fields.REFERENCE.evidence.length, 2);
assert.equal(M.inspect(conflict, {}, '')[0].reason, 'REVIEW_NOTE');
assert.equal(M.parse('TYPE: INVALID').typeIssue, true);
for (const closure of [false, true]) for (const ids of [['C', 'A', 'D', 'B'], ['A'], ['D', 'B']]) {
  const route = G.optimize(ids, closure),
    walls = G.blocked(closure);
  assert.deepEqual([...route.order].sort(), [...ids].sort());
  assert.equal(route.steps, route.route.length - 1);
  assert.ok(route.steps <= route.initial);
  assert.deepEqual(route.route[0], G.start);
  assert.ok(ids.every(id => route.route.some(p => p.join(',') === G.exhibits.find(e => e.id === id).pos.join(','))));
  route.route.forEach((p, i) => {
    assert.ok(!walls.has(p.join(',')));
    if (i) assert.equal(Math.abs(p[0] - route.route[i - 1][0]) + Math.abs(p[1] - route.route[i - 1][1]), 1);
  });
  assert.deepEqual(G.optimize(ids, closure), route);
  assert.ok(route.history.every((n, i) => i === 0 || n <= route.history[i - 1]));
}
assert.throws(() => G.optimize([]));
assert.throws(() => G.optimize(['A', 'A']));
assert.equal(G.path([0, 0], [2, 2], G.blocked()), null);
console.log('PASS: exact loan totals, invalid inputs, evidence, review gates, deterministic paths and obstacle invariants');
