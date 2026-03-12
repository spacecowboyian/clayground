import type { WorkOrderStatus, PrintItemStatus } from '../../types/WorkOrder'

interface StatusBadgeProps {
  status: WorkOrderStatus | PrintItemStatus
}

const config: Record<WorkOrderStatus | PrintItemStatus, { label: string; className: string }> = {
  waiting:     { label: 'Waiting',     className: 'bg-[var(--muted)] text-[var(--muted-foreground)]' },
  in_progress: { label: 'In Progress', className: 'bg-[var(--accent-blue-light)] text-[var(--accent-blue)]' },
  complete:    { label: 'Complete',    className: 'bg-[var(--accent-green-light)] text-[var(--accent-green)]' },
  queue:       { label: 'Queue',       className: 'bg-[var(--muted)] text-[var(--muted-foreground)]' },
  printing:    { label: 'Printing',    className: 'bg-[var(--accent-blue-light)] text-[var(--accent-blue)]' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const entry = config[status] ?? { label: status, className: 'bg-[var(--muted)] text-[var(--muted-foreground)]' }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${entry.className}`}>
      {entry.label}
    </span>
  )
}
