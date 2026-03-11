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
  created_at: string
  updated_at: string
}

export type WorkOrderInput = Omit<WorkOrder, 'id' | 'created_at' | 'updated_at'>
