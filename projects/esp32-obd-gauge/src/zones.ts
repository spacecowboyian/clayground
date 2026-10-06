/** One band of a meter: a flat colour up to an upper bound in the meter's units. */
export interface Zone {
  /** Upper bound of this band. */
  to: number;
  /** CSS colour. */
  color: string;
}

/**
 * Builds a hard-stop gradient: every band paints flat, with a crisp edge where
 * the next begins and no blending between them.
 *
 * Stop positions come from the caller's own `position` function rather than
 * from a linear interpolation here, so a meter with a non-linear scale gets
 * bands that land exactly where its fill and tick marks do.
 */
export function solidZones(
  direction: string,
  zones: Zone[],
  from: number,
  position: (value: number) => number,
): string {
  const stops: string[] = [];
  let lower = from;
  for (const zone of zones) {
    // Two stops at the same colour, one at each edge of the band.
    stops.push(
      `${zone.color} ${position(lower).toFixed(3)}%`,
      `${zone.color} ${position(zone.to).toFixed(3)}%`,
    );
    lower = zone.to;
  }
  return `linear-gradient(${direction}, ${stops.join(', ')})`;
}
