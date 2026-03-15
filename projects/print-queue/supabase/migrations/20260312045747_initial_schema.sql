-- ─────────────────────────────────────────────────────────────────────────────
-- Tiny Prints — Initial Schema
-- Run this once in Supabase Dashboard → SQL Editor.
-- Safe to run on a fresh project; will error if tables already exist (use the
-- upgrade script in the README if you have an older schema).
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Helper: auto-update updated_at ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── models ────────────────────────────────────────────────────────────────────
-- Matches PrintModel in src/types/Inventory.ts
CREATE TABLE IF NOT EXISTS models (
  id                    UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  TEXT        NOT NULL,
  description           TEXT        NOT NULL DEFAULT '',
  model_url             TEXT        NOT NULL DEFAULT '',
  image_url             TEXT        NOT NULL DEFAULT '',
  self_created          BOOLEAN     NOT NULL DEFAULT false,
  -- Array of { filament_id: string | null, quantity_g: number }
  filament_requirements JSONB       NOT NULL DEFAULT '[]',
  post_processing_mins  INTEGER     NOT NULL DEFAULT 0,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE models ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public read"   ON models;
DROP POLICY IF EXISTS "public insert" ON models;
DROP POLICY IF EXISTS "public update" ON models;
DROP POLICY IF EXISTS "public delete" ON models;
CREATE POLICY "public read"   ON models FOR SELECT USING (true);
CREATE POLICY "public insert" ON models FOR INSERT WITH CHECK (true);
CREATE POLICY "public update" ON models FOR UPDATE USING (true);
CREATE POLICY "public delete" ON models FOR DELETE USING (true);

CREATE INDEX IF NOT EXISTS models_name_idx ON models (name);

DROP TRIGGER IF EXISTS set_updated_at_models ON models;
CREATE TRIGGER set_updated_at_models
  BEFORE UPDATE ON models
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── filaments ─────────────────────────────────────────────────────────────────
-- Matches Filament in src/types/Inventory.ts
CREATE TABLE IF NOT EXISTS filaments (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  brand               TEXT        NOT NULL DEFAULT '',
  material            TEXT        NOT NULL DEFAULT 'PLA',
  color               TEXT        NOT NULL,
  color_hex           TEXT        NOT NULL DEFAULT '',
  in_stock            BOOLEAN     NOT NULL DEFAULT true,
  roll_cost           NUMERIC     NOT NULL DEFAULT 0,
  roll_size_g         NUMERIC     NOT NULL DEFAULT 1000,
  current_quantity_g  NUMERIC     NOT NULL DEFAULT 0,
  purchase_url        TEXT        NOT NULL DEFAULT '',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE filaments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public read"   ON filaments;
DROP POLICY IF EXISTS "public insert" ON filaments;
DROP POLICY IF EXISTS "public update" ON filaments;
DROP POLICY IF EXISTS "public delete" ON filaments;
CREATE POLICY "public read"   ON filaments FOR SELECT USING (true);
CREATE POLICY "public insert" ON filaments FOR INSERT WITH CHECK (true);
CREATE POLICY "public update" ON filaments FOR UPDATE USING (true);
CREATE POLICY "public delete" ON filaments FOR DELETE USING (true);

CREATE INDEX IF NOT EXISTS filaments_color_idx    ON filaments (color);
CREATE INDEX IF NOT EXISTS filaments_in_stock_idx ON filaments (in_stock);

DROP TRIGGER IF EXISTS set_updated_at_filaments ON filaments;
CREATE TRIGGER set_updated_at_filaments
  BEFORE UPDATE ON filaments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── work_orders ───────────────────────────────────────────────────────────────
-- Matches WorkOrder in src/types/WorkOrder.ts
CREATE TABLE IF NOT EXISTS work_orders (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  customer       TEXT        NOT NULL,
  item           TEXT        NOT NULL,
  color          TEXT        NOT NULL DEFAULT '',
  model_url      TEXT        NOT NULL DEFAULT '',
  status         TEXT        NOT NULL DEFAULT 'Queue'
                   CHECK (status IN ('Queue','Printing','Complete','Cancelled')),
  paid           BOOLEAN     NOT NULL DEFAULT false,
  notes          TEXT        NOT NULL DEFAULT '',
  price          NUMERIC     NOT NULL DEFAULT 5.00,
  cost           NUMERIC     NOT NULL DEFAULT 2.00,
  sort_order     INTEGER     NOT NULL DEFAULT 0,
  model_id       UUID        REFERENCES models(id) ON DELETE SET NULL,
  needs_filament BOOLEAN     NOT NULL DEFAULT false,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE work_orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public read"   ON work_orders;
DROP POLICY IF EXISTS "public insert" ON work_orders;
DROP POLICY IF EXISTS "public update" ON work_orders;
DROP POLICY IF EXISTS "public delete" ON work_orders;
CREATE POLICY "public read"   ON work_orders FOR SELECT USING (true);
CREATE POLICY "public insert" ON work_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "public update" ON work_orders FOR UPDATE USING (true);
CREATE POLICY "public delete" ON work_orders FOR DELETE USING (true);

CREATE INDEX IF NOT EXISTS work_orders_status_idx     ON work_orders (status);
CREATE INDEX IF NOT EXISTS work_orders_model_id_idx   ON work_orders (model_id);
CREATE INDEX IF NOT EXISTS work_orders_created_at_idx ON work_orders (created_at);

DROP TRIGGER IF EXISTS set_updated_at ON work_orders;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON work_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
