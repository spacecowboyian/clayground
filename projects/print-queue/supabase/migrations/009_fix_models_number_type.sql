-- ─────────────────────────────────────────────────────────────────────────────
-- Print Queue — Migration 009: Fix models.number column type to TEXT
--
-- Migration 003 added models.number with the intention of it being a TEXT
-- column (catalog / SKU reference, e.g. "MOD-001").  However, it used
--   ADD COLUMN IF NOT EXISTS number TEXT NOT NULL DEFAULT ''
-- which is a no-op on databases where a pre-existing INTEGER column named
-- "number" already existed.  On those databases the column remained as
-- INTEGER, causing:
--   invalid input syntax for type integer: ""
-- whenever a new model was saved without filling in the catalog number field.
--
-- This migration unconditionally converts the column to TEXT so that any
-- catalog-number value (empty string, numeric string, or alphanumeric like
-- "MOD-001") is always valid.  Existing integer values are cast to their text
-- representation (e.g. 1 → '1').
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE models
  ALTER COLUMN number TYPE TEXT
  USING COALESCE(number::TEXT, '');

-- Restore correct default and NOT NULL constraint (may already be set, safe to repeat).
ALTER TABLE models
  ALTER COLUMN number SET DEFAULT '';

ALTER TABLE models
  ALTER COLUMN number SET NOT NULL;
