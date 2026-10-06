import type { FrameEmitter } from './source';
import type { TelemetryFrame } from './types';

/** Reconnect backoff, capped so a parked car keeps retrying cheaply. */
const BACKOFF_MS = [500, 1_000, 2_000, 4_000, 8_000];

/**
 * The real client: an AsyncWebSocket on the ESP32 at /ws pushing
 * `{"coolantC":88,"rpm":2240,"intakeC":34,"voltage":14.1,"speedKph":96,
 * "throttlePct":24,"timingAdv":33,"ts":123456}`.
 *
 * It never throws on bad input — a half-written frame from a dongle that
 * browned out mid-send is dropped and the watchdog handles the gap.
 */
export function createSocket(url = defaultUrl()): FrameEmitter {
  let ws: WebSocket | undefined;
  let attempt = 0;
  let retry: ReturnType<typeof setTimeout> | undefined;
  let closed = false;

  return {
    label: `live · ${url}`,
    start(push, setLink) {
      const open = () => {
        if (closed) return;
        ws = new WebSocket(url);

        ws.onopen = () => {
          attempt = 0;
          setLink(true);
        };

        ws.onmessage = (event) => {
          const frame = parseFrame(event.data);
          if (frame) push(frame);
        };

        ws.onerror = () => ws?.close();

        ws.onclose = () => {
          setLink(false);
          if (closed) return;
          const wait = BACKOFF_MS[Math.min(attempt, BACKOFF_MS.length - 1)];
          attempt += 1;
          retry = setTimeout(open, wait);
        };
      };
      open();
    },
    stop() {
      closed = true;
      clearTimeout(retry);
      ws?.close();
    },
  };
}

function defaultUrl(): string {
  const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
  return `${scheme}://${window.location.host}/ws`;
}

function parseFrame(data: unknown): TelemetryFrame | null {
  if (typeof data !== 'string') return null;
  let raw: unknown;
  try {
    raw = JSON.parse(data);
  } catch {
    return null;
  }
  if (typeof raw !== 'object' || raw === null) return null;
  const r = raw as Record<string, unknown>;
  if (!isNum(r.coolantC)) return null;
  // Everything but coolant is optional: an ECU that does not answer a PID
  // leaves that tile showing a placeholder rather than a confident zero.
  return {
    coolantC: r.coolantC as number,
    rpm: isNum(r.rpm) ? (r.rpm as number) : 0,
    intakeC: isNum(r.intakeC) ? (r.intakeC as number) : NaN,
    voltage: isNum(r.voltage) ? (r.voltage as number) : NaN,
    speedKph: isNum(r.speedKph) ? (r.speedKph as number) : NaN,
    throttlePct: isNum(r.throttlePct) ? (r.throttlePct as number) : NaN,
    timingAdv: isNum(r.timingAdv) ? (r.timingAdv as number) : NaN,
    ts: isNum(r.ts) ? (r.ts as number) : 0,
  };
}

function isNum(v: unknown): boolean {
  return typeof v === 'number' && Number.isFinite(v);
}
