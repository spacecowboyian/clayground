-- ─────────────────────────────────────────────────────────────────────────────
-- Print Queue — Migration 005: Add AMS slot tracking to filaments
--
-- Adds an ams_slot column to filaments so the operator can record which of the
-- four AMS (Automatic Material System) slots each filament is currently loaded
-- into. Only one filament can occupy each slot at a time.
--
-- Values: 1 | 2 | 3 | 4 | NULL (not currently loaded)
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE filaments
  ADD COLUMN IF NOT EXISTS ams_slot INTEGER
    CHECK (ams_slot BETWEEN 1 AND 4);

-- Ensure at most one filament per AMS slot (NULL values are excluded from
-- unique constraints, so multiple unloaded filaments are fine).
CREATE UNIQUE INDEX IF NOT EXISTS filaments_ams_slot_unique
  ON filaments (ams_slot)
  WHERE ams_slot IS NOT NULL;

COMMENT ON COLUMN filaments.ams_slot IS
  'AMS slot this filament is currently loaded into (1–4). NULL = not loaded.
   Only one filament may occupy each slot at a time (enforced by unique index).';
