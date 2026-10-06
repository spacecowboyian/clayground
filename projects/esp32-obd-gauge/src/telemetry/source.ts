import { createSimulator, isScenario } from './simulator';
import { createSocket } from './socket';
import type { ConnectionState, TelemetryFrame, TelemetrySource, TelemetryState } from './types';

/** A raw frame producer. The watchdog below turns one into a TelemetrySource. */
export interface FrameEmitter {
  readonly label: string;
  start(push: (frame: TelemetryFrame) => void, setLink: (up: boolean) => void): void;
  stop(): void;
}

/** No frame for this long and the reading is no longer trustworthy. */
const STALE_AFTER_MS = 1_800;
/** No frame for this long and we call the link dead. */
const DEAD_AFTER_MS = 5_000;
/** How often we re-evaluate age, independent of frame arrival. */
const WATCH_MS = 250;

/**
 * Wraps an emitter with frame-age tracking. This is the only place that
 * decides what `live` means, so the simulator and the real dongle socket
 * degrade identically — a socket that stays open while CAN decoding dies
 * still shows as stale, then disconnected.
 */
export function withWatchdog(emitter: FrameEmitter): TelemetrySource {
  const listeners = new Set<(state: TelemetryState) => void>();
  let frame: TelemetryFrame | null = null;
  let lastFrameAt: number | null = null;
  let linkUp = false;
  let started = false;
  let timer: ReturnType<typeof setInterval> | undefined;

  function connection(): ConnectionState {
    if (lastFrameAt === null) return linkUp ? 'connecting' : 'disconnected';
    const age = performance.now() - lastFrameAt;
    if (!linkUp || age > DEAD_AFTER_MS) return 'disconnected';
    if (age > STALE_AFTER_MS) return 'stale';
    return 'live';
  }

  function emit() {
    const state: TelemetryState = {
      connection: connection(),
      frame,
      ageMs: lastFrameAt === null ? null : performance.now() - lastFrameAt,
    };
    for (const listener of listeners) listener(state);
  }

  return {
    label: emitter.label,
    subscribe(listener) {
      listeners.add(listener);
      if (!started) {
        started = true;
        emitter.start(
          (next) => {
            frame = next;
            lastFrameAt = performance.now();
            emit();
          },
          (up) => {
            linkUp = up;
            emit();
          },
        );
        timer = setInterval(emit, WATCH_MS);
      }
      listener({ connection: connection(), frame, ageMs: null });
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          clearInterval(timer);
          emitter.stop();
          started = false;
        }
      };
    },
  };
}

/**
 * Decides whether this page talks to a real dongle or fakes it.
 *
 * On the ESP32 the page is served from the AP's own address, so live is the
 * default there. On localhost and GitHub Pages there is no dongle, so it
 * simulates. `?sim=<scenario>` forces fake data anywhere (handy for showing
 * an overheat you cannot reproduce in a car); `?live=1` forces a real socket.
 */
export function resolveSource(search: string): TelemetrySource {
  const params = new URLSearchParams(search);
  const sim = params.get('sim');

  if (params.get('live') === '1') return withWatchdog(createSocket());
  if (isScenario(sim)) return withWatchdog(createSimulator(sim));
  if (sim !== null) return withWatchdog(createSimulator('warmup'));

  return withWatchdog(hasDongle() ? createSocket() : createSimulator('warmup'));
}

/**
 * True when the page looks like it was served by the dongle itself.
 *
 * The ESP32 runs its own access point and hands out private addresses, so a
 * private IP is the signal. Matching on "anything that is not localhost or
 * GitHub Pages" was wrong: it treated every other host as a car, including
 * published pages, and showed them a permanently disconnected gauge.
 */
function hasDongle(): boolean {
  const { hostname } = window.location;
  return /^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(hostname);
}
