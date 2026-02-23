# Playable AI-Driven Event Timeline

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **user viewing an event**,
I want **to press play and experience the event as a dynamic, AI-curated timeline**,
So that **I can understand what happened (or what is happening) without manually sorting through posts**.

## Acceptance Criteria
- [ ] Timeline displays event start and end date/time prominently
- [ ] Event clearly marked as "Live" if current time is within event window
- [ ] Timeline defaults to reverse chronological order when event is live
- [ ] Timeline defaults to chronological order when event is completed
- [ ] User can manually toggle between chronological and reverse chronological
- [ ] A media player window exists at the top of the page
- [ ] User can press Play to automatically progress through timeline media
- [ ] Media auto-plays sequentially in selected order
- [ ] While live, timeline auto-loads new media as it becomes available
- [ ] If playing chronological order during live event, system waits for new media and auto-plays it
- [ ] AI-generated summary displayed describing current state of event
- [ ] Timeline supports continuous playback suitable for TV or passive viewing

## Technical Notes
- Timeline component must support dynamic ordering
- Media player must support queue-based playback
- Real-time updates require polling or event-driven updates
- AI summary generated from media transcripts, captions, and metadata
- WebSocket or long-polling recommended for live event updates
- Playback queue must update dynamically when new media is added
- UI must scale for TV display mode (large format layout)
- Use virtualization for long timelines to prevent performance degradation

## Dependencies
- Media aggregation system
- Event metadata model (start/end timestamps)
- AI summarization service
- Media rendering infrastructure
- Background ingestion jobs

## Priority
- [x] Critical (MVP)
- [ ] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [ ] Small (1-2 days)
- [ ] Medium (3-5 days)
- [ ] Large (1-2 weeks)
- [x] X-Large (2+ weeks)

## Implementation Details
To be filled during implementation

## Testing Notes
- Test live vs completed event behavior
- Test timeline ordering toggle
- Test continuous playback behavior
- Test playback while new media is ingested
- Test summary generation with minimal media
- Test TV-scale layout
- Test very long events (performance stress test)
