import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/clayground/bpsds/',
  build: {
    outDir: '../../docs/bpsds',
    emptyOutDir: true,
  },
});
