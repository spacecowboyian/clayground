# User Stories

This directory contains all user stories organized by epic. Each epic has its own subdirectory, and each user story is stored as an individual markdown file.

## Structure

```
user-stories/
├── 01-user-entry-and-onboarding/
│   ├── README.md
│   └── frontend/
│       └── [story-files].md
├── 02-event-resolution-and-context-detection/
│   ├── README.md
│   └── backend/
│       └── [story-files].md
├── 03-event-creation-lightweight/
│   ├── README.md
│   └── frontend/
│       └── [story-files].md
├── 04-public-media-aggregation/
│   ├── README.md
│   └── backend/
│       └── [story-files].md
├── 05-timeline-and-event-presentation/
│   ├── README.md
│   └── frontend/
│       └── [story-files].md
├── 06-event-discovery-and-navigation/
│   ├── README.md
│   └── frontend/
│       └── [story-files].md
├── 07-moderation-and-trust-signals/
│   ├── README.md
│   └── frontend/
│       └── [story-files].md
├── 08-privacy-permissions-and-content-lifecycle/
│   ├── README.md
│   └── backend/
│       └── [story-files].md
├── 09-system-administration-and-governance/
│   ├── README.md
│   └── backend/
│       └── [story-files].md
├── 10-mvp-infrastructure-and-developer-experience/
│   ├── README.md
│   └── backend/
│       └── [story-files].md
└── 11-user-feed-and-personalization/
    ├── README.md
    ├── frontend/
    │   └── [story-files].md
    └── backend/
        └── [story-files].md
```

**Note**: Stories are organized into `frontend/` and `backend/` subdirectories within each epic folder. Epic-level documentation (README.md, summaries) remains at the epic root level.

## Epics Overview

### 1. User Entry & Onboarding
How users arrive at the platform (QR codes, shared links, URLs, search) and are oriented to what's happening.

### 2. Event Resolution & Context Detection
Determining whether an event already exists, resolving duplicates, and establishing place/time context using AI and device signals.

### 3. Event Creation (Lightweight)
Minimal flow for naming, confirming, or initiating an event when none exists—fast, low-friction, optional inputs.

### 4. Public Media Aggregation
Collecting public, time- and location-based media from external platforms and associating it with an event.

### 5. Timeline & Event Presentation
Displaying aggregated media in a chronological, evidence-first timeline (live vs archived behavior).

### 6. Event Discovery & Navigation
Browsing, searching, and navigating between active events, past events, and related macro/micro events.

### 7. Moderation & Trust Signals
Community reporting, AI-assisted filtering, spam/malicious detection, and content state handling.

### 8. Privacy, Permissions & Content Lifecycle
Respecting public vs opt-in content, handling removals, source validity checks, and visibility rules.

### 9. System Administration & Governance (Internal)
Internal tooling for event health, aggregation monitoring, abuse handling, and system integrity.

### 10. MVP Infrastructure & Developer Experience
Foundations for AI-driven development, preview environments per PR, automated checks, and agent-first workflows.

### 11. User Feed & Personalization
Personalized user feeds, event subscriptions, and content organization through channels. Enables users to curate their experience by subscribing to macro events and organizing content in custom channels with unified timeline display.

## User Story Format

Each user story should follow this format and be saved as a separate `.md` file within the appropriate epic directory:

```markdown
# [Story Title]

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a [type of user],
I want [goal],
So that [benefit/reason].

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Notes
[Any technical considerations, dependencies, or implementation notes]

## Dependencies
- [Link to related stories or epics]

## Priority
- [ ] Critical (MVP)
- [ ] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [ ] Small (1-2 days)
- [ ] Medium (3-5 days)
- [ ] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)
```

## Naming Convention

User stories should be named using the following pattern:
```
[epic-number]-[story-number]-[short-description].md
```

Example:
```
01-001-qr-code-scanning.md
01-002-shared-link-handling.md
```

## Working with Copilot

To work on a specific user story with GitHub Copilot:

1. Navigate to the specific epic directory
2. Open the user story file you want to work on
3. Reference the file in your Copilot conversation
4. Update the status checkboxes as you progress
5. Mark acceptance criteria as you complete them

## Adding New Stories

1. Determine which epic the story belongs to
2. Navigate to that epic's directory
3. Determine if the story is primarily frontend or backend focused
4. Create a new `.md` file in the appropriate subdirectory (`frontend/` or `backend/`)
5. Follow the naming convention: `[epic-number]-[story-number]-[short-description].md`
6. Use the template format provided above
7. Fill in all relevant sections
8. Link any dependencies to other stories

## Epic Prioritization

For MVP focus, prioritize stories in these epics first:
- Epic 1: User Entry & Onboarding
- Epic 3: Event Creation (Lightweight)
- Epic 5: Timeline & Event Presentation
- Epic 10: MVP Infrastructure & Developer Experience

## Notes

- Each epic directory contains a README with more specific context
- Keep user stories focused and atomic (one feature/capability per story)
- Update status regularly as work progresses
- Cross-reference related stories using relative links
