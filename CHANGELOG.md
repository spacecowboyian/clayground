# Changelog

All notable changes to Clayground are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Commits follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

---

## [Unreleased]

_Changes not yet pushed to `main` go here._

### feat(print-queue)
- **Bambu print import** — operators can now connect their Bambu Lab account and import recent print jobs directly as new work orders. A new "Bambu Integration" section in Farm Settings stores the access token and an optional CORS proxy URL locally (never sent to Supabase). An "Import from Bambu" button appears on the Orders dashboard when a token is configured; clicking it opens a dialog listing the 20 most recent successful print jobs (title, date, filament weight, print time, color swatch). Selecting a print pre-fills the New Work Order form with customer "New Print", model name derived from the print filename, filament color from the AMS slot, and a print-time/weight summary in Notes.

### fix(print-queue)
- Fix "can't save a new model" error (`invalid input syntax for type integer: ""`): migration 009 changes `models.number` from INTEGER to TEXT (the intended type; migration 003 was a no-op for databases where the column already existed as INTEGER). `createModel` and `updateModel` in `inventory.ts` now omit an empty catalog number from the payload so the DB column default applies when the migration has not yet been run.
- Remove duplicate AMS Slots section from the Print Queue page so the AMS block is shown only once.
- Fix "Add Order" modal being unresponsive to clicks and keyboard input: two `Dialog` portals were opening simultaneously (one desktop, one mobile) because both shared the same `addOpen` state; replaced the dual-Dialog approach with plain trigger buttons and a single conditional Dialog rendered outside the toolbar, matching the Edit/Delete dialog pattern.
- **Fix "Could not find the 'cost' column" save error** — migration 010 idempotently adds `cost`, `price`, and other potentially-missing `work_orders` columns via `ADD COLUMN IF NOT EXISTS`, covering databases that were created from an older schema.
- **Fix misleading "Unable to load data" modal on create-order failure** — `DashboardPage.handleCreate` now clears the Redux error on failure (matching the existing edit-order pattern), so save errors show only the inline form message instead of the global error modal.

### docs(somethings-happening)
- Append a user-story addition noting the AMS duplicate-rendering fix request.

### docs(print-queue)
- Clean up `projects/print-queue/user-stories/*` status tracking: set implemented stories to Completed, set new add-on/freemium stories to Not Started, and normalize metadata formatting so all stories use consistent checkbox sections for Status, Priority, and Estimated Complexity.

### feat(print-queue)
- **Payment verification workflow on order detail page** — unpaid orders now show a "Pay via Venmo" deeplink button (pre-filled with username `ian-jennings-17`, the order ID as memo, and the order price as amount) plus a separate "I've Sent Payment" button that moves the order into a new `verifying_payment` state.  The order detail page displays a contextual banner while payment is being verified.
- **Management dashboard payment indicators** — the DollarSign toggle in the orders table and mobile cards now shows an orange "⏳ Verifying" badge and orange DollarSign icon when an order's payment is in the `verifying_payment` state, allowing operators to quickly spot and confirm pending Venmo payments.
- **Migration 008** — adds a `payment_status` column to `work_orders` with enum `unpaid | verifying_payment | paid`, backfilled from the existing `paid` boolean.
- **Multi-filament order form** — when a model has more than one filament requirement (e.g. a two-color BB gun), the order form now renders one "Color" dropdown per requirement slot rather than a single dropdown. Each slot auto-populates with the model's assigned default filament (if any). If the selected filament has insufficient remaining stock the dropdown shows an error state (red border + message reading "must change") and saving is blocked until all slots have adequate stock. `OrderItem` gains a `filament_selections` array for per-slot persistence; `computeFilamentStats` attributes grams per slot for accurate inventory tracking; `calculateItemCost` now accepts a per-slot filaments array for accurate multi-filament costing. Gearhead `Select` gains an `errorMessage` prop and `isInvalid` red-border styling.

---

## [1.5.0] – 2026-03-12

### feat(print-queue)
- **Orders is now the home screen** — authenticated users landing on the root route are now redirected to `#/orders`, and successful login also routes to Orders first.
- **AMS slot controls added to the top of Print Queue** — the queue page now includes a 4-slot AMS section above the grouped print table with assign/clear controls for in-stock filaments.
- **Navigation order updated** — primary header nav now lists Orders before Print Queue to match the new default workflow.

### docs(somethings-happening)
- Added user story `06-002-default-entry-point-landing-page.md` to track the default landing-page request and acceptance criteria.
- **Order status is now derived automatically** — when any item in an order is set to `printing` the order status changes to `in_progress`; when all items are `complete` the order moves to `complete`. Order status can no longer be changed manually via the UI.
- **AMS Slots section added to Print Queue page** — the four AMS slot tiles (previously only on the Filaments page) now appear at the top of the Print Queue page so users can see and manage loaded filaments without navigating away.

---

## [1.4.1] – 2026-03-12

### fix(print-queue)
- **Edit work order no longer triggers misleading "Unable to load data" modal** — save failures now show an inline error inside the form instead of the full-screen ErrorModal that is intended for data-load failures. `handleEdit` catches the rejected thunk, clears the Redux error state, and re-throws so the form's catch block displays the message in context.
- **Actual Supabase error now shown to user** — all Redux thunks previously discarded the real database error message because `PostgrestError` objects (returned by `@supabase/supabase-js`) are not `Error` instances. A shared `extractMessage` utility (`src/utils/errors.ts`) now correctly extracts `.message` from both `Error` and plain-object errors, making the displayed message actionable (e.g. "column order_items does not exist — run migration 002").
- **WorkOrderForm save error shows error detail** — the form's catch block now uses the same `extractMessage` helper and surfaces the specific error rather than a static fallback string.

---

## [1.4.0] – 2026-03-12

### feat(print-queue)
- **Simplified orders table** — removed Price and Cost columns; only Profit is shown. Paid status moved out of its own column into the Actions column as a DollarSign icon that turns green when clicked (toggleable). Cancelled status removed entirely; orders are now deleted rather than cancelled.
- **Streamlined stats tiles** — removed Printing Now and In Queue tiles; added a "Due" tile showing the total amount still owed across all unpaid orders. Tile layout is now: Total Orders → Awaiting Payment → Due → Profit (paid).
- **Auto-calculated cost** — cost is now derived exclusively from filament usage and post-processing minutes; the manual Cost field has been removed from the Add/Edit Order form.
- **Fixed header layout** — removed the "/ Page Name" breadcrumb subtitle from the `AppHeader` so the navigation menu stays at a consistent horizontal position on every page.

---

## [1.3.0] – 2026-03-12

### feat(print-queue)
- **Multiple items per order** — `WorkOrder` now carries an `order_items: OrderItem[] | null` JSONB field; each item stores model, color, quantity, price, and cost. `WorkOrderForm` redesigned with add/remove item rows (model + color + qty per item). SQL migration `002_order_items.sql` adds the column to Supabase. Legacy single-item orders (null `order_items`) continue to work unchanged.
- **Shared `AppHeader` navigation** — new `AppHeader` component replaces per-page headers; Orders / Inventory / Settings always visible, left-aligned after the logo, with an active-state highlight on the current page. `Lock` button pushed to the right.
- **Wider modals on desktop** — gearhead `Dialog` now supports a `size` prop (`md` | `xl`); `--modal-max-w-xl: 42rem` CSS variable added to `theme.css`. All form dialogs (work order, model, filament) now use `xl`.
- **Sticky form footers** — action buttons in `WorkOrderForm`, `ModelForm`, and `FilamentForm` now use `sticky bottom-0` positioning so they remain visible while scrolling long forms, and a `border-b` separator added to the dialog header.
- **Fixed model-form horizontal overflow** — `ModelForm` qty field reduced from `w-28` to `w-20` to prevent the filament requirements row from exceeding the dialog width.
- **Order detail page logo** — corrected to use the icon-only `tinyprints-printer.svg` instead of the wordmark.
- **Order detail multi-item display** — `OrderDetailPage` shows a grouped items list when an order has multiple items.

## [1.2.1] – 2026-03-12

### fix(print-queue)
- **Supabase configuration error message** — updated error text in `storage.ts` and `inventory.ts` to explain both the local-dev fix (`.env.local`) and the deployed-build fix (GitHub Actions secrets + re-run the *Print Queue — Build & Deploy* workflow), resolving confusion when secrets are set in GitHub but the stale build is still deployed

### fix(ci)
- **`storybook.yml`** — added a print-queue rebuild step (with Supabase secrets) before uploading `docs/`, preventing the storybook deployment from overwriting a correct print-queue production build with a stale one
- **`deploy.yml`** — added a print-queue rebuild step that runs specifically on `workflow_run` triggers (PR preview / PR cleanup), ensuring `docs/print-queue/main/` always contains a fresh build with secrets even when the full project rebuild is skipped for performance
- **`pr-preview.yml`** — added missing `VITE_PRINT_QUEUE_PASSWORD` env var to the PR preview build step

---

## [1.2.0] – 2026-03-11

### feat(print-queue)
- **Redux state management** — `@reduxjs/toolkit` + `react-redux` added; root store configured with three slices: `ordersSlice`, `inventorySlice`, and `settingsSlice`
- **Supabase-only data** — `src/lib/storage.ts` and `src/lib/inventory.ts` no longer fall back to localStorage or seed data; all CRUD operations require a configured Supabase project and throw a descriptive error if credentials are missing
- **Error modal** — new `ErrorModal` component (full-screen overlay with Retry / Dismiss buttons) shown by Dashboard and Inventory pages when Supabase data cannot be loaded, replacing previous inline error text; `OrderDetailPage` also shows the modal on load failure
- **Redux-driven pages** — `DashboardPage`, `InventoryPage`, and `FarmSettingsPage` now read data from the Redux store via `useAppSelector` and dispatch async thunks (`fetchOrders`, `fetchInventory`, `addOrder`, `editOrder`, `removeOrder`, `reorderOrdersThunk`, and inventory counterparts) instead of managing their own data state
- **Farm settings in Redux** — `settingsSlice` seeds from localStorage on startup and persists changes back; pages read and write settings via `useAppSelector` / `dispatch(updateSettings(…))`
- **Removed "Demo mode" badge** — the orange "Demo mode" indicator is removed since the app now requires a real Supabase connection

---

## [1.1.1] – 2026-03-11

### fix(gearhead)
- **Full-page mobile edit screens** — the `Dialog` component now presents as a full-viewport page on mobile: the title/close header is locked to the top, the cancel/save footer is locked to the bottom, and the form content scrolls in between. On `sm+` (desktop) the centered modal behaviour is unchanged.

---

## [1.1.0] – 2026-03-11

### feat(print-queue)
- **Multi-filament model support** — `PrintModel` now stores `filament_requirements[]` (up to 4 entries), each with a `filament_id` and `quantity_g`, replacing the single `filament_usage_g` field
- **Self-created model flag** — models gain a `self_created: boolean` field; when enabled, the form labels the URL field "Source URL (optional)" and shows a helper note; model cards display a "Self-created" badge
- **Model image** — `image_url` was already supported; now surfaced more clearly as an optional field in the form alongside the self-created context
- **Filament selector in ModelForm** — each filament requirement row includes a dropdown over all catalogued filaments (any stock status) plus a "Not assigned" option
- **Costing update** — `calculateItemCost` now accepts the full filaments array and sums material cost across all assigned filament requirements; the `WorkOrderForm` cost display reflects this
- **Backward-compatible data migration** — existing localStorage records that have `filament_usage_g` but no `filament_requirements` are silently migrated on first load to a single unassigned requirement
- **InventoryPage model cards** — now display total filament usage, per-requirement breakdown with color chips (or "Unassigned" label), and the self-created badge
- **Filament quantity tracking** — `Filament` gains `current_quantity_g` (grams currently on hand); replaces the static roll-size display with a live quantity that reflects actual inventory
- **Filament purchase link** — `Filament` gains `purchase_url` (optional); a 🛒 shopping-cart button appears in the filament table when a URL is set, opening the link in a new tab
- **Reserved vs consumed filament** — new `computeFilamentStats(filaments, orders, models)` utility in `src/lib/inventory.ts` calculates per-filament `consumed_g` (completed orders), `reserved_g` (queued/printing orders), and `remaining_g` (on-hand minus reserved)
- **Inventory table — live stats columns** — filament table now shows On Hand / Reserved / Consumed / Remaining for every filament; color-coded: green = healthy, orange = low (< 100 g remaining), red = overcommitted (negative remaining)
- **Low stock and overcommitted indicators** — ↓ icon on filament color chip when stock is low; ⚠ icon when overcommitted; "low" / "overcommitted" label on the Remaining cell
- **Order form filament warning** — when selecting a model + filament, the form computes whether enough filament remains after existing reservations; if not, an orange warning banner is shown (order is still creatable)
- `FilamentForm` updated: new "Current Quantity on Hand (g)" and "Purchase Link (optional)" fields
- `WorkOrderForm` gains `orders` prop for filament availability checking
- Seed data updated: all default filaments seeded with `current_quantity_g: 1000` and `purchase_url: ''`

---

## [1.0.0] – 2026-03-11

### feat(print-queue)
- **Data-driven order costing** — cost per order is now calculated automatically from filament and labor inputs instead of relying on a manually entered value
- **Filament roll data** — `Filament` gains `roll_cost` (USD) and `roll_size_g` (grams); used to derive material cost per gram
- **Model costing data** — `PrintModel` gains `filament_usage_g` (grams per print) and `post_processing_mins` (manual labor time); used to derive material and labor cost per item
- **Farm Settings page** (`#/settings`) — configurable labor rate (default $30/hour) stored in localStorage; linked from the dashboard header "Settings" button
- **Auto-calculated cost in order form** — selecting a model + filament automatically fills the Cost field with a material + labor breakdown; the user can still override it manually, and a "↺ Reset to calculated" link restores the auto value
- **"Other" filament material** — choosing "Other" in the Material dropdown reveals a free-text field for custom material names (e.g. Nylon, PA-CF); stored value is the typed name, not the literal string "Other"
- **Inventory: clickable model images** — when a model has both an image URL and a model URL, the image is wrapped in a link that opens the external model page in a new tab; a subtle hover-dim indicates it is clickable
- **Order form shortcuts** — "＋ Add a new model" and "＋ Add a new filament" links inside the New/Edit Order dialog close the dialog and navigate directly to the Inventory page
- **Dashboard Settings button** — gear icon + "Settings" label added to the dashboard header alongside the existing Inventory button
- New utility `src/lib/costing.ts`: `calculateItemCost(model, filament, laborRate)` returns `{ material_cost, labor_cost, total_cost }`
- New `src/lib/settings.ts` + `src/types/FarmSettings.ts` for localStorage-backed farm settings
- Seed data updated: models seeded with `filament_usage_g` / `post_processing_mins`; filaments seeded with `roll_cost: 20` / `roll_size_g: 1000`

---

## [0.9.0] – 2026-03-11

### feat(gearhead)
- New `Accordion` component built on `react-aria-components` `Disclosure` — collapsible panel with animated chevron, optional badge, and `defaultExpanded` prop
- Storybook story: `Default`, `WithBadge`, `DefaultExpanded`
- Exported from `@gearhead/ui`

### feat(print-queue)
- **Price & cost fields** — every work order now stores `price` (default $5) and `cost` (default $2); profit = price − cost displayed per row and in a new stat card
- **Drag-to-reorder** — active queue rows have a grip handle; drag-and-drop reorders them and persists `sort_order` to localStorage (and Supabase when configured)
- **Completed & Cancelled accordion** — done items move to a collapsible section below the active queue (collapsed by default) powered by the new Gearhead `Accordion`
- **Mobile paid toggle** — replaced static "Paid/Unpaid" text in mobile cards with an interactive `Switch` that saves immediately
- **New dashboard header logo** — 3D-printer-with-heart illustration (`tinyprints-printer.svg`); login page retains the original `tinyprints-logo.svg`
- **Price/Cost/Profit columns** added to desktop table for both active and completed sections
- **Profit stat card** (`$X.XX`) added to the 5-card stats row — counts only paid, non-cancelled orders
- `sort_order` field added to `WorkOrder` type; `reorderOrders(ids[])` added to `storage.ts`
- Seed data updated with `price: 5`, `cost: 2`, `sort_order` for all 9 demo orders
- `WorkOrderForm` gains two `NumberField` inputs (Price / Cost) with USD currency formatting

---

## [0.8.0] – 2026-03-11

### feat(print-queue)
- New project: **Tiny Prints — Print Queue** — 3-D print work-order tracker
- Password-protected management dashboard (`#/dashboard`) with status filter tabs and stats bar
- Full CRUD: add, edit, and delete work orders via React Aria dialog forms
- Inline status dropdown (Queue → Printing → Complete → Cancelled) and paid toggle per row
- Shareable public per-order links (`#/order/:id`) — no password required to view
- Color swatches render named filament colors (pink, purple, light blue, dark blue, yellow, etc.)
- Supabase PostgreSQL backend with public RLS policies; graceful localStorage fallback for demo mode
- Seed data pre-loaded with Karen coworker's 9 initial orders
- Responsive layout: table on desktop, card layout on mobile
- SVG logo for Tiny Prints brand; `tinyprints-logo.svg` in `public/`
- README with step-by-step Supabase setup, SQL schema, and seeding instructions
- Registered in `docs/projects.json`

---

## [0.7.0] – 2026-02-27

### feat(somethings-happening)
- Replace plain YouTube `<iframe>` with the YouTube IFrame Player API so that native
  YouTube controls receive touch events on iPhone / mobile Chrome
- Remove the `mobileTapLayer` overlay when the active moment is a YouTube video,
  allowing the YouTube player to handle taps directly
- Add real-time playback progress and duration tracking for YouTube items via
  `YT.Player` event listeners and a 200 ms poll; eliminates the incorrect 10-second
  text timer that was used as a placeholder
- Add `progress` and `duration` props to `MomentCard`; active cards now render a
  thin blue progress bar (matching the design accent colour) that fills as the
  moment plays back
## [0.6.4] – 2026-02-27

### chore(bpsds)
- Remove Bass Pro Shops Design System project (`projects/bpsds/`, `docs/bpsds/`) and its entry from `docs/projects.json`

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
