# ESP32 OBD Gauge — web interface

The page the DIY ESP32 OBD-II dongle serves to an iPhone over its own Wi‑Fi AP.
Built for autocross and rallycross in a 2009 Honda Fit Sport (GE8, L15A7).

Project plan (hardware, wiring, firmware phases) lives in Brains at
`projects/esp32-obd-gauge/plan.md`. This repo is **Phase 2: gauge UI**.

## The design

Portrait, three bands, top to bottom:

1. **Tach** — full bleed, fills bottom to top through flat zones: green,
   yellow, red, then the redline band. At the shift point the whole band goes
   solid red. It does not strobe — a steady flood is just as impossible to miss
   in peripheral vision, and a flashing light at eye level on a dash is a
   photosensitivity hazard.
2. **Coolant band** — full bleed and square, butted straight onto the tach with
   a 2px seam so the two read as one instrument. The whole bar takes **one**
   colour for where the reading sits: blue cold, green nominal, amber warm, red
   hot. Everything but red washes at a quarter strength, so the band is only
   loud when the engine is. Three dark reference lines mark the cold threshold,
   the nominal temperature (pinned to the middle of the screen) and the high
   crossover, and a 2px white needle travels to the current reading. The
   temperature sits inside the bar, right-aligned, always white — it clears
   9.4:1 on the blue, 8.4:1 on the green, 7.9:1 on the amber and 4.8:1 on the
   full-strength red.

   The colour boundaries are deliberately **not** the marker lines. The nominal
   line is a reference point inside the green, not a change of state: 195 °F is
   the middle of the operating range, and turning the bar amber above it would
   call a healthy 200 °F a warning. Amber starts at the high crossover and red
   at the critical temperature, which carries no line of its own.

3. **Six configurable tiles** — a full-bleed grid ruled by 1px lines, butted
   straight onto the coolant band. Each cell's reading runs as a large numeral
   filling it top to bottom with the label over it, dropped far enough that
   the bottom few pixels of the digits are cropped by the cell edge.
   **Press and hold any tile**
   to choose what it shows from 13 readouts; the choice persists on that phone.
   A rule inside a cell's bottom edge marks it as a session value you can tap to
   reset.

There is no chrome: no header, no status pill, no footer. A dead link shows
itself — every reading blanks to a placeholder and both meters park at zero
rather than freezing on a stale number — and a polite live region carries the
same thing to a screen reader.

## Why it looks like that

A run is 45–70 seconds and **you will not read this screen while driving.**
Peripheral vision gets the shift flash; nothing else lands. So the gauge is
built for three separate moments:

- **In grid, before the run** — coolant and intake air answer "am I heat
  soaked?" The most useful live reading you have.
- **During** — shift flash only. That is why it is full bleed.
- **Back in grid, after** — the session values. **Tap a tile to reset it,
  or `Reset run` to clear them all.** Peak rpm catches a money-shift you would
  otherwise never know about; peak coolant and intake tell you whether to pop
  the hood before the next run.

## Readouts

| Live | Session (tap to reset) |
|------|------------------------|
| Intake air temp | Top speed |
| Coolant temp | Peak engine speed |
| Battery voltage | Peak coolant temp |
| Vehicle speed | Peak intake air temp |
| Engine speed | Peak throttle position |
| Throttle position | Minimum voltage |
| Timing advance | |

Timing advance is the sleeper: if the ECU starts pulling timing you are heat
soaked or on bad fuel, and you will see it here before you feel it.

## Running it

```bash
npm install
npm run dev
```

Vanilla TypeScript — no React, no Tailwind, no Gearhead. A deliberate departure
from the repo-wide rule in `AGENTS.md`: this page is flashed to a 4 MB ESP32 and
served by `ESPAsyncWebServer`, so no framework runtime can ship there and
Gearhead has no gauge primitive to reuse. The Gearhead palette is mirrored in
`src/styles/theme.css` and **extended** there with the tach and coolant ramps —
instrument colours read as large fills in daylight, so they run brighter than
Gearhead's accents, which are tuned for text on a monitor.

## Scenarios

With no dongle present the page simulates one. Append `?sim=<scenario>`:

| Scenario | What it shows |
|----------|---------------|
| `warmup` | Default. Key-on → crank → cold idle → drive |
| `normal` | Warm engine cruising, thermostat modulating |
| `hot` | Warn band, fan cycling |
| `overheat` | Stuck-shut thermostat, climbs into critical |
| `redline` | Parks either side of the shift point so the flash is visible |
| `stale` | Frames stop while the socket stays open |
| `offline` | Nothing ever connects |

`?live=1` forces a real WebSocket even on localhost.

### How realistic is the fake data?

A thermal model, not a random walk. Heat in scales with engine load, heat out
with `(coolant − ambient)` × thermostat opening × radiator airflow, so the
behaviour falls out rather than being scripted: thermostat cracking at 82 °C,
fan cycling 94–100 °C, cold fast-idle decaying ~1280 → ~800 rpm, intake air
heat-soaking at a standstill and clearing at speed, timing retarding under load
and under heat, charging voltage sagging under load.

Warmup runs at **6× real time** so the cold-to-normal arc takes about a minute.
Coolant and intake are rounded to whole degrees, and speed to whole km/h,
because the real PIDs encode them that way.

## Firmware contract

WebSocket to `/ws` on whatever host served the page, ~2 Hz JSON:

```json
{ "coolantC": 88, "rpm": 2240, "intakeC": 34, "voltage": 14.1,
  "speedKph": 96, "throttlePct": 24, "timingAdv": 33, "ts": 123456 }
```

PIDs: `0x05` coolant, `0x0C` rpm, `0x0F` intake, `0x42` voltage, `0x0D` speed,
`0x11` throttle, `0x0E` timing advance. Only `coolantC` is required — anything
missing or non-numeric shows a placeholder rather than a confident zero, so an
ECU that does not answer a PID degrades gracefully.

**Two things the firmware must get right:**

- **Poll rpm every cycle and rotate the slow signals.** Each PID is a
  request/response round trip (~5–15 ms). Polling seven evenly would put rpm at
  well under 10 Hz, and at ~2000 rpm/sec in 2nd gear that is 200 rpm+ of lag on
  the shift light. Coolant does not change in 50 ms; rpm does.
- **Read the supported-PID bitmasks at boot** (`0x00`, `0x20`, `0x40`, `0x60`)
  and log them. That settles what this ECU actually answers in one drive.

Link health is derived from **frame arrival, not socket state** — a socket that
stays open while CAN decoding dies goes stale (1.8 s) then disconnected (5 s).
Reconnect backoff 0.5 s → 8 s.

## Vehicle profile

`src/vehicle.ts`. 6800 rpm redline, 117 hp @ 6600, 106 lb-ft @ 4800.

`SHIFT_RPM` is **6500, deliberately below redline** to buy back polling latency —
re-tune once the real poll rate is known. Fuel-cut and the VTEC crossover point
are not published by Honda, so neither is baked in.

**Oil temperature is not available.** PID `0x5C` is standard but the Fit has no
oil temp sensor; oil pressure is not an OBD PID at all and the Fit only has a
low-pressure switch. Both need aftermarket sensors.

Phone accelerometer for lateral g is also out: iOS gates `DeviceMotion` behind a
secure context and the dongle serves plain HTTP.

## Shipping it to the dongle

```bash
npm run build:fw
```

Builds and copies the single inlined HTML file to `firmware/data/index.html` for
LittleFS upload. Currently **~29 kB (9.4 kB gzipped)** — one request, no
external assets. The same artifact is published to `docs/esp32-obd-gauge/main/`
for the Clayground gallery, where it runs the simulator.
