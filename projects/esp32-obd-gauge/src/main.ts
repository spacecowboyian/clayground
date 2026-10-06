import './styles/app.css';
import { createPeakTracker } from './peaks';
import { createRpmMeter } from './rpmmeter';
import { createTempBar, tempBand } from './tempbar';
import { createTileGrid } from './tilegrid';
import { resolveSource } from './telemetry/source';
import { BAND_LABEL } from './telemetry/types';
import type { ConnectionState } from './telemetry/types';

const LINK_TEXT: Record<ConnectionState, string> = {
  connecting: 'Connecting',
  live: 'Live',
  stale: 'Signal lost',
  disconnected: 'Disconnected',
};

const app = document.querySelector<HTMLElement>('#app');
if (!app) throw new Error('main: #app missing');

const source = resolveSource(window.location.search);
const peaks = createPeakTracker();

const rpm = createRpmMeter();
const temp = createTempBar();
const tiles = createTileGrid(peaks);

/*
 * No chrome: the three instruments are the whole page. There is no status pill,
 * because a dead link already shows itself — every reading blanks to a
 * placeholder and both meters park at zero rather than freezing on a stale
 * number. The live region below carries the same thing to a screen reader.
 */
app.innerHTML = `
  <div class="stack" data-role="stack"></div>
  <p class="sr-only" role="status" aria-live="polite" data-role="announce"></p>`;

must<HTMLElement>('[data-role="stack"]').append(rpm.el, temp.el, tiles.el);
const announce = must<HTMLElement>('[data-role="announce"]');

let lastAnnouncement = '';
let lastFrameTs: number | null = null;

source.subscribe((state) => {
  // Peaks advance only on genuinely new samples; the watchdog re-emits the
  // same frame on its own timer to age the display.
  if (state.frame && state.frame.ts !== lastFrameTs) {
    lastFrameTs = state.frame.ts;
    peaks.update(state.frame);
  }

  rpm.update(state);
  temp.update(state);
  tiles.update(state);

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

function must<T extends Element>(selector: string): T {
  const found = document.querySelector<T>(selector);
  if (!found) throw new Error(`main: missing ${selector}`);
  return found;
}
