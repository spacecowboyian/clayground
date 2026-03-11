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

### Step 2 — Create the `work_orders` Table

In the Supabase Dashboard, open **SQL Editor** and run:

```sql
-- Create the work orders table
CREATE TABLE work_orders (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer    TEXT NOT NULL,
  item        TEXT NOT NULL,
  color       TEXT NOT NULL DEFAULT '',
  model_url   TEXT NOT NULL DEFAULT '',
  status      TEXT NOT NULL DEFAULT 'Queue'
                CHECK (status IN ('Queue','Printing','Complete','Cancelled')),
  paid        BOOLEAN NOT NULL DEFAULT false,
  notes       TEXT NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Allow public read + write (no login required)
ALTER TABLE work_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read"  ON work_orders FOR SELECT USING (true);
CREATE POLICY "public insert" ON work_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "public update" ON work_orders FOR UPDATE USING (true);
CREATE POLICY "public delete" ON work_orders FOR DELETE USING (true);

-- Optional: auto-update updated_at on every change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON work_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### Step 3 — Seed the Initial Orders (Optional)

```sql
INSERT INTO work_orders (customer, item, color, model_url, status, paid) VALUES
  ('Karen coworker','Heart curio shelf','Pink',   'https://makerworld.com/en/models/644775-heart-curio-trinket-shelf?from=search#profileId-570867','Complete',false),
  ('Karen coworker','Heart curio shelf','Purple',  'https://makerworld.com/en/models/644775-heart-curio-trinket-shelf?from=search#profileId-570867','Complete',false),
  ('Karen coworker','Heart curio shelf','Light Blue','https://makerworld.com/en/models/644775-heart-curio-trinket-shelf?from=search#profileId-570867','Printing',false),
  ('Karen coworker','Heart curio shelf','Light Blue','https://makerworld.com/en/models/644775-heart-curio-trinket-shelf?from=search#profileId-570867','Queue',   false),
  ('Karen coworker','Heart curio shelf','Purple',  'https://makerworld.com/en/models/644775-heart-curio-trinket-shelf?from=search#profileId-570867','Queue',   false),
  ('Karen coworker','Heart curio shelf','Yellow',  'https://makerworld.com/en/models/644775-heart-curio-trinket-shelf?from=search#profileId-570867','Queue',   false),
  ('Karen coworker','Hot Wheels shelf', 'Dark Blue','https://makerworld.com/en/models/851161-hot-wheels-shelf-for-10-cars?from=search#profileId-799264','Queue',  false),
  ('Karen coworker','Hot Wheels shelf', 'Dark Blue','https://makerworld.com/en/models/851161-hot-wheels-shelf-for-10-cars?from=search#profileId-799264','Queue',  false),
  ('Karen coworker','Uno card holder',  'TBD',     'https://makerworld.com/en/models/2175464-simple-customizable-card-box-parametric#profileId-2360117','Queue', false);
```

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

Add these as **repository secrets** in GitHub → Settings → Secrets → Actions:

| Secret name | Value |
|-------------|-------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your anon key |

> The `VITE_PRINT_QUEUE_PASSWORD` secret is **not** added to CI — the password defaults to `beeps` in the deployed build. To change it, add `VITE_PRINT_QUEUE_PASSWORD` as a repo secret too.

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
