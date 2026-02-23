# Projects

This folder contains the **source code** for every experiment in the Clayground.

---

## Adding a new project

1. **Copy the template** (optional but recommended):
   ```bash
   cp -r projects/template-nextjs projects/your-project-name
   cd projects/your-project-name
   npm install
   ```

2. **Develop** your project locally:
   ```bash
   npm run dev
   ```

3. **Register it** in [`docs/projects.json`](../docs/projects.json) so it appears on the homepage:
   ```json
   {
     "id": "your-project-name",
     "title": "Your Project Title",
     "description": "One-line description of the experiment.",
     "tags": ["nextjs", "ai"],
     "url": "your-project-name/index.html",
     "source": "https://github.com/spacecowboyian/clayground/tree/main/projects/your-project-name",
     "date": "2026-02-23"
   }
   ```

4. **Build for GitHub Pages**:
   ```bash
   cd projects/your-project-name
   npm run build   # outputs to ../../docs/your-project-name
   ```
   Or push to `main` and let the [deploy workflow](../.github/workflows/deploy.yml) handle it automatically.

---

## Project types supported

| Type | Template | Notes |
|------|----------|-------|
| Next.js (static export) | `template-nextjs` | `output: 'export'` in `next.config.js` |
| Plain HTML / JS | *(create a folder, drop files in)* | Copy directly to `docs/` |
| React (Vite) | *(coming soon)* | |

---

## Using an API-driven database

For experiments that need a hosted database, [**Supabase**](https://supabase.com) is recommended:

- Free tier: 2 projects, 500 MB PostgreSQL, Auth, Storage, Edge Functions
- Access via REST or the `@supabase/supabase-js` SDK
- Works out of the box with Next.js

```bash
npm install @supabase/supabase-js
```

```js
// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
```

Store your keys in a `.env.local` file (never commit them) and add them as
GitHub Actions secrets (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
for automated builds.
