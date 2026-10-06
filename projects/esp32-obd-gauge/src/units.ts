/*
 * The telemetry frame carries OBD-II's native units (Celsius, km/h) so the
 * firmware contract stays standard. Everything the driver sees is converted
 * here, in one place — this is a US autocross car, so Fahrenheit and mph.
 */

export function toF(celsius: number): number {
  return celsius * 1.8 + 32;
}

export function toMph(kph: number): number {
  return kph * 0.621371;
}

/** Formats a number for a readout, or an em-dash placeholder when unknown. */
export function fmt(value: number | null, decimals = 0): string {
  if (value === null || !Number.isFinite(value)) return '––';
  return value.toFixed(decimals);
}
