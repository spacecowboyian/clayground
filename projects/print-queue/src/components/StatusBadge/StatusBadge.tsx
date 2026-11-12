import type { ReactNode } from 'react'
import '@wakata/ds/badge/define'
import type { WorkOrderStatus, PrintItemStatus } from '../../types/WorkOrder'
import './status-badge.css'

interface StatusBadgeProps {
  status: WorkOrderStatus | PrintItemStatus
}

export type StatusTone = 'muted' | 'blue' | 'green' | 'red' | 'orange'

const config: Record<WorkOrderStatus | PrintItemStatus, { label: string; tone: StatusTone }> = {
  waiting:     { label: 'Waiting',     tone: 'muted' },
  in_progress: { label: 'In Progress', tone: 'blue' },
  complete:    { label: 'Complete',    tone: 'green' },
  cancelled:   { label: 'Cancelled',   tone: 'red' },
  queue:       { label: 'Queue',       tone: 'muted' },
  printing:    { label: 'Printing',    tone: 'blue' },
}

/** Passive badge; the label carries meaning, tone is app-local Gearhead color. */
export function PqBadge({ tone, children }: { tone: StatusTone; children: ReactNode }) {
  return (
    <wk-badge class="pq-wk-badge" data-pq-tone={tone}>
      {children}
    </wk-badge>
  )
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const entry = config[status] ?? { label: status, tone: 'muted' as const }
  return <PqBadge tone={entry.tone}>{entry.label}</PqBadge>
}
