# Timeline Ordering and State Indicator

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **user viewing an event timeline**,
I want **to clearly see whether the event is ongoing or completed and understand the timeline order**,
So that **I know how to interpret what I'm seeing**.

## Acceptance Criteria
- [ ] Event start date/time displayed
- [ ] Event end date/time displayed (if completed)
- [ ] "Live" badge shown when event is ongoing
- [ ] "Completed" badge shown when event has ended
- [ ] Timeline visually indicates playback direction
- [ ] Toggle control allows switching between chronological and reverse order
- [ ] Switching order updates playback queue immediately

## Technical Notes
- Event state determined by comparing current time to event window
- UI state must sync with playback engine
- Toggle must not reload entire page

## Dependencies
- Event metadata model
- Timeline playback engine

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
- Test timezone edge cases
- Test event transitioning from live to completed
- Test toggle mid-playback
