export type WorkOrderStatus = 'Queue' | 'Printing' | 'Complete'

/** A single item line within a multi-item work order */
export interface OrderItem {
  model_id: string | null
  /** Model/item name */
  item: string
  /** Selected filament color */
  color: string
  /** External model URL */
  model_url: string
  /** True when this item's color requires purchasing a new filament roll (+$5 surcharge) */
  needs_filament: boolean
  /** How many of this item to print */
  quantity: number
  /** Price contribution for this line item */
  price: number
  /** Estimated cost for this line item */
  cost: number
}

export interface WorkOrder {
  id: string
  customer: string
  /** Legacy single-item name — also holds the first item name for multi-item orders */
  item: string
  /** Legacy single-item color — also holds the first item color for multi-item orders */
  color: string
  model_url: string
  status: WorkOrderStatus
  paid: boolean
  notes: string
  price: number
  cost: number
  sort_order: number
  /** FK to models table — null for orders created before inventory was added */
  model_id: string | null
  /** True when the order color requires purchasing a new filament roll (+$5 surcharge) */
  needs_filament: boolean
  /** Multiple items in this order. Null for legacy single-item orders. */
  order_items: OrderItem[] | null
  created_at: string
  updated_at: string
}

export type WorkOrderInput = Omit<WorkOrder, 'id' | 'created_at' | 'updated_at'>
