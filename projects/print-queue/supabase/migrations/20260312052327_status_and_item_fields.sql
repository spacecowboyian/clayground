-- ─────────────────────────────────────────────────────────────────────────────
-- Print Queue — Migration 004: Update order status values + document order_items fields
--
-- 1. Changes work_orders.status from Title-Case (Queue/Printing/Complete/Cancelled)
--    to snake_case (waiting/in_progress/complete/cancelled) to better reflect that
--    the status describes the whole order, not a single print item.
--
-- 2. Documents that order_items JSONB objects now include:
--      filament_id: string | null  — FK to filaments.id (captured at save time)
--      status: 'queue' | 'printing' | 'complete'  — per-item print status
--    (JSONB columns are schema-less; existing rows without these keys are handled
--     gracefully by the application with null / 'queue' defaults.)
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Drop the old check constraint ─────────────────────────────────────────
ALTER TABLE work_orders
  DROP CONSTRAINT IF EXISTS work_orders_status_check;

-- ── 2. Migrate existing status values ────────────────────────────────────────
UPDATE work_orders SET status = 'waiting'     WHERE status = 'Queue';
UPDATE work_orders SET status = 'in_progress' WHERE status = 'Printing';
UPDATE work_orders SET status = 'complete'    WHERE status = 'Complete';
UPDATE work_orders SET status = 'cancelled'   WHERE status = 'Cancelled';

-- ── 3. Apply new check constraint ────────────────────────────────────────────
ALTER TABLE work_orders
  ADD CONSTRAINT work_orders_status_check
  CHECK (status IN ('waiting', 'in_progress', 'complete', 'cancelled'));

-- ── 4. Update column default ──────────────────────────────────────────────────
ALTER TABLE work_orders
  ALTER COLUMN status SET DEFAULT 'waiting';

-- ── 5. Document the expanded order_items shape ────────────────────────────────
COMMENT ON COLUMN work_orders.order_items IS
  'Array of OrderItem objects for multi-item orders. NULL for legacy single-item orders.
   Each element: { model_id, item, color, filament_id, model_url, needs_filament,
                   quantity, price, cost, status }
   where filament_id is the FK to filaments.id captured at save time (may be null for
   custom/special colors or pre-migration items), and status is one of
   ''queue'' | ''printing'' | ''complete'' (defaults to ''queue'' for new items).';
