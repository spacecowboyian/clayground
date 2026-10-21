// Generates HTML for every arm x task x repeat, archives exactly what was sent, and optionally renders screenshots.
// Usage: node scripts/generate.mjs [--provider=mock] [--renderer=none|playwright] [--repeats=1] [--run-id=ID] [--out=DIR]
// Live providers are intentionally not implemented: the owner must first choose model, settings and budget (see README).
import { fileURLToPath } from 'node:url';
import { ARMS, DIST, join, loadTasks, readFileSync, sha256, writeFile, relPath } from './lib.mjs';
import { buildBundles } from './build-bundles.mjs';

export const SYSTEM_PROMPT = 'You are a front-end engineer. Build exactly what the task asks for using only the design-system context provided. Follow the output contract exactly.';

function bundleText(bundleDir, manifest) {
  return manifest.files.map((f) => `--- FILE: ${f.path} ---\n${readFileSync(join(bundleDir, f.path), 'utf8')}`).join('\n\n');
}

export function buildRequest({ arm, task, contract, settings, bundleDir, manifest }) {
  const taskText = `# Task: ${task.title}\n\n${task.brief}\n\n## Content\n${JSON.stringify(task.content, null, 2)}\n\n## Output contract\n${JSON.stringify(contract, null, 2)}`;
  const shared = { system: SYSTEM_PROMPT, task: taskText, settings: { ...settings, mockFailArms: undefined, mockMalformedArms: undefined } };
  const user = `${taskText}\n\n## Design-system context\n\n${bundleText(bundleDir, manifest)}`;
  return {
    request: { settings: shared.settings, messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: user }] },
    sharedSha256: sha256(JSON.stringify(shared)),
  };
}

export function extractHtml(response) {
  const m = response.match(/```html\s*\n([\s\S]*?)\n```/);
  return m ? m[1] : null;
}

export async function runExperiment({
  providerName = 'mock', renderer = 'none', repeats = 1, runId, outDir, settings = {}, arms = ARMS,
} = {}) {
  if (!['mock', 'replay'].includes(providerName)) throw new Error(`Provider "${providerName}" is not implemented. Use "mock" or "replay" (recorded responses).`);
  const provider = (await import(`./providers/${providerName}.mjs`)).generate;
  const bundleRoot = join(DIST, 'bundles');
  const manifests = buildBundles({ outDir: bundleRoot });
  const { tasks, outputContract } = loadTasks();
  const id = runId ?? `run-${new Date().toISOString().replace(/[:.]/g, '-')}`;
  const root = outDir ?? join(DIST, 'runs', id);
  const fullSettings = { provider: providerName, model: 'mock-1', temperature: 0, repeats, ...settings };
  const rend = renderer === 'playwright' ? await (await import('./render.mjs')).openRenderer() : null;
  const runs = [];
  try {
    for (const task of tasks) {
      for (const arm of arms) {
        for (let rep = 1; rep <= repeats; rep++) {
          const dir = join(root, arm, task.id, `rep-${rep}`);
          const bundleDir = join(bundleRoot, arm);
          const { request, sharedSha256 } = buildRequest({ arm, task, contract: outputContract, settings: fullSettings, bundleDir, manifest: manifests[arm] });
          const requestJson = JSON.stringify(request, null, 2);
          writeFile(join(dir, 'request.json'), requestJson);
          const run = { arm, task: task.id, rep, dir: relPath(dir), requestSha256: sha256(requestJson), sharedSha256, bundleSha256: manifests[arm].bundleSha256, status: 'ok', failures: [] };
          try {
            const { response, usage } = await provider({ arm, bundleDir, task, rep, settings: fullSettings });
            writeFile(join(dir, 'response.txt'), response);
            run.usage = usage;
            const html = extractHtml(response);
            if (!html) throw new Error('response contained no ```html block');
            writeFile(join(dir, 'output/index.html'), html);
            run.output = relPath(join(dir, 'output/index.html'));
            if (rend) run.render = await rend.render(join(dir, 'output/index.html'), outputContract.viewports, join(dir, 'screenshot'));
            else run.render = null;
          } catch (e) {
            run.status = 'failed';
            run.failures.push(String(e.message ?? e));
          }
          writeFile(join(dir, 'status.json'), JSON.stringify(run, null, 2));
          runs.push(run);
        }
      }
    }
  } finally {
    await rend?.close();
  }
  const manifest = { runId: id, createdAt: new Date().toISOString(), settings: fullSettings, renderer, bundles: Object.fromEntries(ARMS.map((a) => [a, manifests[a].bundleSha256])), runs };
  writeFile(join(root, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  return { root, manifest };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const arg = (n, d) => process.argv.find((a) => a.startsWith(`--${n}=`))?.split('=')[1] ?? d;
  const { root, manifest } = await runExperiment({
    providerName: arg('provider', 'mock'), renderer: arg('renderer', 'none'), repeats: Number(arg('repeats', 1)), runId: arg('run-id'), outDir: arg('out'),
    settings: Object.fromEntries(Object.entries({ model: arg('model'), responsesDir: arg('responses') }).filter(([, v]) => v)),
  });
  const failed = manifest.runs.filter((r) => r.status === 'failed').length;
  console.log(`${manifest.runs.length} runs (${failed} failed) -> ${relPath(root)}`);
}
