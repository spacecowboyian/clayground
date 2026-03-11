# Data-Driven Order Costing

## Status
- [ ] Not Started
- [ ] In Progress
- [x] Completed

## User Story
As a Tiny Prints operator,
I want the system to calculate a realistic cost per item from filament and labor inputs,
So that I can understand the true cost of each order without relying on a manually entered price.

## Acceptance Criteria
- [x] Each filament record includes `roll_cost` (USD) and `roll_size_g` (grams)
- [x] Each model record includes `filament_usage_g` (grams per print) and `post_processing_mins` (labor minutes)
- [x] A Farm Settings page (`#/settings`) allows configuration of the labor rate (default $30/hour)
- [x] The order form auto-calculates cost = material cost + labor cost when a model and filament are selected
- [x] Material cost = (filament_usage_g ÷ roll_size_g) × roll_cost
- [x] Labor cost = (post_processing_mins ÷ 60) × labor_rate_per_hour
- [x] The calculated cost is shown with a material/labor breakdown beneath the Cost field
- [x] The user can still manually override the cost; a "↺ Reset to calculated" link restores the auto value
- [x] "Other" material type in FilamentForm reveals a free-text field for custom material names
- [x] Model images on the Inventory page link to the external model URL and open in a new tab
- [x] "＋ Add a new model" and "＋ Add a new filament" shortcuts in the order form close the dialog and navigate to Inventory

## Technical Notes
- Project: `projects/print-queue`
- New types: `FarmSettings` in `src/types/FarmSettings.ts`
- New lib: `src/lib/settings.ts` (load/save farm settings via localStorage)
- New lib: `src/lib/costing.ts` — `calculateItemCost(model, filament, laborRate): CostBreakdown`
- Updated type: `Filament` gains `roll_cost: number` and `roll_size_g: number`
- Updated type: `PrintModel` gains `filament_usage_g: number` and `post_processing_mins: number`
- New page: `src/pages/FarmSettingsPage.tsx`
- Updated: `FilamentForm` — "Other" material key triggers free-text; stored value is the typed name
- Updated: `ModelForm` — two new `NumberField` inputs for filament usage and post-processing time
- Updated: `WorkOrderForm` — `onGoToInventory` prop; auto-cost via `useMemo`; override + reset UX
- Updated: `DashboardPage` — `onSettings` prop; Settings header button; wired `onGoToInventory`
- Updated: `App.tsx` — `#/settings` route added
- Updated: `InventoryPage` — model images wrapped in `<a>` when `model_url` is present

## Dependencies
- Existing `models` and `filaments` Supabase tables require `ALTER TABLE` migrations to add new columns
- Farm settings are localStorage-only (no Supabase column needed)

## Additions
### 2026-03-11 — Requested by: @copilot
- Updated `calculateItemCost` to accept `filament_requirements[]` and a full filaments list, summing material cost across all assigned requirements; `filament_usage_g` removed from the model type.
```sql
-- filaments table
ALTER TABLE filaments ADD COLUMN roll_cost numeric NOT NULL DEFAULT 20;
ALTER TABLE filaments ADD COLUMN roll_size_g numeric NOT NULL DEFAULT 1000;

-- models table
ALTER TABLE models ADD COLUMN filament_usage_g numeric NOT NULL DEFAULT 0;
ALTER TABLE models ADD COLUMN post_processing_mins numeric NOT NULL DEFAULT 0;
```

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
