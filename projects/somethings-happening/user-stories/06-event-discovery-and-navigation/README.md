# Epic 6: Event Discovery & Navigation

## Overview
Browsing, searching, and navigating between active events, past events, and related macro/micro events.

## Scope
This epic handles how users find and move between events:
- Event browsing and listing
- Search functionality
- Filtering (by time, location, category, status)
- Event relationships (parent/child, related events)
- Navigation patterns
- Trending/popular events
- Personalized recommendations

## Key User Flows
1. **Browse Active**: User opens app → sees list of active events nearby
2. **Search Events**: User searches keyword → finds relevant events
3. **Filter Results**: User applies filters → refined event list
4. **Navigate Related**: User viewing event → sees related events → navigates
5. **Explore Archive**: User browses past events by date/location

## Technical Considerations
- Search indexing (Elasticsearch, Algolia, or similar)
- Geospatial queries for location-based discovery
- Graph database for event relationships
- Caching strategies for performance
- Mobile navigation patterns
- SEO optimization for public discovery

## MVP Priority
🟡 High - Important for user engagement and retention

## Story Naming Convention
Files should be named: `06-[story-number]-[description].md`

Example: `06-001-active-events-listing.md`
