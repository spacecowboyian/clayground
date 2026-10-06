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
 * The `bottom` offset that drops a numeral's BASELINE `cropPx` past the bottom
 * of its box, so every reading is cut off by the edge it sits on.
 *
 * The baseline sits `(lineHeight - ascent + descent) / 2` above the bottom of
 * its line box, and that is the whole calculation. An earlier version also
 * subtracted the round digits' overshoot — 3, 5, 0, 6, 8 and 9 sit a little
 * below the baseline where 1, 2, 4 and 7 are flat — to put the lowest ink
 * exactly `cropPx` past the edge whatever was showing. That made the crop
 * geometrically equal and optically wrong: a reading of 17 lost 1px where 75
 * lost 3, so flat readings sat all but flush while round ones were visibly
 * cut.
 *
 * The overshoot exists precisely so round glyphs read as deep as flat ones, so
 * the fix is to let it ride: anchoring the baseline cuts every reading by at
 * least `cropPx`, and the round digits go a little deeper exactly as the face
 * intends. The container must hide its overflow for any of this to show.
 */
export function baselineDrop(el: HTMLElement, cropPx: number): number {
  const { size, lineHeight, metrics } = measure(el);
  let gap = lineHeight - size * 0.8;

  if (metrics) {
    const { fontBoundingBoxAscent: ascent, fontBoundingBoxDescent: descent } = metrics;
    // Safari only grew these in 11.1 and they can still come back undefined.
    if (Number.isFinite(ascent) && Number.isFinite(descent)) {
      gap = (lineHeight - ascent + descent) / 2;
    }
  }

  return -(gap + cropPx);
}

/**
 * How far right of its own origin a string's ink begins.
 *
 * A monospace face gives every digit the same advance but not the same ink: at
 * 72px the bearings here run 3px for a 4 or a 9 up to 6px for a 1. So a numeral
 * set flush to a box still prints several pixels inside it, enough to read as
 * misaligned against a small label sharing that edge.
 *
 * Canvas is accurate for this — its `actualBoundingBoxLeft` was checked against
 * a pixel scan of the rendered glyphs and agreed on every digit. SVG `getBBox`
 * was tried and returns 0, i.e. the advance box rather than the ink.
 *
 * Measured on the string actually shown rather than on all ten digits, because
 * only the leading glyph sets the left edge and a reading's leading digit
 * changes rarely. The vertical seat is measured across all ten precisely
 * because its last digit changes constantly.
 */
export function leftBearing(el: HTMLElement, text: string): number {
  if (!probe || text === '') return 0;
  const style = getComputedStyle(el);
  probe.font = `${style.fontWeight} ${Number.parseFloat(style.fontSize)}px ${style.fontFamily}`;
  const { actualBoundingBoxLeft } = probe.measureText(text);
  return Number.isFinite(actualBoundingBoxLeft) ? -actualBoundingBoxLeft : 0;
}


/**
 * How far short of its own advance a digit's ink ends, averaged over all ten.
 *
 * The mirror of `leftBearing`, for a numeral set against a right edge: canvas
 * reports the ink's right edge from the origin and `width` is the advance, so
 * the difference is the gap the glyph leaves inside its own box. Shifting by
 * that puts the last stroke of ink on the padding line rather than the
 * invisible edge of the advance, which is what the eye measures a margin from.
 *
 * Unlike the left bearing this cannot be taken from the live reading. The right
 * edge is set by the LAST glyph, which is the ones digit and turns over twice a
 * second, and the bearing swings by 3px across the ten — enough to make the
 * number visibly dance in place. One average for all of them holds still, at
 * the cost of landing up to 1.7px either side of the line.
 */
export function digitRightBearing(el: HTMLElement): number {
  if (!probe) return 0;
  const style = getComputedStyle(el);
  probe.font = `${style.fontWeight} ${Number.parseFloat(style.fontSize)}px ${style.fontFamily}`;

  // CSS puts a letter-space after EVERY character, the last one included, and
  // canvas does not model it. With the dash's -0.04em tracking that is 2.88px
  // the box loses off its right edge at 72px, which lands the reading three
  // pixels tighter to the screen than the margin asked for. Negative tracking
  // eats the bearing; positive would add to it.
  const spacing = Number.parseFloat(style.letterSpacing);
  const trailing = Number.isFinite(spacing) ? spacing : 0;

  let total = 0;
  for (const digit of DIGITS) {
    const { width, actualBoundingBoxRight } = probe.measureText(digit);
    if (!Number.isFinite(actualBoundingBoxRight)) return 0;
    total += width - actualBoundingBoxRight;
  }
  return total / DIGITS.length + trailing;
}
