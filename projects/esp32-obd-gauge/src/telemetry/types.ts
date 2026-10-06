/** One decoded OBD-II sample, matching the JSON the firmware pushes over WS. */
export interface TelemetryFrame {
  /** PID 0x05 — engine coolant temp, °C. The primary reading. */
  coolantC: number;
  /** PID 0x0C — engine speed, rev/min. */
  rpm: number;
  /** PID 0x0F — intake air temp, °C. */
  intakeC: number;
  /** PID 0x42 — control module voltage, V. Proxy for charging health. */
  voltage: number;
  /** Firmware millis() at sample time. */
  ts: number;
}

/**
 * Link health, derived from frame arrival — not from the socket alone.
 * A WebSocket can stay open while the ESP32 stops decoding CAN, so `live`
 * means "a frame arrived recently", never just "socket is open".
 */
export type ConnectionState = 'connecting' | 'live' | 'stale' | 'disconnected';

/** What the UI renders on every tick. */
export interface TelemetryState {
  connection: ConnectionState;
  frame: TelemetryFrame | null;
  /** ms since the last frame, or null when none has ever arrived. */
  ageMs: number | null;
}

/** Any frame producer — the simulator and the real socket both satisfy this. */
export interface TelemetrySource {
  subscribe(listener: (state: TelemetryState) => void): () => void;
  /** Human-readable source label for the status bar. */
  readonly label: string;
}

/** Severity bands for coolant temp, in the order they escalate. */
export type TempBand = 'cold' | 'normal' | 'warn' | 'critical';

export const COOLANT_MIN_C = 40;
export const COOLANT_MAX_C = 130;

/**
 * Thresholds for a typical modern water-cooled petrol engine:
 * thermostat opens ~85, fans engage ~100-105, head-gasket territory ~115+.
 */
export function tempBand(coolantC: number): TempBand {
  if (coolantC >= 115) return 'critical';
  if (coolantC >= 105) return 'warn';
  if (coolantC < 70) return 'cold';
  return 'normal';
}

export const BAND_LABEL: Record<TempBand, string> = {
  cold: 'Warming up',
  normal: 'Normal',
  warn: 'Running hot',
  critical: 'Overheating',
};
