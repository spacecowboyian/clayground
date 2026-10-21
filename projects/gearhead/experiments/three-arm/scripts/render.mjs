// Renders an HTML file to desktop/mobile screenshots. Optional: needs playwright-core and a Chromium build.
// Set CHROMIUM_PATH to a Chromium/Chrome executable, otherwise the newest cached Playwright Chromium is used.
import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const cache = join(homedir(), 'Library/Caches/ms-playwright');
  if (!existsSync(cache)) return undefined;
  const dirs = readdirSync(cache).filter((d) => d.startsWith('chromium-')).sort().reverse();
  for (const d of dirs) {
    for (const rel of ['chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-mac/Chromium.app/Contents/MacOS/Chromium', 'chrome-mac-arm64/Chromium.app/Contents/MacOS/Chromium', 'chrome-linux/chrome']) {
      const p = join(cache, d, rel);
      if (existsSync(p)) return p;
    }
  }
  return undefined;
}

export async function openRenderer() {
  let chromium;
  try {
    ({ chromium } = await import('playwright-core'));
  } catch {
    throw new Error('playwright-core is not installed (run npm install in experiments/three-arm) or use --renderer=none');
  }
  const browser = await chromium.launch({ executablePath: findChromium() });
  return {
    async render(htmlPath, viewports, outPrefix, { captureHtml = false } = {}) {
      const results = {};
      for (const vp of viewports) {
        const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
        const network = [];
        page.on('request', (r) => { if (!r.url().startsWith('file:') && !r.url().startsWith('data:')) network.push(r.url()); });
        const consoleErrors = [];
        page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
        page.on('pageerror', (e) => consoleErrors.push(String(e)));
        await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
        const file = `${outPrefix}-${vp.name}.png`;
        await page.screenshot({ path: file, fullPage: true });
        const metrics = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          bodyBackground: getComputedStyle(document.body).backgroundColor,
        }));
        results[vp.name] = { screenshot: file, ...metrics, horizontalOverflow: metrics.scrollWidth > metrics.clientWidth, externalRequests: network, consoleErrors };
        if (captureHtml && !results.renderedHtml) results.renderedHtml = await page.content();
        await page.close();
      }
      return results;
    },
    close: () => browser.close(),
  };
}
