# Timeline Media Player (Sequential Playback Engine)

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## Vision & Context
The power of short-form content platforms lies in their frictionless consumption: tap play and immerse yourself in a continuous stream. We're bringing that same immediacy and engagement to real-world events. Each moment—whether video, image, or text—should flow naturally into the next, creating an experience as compelling as scrolling through Shorts, but about events that actually happened and people who actually exist. This is about reclaiming attention for reality, making it as easy to stay informed about the world as it is to get lost in algorithmic content.

Future potential includes generating audio from text-only moments to create a fully immersive experience, but the core mission remains: make real life matter.

## User Story
As a **user consuming event content**,
I want **to experience moments sequentially in an engaging, short-form content style**,
So that **staying connected to real-world events is as effortless and compelling as consuming any other media**.

## Acceptance Criteria
- [ ] Media player displays current item
- [ ] Play / Pause controls available
- [ ] Auto-advance to next item after completion
- [ ] Supports images (auto duration), videos, and text posts
- [ ] Playback respects selected timeline order
- [ ] Live playback waits for new content if chronological mode selected
- [ ] Playback can run continuously without user interaction
- [ ] Playback suitable for passive display (TV/browser window)
- [ ] Text moments display as animated captions (2-3 words at a time, 0.5s intervals)
- [ ] Text moment duration varies based on text length
- [ ] Images from posts used as background slideshow during text playback (5s per image)

## Technical Notes
- Implement queue-based playback model
- Define default duration for static media (e.g., 5 seconds for images in slideshows)
- Text moment duration calculated dynamically based on text length and caption animation timing
- Video playback must detect completion event
- Queue must dynamically update when new items are ingested
- Text rendering requires caption animation engine with word-grouping logic
- Background slideshow requires image preloading and transition management
- **Future Enhancement**: Consider audio generation from text-only moments to create fully immersive multimedia experiences, depending on traffic levels and cost feasibility

## Dependencies
- Media rendering layer
- Timeline ordering system
- Live ingestion system

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
- Test playback across media types
- Test large queue sizes
- Test memory leaks during long playback sessions
- Test behavior when media fails to load

## Additions
### 2026-02-17 — Requested by: @spacecowboyian
- Align media-player UX to standard web video player behavior: icon controls (play/pause, previous, next), progress bar tied to real media duration, and scrubbing support for video/audio.
- Add keyboard shortcut support so pressing Space toggles play/pause, and keep mute always available with cyan speaker state when unmuted vs gray slashed-speaker state when muted.
- Add arrow-key transport shortcuts (left/right for previous/next) and preserve selected playback mode semantics so click-selected moments can play as single-item while transport-started playback can continue sequentially.
- Use images from posts as background slideshows during text moment playback, showing each image for 5 seconds.
- Vary text moment playback duration based on the amount of text in each moment.
- Display text moments like captions in a YouTube short: 2-3 words on screen at a time, separated by 0.5 seconds between word groups.
