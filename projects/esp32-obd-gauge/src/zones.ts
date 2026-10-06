/** One band of a meter: a flat colour up to an upper bound in the meter's units. */
export interface Zone {
  /** Upper bound of this band. */
  to: number;
  /** CSS colour, normally a `var(--token)`. */
  color: string;
}

/**
 * Builds a hard-stop gradient: every band paints flat, with a crisp edge where
 * the next begins and no blending between them.
 *
 * The stop percentages are derived from the meter's real thresholds rather than
 * written into the stylesheet, so the bands can never drift out of step with
 * the numbers in vehicle.ts.
 */
export function solidZones(direction: string, min: number, max: number, zones: Zone[]): string {
  const pct = (v: number): string => (((v - min) / (max - min)) * 100).toFixed(3);
  const stops: string[] = [];
  let from = min;
  for (const zone of zones) {
    // Two stops at the same colour, one at each edge of the band.
    stops.push(`${zone.color} ${pct(from)}%`, `${zone.color} ${pct(zone.to)}%`);
    from = zone.to;
  }
  return `linear-gradient(${direction}, ${stops.join(', ')})`;
}
