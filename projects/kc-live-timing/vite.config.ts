import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Base path for GitHub Pages:
  // https://spacecowboyian.github.io/clayground/kc-live-timing/
  base: '/clayground/kc-live-timing/',

  build: {
    // Write the static output directly into the docs/ folder at the repo root
    outDir: '../../docs/kc-live-timing',
    emptyOutDir: true,
  },
})
