import {
  COOLANT_COLD_C,
  COOLANT_CRITICAL_C,
  COOLANT_HOT_C,
  COOLANT_MAX_C,
  COOLANT_MIN_C,
  COOLANT_SCALE_EXP,
  COOLANT_SCALE_MID_C,
} from './vehicle';
import { BAND_LABEL, type TelemetryState, type TempBand } from './telemetry/types';
import { toF } from './units';

export interface TempBar {
  readonly el: HTMLElement;
  update(state: TelemetryState): void;
}

/**
 * Everything but red washes at a quarter strength, so the bar is only ever
 * loud when the engine is. Tokens are channel triplets rather than hex so the
 * alpha can be varied here.
 */
const WASH = 0.25;

/**
 * The whole bar takes ONE colour, picked by where the reading sits — not a row
 * of zones. The marker lines below say where the thresholds are; the colour
 * says which side of them you are on.
 *
 * Note the colour boundaries are not the same as the marker lines. The nominal
 * line is a reference point inside the green, not a change of state: 195F is
 * the middle of the operating range, and turning the bar amber above it would
 * call a perfectly healthy 200F a warning. Amber starts at the high crossover
 * and red at the critical temperature, which carries no line of its own.
 */
const BANDS: { upTo: number; band: TempBand; color: string }[] = [
  { upTo: COOLANT_COLD_C, band: 'cold', color: `rgb(var(--temp-cold-rgb) / ${WASH})` },
  { upTo: COOLANT_HOT_C, band: 'normal', color: `rgb(var(--temp-nominal-rgb) / ${WASH})` },
  { upTo: COOLANT_CRITICAL_C, band: 'warm', color: `rgb(var(--temp-warm-rgb) / ${WASH})` },
  { upTo: Infinity, band: 'hot', color: 'rgb(var(--temp-hot-rgb) / 1)' },
];

/** The three reference lines: cold threshold, nominal, high crossover. */
const MARKS = [COOLANT_COLD_C, COOLANT_SCALE_MID_C, COOLANT_HOT_C];

/** Coolant band: one colour wash, three reference lines, a travelling needle. */
export function createTempBar(): TempBar {
  const el = document.createElement('section');
  el.className = 'temp';
  el.setAttribute('role', 'meter');
  el.setAttribute('aria-label', 'Engine coolant temperature');
  el.setAttribute('aria-valuemin', String(Math.round(toF(COOLANT_MIN_C))));
  el.setAttribute('aria-valuemax', String(Math.round(toF(COOLANT_MAX_C))));

  el.innerHTML = `
    <div class="temp__track">
      <div class="temp__wash" data-role="wash"></div>
      ${MARKS.map((c) => `<span class="temp__mark" style="left:${pct(c).toFixed(2)}%"></span>`).join('')}
      <span class="temp__needle" data-role="needle"></span>
      <span class="temp__readout"><span data-role="value">––</span><span
        class="temp__unit">°F</span></span>
    </div>`;

  const wash = must<HTMLElement>(el, '[data-role="wash"]');
  const needle = must<HTMLElement>(el, '[data-role="needle"]');
  const value = must<HTMLElement>(el, '[data-role="value"]');

  return {
    el,
    update(state) {
      const frame = state.frame;
      const usable = frame !== null && state.connection !== 'disconnected';
      const c = usable && Number.isFinite(frame.coolantC) ? frame.coolantC : null;

      if (c === null) {
        wash.style.background = '';
        needle.style.visibility = 'hidden';
        value.textContent = '––';
        el.removeAttribute('aria-valuenow');
        el.setAttribute('aria-valuetext', 'No coolant reading');
        return;
      }

      const zone = BANDS.find((b) => c < b.upTo) ?? BANDS[BANDS.length - 1];
      wash.style.background = zone.color;
      needle.style.visibility = 'visible';
      needle.style.left = `${pct(c).toFixed(2)}%`;

      const f = Math.round(toF(c));
      value.textContent = String(f);
      el.setAttribute('aria-valuenow', String(f));
      // Overheating has no colour of its own above hot, so it is said instead.
      const overheating = c >= COOLANT_CRITICAL_C ? ', overheating' : '';
      el.setAttribute(
        'aria-valuetext',
        `${f} degrees Fahrenheit, ${BAND_LABEL[zone.band]}${overheating}`,
      );
    },
  };
}

/** The band the reading sits in — the colour the whole bar takes. */
export function tempBand(coolantC: number): TempBand {
  return (BANDS.find((b) => coolantC < b.upTo) ?? BANDS[BANDS.length - 1]).band;
}

/**
 * Temperature to position along the bar, as a percentage.
 *
 * Not linear. The nominal centre is pinned to 50% — which is what puts its
 * marker line in the middle of the screen — and each half is shaped by
 * COOLANT_SCALE_EXP, which above 1 makes the needle crawl near nominal and
 * lunge toward either end. The two halves cover different spans (about 90 °C
 * below the centre, 31 °C above), so they are mapped separately; a single curve
 * across the whole range would not land the centre where it belongs.
 */
function pct(c: number): number {
  if (c <= COOLANT_SCALE_MID_C) {
    const x = clamp((COOLANT_SCALE_MID_C - c) / (COOLANT_SCALE_MID_C - COOLANT_MIN_C), 0, 1);
    return (0.5 - 0.5 * Math.pow(x, COOLANT_SCALE_EXP)) * 100;
  }
  const x = clamp((c - COOLANT_SCALE_MID_C) / (COOLANT_MAX_C - COOLANT_SCALE_MID_C), 0, 1);
  return (0.5 + 0.5 * Math.pow(x, COOLANT_SCALE_EXP)) * 100;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function must<T extends Element>(root: ParentNode, selector: string): T {
  const found = root.querySelector<T>(selector);
  if (!found) throw new Error(`temp: missing ${selector}`);
  return found;
}
