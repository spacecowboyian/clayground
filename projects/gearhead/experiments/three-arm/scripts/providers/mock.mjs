// Mock provider: deterministic, offline, no credentials. Exercises the pipeline only; it is NOT a model.
// Provider contract: async generate({ arm, bundleDir, task, settings }) -> { response: string, usage?: object }
// where the response contains one fenced ```html block, as required by the output contract.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function tokenValues(arm, bundleDir) {
  if (arm === 'definitions-only') return JSON.parse(readFileSync(join(bundleDir, 'definitions.json'), 'utf8')).tokens;
  const t = JSON.parse(readFileSync(join(bundleDir, 'tokens.json'), 'utf8'));
  return { ...t.modes.root, ...t.resolved };
}

export async function generate({ arm, bundleDir, task, settings }) {
  if (settings.mockFailArms?.includes(arm)) throw new Error(`mock provider configured to fail for ${arm}`);
  if (settings.mockMalformedArms?.includes(arm)) return { response: 'Sorry, no HTML here.' };
  const t = tokenValues(arm, bundleDir);
  const c = task.content;
  const css = `
:root{--bg:${t.background};--fg:${t.foreground};--card:${t.card};--border:${t.border};--muted:${t['muted-foreground']};--input:${t.input};--accent:${t['accent-orange']};--radius:${t['radius-lg']}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.5 system-ui,sans-serif}
main{padding:24px;display:flex;flex-direction:column;gap:24px;max-width:1440px;margin:0 auto}
nav ol{display:flex;gap:8px;list-style:none;padding:0;margin:0;color:var(--muted);font-size:14px}
h1{font-size:24px;font-weight:500;margin:4px 0}p.d{color:var(--muted);margin:0;font-size:14px}
.stats{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px}
.card .v{font-size:30px;font-weight:500}.card small{color:var(--muted)}
.layout{display:flex;gap:24px}aside{width:224px;flex:none}.col{flex:1;min-width:0;display:flex;flex-direction:column;gap:16px}
input,select{height:40px;padding:0 12px;background:var(--input);border:1px solid var(--border);border-radius:var(--radius);color:var(--fg);width:100%}
input[type=checkbox]{width:auto;height:auto}
label{display:block;font-size:14px;margin-bottom:8px}ul.o{list-style:none;padding:0;margin:0;display:grid;gap:12px}
ul.o li{display:flex;justify-content:space-between;gap:12px;align-items:center}.badge{font-size:12px;padding:2px 10px;border-radius:999px;border:1px solid var(--border)}
button{background:var(--accent);color:#fff;border:0;border-radius:var(--radius);padding:8px 16px;font:inherit}
.settings{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));align-items:end}
@media(max-width:767px){.layout{flex-direction:column}aside{width:auto}}`;
  const crumbs = c.breadcrumbs.map((b) => `<li>${esc(b)}</li>`).join('');
  const stats = c.metrics.map((m) => `<div class="card"><small>${esc(m.title)}</small><div class="v">${esc(m.value)}</div><small>${esc(m.trend)}</small></div>`).join('');
  const filters = c.filters.map((g) => `<fieldset><legend>${esc(g.group)}</legend>${g.options.map((o) => `<div><label><input type="checkbox"> ${esc(o)}</label></div>`).join('')}</fieldset>`).join('');
  const orders = c.orders.map((o) => `<li><span><strong>${esc(o.id)}</strong> ${esc(o.name)}</span><span class="badge">${esc(o.status)}</span></li>`).join('');
  const s = c.settings;
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(c.pageTitle)}</title><style>${css}</style></head>
<body><main>
<header><nav aria-label="Breadcrumb"><ol>${crumbs}</ol></nav><h1>${esc(c.pageTitle)}</h1><p class="d">${esc(c.pageDescription)}</p></header>
<section class="stats" aria-label="Summary">${stats}</section>
<div class="layout"><aside aria-label="Filters">${filters}</aside>
<div class="col"><div><label for="q">${esc(c.searchPlaceholder)}</label><input id="q" type="search" placeholder="${esc(c.searchPlaceholder)}"></div>
<section class="card" aria-label="Orders"><ul class="o">${orders}</ul></section></div></div>
<section class="card settings" aria-label="Settings"><div><label for="qty">${esc(s.quantityLabel)}</label><input id="qty" type="number" value="1"></div>
<div><label for="pri">${esc(s.priorityLabel)}</label><select id="pri">${s.priorityOptions.map((p) => `<option>${esc(p)}</option>`).join('')}</select></div>
<div><label><input type="checkbox" role="switch"> ${esc(s.notificationLabel)}</label></div>
<div><button type="button">${esc(s.saveLabel)}</button></div></section>
</main></body></html>`;
  return { response: `Mock output (${arm}).\n\n\`\`\`html\n${html}\n\`\`\`\n`, usage: { inputTokens: 0, outputTokens: 0, cost: 0 } };
}
