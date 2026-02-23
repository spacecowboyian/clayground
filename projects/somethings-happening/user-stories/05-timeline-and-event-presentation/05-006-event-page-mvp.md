# Event Page MVP

## Status
- [ ] Not Started
- [x] In Progress
- [ ] Completed

## Vision & Context
In a world drowning in algorithmic feeds and manufactured content, real events happening in real time are losing visibility. This feature aims to make real-world moments as engaging and accessible as short-form content platforms like YouTube Shorts, but grounded in reality. When someone shares a link to an event, recipients should be able to immediately hop in and start consuming moments—no friction, no complexity. This isn't about entertainment for entertainment's sake; it's about keeping humans connected to the world around them and to each other through what actually matters.

## User Story
As a **user receiving a link to an event**,
I want **to instantly start watching/reading moments in a familiar, engaging short-form content experience**,
So that **I can stay connected to real-world events that matter without the friction of complex interfaces**.

## Acceptance Criteria
- [ ] Event page accessible at `/event/[id]` route
- [ ] Event header displays event title and basic information
- [ ] Timeline displays media items in a clean, vertical layout
- [ ] Each timeline item shows timestamp, source, and content preview
- [ ] Components use React Aria for accessibility
- [ ] All styling uses global CSS variables from design system
- [ ] Components are reusable and styled with CSS modules
- [ ] Page is responsive and works on mobile and desktop
- [ ] UI follows the established design patterns from the Button component
- [ ] Media player displays full moment text at bottom with expandable ellipsis
- [ ] Mobile: Player autoplays from first item (no autoplay on desktop)
- [ ] Mobile: Player uses portrait format optimized for phone screens
- [ ] Mobile: Event header collapses to title-only with chevron to expand
- [ ] Mobile: Tapping a moment returns focus to the player

## Technical Notes
- This is a stripped-down version of story 05-001 focusing only on UI
- Uses Next.js App Router with dynamic routes
- Components built with react-aria-components
- Styling uses CSS modules with CSS custom properties
- No backend integration needed for MVP - uses mock data
- Components should be placed in `/src/components` with their CSS modules
- Route should be in `/src/app/event/[event-id]/page.tsx`
- Mock data should include varied text lengths and image examples for testing
- Mobile detection needed for conditional autoplay and header collapse behavior
- Portrait player aspect ratio should adapt to screen orientation on mobile

## Dependencies
- Existing Button component pattern
- Global CSS design tokens in globals.css
- React Aria Components library
- Next.js App Router

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
### Components Created
1. **EventHeader** - Displays event title, date, and status
2. **Timeline** - Container for timeline items
3. **EventCard** - Individual timeline item with media preview

### Route Structure
- `/src/app/event/[id]/page.tsx` - Dynamic event page

### Styling Approach
- Each component has its own `.module.css` file
- All values use CSS custom properties from globals.css
- Follows the pattern established by Button.module.css
- Supports light/dark themes automatically

## Testing Notes
- Verify route renders at `/event/test-event-123`
- Check all CSS variables are used correctly
- Verify responsive behavior on different screen sizes
- Test dark mode support
- Verify accessibility with keyboard navigation

## Additions
### 2026-02-17 — Requested by: @spacecowboyian
- Make the top event area (from title through media player) sticky during scroll, offset timeline content so it remains visible below the sticky region, make each entire timeline moment card clickable to play/select with active highlight and auto-scroll beneath player position, and use thumbnail-only rendering for YouTube moments in timeline cards (full playback only in the main media player).
- Display all event and timeline times in the viewer's local 12-hour format without timezone labels, and show same-day header ranges as one date followed by a time window.
- Drive the header time range from the first and last timeline posts so the displayed event window reflects actual ingested media timing.
- Remove the live update strip from the header and present same-day event time as a true range from first-post time to last-post time.
- Tighten event header vertical spacing to a fixed 12px top/bottom rhythm for a more compact stage layout.
- Add example images to moments in the fake data (both single and multiple images per moment) to use as background slideshows during text moment playback, displaying each image for 5 seconds.
- Vary text length in fake data moments to support dynamic text moment duration based on content length.
- Display full text of every moment at the bottom of the player area in small font with an ellipsis that users can expand if needed.

### 2026-02-17 — Mobile-Specific Features — Requested by: @spacecowboyian
- Enable player autoplay from the first item on mobile (no autoplay on desktop).
- Configure player to use portrait format on mobile to fit phone screens.
- When user taps on a moment, return focus to the player.
- Minimize event header on mobile to show just the title in a slim font that fits above the player, with a chevron icon button on the right to expand and show all event header info.
