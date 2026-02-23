# 🧪 Clayground

Ian's collection of AI coding experiments — built with Next.js, published via **GitHub Pages**.

🔗 **Live site:** https://spacecowboyian.github.io/clayground/

---

## Repo structure

```
clayground/
├── projects/              ← Source code for each experiment
│   ├── README.md          ← How to add a new project
│   └── template-nextjs/   ← Starter template (copy this!)
├── docs/                  ← Static output served by GitHub Pages
│   ├── index.html         ← Homepage / project index
│   ├── projects.json      ← Project manifest (edit to add entries)
│   └── <project-name>/    ← Built output for each project
└── .github/workflows/
    └── deploy.yml         ← Builds & deploys on every push to main
```

---

## Adding a new experiment

1. **Copy the template:**
   ```bash
   cp -r projects/template-nextjs projects/my-experiment
   cd projects/my-experiment && npm install
   ```
2. **Build** it (or let CI handle it):
   ```bash
   npm run build   # writes to docs/my-experiment/
   ```
3. **Register** the project in `docs/projects.json` so it shows on the homepage.
4. Push to `main` — GitHub Actions builds and deploys everything automatically.

See [`projects/README.md`](projects/README.md) for full details, including how to connect a **Supabase** database.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Frontend framework | [Next.js 14](https://nextjs.org/) (static export) |
| Hosting | [GitHub Pages](https://pages.github.com/) |
| CI/CD | GitHub Actions |
| Database (optional) | [Supabase](https://supabase.com) — free tier, REST + Realtime |
