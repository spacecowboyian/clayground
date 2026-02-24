# Changelog

All notable changes to Clayground are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Commits follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

---

## [Unreleased]

_Changes not yet pushed to `main` go here._

---

## [0.6.3] – 2026-02-23

### fix(kc-live-timing)
- **Merge latest main** — rebased onto current `main` (no divergence in this grafted/shallow clone)
- **Remove "Runs" column** from the results table; default row now shows only `Pos | # | Driver | Best/Total | Pin` — keeps the mobile view uncluttered with just the single relevant time
- **Row-click expansion** — tapping/clicking anywhere on a driver row (except the name button or pin) inserts an inline expansion row beneath it showing all run chips labelled `R1`, `R2`, `R3` …; the best run chip is highlighted green; clicking the row again collapses it
- **SVG pin icon replaces 📌 emoji** — uses `fill="currentColor"` so CSS color works; **gray** (`--text3`) by default → **red** (`--red`) when pinned; also updated `CompetitionPage.tsx` to match
- **Pin column header removed** — `<th>` now has no visible text (`aria-label="Pin"` for screen readers only, zero width)
- **Mobile CSS** — removed stale `driver-row__runs: display:none` rule (column no longer exists) and stale `global-me-bar` mobile override; `me-bar` font-size now scaled at ≤ 480 px

---

## [0.6.2] – 2026-02-23

### fix(kc-live-timing)
- Move the YOU bar **above** the latest-runs strip — order is now: YOU bar → latest runs → tab bar → class results
- Replace simple time + position display in YOU bar with **run-by-run chips** (autocross) or **total time** (rallycross)
- Autocross: best run chip is placed first and uses `position: sticky; left: 0` so it never scrolls out of view; other runs scroll horizontally to the right
- Rallycross: YOU bar shows a single large "Total" time instead of run chips
- Extract YOU bar into dedicated `MeBar` component (`src/components/MeBar.tsx`)
- Fix sticky z-index stacking: added `--header-h` / `--me-bar-h` CSS variables; `.app--has-me .tab-bar` stacks below both header and me-bar

---

## [0.6.1] – 2026-02-23

### fix(kc-live-timing)
- Replace ☆/★ "Mark as me" and 🟢/🔴 "Watch" row buttons with a single 📌 **pin** icon per driver row — dimmed when unpinned, full opacity when pinned
- Remove inline "Mark as me" button from table rows and Competition page; "This is me" now lives exclusively on the driver detail screen
- Tapping a driver's name now opens a **Driver Detail view** showing all their individual runs, best time, class position, cone-penalty breakdown, and a prominent "📌 This is me" / "✓ This is me — tap to remove" button
- "This is me" selection persists in `localStorage` — survives page reloads and browser restarts
- Replace per-class sticky bottom banner with a **global sticky "YOU" bar** pinned between the Latest Runs strip and the tab bar — always visible as you scroll through any class, showing name, class code, best time, and position; tapping it opens the driver detail view
- Chris Taylor ★ indicator appears inline in the driver's name cell in the results table

---

## [0.6.0] – 2026-02-23

### feat(kc-live-timing)
- Add new `projects/kc-live-timing` — KC Live Timing, a mobile-friendly React SPA for KCRSCCA autocross and rallycross events
- File drop/upload interface for axware `results_live.htm` files; parses HTML into structured JSON using a DOM-based parser
- Scrollable "Latest 10 Runs" strip across the top of the page — most recent runs first, auto-scrolls on update
- Class results tables sorted by fastest time: autocross uses best single run, rallycross uses cumulative total
- Run chips show individual times with cone penalties (e.g. `54.321+2`), colour-coded best run highlight, DNF/DNS labels
- Time-diff column shows gap to class leader (`+N.NNN`)
- "Mark as me" (☆/★) feature: selected driver is pinned to the very top of their class table using CSS sticky positioning with an orange banner
- "Watch" (🟢/🔴) feature: add any driver to a Competition watchlist
- Dedicated **Competition** tab: cross-class comparison of all watched drivers sorted by best time, with sticky "You" banner at top
- Persistent selections via `localStorage` — survives page reloads
- Tab bar with Results / Competition views and a watched-driver badge count
- Dark-first mobile design (`#111` background, orange accent); responsive at ≤ 480 px (run chips hidden, layout tightened)
- Registered in `docs/projects.json`
## [0.6.0] – 2026-02-23

### feat(gearhead)
- Add 5 new supporting components to Gearhead:
  - **PageHeader** — title, description, breadcrumbs nav, and actions slot
  - **FilterSidebar** — collapsible filter groups with React Aria checkboxes, counts, clear-all, and color theming; collapses/expands each group independently
  - **ViewToggle** — list/grid view mode switcher built on React Aria `ToggleButton` pair with accessible `aria-label` and `role="group"`
  - **StatCard** — metric card with value, trend direction/value, icon, and per-color icon background
  - **EmptyState** — zero-data state with optional icon, title, description, and action slot
- Add 3 page structure patterns under `components/patterns/`:
  - **ListPage** — left-side FilterSidebar + SearchField + ViewToggle toolbar + full-width content slot; sidebar hidden on mobile (`md:` breakpoint)
  - **DetailsPage** — PageHeader with badge + structured detail sections rendered as `<dl>/<dt>/<dd>` grid + optional right sidebar; sidebar hidden on mobile
  - **DashboardPage** — PageHeader + responsive StatCard row (1 → 2 → 4 cols) + primary/secondary content panels; secondary panel hidden on mobile
- Add Storybook stories for all 8 new additions (Components and Patterns title groups)
- Export all new components and patterns from `src/index.ts`

---

## [0.5.0] – 2026-02-23

### feat(bpsds)
- Add new `projects/bpsds` — Bass Pro Shops Design System Storybook
- Inventory of BPS UI patterns from fishing, hunting, camping, boating, clothing & footwear category/product pages
- Bass Pro Shops theme tokens: forest green (`#1a472a`), gold (`#c9a227`), sale orange/red; full light-mode neutral scale
- 18 React Aria-backed components mapped to BPS UI patterns:
  - **Button** — Add to Cart / Shop Now / Gold CTA / Outline / Ghost / Destructive / Link variants + SM–XL sizes
  - **Badge** — Sale, New, Clearance, Featured, Exclusive, Limited, Out of Stock
  - **SearchBar** — site-wide search with SM/MD/LG sizes
  - **PriceDisplay** — regular, sale (was/now + % savings), SM/MD/LG sizes
  - **StarRating** — fractional stars using SVG gradient fills, review count
  - **ProductCard** — image, brand, title, rating, price, badge, wishlist icon, Add to Cart
  - **CategoryCard** — image tile with gradient overlay and Shop Now CTA
  - **Breadcrumbs** — react-aria `Breadcrumbs` styled in BPS green
  - **Navigation** — utility bar, logo, search, account/cart, category strip, mobile drawer
  - **QuantityInput** — +/− stepper via `NumberField`
  - **Tabs** — product detail tabs (Description, Specs, Reviews, Q&A)
  - **Accordion** — FAQ and filter expand/collapse via `DisclosureGroup`
  - **PromoBanner** — sale / info / shipping / loyalty variants, dismissible
  - **Select** — sort-by and size/line-weight dropdowns
  - **Checkbox / CheckboxGroupField** — brand/power/action filter checkboxes
  - **RadioGroup / Radio** — availability and sort radio filters
  - **TagGroup** — active filter chips with remove support
  - **Dialog** — Add-to-cart confirmation and store-finder overlays
  - **Filters** — sidebar panel composing Accordion + Checkbox/Radio sections
- 20 Storybook stories including a full-page BPS category page overview (`BPS Pages/Full Page Preview`)
- Registered in `docs/projects.json`



## [0.4.3] – 2026-02-23

### docs(ci)
- Port "User Story Update Requirement" from `spacecowboyian/something-s-happening` into both `.github/copilot-instructions.md` and `AGENTS.md`
- Copilot must now also update the relevant user story file (under `## Additions`) whenever a commit includes design changes, recording what shifted and building a historical record of design evolution

---

## [0.4.2] – 2026-02-23

### docs(ci)
- Add "User Story Management" section (§13) to `.github/copilot-instructions.md` and `AGENTS.md`
- On every incoming work request Copilot now automatically scans `projects/somethings-happening/user-stories/` for similar or conflicting stories before doing any work; alerts the user if a conflict is found; otherwise silently adds the request to the user story scope (Flow A: extends an existing story, Flow B: creates a new story file from `STORY_TEMPLATE.md`)

---

## [0.4.1] – 2026-02-23

### docs(somethings-happening)
- Add `user-stories/` directory ported from `spacecowboyian/something-s-happening` repository
- Includes 11 epic subdirectories (user entry, event resolution, event creation, media aggregation, timeline presentation, event discovery, moderation, privacy, system administration, MVP infrastructure, user feed/personalization)
- Each epic contains a `README.md`, individual story `.md` files, and `frontend/` or `backend/` sub-subdirectories
- Root-level `README.md`, `QUICK_START.md`, and `STORY_TEMPLATE.md` included

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
