# Projects

This folder contains the **source code** for every experiment in the Clayground.

> **🎛 Design system:** [`gearhead/`](gearhead/) is the shared component library for this repo.
> Before building UI in any project, check `gearhead/src/components/` first.
> Add new components to Gearhead before using them.

---

## Using Gearhead components in your project

Every project in Clayground should use **[Gearhead](gearhead/)** for shared UI — buttons, inputs, layout primitives, etc. Don't hand-roll components that already exist there.

### 1 — Add Gearhead as a local dependency

```json
// your-project/package.json
"dependencies": {
  "@gearhead/ui": "file:../gearhead"
}
```

Then install:

```bash
npm install
```

### 2 — Add Tailwind + the design tokens

Gearhead uses Tailwind CSS v4 and CSS custom properties for all design tokens. Your project needs the same setup to inherit the theme.

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

```css
/* src/index.css */
@import '@gearhead/ui/styles';   /* design tokens + base styles */
@import 'tailwindcss';
```

### 3 — Import and use components

```tsx
import { Button, TextField, Select } from '@gearhead/ui'

export default function MyPage() {
  return (
    <main className="p-8 space-y-4">
      <TextField label="Name" />
      <Button>Submit</Button>
    </main>
  )
}
```

### 4 — Need a component that doesn't exist yet?

Add it to **Gearhead first**:

1. Create `projects/gearhead/src/components/MyComponent/MyComponent.tsx`
2. Export it from `projects/gearhead/src/index.ts`
3. Add a story at `projects/gearhead/src/stories/MyComponent.stories.tsx`
4. Then use it in your project as above

See [`gearhead/README.md`](gearhead/README.md) for the full component template.

---

## Adding a new project

1. **Copy the template** (optional but recommended):
   ```bash
   cp -r projects/template projects/your-project-name
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

| Type | Template / Project | Notes |
|------|----------|-------|
| Design system | `gearhead` | React Aria + Tailwind + Storybook. **Use this for all shared UI.** |
| Vite + React (static export) | `template` | `base` + `build.outDir: '../../docs/<name>'` in `vite.config.ts` |
| Plain HTML / JS | *(create a folder, drop files in)* | Copy directly to `docs/` |

---

## Using an API-driven database

For experiments that need a hosted database, [**Supabase**](https://supabase.com) is recommended:

- Free tier: 2 projects, 500 MB PostgreSQL, Auth, Storage, Edge Functions
- Access via REST or the `@supabase/supabase-js` SDK
- Works out of the box with Vite

```bash
npm install @supabase/supabase-js
```

```ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

Store your keys in a `.env.local` file (never commit them) and add them as
GitHub Actions secrets (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
for automated builds.
