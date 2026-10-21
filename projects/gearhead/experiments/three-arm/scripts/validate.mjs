// Validates definitions against the schema contract, the token table, the coverage manifest and the leak rules.
// Usage: node scripts/validate.mjs
import { fileURLToPath } from 'node:url';
import {
  ROOT, SECTIONS, findLeaks, join, loadDefinitions, loadManifest, parseIndexExports, readJson, resolveTokens,
} from './lib.mjs';

const arr = Array.isArray;
const str = (v) => typeof v === 'string' && v.length > 0;

export function validate() {
  const errors = [];
  const err = (id, msg) => errors.push(`${id}: ${msg}`);
  const schema = readJson(join(ROOT, 'schema/recipe.schema.json'));
  const required = schema.required;
  const allowed = new Set(Object.keys(schema.properties));
  const { values } = resolveTokens();
  const defs = loadDefinitions();
  const manifest = loadManifest();

  const seen = new Set();
  for (const d of defs) {
    const id = d.id ?? '(no id)';
    for (const k of required) if (!(k in d)) err(id, `missing "${k}"`);
    for (const k of Object.keys(d)) if (!allowed.has(k)) err(id, `unknown key "${k}"`);
    if (seen.has(id)) err(id, 'duplicate id');
    seen.add(id);
    if (!SECTIONS.includes(d.section)) err(id, `bad section ${d.section}`);
    if (!['component', 'pattern'].includes(d.kind)) err(id, 'bad kind');
    if (!/^\d+\.\d+\.\d+$/.test(d.version ?? '')) err(id, 'bad version');
    if (!str(d.purpose)) err(id, 'empty purpose');
    for (const key of ['parts', 'tokenBindings', 'accessibility']) if (!arr(d[key]) || d[key].length === 0) err(id, `"${key}" must be non-empty`);
    for (const key of ['variants', 'states', 'layout', 'responsive', 'constraints']) if (!arr(d[key])) err(id, `"${key}" must be an array`);
    const partNames = new Set((d.parts ?? []).map((p) => p.name));
    for (const p of d.parts ?? []) if (!str(p.name) || !str(p.description)) err(id, 'part needs name and description');
    for (const v of d.variants ?? []) for (const k of ['name', 'values', 'default', 'description']) if (!(k in v)) err(id, `variant missing ${k}`);
    for (const b of d.tokenBindings ?? []) {
      if (!(b.token in values)) err(id, `unknown token "${b.token}"`);
      if (!str(b.role)) err(id, 'binding needs role');
    }
    // Bindings may name the whole component for pattern-level parts, so only warn-level strictness on parts.
    for (const b of d.tokenBindings ?? []) if (!partNames.has(b.part) && !['page-header', 'container'].includes(b.part)) err(id, `binding part "${b.part}" is not a declared part`);
    const leaks = findLeaks(JSON.stringify(d));
    if (leaks.length) err(id, `implementation leak: ${leaks.join(', ')}`);
  }

  const families = manifest.families;
  const famIds = new Set(families.map((f) => f.id));
  for (const f of families) {
    const d = defs.find((x) => x.id === f.id);
    if (!d) err(f.id, 'no definition');
    else if (d.section !== f.section) err(f.id, `section mismatch: manifest ${f.section} vs definition ${d.section}`);
  }
  for (const d of defs) if (!famIds.has(d.id)) err(d.id, 'definition missing from coverage manifest');

  const covered = new Set(families.flatMap((f) => f.exports).concat(manifest.ignoredExports));
  for (const name of parseIndexExports()) if (!covered.has(name)) err('manifest', `export "${name}" not covered`);
  for (const name of families.flatMap((f) => f.exports)) if (!parseIndexExports().includes(name)) err('manifest', `"${name}" is not exported by src/index.ts`);

  return { errors, definitions: defs.length, families: families.length };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { errors, definitions, families } = validate();
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
  }
  console.log(`OK: ${definitions} definitions cover ${families} manifest families`);
}
