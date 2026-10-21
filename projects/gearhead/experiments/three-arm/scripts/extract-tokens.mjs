// Extracts design tokens from src/styles/theme.css into tokens/tokens.json.
// Usage: node scripts/extract-tokens.mjs [--check]
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const themePath = resolve(root, '../../src/styles/theme.css');
const outPath = resolve(root, 'tokens/tokens.json');

function block(css, startPattern) {
  const start = css.search(startPattern);
  if (start < 0) throw new Error(`Block not found: ${startPattern}`);
  const open = css.indexOf('{', start);
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++;
    if (css[i] === '}' && --depth === 0) return css.slice(open + 1, i);
  }
  throw new Error('Unbalanced braces');
}

function declarations(body) {
  const out = {};
  for (const m of body.matchAll(/^\s*--([\w-]+):\s*([^;]+);/gm)) out[m[1]] = m[2].trim();
  return out;
}

export function extractTokens() {
  const css = readFileSync(themePath, 'utf8');
  const base = declarations(block(css, /^:root\s*\{/m));
  const dark = declarations(block(css, /^\.dark\s*\{/m));
  const theme = declarations(block(css, /@theme inline\s*\{/));
  const aliases = {};
  for (const [name, value] of Object.entries(theme)) {
    const ref = value.match(/^var\(--([\w-]+)\)$/);
    if (ref) aliases[name] = ref[1];
  }
  return {
    source: 'projects/gearhead/src/styles/theme.css',
    note: 'The :root block is already a dark palette (background #222222). The .dark block only overrides the listed names.',
    modes: { root: base, dark },
    aliases,
    derived: Object.fromEntries(Object.entries(theme).filter(([n, v]) => !/^var\(--[\w-]+\)$/.test(v))),
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const json = JSON.stringify(extractTokens(), null, 2) + '\n';
  if (process.argv.includes('--check')) {
    if (readFileSync(outPath, 'utf8') !== json) {
      console.error('tokens.json is out of date; run node scripts/extract-tokens.mjs');
      process.exit(1);
    }
  } else {
    writeFileSync(outPath, json);
    console.log('wrote', outPath);
  }
}
