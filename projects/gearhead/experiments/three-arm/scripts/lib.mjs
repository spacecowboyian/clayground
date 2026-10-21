// Shared helpers for the three-arm experiment scripts. Zero dependencies.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractTokens } from './extract-tokens.mjs';

const here = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(here, '..');
export const GEARHEAD = resolve(ROOT, '../..');
export const DIST = resolve(ROOT, 'dist');
export const SECTIONS = ['actions-navigation', 'forms-selection', 'disclosure-feedback', 'content-browsing', 'page-patterns'];
export const ARMS = ['tokens-only', 'tokens-components', 'definitions-only'];

export const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
export const sha256 = (data) => createHash('sha256').update(data).digest('hex');
export function writeFile(p, data) {
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, data);
}
export function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

export function loadDefinitions() {
  return SECTIONS.flatMap((s) => readJson(join(ROOT, 'definitions', `${s}.json`)));
}
export const loadManifest = () => readJson(join(ROOT, 'manifest/coverage.json'));
export const loadTasks = () => readJson(join(ROOT, 'fixtures/tasks.json'));

// Patterns that would leak implementation into an implementation-free bundle.
export const LEAK_PATTERNS = [
  ['html/jsx tag', /<\/?[A-Za-z][\w.-]*(\s[^>]*)?\/?>/],
  ['className', /\bclassName\b/],
  ['source import or module name', /\b(?:import\s+.+\s+from|@gearhead|react-aria|tailwind(?:css)?|lucide)\b/i],
  ['source file reference', /\.(?:tsx?|jsx?|css)\b/],
  ['tailwind spacing/sizing utility', /\b(?:px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr|gap|space-[xy]|size|w|h|p|m)-(?:\d|\[)/],
  ['tailwind color/typography utility', /\b(?:bg|border|ring|text|rounded|shadow)-(?:\[|xs\b|sm\b|base\b|lg\b|xl\b|2xl\b|3xl\b|md\b|full\b|none\b|white\b|black\b|\w+\/\d)/],
  ['tailwind variant prefix', /\b(?:hover|focus|focus-visible|disabled|group-data-\[[^\]]+\]|data-\[[^\]]+\]):[a-z-]+/],
  ['css declaration block', /[{;]\s*[a-z-]+\s*:\s*[^;{}]+;\s*\}/],
  ['css custom property usage', /var\(--/],
];

export function findLeaks(text) {
  return LEAK_PATTERNS.filter(([, re]) => re.test(text)).map(([name]) => name);
}

export function parseIndexExports() {
  const src = readFileSync(join(GEARHEAD, 'src/index.ts'), 'utf8');
  const names = [];
  for (const m of src.matchAll(/^export\s+\{([^}]+)\}\s+from/gm)) {
    names.push(...m[1].split(',').map((s) => s.trim()).filter(Boolean));
  }
  return names;
}

export function resolveTokens() {
  const t = extractTokens();
  const root = t.modes.root;
  const remPx = 16;
  const toPx = (v) => {
    const m = v.match(/^([\d.]+)rem$/);
    return m ? `${parseFloat(m[1]) * remPx}px` : v;
  };
  const radius = parseFloat(root.radius) * remPx;
  const radii = {
    'radius-sm': `${radius - 4}px`,
    'radius-md': `${radius - 2}px`,
    'radius-lg': `${radius}px`,
    'radius-xl': `${radius + 4}px`,
  };
  const values = { ...root, ...radii, radius: toPx(root.radius) };
  return { values, darkOverrides: t.modes.dark, note: t.note };
}

export function modelTokens() {
  const t = extractTokens();
  const r = resolveTokens();
  const radii = Object.fromEntries(Object.entries(r.values).filter(([k]) => k.startsWith('radius-')));
  return {
    note: t.note,
    modes: t.modes,
    aliases: t.aliases,
    resolved: radii,
  };
}

export function relPath(p) {
  return relative(ROOT, p);
}
export { existsSync, mkdirSync, readFileSync, writeFileSync, join, resolve };
