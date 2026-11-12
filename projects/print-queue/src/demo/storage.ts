import type { WorkOrder, WorkOrderInput, PaymentStatus } from '../types/WorkOrder'
import { initialOrders } from './data'

let orders: WorkOrder[] = initialOrders()
let counter = 1000

const now = () => new Date().toISOString()
const sorted = () => [...orders].sort((a, b) => a.sort_order - b.sort_order)

export async function listOrders(): Promise<WorkOrder[]> {
  return structuredClone(sorted())
}

export async function getOrder(id: string): Promise<WorkOrder | null> {
  const found = orders.find(o => o.id === id)
  return found ? structuredClone(found) : null
}

export async function createOrder(input: WorkOrderInput): Promise<WorkOrder> {
  counter += 1
  const created: WorkOrder = {
    ...structuredClone(input),
    id: `00000000-0000-4000-8000-${String(counter).padStart(12, '0')}`,
    order_number: Math.max(0, ...orders.map(o => o.order_number)) + 1,
    created_at: now(),
    updated_at: now(),
  }
  orders = [...orders, created]
  return structuredClone(created)
}

export async function updateOrder(id: string, patch: Partial<WorkOrderInput>): Promise<WorkOrder> {
  const idx = orders.findIndex(o => o.id === id)
  if (idx < 0) throw new Error('Order not found')
  orders[idx] = { ...orders[idx], ...structuredClone(patch), updated_at: now() }
  return structuredClone(orders[idx])
}

export async function deleteOrder(id: string): Promise<void> {
  orders = orders.filter(o => o.id !== id)
}

export async function reorderOrders(orderedIds: string[]): Promise<void> {
  orderedIds.forEach((id, idx) => {
    const o = orders.find(x => x.id === id)
    if (o) o.sort_order = idx + 1
  })
}

export async function updatePaymentStatus(id: string, status: PaymentStatus): Promise<WorkOrder> {
  return updateOrder(id, { payment_status: status, paid: status === 'paid' })
}
