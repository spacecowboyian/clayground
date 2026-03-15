# Print Queue UI Integration with Synced LAN Data

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a Print Queue user,
I want to import from synced LAN job data,
So that I can create work orders without Bambu cloud token setup.

## Acceptance Criteria
- [ ] Farm Settings adds LAN Bridge configuration/status section
- [ ] Dashboard import dialog can read from cloud-synced LAN jobs
- [ ] Import UX clearly labels data source (LAN Sync vs Legacy Cloud Token)
- [ ] Legacy cloud-token import remains optional fallback
- [ ] Empty/error states explain how to bring edge agent online

## Technical Notes
- Keep existing prefill mapping for item/color/notes/price where possible
- Add feature flag to switch default import source to LAN sync
- Include migration UI copy to reduce confusion

## Dependencies
- `04-005-cloud-ingest-api.md`

## Priority
- [x] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [ ] Small (1-2 days)
- [x] Medium (3-5 days)
- [ ] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)
