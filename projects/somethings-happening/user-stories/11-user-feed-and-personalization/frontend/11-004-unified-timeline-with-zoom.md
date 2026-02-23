# Unified Timeline Display with Zoom Functionality

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **user viewing my personalized feed**,
I want **channels, macro events, and micro events displayed in one large chronological stream with the ability to zoom in/out**,
So that **I can see all my content in one place and choose between detailed moments or summary view**.

## Acceptance Criteria
- [ ] Timeline displays content from multiple sources in single chronological stream
- [ ] All content types (channels, macros, micros) use same unified display format
- [ ] Default view shows individual moments chronologically ordered
- [ ] Zoom out functionality shows wrapped-up summaries of events
- [ ] Zoom in functionality shows detailed individual moments
- [ ] Visual timeline indicator showing temporal position
- [ ] Smooth transition between zoom levels
- [ ] Zoom state persists during session
- [ ] Content from channels, macro subscriptions, and micro events all appear in feed
- [ ] Clear visual differentiation between zoom levels
- [ ] Timestamps and date markers throughout timeline
- [ ] Infinite scroll for navigating long timelines
- [ ] Jump to date functionality
- [ ] Filter/sort options while maintaining chronological order
- [ ] Real-time updates for new content appear in appropriate position

## Technical Notes

### Display Modes

**Detailed View (Zoomed In)**
- Individual moments/posts shown in full
- Media previews, captions, timestamps
- User interactions (reactions, comments)
- Source information (which channel/event)

**Summary View (Zoomed Out)**
- Events shown as single cards with key metadata
- Aggregated statistics (posts count, time range, participants)
- Collapsed content with expand option
- Visual timeline with event markers

### UI Components
```typescript
// Timeline container with zoom controls
<Timeline zoomLevel="detailed" | "summary">
  <TimelineZoomControls />
  <TimelineStream>
    {content.map(item => (
      <TimelineItem 
        type={item.type}
        zoomLevel={zoomLevel}
        data={item}
      />
    ))}
  </TimelineStream>
</Timeline>

// Zoom controls
<TimelineZoomControls>
  <button onClick={zoomOut}>Summary View</button>
  <button onClick={zoomIn}>Detailed View</button>
  <TimelineScale currentZoom={zoom} />
</TimelineZoomControls>
```

### Data Structure
```typescript
interface TimelineItem {
  id: string
  timestamp: DateTime
  type: 'macro-event' | 'micro-event' | 'moment' | 'post'
  source: {
    channelId?: string
    channelName?: string
    eventId: string
    eventName: string
  }
  content: {
    // Content varies by type and zoom level
    summary?: string
    details?: DetailedContent
    media?: MediaItem[]
    statistics?: EventStatistics
  }
}
```

### Timeline Features
- **Temporal Navigation**: Date markers, "jump to date" control
- **Zoom Transitions**: Smooth animated transitions between zoom levels
- **Contextual Information**: Show source (channel/event) for each item
- **Visual Timeline**: Optional vertical timeline visualization showing event positions
- **Real-time Updates**: New content appears with animation in correct chronological position

### Performance Considerations
- Virtual scrolling for long timelines
- Lazy loading of media content
- Paginated data fetching (load more as user scrolls)
- Cache zoom state and scroll position
- Optimize re-renders when switching zoom levels

## Dependencies
- Event subscription system (Story 11-002)
- User channels (Story 11-003)
- Macro/micro event hierarchy (Story 11-001)
- Timeline components (Epic 5)
- Media player components (Epic 5)

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
- Test timeline with mixed content types
- Test zoom in/out functionality
- Test zoom state persistence
- Test timeline with 0 items
- Test timeline with 10, 100, 1000+ items
- Test chronological ordering with multiple sources
- Test real-time content insertion
- Test jump to date functionality
- Test infinite scroll pagination
- Test performance with large datasets
- Test on mobile and desktop
- Test with slow network (loading states)
- Test keyboard navigation
- Test accessibility (screen readers, keyboard controls)
- Test zoom transitions smoothness
- Test timeline with events spanning multiple days/weeks/months

## Design Notes
- Maintain consistent visual language across zoom levels
- Clear affordances for zoom controls
- Visual feedback during zoom transitions
- Consider user's context (mobile vs desktop) for default zoom level
- Ensure accessibility for all interactions

## Additions
### 2026-02-17 — Requested by: @spacecowboyian
- Unified timeline display showing channels, macros, and micros in one chronological stream with zoom in/out functionality for detailed vs summary views
