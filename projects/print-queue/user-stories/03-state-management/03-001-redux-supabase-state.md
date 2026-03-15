# Redux + Supabase State Management

## Status
- [ ] Not Started
- [ ] In Progress
- [x] Completed

## User Story
As a print shop operator,
I want the app to use Redux for centralized state management with Supabase as the sole data source,
So that all sections of the app show consistent real data and I receive a clear error modal if the backend is unavailable.

## Acceptance Criteria
- [x] Redux Toolkit is configured with slices for orders, inventory (models + filaments), and settings
- [x] Initial state for orders, models, and filaments is loaded exclusively from Supabase (no localStorage fallback for data)
- [x] Farm settings (labor rate) are managed through a Redux slice, persisted to localStorage
- [x] If Supabase is not configured or a data fetch fails, an error modal is displayed with an appropriate message
- [x] No placeholder / seed data is shown in the UI — only real records from Supabase
- [x] All CRUD operations (create, update, delete, reorder) go through Redux async thunks that write to Supabase
- [x] The error modal has a Retry button that re-triggers data fetching
- [x] All pages (Dashboard, Inventory, Settings) read data from the Redux store via selectors

## Technical Notes
- Uses `@reduxjs/toolkit` (createSlice, createAsyncThunk) and `react-redux` (Provider, useSelector, useDispatch)
- `src/store/index.ts` — root store config + typed hooks
- `src/store/ordersSlice.ts` — WorkOrder[] state + thunks (fetchOrders, addOrder, editOrder, removeOrder, reorderOrders)
- `src/store/inventorySlice.ts` — PrintModel[] + Filament[] state + thunks
- `src/store/settingsSlice.ts` — FarmSettings state backed by localStorage
- `src/lib/storage.ts` and `src/lib/inventory.ts` — localStorage fallback paths removed; functions throw if Supabase is not configured
- `src/components/ErrorModal/ErrorModal.tsx` — Dialog-based error modal used by Dashboard and Inventory pages

## Dependencies
- `@reduxjs/toolkit ^2.x`
- `react-redux ^9.x`
- Supabase project with `work_orders`, `models`, and `filaments` tables (schema in `supabase/migrations/001_initial_schema.sql`)

## Priority
- [ ] Critical (MVP)
- [x] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [ ] Small (1-2 days)
- [x] Medium (3-5 days)
- [ ] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)
