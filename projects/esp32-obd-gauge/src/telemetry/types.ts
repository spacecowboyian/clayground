/** One decoded OBD-II sample, matching the JSON the firmware pushes over WS. */
export interface TelemetryFrame {
  /** PID 0x05 — engine coolant temp, °C. */
  coolantC: number;
  /** PID 0x0C — engine speed, rev/min. Drives the tach and the shift flash. */
  rpm: number;
  /** PID 0x0F — intake air temp, °C. Heat-soak indicator. */
  intakeC: number;
  /** PID 0x42 — control module voltage, V. Charging-system health. */
  voltage: number;
  /** PID 0x0D — vehicle speed, km/h. */
  speedKph: number;
  /** PID 0x11 — throttle position, %. Peak confirms you actually got to WOT. */
  throttlePct: number;
  /** PID 0x0E — timing advance, ° BTDC. Watch it retard under heat soak. */
  timingAdv: number;
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

export const BAND_LABEL: Record<TempBand, string> = {
  cold: 'Cold',
  normal: 'Nominal',
  warn: 'Hot',
  critical: 'Overheating',
};
