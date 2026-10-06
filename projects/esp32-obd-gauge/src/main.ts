import './styles/app.css';
import { createPeakTracker } from './peaks';
import { createRpmMeter } from './rpmmeter';
import { createTempBar, tempBand } from './tempbar';
import { createTileGrid } from './tilegrid';
import { resolveSource } from './telemetry/source';
import { BAND_LABEL } from './telemetry/types';
import type { ConnectionState, TelemetryState } from './telemetry/types';

const LINK_TEXT: Record<ConnectionState, string> = {
  connecting: 'Connecting',
  live: 'Live',
  stale: 'Signal lost',
  disconnected: 'Disconnected',
};

const root = document.documentElement;
const app = document.querySelector<HTMLElement>('#app');
if (!app) throw new Error('main: #app missing');

const source = resolveSource(window.location.search);
const simulated = source.label.startsWith('simulated');
const peaks = createPeakTracker();

const rpm = createRpmMeter();
const temp = createTempBar();
const tiles = createTileGrid(peaks);

app.innerHTML = `
  <header class="bar">
    <h1 class="bar__title">OBD Gauge</h1>
    <span class="link"><span class="link__dot"></span><span data-role="link">Connecting</span></span>
    <button type="button" class="reset" data-role="reset">Reset run</button>
  </header>
  <div class="stack" data-role="stack"></div>
  <p class="notice" data-role="notice" hidden></p>
  <footer class="foot"><span data-role="source"></span><span data-role="age"></span></footer>
  <p class="sr-only" role="status" aria-live="polite" data-role="announce"></p>`;

must<HTMLElement>('[data-role="stack"]').append(rpm.el, temp.el, tiles.el);

const linkText = must<HTMLElement>('[data-role="link"]');
const notice = must<HTMLElement>('[data-role="notice"]');
const age = must<HTMLElement>('[data-role="age"]');
const announce = must<HTMLElement>('[data-role="announce"]');
must<HTMLElement>('[data-role="source"]').textContent = source.label;

let lastAnnouncement = '';
let lastFrameTs: number | null = null;
let lastState: TelemetryState | null = null;

// One action to clear every held value between runs. Six separate taps while
// you are being called to grid is not a workflow.
must<HTMLButtonElement>('[data-role="reset"]').addEventListener('click', () => {
  peaks.resetAll();
  if (lastState) tiles.update(lastState);
  announce.textContent = 'Session values reset.';
  lastAnnouncement = '';
});

source.subscribe((state) => {
  lastState = state;
  // Peaks advance only on genuinely new samples; the watchdog re-emits the
  // same frame on its own timer to age the display.
  if (state.frame && state.frame.ts !== lastFrameTs) {
    lastFrameTs = state.frame.ts;
    peaks.update(state.frame);
  }

  root.dataset.link = state.connection;
  root.dataset.band = state.frame ? tempBand(state.frame.coolantC) : 'normal';

  rpm.update(state);
  temp.update(state);
  tiles.update(state);
  linkText.textContent = LINK_TEXT[state.connection];
  age.textContent = formatAge(state);
  renderNotice(state);

  // Announce transitions only. At 2Hz, announcing every frame would make
  // VoiceOver unusable.
  const summary = state.frame
    ? `${LINK_TEXT[state.connection]}. Coolant ${BAND_LABEL[tempBand(state.frame.coolantC)]}.`
    : `${LINK_TEXT[state.connection]}.`;
  if (summary !== lastAnnouncement) {
    lastAnnouncement = summary;
    announce.textContent = summary;
  }
});

function renderNotice(state: TelemetryState): void {
  if (state.connection === 'disconnected' && !simulated) {
    notice.hidden = false;
    notice.classList.add('notice--alert');
    notice.textContent =
      'No dongle on this network. Join the gauge’s Wi‑Fi access point, then reload.';
    return;
  }
  if (simulated) {
    notice.hidden = false;
    notice.classList.remove('notice--alert');
    notice.textContent =
      'Simulated telemetry — no dongle attached. Press and hold any tile to change what it shows. Append ?sim=warmup, normal, hot, overheat, redline, stale or offline.';
    return;
  }
  notice.hidden = true;
}

function formatAge(state: TelemetryState): string {
  if (state.ageMs === null) return 'awaiting first frame';
  if (state.ageMs < 250) return 'updated just now';
  if (state.ageMs < 1_500) return `updated ${Math.round(state.ageMs / 50) * 50} ms ago`;
  return `last frame ${(state.ageMs / 1000).toFixed(1)} s ago`;
}

function must<T extends Element>(selector: string): T {
  const found = document.querySelector<T>(selector);
  if (!found) throw new Error(`main: missing ${selector}`);
  return found;
}
