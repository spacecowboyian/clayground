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
  const { data, error } = await db
    .from('models')
    .insert([input])
    .select()
    .single()
  if (error) throw error
  return data as PrintModel
}

export async function updateModel(id: string, patch: Partial<PrintModelInput>): Promise<PrintModel> {
  const db = requireSupabase()
  const { data, error } = await db
    .from('models')
    .update({ ...patch, updated_at: now() })
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

const ACTIVE_STATUSES   = new Set<string>(['Queue', 'Printing'])
const COMPLETE_STATUSES = new Set<string>(['Complete'])

function totalRequiredG(modelMap: Map<string, PrintModel>, modelId: string | null): number {
  if (!modelId) return 0
  const model = modelMap.get(modelId)
  if (!model) return 0
  return model.filament_requirements.reduce((sum, r) => sum + r.quantity_g, 0)
}

/**
 * Compute per-filament inventory stats (consumed, reserved, remaining) based
 * on the current list of work orders and models.
 *
 * Filament is matched to orders by color name (case-insensitive).
 * Orders with no model_id, or whose model cannot be found, contribute 0 g.
 */
export function computeFilamentStats(
  filaments: Filament[],
  orders: WorkOrder[],
  models: PrintModel[],
): FilamentStats[] {
  const modelMap = new Map(models.map(m => [m.id, m]))

  return filaments.map(f => {
    const matchingOrders = orders.filter(
      o => o.color.toLowerCase() === f.color.toLowerCase()
    )

    const consumed_g = matchingOrders
      .filter(o => COMPLETE_STATUSES.has(o.status))
      .reduce((sum, o) => sum + totalRequiredG(modelMap, o.model_id), 0)

    const reserved_g = matchingOrders
      .filter(o => ACTIVE_STATUSES.has(o.status))
      .reduce((sum, o) => sum + totalRequiredG(modelMap, o.model_id), 0)

    return {
      filament_id: f.id,
      consumed_g,
      reserved_g,
      remaining_g: f.current_quantity_g - reserved_g,
    }
  })
}
