import type { WorkOrderStatus } from '../../types/WorkOrder'

interface StatusBadgeProps {
  status: WorkOrderStatus
}

const config: Record<WorkOrderStatus, { label: string; className: string }> = {
  Queue:    { label: 'Queue',    className: 'bg-[var(--muted)] text-[var(--muted-foreground)]' },
  Printing: { label: 'Printing', className: 'bg-[var(--accent-blue-light)] text-[var(--accent-blue)]' },
  Complete: { label: 'Complete', className: 'bg-[var(--accent-green-light)] text-[var(--accent-green)]' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = config[status]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}
