# Event Subscription System

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **user interested in ongoing stories**,
I want **to subscribe to macro events**,
So that **I automatically see new posts from related micro events in my personalized feed**.

## Acceptance Criteria
- [ ] Users can subscribe to any macro event
- [ ] Users can unsubscribe from macro events
- [ ] Subscription creates feed entries for all new micro event posts
- [ ] Users can view list of their active subscriptions
- [ ] Subscriptions persist across sessions
- [ ] Subscribe/unsubscribe buttons on macro event pages
- [ ] Visual indicator showing subscription status
- [ ] Feed includes posts from all subscribed macro events' micro events
- [ ] Notification preferences for subscriptions (optional)
- [ ] Ability to mute/unmute subscriptions without unsubscribing
- [ ] Subscription count displayed on macro events
- [ ] Bulk unsubscribe functionality

## Technical Notes

### Data Model
```typescript
model Subscription {
  id          String   @id @default(cuid())
  userId      String
  eventId     String   // macro event ID
  createdAt   DateTime @default(now())
  mutedUntil  DateTime? // for temporary muting
  
  user        User     @relation(fields: [userId], references: [id])
  event       Event    @relation(fields: [eventId], references: [id])
  
  @@unique([userId, eventId])
  @@index([userId])
  @@index([eventId])
}
```

### API Endpoints
- `POST /api/subscriptions` - Create subscription
  - Body: `{ eventId: string }`
- `DELETE /api/subscriptions/:id` - Remove subscription
- `GET /api/subscriptions` - Get user's subscriptions
- `GET /api/events/:id/subscribers` - Get subscriber count (privacy-respecting)
- `PATCH /api/subscriptions/:id/mute` - Mute subscription temporarily

### Feed Generation Logic
1. Query all user's active (non-muted) subscriptions
2. For each subscribed macro event:
   - Fetch recent micro events
   - Fetch posts/moments from those micro events
3. Merge and sort chronologically
4. Apply pagination

### Performance Considerations
- Cache feed results per user
- Invalidate cache on new subscription or content
- Use background jobs for feed generation
- Consider real-time updates via WebSocket for active feeds

## Dependencies
- User authentication system (Epic 1)
- Macro/micro event hierarchy (Story 11-001)
- Event database and API (Epic 4)
- User feed display (Story 11-004)

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
[To be filled during implementation]

## Testing Notes
- Test subscribing to macro event
- Test unsubscribing from macro event
- Test subscribing to multiple macro events
- Test feed includes posts from subscribed events only
- Test muting subscription (still subscribed but not in feed)
- Test unmuting subscription
- Test subscription persistence across sessions
- Test subscribing to same event multiple times (should be idempotent)
- Test deleting macro event with active subscriptions
- Test user deletion with active subscriptions
- Performance test with user subscribed to 50+ macro events
- Test feed generation with thousands of micro events

## Additions
### 2026-02-17 — Requested by: @spacecowboyian
- User subscription system for macro events to automatically populate personalized feed with micro event content
