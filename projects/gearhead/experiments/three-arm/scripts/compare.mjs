// Builds one comparison page: spec scoring (evaluator) + design-system judgments (blinded critics), side by side.
// Usage: node scripts/compare.mjs [--run=DIR]  -> dist/compare/index.html
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { DIST, ARMS, join, existsSync, readJson, relPath, writeFile, mkdirSync, ROOT } from './lib.mjs';
import { evaluateRun } from './evaluate.mjs';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const DIMS = ['tokenFidelity', 'componentFidelity', 'visualHierarchyAndLayout', 'spacingAndTypographyConsistency', 'accessibilityAndStates', 'responsiveBehaviour', 'specCompleteness'];
// Blind labels used when judging; unblinded here only.
const BLIND = { A: 'definitions-only', B: 'tokens-only', C: 'tokens-components' };
const rel = (from, p) => relPath(join(ROOT, p)).split('/').map(() => '..').slice(0, from.split('/').length).concat([p]).join('/');

export function buildCompare(runDir, outDir = join(DIST, 'compare')) {
  const result = evaluateRun(runDir);
  const judgments = {};
  for (const [label, arm] of Object.entries(BLIND)) {
    const f = join(DIST, 'judgments', `${label}.json`);
    if (existsSync(f)) judgments[arm] = readJson(f);
  }
  mkdirSync(outDir, { recursive: true });
  const link = (p) => esc(['..', '..', p].join('/'));
  const row = (arm) => result.rows.find((r) => r.arm === arm);
  const avg = (j) => (j ? +(DIMS.reduce((s, d) => s + (j.scores[d]?.score ?? 0), 0) / DIMS.length).toFixed(1) : null);
  const cls = (n) => (n == null ? '' : n >= 8 ? 'good' : n >= 6 ? 'mid' : 'bad');

  const specRows = ARMS.map((a) => {
    const r = row(a);
    const s = r.structural;
    return `<tr><th scope="row">${esc(a)}</th><td class="${s.pass ? 'good' : 'bad'}">${s.pass ? 'pass' : 'fail'}</td><td>${s.missingText.length}</td><td>${esc(s.missingLandmarks.join(', ') || 'none')}</td><td>${Object.values(s.controls).every(Boolean) ? 'ok' : 'missing'}</td><td>${r.a11y.issues.length}${r.a11y.issues.length ? ` (${esc(r.a11y.issues.join('; '))})` : ''}</td><td>${r.tokenAdherence.offPaletteColors.length}</td><td>${r.visual?.mobileHorizontalOverflow ? 'overflow' : 'none'}</td></tr>`;
  }).join('');
  const judgeHead = `<tr><th scope="col">Dimension (0–10)</th>${ARMS.map((a) => `<th scope="col">${esc(a)}</th>`).join('')}</tr>`;
  const judgeRows = DIMS.map((d) => `<tr><th scope="row">${esc(d)}</th>${ARMS.map((a) => { const x = judgments[a]?.scores[d]; return `<td class="${cls(x?.score)}"><strong>${x?.score ?? '–'}</strong><br><small>${esc(x?.evidence ?? 'not judged')}</small></td>`; }).join('')}</tr>`).join('')
    + `<tr><th scope="row">Mean</th>${ARMS.map((a) => `<td class="${cls(avg(judgments[a]))}"><strong>${avg(judgments[a]) ?? '–'}</strong></td>`).join('')}</tr>`;
  const cards = ARMS.map((a) => {
    const r = row(a);
    const j = judgments[a];
    return `<section class="arm"><h3>${esc(a)}</h3>
<div class="shots">${Object.entries(r.visual?.screenshots ?? {}).map(([k, v]) => `<figure><figcaption>${esc(k)}</figcaption><a href="${link(v)}"><img src="${link(v)}" alt="${esc(a)} ${esc(k)} screenshot" width="${k === 'mobile' ? 170 : 330}"></a></figure>`).join('')}</div>
<p><a href="${link(r.output)}">Open generated page</a> · <a href="${link(r.dir + '/request.json')}">Exact prompt sent</a></p>
${j ? `<p>${esc(j.summary)}</p><h4>Strengths</h4><ul>${j.strengths.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><h4>Defects</h4><ul>${j.defects.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '<p>Not judged.</p>'}</section>`;
  }).join('');

  const refPath = join(DIST, 'runs', result.runId, 'reference/print-queue-dashboard/rep-1/status.json');
  const ref = existsSync(refPath) ? readJson(refPath) : null;
  const refCard = ref ? `<section class="arm"><h3>reference (real Gearhead components)</h3>
<div class="shots">${Object.entries(ref.render).map(([k, v]) => `<figure><figcaption>${esc(k)}</figcaption><a href="${link(relPath(v.screenshot))}"><img src="${link(relPath(v.screenshot))}" alt="reference ${esc(k)} screenshot" width="${k === 'mobile' ? 170 : 330}"></a></figure>`).join('')}</div>
<p><a href="${link(relPath(join(DIST, 'runs', result.runId, 'reference/print-queue-dashboard/rep-1/output/index.html')))}">Open reference page</a> · structural ${ref.evaluation.structural.pass ? 'pass' : 'fail'} · a11y issues ${ref.evaluation.a11y.issues.length} · mobile overflow ${ref.render.mobile.horizontalOverflow ? 'yes' : 'none'}</p>
<p>Built by <code>reference/main.tsx</code> from the real Gearhead components (DashboardPage, FilterSidebar, SearchField, OrderStatusTimeline, NumberField, Select, Switch, Button), rendered by the same harness. It is a baseline for how the real components look, not a scored arm; its token-adherence count is not comparable because it includes compiled Tailwind CSS.</p></section>` : '';
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Three-arm comparison</title>
<style>:root{color-scheme:dark}body{margin:0;background:#222;color:#f5f5f5;font:16px/1.5 system-ui,sans-serif}main{max-width:1280px;margin:0 auto;padding:24px}
h1,h2,h3,h4{font-weight:500}a{color:#8ab4ff}.wrap{overflow-x:auto}table{border-collapse:collapse;width:100%;margin:12px 0}th,td{border:1px solid #555;padding:8px;text-align:left;vertical-align:top}
small{color:#a3a3a3}.note{border-left:4px solid #f90;padding:8px 16px;background:#2a2a2a}.good{background:#1f3a26}.mid{background:#3d3a1f}.bad{background:#40231f}
.arms{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(340px,1fr))}.arm{background:#2a2a2a;border:1px solid #555;border-radius:12px;padding:16px}.shots{display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap}.shots img{max-width:100%;height:auto;border:1px solid #555}</style></head>
<body><main><h1>Three-arm comparison</h1>
<p>Run <code>${esc(result.runId)}</code> · model <code>${esc(result.settings.model)}</code> · 1 task · 1 repeat. Arms: <strong>tokens-only</strong> (palette only), <strong>tokens-components</strong> (palette + Gearhead source), <strong>definitions-only</strong> (implementation-free definitions).</p>
<p class="note"><strong>Limitations.</strong> One fixture, one sample per arm, outputs written by isolated sub-agents (not a pinned production model). Design judgments came from blinded critics (labels A/B/C, unblinded only in this page) using an impeccable-style rubric; the <code>/impeccable</code> skill itself was not available here. LLM judging is noisy: treat differences as directional, not conclusive. <strong>Bias warning:</strong> the critics scored against the definitions document, which only the definitions-only arm saw, so component-fidelity scores favour that arm; the spec scores in section 1 are the neutral comparison. Metrics are not merged into a single score.</p>
<h2>1. Scored against the original spec</h2><div class="wrap"><table><thead><tr><th scope="col">Arm</th><th scope="col">Structural</th><th scope="col">Missing text</th><th scope="col">Missing landmarks</th><th scope="col">Controls</th><th scope="col">A11y issues</th><th scope="col">Off-palette colours</th><th scope="col">Mobile overflow</th></tr></thead><tbody>${specRows}</tbody></table></div>
<h2>2. Judged against the design system</h2><div class="wrap"><table><thead>${judgeHead}</thead><tbody>${judgeRows}</tbody></table></div>
<h2>3. Side by side</h2><div class="arms">${cards}${refCard}</div>
</main></body></html>`;
  writeFile(join(outDir, 'index.html'), html);
  return { outDir, judged: Object.keys(judgments).length };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const arg = process.argv.find((a) => a.startsWith('--run='))?.split('=')[1];
  const runsDir = join(DIST, 'runs');
  const dir = arg ?? join(runsDir, readdirSync(runsDir).filter((d) => d.startsWith('live-')).sort().pop());
  const { outDir, judged } = buildCompare(dir);
  console.log(`compare -> ${relPath(outDir)}/index.html (${judged}/3 judged)`);
}
void rel;
