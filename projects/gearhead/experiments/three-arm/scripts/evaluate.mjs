// Evaluates a run manifest and writes dist/report/{report.json,index.html}. Metrics are reported separately, never combined.
// Usage: node scripts/evaluate.mjs [--run=DIR]   (default: newest dir in dist/runs)
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';
import { DIST, join, loadTasks, readFileSync, readJson, relPath, resolveTokens, writeFile, mkdirSync, existsSync, ROOT } from './lib.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function evaluateHtml(html, required, tokenValues) {
  const root = parse(html, { comment: false });
  const text = root.textContent.replace(/\s+/g, ' ');
  const missingText = required.text.filter((t) => !text.includes(t));
  const landmarks = required.landmarks.filter((l) => !root.querySelector(l));
  const inputs = root.querySelectorAll('input');
  const textInputs = inputs.filter((i) => ['text', 'search', 'number', 'email', undefined].includes(i.getAttribute('type'))).length
    + root.querySelectorAll('select, textarea').length;
  const checkboxLike = inputs.filter((i) => i.getAttribute('type') === 'checkbox' || i.getAttribute('role') === 'switch').length;
  const buttons = root.querySelectorAll('button, [role=button]').length;
  const c = required.controls;
  const controls = { buttons: buttons >= c.buttons, textInputs: textInputs >= c.textInputs, checkboxLike: checkboxLike >= c.checkboxLike };
  const structural = {
    missingText, missingLandmarks: landmarks,
    controls,
    pass: missingText.length === 0 && landmarks.length === 0 && Object.values(controls).every(Boolean),
  };

  const labelled = (i) => i.getAttribute('aria-label') || i.getAttribute('aria-labelledby') || (i.getAttribute('id') && root.querySelector(`label[for="${i.getAttribute('id')}"]`)) || i.closest('label');
  const a11yIssues = [];
  if (!root.querySelector('html')?.getAttribute('lang')) a11yIssues.push('missing lang');
  if (!root.querySelector('title')?.textContent.trim()) a11yIssues.push('missing title');
  if (root.querySelectorAll('h1').length !== 1) a11yIssues.push('expected exactly one h1');
  for (const img of root.querySelectorAll('img')) if (img.getAttribute('alt') === undefined) a11yIssues.push('img without alt');
  for (const i of inputs.filter((x) => x.getAttribute('type') !== 'hidden').concat(root.querySelectorAll('select, textarea'))) if (!labelled(i)) a11yIssues.push(`unlabelled ${i.tagName.toLowerCase()}`);
  for (const b of root.querySelectorAll('button')) if (!b.textContent.trim() && !b.getAttribute('aria-label')) a11yIssues.push('button without name');

  const norm = (v) => v.toLowerCase().replace(/\s+/g, '');
  const palette = new Set(Object.values(tokenValues).map((v) => norm(String(v))));
  const css = root.querySelectorAll('style').map((s) => s.textContent).join('\n');
  const colors = [...new Set((css.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []).map(norm))];
  const offPalette = colors.filter((x) => !palette.has(x) && !['#fff', '#ffffff', '#000', '#000000'].includes(x));
  const radii = [...new Set((css.match(/border-radius:\s*[^;}]+/g) ?? []).map((r) => r.split(':')[1].trim()))];
  const tokenAdherence = { colorsUsed: colors.length, offPaletteColors: offPalette, radii };
  return { structural, a11y: { issues: a11yIssues, pass: a11yIssues.length === 0 }, tokenAdherence };
}

const stats = (xs) => (xs.length ? { mean: +(xs.reduce((a, b) => a + b, 0) / xs.length).toFixed(2), min: Math.min(...xs), max: Math.max(...xs) } : null);

export function evaluateRun(runDir) {
  const manifest = readJson(join(runDir, 'manifest.json'));
  const { tasks } = loadTasks();
  const tokenValues = resolveTokens();
  const rows = manifest.runs.map((r) => {
    const base = { arm: r.arm, task: r.task, rep: r.rep, status: r.status, failures: r.failures, dir: r.dir };
    if (r.status !== 'ok') return base;
    const task = tasks.find((t) => t.id === r.task);
    const html = readFileSync(join(runDir, r.arm, r.task, `rep-${r.rep}`, 'output/index.html'), 'utf8');
    const ev = evaluateHtml(html, task.required, flatten(tokenValues));
    const mobile = r.render?.mobile;
    return { ...base, ...ev, visual: r.render ? { mobileHorizontalOverflow: mobile?.horizontalOverflow ?? null, externalRequests: Object.values(r.render).flatMap((v) => v.externalRequests), consoleErrors: Object.values(r.render).flatMap((v) => v.consoleErrors), screenshots: Object.fromEntries(Object.entries(r.render).map(([k, v]) => [k, relPath(v.screenshot)])) } : null, output: r.output };
  });
  const byArm = {};
  for (const arm of Object.keys(manifest.bundles)) {
    const mine = rows.filter((x) => x.arm === arm);
    const ok = mine.filter((x) => x.status === 'ok');
    byArm[arm] = {
      runs: mine.length, failed: mine.length - ok.length,
      structuralPass: ok.filter((x) => x.structural.pass).length,
      missingTextCount: stats(ok.map((x) => x.structural.missingText.length)),
      a11yIssueCount: stats(ok.map((x) => x.a11y.issues.length)),
      offPaletteColors: stats(ok.map((x) => x.tokenAdherence.offPaletteColors.length)),
      mobileOverflow: ok.filter((x) => x.visual?.mobileHorizontalOverflow).length,
    };
  }
  return { runId: manifest.runId, renderer: manifest.renderer, settings: manifest.settings, bundles: manifest.bundles, byArm, rows };
}

export function flatten(tokens) {
  const out = {};
  const walkObj = (o, p = '') => { for (const [k, v] of Object.entries(o)) { if (v && typeof v === 'object') walkObj(v, `${p}${k}.`); else out[`${p}${k}`] = v; } };
  walkObj(tokens);
  return out;
}

export function writeReport(runDir, outDir = join(DIST, 'report')) {
  const result = evaluateRun(runDir);
  mkdirSync(outDir, { recursive: true });
  const link = (p) => esc(relPathFrom(outDir, join(ROOT, p)));
  const arms = Object.entries(result.byArm);
  const th = (xs) => `<tr>${xs.map((x) => `<th scope="col">${esc(x)}</th>`).join('')}</tr>`;
  const fmt = (s) => (s ? `${s.mean} (min ${s.min}, max ${s.max})` : 'n/a');
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Three-arm experiment report</title>
<style>:root{color-scheme:dark}body{margin:0;background:#222;color:#eee;font:16px/1.5 system-ui,sans-serif}main{max-width:1200px;margin:0 auto;padding:24px}
h1,h2{font-weight:500}a{color:#8ab4ff}.wrap{overflow-x:auto}table{border-collapse:collapse;width:100%;margin:12px 0}th,td{border:1px solid #555;padding:8px;text-align:left;vertical-align:top}
.note{border-left:4px solid #f90;padding:8px 16px;background:#2c2c2c}.shots{display:flex;gap:12px;flex-wrap:wrap}.shots img{max-width:100%;height:auto;border:1px solid #555}.fail{color:#ff8a80}.ok{color:#a5d6a7}</style></head>
<body><main><h1>Three-arm experiment report</h1>
<p>Run <code>${esc(result.runId)}</code> · renderer <code>${esc(result.renderer)}</code> · provider <code>${esc(result.settings.provider)}</code> / <code>${esc(result.settings.model)}</code> · repeats ${esc(result.settings.repeats)}</p>
<p class="note"><strong>Limitations.</strong> ${result.settings.provider === 'mock' ? 'This run used the deterministic mock provider: it validates the pipeline, not model behaviour, and the arm differences below are not evidence about definitions. ' : ''}Sample is small (one fixture, few repeats). Results make no universal claim about any model, provider or design system. Metrics are reported separately and not combined into a score.</p>
<h2>Per-arm summary</h2><div class="wrap"><table><thead>${th(['Arm', 'Runs', 'Failed', 'Structural pass', 'Missing text (per run)', 'A11y issues (per run)', 'Off-palette colors (per run)', 'Mobile overflow'])}</thead><tbody>
${arms.map(([a, s]) => `<tr><th scope="row">${esc(a)}</th><td>${s.runs}</td><td>${s.failed}</td><td>${s.structuralPass}/${s.runs}</td><td>${fmt(s.missingTextCount)}</td><td>${fmt(s.a11yIssueCount)}</td><td>${fmt(s.offPaletteColors)}</td><td>${result.renderer === 'none' ? 'not rendered' : s.mobileOverflow}</td></tr>`).join('')}</tbody></table></div>
<h2>Runs</h2>${result.rows.map((r) => `<section><h3>${esc(r.arm)} · ${esc(r.task)} · rep ${r.rep} <span class="${r.status === 'ok' ? 'ok' : 'fail'}">${esc(r.status)}</span></h3>
${r.status !== 'ok' ? `<p class="fail">${esc(r.failures.join('; '))}</p>` : `<ul><li>Structural: ${r.structural.pass ? 'pass' : `fail — missing text: ${esc(r.structural.missingText.join(', ') || 'none')}; landmarks: ${esc(r.structural.missingLandmarks.join(', ') || 'none')}`}</li>
<li>A11y issues: ${esc(r.a11y.issues.join('; ') || 'none')}</li><li>Off-palette colors: ${esc(r.tokenAdherence.offPaletteColors.join(', ') || 'none')}</li>
<li><a href="${link(r.output)}">Generated HTML</a></li></ul>
${r.visual ? `<div class="shots">${Object.entries(r.visual.screenshots).map(([k, v]) => `<figure><figcaption>${esc(k)}</figcaption><img src="${link(v)}" alt="${esc(r.arm)} ${esc(k)} screenshot" width="${k === 'mobile' ? 195 : 480}"></figure>`).join('')}</div>` : ''}`}</section>`).join('')}
</main></body></html>`;
  writeFile(join(outDir, 'index.html'), html);
  writeFile(join(outDir, 'report.json'), JSON.stringify(result, null, 2) + '\n');
  return { outDir, result };
}

function relPathFrom(fromDir, toPath) {
  const a = fromDir.split('/'); const b = toPath.split('/');
  while (a.length && b.length && a[0] === b[0]) { a.shift(); b.shift(); }
  return [...a.map(() => '..'), ...b].join('/');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const arg = process.argv.find((a) => a.startsWith('--run='))?.split('=')[1];
  const runsDir = join(DIST, 'runs');
  const dir = arg ?? join(runsDir, readdirSync(runsDir).filter((d) => existsSync(join(runsDir, d, 'manifest.json'))).sort((x, y) => statSync(join(runsDir, y)).mtimeMs - statSync(join(runsDir, x)).mtimeMs)[0]);
  const { outDir, result } = writeReport(dir);
  console.log(`report -> ${relPath(outDir)}/index.html`);
  console.log(JSON.stringify(result.byArm, null, 1));
}
