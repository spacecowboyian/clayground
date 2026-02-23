# User-Created Channels

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **user organizing my interests**,
I want **to create custom channels with different categories of events or specific event subscriptions**,
So that **I can organize and view content streams tailored to different aspects of my interests**.

## Acceptance Criteria
- [ ] Users can create multiple channels
- [ ] Users can name and describe their channels
- [ ] Channels can contain event subscriptions
- [ ] Channels can contain category filters (news, sports, entertainment, etc.)
- [ ] Channels can mix categories and specific event subscriptions
- [ ] Users can view a list of their channels
- [ ] Users can edit channel settings (name, description, filters)
- [ ] Users can delete channels
- [ ] Users can reorder their channels
- [ ] Each channel has its own chronological timeline view
- [ ] Users can switch between channels easily
- [ ] Channel timelines update in real-time with new content
- [ ] Support for private channels (default) and potentially shareable channels (future)
- [ ] Visual indicators for unread content per channel

## Technical Notes

### Data Model
```typescript
model Channel {
  id          String   @id @default(cuid())
  userId      String
  name        String
  description String?
  displayOrder Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User     @relation(fields: [userId], references: [id])
  subscriptions ChannelSubscription[]
  categories  ChannelCategory[]
  
  @@index([userId])
}

model ChannelSubscription {
  id          String   @id @default(cuid())
  channelId   String
  eventId     String   // Can be macro or micro event
  createdAt   DateTime @default(now())
  
  channel     Channel  @relation(fields: [channelId], references: [id])
  event       Event    @relation(fields: [eventId], references: [id])
  
  @@unique([channelId, eventId])
}

model ChannelCategory {
  id          String   @id @default(cuid())
  channelId   String
  category    String   // "sports", "news", "entertainment", etc.
  
  channel     Channel  @relation(fields: [channelId], references: [id])
  
  @@unique([channelId, category])
}
```

### API Endpoints
- `POST /api/channels` - Create channel
- `GET /api/channels` - Get user's channels
- `GET /api/channels/:id` - Get channel details
- `PATCH /api/channels/:id` - Update channel
- `DELETE /api/channels/:id` - Delete channel
- `POST /api/channels/:id/subscriptions` - Add event subscription to channel
- `DELETE /api/channels/:id/subscriptions/:subscriptionId` - Remove subscription
- `POST /api/channels/:id/categories` - Add category filter
- `DELETE /api/channels/:id/categories/:categoryId` - Remove category
- `GET /api/channels/:id/feed` - Get channel's timeline feed

### Example Use Cases

**Sports Fan Channel**
- Name: "KC Sports"
- Subscriptions: 
  - Chiefs 2026 Season (macro)
  - Royals 2026 Season (macro)
  - Sporting KC 2026 Season (macro)
- Categories: ["sports"]

**Local News Channel**
- Name: "Kansas City News"
- Categories: ["news", "politics"]
- Location filter: Kansas City metro (future enhancement)

**Personal Interests Channel**
- Name: "Things I'm Following"
- Subscriptions: 
  - Staley High School Football (macro)
  - Downtown KC Development Project (macro)
  - Local music venue events (category)

## Dependencies
- User authentication system (Epic 1)
- Event subscription system (Story 11-002)
- Macro/micro event hierarchy (Story 11-001)
- Event categorization system
- Unified timeline display (Story 11-004)

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
[To be filled during implementation]

## Testing Notes
- Test creating channel with name only
- Test creating channel with categories
- Test creating channel with event subscriptions
- Test creating channel with both categories and subscriptions
- Test adding subscriptions to existing channel
- Test removing subscriptions from channel
- Test adding categories to existing channel
- Test removing categories from channel
- Test updating channel name and description
- Test deleting channel
- Test reordering channels
- Test channel feed generation with mixed sources
- Test channel feed with no content
- Test user with 0 channels (default state)
- Test user with 10+ channels
- Test channel with 50+ subscriptions
- Performance test feed generation with complex channel filters

## Additions
### 2026-02-17 — Requested by: @spacecowboyian
- User-created channels for organizing content by categories and specific event subscriptions
