# Epic 3: Event Creation (Lightweight)

## Overview
Minimal flow for naming, confirming, or initiating an event when none exists—fast, low-friction, optional inputs.

## Scope
This epic focuses on making event creation as simple and fast as possible:
- Minimal required fields
- Smart defaults based on context
- Optional enhanced details
- Quick confirmation flows
- Progressive disclosure of advanced options
- Mobile-first input experience

## Key User Flows
1. **Quick Create**: User taps "What's happening" → enters title → done
2. **Context-Aware Create**: System suggests location/time → user confirms
3. **Enhanced Create**: User optionally adds details, tags, description
4. **Import Create**: User shares link from social media → event created

## Technical Considerations
- Form optimization for mobile
- Auto-save and draft functionality
- Input validation (minimal but smart)
- Default value generation
- Fast API endpoints for creation

## MVP Priority
🔴 Critical - Core functionality for platform

## Story Naming Convention
Files should be named: `03-[story-number]-[description].md`

Example: `03-001-quick-event-creation.md`
