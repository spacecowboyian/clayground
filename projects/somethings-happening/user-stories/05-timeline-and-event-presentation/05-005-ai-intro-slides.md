# AI Intro Slides (Completed Event Replay Mode)

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **user watching a completed event**,
I want **an AI-generated intro before playback begins**,
So that **I understand the setup and major moments before the timeline unfolds**.

## Acceptance Criteria
- [ ] Intro slides generated automatically for completed events
- [ ] Slides shown before playback begins
- [ ] Slides summarize key phases or milestones
- [ ] Slides can be skipped
- [ ] Slides auto-advance before timeline playback begins

## Technical Notes
- Identify event phases via clustering timestamps
- Use engagement signals (future enhancement) to identify key moments
- Generate slide content via LLM
- Store intro generation results

## Dependencies
- AI summarization service
- Event clustering logic
- Media metadata

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
To be filled during implementation

## Testing Notes
- Test intro generation for small events
- Test intro generation for large events
- Test skip behavior
