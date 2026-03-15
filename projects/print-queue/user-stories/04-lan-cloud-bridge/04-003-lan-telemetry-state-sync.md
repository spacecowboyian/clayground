# LAN Telemetry and Printer State Sync

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a shop owner,
I want near-real-time printer state synced from LAN to cloud,
So that dashboards and automations can see live printer activity.

## Acceptance Criteria
- [ ] Edge collector subscribes/polls printer state from LAN interfaces
- [ ] Normalized state model is defined (idle/printing/paused/error/offline)
- [ ] State updates are upserted to cloud storage with timestamps
- [ ] Last-seen heartbeat is tracked per printer
- [ ] Duplicate/noisy updates are rate-limited or deduplicated

## Technical Notes
- Capture key fields: progress, temps, layer, ETA, current job id, error code
- Keep raw payload snapshots for debug (with retention window)
- Normalize units and status enums before cloud write

## Dependencies
- `04-001-edge-agent-bootstrap.md`
- `04-002-printer-onboarding-and-auth.md`

## Priority
- [x] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [ ] Small (1-2 days)
- [x] Medium (3-5 days)
- [ ] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)
