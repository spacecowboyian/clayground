# Multi-Channel User Entry and Onboarding

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **new or returning user**,
I want **multiple ways to discover and access events (QR codes, shared links, search, direct URLs)**,
So that **I can easily find and engage with relevant events regardless of how I discover them**.

## Acceptance Criteria
- [ ] QR code scanning redirects users to specific events
- [ ] Shared links (social media, messaging) open correct event
- [ ] Direct URL access works for all event pages
- [ ] Deep linking works on mobile (app/web fallback)
- [ ] First-time users see appropriate onboarding/orientation
- [ ] Returning users skip onboarding and see content directly
- [ ] All entry points track analytics (source attribution)
- [ ] Search engine indexing allows organic discovery
- [ ] Entry flow optimized for mobile and desktop
- [ ] Graceful handling of invalid/expired links

## Technical Notes
- Implement deep linking with universal links (iOS) and App Links (Android)
- URL structure: `somethingshappening.app/e/{event-id}?source={qr|share|search|direct}`
- QR code generation and tracking system
- Session management for new vs returning users
- Analytics integration for funnel tracking
- SEO optimization for organic discovery
- Progressive onboarding (contextual, not blocking)
- Handle various link formats and parameters

## Dependencies
- Event detail pages (Epic 5)
- User session management
- Analytics infrastructure (Epic 10)
- SEO configuration

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
- Test QR code entry on multiple devices
- Test shared links from various platforms
- Test direct URL access
- Test first-time vs returning user flows
- Test with and without app installed
- Test search engine discovery
- Test analytics tracking for all sources
- Test invalid/expired link handling
