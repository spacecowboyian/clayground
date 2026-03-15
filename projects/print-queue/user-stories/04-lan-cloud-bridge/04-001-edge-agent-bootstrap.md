# Edge Agent Bootstrap — LAN Collector Service

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a print-farm operator,
I want a small edge service running inside my LAN,
So that printer data can be collected locally without requiring direct cloud API token access.

## Acceptance Criteria
- [ ] A dedicated edge service project exists for LAN ingestion
- [ ] The service can run locally via one command
- [ ] Environment configuration supports multiple printers
- [ ] Service exposes a health endpoint for monitoring
- [ ] Basic structured logging is enabled

## Technical Notes
- Suggested runtime: Node.js or Python, lightweight daemon
- Inputs per printer: IP, serial, LAN access code
- Keep this service separate from the web frontend process

## Dependencies
- None

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
