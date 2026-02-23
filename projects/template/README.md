# template

Vite + React + TypeScript starter for Clayground experiments.

## Quick start

```bash
cd projects/template
npm install
npm run dev        # → http://localhost:5173
```

## Build for GitHub Pages

```bash
npm run build      # → docs/template/
```

The static output lands in `../../docs/template/`, which is served at
`https://spacecowboyian.github.io/clayground/template/`.

## Using the design system

To pull in components from [Gearhead](../gearhead/), add it as a local dependency:

```json
// package.json
"dependencies": {
  "@gearhead/ui": "file:../gearhead"
}
```

Then in `vite.config.ts`, tell Vite to transpile it:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## Folder structure

```
template/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── package.json
└── src/
    ├── main.tsx
    ├── App.tsx
    └── index.css
```
