# Public Social Media Integration

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **user viewing an event timeline**,
I want **to see public social media posts related to the event**,
So that **I can get a comprehensive view of what happened from multiple sources**.

## Acceptance Criteria
- [ ] System aggregates public posts from major platforms (Twitter/X, Instagram, TikTok)
- [ ] Posts filtered by location and time range relative to event
- [ ] Posts displayed in chronological order within timeline
- [ ] Each post shows source platform, timestamp, and author attribution
- [ ] Media from posts (images, videos) rendered properly
- [ ] System respects platform API rate limits
- [ ] Only genuinely public content is aggregated (no private/protected posts)
- [ ] Aggregation runs periodically to capture new content
- [ ] Users can manually refresh to get latest public posts

## Technical Notes
- Use platform APIs (Twitter API v2, Instagram Basic Display API, TikTok API)
- Implement OAuth flows for API authentication
- Set up background jobs for periodic aggregation
- Store API credentials securely (environment variables)
- Implement rate limiting and backoff strategies
- Consider webhooks for real-time updates where available
- CDN for caching media assets
- Database indexing for efficient time/location queries

## Dependencies
- Social media platform API access and credentials
- Background job processing infrastructure (Epic 10)
- Media storage and CDN setup
- Event timeline display (Epic 5)
- Privacy and permissions framework (Epic 8)

## Priority
- [ ] Critical (MVP)
- [x] High
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
- Test with each platform API individually
- Test rate limiting behavior
- Test with various media types
- Test location-based filtering accuracy
- Test time-based filtering with different timezones
- Test API failure handling and retries
- Verify only public content is retrieved
