-- ─────────────────────────────────────────────────────────────────────────────
-- Tiny Prints — Migration 002: Add order_items column
--
-- Adds a JSONB column to work_orders that stores an array of OrderItem objects,
-- enabling multiple items (model + color + quantity) per work order.
--
-- Each element matches the OrderItem interface in src/types/WorkOrder.ts:
--   { model_id, item, color, model_url, needs_filament, quantity, price, cost }
--
-- Legacy orders that were created before this migration will have NULL here and
-- the application falls back to the existing flat item / color / model_id fields.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE work_orders
  ADD COLUMN IF NOT EXISTS order_items JSONB NULL;

COMMENT ON COLUMN work_orders.order_items IS
  'Array of OrderItem objects for multi-item orders. NULL for legacy single-item orders.';
