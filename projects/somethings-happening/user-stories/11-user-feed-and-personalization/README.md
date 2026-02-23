# Epic 11: User Feed and Personalization

## Overview
Personalized user feeds, event subscriptions, and content organization through channels. This epic enables users to curate their experience by subscribing to macro events and organizing content in custom channels.

## Scope
This epic handles how users personalize and consume content:
- Macro/micro event hierarchy and relationships
- Event subscription system
- User-created channels for content organization
- Personalized feed generation
- Unified timeline display across channels, macros, and micros
- Timeline zoom functionality (detailed view ↔ summary view)

## Key User Flows
1. **Subscribe to Macro Event**: User discovers macro event → subscribes → sees micro event posts in feed
2. **Create Channel**: User creates channel → adds categories or event subscriptions → views channel timeline
3. **View Feed**: User opens personalized feed → sees chronological stream of subscribed content
4. **Zoom Timeline**: User viewing timeline → zooms out to see event summaries → zooms in to see individual moments

## Technical Considerations
- Event hierarchy data model (macro ↔ micro relationships)
- Subscription system with notification preferences
- Feed generation algorithm (chronological, personalized)
- Channel data model and organization
- Timeline rendering with zoom levels
- Real-time feed updates for new content
- Performance optimization for large feeds
- Caching strategies for personalized content

## Real-World Examples

### Macro/Micro Event Examples
- **Macro**: ICE Occupation of Minnesota
  - **Micro**: Individual incident reports
  - **Micro**: Protest at location X
  - **Micro**: Community response event
  
- **Macro**: Staley High School Football 2026 Season
  - **Micro**: Friday night game vs Winnetonka
  - **Micro**: Saturday practice session
  - **Micro**: Team announcement

## MVP Priority
🟡 High - Important for user engagement, retention, and personalized experience

## Dependencies
- Epic 2: Event Resolution & Context Detection (for event relationships)
- Epic 5: Timeline & Event Presentation (for display patterns)
- Epic 6: Event Discovery & Navigation (for finding events to subscribe)

## Story Naming Convention
Files should be named: `11-[story-number]-[description].md`

Example: `11-001-macro-micro-event-hierarchy.md`
