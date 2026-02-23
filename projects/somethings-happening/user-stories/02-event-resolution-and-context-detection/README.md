# Epic 2: Event Resolution & Context Detection

## Overview
Determining whether an event already exists, resolving duplicates, and establishing place/time context using AI and device signals.

## Scope
This epic handles the intelligent matching and deduplication of events:
- Event existence checking
- Duplicate event detection and resolution
- Location context determination (GPS, IP, venue data)
- Time context detection (timezone, relative timing)
- AI-powered event matching
- Device signal processing

## Key User Flows
1. **New Event Check**: System checks if event exists before creating
2. **Duplicate Resolution**: User reports event → system finds existing → merges data
3. **Context Auto-Fill**: System detects location/time → suggests event context
4. **Smart Matching**: Multiple reports → AI determines if same event

## Technical Considerations
- Geospatial indexing and proximity matching
- Temporal event matching algorithms
- AI/ML model for event similarity
- Device permissions and signal handling
- Privacy considerations for location data

## MVP Priority
🟡 High - Important for preventing duplicate events and good UX

## Story Naming Convention
Files should be named: `02-[story-number]-[description].md`

Example: `02-001-event-existence-check.md`
