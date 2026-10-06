# Coolant Gauge Web Interface

## Status
- [ ] Not Started
- [ ] In Progress
- [x] Completed

## User Story
As the driver of a car with a DIY ESP32 OBD-II dongle plugged into it,
I want a coolant-temperature gauge I can open in iPhone Safari,
So that I can watch engine temperature on a phone mount without an app, a
subscription, or an internet connection.

## Acceptance Criteria
- [x] Coolant temperature is the primary reading: large numeral plus an arc
- [x] Colour bands for cold / normal / running hot / overheating
- [x] Secondary readouts for engine speed, intake air temperature and battery
      voltage
- [x] Connection states are distinguishable: connecting, live, signal lost,
      disconnected
- [x] A lost link blanks the readings instead of freezing a stale number that
      would be read as current
- [x] Legible on a dark dash at ≤ 390 px and ≥ 1280 px with no overflow
- [x] Drivable entirely from simulated data, with no hardware attached

## Technical Notes
- Vanilla TypeScript built by Vite and inlined to one file by
  `vite-plugin-singlefile`; the same artifact serves the Clayground gallery and
  the ESP32's LittleFS partition.
- Deliberately does **not** use Gearhead / React Aria / Tailwind. Gearhead has
  no gauge primitive, and a React runtime cannot be served from a 4 MB flash
  chip over a weak AP. Design tokens are mirrored locally in
  `src/styles/theme.css` so the look stays consistent with the design system.
- Link health is derived from frame arrival age, not socket state, so the
  simulator and the real dongle degrade identically.
- Accessibility: `role="meter"` with `aria-valuenow` / `aria-valuetext` on the
  dial, a polite live region that only announces band and connection
  transitions rather than every 2 Hz frame, and `prefers-reduced-motion`
  honoured on both the arc transition and the status pulse.

## Dependencies
- Brains `projects/esp32-obd-gauge/plan.md` — Phase 2
- Blocks nothing; Phase 3 (CAN in the car) replaces the simulator with real
  frames over the existing WebSocket contract.

## Priority
- [x] Critical (MVP)
- [ ] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [x] Small (1-2 days)
- [ ] Medium (3-5 days)
- [ ] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)

## Implementation Details
Simulated telemetry is a thermal model rather than a random walk: heat in
scales with engine load, heat out with `(coolant − ambient)`, thermostat
opening and radiator airflow. Thermostat and fan behaviour, warm-idle decay and
traffic heat creep emerge from the model instead of being scripted. Warmup is
time-compressed 6×. Coolant and intake are quantised to whole degrees to match
the single-byte `A − 40` PID encoding.

## Testing Notes
Verified in headless Chromium at 390×844 and 1280×800 across all six
scenarios: zero console errors or warnings, no horizontal overflow, correct
band and connection transitions. The warmup curve was sampled every 4 s for
100 s to confirm the model reaches operating temperature and then holds it.

## Additions
### 2026-10-06 — Requested by: @spacecowboyian
- Initial request: build the web interface first, driven by realistic dummy
  data, ahead of any hardware purchase.
