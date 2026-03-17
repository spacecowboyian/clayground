-- ─────────────────────────────────────────────────────────────────────────────
-- Print Queue — Migration 010: Drop models.number (Catalog Number)
--
-- The catalog number field caused confusion (treated like a unique ID) and is
-- no longer needed. The model's UUID primary key serves as the generated
-- identifier. This migration removes the column entirely.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE models DROP COLUMN IF EXISTS number;
