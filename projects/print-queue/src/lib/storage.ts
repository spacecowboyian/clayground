import { supabase, isSupabaseConfigured } from './supabase'
import type { WorkOrder, WorkOrderInput, PaymentStatus } from '../types/WorkOrder'

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

// ── Public API ─────────────────────────────────────────────────────────────────

export async function listOrders(): Promise<WorkOrder[]> {
  const db = requireSupabase()
  const { data, error } = await db
    .from('work_orders')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as WorkOrder[]
}

export async function getOrder(id: string): Promise<WorkOrder | null> {
  const db = requireSupabase()
  const { data, error } = await db
    .from('work_orders')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data as WorkOrder
}

export async function createOrder(input: WorkOrderInput): Promise<WorkOrder> {
  const db = requireSupabase()
  const { data, error } = await db
    .from('work_orders')
    .insert([input])
    .select()
    .single()
  if (error) throw error
  return data as WorkOrder
}

export async function updateOrder(id: string, patch: Partial<WorkOrderInput>): Promise<WorkOrder> {
  const db = requireSupabase()
  const { data, error } = await db
    .from('work_orders')
    .update({ ...patch, updated_at: now() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as WorkOrder
}

export async function deleteOrder(id: string): Promise<void> {
  const db = requireSupabase()
  const { error } = await db.from('work_orders').delete().eq('id', id)
  if (error) throw error
}

export async function reorderOrders(orderedIds: string[]): Promise<void> {
  const db = requireSupabase()
  await Promise.all(
    orderedIds.map((id, idx) =>
      db
        .from('work_orders')
        .update({ sort_order: idx + 1, updated_at: now() })
        .eq('id', id)
    )
  )
}

/**
 * Update only the payment_status field for an order.
 * Also keeps the legacy `paid` boolean in sync:
 *   paid → paid = true
 *   unpaid | verifying_payment → paid = false
 *
 * This is intentionally a narrow update so the public order detail page
 * can call it without needing management credentials.
 */
export async function updatePaymentStatus(id: string, status: PaymentStatus): Promise<WorkOrder> {
  const db = requireSupabase()
  const patch: Record<string, unknown> = {
    payment_status: status,
    paid: status === 'paid',
    updated_at: now(),
  }
  const { data, error } = await db
    .from('work_orders')
    .update(patch)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as WorkOrder
}
