# Tiny Prints — Print Queue

A 3-D print work-order tracker for **Tiny Prints**. Password-protect the management dashboard; share individual order links freely with customers — no login required to view a single order.

**Live:** https://spacecowboyian.github.io/clayground/print-queue/main/

---

## Features

| Feature | Details |
|---------|---------|
| 📋 Work order table | Customer · Item · Color · Model URL · Status · Paid · Notes |
| 🔐 Password-protected dashboard | Single shared password; stored in `sessionStorage` per tab |
| 🔗 Public order detail links | `#/order/<uuid>` — shareable with no password |
| ✏️ Inline status dropdown | Change Queue → Printing → Complete instantly |
| ✅ Paid toggle | Green switch per row; flip with one click |
| ➕ Add / Edit / Delete | Full CRUD via dialog forms |
| 📊 Stats bar | Total · Printing now · In queue · Awaiting payment |
| 🎨 Color swatches | Named colors rendered as dots |
| 📱 Responsive | Card layout on mobile, table on desktop |
| 💾 Supabase backend | Shared real-time data for all users |
| 🔋 Demo mode | Falls back to localStorage when Supabase is not configured |
| 🗂️ Model catalog | Track printable models with name, description, URL, image, and print history |
| 🧵 Filament inventory | Track filament rolls in stock; controls available color options when ordering |
| ⚠️ Custom color surcharge | Special color requests flag the order and auto-add a $5 surcharge |

---

## Quick Start (Demo Mode)

No backend needed to try it out. Just open the app — data is seeded into `localStorage` automatically with Karen's initial orders.

Default password: **`beeps`**

---

## Setting Up Supabase (Recommended for Real Use)

Supabase gives you a free PostgreSQL database that all users share in real time.

### Step 1 — Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Choose a name and a strong database password
3. Select a region closest to you
4. Wait ~2 minutes for the project to spin up

### Step 2 — Create the Database Tables

The full schema is in [`supabase/migrations/001_initial_schema.sql`](supabase/migrations/001_initial_schema.sql). Copy and paste that file into **Supabase Dashboard → SQL Editor** and click **Run**.

For reference, the complete schema is shown below:

```sql
-- ── Helper: auto-update updated_at ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

-- ── models ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS models (
  id                    UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  TEXT        NOT NULL,
  description           TEXT        NOT NULL DEFAULT '',
  model_url             TEXT        NOT NULL DEFAULT '',
  image_url             TEXT        NOT NULL DEFAULT '',
  self_created          BOOLEAN     NOT NULL DEFAULT false,
  filament_requirements JSONB       NOT NULL DEFAULT '[]',
  post_processing_mins  INTEGER     NOT NULL DEFAULT 0,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE models ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read"   ON models FOR SELECT USING (true);
CREATE POLICY "public insert" ON models FOR INSERT WITH CHECK (true);
CREATE POLICY "public update" ON models FOR UPDATE USING (true);
CREATE POLICY "public delete" ON models FOR DELETE USING (true);

CREATE TRIGGER set_updated_at_models BEFORE UPDATE ON models
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── filaments ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS filaments (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  brand               TEXT        NOT NULL DEFAULT '',
  material            TEXT        NOT NULL DEFAULT 'PLA',
  color               TEXT        NOT NULL,
  color_hex           TEXT        NOT NULL DEFAULT '',
  status              TEXT        NOT NULL DEFAULT 'in_stock',  -- 'in_stock' | 'out_of_stock' | 'on_order' (migration 007)
  roll_cost           NUMERIC     NOT NULL DEFAULT 0,
  roll_size_g         NUMERIC     NOT NULL DEFAULT 1000,
  current_quantity_g  NUMERIC     NOT NULL DEFAULT 0,
  purchase_url        TEXT        NOT NULL DEFAULT '',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE filaments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read"   ON filaments FOR SELECT USING (true);
CREATE POLICY "public insert" ON filaments FOR INSERT WITH CHECK (true);
CREATE POLICY "public update" ON filaments FOR UPDATE USING (true);
CREATE POLICY "public delete" ON filaments FOR DELETE USING (true);

CREATE TRIGGER set_updated_at_filaments BEFORE UPDATE ON filaments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── work_orders ───────────────────────────────────────────────────────────────
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
CREATE POLICY "public read"   ON work_orders FOR SELECT USING (true);
CREATE POLICY "public insert" ON work_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "public update" ON work_orders FOR UPDATE USING (true);
CREATE POLICY "public delete" ON work_orders FOR DELETE USING (true);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON work_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

#### Upgrading an existing schema

If you created tables before the inventory feature was added, run this to add any missing columns:

```sql
-- Add missing columns to models (if upgrading from an older schema)
ALTER TABLE models
  ADD COLUMN IF NOT EXISTS self_created         BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS filament_requirements JSONB   NOT NULL DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS post_processing_mins  INTEGER NOT NULL DEFAULT 0;

-- Add missing columns to filaments (if upgrading from an older schema)
ALTER TABLE filaments
  ADD COLUMN IF NOT EXISTS roll_cost          NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS roll_size_g        NUMERIC NOT NULL DEFAULT 1000,
  ADD COLUMN IF NOT EXISTS current_quantity_g NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS purchase_url       TEXT    NOT NULL DEFAULT '';

-- Add missing columns to work_orders (if upgrading from the original schema)
ALTER TABLE work_orders
  ADD COLUMN IF NOT EXISTS price          NUMERIC  NOT NULL DEFAULT 5.00,
  ADD COLUMN IF NOT EXISTS cost           NUMERIC  NOT NULL DEFAULT 2.00,
  ADD COLUMN IF NOT EXISTS sort_order     INTEGER  NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS model_id       UUID,
  ADD COLUMN IF NOT EXISTS needs_filament BOOLEAN  NOT NULL DEFAULT false;
```

### Step 3 — Seed the Initial Data (Optional)

The seed script is in [`supabase/seed.sql`](supabase/seed.sql). It inserts the same starter data as demo mode (Karen's initial orders, 3 models, 9 filament colors). Copy and paste it into **Supabase Dashboard → SQL Editor** and click **Run**.

The script uses deterministic UUIDs and `ON CONFLICT DO NOTHING`, so it is safe to re-run.

> **Note:** localStorage demo data is local to your browser and is not shared. Supabase is required for shared/real-time data and for AI agent automation.

### Step 4 — Get Your API Keys

In your Supabase project: **Project Settings → API**

- Copy the **Project URL** (looks like `https://abcdefgh.supabase.co`)
- Copy the **anon / public** key (long JWT string)

### Step 5 — Configure the App

#### For local development

Create `projects/print-queue/.env.local` (never committed):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_PRINT_QUEUE_PASSWORD=your-secret-password
```

#### For GitHub Pages deployment

Add these as **repository secrets** in GitHub → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret name | Required | Value |
|-------------|----------|-------|
| `VITE_SUPABASE_URL` | ✅ Yes | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | ✅ Yes | Your anon / public key |
| `VITE_PRINT_QUEUE_PASSWORD` | Optional | Dashboard password (defaults to `beeps`) |

Once secrets are set, every push to `main` automatically rebuilds and redeploys the app via `.github/workflows/deploy.yml`.

To trigger a rebuild without pushing new code (e.g. after updating secrets), go to **Actions → Print Queue — Build & Deploy → Run workflow**.

> **Important:** Never commit `VITE_SUPABASE_ANON_KEY` or any other secret to source control. The `.env.local` file is gitignored for this reason.

### Step 6 — Rebuild and Deploy

```bash
cd projects/print-queue
npm run build
```

Push to `main` — GitHub Actions will build and deploy automatically.

---

## Sharing Links

### Management dashboard (password-required)
```
https://spacecowboyian.github.io/clayground/print-queue/main/#/dashboard
```

### Individual order (no password)
```
https://spacecowboyian.github.io/clayground/print-queue/main/#/order/<uuid>
```

Click the **Share** (📤) icon in the dashboard next to any order — the link is copied to your clipboard automatically.

---

## Changing the Password

The password lives in the `VITE_PRINT_QUEUE_PASSWORD` environment variable.

- **Locally:** update `.env.local`
- **Deployed:** add or update the GitHub Actions secret → re-run the deploy workflow

---

## Development

```bash
cd projects/print-queue
npm install
npm run dev        # dev server on http://localhost:5174/clayground/print-queue/main/
npm run build      # production build → docs/print-queue/main/
npm run lint       # ESLint
npm run typecheck  # TypeScript (our source only)
```
