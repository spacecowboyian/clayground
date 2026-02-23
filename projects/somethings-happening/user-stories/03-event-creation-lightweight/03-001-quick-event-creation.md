# Quick Event Creation

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **user witnessing an event**,
I want **to create an event with minimal input required**,
So that **I can quickly document what's happening without friction**.

## Acceptance Criteria
- [ ] User can create event with just a title (minimum required field)
- [ ] Location auto-detected from device GPS (optional override)
- [ ] Time auto-set to current time (optional override)
- [ ] Creation completes in under 5 seconds on average
- [ ] Works offline with sync when connection restored
- [ ] Confirmation message shown after successful creation
- [ ] User immediately taken to event timeline after creation

## Technical Notes
- Form should use progressive disclosure for optional fields
- Auto-save draft every 5 seconds
- Use device location API with permission handling
- Backend API should have fast response time (<500ms)
- Consider optimistic UI updates
- Store drafts in local storage/IndexedDB

## Dependencies
- Event model and database schema
- Timeline view (Epic 5)
- Location services (Epic 2)

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
To be filled during implementation

## Testing Notes
- Test with location permissions granted/denied
- Test offline creation and sync
- Test with very long titles
- Test rapid successive creations
- Test auto-save functionality
