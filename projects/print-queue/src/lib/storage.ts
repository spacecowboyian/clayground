import { supabase, isSupabaseConfigured } from './supabase'
import type { WorkOrder, WorkOrderInput } from '../types/WorkOrder'

// ── Seed data ──────────────────────────────────────────────────────────────────
const KAREN_URL_HEART =
  'https://makerworld.com/en/models/644775-heart-curio-trinket-shelf?from=search#profileId-570867'
const KAREN_URL_HOTWHEELS =
  'https://makerworld.com/en/models/851161-hot-wheels-shelf-for-10-cars?from=search#profileId-799264'
const KAREN_URL_UNO =
  'https://makerworld.com/en/models/2175464-simple-customizable-card-box-parametric#profileId-2360117'

// ── Seed templates (no id — generated fresh at seed time) ─────────────────────
type SeedTemplate = Omit<WorkOrder, 'id' | 'created_at' | 'updated_at'>

const SEED_TEMPLATES: SeedTemplate[] = [
  { customer: 'Karen coworker', item: 'Heart curio shelf',   color: 'Pink',       model_url: KAREN_URL_HEART,     status: 'Complete',  paid: false, notes: '', price: 5, cost: 2, sort_order: 1, model_id: null, needs_filament: false },
  { customer: 'Karen coworker', item: 'Heart curio shelf',   color: 'Purple',     model_url: KAREN_URL_HEART,     status: 'Complete',  paid: false, notes: '', price: 5, cost: 2, sort_order: 2, model_id: null, needs_filament: false },
  { customer: 'Karen coworker', item: 'Heart curio shelf',   color: 'Light Blue', model_url: KAREN_URL_HEART,     status: 'Printing',  paid: false, notes: '', price: 5, cost: 2, sort_order: 3, model_id: null, needs_filament: false },
  { customer: 'Karen coworker', item: 'Heart curio shelf',   color: 'Light Blue', model_url: KAREN_URL_HEART,     status: 'Queue',     paid: false, notes: '', price: 5, cost: 2, sort_order: 4, model_id: null, needs_filament: false },
  { customer: 'Karen coworker', item: 'Heart curio shelf',   color: 'Purple',     model_url: KAREN_URL_HEART,     status: 'Queue',     paid: false, notes: '', price: 5, cost: 2, sort_order: 5, model_id: null, needs_filament: false },
  { customer: 'Karen coworker', item: 'Heart curio shelf',   color: 'Yellow',     model_url: KAREN_URL_HEART,     status: 'Queue',     paid: false, notes: '', price: 5, cost: 2, sort_order: 6, model_id: null, needs_filament: false },
  { customer: 'Karen coworker', item: 'Hot Wheels shelf',    color: 'Dark Blue',  model_url: KAREN_URL_HOTWHEELS, status: 'Queue',     paid: false, notes: '', price: 5, cost: 2, sort_order: 7, model_id: null, needs_filament: false },
  { customer: 'Karen coworker', item: 'Hot Wheels shelf',    color: 'Dark Blue',  model_url: KAREN_URL_HOTWHEELS, status: 'Queue',     paid: false, notes: '', price: 5, cost: 2, sort_order: 8, model_id: null, needs_filament: false },
  { customer: 'Karen coworker', item: 'Uno card holder',     color: 'TBD',        model_url: KAREN_URL_UNO,       status: 'Queue',     paid: false, notes: '', price: 5, cost: 2, sort_order: 9, model_id: null, needs_filament: false },
]

const LS_KEY = 'print_queue_orders'

function now(): string {
  return new Date().toISOString()
}

// ── LocalStorage helpers ───────────────────────────────────────────────────────
function lsLoad(): WorkOrder[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) return JSON.parse(raw) as WorkOrder[]
  } catch {
    // ignore
  }
  // First-time seed — generate fresh UUIDs here, not at module load
  const seeded: WorkOrder[] = SEED_TEMPLATES.map(t => ({
    id: crypto.randomUUID(),
    ...t,
    created_at: now(),
    updated_at: now(),
  }))
  localStorage.setItem(LS_KEY, JSON.stringify(seeded))
  return seeded
}

function lsSave(orders: WorkOrder[]): void {
  localStorage.setItem(LS_KEY, JSON.stringify(orders))
}

// ── Public API ─────────────────────────────────────────────────────────────────
export async function listOrders(): Promise<WorkOrder[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('work_orders')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) throw error
    return (data ?? []) as WorkOrder[]
  }
  return lsLoad()
}

export async function getOrder(id: string): Promise<WorkOrder | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('work_orders')
      .select('*')
      .eq('id', id)
      .single()
    if (error) return null
    return data as WorkOrder
  }
  return lsLoad().find(o => o.id === id) ?? null
}

export async function createOrder(input: WorkOrderInput): Promise<WorkOrder> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('work_orders')
      .insert([input])
      .select()
      .single()
    if (error) throw error
    return data as WorkOrder
  }
  const order: WorkOrder = { id: crypto.randomUUID(), ...input, created_at: now(), updated_at: now() }
  const orders = lsLoad()
  lsSave([...orders, order])
  return order
}

export async function updateOrder(id: string, patch: Partial<WorkOrderInput>): Promise<WorkOrder> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('work_orders')
      .update({ ...patch, updated_at: now() })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data as WorkOrder
  }
  const orders = lsLoad()
  const idx = orders.findIndex(o => o.id === id)
  if (idx === -1) throw new Error('Order not found')
  const updated = { ...orders[idx], ...patch, updated_at: now() }
  orders[idx] = updated
  lsSave(orders)
  return updated
}

export async function deleteOrder(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('work_orders').delete().eq('id', id)
    if (error) throw error
    return
  }
  const orders = lsLoad().filter(o => o.id !== id)
  lsSave(orders)
}

export async function reorderOrders(orderedIds: string[]): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    await Promise.all(
      orderedIds.map((id, idx) =>
        supabase!
          .from('work_orders')
          .update({ sort_order: idx + 1, updated_at: now() })
          .eq('id', id)
      )
    )
    return
  }
  const orders = lsLoad()
  const idSet = new Set(orderedIds)
  // Apply new sort_order values to the reordered items
  const updated = orders.map(o => {
    const pos = orderedIds.indexOf(o.id)
    if (pos === -1) return o
    return { ...o, sort_order: pos + 1, updated_at: now() }
  })
  // Stable re-sort: reordered items by sort_order, non-reordered items keep
  // their original relative positions (sorted by created_at as tie-break)
  updated.sort((a, b) => {
    const aIn = idSet.has(a.id)
    const bIn = idSet.has(b.id)
    if (aIn && bIn) return a.sort_order - b.sort_order
    if (aIn) return -1   // active items before completed
    if (bIn) return 1
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  })
  lsSave(updated)
}
