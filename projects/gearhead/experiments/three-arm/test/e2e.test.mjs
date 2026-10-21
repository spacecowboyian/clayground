import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { validate } from '../scripts/validate.mjs';
import { buildBundles, assertIsolation } from '../scripts/build-bundles.mjs';
import { runExperiment } from '../scripts/generate.mjs';
import { writeReport, evaluateHtml } from '../scripts/evaluate.mjs';
import { findLeaks, loadTasks, ARMS, ROOT } from '../scripts/lib.mjs';

test('definitions validate and cover every exported family', () => {
  const { errors, definitions, families } = validate();
  assert.deepEqual(errors, []);
  assert.equal(definitions, families);
});

test('tokens.json matches theme.css', () => {
  execFileSync('node', [join(ROOT, 'scripts/extract-tokens.mjs'), '--check']);
});

test('leak scanner rejects implementation detail but allows plain prose', () => {
  assert.ok(findLeaks('<div className="px-4">').length > 0);
  assert.ok(findLeaks("import { Button } from 'react-aria-components'").length > 0);
  assert.deepEqual(findLeaks('A text-field with 16px horizontal padding in a grid-list.'), []);
});

test('bundles are isolated per arm', () => {
  const out = mkdtempSync(join(tmpdir(), 'bundles-'));
  const m = buildBundles({ outDir: out });
  assertIsolation(m);
  assert.ok(m['tokens-components'].files.length > m['definitions-only'].files.length);
  const tampered = structuredClone(m);
  tampered['definitions-only'].files.push({ path: m['tokens-components'].files.find((f) => f.path.startsWith('package/')).path });
  assert.throws(() => assertIsolation(tampered), /Isolation violated/);
});

test('mocked pipeline runs end to end without credentials or a browser', async () => {
  const out = mkdtempSync(join(tmpdir(), 'run-'));
  const { manifest } = await runExperiment({ providerName: 'mock', renderer: 'none', repeats: 2, runId: 'test', outDir: join(out, 'run') });
  assert.equal(manifest.runs.length, ARMS.length * 2);
  assert.ok(manifest.runs.every((r) => r.status === 'ok' && existsSync(join(out, 'run', r.arm, r.task, `rep-${r.rep}`, 'request.json'))));
  assert.equal(new Set(manifest.runs.map((r) => r.sharedSha256)).size, 1);
  const { result } = writeReport(join(out, 'run'), join(out, 'report'));
  assert.ok(existsSync(join(out, 'report/index.html')));
  for (const arm of ARMS) assert.equal(result.byArm[arm].structuralPass, 2);
});

test('provider failures and malformed output are recorded, not thrown', async () => {
  const out = mkdtempSync(join(tmpdir(), 'run-'));
  const { manifest } = await runExperiment({
    outDir: out, settings: { mockFailArms: ['tokens-only'], mockMalformedArms: ['definitions-only'] },
  });
  const status = Object.fromEntries(manifest.runs.map((r) => [r.arm, r.status]));
  assert.deepEqual(status, { 'tokens-only': 'failed', 'tokens-components': 'ok', 'definitions-only': 'failed' });
  const { result } = writeReport(out, join(out, 'report'));
  assert.equal(result.byArm['tokens-only'].failed, 1);
});

test('evaluator flags missing content and a11y problems', () => {
  const { tasks } = loadTasks();
  const ev = evaluateHtml('<html><body><img src="x"><input></body></html>', tasks[0].required, {});
  assert.equal(ev.structural.pass, false);
  assert.ok(ev.a11y.issues.includes('missing lang'));
  assert.ok(ev.a11y.issues.includes('img without alt'));
});
