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
import { baselineDrop, rightBearing } from './numerals';
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
 * How far past the bar's bottom edge the digits' baseline is pushed — the same
 * crop the tach and the grid cells use, so the reading is seated like every
 * other number on the dash rather than floating in the middle of its band.
 */
const CROP_PX = 3;

/**
 * The whole bar takes ONE colour, picked by where the reading sits — not a row
 * of zones. The marker lines say where the thresholds are; the colour says
 * which side of them you are on.
 *
 * Two of the five lines are reference points rather than colour changes:
 *
 *   COLD      the dash lamp goes out — warm enough to drive, but the bar stays
 *             blue, because warm enough to drive is not yet up to temperature
 *   NOMINAL   the low edge of the operating range; blue gives way to green here
 *   MID       the middle of the operating range, pinned to the middle of the
 *             screen. A reference only: turning amber at the centre of the
 *             range would call a healthy 195F a warning
 *   WARM      the high edge of the operating range; green gives way to amber,
 *             which is why it cannot go amber until the needle is past the
 *             middle
 *   HOT       amber gives way to red
 *
 * Cold and warming share the blue: the lamp going out changes what the driver
 * may do, not what the coolant is doing, so it is worth saying but not worth a
 * colour. The band names still differ, so a screen reader hears the difference.
 */
const BANDS: { upTo: number; band: TempBand; color: string }[] = [
  { upTo: COOLANT_COLD_C, band: 'cold', color: `rgb(var(--temp-cold-rgb) / ${WASH})` },
  { upTo: COOLANT_NOMINAL_C, band: 'warming', color: `rgb(var(--temp-cold-rgb) / ${WASH})` },
  { upTo: COOLANT_WARM_C, band: 'normal', color: `rgb(var(--temp-nominal-rgb) / ${WASH})` },
  { upTo: COOLANT_HOT_C, band: 'warm', color: `rgb(var(--temp-warm-rgb) / ${WASH})` },
  { upTo: Infinity, band: 'hot', color: 'rgb(var(--temp-hot-rgb) / 1)' },
];

/** Cold threshold, nominal low edge, nominal centre, nominal high edge, hot. */
const MARKS = [
  COOLANT_COLD_C,
  COOLANT_NOMINAL_C,
  COOLANT_SCALE_MID_C,
  COOLANT_WARM_C,
  COOLANT_HOT_C,
];

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
  const readout = must<HTMLElement>(el, '.temp__readout');
  const unit = must<HTMLElement>(el, '.temp__unit');
  let seatedAt = '';

  /*
   * Seats the reading the way a grid cell seats its numeral: dropped until the
   * feet of the digits are cut off by the bottom of the bar, and nudged so its
   * last stroke of ink lands on the padding line rather than the right edge of
   * the glyph's advance.
   *
   * The unit is lifted back out of the crop. It rides the digits' baseline, so
   * it would otherwise lose three of its eleven pixels to the same cut — a
   * third of a cap height, where on the digits it is a couple of percent. The
   * numerals break the edge of the bar; the unit sits on it.
   *
   * Nothing here moves unless the font does, so it is keyed on the size rather
   * than run on every frame.
   */
  const seat = (): void => {
    const key = getComputedStyle(value).fontSize;
    if (key === seatedAt || Number.parseFloat(key) === 0) return;
    seatedAt = key;

    readout.style.bottom = `${baselineDrop(value, CROP_PX).toFixed(2)}px`;
    unit.style.bottom = `${CROP_PX}px`;

    const overhang = rightBearing(unit, unit.textContent ?? '');
    readout.style.transform =
      Math.abs(overhang) > 0.1 ? `translateX(${overhang.toFixed(2)}px)` : '';
  };

  return {
    el,
    update(state) {
      seat();
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
 * Half the width the operating range occupies on screen, as a fraction of the
 * bar. The range is mapped linearly across it, which is what makes its two
 * edges equidistant from the centre.
 */
const NOMINAL_HALF = 0.09;

/**
 * Temperature to position along the bar, as a percentage. Three pieces.
 *
 * The operating range (nominal low to nominal high) is mapped linearly onto the
 * middle `2 × NOMINAL_HALF` of the bar. Its midpoint therefore lands dead
 * centre and its two edges sit the same distance either side — which a single
 * curve over the whole range could not do, because there is 85 °C of travel
 * below the range and only 25 °C above it, so equal steps in temperature came
 * out wildly unequal in pixels.
 *
 * Everything below and above shares the rest of the bar, each shaped by
 * COOLANT_SCALE_EXP so the needle crawls as it nears the operating range and
 * sweeps toward either extreme.
 */
function pct(c: number): number {
  const shoulder = 0.5 - NOMINAL_HALF;

  if (c <= COOLANT_NOMINAL_C) {
    const x = clamp((COOLANT_NOMINAL_C - c) / (COOLANT_NOMINAL_C - COOLANT_MIN_C), 0, 1);
    return shoulder * (1 - Math.pow(x, COOLANT_SCALE_EXP)) * 100;
  }

  if (c <= COOLANT_WARM_C) {
    const x = (c - COOLANT_NOMINAL_C) / (COOLANT_WARM_C - COOLANT_NOMINAL_C);
    return (shoulder + x * 2 * NOMINAL_HALF) * 100;
  }

  const x = clamp((c - COOLANT_WARM_C) / (COOLANT_MAX_C - COOLANT_WARM_C), 0, 1);
  return (0.5 + NOMINAL_HALF + shoulder * Math.pow(x, COOLANT_SCALE_EXP)) * 100;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function must<T extends Element>(root: ParentNode, selector: string): T {
  const found = root.querySelector<T>(selector);
  if (!found) throw new Error(`temp: missing ${selector}`);
  return found;
}
