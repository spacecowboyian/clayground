import type { TelemetryFrame } from './telemetry/types';

/**
 * Session highs (and one low) held across the whole run.
 *
 * This is the part of the gauge that actually gets used. A run is 45-70
 * seconds and nobody reads a dash mid-course — the numbers that matter are the
 * ones still on screen when you roll back into grid.
 */
export interface Peaks {
  coolantC: number | null;
  intakeC: number | null;
  rpm: number | null;
  speedKph: number | null;
  throttlePct: number | null;
  /** Lowest voltage seen — catches a sagging alternator or a cranking dip. */
  voltageMin: number | null;
}

export type PeakKey = keyof Peaks;

export interface PeakTracker {
  readonly peaks: Peaks;
  update(frame: TelemetryFrame): void;
  reset(key: PeakKey): void;
  resetAll(): void;
}

const EMPTY: Peaks = {
  coolantC: null,
  intakeC: null,
  rpm: null,
  speedKph: null,
  throttlePct: null,
  voltageMin: null,
};

export function createPeakTracker(): PeakTracker {
  let peaks: Peaks = { ...EMPTY };

  const high = (current: number | null, next: number): number =>
    current === null ? next : Math.max(current, next);

  return {
    get peaks() {
      return peaks;
    },
    update(frame) {
      if (Number.isFinite(frame.coolantC)) peaks.coolantC = high(peaks.coolantC, frame.coolantC);
      if (Number.isFinite(frame.intakeC)) peaks.intakeC = high(peaks.intakeC, frame.intakeC);
      if (Number.isFinite(frame.rpm)) peaks.rpm = high(peaks.rpm, frame.rpm);
      if (Number.isFinite(frame.speedKph)) peaks.speedKph = high(peaks.speedKph, frame.speedKph);
      if (Number.isFinite(frame.throttlePct)) {
        peaks.throttlePct = high(peaks.throttlePct, frame.throttlePct);
      }
      if (Number.isFinite(frame.voltage)) {
        peaks.voltageMin =
          peaks.voltageMin === null ? frame.voltage : Math.min(peaks.voltageMin, frame.voltage);
      }
    },
    reset(key) {
      peaks = { ...peaks, [key]: null };
    },
    resetAll() {
      peaks = { ...EMPTY };
    },
  };
}
