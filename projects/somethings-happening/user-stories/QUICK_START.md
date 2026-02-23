# Quick Start Guide for User Stories

## Overview
This guide helps you quickly understand and use the user stories structure for "Something's Happening".

## Structure at a Glance

```
user-stories/
├── README.md                  # Main documentation (you should read this!)
├── STORY_TEMPLATE.md          # Template for creating new stories
│
├── 01-user-entry-and-onboarding/
│   ├── README.md
│   └── frontend/              # Frontend stories
├── 02-event-resolution-and-context-detection/
│   ├── README.md
│   └── backend/               # Backend stories
├── 03-event-creation-lightweight/
│   ├── README.md
│   └── frontend/              # Frontend stories
├── 04-public-media-aggregation/
│   ├── README.md
│   └── backend/               # Backend stories
├── 05-timeline-and-event-presentation/
│   ├── README.md
│   └── frontend/              # Frontend stories
├── 06-event-discovery-and-navigation/
│   ├── README.md
│   └── frontend/              # Frontend stories
├── 07-moderation-and-trust-signals/
│   ├── README.md
│   └── frontend/              # Frontend stories
├── 08-privacy-permissions-and-content-lifecycle/
│   ├── README.md
│   └── backend/               # Backend stories
├── 09-system-administration-and-governance/
│   ├── README.md
│   └── backend/               # Backend stories
└── 10-mvp-infrastructure-and-developer-experience/
    ├── README.md
    └── backend/               # Backend stories
```

Each epic directory contains:
- `README.md` - Epic overview, scope, and guidelines
- `frontend/` or `backend/` subdirectories containing individual user stories
- Story files named: `[epic-number]-[story-number]-[description].md`

## How to Work with GitHub Copilot

### Creating a New User Story

1. **Decide which epic** the story belongs to
2. **Navigate** to that epic's directory
3. **Determine if it's frontend or backend** focused
4. **Navigate** to the appropriate subdirectory (`frontend/` or `backend/`)
5. **Copy** the `STORY_TEMPLATE.md` to that subdirectory
6. **Rename** following the pattern: `[epic-number]-[story-number]-[description].md`
   - Example: `frontend/01-002-shared-link-handling.md`
7. **Fill in** all sections of the template
8. **Commit** the file to the repository

### Working on a Story with Copilot

**Example prompt:**
```
I want to work on user story user-stories/03-event-creation-lightweight/frontend/03-001-quick-event-creation.md

Please read the story and:
1. Review the acceptance criteria
2. Propose an implementation approach
3. Create the necessary components
4. Update the story file with implementation details
```

### Batch Story Creation

To create multiple related stories at once:

```
I want to create 3 frontend user stories for Epic 1 (User Entry & Onboarding):
1. Shared link handling
2. URL parameter parsing
3. First-time user welcome screen

Please create these stories in user-stories/01-user-entry-and-onboarding/frontend/ 
following the naming convention and template format.
```

## MVP Priority Stories

Focus on these epics first for MVP:
- ✅ **Epic 1**: User Entry & Onboarding (frontend)
- ✅ **Epic 3**: Event Creation (Lightweight) (frontend)
- ✅ **Epic 4**: Public Media Aggregation (backend)
- ✅ **Epic 5**: Timeline & Event Presentation (frontend)
- ✅ **Epic 10**: MVP Infrastructure & Developer Experience (backend)

## Story Naming Convention

Format: `[epic-number]-[story-number]-[short-description].md` placed in `frontend/` or `backend/` subdirectory

Examples:
- `frontend/01-001-qr-code-event-access.md`
- `frontend/03-001-quick-event-creation.md`
- `frontend/05-001-chronological-timeline-view.md`
- `backend/04-002-event-data-model-and-api.md`
- `backend/10-001-ci-cd-pipeline-setup.md`

**Tips:**
- Determine if the story is frontend or backend focused first
- Use lowercase with hyphens for descriptions
- Keep descriptions short but descriptive
- Number sequentially within each epic (001, 002, 003...)

## Example Stories

We've created example stories in multiple epics to show the format:
1. `user-stories/01-user-entry-and-onboarding/frontend/01-001-qr-code-event-access.md`
2. `user-stories/03-event-creation-lightweight/frontend/03-001-quick-event-creation.md`
3. `user-stories/05-timeline-and-event-presentation/frontend/05-001-playable-ai-driven-event-timeline.md`
4. `user-stories/10-mvp-infrastructure-and-developer-experience/backend/10-001-ci-cd-pipeline-setup.md`

Read these to understand the expected format and level of detail.

## Status Tracking

Each story has checkboxes for:
- **Status**: Not Started → In Progress → Completed
- **Acceptance Criteria**: Individual items to check off
- **Priority**: Critical, High, Medium, Low
- **Complexity**: Small, Medium, Large, X-Large

Update these as you work on stories.

## Tips for Success

1. **Keep stories atomic** - One feature or capability per story
2. **Link dependencies** - Reference related stories
3. **Update regularly** - Check off criteria as you complete them
4. **Be specific** - Clear acceptance criteria lead to better implementations
5. **Use examples** - Include examples in stories when helpful

## Common Copilot Prompts

**Review a story:**
```
Review the user story at user-stories/[epic]/[story].md and 
suggest any improvements or missing acceptance criteria.
```

**Implement a story:**
```
Implement the user story at user-stories/[epic]/[story].md.
Update the story file with implementation details when done.
```

**Check story status:**
```
Show me all completed stories in epic [number]
```

**Find related stories:**
```
Find all stories related to [topic/feature]
```

## Need Help?

- Read `user-stories/README.md` for full documentation
- Check epic-specific README files for context
- Review example stories for format guidance
- Use the STORY_TEMPLATE.md as a starting point
