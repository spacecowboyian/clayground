import type { PrintModel, Filament } from '../types/Inventory'
import type { WorkOrder, OrderItem } from '../types/WorkOrder'

const T = '2025-01-15T12:00:00.000Z'

const id = (n: number) => `00000000-0000-4000-8000-${String(n).padStart(12, '0')}`

export const FILAMENT_IDS = { black: id(101), white: id(102), orange: id(103), blue: id(104) }
export const MODEL_IDS = { dragon: id(201), planter: id(202), phone: id(203), keychain: id(204) }

export function initialFilaments(): Filament[] {
  const base = { brand: 'Demo Filament Co.', material: 'PLA', status: 'in_stock' as const, roll_cost: 20, roll_size_g: 1000, purchase_url: 'https://example.com/demo-filament', created_at: T, updated_at: T }
  return [
    { ...base, id: FILAMENT_IDS.black, color: 'Black', color_hex: '#1a1a1a', current_quantity_g: 820, ams_slot: 1 },
    { ...base, id: FILAMENT_IDS.white, color: 'White', color_hex: '#f5f5f5', current_quantity_g: 640, ams_slot: 2 },
    { ...base, id: FILAMENT_IDS.orange, color: 'Orange', color_hex: '#f97316', current_quantity_g: 410, ams_slot: 3 },
    { ...base, id: FILAMENT_IDS.blue, color: 'Blue', color_hex: '#2563eb', current_quantity_g: 90, ams_slot: null, status: 'on_order' },
  ]
}

export function initialModels(): PrintModel[] {
  const base = { image_url: '', model_url: '', self_created: true, created_at: T, updated_at: T }
  return [
    { ...base, id: MODEL_IDS.dragon, name: 'Articulated Dragon', description: 'Print-in-place flexi dragon', self_created: false, model_url: 'https://example.com/demo-dragon', filament_requirements: [{ filament_id: null, quantity_g: 55 }], post_processing_mins: 10 },
    { ...base, id: MODEL_IDS.planter, name: 'Geometric Planter', description: 'Small desk planter', filament_requirements: [{ filament_id: null, quantity_g: 70 }, { filament_id: null, quantity_g: 15 }], post_processing_mins: 5 },
    { ...base, id: MODEL_IDS.phone, name: 'Phone Stand', description: 'Adjustable phone stand', filament_requirements: [{ filament_id: null, quantity_g: 40 }], post_processing_mins: 0 },
    { ...base, id: MODEL_IDS.keychain, name: 'Name Keychain', description: 'Custom name keychain', filament_requirements: [{ filament_id: null, quantity_g: 8 }], post_processing_mins: 3 },
  ]
}

function item(modelId: string, name: string, color: string, filamentId: string, status: OrderItem['status'], quantity: number, price: number, cost: number): OrderItem {
  return { model_id: modelId, item: name, color, filament_id: filamentId, model_url: '', needs_filament: false, quantity, price, cost, status, filament_selections: null }
}

function order(n: number, customer: string, items: OrderItem[], status: WorkOrder['status'], payment: WorkOrder['payment_status'], notes: string): WorkOrder {
  return {
    id: id(300 + n), order_number: n, customer, item: items[0].item, color: items[0].color, model_url: 'https://example.com/demo-model',
    status, paid: payment === 'paid', payment_status: payment, notes,
    price: items.reduce((s, i) => s + i.price * i.quantity, 0),
    cost: items.reduce((s, i) => s + i.cost * i.quantity, 0),
    sort_order: n, model_id: items[0].model_id, needs_filament: false, order_items: items,
    created_at: T, updated_at: T,
  }
}

export function initialOrders(): WorkOrder[] {
  const F = FILAMENT_IDS, M = MODEL_IDS
  return [
    order(1, 'Alex Demo', [
      item(M.dragon, 'Articulated Dragon', 'Orange', F.orange, 'printing', 1, 18, 3),
      item(M.keychain, 'Name Keychain', 'Black', F.black, 'queue', 2, 6, 1),
    ], 'in_progress', 'paid', 'Fake order for demo purposes'),
    order(2, 'Sam Sample', [item(M.planter, 'Geometric Planter', 'White', F.white, 'queue', 1, 14, 2.5)], 'waiting', 'unpaid', ''),
    order(3, 'Jordan Placeholder', [
      item(M.phone, 'Phone Stand', 'Blue', F.blue, 'complete', 2, 10, 1.5),
    ], 'complete', 'paid', 'Picked up'),
    order(4, 'Riley Example', [
      item(M.dragon, 'Articulated Dragon', 'Black', F.black, 'queue', 1, 18, 3),
      item(M.phone, 'Phone Stand', 'White', F.white, 'queue', 1, 10, 1.5),
    ], 'waiting', 'verifying_payment', 'Waiting on payment check'),
  ]
}
