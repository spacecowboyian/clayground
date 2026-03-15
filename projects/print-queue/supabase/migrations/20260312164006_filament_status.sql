-- ── migration 007: filament status ─────────────────────────────────────────
-- Replaces the boolean in_stock column with a status text enum that supports
-- three states: 'in_stock', 'out_of_stock', and 'on_order'.
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Add the new status column, defaulting to 'in_stock'
ALTER TABLE filaments
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'in_stock';

-- 2. Back-fill: rows that had in_stock = false become 'out_of_stock'
UPDATE filaments
  SET status = CASE WHEN in_stock THEN 'in_stock' ELSE 'out_of_stock' END
  WHERE status = 'in_stock';

-- 3. Add a check constraint to enforce allowed values
ALTER TABLE filaments
  DROP CONSTRAINT IF EXISTS filaments_status_check;
ALTER TABLE filaments
  ADD CONSTRAINT filaments_status_check
    CHECK (status IN ('in_stock', 'out_of_stock', 'on_order'));

-- 4. Drop the old boolean column and its index
DROP INDEX IF EXISTS filaments_in_stock_idx;
ALTER TABLE filaments DROP COLUMN IF EXISTS in_stock;

-- 5. Add an index on the new status column
CREATE INDEX IF NOT EXISTS filaments_status_idx ON filaments (status);
