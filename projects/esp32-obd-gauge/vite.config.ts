import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// The build artifact has two jobs:
//   1. docs/esp32-obd-gauge/main/index.html  — the Clayground gallery demo
//   2. firmware/data/index.html              — flashed to ESP32 LittleFS
// Both are the SAME file. viteSingleFile inlines every asset so the dongle's
// web server answers exactly one request, and `base: './'` keeps the file
// portable between a Pages subpath and http://192.168.4.1/.
export default defineConfig({
  plugins: [viteSingleFile()],
  base: './',
  build: {
    outDir: '../../docs/esp32-obd-gauge/main',
    emptyOutDir: true,
    cssCodeSplit: false,
    // Keep the flash footprint honest — warn well before 4MB is a worry.
    chunkSizeWarningLimit: 150,
  },
});
