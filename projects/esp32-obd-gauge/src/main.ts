import './styles/app.css';
import { createGauge } from './gauge';
import { createTiles } from './tiles';
import { resolveSource } from './telemetry/source';
import { BAND_LABEL, tempBand } from './telemetry/types';
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

const gauge = createGauge();
const tiles = createTiles();

app.innerHTML = `
  <header class="bar">
    <h1 class="bar__title">OBD Gauge</h1>
    <span class="link" data-role="link">
      <span class="link__dot"></span><span data-role="link-text">Connecting</span>
    </span>
  </header>
  <div class="readouts" data-role="readouts"></div>
  <p class="notice" data-role="notice" hidden></p>
  <footer class="foot">
    <span data-role="source"></span>
    <span data-role="age"></span>
  </footer>
  <p class="sr-only" role="status" aria-live="polite" data-role="announce"></p>`;

const readouts = must<HTMLElement>('[data-role="readouts"]');
readouts.append(gauge.el, tiles.el);

const linkText = must<HTMLElement>('[data-role="link-text"]');
const notice = must<HTMLElement>('[data-role="notice"]');
const sourceLabel = must<HTMLElement>('[data-role="source"]');
const age = must<HTMLElement>('[data-role="age"]');
const announce = must<HTMLElement>('[data-role="announce"]');

sourceLabel.innerHTML = `Source: <code>${escape(source.label)}</code>`;

let lastAnnouncement = '';

source.subscribe((state) => {
  root.dataset.link = state.connection;
  root.dataset.band = state.frame ? tempBand(state.frame.coolantC) : 'normal';

  gauge.update(state);
  tiles.update(state);
  linkText.textContent = LINK_TEXT[state.connection];
  age.textContent = formatAge(state);
  renderNotice(state);

  // Announce only meaningful transitions. At 2Hz, announcing every frame
  // would make VoiceOver unusable.
  const summary = state.frame
    ? `${LINK_TEXT[state.connection]}. ${BAND_LABEL[tempBand(state.frame.coolantC)]}.`
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
      'Simulated telemetry — no dongle attached. Append ?sim=warmup, normal, hot, overheat, stale or offline to drive a different scenario.';
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

function escape(text: string): string {
  return text.replace(/[&<>"]/g, (ch) => `&#${ch.charCodeAt(0)};`);
}
