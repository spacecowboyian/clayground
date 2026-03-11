export type WorkOrderStatus = 'Queue' | 'Printing' | 'Complete' | 'Cancelled'

export interface WorkOrder {
  id: string
  customer: string
  item: string
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
  created_at: string
  updated_at: string
}

export type WorkOrderInput = Omit<WorkOrder, 'id' | 'created_at' | 'updated_at'>
