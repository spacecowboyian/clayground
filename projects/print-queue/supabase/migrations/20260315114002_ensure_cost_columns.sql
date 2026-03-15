-- ─────────────────────────────────────────────────────────────────────────────
-- Print Queue — Migration 010: Ensure cost / price columns exist
--
-- Some databases were set up before the cost and price columns were added to
-- the initial schema, causing "Could not find the 'cost' column of 'work_orders'
-- in the schema cache" when saving orders.  This migration is idempotent: it
-- adds any of these commonly-missing columns only if they are absent.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE work_orders
  ADD COLUMN IF NOT EXISTS price          NUMERIC  NOT NULL DEFAULT 5.00,
  ADD COLUMN IF NOT EXISTS cost           NUMERIC  NOT NULL DEFAULT 2.00,
  ADD COLUMN IF NOT EXISTS sort_order     INTEGER  NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS model_id       UUID,
  ADD COLUMN IF NOT EXISTS needs_filament BOOLEAN  NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS order_items    JSONB    NULL,
  ADD COLUMN IF NOT EXISTS order_number   INTEGER,
  ADD COLUMN IF NOT EXISTS payment_status TEXT     NOT NULL DEFAULT 'unpaid';

-- Ensure payment_status check constraint exists (safe to re-run)
ALTER TABLE work_orders
  DROP CONSTRAINT IF EXISTS work_orders_payment_status_check;
ALTER TABLE work_orders
  ADD CONSTRAINT work_orders_payment_status_check
    CHECK (payment_status IN ('unpaid', 'verifying_payment', 'paid'));
