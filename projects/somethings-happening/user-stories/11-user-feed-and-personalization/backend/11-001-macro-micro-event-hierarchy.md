# Macro/Micro Event Hierarchy System

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **platform user**,
I want **events to be organized in a hierarchical structure with macro events containing related micro events**,
So that **I can understand the broader context of individual moments and follow ongoing stories**.

## Acceptance Criteria
- [ ] Database schema supports macro/micro event relationships (one-to-many)
- [ ] API endpoints for creating and managing event hierarchies
- [ ] Macro events can contain multiple micro events
- [ ] Micro events can belong to one macro event (optional relationship)
- [ ] Events can exist independently without macro/micro relationships
- [ ] Query capabilities to fetch all micro events for a macro event
- [ ] Query capabilities to fetch the parent macro event from a micro event
- [ ] Support for creating macro events from the UI
- [ ] Support for linking existing events as micro events to a macro
- [ ] Support for creating new micro events within a macro context
- [ ] Validation to prevent circular relationships
- [ ] Ability to unlink micro events from macro events
- [ ] Display macro event metadata (title, description, date range, location)

## Technical Notes

### Data Model Considerations
- Add `parentEventId` field to Event model (nullable, self-referencing foreign key)
- Add `eventType` enum: `STANDALONE`, `MACRO`, `MICRO`
- Consider denormalization for performance (e.g., `microEventCount` on macro events)
- Index `parentEventId` for efficient queries
- Add `displayOrder` field for ordering micro events within a macro

### API Endpoints
- `POST /api/events` - Create event (with optional `parentEventId`)
- `GET /api/events/:id/children` - Get all micro events for a macro
- `PATCH /api/events/:id/parent` - Link/unlink event to macro
- `GET /api/events/:id/parent` - Get parent macro event

### Real-World Examples
- **Macro**: ICE Occupation of Minnesota
  - **Micro**: Protest at Minneapolis City Hall (Jan 15, 2026)
  - **Micro**: Community meeting response (Jan 18, 2026)
  - **Micro**: Legislative hearing incident (Jan 22, 2026)

- **Macro**: Staley High School Football 2026 Season
  - **Micro**: Game vs Winnetonka (Aug 30, 2026)
  - **Micro**: Game vs Liberty (Sep 6, 2026)
  - **Micro**: Homecoming game (Sep 20, 2026)

## Dependencies
- Event database schema and API (Epic 4)
- Event creation flows (Epic 3)
- Event resolution logic (Epic 2) - to prevent duplicate macros

## Priority
- [ ] Critical (MVP)
- [x] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [ ] Small (1-2 days)
- [ ] Medium (3-5 days)
- [x] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)

## Implementation Details
[To be filled during implementation]

## Testing Notes
- Test creating macro event with no micro events
- Test creating macro event with initial micro events
- Test adding micro events to existing macro
- Test unlinking micro events from macro
- Test querying all micro events for a macro
- Test event creation without macro/micro relationships (backwards compatibility)
- Test circular relationship prevention
- Test cascading deletes (if macro deleted, what happens to micro events?)
- Test with large number of micro events (100+)
- Performance test queries with complex hierarchies
