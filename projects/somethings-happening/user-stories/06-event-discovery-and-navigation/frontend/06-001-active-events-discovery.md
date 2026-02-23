# Active Events Discovery and Browsing

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **user exploring the platform**,
I want **to discover and browse active events happening nearby or that I'm interested in**,
So that **I can find relevant events and stay informed about what's happening**.

## Acceptance Criteria
- [ ] Home page displays list of currently active events
- [ ] Events sorted by relevance (proximity, recency, popularity)
- [ ] Location-based filtering shows events near user's location
- [ ] Search functionality allows finding events by keywords
- [ ] Category/tag filters available (news, sports, entertainment, etc.)
- [ ] Event cards show key info: title, location, time, participant count
- [ ] Infinite scroll or pagination for browsing long lists
- [ ] Map view option showing events on interactive map
- [ ] "Trending" section highlights popular events
- [ ] User can toggle between active and archived events

## Technical Notes
- Implement efficient search indexing (Elasticsearch, Algolia, or similar)
- Geospatial queries for location-based discovery
- Caching strategy for popular queries and event lists
- Real-time updates for active event counts
- Responsive design for mobile and desktop
- Consider personalization based on user history (future)
- Optimize database queries with proper indexing

## Dependencies
- Event database with geospatial and full-text search capabilities
- Search service infrastructure (Epic 10)
- Event data model and API
- Location services for user proximity
- UI components for event cards and lists

## Priority
- [ ] Critical (MVP)
- [x] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [ ] Small (1-2 days)
- [x] Medium (3-5 days)
- [ ] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)

## Implementation Details
To be filled during implementation

## Testing Notes
- Test with 0, 10, 100, 1000+ events
- Test location-based filtering at various distances
- Test search with various keywords and phrases
- Test filtering combinations
- Test pagination/infinite scroll
- Test on mobile and desktop
- Test with location permissions granted/denied
- Verify performance with large datasets
