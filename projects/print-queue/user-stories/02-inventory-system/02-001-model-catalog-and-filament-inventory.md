# Model Catalog & Filament Inventory System

## Status
- [ ] Not Started
- [x] In Progress
- [ ] Completed

## User Story
As a Tiny Prints operator,
I want a model catalog and filament inventory integrated with the order system,
So that I can track what I can print, what materials I have, and ensure orders reflect real capabilities.

## Acceptance Criteria
- [x] A model catalog lists printable items (name, description, model URL, image URL)
- [x] Models can be added, edited, and deleted from the inventory page
- [x] A filament inventory lists filaments in stock (brand, material, color, color_hex, in_stock)
- [x] Filaments can be added, edited, and deleted from the inventory page
- [x] Only in-stock filaments appear as normal color options when creating an order
- [x] Order creation uses a model selector (from catalog) instead of a free-text item field
- [x] Order creation uses a filament selector (from in-stock inventory) instead of a free-text color field
- [x] A "Custom / Special Color" option is available when placing an order
- [x] Selecting a custom color flags the order as `needs_filament: true` and adds a $5 surcharge
- [x] The surcharge is clearly indicated in the order form and on the order detail
- [x] Model print history (print count + colors used) is derived from completed orders
- [x] Inventory page is accessible from the dashboard header

## Technical Notes
- Project: `projects/print-queue`
- New types: `PrintModel`, `Filament` in `src/types/Inventory.ts`
- Updated type: `WorkOrder` gains `model_id: string | null` and `needs_filament: boolean`
- New storage: `src/lib/inventory.ts` — CRUD for models & filaments (Supabase + localStorage fallback)
- New page: `src/pages/InventoryPage.tsx`
- New components: `ModelForm`, `FilamentForm`
- Updated: `WorkOrderForm` uses model + filament selectors
- Updated: `DashboardPage` loads inventory data and passes it to form; adds "Inventory" header button
- Updated: `App.tsx` adds `#/inventory` route
- New SQL: `models` and `filaments` tables; `ALTER TABLE work_orders` adds new columns

## Dependencies
- Supabase project with `models` and `filaments` tables (SQL in README)
- Existing `work_orders` table (ALTER migration adds `model_id` and `needs_filament`)

## Priority
- [ ] Critical (MVP)
- [x] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [ ] Small (1-2 days)
- [ ] Medium (3-5 days)
- [x] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)
