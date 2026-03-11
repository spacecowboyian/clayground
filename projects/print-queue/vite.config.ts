import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    // Ensure all deps resolve from print-queue's own node_modules,
    // even when Vite processes gearhead source files
    alias: {
      'clsx':                path.resolve(__dirname, 'node_modules/clsx'),
      'tailwind-merge':      path.resolve(__dirname, 'node_modules/tailwind-merge'),
      'lucide-react':        path.resolve(__dirname, 'node_modules/lucide-react'),
      'react-aria-components': path.resolve(__dirname, 'node_modules/react-aria-components'),
      'tw-animate-css':      path.resolve(__dirname, 'node_modules/tw-animate-css/dist/tw-animate.css'),
    },
    dedupe: ['react', 'react-dom', 'react-aria-components'],
  },

  // Base path for GitHub Pages:
  // https://spacecowboyian.github.io/clayground/print-queue/main/
  base: '/clayground/print-queue/main/',

  build: {
    // Write the static output directly into the docs/ folder at the repo root
    outDir: '../../docs/print-queue/main',
    emptyOutDir: true,
  },
})
