-- ─────────────────────────────────────────────────────────────────────────────
-- Tiny Prints — Seed Data
-- Mirrors the localStorage demo seeds in src/lib/inventory.ts and storage.ts.
-- Run this after 001_initial_schema.sql.
--
-- Uses deterministic UUIDs so the script is idempotent:
-- re-running it will not duplicate rows (ON CONFLICT DO NOTHING).
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Filaments ─────────────────────────────────────────────────────────────────
INSERT INTO filaments (id, brand, material, color, color_hex, status, roll_cost, roll_size_g, current_quantity_g, purchase_url)
VALUES
  ('a1000001-0000-0000-0000-000000000001', 'Generic', 'PLA', 'Black',      '#1a1a1a', 'in_stock', 20, 1000, 1000, ''),
  ('a1000001-0000-0000-0000-000000000002', 'Generic', 'PLA', 'Dark Blue',  '#1e40af', 'in_stock', 20, 1000, 1000, ''),
  ('a1000001-0000-0000-0000-000000000003', 'Generic', 'PLA', 'Green',      '#22c55e', 'in_stock', 20, 1000, 1000, ''),
  ('a1000001-0000-0000-0000-000000000004', 'Generic', 'PLA', 'Light Blue', '#7dd3fc', 'in_stock', 20, 1000, 1000, ''),
  ('a1000001-0000-0000-0000-000000000005', 'Generic', 'PLA', 'Pink',       '#f472b6', 'in_stock', 20, 1000, 1000, ''),
  ('a1000001-0000-0000-0000-000000000006', 'Generic', 'PLA', 'Purple',     '#a855f7', 'in_stock', 20, 1000, 1000, ''),
  ('a1000001-0000-0000-0000-000000000007', 'Generic', 'PLA', 'Red',        '#ef4444', 'in_stock', 20, 1000, 1000, ''),
  ('a1000001-0000-0000-0000-000000000008', 'Generic', 'PLA', 'White',      '#f5f5f5', 'in_stock', 20, 1000, 1000, ''),
  ('a1000001-0000-0000-0000-000000000009', 'Generic', 'PLA', 'Yellow',     '#fde047', 'in_stock', 20, 1000, 1000, '')
ON CONFLICT (id) DO NOTHING;

-- ── Models ────────────────────────────────────────────────────────────────────
INSERT INTO models (id, name, description, model_url, image_url, self_created, filament_requirements, post_processing_mins)
VALUES
  (
    'b2000001-0000-0000-0000-000000000001',
    'Heart curio shelf',
    'Small heart-shaped trinket shelf',
    'https://makerworld.com/en/models/644775-heart-curio-trinket-shelf?from=search#profileId-570867',
    '',
    false,
    '[{"filament_id": null, "quantity_g": 20}]',
    5
  ),
  (
    'b2000001-0000-0000-0000-000000000002',
    'Hot Wheels shelf',
    'Wall shelf for 10 Hot Wheels cars',
    'https://makerworld.com/en/models/851161-hot-wheels-shelf-for-10-cars?from=search#profileId-799264',
    '',
    false,
    '[{"filament_id": null, "quantity_g": 80}]',
    10
  ),
  (
    'b2000001-0000-0000-0000-000000000003',
    'Uno card holder',
    'Simple customizable card box',
    'https://makerworld.com/en/models/2175464-simple-customizable-card-box-parametric#profileId-2360117',
    '',
    false,
    '[{"filament_id": null, "quantity_g": 30}]',
    5
  )
ON CONFLICT (id) DO NOTHING;

-- ── Work Orders ───────────────────────────────────────────────────────────────
-- Mirrors SEED_TEMPLATES in src/lib/storage.ts (Karen coworker initial orders)
INSERT INTO work_orders (id, customer, item, color, model_url, status, paid, notes, price, cost, sort_order, model_id, needs_filament)
VALUES
  ('c3000001-0000-0000-0000-000000000001', 'Karen coworker', 'Heart curio shelf', 'Pink',
   'https://makerworld.com/en/models/644775-heart-curio-trinket-shelf?from=search#profileId-570867',
   'Complete', false, '', 5, 2, 1, 'b2000001-0000-0000-0000-000000000001', false),

  ('c3000001-0000-0000-0000-000000000002', 'Karen coworker', 'Heart curio shelf', 'Purple',
   'https://makerworld.com/en/models/644775-heart-curio-trinket-shelf?from=search#profileId-570867',
   'Complete', false, '', 5, 2, 2, 'b2000001-0000-0000-0000-000000000001', false),

  ('c3000001-0000-0000-0000-000000000003', 'Karen coworker', 'Heart curio shelf', 'Light Blue',
   'https://makerworld.com/en/models/644775-heart-curio-trinket-shelf?from=search#profileId-570867',
   'Printing', false, '', 5, 2, 3, 'b2000001-0000-0000-0000-000000000001', false),

  ('c3000001-0000-0000-0000-000000000004', 'Karen coworker', 'Heart curio shelf', 'Light Blue',
   'https://makerworld.com/en/models/644775-heart-curio-trinket-shelf?from=search#profileId-570867',
   'Queue', false, '', 5, 2, 4, 'b2000001-0000-0000-0000-000000000001', false),

  ('c3000001-0000-0000-0000-000000000005', 'Karen coworker', 'Heart curio shelf', 'Purple',
   'https://makerworld.com/en/models/644775-heart-curio-trinket-shelf?from=search#profileId-570867',
   'Queue', false, '', 5, 2, 5, 'b2000001-0000-0000-0000-000000000001', false),

  ('c3000001-0000-0000-0000-000000000006', 'Karen coworker', 'Heart curio shelf', 'Yellow',
   'https://makerworld.com/en/models/644775-heart-curio-trinket-shelf?from=search#profileId-570867',
   'Queue', false, '', 5, 2, 6, 'b2000001-0000-0000-0000-000000000001', false),

  ('c3000001-0000-0000-0000-000000000007', 'Karen coworker', 'Hot Wheels shelf', 'Dark Blue',
   'https://makerworld.com/en/models/851161-hot-wheels-shelf-for-10-cars?from=search#profileId-799264',
   'Queue', false, '', 5, 2, 7, 'b2000001-0000-0000-0000-000000000002', false),

  ('c3000001-0000-0000-0000-000000000008', 'Karen coworker', 'Hot Wheels shelf', 'Dark Blue',
   'https://makerworld.com/en/models/851161-hot-wheels-shelf-for-10-cars?from=search#profileId-799264',
   'Queue', false, '', 5, 2, 8, 'b2000001-0000-0000-0000-000000000002', false),

  ('c3000001-0000-0000-0000-000000000009', 'Karen coworker', 'Uno card holder', 'TBD',
   'https://makerworld.com/en/models/2175464-simple-customizable-card-box-parametric#profileId-2360117',
   'Queue', false, '', 5, 2, 9, 'b2000001-0000-0000-0000-000000000003', false)
ON CONFLICT (id) DO NOTHING;
