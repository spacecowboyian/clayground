# Cloud Ingest API and Storage Contracts

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As an application maintainer,
I want stable cloud ingestion and query APIs,
So that edge collectors and Print Queue UI can evolve independently.

## Acceptance Criteria
- [ ] Cloud schema/migrations created for printers, state snapshots, and synced jobs
- [ ] Secure ingest endpoint exists for edge writes
- [ ] Read endpoints/views exist for recent jobs and latest printer state
- [ ] Row-level security and key scoping are configured
- [ ] API contracts are documented with examples

## Technical Notes
- Prefer append-only event table plus materialized latest-state table
- Add indexes for `printer_id`, `updated_at`, `status`
- Support pagination and filtering by printer/status/date

## Dependencies
- `04-002-printer-onboarding-and-auth.md`
- `04-003-lan-telemetry-state-sync.md`
- `04-004-job-history-sync.md`

## Priority
- [x] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [ ] Small (1-2 days)
- [x] Medium (3-5 days)
- [ ] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)
