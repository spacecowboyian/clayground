# Feature-Gated Add-Ons and Entitlements

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a product owner,
I want feature entitlements that can turn modules on or off per user plan,
So that advanced capabilities can be offered with freemium tiers without changing or risking core MVP behavior.

## Acceptance Criteria
- [ ] A central entitlement model exists for add-on capabilities.
- [ ] Navigation and routes can be hidden or disabled based on entitlement.
- [ ] Add-on actions validate entitlement before performing writes.
- [ ] Disabled add-ons do not change core KPI calculations or workflows.
- [ ] Default entitlements preserve existing core behavior for all users.
- [ ] Entitlement changes can be applied without rollback migrations.
- [ ] Users see clear upgrade messaging when accessing gated features.
- [ ] Basic telemetry/logging captures gated feature access attempts.

## MVP Scope
- [ ] Single boolean capability for print-queue add-on module.
- [ ] Route-level and component-level guard helpers.
- [ ] Core-safe defaults when capability is missing or false.
- [ ] Minimal upgrade prompt copy (no billing flow yet).

## Out of Scope (Future)
- [ ] Full billing and subscription lifecycle integration.
- [ ] Multi-tier entitlement matrix with admin plan management UI.
- [ ] Cohort-level experiments and dynamic remote config rollout.

## Technical Notes
- Project: projects/print-queue
- Add a single source of truth for capability resolution.
- Use module guards in routing and page composition.
- Keep core slices and add-on slices loosely coupled.
- Keep all schema changes additive and backward compatible.

## Dependencies
- Auth/profile source for plan metadata (or app config fallback).
- Routing and state integration for feature guards.

## Priority
- [x] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [ ] Small (1-2 days)
- [x] Medium (3-5 days)
- [ ] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)

## Additions
### 2026-03-15 — Requested by: @copilot
- Added freemium-ready capability gating to keep new modules optional and additive.
- Explicitly requires core MVP behavior to remain intact when add-ons are disabled.
