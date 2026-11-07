# Wakata Print Queue First App Test

## Status
- [ ] Not Started
- [x] In Progress
- [ ] Completed

## User Story
As a print-queue operator,
I want the existing item-status action to use a Wakata Select that fits the Gearhead page,
So that the same workflow can be evaluated across React and plain HTML without changing the rest of the app.

## Acceptance Criteria
- [x] Only the item-status select is replaced in the isolated React app; order state and update behavior remain intact.
- [x] A project-local Wakata-derived style matches the frozen Gearhead select dimensions and appearance while Wakata's shared defaults remain unchanged.
- [x] React and plain HTML use the same pinned built Wakata package and complete the same synthetic state transitions.
- [x] Desktop and phone visual, keyboard, accessible-name, focus, contrast and update-count evidence is recorded with limitations.

## Technical Notes
Use the existing `@wakata/ds` Select and Lion behavior. The current Gearhead select measures 101 × 29 CSS pixels at 1280px and 375px reference widths. WCAG 2.2 AA target-size minimum is 24 × 24 CSS pixels; no accessibility pass is inferred from size alone. The compact styling is a provisional print-queue-only fork, not a shared design-system change.

## Dependencies
- Wakata issue #22 and the synthetic baseline in `docs/ds/issue-22-baseline-draft.md`.

## Priority
- [ ] Critical (MVP)
- [x] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [ ] Small (1-2 days)
- [x] Medium (3-5 days)
- [ ] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)

## Implementation Details
The app installs a pinned local tarball of `@wakata/ds` 0.0.0 built from Wakata revision `daf50f4cda42823f51a3d6cf93ca50b41419e198` (SHA-256 `39f3b59aa3e55fbca0d93d82a11ad89f8dd746e4180e5187481f6260da66c412`). `PqItemStatusSelect` extends Wakata's `WkSelect` only in the print-queue app. The React wrapper and plain-HTML page use that same subclass and native select slot. React retains the existing order update logic.

## Testing Notes
The intercepted two-item fixture passes queue/queue → printing/queue → complete/queue → complete/complete at 1280 × 800 and 375 × 812: three React PATCHes and three plain-HTML `wk-change` events, with no page errors. The React control's outer box measures 101 × 29px at both widths; the plain-HTML control matches. A rejected React PATCH restores the committed value; a second change while the first is pending sends only one PATCH. Browser-verified accessible names, focus and plain-HTML keyboard type-ahead. Both Vite builds and lint pass. The app still has 76 preexisting TypeScript errors and the preexisting phone header overflow.

## Additions
### 2026-11-06 — Requested by: Ian
- Match the existing Gearhead item-status styling and sizing exactly in the Wakata first app test, while leaving shared Gearhead and Wakata defaults unchanged.
- The local Select keeps the existing compact Gearhead appearance; the failed-update reset and pending-change guard are intentional behavior corrections for the Wakata wrapper.
