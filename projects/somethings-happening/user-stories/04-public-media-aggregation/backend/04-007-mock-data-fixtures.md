# Mock Data and Development Fixtures

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **frontend developer**,
I want **realistic mock data and fixtures for events and media**,
So that **I can develop and test the UI without depending on real data scraping**.

## Acceptance Criteria
- [ ] Mock data generator script creates sample events
- [ ] Mock events include varied statuses (live, upcoming, completed)
- [ ] Mock events include realistic timestamps (past, present, future)
- [ ] Mock events include varied locations
- [ ] Mock media items associated with each event (10-50 items per event)
- [ ] Mock media includes different types (images, videos, text posts)
- [ ] Mock media includes realistic timestamps spanning event duration
- [ ] Mock media includes source attribution (Twitter, Instagram, etc.)
- [ ] Seeding script can reset and repopulate database
- [ ] Seeding script idempotent (can run multiple times safely)
- [ ] Sample images and videos included in repository or via public URLs
- [ ] API endpoints return mock data in development mode without scraping
- [ ] Mock data includes edge cases (very short events, very long events, no media)
- [ ] Documentation on how to generate and use mock data

## Technical Notes
### Mock Data Structure
- Create at least 5 sample events with different characteristics:
  - Live event happening now (status: live)
  - Completed event from yesterday (status: completed)
  - Upcoming event tomorrow (status: upcoming)
  - Large event with 100+ media items
  - Small event with only 5 media items

### Sample Event Scenarios
1. **Concert Event**: Music festival with images and videos
2. **Sports Event**: Game with live updates and highlights
3. **Breaking News**: Fast-moving event with frequent updates
4. **Community Gathering**: Local event with personal photos
5. **Historical Archive**: Old event for testing archive mode

### Mock Media Sources
- Use placeholder image services (Unsplash, Picsum, etc.)
- Include sample video URLs (public domain content)
- Generate realistic timestamps within event windows
- Include varied content: photos, short clips, text updates

### Seeding Script
```bash
npm run db:seed           # Seed database with mock data
npm run db:reset          # Clear and reseed database
npm run db:seed:events    # Seed only events
npm run db:seed:media     # Seed only media (requires events)
```

### Environment Flag
```typescript
// Use mock data in development
const USE_MOCK_DATA = process.env.NODE_ENV === 'development';
```

## Dependencies
- Database setup and schema (Epic 4 story 04-004)
- Event and Media models (Epic 4 story 04-002)
- Media storage system optional for this story (can use external URLs)

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
- Test seeding script on empty database
- Test seeding script on existing database (idempotency)
- Test reset script removes all data
- Verify mock data matches production schema
- Verify API endpoints return mock data correctly
- Test frontend components with various mock scenarios
- Verify image URLs are accessible
- Test with different numbers of media items per event
