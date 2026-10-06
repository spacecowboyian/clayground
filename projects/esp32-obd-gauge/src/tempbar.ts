import {
  COOLANT_COLD_C,
  COOLANT_CRITICAL_C,
  COOLANT_HOT_C,
  COOLANT_MAX_C,
  COOLANT_MIN_C,
  COOLANT_NOMINAL_C,
} from './vehicle';
import { BAND_LABEL, type TelemetryState, type TempBand } from './telemetry/types';
import { solidZones } from './zones';
import { toF } from './units';

export interface TempBar {
  readonly el: HTMLElement;
  update(state: TelemetryState): void;
}

/**
 * The four zones, in order. Single source of truth: the fill colours, the
 * boundary tick marks and the legend are all derived from this, so they cannot
 * drift apart.
 */
const ZONES = [
  { to: COOLANT_COLD_C, color: 'var(--temp-cold)', label: 'Cold' },
  { to: COOLANT_NOMINAL_C, color: 'var(--temp-warming)', label: 'Warming' },
  { to: COOLANT_HOT_C, color: 'var(--temp-nominal)', label: 'Nominal' },
  { to: COOLANT_MAX_C, color: 'var(--temp-hot)', label: 'Hot' },
];

/** Boundary temperatures — every zone edge except the far end of the bar. */
const BOUNDARIES = ZONES.slice(0, -1).map((z) => z.to);

/**
 * Legend positions, centred in each zone rather than sat on the boundary.
 * On a blended ramp a label on the line read as "the point where it turns
 * cold"; against flat bands it has to name the band under it.
 */
const LEGEND = ZONES.map((zone, i) => ({
  label: zone.label,
  at: ((i === 0 ? COOLANT_MIN_C : ZONES[i - 1].to) + zone.to) / 2,
}));

/** Coolant bar: grows left to right over a cold-to-hot gradient. */
export function createTempBar(): TempBar {
  const el = document.createElement('section');
  el.className = 'temp';
  el.setAttribute('role', 'meter');
  el.setAttribute('aria-label', 'Engine coolant temperature');
  el.setAttribute('aria-valuemin', String(Math.round(toF(COOLANT_MIN_C))));
  el.setAttribute('aria-valuemax', String(Math.round(toF(COOLANT_MAX_C))));

  const fillBackground = solidZones('to right', COOLANT_MIN_C, COOLANT_MAX_C, ZONES);

  el.innerHTML = `
    <div class="temp__track">
      <div class="temp__fill" data-role="fill" style="background:${fillBackground}"></div>
      ${BOUNDARIES.map((c) => `<span class="temp__tick" style="left:${pct(c).toFixed(2)}%"></span>`).join('')}
    </div>
    <div class="temp__legend" aria-hidden="true">
      ${LEGEND.map((l) => `<span class="temp__legend-item" style="left:${pct(l.at).toFixed(2)}%">${l.label}</span>`).join('')}
    </div>
    <div class="temp__readout">
      <span class="temp__label">Coolant</span>
      <span class="temp__value"><span data-role="value">\u2013\u2013</span><span
        class="temp__unit">\u00B0F</span></span>
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

      const filled = clamp(pct(c), 0, 100);
      fill.style.clipPath = `inset(0 ${(100 - filled).toFixed(2)}% 0 0)`;
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

/** The zone the reading sits in — the same four the bar paints. */
export function tempBand(coolantC: number): TempBand {
  if (coolantC >= COOLANT_HOT_C) return 'hot';
  if (coolantC >= COOLANT_NOMINAL_C) return 'normal';
  if (coolantC >= COOLANT_COLD_C) return 'warming';
  return 'cold';
}

function pct(c: number): number {
  return ((c - COOLANT_MIN_C) / (COOLANT_MAX_C - COOLANT_MIN_C)) * 100;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function must<T extends Element>(root: ParentNode, selector: string): T {
  const found = root.querySelector<T>(selector);
  if (!found) throw new Error(`temp: missing ${selector}`);
  return found;
}
