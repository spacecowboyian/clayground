import '@wakata/ds/progress/define'
import type { WorkOrder } from '../../types/WorkOrder'
import { PqBadge } from '../StatusBadge/StatusBadge'
import './order-status-timeline.css'

const STEPS = ['In Queue', 'Printing', 'Done']
// `current` equal to the step count marks every step completed.
const CURRENT_INDEX: Record<Exclude<WorkOrder['status'], 'cancelled'>, number> = {
  waiting: 0,
  in_progress: 1,
  complete: STEPS.length,
}

/** App-local, status-specific use of wk-progress (In Queue → Printing → Done). */
export function OrderStatusTimeline({ status }: { status: WorkOrder['status'] }) {
  if (status === 'cancelled') return <PqBadge tone="red">Cancelled</PqBadge>

  return (
    <wk-progress class="pq-wk-progress" current={CURRENT_INDEX[status]}>
      {STEPS.map(label => (
        <li key={label}>{label}</li>
      ))}
    </wk-progress>
  )
}
