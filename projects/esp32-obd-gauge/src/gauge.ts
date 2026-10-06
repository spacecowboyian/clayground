import { BAND_LABEL, COOLANT_MAX_C, COOLANT_MIN_C, tempBand } from './telemetry/types';
import type { TelemetryState } from './telemetry/types';

/* Geometry: a 270-degree sweep with the gap at the bottom. Angles are degrees
   clockwise from 12 o'clock, so 225 is lower-left and 225+270=495 is
   lower-right. */
const CX = 110;
const CY = 100;
const R = 82;
const START_DEG = 225;
const SWEEP_DEG = 270;
const STROKE = 14;
/* pathLength is forced to 1000 so the dash maths is just a percentage. */
const PATH_LEN = 1000;
/*
 * Below the scale floor the arc would be zero-length, and a zero-length dash
 * with a round cap paints a misleading dot at the far END of the path. A small
 * nub instead keeps a cold-but-live engine visibly different from no signal,
 * the same way a real cluster gauge rests on its cold stop.
 */
const MIN_VISIBLE_FRAC = 0.012;

export interface Gauge {
  readonly el: HTMLElement;
  update(state: TelemetryState): void;
}

export function createGauge(): Gauge {
  const el = document.createElement('div');
  el.className = 'gauge';
  // role="meter" is the right semantic for a bounded live reading. The SVG is
  // hidden from assistive tech so the value is announced once, from here,
  // rather than as a pile of stray text nodes.
  el.setAttribute('role', 'meter');
  el.setAttribute('aria-label', 'Engine coolant temperature');
  el.setAttribute('aria-valuemin', String(COOLANT_MIN_C));
  el.setAttribute('aria-valuemax', String(COOLANT_MAX_C));

  el.innerHTML = `
    <svg viewBox="0 0 220 181" aria-hidden="true" focusable="false">
      <path class="gauge__track" d="${arc(COOLANT_MIN_C, COOLANT_MAX_C)}"
            fill="none" stroke-width="${STROKE}" stroke-linecap="round" />
      <path d="${arc(105, COOLANT_MAX_C)}" fill="none" stroke="var(--band-warn)"
            stroke-width="${STROKE}" opacity="0.22" />
      <path d="${arc(115, COOLANT_MAX_C)}" fill="none" stroke="var(--band-critical)"
            stroke-width="${STROKE}" opacity="0.3" stroke-linecap="round" />
      ${ticks()}
      <path class="gauge__value" d="${arc(COOLANT_MIN_C, COOLANT_MAX_C)}"
            fill="none" stroke-width="${STROKE}" stroke-linecap="round"
            pathLength="${PATH_LEN}" stroke-dasharray="${PATH_LEN}"
            stroke-dashoffset="${PATH_LEN}" />
      ${labels()}
      <text class="gauge__number" x="${CX}" y="${CY + 10}" text-anchor="middle"
            data-role="number">--</text>
      <text class="gauge__unit" x="${CX}" y="${CY + 28}" text-anchor="middle">&#176;C coolant</text>
      <text class="gauge__band" x="${CX}" y="${CY + 50}" text-anchor="middle"
            data-role="band">&#8212;</text>
      <text class="gauge__caption" x="${CX}" y="${CY + 64}" text-anchor="middle">PID 05</text>
    </svg>`;

  const value = must<SVGPathElement>(el, '.gauge__value');
  const number = must<SVGTextElement>(el, '[data-role="number"]');
  const band = must<SVGTextElement>(el, '[data-role="band"]');

  return {
    el,
    update(state) {
      const frame = state.frame;
      const trustworthy = frame !== null && state.connection !== 'disconnected';

      if (!trustworthy) {
        // Park the needle at zero rather than freezing it on a stale number
        // that would read as a live measurement. The arc is hidden outright,
        // not just emptied: a zero-length dash with a round cap still paints
        // a dot at the end of the path.
        value.setAttribute('stroke-dashoffset', String(PATH_LEN));
        value.style.visibility = 'hidden';
        number.classList.add('gauge__number--empty');
        number.textContent = '--';
        band.textContent = state.connection === 'connecting' ? 'Connecting' : 'No signal';
        el.removeAttribute('aria-valuenow');
        el.setAttribute('aria-valuetext', 'No reading — dongle not connected');
        return;
      }

      const c = frame.coolantC;
      const frac = clamp((c - COOLANT_MIN_C) / (COOLANT_MAX_C - COOLANT_MIN_C), 0, 1);
      const shown = Math.max(frac, MIN_VISIBLE_FRAC);
      value.setAttribute('stroke-dashoffset', String(Math.round(PATH_LEN * (1 - shown))));
      value.style.visibility = 'visible';
      number.classList.remove('gauge__number--empty');
      number.textContent = String(Math.round(c));

      const name = BAND_LABEL[tempBand(c)];
      band.textContent = state.connection === 'stale' ? 'Signal lost' : name;
      el.setAttribute('aria-valuenow', String(Math.round(c)));
      el.setAttribute(
        'aria-valuetext',
        `${Math.round(c)} degrees Celsius, ${name}${state.connection === 'stale' ? ', reading may be out of date' : ''}`,
      );
    },
  };
}

/** Path for the arc spanning two temperatures on the scale. */
function arc(fromC: number, toC: number): string {
  const a0 = degFor(fromC);
  const a1 = degFor(toC);
  const [x0, y0] = polar(a0);
  const [x1, y1] = polar(a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${r2(x0)} ${r2(y0)} A ${R} ${R} 0 ${large} 1 ${r2(x1)} ${r2(y1)}`;
}

function ticks(): string {
  const out: string[] = [];
  for (let c = COOLANT_MIN_C; c <= COOLANT_MAX_C; c += 10) {
    const major = c === 40 || c === 85 || c === 130;
    const [xo, yo] = polar(degFor(c), R + STROKE / 2 + 2);
    const [xi, yi] = polar(degFor(c), R + STROKE / 2 + (major ? 9 : 5));
    out.push(
      `<line class="gauge__tick" x1="${r2(xo)}" y1="${r2(yo)}" x2="${r2(xi)}" y2="${r2(yi)}"
         stroke-width="${major ? 2 : 1}" />`,
    );
  }
  return out.join('');
}

/**
 * Scale labels. The mid label sits inside the dial, but the two end labels go
 * OUTSIDE it: inside, they land on the same baseline as the band caption and
 * a long one ("OVERHEATING") runs straight through them.
 */
function labels(): string {
  const outside = R + STROKE / 2 + 14;
  return [
    { c: COOLANT_MIN_C, radius: outside },
    { c: 85, radius: R - 17 },
    { c: COOLANT_MAX_C, radius: outside },
  ]
    .map(({ c, radius }) => {
      const [x, y] = polar(degFor(c), radius);
      return `<text class="gauge__scale" x="${r2(x)}" y="${r2(y + 2.5)}" text-anchor="middle">${c}</text>`;
    })
    .join('');
}

function degFor(c: number): number {
  const frac = clamp((c - COOLANT_MIN_C) / (COOLANT_MAX_C - COOLANT_MIN_C), 0, 1);
  return START_DEG + SWEEP_DEG * frac;
}

function polar(deg: number, radius = R): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [CX + radius * Math.cos(rad), CY + radius * Math.sin(rad)];
}

function r2(n: number): number {
  return Math.round(n * 100) / 100;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function must<T extends Element>(root: ParentNode, selector: string): T {
  const found = root.querySelector<T>(selector);
  if (!found) throw new Error(`gauge: missing ${selector}`);
  return found;
}
