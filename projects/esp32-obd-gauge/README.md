# ESP32 OBD Gauge — web interface

The page that the DIY ESP32 OBD-II dongle serves to an iPhone over its own
Wi‑Fi AP. Live coolant temperature is the primary reading; engine speed,
intake air temperature and battery voltage sit alongside it.

Project plan (hardware, wiring, firmware phases) lives in Brains at
`projects/esp32-obd-gauge/plan.md`. This repo holds **Phase 2: gauge UI**.

## Status

The UI is complete and driven entirely by a simulated telemetry feed. No
hardware is required to work on it, and nothing here talks to a real car yet.

## Running it

```bash
npm install
npm run dev
```

Everything is vanilla TypeScript — no React, no Tailwind, no Gearhead. That is
a deliberate departure from the repo-wide rule in `AGENTS.md`: this page is
flashed to a 4 MB ESP32 and served by `ESPAsyncWebServer`, so the whole app has
to stay a single small file with no framework runtime.

## Scenarios

With no dongle present the page simulates one. Append `?sim=<scenario>`:

| Scenario   | What it shows                                                   |
|------------|-----------------------------------------------------------------|
| `warmup`   | Default. Key-on → crank → cold idle → drive. Cold band to normal |
| `normal`   | Already-warm engine cruising, thermostat modulating around 87 °C |
| `hot`      | Sits in the warn band around 101–105 °C with the fan cycling     |
| `overheat` | Stuck-shut thermostat; climbs through 115 °C into critical       |
| `stale`    | Frames stop arriving while the socket stays open                 |
| `offline`  | Nothing ever connects                                            |

`?live=1` forces a real WebSocket even on localhost.

### How realistic is the fake data?

The simulator is a small thermal model, not a random walk. Heat in scales with
engine load; heat out scales with `(coolant − ambient)`, thermostat opening and
radiator airflow, so the behaviour falls out rather than being scripted:

- Cold fast-idle near 1280 rpm decaying to ~800 rpm as the coolant comes up
- Thermostat cracking open at 82 °C, fully open by 88 °C
- Radiator fan on above 100 °C, off below 94 °C — so it cycles at idle
- Coolant settling ~87 °C cruising, drifting to ~95 °C sitting in traffic
- Intake air heat-soaking to the mid-40s °C at a standstill, dropping at speed
- Charging voltage ~14.1 V, sagging under load, 12.5 V with the engine off
- An upshift sawtooth on the tacho under acceleration

Warmup runs at **6× real time** so the full cold-to-normal arc takes about a
minute instead of 5–8. Coolant and intake air are rounded to whole degrees
because the real PIDs encode them as a single byte of `A − 40`, so the gauge
steps exactly as it will in the car.

## Shipping it to the dongle

```bash
npm run build:fw
```

Builds and copies the single inlined HTML file to `firmware/data/index.html`,
ready for a LittleFS upload. Current size is **~17 kB (6.7 kB gzipped)** — one
request, no external assets.

The same artifact is published to `docs/esp32-obd-gauge/main/` for the
Clayground gallery, where it runs the simulator.

## Firmware contract

The page opens a WebSocket to `/ws` on whatever host served it and expects
JSON frames at roughly 2 Hz:

```json
{ "coolantC": 88, "rpm": 2240, "intakeC": 34, "voltage": 14.1, "ts": 123456 }
```

Only `coolantC` is required; the other fields degrade to `--` if absent or
non-numeric. Malformed frames are dropped rather than throwing.

Link health is derived from **frame arrival, not socket state** — a socket that
stays open while CAN decoding dies still goes stale (1.8 s) then disconnected
(5 s). Reconnect backoff is 0.5 s → 8 s.

## Thresholds

| Band     | Range        | Meaning                        |
|----------|--------------|--------------------------------|
| Cold     | below 70 °C  | Still warming up               |
| Normal   | 70–104 °C    | Operating range                |
| Warn     | 105–114 °C   | Running hot, fan should be on  |
| Critical | 115 °C and up| Overheating                    |

Scale runs 40–130 °C. Each band colour is verified at ≥ 4.5:1 contrast against
the `#222222` background.
