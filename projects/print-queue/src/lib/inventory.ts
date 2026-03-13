import { supabase, isSupabaseConfigured } from './supabase'
import type { PrintModel, PrintModelInput, Filament, FilamentInput, FilamentStats } from '../types/Inventory'
import type { WorkOrder } from '../types/WorkOrder'

function now(): string {
  return new Date().toISOString()
}

function requireSupabase(): NonNullable<typeof supabase> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      'Supabase is not configured. ' +
      'For local development, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file. ' +
      'For deployed builds, add these as GitHub Actions secrets and trigger a new build via the ' +
      '"Print Queue — Build & Deploy" workflow (Actions → Print Queue — Build & Deploy → Run workflow).'
    )
  }
  return supabase
}

// ── Models public API ──────────────────────────────────────────────────────────
export async function listModels(): Promise<PrintModel[]> {
  const db = requireSupabase()
  const { data, error } = await db
    .from('models')
    .select('*')
    .order('name', { ascending: true })
  if (error) throw error
  return (data ?? []) as PrintModel[]
}

export async function createModel(input: PrintModelInput): Promise<PrintModel> {
  const db = requireSupabase()
  // When the catalog number is empty, omit the field entirely so the database
  // column default applies.  This prevents "invalid input syntax for type
  // integer" on databases where models.number is still INTEGER (pre-migration
  // 009); the primary fix is migration 009 which changes the column to TEXT.
  const { number, ...rest } = input
  const row = number !== '' ? { ...rest, number } : rest
  const { data, error } = await db
    .from('models')
    .insert([row])
    .select()
    .single()
  if (error) throw error
  return data as PrintModel
}

export async function updateModel(id: string, patch: Partial<PrintModelInput>): Promise<PrintModel> {
  const db = requireSupabase()
  // Same guard as createModel: omit an empty number so the existing column
  // value is preserved on databases where the column is still INTEGER.
  const { number, ...fields } = patch
  const payload: Record<string, unknown> = {
    ...fields,
    updated_at: now(),
    ...(number !== undefined && number !== '' ? { number } : {}),
  }
  const { data, error } = await db
    .from('models')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as PrintModel
}

export async function deleteModel(id: string): Promise<void> {
  const db = requireSupabase()
  const { error } = await db.from('models').delete().eq('id', id)
  if (error) throw error
}

// ── Filaments public API ───────────────────────────────────────────────────────
export async function listFilaments(): Promise<Filament[]> {
  const db = requireSupabase()
  const { data, error } = await db
    .from('filaments')
    .select('*')
    .order('color', { ascending: true })
  if (error) throw error
  return (data ?? []) as Filament[]
}

export async function createFilament(input: FilamentInput): Promise<Filament> {
  const db = requireSupabase()
  const { data, error } = await db
    .from('filaments')
    .insert([input])
    .select()
    .single()
  if (error) throw error
  return data as Filament
}

export async function updateFilament(id: string, patch: Partial<FilamentInput>): Promise<Filament> {
  const db = requireSupabase()
  const { data, error } = await db
    .from('filaments')
    .update({ ...patch, updated_at: now() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Filament
}

export async function deleteFilament(id: string): Promise<void> {
  const db = requireSupabase()
  const { error } = await db.from('filaments').delete().eq('id', id)
  if (error) throw error
}

// ── Filament stats ─────────────────────────────────────────────────────────────

const ACTIVE_STATUSES   = new Set<string>(['waiting', 'in_progress'])
const COMPLETE_STATUSES = new Set<string>(['complete'])

/**
 * Compute per-filament inventory stats (consumed, reserved, remaining) based
 * on the current list of work orders and models.
 *
 * For multi-item orders, consumed/reserved is determined by each item's own
 * status ('complete' = consumed, 'queue'/'printing' = reserved). For legacy
 * single-item orders the order-level status is used instead.
 *
 * Cancelled orders are excluded entirely.
 */
export function computeFilamentStats(
  filaments: Filament[],
  orders: WorkOrder[],
  models: PrintModel[],
): FilamentStats[] {
  const modelMap = new Map(models.map(m => [m.id, m]))

  return filaments.map(f => {
    let consumed_g = 0
    let reserved_g = 0

    for (const order of orders) {
      if (order.status === 'cancelled') continue

      if (order.order_items && order.order_items.length > 0) {
        for (const item of order.order_items) {
          const isItemComplete = item.status === 'complete'
          const isItemActive   = item.status === 'queue' || item.status === 'printing'
          if (!isItemComplete && !isItemActive) continue

          const matches = item.filament_id
            ? item.filament_id === f.id
            : item.color.toLowerCase() === f.color.toLowerCase()
          if (!matches) continue

          const model = item.model_id ? modelMap.get(item.model_id) : null
          if (!model) continue

          // Compute grams attributed to this filament for the item.
          // After migration 006 all model requirements have filament_id=null
          // (colour-agnostic). For both new-style items (explicit filament_id)
          // and legacy items (colour-string only) we therefore sum the
          // null-filament_id requirements. If — for pre-migration models — some
          // requirements still carry a specific filament_id, we fall back to
          // the total across all requirements so the estimate is still useful.
          const nullReqs = model.filament_requirements.filter(r => r.filament_id === null)
          const reqG = nullReqs.length > 0
            ? nullReqs.reduce((sum, r) => sum + r.quantity_g, 0)
            : model.filament_requirements.reduce((sum, r) => sum + r.quantity_g, 0)
          const totalG = reqG * (item.quantity ?? 1)

          if (isItemComplete) consumed_g += totalG
          else                reserved_g += totalG
        }
      } else {
        // Legacy single-item order — use order-level status
        const isActive   = ACTIVE_STATUSES.has(order.status)
        const isComplete = COMPLETE_STATUSES.has(order.status)
        if (!isActive && !isComplete) continue

        if (order.color.toLowerCase() !== f.color.toLowerCase()) continue
        const model = order.model_id ? modelMap.get(order.model_id) : null
        const totalG = model
          ? model.filament_requirements.reduce((sum, r) => sum + r.quantity_g, 0)
          : 0
        if (isComplete) consumed_g += totalG
        else            reserved_g += totalG
      }
    }

    return {
      filament_id: f.id,
      consumed_g,
      reserved_g,
      remaining_g: f.current_quantity_g - reserved_g - consumed_g,
    }
  })
}
