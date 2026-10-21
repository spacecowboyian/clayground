// Builds the three isolated context bundles into dist/bundles/<arm>/ with manifests and hashes.
// Usage: node scripts/build-bundles.mjs
import { fileURLToPath } from 'node:url';
import { basename } from 'node:path';
import {
  ARMS, DIST, GEARHEAD, LEAK_PATTERNS, findLeaks, join, loadDefinitions, modelTokens, relPath, resolveTokens, sha256, walk, writeFile,
  readFileSync, existsSync,
} from './lib.mjs';
import { rmSync } from 'node:fs';
import { validate } from './validate.mjs';

// Explicit allow/deny rules per arm. "Task content" is added by the generator, identically for every arm.
export const RULES = {
  'tokens-only': {
    allow: ['tokens.json'],
    deny: 'Any component anatomy, markup, source, recipes, screenshots or component styling. Text must not match implementation leak patterns.',
    scanForLeaks: true,
  },
  'tokens-components': {
    allow: ['tokens.json', 'package/package.json', 'package/src/**'],
    deny: 'Definitions, planning docs, experiment manifests, harness code and prior outputs.',
    scanForLeaks: false,
  },
  'definitions-only': {
    allow: ['definitions.json'],
    deny: 'Any Gearhead HTML/JSX/TSX, source, CSS selectors or declarations, utility-class recipes, importable components, rendered references, provenance paths.',
    scanForLeaks: true,
  },
};

function bundleFiles(arm) {
  if (arm === 'tokens-only') {
    return [['tokens.json', JSON.stringify(modelTokens(), null, 2) + '\n']];
  }
  if (arm === 'tokens-components') {
    const files = [['tokens.json', JSON.stringify(modelTokens(), null, 2) + '\n']];
    files.push(['package/package.json', readFileSync(join(GEARHEAD, 'package.json'), 'utf8')]);
    for (const p of walk(join(GEARHEAD, 'src'))) {
      if (/\.(?:tsx?|css|mdx?)$/.test(p)) files.push([`package/src/${p.slice(join(GEARHEAD, 'src').length + 1)}`, readFileSync(p, 'utf8')]);
    }
    return files;
  }
  const tokens = resolveTokens();
  const doc = {
    note: 'Self-contained design definitions. Every token a definition references is resolved in "tokens". Spacing and type sizes are stated in px.',
    tokens: { ...tokens.values },
    tokenModeOverrides: { dark: tokens.darkOverrides },
    definitions: loadDefinitions().map((d) => ({
      ...d,
      tokenBindings: d.tokenBindings.map((b) => ({ ...b, value: tokens.values[b.token] })),
    })),
  };
  return [['definitions.json', JSON.stringify(doc, null, 2) + '\n']];
}

export function buildBundles({ outDir = join(DIST, 'bundles') } = {}) {
  const check = validate();
  if (check.errors.length) throw new Error(`Definitions invalid:\n${check.errors.join('\n')}`);
  rmSync(outDir, { recursive: true, force: true });
  const result = {};
  for (const arm of ARMS) {
    const files = bundleFiles(arm);
    const rules = RULES[arm];
    if (rules.scanForLeaks) {
      for (const [path, text] of files) {
        const leaks = findLeaks(text);
        if (leaks.length) throw new Error(`Arm ${arm} file ${path} leaks implementation: ${leaks.join(', ')}`);
      }
    }
    const manifest = {
      arm,
      rules: { allow: rules.allow, deny: rules.deny },
      files: files.map(([path, text]) => ({ path, bytes: Buffer.byteLength(text), sha256: sha256(text) })),
    };
    manifest.bundleSha256 = sha256(manifest.files.map((f) => `${f.path}:${f.sha256}`).join('\n'));
    for (const [path, text] of files) writeFile(join(outDir, arm, path), text);
    writeFile(join(outDir, `${arm}.manifest.json`), JSON.stringify(manifest, null, 2) + '\n');
    result[arm] = manifest;
  }
  assertIsolation(result);
  return result;
}

// Arms 1 and 3 must never contain any of arm 2's source files.
export function assertIsolation(manifests) {
  const sourcePaths = new Set(manifests['tokens-components'].files.filter((f) => f.path.startsWith('package/')).map((f) => f.path));
  for (const arm of ['tokens-only', 'definitions-only']) {
    for (const f of manifests[arm].files) {
      if (sourcePaths.has(f.path)) throw new Error(`Isolation violated: ${arm} contains ${f.path}`);
    }
  }
  const allow = (arm) => manifests[arm].files.every((f) => RULES[arm].allow.some((a) => a === f.path || (a.endsWith('/**') && f.path.startsWith(a.slice(0, -2)))));
  for (const arm of ARMS) if (!allow(arm)) throw new Error(`Arm ${arm} contains files outside its allow list`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const m = buildBundles();
  for (const [arm, man] of Object.entries(m)) console.log(`${arm}: ${man.files.length} files, sha256 ${man.bundleSha256.slice(0, 12)}`);
  console.log('wrote', relPath(join(DIST, 'bundles')));
}
