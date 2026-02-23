# Epic 1: User Entry & Onboarding

## Overview
How users arrive at the platform (QR codes, shared links, URLs, search) and are oriented to what's happening.

## Scope
This epic covers all the ways users can discover and enter the platform, including:
- QR code scanning and handling
- Shared link processing
- Direct URL navigation
- Search engine discovery
- Initial orientation and first-time user experience
- Onboarding flows for different entry points

## Key User Flows
1. **QR Code Entry**: User scans QR code → redirected to event
2. **Shared Link**: User clicks link → deep link to specific event/content
3. **Direct Discovery**: User searches → finds platform → explores
4. **Return Visitor**: User returns → sees relevant/recent events

## Technical Considerations
- Deep linking architecture
- QR code generation and validation
- URL routing and parameter handling
- Session management for first-time vs returning users
- Mobile vs desktop experience optimization

## MVP Priority
🔴 Critical - This is a foundational epic for user acquisition

## Story Naming Convention
Files should be named: `01-[story-number]-[description].md`

Example: `01-001-qr-code-scanning.md`
