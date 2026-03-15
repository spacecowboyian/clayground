# Print Job History Sync from LAN to Cloud

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a print operator,
I want completed and recent print jobs synced to cloud tables,
So that Print Queue can import jobs without Bambu cloud token workflows.

## Acceptance Criteria
- [ ] Job extractor reads available local job/task history per printer
- [ ] Canonical cloud schema exists for synced print jobs
- [ ] Upsert logic is idempotent and keyed by stable printer/task identity
- [ ] Job details include title, start/end, duration, weight, status, filament metadata
- [ ] History backfill process supports initial sync + incremental sync

## Technical Notes
- Include source fields for traceability (`source = lan_edge`)
- Keep mapping table for printer serial to farm settings identity
- Support partial records when some fields are unavailable

## Dependencies
- `04-002-printer-onboarding-and-auth.md`
- `04-003-lan-telemetry-state-sync.md`

## Priority
- [x] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [ ] Small (1-2 days)
- [ ] Medium (3-5 days)
- [x] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)
