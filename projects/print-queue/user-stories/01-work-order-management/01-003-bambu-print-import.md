# Bambu Print Import — Auto-Populate Orders from Bambu Lab

## Status
- [ ] Not Started
- [x] In Progress
- [ ] Completed

## User Story
As a 3D print shop operator using Bambu Lab printers,
I want the app to fetch my recent Bambu print jobs and let me import them as new orders,
So that I can quickly create work orders pre-filled with model name, filament color, weight, and print time without manual data entry.

## Acceptance Criteria
- [x] A "Bambu Integration" section in Farm Settings accepts and saves an access token
- [x] An optional CORS proxy URL field allows browser-based API access when the Bambu API blocks cross-origin requests
- [x] A "Test Connection" button in Farm Settings validates the token and shows success or a clear error
- [x] An "Import from Bambu" button appears on the Orders dashboard when a Bambu token is configured
- [x] Clicking "Import from Bambu" opens a dialog listing the 20 most recent successful print jobs from Bambu
- [x] Each print job in the list shows: title, print date, filament weight (g), print time, and filament color swatch
- [x] Clicking "Import" on a print job opens the WorkOrderForm pre-filled with:
  - Customer: "New Print"
  - Item: model name derived from the print file title (extensions and underscores cleaned up)
  - Color: mapped from the Bambu AMS color hex (slot 0), falling back to filament type
  - Notes: print time and filament weight summary
  - Status: "Waiting"
  - Price/Cost: 0 (operator fills in manually, or auto-calculated if a matching model is found in inventory)
- [x] If CORS fails, a clear error message is shown explaining how to configure a proxy

## Technical Notes
- Project: `projects/print-queue`
- Bambu API endpoint: `https://api.bambulab.com/v1/iot-service/api/user/task?limit=20`
- Authentication: `Authorization: Bearer <token>`
- CORS issue: Bambu API does not include CORS headers; a CORS proxy URL prefix can be configured in settings
- Token is stored in `localStorage` via the existing `FarmSettings` / `settings.ts` system — never in Supabase
- `src/lib/bambu.ts` contains API client + helpers (`cleanPrintTitle`, `bambuHexToCSS`, `formatPrintTime`)
- `BambuImportDialog` fetches tasks on open, shows a spinner, then lists results

## Dependencies
- Bambu Lab account with an access token (obtained via Bambu Handy app developer settings or account portal)
- Optional: CORS proxy (e.g. https://corsproxy.io/?)

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

## Additions
### 2026-03-15 — Requested by: @copilot
- Added compatibility scope to support Bambu cloud task endpoint fallback and clearer messaging when token or endpoint access is unavailable.
