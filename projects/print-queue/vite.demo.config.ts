import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const DEMO_MODULES = ['auth', 'storage', 'inventory', 'settings', 'bambu']
const demoDir = path.resolve(__dirname, 'src/demo')

// Swap the real lib modules (incl. Supabase) for in-memory fakes, for any relative import.
function demoLibSwap(): Plugin {
  return {
    name: 'print-queue-demo-lib-swap',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!importer || !source.startsWith('.')) return null
      const resolved = path.resolve(path.dirname(importer), source)
      for (const name of DEMO_MODULES) {
        if (resolved === path.resolve(__dirname, 'src/lib', name)) {
          return path.join(demoDir, `${name}.ts`)
        }
      }
      return null
    },
  }
}

// Password-free fake-data demo. Separate from the production app build.
export default defineConfig({
  define: { 'import.meta.env.VITE_PRINT_QUEUE_DEMO': JSON.stringify('true') },
  plugins: [demoLibSwap(), react(), tailwindcss()],
  resolve: {
    alias: {
      'clsx': path.resolve(__dirname, 'node_modules/clsx'),
      'tailwind-merge': path.resolve(__dirname, 'node_modules/tailwind-merge'),
      'lucide-react': path.resolve(__dirname, 'node_modules/lucide-react'),
      'react-aria-components': path.resolve(__dirname, 'node_modules/react-aria-components'),
      'tw-animate-css': path.resolve(__dirname, 'node_modules/tw-animate-css/dist/tw-animate.css'),
    },
    dedupe: ['react', 'react-dom', 'react-aria-components'],
  },
  base: './',
  build: {
    outDir: '../../docs/print-queue/demo-preview',
    emptyOutDir: true,
    rollupOptions: { input: 'demo.html' },
  },
})
