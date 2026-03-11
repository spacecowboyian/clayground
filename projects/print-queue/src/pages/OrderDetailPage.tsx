import { useEffect, useState } from 'react'
import { Button, OrderStatusTimeline } from '@gearhead/ui'
import { getOrder } from '../lib/storage'
import type { WorkOrder } from '../types/WorkOrder'

interface OrderDetailPageProps {
  orderId: string
  onBack: () => void
}

export function OrderDetailPage({ orderId, onBack }: OrderDetailPageProps) {
  const [order, setOrder]     = useState<WorkOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getOrder(orderId).then(o => {
      if (cancelled) return
      if (o) setOrder(o)
      else setNotFound(true)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <p className="text-[var(--muted-foreground)]">Loading order…</p>
      </div>
    )
  }

  if (notFound || !order) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-4xl">🔍</p>
          <h1 className="text-xl font-semibold text-[var(--foreground)]">Order not found</h1>
          <p className="text-[var(--muted-foreground)] text-sm">This order may have been deleted or the link is incorrect.</p>
          <Button variant="outline" onPress={onBack}>← Back</Button>
        </div>
      </div>
    )
  }

  const shareUrl = `${window.location.origin}${window.location.pathname}#/order/${order.id}`

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl)
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4">
          <img src="./tinyprints-logo.svg" alt="Tiny Prints" className="w-10 h-auto" />
          <div>
            <h1 className="text-lg font-bold text-[var(--foreground)]">Tiny Prints</h1>
            <p className="text-xs text-[var(--muted-foreground)]">Order Detail</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
          {/* Status timeline */}
          <div className="px-6 py-5 border-b border-[var(--border)]">
            <OrderStatusTimeline status={order.status} />
          </div>

          {/* Payment status */}
          <div className="px-6 py-3 border-b border-[var(--border)] flex items-center justify-between">
            <span className="text-sm text-[var(--muted-foreground)]">Payment</span>
            <span className={`text-sm font-semibold ${order.paid ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]'}`}>
              {order.paid ? '✓ Paid' : '✗ Not Paid'}
            </span>
          </div>

          {/* Fields */}
          <div className="divide-y divide-[var(--border)]">
            <Field label="Customer" value={order.customer} />
            <Field label="Item" value={order.item} />
            <Field label="Color" value={order.color} />
            <Field label="Price" value={`$${(order.price ?? 5).toFixed(2)}`} />
            {order.needs_filament && (
              <div className="px-6 py-3 flex items-center gap-2 bg-[var(--accent-orange-light)]">
                <span className="text-sm text-[var(--accent-orange)]">
                  ⚠ Special color — requires new filament purchase (+$5)
                </span>
              </div>
            )}
            {order.model_url && (
              <div className="px-6 py-4 flex justify-between items-start gap-4">
                <span className="text-sm text-[var(--muted-foreground)] shrink-0 pt-0.5">Model</span>
                <a
                  href={order.model_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--accent-blue)] hover:underline text-right break-all"
                >
                  View on MakerWorld ↗
                </a>
              </div>
            )}
            {order.notes && <Field label="Notes" value={order.notes} />}
          </div>
        </div>

        {/* Share + back */}
        <div className="flex gap-3">
          <Button variant="outline" onPress={onBack} className="flex-1 justify-center">
            ← Back
          </Button>
          <Button variant="ghost" onPress={copyLink} className="flex-1 justify-center">
            Copy Link
          </Button>
        </div>

        <p className="text-center text-xs text-[var(--muted-foreground)]">
          Order ID: <code className="text-xs">{order.id}</code>
        </p>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-6 py-4 flex justify-between items-start gap-4">
      <span className="text-sm text-[var(--muted-foreground)] shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-[var(--foreground)] text-right">{value}</span>
    </div>
  )
}
