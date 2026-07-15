import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    // @gearhead/ui is a `file:` link. Without this, Vite resolves gearhead's
    // sources to their real path (projects/gearhead/src/...), so their bare
    // imports (react-aria-components, clsx, ...) are looked up in
    // projects/gearhead/node_modules — which does not exist on a fresh CI
    // checkout, and is not installed before this project builds anyway
    // (deploy.yml iterates projects/*/ alphabetically, and f < g). Preserving
    // the symlink keeps gearhead's sources inside our own node_modules, so
    // they resolve against the deps declared in this package.json.
    preserveSymlinks: true,
  },

  // Base path for GitHub Pages:
  // https://spacecowboyian.github.io/clayground/fit-gang-bingo/main/
  base: '/clayground/fit-gang-bingo/main/',

  build: {
    // Write the static output directly into the docs/ folder at the repo root
    outDir: '../../docs/fit-gang-bingo/main',
    emptyOutDir: true,
  },
})
