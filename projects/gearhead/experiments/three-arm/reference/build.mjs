// Builds reference/ (real Gearhead components) into one self-contained index.html.
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const tmp = join(here, '.build');
rmSync(tmp, { recursive: true, force: true });
await build({
  root: here, logLevel: 'warn', plugins: [react(), tailwindcss()],
  build: { outDir: tmp, emptyOutDir: true, cssCodeSplit: false, assetsInlineLimit: 1e9,
    rollupOptions: { input: join(here, 'index.html'), output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'a.js', assetFileNames: 'a[extname]' } } },
});
const js = readFileSync(join(tmp, 'a.js'), 'utf8');
const css = readFileSync(join(tmp, 'a.css'), 'utf8');
const html = `<!doctype html><html lang="en" class="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Print queue</title><style>${css}</style></head><body><div id="root"></div><script>${js.replace(/<\/script/g, '<\\/script')}</script></body></html>`;
const out = process.argv[2];
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, html);
rmSync(tmp, { recursive: true, force: true });
console.log('wrote', out);
