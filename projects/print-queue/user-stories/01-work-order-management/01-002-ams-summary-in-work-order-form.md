# AMS Filament Summary in Work Order Form

## Status
- [ ] Not Started
- [ ] In Progress
- [x] Completed

## User Story
As a 3D print shop operator,
I want to see a compact summary of which filaments are currently loaded in my AMS when creating (or editing) a work order,
So that I can quickly confirm the right colors are available without navigating away to the Filaments page.

## Acceptance Criteria
- [x] The Work Order form shows a read-only "Current AMS" strip when at least one AMS slot is loaded
- [x] The strip displays all four slots (1–4) in a compact grid
- [x] Each loaded slot shows a color swatch (circle) and the filament color name
- [x] Empty slots display "—"
- [x] The strip is hidden when no filaments have been assigned to any AMS slot

## Technical Notes
- Implemented in `WorkOrderForm.tsx` using the `filaments` prop already passed to the component
- Reads `filament.ams_slot` (1–4 | null) to determine loaded state
- Read-only display only — no assignment interaction inside the form
- Uses `color_hex` for the swatch color, with a neutral fallback for missing hex values

## Dependencies
- `Filament.ams_slot` field (added in Supabase inventory schema)
- `WorkOrderForm` already receives `filaments[]` prop

## Priority
- [ ] Critical (MVP)
- [x] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [x] Small (1-2 days)
- [ ] Medium (3-5 days)
- [ ] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)
