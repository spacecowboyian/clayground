import type { TelemetryState } from './telemetry/types';

interface TileSpec {
  key: string;
  label: string;
  unit: string;
  /** Formats the reading, or returns null when it cannot be shown. */
  read(state: TelemetryState): string | null;
  /** True when the value deserves the warning colour. */
  alert?(state: TelemetryState): boolean;
}

/** The Phase 4 "optional" PIDs, alongside the primary coolant gauge. */
const SPECS: TileSpec[] = [
  {
    key: 'rpm',
    label: 'Engine',
    unit: 'rpm',
    read: (s) => (s.frame ? String(Math.round(s.frame.rpm)) : null),
    alert: (s) => !!s.frame && s.frame.rpm > 6_000,
  },
  {
    key: 'intake',
    label: 'Intake air',
    unit: '°C',
    read: (s) => (s.frame && Number.isFinite(s.frame.intakeC) ? String(Math.round(s.frame.intakeC)) : null),
    alert: (s) => !!s.frame && s.frame.intakeC > 60,
  },
  {
    key: 'voltage',
    label: 'Battery',
    unit: 'V',
    read: (s) => (s.frame && Number.isFinite(s.frame.voltage) ? s.frame.voltage.toFixed(1) : null),
    // Below ~13.2V with the engine turning means the alternator is not keeping
    // up; above 15V means it is overcharging. Cranking dips are expected, so
    // the low check only applies once the engine is actually running.
    alert: (s) => {
      if (!s.frame || !Number.isFinite(s.frame.voltage)) return false;
      const { voltage, rpm } = s.frame;
      return voltage > 15 || (rpm > 400 && voltage < 13.2);
    },
  },
];

export interface Tiles {
  readonly el: HTMLElement;
  update(state: TelemetryState): void;
}

export function createTiles(): Tiles {
  const el = document.createElement('div');
  el.className = 'tiles';

  const cells = SPECS.map((spec) => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.innerHTML = `
      <p class="tile__label">${spec.label}</p>
      <p class="tile__value"><span data-role="v">--</span><span class="tile__unit">${spec.unit}</span></p>`;
    el.append(tile);
    const value = tile.querySelector<HTMLElement>('[data-role="v"]');
    if (!value) throw new Error(`tiles: missing value slot for ${spec.key}`);
    return { spec, tile, value };
  });

  return {
    el,
    update(state) {
      // A dead link means every secondary reading is unknown too, not zero.
      const usable = state.connection !== 'disconnected';
      for (const { spec, tile, value } of cells) {
        const text = usable ? spec.read(state) : null;
        value.textContent = text ?? '--';
        tile.classList.toggle('tile--alert', !!text && !!spec.alert?.(state));
      }
    },
  };
}
