-- ─────────────────────────────────────────────────────────────────────────────
-- Print Queue — Migration 003: Add number / order_number fields
--
-- Adds an optional catalog number to the models table so operators can assign
-- SKU / reference codes (e.g. "MOD-001") to their printable models.
--
-- Adds a sequential, human-readable order_number to the work_orders table so
-- that each order gets a short identifier (1, 2, 3 …) that is easier to
-- reference than the full UUID.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── models.number ─────────────────────────────────────────────────────────────
-- Optional catalog / SKU code for a model (e.g. "MOD-001", "T-42").
ALTER TABLE models
  ADD COLUMN IF NOT EXISTS number TEXT NOT NULL DEFAULT '';

-- ── work_orders.order_number ──────────────────────────────────────────────────
-- Sequential human-readable identifier assigned automatically on insert.

CREATE SEQUENCE IF NOT EXISTS work_orders_order_number_seq;

ALTER TABLE work_orders
  ADD COLUMN IF NOT EXISTS order_number INTEGER;

-- Assign sequential numbers to all pre-existing orders, ordered by creation date
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) AS rn
  FROM work_orders
)
UPDATE work_orders
  SET order_number = numbered.rn
FROM numbered
WHERE work_orders.id = numbered.id;

-- Advance the sequence past the highest value already assigned so the next
-- insert picks up cleanly where the backfill left off.
SELECT setval(
  'work_orders_order_number_seq',
  COALESCE((SELECT MAX(order_number) FROM work_orders), 0) + 1,
  false
);

-- Wire the sequence as the column default for future inserts
ALTER TABLE work_orders
  ALTER COLUMN order_number SET DEFAULT nextval('work_orders_order_number_seq');

-- Once all existing rows have been backfilled, disallow NULL
ALTER TABLE work_orders
  ALTER COLUMN order_number SET NOT NULL;

-- Ensure every order has a unique number
CREATE UNIQUE INDEX IF NOT EXISTS work_orders_order_number_idx
  ON work_orders (order_number);
