# Model Catalog & Filament Inventory System

## Status
- [ ] Not Started
- [ ] In Progress
- [x] Completed

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
- [x] Each model can optionally have an image URL associated with it
- [x] A model can be flagged as `self_created`, which changes the URL label to "Source URL (optional)"
- [x] Each model supports 1–4 `filament_requirements` entries, each with a `filament_id` and `quantity_g`
- [x] The `filament_requirements` array replaces the single `filament_usage_g` field
- [x] Existing localStorage data is automatically migrated to the new shape on first load
- [x] Model cards in the inventory display the total filament usage and per-requirement breakdown
- [x] Model cards show a "Self-created" badge when the flag is set
- [x] Order costing sums material cost across all assigned filament requirements
- [x] Filament tracks `current_quantity_g` — grams of filament currently on hand
- [x] Filament tracks `purchase_url` — optional link to buy more filament
- [x] Filament table shows On Hand / Reserved / Consumed / Remaining columns
- [x] Reserved = grams committed by active (Queue / Printing) orders
- [x] Consumed = grams used by completed orders
- [x] Remaining = on-hand minus reserved (can be negative = overcommitted)
- [x] Low stock (< 100 g remaining) shown with ↓ indicator and orange text
- [x] Overcommitted (negative remaining) shown with ⚠ indicator and red text
- [x] Purchase link button (shopping cart icon) appears in table when a URL is set
- [x] When creating an order, a warning appears if filament may not be sufficient
- [x] Order can still be created despite the filament warning

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
- `computeFilamentStats(filaments, orders, models)` pure utility exported from `inventory.ts`
- `FilamentStats` interface added to `src/types/Inventory.ts`

## Additions
### 2026-03-11 — Requested by: @copilot
- Extended model data model to support optional image references, a self-created flag, and multiple per-filament requirements (up to 4) per model, replacing the single `filament_usage_g` field with a `filament_requirements` array.
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

## Additions

### 2026-03-11 — Requested by: @copilot
- Added `current_quantity_g` field to track actual grams on hand per filament
- Added `purchase_url` field with a shopping-cart link button in the filament table
- Added `computeFilamentStats` utility that calculates consumed_g, reserved_g, and remaining_g per filament from order history
- Updated filament inventory table to show On Hand / Reserved / Consumed / Remaining columns with low-stock and overcommitted visual indicators
- Added filament availability warning in the order creation form when filament may be insufficient for the selected model + color combination

### 2026-03-12 — Requested by: @copilot
- Replaced `in_stock: boolean` on `Filament` with `status: FilamentStatus` ('in_stock' | 'out_of_stock' | 'on_order')
- Added DB migration `007_filament_status.sql` to backfill new status column and drop the old boolean
- FilamentForm now uses a three-option Select instead of a Switch for filament status
- Filaments page now shows an "On Order" accordion section in addition to "Out of Stock"
- The status dot in the filament table cycles through all three states on click (green → orange → red)
- Items with filaments marked 'on_order' display bold text with "– filament on order" in red on the order detail page

### 2026-03-13 — Requested by: @copilot
- Fixed: saving a new model with an empty catalog number no longer fails with "invalid input syntax for type integer: """. Migration 009 changes `models.number` from INTEGER to TEXT (the intended type from migration 003, which was a no-op for databases where the column already existed as INTEGER). `createModel` and `updateModel` also omit an empty number field from the Supabase payload as a belt-and-suspenders guard.
