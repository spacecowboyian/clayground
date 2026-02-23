# Data Scraping Service Architecture

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **system architect**,
I want **a robust architecture for scraping and aggregating public media**,
So that **the system can reliably collect media from multiple sources without blocking the main application**.

## Acceptance Criteria
- [ ] Background job processing system selected (BullMQ, Inngest, or similar)
- [ ] Job queue configured for scraping tasks
- [ ] Scraping jobs can be triggered manually via API endpoint
- [ ] Scraping jobs can be scheduled periodically (cron-like)
- [ ] Each scraping job processes one event and one source platform
- [ ] Failed jobs automatically retry with exponential backoff
- [ ] Job status tracking (pending, processing, completed, failed)
- [ ] Job results logged with success/failure details
- [ ] Dead letter queue for permanently failed jobs
- [ ] Admin endpoint to view job queue status: GET /api/admin/jobs
- [ ] Admin endpoint to trigger manual scrape: POST /api/admin/scrape
- [ ] Worker processes isolated from web request handlers
- [ ] Rate limiting enforced per platform to respect API limits

## Technical Notes
- Use BullMQ with Redis for job queue (lightweight, Next.js compatible)
- Alternative: Inngest for serverless-friendly background jobs
- Each platform (Twitter, Instagram, etc.) has separate queue
- Store API rate limit state in Redis
- Implement circuit breaker pattern for failing APIs
- Log all scraping attempts to database for audit trail
- Use webhooks where available instead of polling
- Scraping logic should be modular (one file per platform)
- Consider using Puppeteer for platforms without APIs
- Implement graceful shutdown for worker processes

### Job Structure
```typescript
interface ScrapeJob {
  eventId: string;
  platform: 'twitter' | 'instagram' | 'tiktok';
  searchParams: {
    location?: { lat: number; lng: number; radius: number };
    timeRange: { start: Date; end: Date };
    keywords?: string[];
  };
  priority: 'high' | 'normal' | 'low';
}
```

### Architecture Components
1. **Web API**: Receives scrape requests, enqueues jobs
2. **Job Queue**: Manages job lifecycle and retry logic
3. **Workers**: Execute scraping tasks independently
4. **Rate Limiter**: Enforces platform-specific rate limits
5. **Storage**: Saves scraped media to storage system

## Dependencies
- Redis instance for queue and rate limiting state
- Background job library installation (BullMQ or Inngest)
- Epic 4 story 04-001: Social Media Integration (uses this architecture)
- Epic 4 story 04-002: Event Data Model (provides event context)
- Epic 4 story 04-003: Media Storage (stores scraped media)

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
- Test job enqueuing and dequeuing
- Test retry logic with simulated failures
- Test rate limiting enforcement
- Test concurrent job processing
- Test worker crash recovery
- Test job priority ordering
- Test dead letter queue handling
- Load test with 1000+ concurrent jobs
- Test graceful shutdown behavior
- Monitor memory usage during long-running jobs
