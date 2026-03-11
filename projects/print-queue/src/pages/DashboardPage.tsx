import { useCallback, useEffect, useState } from 'react'
import { Button, Dialog, Switch } from '@gearhead/ui'
import { ExternalLink, Pencil, Plus, Share2, Trash2 } from 'lucide-react'
import { deleteOrder, listOrders, createOrder, updateOrder } from '../lib/storage'
import { isSupabaseConfigured } from '../lib/supabase'
import { logout } from '../lib/auth'
import { StatusBadge } from '../components/StatusBadge/StatusBadge'
import { WorkOrderForm } from '../components/WorkOrderForm/WorkOrderForm'
import type { WorkOrder, WorkOrderInput, WorkOrderStatus } from '../types/WorkOrder'

const STATUS_FILTERS: Array<WorkOrderStatus | 'All'> = ['All', 'Queue', 'Printing', 'Complete', 'Cancelled']

interface DashboardPageProps {
  onLogout: () => void
  onViewOrder: (id: string) => void
}

export function DashboardPage({ onLogout, onViewOrder }: DashboardPageProps) {
  const [orders, setOrders]         = useState<WorkOrder[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState<string | null>(null)
  const [statusFilter, setFilter]   = useState<WorkOrderStatus | 'All'>('All')
  const [addOpen, setAddOpen]       = useState(false)
  const [editOrder, setEditOrder]   = useState<WorkOrder | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<WorkOrder | null>(null)
  const [copiedId, setCopiedId]     = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setOrders(await listOrders())
    } catch {
      setError('Failed to load orders. Check your Supabase configuration.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void reload() }, [reload])

  async function handleCreate(input: WorkOrderInput) {
    await createOrder(input)
    setAddOpen(false)
    await reload()
  }

  async function handleEdit(input: WorkOrderInput) {
    if (!editOrder) return
    await updateOrder(editOrder.id, input)
    setEditOrder(null)
    await reload()
  }

  async function handleDelete() {
    if (!deleteTarget) return
    await deleteOrder(deleteTarget.id)
    setDeleteTarget(null)
    await reload()
  }

  async function handleTogglePaid(order: WorkOrder) {
    await updateOrder(order.id, { paid: !order.paid })
    await reload()
  }

  async function handleStatusChange(order: WorkOrder, status: WorkOrderStatus) {
    await updateOrder(order.id, { status })
    await reload()
  }

  function handleShare(order: WorkOrder) {
    const url = `${window.location.origin}${window.location.pathname}#/order/${order.id}`
    void navigator.clipboard.writeText(url)
    setCopiedId(order.id)
    setTimeout(() => setCopiedId(id => (id === order.id ? null : id)), 2000)
  }

  function handleLogout() {
    logout()
    onLogout()
  }

  const visible = statusFilter === 'All'
    ? orders
    : orders.filter(o => o.status === statusFilter)

  // Stats
  const total    = orders.length
  const printing = orders.filter(o => o.status === 'Printing').length
  const queued   = orders.filter(o => o.status === 'Queue').length
  const unpaid   = orders.filter(o => !o.paid && o.status !== 'Cancelled').length

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top bar */}
      <header className="border-b border-[var(--border)] bg-[var(--card)] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="./tinyprints-logo.svg" alt="Tiny Prints" className="w-8 h-auto" />
            <span className="font-bold text-[var(--foreground)] text-lg hidden sm:block">Tiny Prints</span>
            <span className="text-[var(--muted-foreground)] text-sm hidden sm:block">/ Print Queue</span>
          </div>
          <div className="flex items-center gap-2">
            {!isSupabaseConfigured && (
              <span className="text-xs px-2 py-1 rounded bg-[var(--accent-orange-light)] text-[var(--accent-orange)]">
                Demo mode
              </span>
            )}
            <Button variant="ghost" onPress={handleLogout} className="text-sm">
              Lock
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Total Orders" value={total} />
          <StatCard label="Printing Now" value={printing} accent="blue" />
          <StatCard label="In Queue" value={queued} accent="muted" />
          <StatCard label="Awaiting Payment" value={unpaid} accent="orange" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status filter tabs */}
          <div className="flex gap-1 flex-wrap">
            {STATUS_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  statusFilter === f
                    ? 'bg-[var(--accent-orange)] text-white'
                    : 'bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="ml-auto">
            <Dialog
              isOpen={addOpen}
              onOpenChange={setAddOpen}
              trigger={
                <Button variant="primary" color="orange" onPress={() => setAddOpen(true)}>
                  <Plus className="w-4 h-4" /> Add Order
                </Button>
              }
              title="New Work Order"
            >
              <WorkOrderForm
                onSave={handleCreate}
                onCancel={() => setAddOpen(false)}
              />
            </Dialog>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-[var(--accent-red-light)] border border-[var(--destructive)] rounded-lg p-4 text-sm text-[var(--destructive)]">
            {error}
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-[var(--muted-foreground)]">Loading orders…</div>
        ) : visible.length === 0 ? (
          <div className="text-center py-12 space-y-2">
            <p className="text-4xl">📋</p>
            <p className="text-[var(--muted-foreground)]">No orders {statusFilter !== 'All' ? `with status "${statusFilter}"` : 'yet'}.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-[var(--border)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--card)]">
                    <Th>Customer</Th>
                    <Th>Item</Th>
                    <Th>Color</Th>
                    <Th>Status</Th>
                    <Th>Paid</Th>
                    <Th>Notes</Th>
                    <Th align="right">Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map(order => (
                    <tr
                      key={order.id}
                      className="border-b border-[var(--border)] bg-[var(--card)] hover:bg-[var(--secondary)] transition-colors"
                    >
                      <Td>{order.customer}</Td>
                      <Td>{order.item}</Td>
                      <Td>
                        <ColorDot color={order.color} />
                      </Td>
                      <Td>
                        <StatusSelect order={order} onChange={handleStatusChange} />
                      </Td>
                      <Td>
                        <Switch
                          isSelected={order.paid}
                          onChange={() => void handleTogglePaid(order)}
                          color="green"
                          aria-label={order.paid ? 'Mark unpaid' : 'Mark paid'}
                        />
                      </Td>
                      <Td>
                        <span className="text-[var(--muted-foreground)] text-xs">{order.notes || '—'}</span>
                      </Td>
                      <Td align="right">
                        <div className="flex items-center justify-end gap-1">
                          {order.model_url && (
                            <a
                              href={order.model_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded hover:bg-[var(--accent-blue-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-blue)] transition-colors"
                              title="Open model"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            onClick={() => handleShare(order)}
                            className="p-1.5 rounded hover:bg-[var(--accent-green-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-green)] transition-colors"
                            title={copiedId === order.id ? 'Copied!' : 'Copy order link'}
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditOrder(order)}
                            className="p-1.5 rounded hover:bg-[var(--accent-orange-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-orange)] transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(order)}
                            className="p-1.5 rounded hover:bg-[var(--accent-red-light)] text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {visible.map(order => (
                <div key={order.id} className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-[var(--foreground)]">{order.item}</p>
                      <p className="text-sm text-[var(--muted-foreground)]">{order.customer}</p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <ColorDot color={order.color} />
                    <span className={`text-xs ${order.paid ? 'text-[var(--accent-green)]' : 'text-[var(--muted-foreground)]'}`}>
                      {order.paid ? '✓ Paid' : 'Unpaid'}
                    </span>
                  </div>
                  {order.notes && (
                    <p className="text-xs text-[var(--muted-foreground)]">{order.notes}</p>
                  )}
                  <div className="flex items-center gap-2 pt-1 border-t border-[var(--border)]">
                    <Button variant="ghost" className="flex-1 justify-center text-xs py-1" onPress={() => onViewOrder(order.id)}>
                      View
                    </Button>
                    <Button variant="ghost" className="flex-1 justify-center text-xs py-1" onPress={() => setEditOrder(order)}>
                      Edit
                    </Button>
                    <button
                      onClick={() => handleShare(order)}
                      className="flex-1 py-1 rounded-lg text-xs text-[var(--muted-foreground)] hover:bg-[var(--secondary)] transition-colors"
                    >
                      {copiedId === order.id ? 'Copied!' : 'Share'}
                    </button>
                    <button
                      onClick={() => setDeleteTarget(order)}
                      className="px-3 py-1 rounded-lg text-xs text-[var(--destructive)] hover:bg-[var(--accent-red-light)] transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <p className="text-xs text-center text-[var(--muted-foreground)]">
          {visible.length} order{visible.length !== 1 ? 's' : ''} shown
          {statusFilter !== 'All' && ` · filtered by "${statusFilter}"`}
        </p>
      </main>

      {/* Edit Dialog */}
      {editOrder && (
        <Dialog
          isOpen
          onOpenChange={open => { if (!open) setEditOrder(null) }}
          trigger={<span />}
          title="Edit Work Order"
        >
          <WorkOrderForm
            initial={editOrder}
            onSave={handleEdit}
            onCancel={() => setEditOrder(null)}
          />
        </Dialog>
      )}

      {/* Delete Confirm Dialog */}
      {deleteTarget && (
        <Dialog
          isOpen
          onOpenChange={open => { if (!open) setDeleteTarget(null) }}
          trigger={<span />}
          title="Delete Order"
          footer={
            <>
              <Button variant="outline" onPress={() => setDeleteTarget(null)}>Cancel</Button>
              <Button variant="destructive" onPress={() => void handleDelete()}>Delete</Button>
            </>
          }
        >
          <p>
            Are you sure you want to delete the <strong>{deleteTarget.item}</strong> ({deleteTarget.color}) order for{' '}
            <strong>{deleteTarget.customer}</strong>? This cannot be undone.
          </p>
        </Dialog>
      )}
    </div>
  )
}

// ── Small helpers ──────────────────────────────────────────────────────────────

function Th({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <th className={`px-4 py-3 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider ${align === 'right' ? 'text-right' : 'text-left'}`}>
      {children}
    </th>
  )
}

function Td({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <td className={`px-4 py-3 text-[var(--foreground)] ${align === 'right' ? 'text-right' : 'text-left'}`}>
      {children}
    </td>
  )
}

function ColorDot({ color }: { color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-[var(--foreground)]">
      <span className="w-2.5 h-2.5 rounded-full border border-[var(--border)] shrink-0" style={{ background: colorToCSS(color) }} />
      {color}
    </span>
  )
}

function colorToCSS(name: string): string {
  const map: Record<string, string> = {
    pink: '#f472b6', purple: '#a855f7', 'light blue': '#7dd3fc',
    yellow: '#fde047', blue: '#3b82f6', 'dark blue': '#1e40af',
    red: '#ef4444', green: '#22c55e', orange: '#f97316',
    white: '#f5f5f5', black: '#1a1a1a', gray: '#9ca3af', tbd: '#6b7280',
  }
  return map[name.toLowerCase()] ?? '#9ca3af'
}

const STATUS_OPTIONS_INLINE = [
  { id: 'Queue',     label: 'Queue' },
  { id: 'Printing',  label: 'Printing' },
  { id: 'Complete',  label: 'Complete' },
  { id: 'Cancelled', label: 'Cancelled' },
]

function StatusSelect({ order, onChange }: { order: WorkOrder; onChange: (o: WorkOrder, s: WorkOrderStatus) => void }) {
  return (
    <select
      value={order.status}
      onChange={e => onChange(order, e.target.value as WorkOrderStatus)}
      className="bg-[var(--input)] border border-[var(--border)] text-sm rounded px-2 py-1 text-[var(--foreground)] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--accent-orange)]"
    >
      {STATUS_OPTIONS_INLINE.map(o => (
        <option key={o.id} value={o.id}>{o.label}</option>
      ))}
    </select>
  )
}

interface StatCardProps {
  label: string
  value: number
  accent?: 'orange' | 'blue' | 'green' | 'muted'
}

function StatCard({ label, value, accent = 'green' }: StatCardProps) {
  const colors = {
    orange: 'text-[var(--accent-orange)]',
    blue:   'text-[var(--accent-blue)]',
    green:  'text-[var(--accent-green)]',
    muted:  'text-[var(--muted-foreground)]',
  }
  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
      <p className={`text-2xl font-bold ${colors[accent]}`}>{value}</p>
      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{label}</p>
    </div>
  )
}
