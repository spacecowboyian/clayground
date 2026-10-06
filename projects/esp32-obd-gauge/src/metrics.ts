import type { Peaks, PeakKey } from './peaks';
import type { TelemetryFrame } from './telemetry/types';
import { toF, toMph } from './units';

/**
 * Everything a grid slot can be set to. Slots are assigned by press-and-hold,
 * so this registry is the menu — adding a readout means adding one entry here
 * and nothing else.
 */
export interface Metric {
  id: string;
  /** Short label printed on the tile. */
  label: string;
  /** Longer name used in the picker menu. */
  menuLabel: string;
  unit: string;
  decimals: number;
  group: 'Live' | 'Session';
  read(frame: TelemetryFrame | null, peaks: Peaks): number | null;
  /** Set when tapping the tile should clear a held value. */
  resets?: PeakKey;
}

const live =
  (pick: (f: TelemetryFrame) => number) =>
  (frame: TelemetryFrame | null): number | null => {
    if (!frame) return null;
    const v = pick(frame);
    return Number.isFinite(v) ? v : null;
  };

const held =
  (key: PeakKey, convert: (v: number) => number = (v) => v) =>
  (_frame: TelemetryFrame | null, peaks: Peaks): number | null => {
    const v = peaks[key];
    return v === null ? null : convert(v);
  };

export const METRICS: Metric[] = [
  // ── Live ────────────────────────────────────────────────────────────────
  { id: 'intake', label: 'Intake', menuLabel: 'Intake air temp', unit: '°F', decimals: 0,
    group: 'Live', read: live((f) => toF(f.intakeC)) },
  { id: 'coolant', label: 'Coolant', menuLabel: 'Coolant temp', unit: '°F', decimals: 0,
    group: 'Live', read: live((f) => toF(f.coolantC)) },
  { id: 'voltage', label: 'Voltage', menuLabel: 'Battery voltage', unit: 'V', decimals: 1,
    group: 'Live', read: live((f) => f.voltage) },
  { id: 'speed', label: 'Speed', menuLabel: 'Vehicle speed', unit: 'mph', decimals: 0,
    group: 'Live', read: live((f) => toMph(f.speedKph)) },
  { id: 'rpm', label: 'Engine', menuLabel: 'Engine speed', unit: 'rpm', decimals: 0,
    group: 'Live', read: live((f) => f.rpm) },
  { id: 'throttle', label: 'Throttle', menuLabel: 'Throttle position', unit: '%', decimals: 0,
    group: 'Live', read: live((f) => f.throttlePct) },
  // Timing retarding under load is the tell for heat soak or bad fuel.
  { id: 'timing', label: 'Timing', menuLabel: 'Timing advance', unit: '°', decimals: 0,
    group: 'Live', read: live((f) => f.timingAdv) },

  // ── Session (tap to reset) ──────────────────────────────────────────────
  { id: 'speedPeak', label: 'Top speed', menuLabel: 'Top speed', unit: 'mph', decimals: 0,
    group: 'Session', read: held('speedKph', toMph), resets: 'speedKph' },
  { id: 'rpmPeak', label: 'Peak rpm', menuLabel: 'Peak engine speed', unit: 'rpm', decimals: 0,
    group: 'Session', read: held('rpm'), resets: 'rpm' },
  { id: 'coolantPeak', label: 'Peak coolant', menuLabel: 'Peak coolant temp', unit: '°F',
    decimals: 0, group: 'Session', read: held('coolantC', toF), resets: 'coolantC' },
  { id: 'intakePeak', label: 'Peak intake', menuLabel: 'Peak intake air temp', unit: '°F',
    decimals: 0, group: 'Session', read: held('intakeC', toF), resets: 'intakeC' },
  { id: 'throttlePeak', label: 'Peak throttle', menuLabel: 'Peak throttle position', unit: '%',
    decimals: 0, group: 'Session', read: held('throttlePct'), resets: 'throttlePct' },
  { id: 'voltageMin', label: 'Min volts', menuLabel: 'Minimum voltage', unit: 'V', decimals: 1,
    group: 'Session', read: held('voltageMin'), resets: 'voltageMin' },
];

export const METRIC_BY_ID = new Map(METRICS.map((m) => [m.id, m]));

/** Slot assignment as it ships, before the driver rearranges anything. */
export const DEFAULT_SLOTS = [
  'intake',
  'voltage',
  'speedPeak',
  'rpmPeak',
  'coolantPeak',
  'timing',
];

export const SLOT_COUNT = DEFAULT_SLOTS.length;
