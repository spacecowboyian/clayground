# AI Event Summary (Live Context Summary)

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **user arriving at an event timeline**,
I want **to see an AI-generated summary of what is happening or what happened**,
So that **I can quickly understand the context before watching the full timeline**.

## Acceptance Criteria
- [ ] Summary generated from aggregated posts, transcripts, and metadata
- [ ] Summary updates periodically during live events
- [ ] Summary shown near media player window
- [ ] Summary adjusts tone depending on live vs completed event
- [ ] Summary limited to readable length (e.g., 2–5 short paragraphs)
- [ ] Summary regenerates when significant new media is added

## Technical Notes
- Use LLM summarization service
- Extract transcripts from videos where available
- Use captions and post text as input
- Implement summarization throttling to reduce API cost
- Store generated summaries in database with timestamps

## Dependencies
- Media ingestion pipeline
- Transcript extraction system
- LLM service
- Event metadata

## Priority
- [x] Critical (MVP)
- [ ] High
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
- Test summary accuracy with minimal data
- Test live summary refresh behavior
- Test large event with high media volume
- Evaluate hallucination risk
