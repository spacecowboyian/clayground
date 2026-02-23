# Changelog

All notable changes to Clayground are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Commits follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

---

## [Unreleased]

_Changes not yet pushed to `main` go here._

---

## [0.4.0] – 2026-02-22

### feat(somethings-happening)
- Add new Vite + React project ported from `something-s-happening` Next.js repo
- Homepage is the Super Bowl LX 2026 streaker incident — 13 timeline items (videos, images, tweets, Bluesky posts) rendered directly with `PlayableTimeline`
- Converted all components from Next.js App Router to plain React: removed `'use client'` directives, replaced `next/image` with `<img>`, removed `next/link` and `next/navigation` dependencies
- Removed Prisma/SQLite, server-only API routes, and all database code — static Vite SPA
- Set up `@/` path alias via `vite.config.ts`, `tsconfig.json` `paths`
- Output builds to `docs/somethings-happening/` for GitHub Pages
- Registered in `docs/projects.json`

---

## [0.3.3] – 2026-02-23

### docs
- Add mobile & desktop screenshot requirement to `.github/copilot-instructions.md` and `AGENTS.md`: agents must include screenshots of both mobile (≤ 390 px) and desktop (≥ 1280 px) views in replies, progress reports, or PR comments for any meaningful UI change; update pre-commit checklists in both files accordingly

---

## [0.3.2] – 2026-02-23

### docs
- Add "Browser verification" section to `.github/copilot-instructions.md` and `AGENTS.md`: when to open the dev server, a 6-point visual checklist, and a self-verification rule requiring agents to tell the user what to verify when they cannot open a browser themselves
- Promote "Pre-commit checklist" to section 13 in copilot-instructions.md; add browser-verified gate to both checklists

---

## [0.3.1] – 2026-02-23

### docs
- Add `.github/copilot-instructions.md` — comprehensive AI coding agent rules covering: ask-before-commit workflow, Conventional Commits, CHANGELOG maintenance, Gearhead-first component strategy, React Aria foundation, design token rules, MVP/vibe-coding mindset, TypeScript/React standards, security, and accessibility
- Add `AGENTS.md` at repo root — mirrors copilot-instructions for Cursor, Claude Code, and other AI tools

---

## [0.3.0] – 2026-02-22

### feat(gearhead)
- New design system project at `projects/gearhead/` — replaces the old root-level "Design System Component Library"
- 21 React Aria Components wrapped with Tailwind CSS v4 and CSS custom-property design tokens
- Storybook 8 (`@storybook/react-vite`) with stories for every component
- Static Storybook build outputs to `docs/gearhead/` for GitHub Pages
- Full design token set: dark baseline `#222222`, 5 accent families (orange, blue, green, purple, red)

### feat(template)
- New Vite 6 + React 19 + TypeScript starter at `projects/template/`
- Replaces `projects/template-nextjs/` — Next.js fully removed from the repo
- `base` and `build.outDir` wired for GitHub Pages static export to `docs/template/`

### ci
- Add `.github/workflows/storybook.yml` — dedicated Storybook build triggered by changes to `projects/gearhead/**`
- Update `deploy.yml` env vars from `NEXT_PUBLIC_SUPABASE_*` → `VITE_SUPABASE_*`
- Both workflows share `concurrency: group: pages` to avoid conflicts

### docs
- Root `README.md` updated: structure diagram, design system section, tech stack table
- `projects/README.md`: Gearhead usage instructions (add as dependency, Tailwind setup, import pattern, adding new components)
- `docs/projects.json`: gearhead and template entries added, template-nextjs removed
- `CONTRIBUTING.md` added with conventional commit guidelines

### chore
- Removed `projects/template-nextjs/` (Next.js starter)
- Removed root-level `Design System Component Library/`

---

## [0.2.0] – 2026-02-22

### feat
- Restructured "Design System Component Library" into `components/`, `styles/`, `utils/`, `preview/` layout
- 21 React Aria-based components created with Tailwind CSS styling
- Added `guidelines/Guidelines.md`

---

## [0.1.0] – 2026-02-21

### feat
- Initial multi-project GitHub Pages playground setup
- `docs/` folder with `index.html` homepage and `projects.json` manifest
- `projects/template-nextjs/` — Next.js 15 static export starter
- GitHub Actions `deploy.yml` — builds all projects and deploys to GitHub Pages
