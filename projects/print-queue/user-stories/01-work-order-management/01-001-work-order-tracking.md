# 3D Print Work Order Tracking System

## Status
- [ ] Not Started
- [x] In Progress
- [ ] Completed

## User Story
As a 3D print shop operator,
I want a shared work order tracking system accessible from any browser,
So that I and my helpers can view and manage print jobs without needing individual logins.

## Acceptance Criteria
- [x] A table displays all work orders (Customer, Item, Color, Model URL, Status, Paid, Notes)
- [x] Anyone with the management link + password can add, edit, and delete work orders
- [x] Anyone with an individual order link can view that order without a password
- [x] Status can be set to Queue, Printing, Complete, or Cancelled
- [x] Paid toggle can be flipped to mark an order as paid
- [x] Data is stored in Supabase so all users see the same live data
- [x] Initial seed data from the customer order list is pre-loaded
- [x] A shareable per-order URL exists (#/order/:id)
- [x] Password is client-side (env var) and protects the management dashboard

## Technical Notes
- Project: `projects/print-queue`
- Stack: React 19 + Vite + TypeScript + @gearhead/ui + Tailwind CSS v4
- Database: Supabase (PostgreSQL) with public read/write RLS policies
- Routing: Hash-based (#/login, #/dashboard, #/order/:id)
- Password: Stored as VITE_PRINT_QUEUE_PASSWORD in .env.local
- Fallback: LocalStorage when Supabase is not configured (single-browser only)

## Dependencies
- Supabase project (free tier) with `work_orders` table
- GitHub Actions secrets: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY

## Priority
- [x] Critical (MVP)
- [ ] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [ ] Small (1-2 days)
- [x] Medium (3-5 days)
- [ ] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)

## Implementation Details
- `lib/storage.ts` abstracts Supabase vs localStorage
- `lib/supabase.ts` initializes the Supabase client from env vars
- Hash router reads `window.location.hash` and listens to `hashchange`
- Password stored in `sessionStorage` for the current browser session
- Individual order URLs: `#/order/<uuid>` — no password gate

## Testing Notes
- Verify all CRUD operations update live data in Supabase
- Verify #/order/:id works without login
- Verify dashboard redirects to login when not authenticated
- Verify sharing an individual order URL works from incognito
