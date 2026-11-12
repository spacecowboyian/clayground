import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Separate plain-HTML proof build. The production app build remains unchanged.
export default defineConfig({
  plugins: [tailwindcss()],
  base: './',
  build: {
    outDir: '../../docs/print-queue/workflow-proof',
    rollupOptions: { input: 'wakata-workflow.html' },
  },
})
