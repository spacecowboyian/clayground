# Printer Onboarding and Edge Authentication

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a print-farm operator,
I want to register printers to the edge service using LAN credentials,
So that only authorized printers are ingested and synced.

## Acceptance Criteria
- [ ] Printer registration endpoint supports create/update/remove
- [ ] LAN credentials are stored encrypted at rest on the edge host
- [ ] Edge-to-cloud communication uses signed credentials (service key or JWT)
- [ ] Invalid printer credentials are rejected with clear errors
- [ ] A connectivity test validates printer reachability and auth

## Technical Notes
- Prefer per-edge service identity instead of per-printer cloud tokens
- Avoid storing sensitive values in browser localStorage
- Record printer metadata: serial, model, display name, location tag

## Dependencies
- `04-001-edge-agent-bootstrap.md`

## Priority
- [x] Critical (MVP)
- [ ] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [ ] Small (1-2 days)
- [x] Medium (3-5 days)
- [ ] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)
