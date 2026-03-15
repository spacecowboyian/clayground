-- ── migration 008: payment_status ─────────────────────────────────────────
-- Adds a dedicated payment_status text enum to work_orders, replacing the
-- simple boolean `paid` field for display purposes while keeping `paid` for
-- backwards compatibility.  Three states are supported:
--   'unpaid'             – customer has not sent payment
--   'verifying_payment'  – customer clicked "I've Sent Payment"; awaiting
--                          operator confirmation via Venmo
--   'paid'               – operator has confirmed payment
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Add the new column, defaulting to 'unpaid'
ALTER TABLE work_orders
  ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'unpaid';

-- 2. Back-fill from the existing `paid` boolean
UPDATE work_orders
  SET payment_status = CASE WHEN paid THEN 'paid' ELSE 'unpaid' END
  WHERE payment_status = 'unpaid';

-- 3. Enforce allowed values
ALTER TABLE work_orders
  DROP CONSTRAINT IF EXISTS work_orders_payment_status_check;
ALTER TABLE work_orders
  ADD CONSTRAINT work_orders_payment_status_check
    CHECK (payment_status IN ('unpaid', 'verifying_payment', 'paid'));

-- 4. Index for dashboard filtering
CREATE INDEX IF NOT EXISTS work_orders_payment_status_idx ON work_orders (payment_status);
