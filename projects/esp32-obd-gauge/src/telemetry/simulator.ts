import type { FrameEmitter } from './source';
import type { TelemetryFrame } from './types';

export type Scenario = 'warmup' | 'normal' | 'hot' | 'overheat' | 'offline' | 'stale';

export const SCENARIOS: Scenario[] = ['warmup', 'normal', 'hot', 'overheat', 'offline', 'stale'];

export function isScenario(v: string | null): v is Scenario {
  return v !== null && (SCENARIOS as string[]).includes(v);
}

/** Firmware polls every 500ms (see plan.md), so the fake feed does too. */
const TICK_MS = 500;

/**
 * Thermal time compression. A real engine needs 5-8 minutes to reach
 * operating temp; at 6x the whole cold-to-normal arc is watchable in about
 * a minute without distorting the SHAPE of the curve.
 */
const THERMAL_SPEEDUP = 6;

const AMBIENT_C = 18;

/*
 * Thermal coefficients, tuned so the equilibria match a real engine rather
 * than just looking busy:
 *   idle      settles ~95C, fan cycling 94-100
 *   cruise    settles ~87C (thermostat modulating, rad doing the work)
 *   hard pull climbs toward ~100C and brings the fan in
 * Changing any of these moves all three, so re-check them together.
 */
const IDLE_HEAT = 0.55;
const LOAD_HEAT = 3.4;
/** Heat shed through the block and hoses with the thermostat shut. */
const BLOCK_LOSS = 0.06;
/** Heat shed through the radiator at full thermostat opening. */
const RAD_LOSS = 0.42;

type DriveMode = 'off' | 'crank' | 'idle' | 'accel' | 'cruise' | 'traffic';
interface Segment { mode: DriveMode; seconds: number }

/** Key-on, start, pull away, cruise, sit in traffic, cruise again — then loop. */
const COLD_START: Segment[] = [
  { mode: 'off', seconds: 2 },
  { mode: 'crank', seconds: 1.2 },
  { mode: 'idle', seconds: 14 },
];
const LOOP: Segment[] = [
  { mode: 'accel', seconds: 9 },
  { mode: 'cruise', seconds: 30 },
  { mode: 'traffic', seconds: 24 },
  { mode: 'accel', seconds: 6 },
  { mode: 'cruise', seconds: 45 },
];

interface Model {
  coolantC: number;
  intakeC: number;
  fanOn: boolean;
  elapsed: number;
}

/** Starting coolant temp per scenario — where on the curve we drop in. */
const START_COOLANT: Record<Scenario, number> = {
  warmup: AMBIENT_C,
  normal: 89,
  hot: 101,
  overheat: 108,
  offline: AMBIENT_C,
  stale: 90,
};

export function createSimulator(scenario: Scenario): FrameEmitter {
  let timer: ReturnType<typeof setInterval> | undefined;
  let model: Model;
  let bootedAt = 0;

  /** Where we are in the scripted drive cycle at time `t` seconds. */
  function segmentAt(t: number): { mode: DriveMode; into: number } {
    // 'warmup' is the only scenario that bothers with key-on and cranking;
    // the others drop you into an engine that is already running.
    const script = scenario === 'warmup' ? COLD_START : [];
    let remaining = t;
    for (const seg of script) {
      if (remaining < seg.seconds) return { mode: seg.mode, into: remaining };
      remaining -= seg.seconds;
    }
    const loopLength = LOOP.reduce((a, s) => a + s.seconds, 0);
    remaining %= loopLength;
    for (const seg of LOOP) {
      if (remaining < seg.seconds) return { mode: seg.mode, into: remaining };
      remaining -= seg.seconds;
    }
    return { mode: 'cruise', into: 0 };
  }

  function sample(dt: number): TelemetryFrame {
    model.elapsed += dt;
    const { mode, into } = segmentAt(model.elapsed);
    const running = mode !== 'off' && mode !== 'crank';

    // ── Road speed drives radiator airflow ────────────────────────────────
    let speedKph = 0;
    if (mode === 'accel') speedKph = Math.min(75, into * 9);
    else if (mode === 'cruise') speedKph = 88 + Math.sin(model.elapsed / 7) * 12;
    else if (mode === 'traffic') speedKph = Math.max(0, Math.sin(into / 3) * 14);

    // ── Engine load 0..1 ──────────────────────────────────────────────────
    let load = 0;
    if (mode === 'accel') load = 0.78;
    else if (mode === 'cruise') load = 0.3 + Math.sin(model.elapsed / 9) * 0.08;
    else if (mode === 'traffic') load = speedKph > 2 ? 0.22 : 0.07;
    else if (mode === 'idle') load = 0.07;

    // ── Coolant: heat in from combustion vs heat out through the rad ──────
    // Thermostat cracks open ~82C and is fully open by ~88C, which is what
    // produces the narrow oscillation you see on a warm gauge.
    const stat = clamp((model.coolantC - 82) / 6, 0, 1);
    if (model.coolantC > 100) model.fanOn = true;
    else if (model.coolantC < 94) model.fanOn = false;
    const airflow = 0.3 + speedKph / 110 + (model.fanOn ? 0.55 : 0);
    const heatIn = running ? IDLE_HEAT + load * LOAD_HEAT : 0;
    // The overheat scenario is a stuck-shut thermostat: the rad never gets
    // flow, so the fan cannot save it.
    const coolingPath =
      scenario === 'overheat' ? BLOCK_LOSS : BLOCK_LOSS + stat * airflow * RAD_LOSS;
    const heatOut = (model.coolantC - AMBIENT_C) * coolingPath * 0.055;
    model.coolantC += (heatIn - heatOut) * dt * THERMAL_SPEEDUP * 0.12;
    model.coolantC = clamp(model.coolantC, AMBIENT_C, 129);

    // ── Intake air: ambient plus underhood heat soak that airflow clears ──
    const soakTarget = running ? (speedKph < 12 ? 26 : 5 + 60 / (speedKph + 10)) : 2;
    model.intakeC += (AMBIENT_C + soakTarget - model.intakeC) * dt * 0.25;

    // ── RPM ───────────────────────────────────────────────────────────────
    let rpm = 0;
    if (mode === 'crank') rpm = 240 + noise(60);
    else if (mode === 'accel') {
      // Sawtooth = upshifts. ~2.4s per gear, drop to ~2100 on each change.
      const inGear = (into % 2.4) / 2.4;
      rpm = 1350 + inGear * 2150;
    } else if (mode === 'cruise') rpm = 2240 + Math.sin(model.elapsed / 6) * 160;
    else if (mode === 'traffic') rpm = speedKph > 2 ? 1500 + noise(200) : warmIdle();
    else if (mode === 'idle') rpm = warmIdle();
    if (running) rpm += noise(18);

    // ── Charging system ───────────────────────────────────────────────────
    let voltage: number;
    if (mode === 'off') voltage = 12.52 + noise(0.03);
    else if (mode === 'crank') voltage = 10.2 + noise(0.25);
    else voltage = 14.12 - load * 0.35 - (model.fanOn ? 0.18 : 0) + noise(0.04);

    // Quantize exactly as the PIDs do: coolant and intake are a single byte
    // of `A - 40`, so they arrive as whole degrees and the gauge steps.
    return {
      coolantC: Math.round(model.coolantC),
      intakeC: Math.round(model.intakeC),
      rpm: Math.max(0, Math.round(rpm / 0.25) * 0.25),
      voltage: Math.round(voltage * 1000) / 1000,
      ts: Math.round(performance.now() - bootedAt),
    };
  }

  /** Cold engines fast-idle; it settles as the coolant comes up. */
  function warmIdle(): number {
    return 1280 - clamp((model.coolantC - AMBIENT_C) / (82 - AMBIENT_C), 0, 1) * 470;
  }

  return {
    label: `simulated · ${scenario}`,
    start(push, setLink) {
      model = { coolantC: START_COOLANT[scenario], intakeC: AMBIENT_C, fanOn: false, elapsed: 0 };
      bootedAt = performance.now();

      if (scenario === 'offline') {
        // Nothing ever answers — exercises the disconnected state.
        setLink(false);
        return;
      }

      setLink(true);
      // Prime the UI immediately rather than showing an empty gauge for 500ms.
      push(sample(0));
      timer = setInterval(() => {
        // 'stale' goes quiet after ~6s with the socket still nominally open,
        // which is the failure the watchdog exists to catch.
        if (scenario === 'stale' && model.elapsed > 6) return;
        push(sample(TICK_MS / 1000));
      }, TICK_MS);
    },
    stop() {
      clearInterval(timer);
      timer = undefined;
    },
  };
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function noise(amplitude: number): number {
  return (Math.random() - 0.5) * 2 * amplitude;
}
