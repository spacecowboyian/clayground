/*
 * Seating large numerals against the edges of their box.
 *
 * Both the tach and the grid cells crop the feet of their digits on the bottom
 * edge and sit them flush on the left, and neither offset can be a constant:
 * the sizes differ per cell, and iOS resolves a different monospace face than a
 * desktop browser does. So both come from the font actually in use.
 *
 * Every measurement is taken across all ten digits rather than the digits
 * currently on screen. Measuring the live value would be more exact but would
 * make the numeral hop by a pixel or two whenever a round or narrow digit
 * rolled in, and a dash that twitches reads as broken.
 */

const DIGITS = '0123456789';

/** One shared context; measuring text needs no canvas in the document. */
const probe = document.createElement('canvas').getContext('2d');

function measure(el: HTMLElement): {
  size: number;
  lineHeight: number;
  metrics: TextMetrics | null;
} {
  const style = getComputedStyle(el);
  const size = Number.parseFloat(style.fontSize);
  // Read the line height rather than assuming it equals the size: the tach's
  // watermark is set tighter than 1, which moves the baseline within its box.
  const declared = Number.parseFloat(style.lineHeight);
  const lineHeight = Number.isFinite(declared) ? declared : size;
  if (!probe) return { size, lineHeight, metrics: null };
  probe.font = `${style.fontWeight} ${size}px ${style.fontFamily}`;
  return { size, lineHeight, metrics: probe.measureText(DIGITS) };
}

/**
 * The `bottom` offset that drops a numeral until `cropPx` of its digits fall
 * past the bottom of its box.
 *
 * The baseline sits `(lineHeight - ascent + descent) / 2` above the bottom of
 * its line box. Round digits then sit a little below the baseline — 3, 5, 0 and
 * 8 overshoot for optical correction where 2 and 4 are flat — so that is
 * subtracted, leaving the lowest ink exactly `cropPx` past the edge.
 */
export function baselineDrop(el: HTMLElement, cropPx: number): number {
  const { size, lineHeight, metrics } = measure(el);
  let gap = lineHeight - size * 0.8;
  let overshoot = 0;

  if (metrics) {
    const { fontBoundingBoxAscent: ascent, fontBoundingBoxDescent: descent } = metrics;
    // Safari only grew these in 11.1 and they can still come back undefined.
    if (Number.isFinite(ascent) && Number.isFinite(descent)) {
      gap = (lineHeight - ascent + descent) / 2;
    }
    if (Number.isFinite(metrics.actualBoundingBoxDescent)) {
      overshoot = Math.max(0, metrics.actualBoundingBoxDescent);
    }
  }

  return -(gap - overshoot + cropPx);
}

/**
 * How far right of its own origin a digit's ink begins.
 *
 * A monospace face gives every digit the same advance but not the same ink, so
 * a numeral set flush to a box still prints a few pixels inside it — enough to
 * read as misaligned against a small label sharing that edge.
 */
export function leftBearing(el: HTMLElement): number {
  const { metrics } = measure(el);
  if (!metrics || !Number.isFinite(metrics.actualBoundingBoxLeft)) return 0;
  return Math.max(0, -metrics.actualBoundingBoxLeft);
}
