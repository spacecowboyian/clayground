-- ─────────────────────────────────────────────────────────────────────────────
-- Print Queue — Migration 006: Nullify filament_id in model filament requirements
--
-- Model filament_requirements were seeded with specific filament UUIDs that
-- represent the calibration filament used when the model was set up.  However,
-- most models can be printed in any color chosen by the customer.  Keeping a
-- hard-coded filament_id in requirements means the inventory stats can only
-- attribute filament usage to that one color; orders placed for other colors
-- show 0 g reserved/consumed because no requirement matches.
--
-- By setting filament_id to null we make requirements "color-agnostic":
-- computeFilamentStats will include them when matching any color-name order
-- item, giving correct reserved/consumed figures for every filament.
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE models
SET filament_requirements = (
  SELECT jsonb_agg(
    jsonb_set(req, '{filament_id}', 'null'::jsonb)
  )
  FROM jsonb_array_elements(filament_requirements) AS req
)
WHERE filament_requirements IS NOT NULL
  AND filament_requirements != '[]'::jsonb;
