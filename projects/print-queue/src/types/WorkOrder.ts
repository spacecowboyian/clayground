/** Status of a whole work order */
export type WorkOrderStatus = 'waiting' | 'in_progress' | 'complete' | 'cancelled'

/** Per-item print status within a work order */
export type PrintItemStatus = 'queue' | 'printing' | 'complete'

/**
 * Payment lifecycle for an order.
 * - unpaid            – customer has not sent payment
 * - verifying_payment – customer clicked "I've Sent Payment"; awaiting
 *                       operator confirmation via Venmo
 * - paid              – operator has confirmed payment
 */
export type PaymentStatus = 'unpaid' | 'verifying_payment' | 'paid'

/** A single item line within a multi-item work order */
export interface OrderItem {
  model_id: string | null
  /** Model/item name */
  item: string
  /** Selected filament color for slot 0 (kept for backward compat) */
  color: string
  /** FK to filaments.id for slot 0 — captured at save time. Null for custom/special colors or pre-migration items. */
  filament_id: string | null
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
  /** Per-item print status. Defaults to 'queue' for new items. */
  status: PrintItemStatus
  /**
   * Per-slot filament selections for models with multiple filament requirements.
   * Index i corresponds to model.filament_requirements[i].
   * Null for legacy single-filament items (fall back to filament_id + color).
   */
  filament_selections: Array<{ filament_id: string | null; color: string }> | null
}

export interface WorkOrder {
  id: string
  /** Sequential human-readable order identifier, assigned automatically by the database. */
  order_number: number
  customer: string
  /** Legacy single-item name — also holds the first item name for multi-item orders */
  item: string
  /** Legacy single-item color — also holds the first item color for multi-item orders */
  color: string
  model_url: string
  status: WorkOrderStatus
  paid: boolean
  /**
   * Dedicated payment state — authoritative for display.  Falls back to
   * deriving from `paid` when absent (pre-migration 008 rows).
   */
  payment_status?: PaymentStatus
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

export type WorkOrderInput = Omit<WorkOrder, 'id' | 'created_at' | 'updated_at' | 'order_number'>
