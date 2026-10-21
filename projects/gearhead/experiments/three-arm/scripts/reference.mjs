// Builds the reference page from the real Gearhead components, renders it and evaluates it with the same checks as the arms.
// Usage: node scripts/reference.mjs [--run-id=live-1]
import { execFileSync } from 'node:child_process';
import { DIST, ROOT, join, loadTasks, resolveTokens, writeFile, mkdirSync } from './lib.mjs';
import { evaluateHtml, flatten } from './evaluate.mjs';
import { openRenderer } from './render.mjs';

const runId = (process.argv.find((a) => a.startsWith('--run-id=')) ?? '--run-id=live-1').split('=')[1];
const dir = join(DIST, 'runs', runId, 'reference', 'print-queue-dashboard', 'rep-1');
mkdirSync(join(dir, 'output'), { recursive: true });
const out = join(dir, 'output/index.html');
execFileSync('node', [join(ROOT, 'reference/build.mjs'), out], { stdio: 'inherit', cwd: join(ROOT, '../..') });

const fixtures = loadTasks();
const task = fixtures.tasks[0];
const r = await openRenderer();
const render = await r.render(out, fixtures.outputContract.viewports, join(dir, 'screenshot'), { captureHtml: true });
const { renderedHtml, ...views } = render;
await r.close();
const evaluation = evaluateHtml(renderedHtml.replace(/<script[\s\S]*?<\/script>/g, ''), task.required, flatten(resolveTokens()));
writeFile(join(dir, 'status.json'), JSON.stringify({ arm: 'reference', task: task.id, rep: 1, status: 'ok', render: views, evaluation }, null, 2));
console.log(JSON.stringify({ render: Object.fromEntries(Object.entries(views).map(([k, v]) => [k, { overflow: v.horizontalOverflow, ext: v.externalRequests, err: v.consoleErrors }])), evaluation }, null, 1));
