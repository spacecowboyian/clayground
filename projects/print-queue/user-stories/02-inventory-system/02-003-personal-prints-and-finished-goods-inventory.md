# Personal Prints and Finished Goods Inventory (Add-On Module)

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a print farm operator,
I want personal-print tracking and finished-goods inventory as an optional add-on module,
So that core order and queue functionality remains unchanged while I can track non-customer prints and resale stock when enabled.

## Acceptance Criteria
- [ ] Work orders support a purpose field with at least: customer_order, personal_use, stock_build.
- [ ] Personal-use orders track filament usage and production cost exactly like all other orders.
- [ ] Personal-use orders are excluded from business due, unpaid, revenue, and profit/loss metrics.
- [ ] Stock-build orders are excluded from revenue and profit until sold.
- [ ] Completing a stock-build item increases finished-goods quantity on hand.
- [ ] Recording a sale decrements on-hand quantity and records sale channel (garage_sale at minimum).
- [ ] Recorded sales contribute to business revenue and profit/loss metrics.
- [ ] Sales support partial quantities and preserve transaction history (date, quantity, price, channel).
- [ ] The feature is fully gated behind an add-on capability flag.
- [ ] When the add-on is OFF, core site behavior (orders, queue, models, filaments, settings) works exactly as today.
- [ ] When the add-on is OFF, add-on routes and controls are hidden or disabled.
- [ ] Existing/legacy work orders without purpose default safely to customer_order.
- [ ] Existing filament and cost calculations remain technically unchanged.

## MVP Scope
- [ ] Add purpose selector to work orders (customer_order, personal_use, stock_build).
- [ ] Exclude personal_use and stock_build from default business KPI cards.
- [ ] Add lightweight on-hand stock count for stock_build outputs.
- [ ] Add simple Record Sale flow with amount, quantity, and channel.
- [ ] Guard all new UI and logic with one feature flag.

## Out of Scope (Future)
- [ ] Advanced cost-basis methods (FIFO/LIFO/weighted-average).
- [ ] Channel analytics and trend dashboards.
- [ ] Plan management UX and billing integration.
- [ ] Complex inventory adjustments and audit workflows.

## Technical Notes
- Project: projects/print-queue
- Extend work order data with purpose and optional intended sales channel.
- Add finished-goods inventory entities for model variant identity and quantity_on_hand.
- Add transaction logging for build events, sale events, and manual adjustments.
- Keep filament usage calculations global and unchanged for material tracking.
- Branch financial reporting by feature-enabled state.
- Keep schema changes additive and backward compatible.

## Dependencies
- Existing order lifecycle and costing logic.
- New migration(s) for work order purpose and finished-goods tables.
- Feature entitlement source from configuration or account plan metadata.

## Priority
- [x] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [ ] Small (1-2 days)
- [ ] Medium (3-5 days)
- [x] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)

## Additions
### 2026-03-15 — Requested by: @copilot
- Added optional personal-use print tracking that still counts filament and cost while excluding these prints from business P/L.
- Added optional stock-build workflow for on-hand finished-goods inventory.
- Added optional sales recording with channel attribution (starting with garage sales).
- Confirmed this is additive-only and must not be integral to baseline site functionality.
