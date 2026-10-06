import {
  COOLANT_COLD_C,
  COOLANT_CRITICAL_C,
  COOLANT_HOT_C,
  COOLANT_MAX_C,
  COOLANT_MIN_C,
  COOLANT_NOMINAL_C,
} from './vehicle';
import { BAND_LABEL, type TelemetryState, type TempBand } from './telemetry/types';
import { toF } from './units';

export interface TempBar {
  readonly el: HTMLElement;
  update(state: TelemetryState): void;
}

const TICKS = [
  { c: COOLANT_COLD_C, label: 'Cold' },
  { c: COOLANT_NOMINAL_C, label: 'Nominal' },
  { c: COOLANT_HOT_C, label: 'Hot' },
];

/** Coolant bar: grows left to right over a cold-to-hot gradient. */
export function createTempBar(): TempBar {
  const el = document.createElement('section');
  el.className = 'temp';
  el.setAttribute('role', 'meter');
  el.setAttribute('aria-label', 'Engine coolant temperature');
  el.setAttribute('aria-valuemin', String(Math.round(toF(COOLANT_MIN_C))));
  el.setAttribute('aria-valuemax', String(Math.round(toF(COOLANT_MAX_C))));

  el.innerHTML = `
    <div class="temp__head">
      <span class="temp__label">Coolant</span>
      <span class="temp__value"><span data-role="value">––</span><span
        class="temp__unit">°F</span></span>
    </div>
    <div class="temp__track">
      <div class="temp__fill" data-role="fill"></div>
      ${TICKS.map((t) => `<span class="temp__tick" style="left:${pct(t.c).toFixed(2)}%"></span>`).join('')}
    </div>
    <div class="temp__legend" aria-hidden="true">
      ${TICKS.map((t) => `<span class="temp__legend-item" style="left:${pct(t.c).toFixed(2)}%">${t.label}</span>`).join('')}
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
      el.setAttribute('aria-valuetext', `${f} degrees Fahrenheit, ${BAND_LABEL[band]}`);
    },
  };
}

export function tempBand(coolantC: number): TempBand {
  if (coolantC >= COOLANT_CRITICAL_C) return 'critical';
  if (coolantC >= COOLANT_HOT_C) return 'warn';
  if (coolantC < COOLANT_COLD_C) return 'cold';
  return 'normal';
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
