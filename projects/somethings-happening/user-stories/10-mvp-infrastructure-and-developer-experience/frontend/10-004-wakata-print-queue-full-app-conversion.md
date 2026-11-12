# Wakata Print Queue Full App Conversion

## Status
- [ ] Not Started
- [x] In Progress
- [ ] Completed

## User Story
As a print-queue operator,
I want the app's design-system controls to use Wakata,
So that we can test the library throughout a complete app while retaining its workflow and visual identity.

## Acceptance Criteria
- [x] Map the original Gearhead component inventory to Wakata elements or explicit app-local compositions.
- [x] Replace Gearhead interactive component imports across Orders, Queue, Models, Filaments, Settings, and their forms/dialogs.
- [x] Verify representative data and action behavior, including loading, errors, a disabled state, keyboard use, and the status update rollback.
- [x] Verify desktop and phone layouts with screenshots and the password-free fake-data demo; contact no live backend in the demo.
- [x] Review the remaining native controls and app-specific compositions; do not claim they are shared Wakata components.
- [x] Finish diff review, package/build checks, and local visual approval before any commit or push.
- [x] Obtain explicit repository approval to commit and push the full conversion to draft PR #93.
- [ ] Update the draft PR and review its checks and comments.

## Technical Notes
Parent Wakata issue: [#74](https://github.com/spacecowboyian/wakata/issues/74). The first Select migration is covered by story 10-003. This conversion is on an isolated local branch; shared Gearhead and Wakata packages remain unchanged. The app copies its existing theme CSS locally to preserve its visual identity and removes the Gearhead package dependency. The two native `<select>` elements are Wakata's required light-DOM input slots. The filament form uses the built Wakata `wk-color-picker` (#79) through a thin local React bridge.

Wakata elements used by this app at its pinned package version: Button, TextField, TextArea, Select, Dialog, Switch, Card, Link, ColorPicker, NumberField, Accordion, Progress, Badge, and Status. Project-local compositions: SearchField (`wk-text-field` with native search input), NumberField (`wk-number-field` bridge with app-local `wk-button` steppers), accordion (thin React bridge over `wk-accordion`/`wk-accordion-item`), order-status timeline (`wk-progress` with app-specific labels), and bottom-aligned Card actions (local `WkCard` subclass). The load-error overlay uses `wk-dialog` alert mode. These are provisional consumer code, not shared component promotion. The demo uses in-memory fake data, has no password, and hides account connection controls.

Ian approved the following issue scopes. The component PRs have merged and the app uses a local tarball built from Wakata main. This is a provisional consumer test, not production adoption:

- [#75 SearchField](https://github.com/spacecowboyian/wakata/issues/75)
- [#76 NumberField](https://github.com/spacecowboyian/wakata/issues/76)
- [#77 Accordion](https://github.com/spacecowboyian/wakata/issues/77)
- [#78 Timeline](https://github.com/spacecowboyian/wakata/issues/78)
- [#79 ColorPicker](https://github.com/spacecowboyian/wakata/issues/79)
- [#80 Data table](https://github.com/spacecowboyian/wakata/issues/80)
- [#81 Card action layout](https://github.com/spacecowboyian/wakata/issues/81)
- [#82 Link adoption](https://github.com/spacecowboyian/wakata/issues/82)
- [#83 Status badges and alerts](https://github.com/spacecowboyian/wakata/issues/83)
- [#84 Remaining card surfaces](https://github.com/spacecowboyian/wakata/issues/84)
- [#85 Alert-dialog treatment](https://github.com/spacecowboyian/wakata/issues/85)

As of 2026-11-12, the Wakata component PRs are merged. #80 specifies a native-table pattern rather than a DataTable component. The app locally adopts the merged NumberField, Accordion, Progress, ColorPicker, Badge, Status, and Dialog alert mode. NumberField currency is a display-only preview and values stay native numeric strings. Shared production promotion requires a separate decision.

The consumer CSS reset removed default light-DOM input padding and Wakata Progress step padding. The app has local corrections; [#96](https://github.com/spacecowboyian/wakata/issues/96) tracks whether Wakata needs a more resilient public styling contract. Its shared scope is awaiting Ian's approval.

## Dependencies
- Story 10-003: Wakata Print Queue First App Test
- Wakata issue #74

## Priority
- [ ] Critical (MVP)
- [x] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [ ] Small (1-2 days)
- [ ] Medium (3-5 days)
- [ ] Large (1-2 weeks)
- [x] X-Large (2+ weeks)

## Testing Notes
Local fake-data browser checks have exercised the Orders creation flow, search/filtering, status controls, settings navigation, and forms on desktop. Five top-level pages render at 375px without document overflow; earlier desktop and phone screenshots are in `.playwright-mcp/`. The demo swaps its data modules for in-memory implementations. Chromium at 1280px and 375px changed a visible queue status from Queue to Printing, and Enter opened the Add Order dialog while Escape closed it and returned focus to its Wakata button. A synthetic, fully intercepted backend fixture against the converted app passed three sequential status PATCHes, failed-PATCH rollback, and pending-update deduplication at both viewport sizes before the latest component adoptions. A separate intercepted 500 response showed the Orders loading text followed by its alert dialog and Retry action without page errors. With the merged package, the ColorPicker value and native swatch, NumberField layout, Accordion mouse/keyboard toggle, and Progress labels were checked in the local demo. A temporary alert-dialog fixture verified the alert role, description, Retry, Dismiss, focus return, and desktop/phone layout. A fresh in-memory pass created an order through Wakata form fields, displayed its Progress timeline, updated its payment state, changed a queue item from Queue to Printing, then reset the demo; no browser errors were logged. The NumberField decrement was disabled at its minimum. A fresh temporary fixture against the merged package rejected a status change and confirmed rollback, a pending second change caused no duplicate request, and a later successful change updated the controlled value; the fixture was removed afterward. The disabled-state check is representative rather than exhaustive. Ian approved the local visual result and then explicitly approved committing and pushing the full conversion to draft PR #93 on 2026-11-12; merge and production adoption remain separate decisions. Browser logs during earlier editing included a Wakata/Lion scoped-elements warning and transient hot-reload errors. No manual screen-reader, physical-device, live-backend, or production evidence is claimed.

## Additions
### 2026-11-09 — Requested by: @ian
- Expand the first single-Select test to the full app. Keep app-local treatments provisional and open separate approval-gated Wakata issues for the components the app cannot yet use directly.

### 2026-11-10 — Requested by: @ian
- Adopt Wakata Link for eligible external model, purchase, and payment links, preserving the existing appearance and adding names to icon-only links. Keep the treatment local to this app.
- Adopt the project-local Wakata Card for eligible semantic content surfaces; table, list, and section wrappers and status messages stay native.
- Keep the mobile header within the viewport and make the fake-data demo hide its account Lock control after the Wakata button migration.
- Align number-field steppers within the input outline, restore text-input padding, equalize the order toolbar control heights, and use the Card actions area to align AMS slot selectors, including an empty slot in the demo.
- Restore the Orders toolbar's compact 34px control row through Wakata's named small size and a local theme override, while retaining the previous app styling.

### 2026-11-12 — Requested by: @ian
- Adopt merged `wk-number-field` (#76) in the NumberField bridge, keeping public props, clamping and app-local steppers.
- Adopt merged `wk-badge` for compact status labels and `wk-status` for a suitable inline error (#83), retaining app-specific colors through local CSS.
- Use merged `wk-dialog` alert mode for the load-error overlay (#85), with an in-content description and the existing Retry/Dismiss actions.
- Accept the local fake-data app's visual result after the Wakata conversion; repository approval for committing and pushing remains separate.
