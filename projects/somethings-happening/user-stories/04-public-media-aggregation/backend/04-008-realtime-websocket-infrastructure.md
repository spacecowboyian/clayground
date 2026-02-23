# Real-time Media Updates and WebSocket Infrastructure

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **user viewing a live event timeline**,
I want **new media to appear automatically without refreshing the page**,
So that **I can follow the event in real-time as it unfolds**.

## Acceptance Criteria
- [ ] WebSocket server configured and running
- [ ] Client can establish WebSocket connection to server
- [ ] Client subscribes to specific event updates via event_id
- [ ] Server pushes new media items to subscribed clients immediately
- [ ] Server pushes event status changes (live, completed) to subscribed clients
- [ ] Connection automatically reconnects if dropped
- [ ] Graceful fallback to polling if WebSockets unavailable
- [ ] Multiple clients can subscribe to same event simultaneously
- [ ] Client unsubscribes when leaving event page
- [ ] WebSocket endpoint: ws://host/api/ws/events/:id
- [ ] Message format standardized with type and payload
- [ ] Connection authenticated for future security (optional for MVP)
- [ ] Server tracks number of active subscriptions per event

## Technical Notes
### WebSocket Message Format
```typescript
// Server → Client messages
type WebSocketMessage = 
  | { type: 'media:new', payload: Media }
  | { type: 'media:update', payload: Media }
  | { type: 'media:delete', payload: { mediaId: string } }
  | { type: 'event:status', payload: { status: EventStatus } }
  | { type: 'connected', payload: { eventId: string } }
  | { type: 'error', payload: { message: string } };

// Client → Server messages
type ClientMessage =
  | { type: 'subscribe', payload: { eventId: string } }
  | { type: 'unsubscribe', payload: { eventId: string } }
  | { type: 'ping' };
```

### Implementation Options
1. **Socket.io**: Full-featured, easy to use, fallback support
2. **ws library**: Lightweight native WebSocket implementation
3. **Server-Sent Events (SSE)**: Simpler alternative, one-way only
4. **Next.js API routes**: Custom implementation needed

### Architecture
- WebSocket server runs alongside Next.js server
- Broadcasting service publishes updates to all subscribers
- Redis pub/sub for multi-instance deployment (future)
- Heartbeat/ping-pong to detect dead connections
- Automatic cleanup of stale connections

### Client-Side Handling
```typescript
// Frontend hook for real-time updates
const useEventUpdates = (eventId: string) => {
  const [media, setMedia] = useState<Media[]>([]);
  
  useEffect(() => {
    const ws = connectToEvent(eventId);
    
    ws.on('media:new', (newMedia) => {
      setMedia(prev => [...prev, newMedia]);
    });
    
    return () => ws.disconnect();
  }, [eventId]);
  
  return media;
};
```

### Performance Considerations
- Limit connections per IP to prevent DoS
- Throttle update frequency (max 1 update/second per event)
- Batch multiple media items in single message
- Compress messages for large payloads
- Monitor memory usage with many connections

## Dependencies
- WebSocket library (Socket.io or ws)
- Epic 4 story 04-002: Event Data Model and API (provides data structure)
- Epic 5 story 05-001: Playable AI-Driven Event Timeline (consumes updates)
- Redis for pub/sub (for production multi-instance, optional for MVP)

## Priority
- [x] Critical (MVP)
- [ ] High
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
- Test connection establishment and handshake
- Test subscription to specific events
- Test receiving updates in real-time
- Test multiple clients on same event
- Test connection reconnection after network failure
- Test graceful degradation to polling
- Test unsubscribe on page navigation
- Load test with 100+ concurrent connections
- Test memory leaks with long-running connections
- Test message ordering (updates arrive in correct sequence)
- Test server-side broadcast to multiple subscribers
