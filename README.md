# 🧪 Clayground

Ian's collection of AI coding experiments — built with Vite + React, published via **GitHub Pages**.

🔗 **Live site:** https://spacecowboyian.github.io/clayground/

---

## Repo structure

```
clayground/
├── projects/
│   ├── gearhead/          ← 🎛  Design system (start here!)
│   │   ├── src/components/  ← React Aria + Tailwind primitives
│   │   ├── src/styles/      ← Design tokens & global CSS
│   │   ├── src/stories/     ← Storybook stories for every component
│   │   └── .storybook/      ← Storybook configuration
│   ├── template/          ← Starter template (copy to begin a new project)
│   └── README.md          ← How to add a new project
├── docs/                  ← Static output served by GitHub Pages
│   ├── index.html         ← Homepage / project index
│   ├── projects.json      ← Project manifest
│   └── gearhead/          ← Storybook static site (built by CI)
└── .github/workflows/
    ├── deploy.yml         ← Builds & deploys ALL projects on every push to main
    └── storybook.yml      ← Dedicated Storybook build on gearhead/** changes
```

---

## Design system — Gearhead

All projects in this repo share the **[Gearhead](projects/gearhead)** component library.

🔗 **Live Storybook:** `https://spacecowboyian.github.io/clayground/gearhead/`

**Before building any UI**, check whether the component you need already exists in Gearhead. If it doesn't, add it there first, document it with a Story, then use it in your project.

Key locations inside `projects/gearhead/`:
- `src/index.ts` — single barrel export for all components
- `src/styles/theme.css` — all design tokens (colors, radius, typography)
- `src/stories/` — Storybook story for every component

```bash
# Run the Storybook locally
cd projects/gearhead
npm install && npm run dev
```

To use Gearhead components in another project in this repo, add to its `package.json`:
```json
"@gearhead/ui": "file:../gearhead"
```
Then add the Tailwind plugin in `vite.config.ts` so the design tokens are available:
```ts
import tailwindcss from '@tailwindcss/vite'
// plugins: [react(), tailwindcss()]
```

---

## Adding a new experiment

1. **Copy the template:**
   ```bash
   cp -r projects/template projects/my-experiment
   cd projects/my-experiment && npm install
   ```
2. **Build** it (or let CI handle it):
   ```bash
   npm run build   # writes to docs/my-experiment/
   ```
3. **Register** the project in `docs/projects.json` so it shows on the homepage.
4. Push to `main` — GitHub Actions builds and deploys everything automatically.

See [`projects/README.md`](projects/README.md) for full details, including how to connect a **Supabase** database.

> **Commit conventions:** All commits follow [Conventional Commits](https://www.conventionalcommits.org/).
> See [`CONTRIBUTING.md`](CONTRIBUTING.md) for types, scopes, and the changelog update process.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Design system | [Gearhead](projects/gearhead) (React Aria + Tailwind CSS) |
| Component docs | [Storybook 8](https://storybook.js.org/) |
| UI primitives | [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Frontend framework | [Vite 6](https://vite.dev/) + [React 19](https://react.dev/) (static export) |
| Hosting | [GitHub Pages](https://pages.github.com/) |
| CI/CD | GitHub Actions |
| Database (optional) | [Supabase](https://supabase.com) — free tier, REST + Realtime |
