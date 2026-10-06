import {
  COOLANT_COLD_C,
  COOLANT_CRITICAL_C,
  COOLANT_HOT_C,
  COOLANT_MAX_C,
  COOLANT_MIN_C,
  COOLANT_NOMINAL_C,
  COOLANT_SCALE_EXP,
  COOLANT_SCALE_MID_C,
  COOLANT_WARM_C,
} from './vehicle';
import { BAND_LABEL, type TelemetryState, type TempBand } from './telemetry/types';
import { toF } from './units';
import { solidZones } from './zones';

export interface TempBar {
  readonly el: HTMLElement;
  update(state: TelemetryState): void;
}

/**
 * Every zone but hot is held at half strength, so the band reads as quiet
 * information until the engine is actually in trouble and one zone lights up
 * at full saturation. Tokens are channel triplets rather than hex precisely so
 * the alpha can be varied here.
 */
const DIM = 0.5;
const zone = (token: string, alpha: number): string => `rgb(var(${token}) / ${alpha})`;

/**
 * The five zones, in order. Single source of truth: fill colours and boundary
 * ticks are both derived from this, so they cannot drift apart.
 *
 * The zones carry no printed names. The colours and the boundary ticks say
 * where the reading sits, and the band name is still spoken through
 * aria-valuetext for anyone who needs it said.
 */
const ZONES = [
  { to: COOLANT_COLD_C, color: zone('--temp-cold-rgb', DIM) },
  { to: COOLANT_NOMINAL_C, color: zone('--temp-cool-rgb', DIM) },
  { to: COOLANT_WARM_C, color: zone('--temp-nominal-rgb', DIM) },
  { to: COOLANT_HOT_C, color: zone('--temp-warm-rgb', DIM) },
  { to: COOLANT_MAX_C, color: zone('--temp-hot-rgb', 1) },
];

/** Boundary temperatures — every zone edge except the far end of the bar. */
const BOUNDARIES = ZONES.slice(0, -1).map((z) => z.to);

/** Coolant band: five flat zones, non-linear scale, nominal pinned to centre. */
export function createTempBar(): TempBar {
  const el = document.createElement('section');
  el.className = 'temp';
  el.setAttribute('role', 'meter');
  el.setAttribute('aria-label', 'Engine coolant temperature');
  el.setAttribute('aria-valuemin', String(Math.round(toF(COOLANT_MIN_C))));
  el.setAttribute('aria-valuemax', String(Math.round(toF(COOLANT_MAX_C))));

  const fillBackground = solidZones('to right', ZONES, COOLANT_MIN_C, pct);

  el.innerHTML = `
    <div class="temp__track">
      <div class="temp__fill" data-role="fill" style="background:${fillBackground}"></div>
      ${BOUNDARIES.map((c) => `<span class="temp__tick" style="left:${pct(c).toFixed(2)}%"></span>`).join('')}
      <span class="temp__readout"><span data-role="value">––</span><span
        class="temp__unit">°F</span></span>
    </div>`;

  const fill = must<HTMLElement>(el, '[data-role="fill"]');
  const value = must<HTMLElement>(el, '[data-role="value"]');

  return {
    el,
    update(state) {
      const frame = state.frame;
      const usable = frame !== null && state.connection !== 'disconnected';
      const c = usable && Number.isFinite(frame.coolantC) ? frame.coolantC : null;

      if (c === null) {
        fill.style.clipPath = 'inset(0 100% 0 0)';
        value.textContent = '––';
        el.dataset.band = 'none';
        el.removeAttribute('aria-valuenow');
        el.setAttribute('aria-valuetext', 'No coolant reading');
        return;
      }

      fill.style.clipPath = `inset(0 ${(100 - pct(c)).toFixed(2)}% 0 0)`;
      const f = Math.round(toF(c));
      value.textContent = String(f);
      const band = tempBand(c);
      el.dataset.band = band;
      el.setAttribute('aria-valuenow', String(f));
      // Overheating gets no colour of its own (it is inside the hot zone), so
      // it has to be said rather than shown.
      const overheating = c >= COOLANT_CRITICAL_C ? ', overheating' : '';
      el.setAttribute('aria-valuetext', `${f} degrees Fahrenheit, ${BAND_LABEL[band]}${overheating}`);
    },
  };
}

/** The zone the reading sits in — the same five the bar paints. */
export function tempBand(coolantC: number): TempBand {
  if (coolantC >= COOLANT_HOT_C) return 'hot';
  if (coolantC >= COOLANT_WARM_C) return 'warm';
  if (coolantC >= COOLANT_NOMINAL_C) return 'normal';
  if (coolantC >= COOLANT_COLD_C) return 'cool';
  return 'cold';
}

/**
 * Temperature to position along the bar, as a percentage.
 *
 * Not linear. The nominal centre is pinned to 50% and each half is shaped by
 * COOLANT_SCALE_EXP, which above 1 makes the bar crawl near nominal and lunge
 * toward either end. The two halves cover different spans (about 52 °C below
 * the centre, 31 °C above), so they are mapped separately — a single curve
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
