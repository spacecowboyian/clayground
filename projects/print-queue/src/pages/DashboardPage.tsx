import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Dialog, Switch, Accordion } from '@gearhead/ui'
import { GripVertical, Package, Pencil, Plus, Settings, Trash2 } from 'lucide-react'
import { logout } from '../lib/auth'
import { StatusBadge } from '../components/StatusBadge/StatusBadge'
import { WorkOrderForm } from '../components/WorkOrderForm/WorkOrderForm'
import { ErrorModal } from '../components/ErrorModal/ErrorModal'
import { useAppDispatch, useAppSelector } from '../store'
import {
  fetchOrders,
  addOrder,
  editOrder as editOrderThunk,
  removeOrder,
  reorderOrdersThunk,
  optimisticReorder,
  clearOrdersError,
} from '../store/ordersSlice'
import { fetchInventory, clearInventoryError } from '../store/inventorySlice'
import type { WorkOrder, WorkOrderInput, WorkOrderStatus } from '../types/WorkOrder'

const STATUS_FILTERS: Array<WorkOrderStatus | 'All'> = ['All', 'Queue', 'Printing', 'Complete', 'Cancelled']

const ACTIVE_STATUSES   = new Set<WorkOrderStatus>(['Queue', 'Printing'])
const COMPLETE_STATUSES = new Set<WorkOrderStatus>(['Complete', 'Cancelled'])

interface DashboardPageProps {
  onLogout: () => void
  onViewOrder: (id: string) => void
  onInventory: () => void
  onSettings: () => void
}

export function DashboardPage({ onLogout, onViewOrder, onInventory, onSettings }: DashboardPageProps) {
  const dispatch = useAppDispatch()
  const orders   = useAppSelector(state => state.orders.items)
  const models   = useAppSelector(state => state.inventory.models)
  const filaments = useAppSelector(state => state.inventory.filaments)
  const loading  = useAppSelector(state => state.orders.loading || state.inventory.loading)
  const ordersError    = useAppSelector(state => state.orders.error)
  const inventoryError = useAppSelector(state => state.inventory.error)
  const error = ordersError ?? inventoryError

  const [statusFilter, setFilter]   = useState<WorkOrderStatus | 'All'>('All')
  const [addOpen, setAddOpen]       = useState(false)
  const [editOrder, setEditOrder]   = useState<WorkOrder | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<WorkOrder | null>(null)

  // Drag-and-drop state
  const dragIdRef    = useRef<string | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)

  const load = useCallback(() => {
    void dispatch(fetchOrders())
    void dispatch(fetchInventory())
  }, [dispatch])

  useEffect(() => { load() }, [load])

  async function handleCreate(input: WorkOrderInput) {
    const nextSort = orders.filter(o => ACTIVE_STATUSES.has(o.status)).length + 1
    await dispatch(addOrder({ ...input, sort_order: nextSort })).unwrap()
    setAddOpen(false)
  }

  async function handleEdit(input: WorkOrderInput) {
    if (!editOrder) return
    await dispatch(editOrderThunk({ id: editOrder.id, patch: input })).unwrap()
    setEditOrder(null)
  }

  async function handleDelete() {
    if (!deleteTarget) return
    await dispatch(removeOrder(deleteTarget.id)).unwrap()
    setDeleteTarget(null)
  }

  async function handleTogglePaid(order: WorkOrder) {
    await dispatch(editOrderThunk({ id: order.id, patch: { paid: !order.paid } })).unwrap()
  }

  async function handleStatusChange(order: WorkOrder, status: WorkOrderStatus) {
    await dispatch(editOrderThunk({ id: order.id, patch: { status } })).unwrap()
  }

  function handleLogout() {
    logout()
    onLogout()
  }

  // ── Drag handlers ──────────────────────────────────────────────────────────
  function handleDragStart(id: string) {
    dragIdRef.current = id
  }

  function handleDragOver(e: React.DragEvent, id: string) {
    e.preventDefault()
    if (dragIdRef.current && dragIdRef.current !== id) {
      setDragOverId(id)
    }
  }

  function handleDragLeave() {
    setDragOverId(null)
  }

  async function handleDrop(targetId: string, activeOrds: WorkOrder[]) {
    const sourceId = dragIdRef.current
    dragIdRef.current = null
    setDragOverId(null)
    if (!sourceId || sourceId === targetId) return

    const currentIds = activeOrds.map(o => o.id)
    const fromIdx = currentIds.indexOf(sourceId)
    const toIdx   = currentIds.indexOf(targetId)
    if (fromIdx === -1 || toIdx === -1) return

    const reordered = [...currentIds]
    reordered.splice(fromIdx, 1)
    reordered.splice(toIdx, 0, sourceId)

    // Optimistic update
    dispatch(optimisticReorder(reordered))
    await dispatch(reorderOrdersThunk(reordered))
  }

  function handleDragEnd() {
    dragIdRef.current = null
    setDragOverId(null)
  }

  // ── Derived data ───────────────────────────────────────────────────────────
  const allActive   = orders
    .filter(o => ACTIVE_STATUSES.has(o.status))
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

  const allComplete = orders
    .filter(o => COMPLETE_STATUSES.has(o.status))
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

  const visibleActive = statusFilter === 'All' || ACTIVE_STATUSES.has(statusFilter as WorkOrderStatus)
    ? (statusFilter === 'All' ? allActive : allActive.filter(o => o.status === statusFilter))
    : []

  const visibleComplete = statusFilter === 'All' || COMPLETE_STATUSES.has(statusFilter as WorkOrderStatus)
    ? (statusFilter === 'All' ? allComplete : allComplete.filter(o => o.status === statusFilter))
    : []

  const hasAny = visibleActive.length > 0 || visibleComplete.length > 0

  // Stats
  const total    = orders.length
  const printing = orders.filter(o => o.status === 'Printing').length
  const queued   = orders.filter(o => o.status === 'Queue').length
  const unpaid   = orders.filter(o => !o.paid && o.status !== 'Cancelled').length
  const profit   = orders
    .filter(o => o.paid && o.status !== 'Cancelled')
    .reduce((sum, o) => sum + ((o.price ?? 5) - (o.cost ?? 2)), 0)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top bar */}
      <header className="border-b border-[var(--border)] bg-[var(--card)] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="./tinyprints-printer.svg" alt="Tiny Prints" className="w-9 h-9 object-contain" />
            <span className="font-bold text-[var(--foreground)] text-lg hidden sm:block">Tiny Prints</span>
            <span className="text-[var(--muted-foreground)] text-sm hidden sm:block">/ Print Queue</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onPress={onInventory} className="text-sm" title="Inventory">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">Inventory</span>
            </Button>
            <Button variant="ghost" onPress={onSettings} className="text-sm" title="Farm Settings">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">Settings</span>
            </Button>
            <Button variant="ghost" onPress={handleLogout} className="text-sm">
              Lock
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <StatCard label="Total Orders"     value={total}    />
          <StatCard label="Printing Now"     value={printing} accent="blue" />
          <StatCard label="In Queue"         value={queued}   accent="muted" />
          <StatCard label="Awaiting Payment" value={unpaid}   accent="orange" />
          <StatCard label="Profit (paid)"    value={`$${profit.toFixed(2)}`} accent="green" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
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
                  <Plus className="w-4 h-4" />
                  <span className="sm:hidden">Add</span>
                  <span className="hidden sm:inline">Add Order</span>
                </Button>
              }
              title="New Work Order"
            >
              <WorkOrderForm
                onSave={handleCreate}
                onCancel={() => setAddOpen(false)}
                onGoToInventory={() => { setAddOpen(false); onInventory() }}
                models={models}
                filaments={filaments}
                orders={orders}
              />
            </Dialog>
          </div>
        </div>

        {/* Error Modal */}
        {error && (
          <ErrorModal
            error={error}
            onRetry={() => {
              dispatch(clearOrdersError())
              dispatch(clearInventoryError())
              load()
            }}
            onDismiss={() => {
              dispatch(clearOrdersError())
              dispatch(clearInventoryError())
            }}
          />
        )}

        {/* Content */}
        {loading ? (
          <div className="text-center py-12 text-[var(--muted-foreground)]">Loading orders…</div>
        ) : !hasAny ? (
          <div className="text-center py-12 space-y-2">
            <p className="text-4xl">📋</p>
            <p className="text-[var(--muted-foreground)]">
              No orders {statusFilter !== 'All' ? `with status "${statusFilter}"` : 'yet'}.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* ── Active orders (Queue / Printing) ─── */}
            {visibleActive.length > 0 && (
              <>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto rounded-xl border border-[var(--border)]">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] bg-[var(--card)]">
                        <th className="w-8 px-2 py-3" aria-label="Drag handle" />
                        <Th>Customer</Th>
                        <Th>Item</Th>
                        <Th>Color</Th>
                        <Th>Status</Th>
                        <Th>Paid</Th>
                        <Th>Price</Th>
                        <Th>Cost</Th>
                        <Th>Profit</Th>
                        <Th>Notes</Th>
                        <Th align="right">Actions</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleActive.map(order => (
                        <tr
                          key={order.id}
                          draggable
                          onDragStart={() => handleDragStart(order.id)}
                          onDragOver={e => handleDragOver(e, order.id)}
                          onDragLeave={handleDragLeave}
                          onDrop={() => void handleDrop(order.id, visibleActive)}
                          onDragEnd={handleDragEnd}
                          className={`border-b border-[var(--border)] bg-[var(--card)] hover:bg-[var(--secondary)] transition-colors ${
                            dragOverId === order.id ? 'outline outline-2 outline-[var(--accent-orange)]' : ''
                          }`}
                        >
                          <td className="px-2 py-3 cursor-grab active:cursor-grabbing text-[var(--muted-foreground)]">
                            <GripVertical className="w-4 h-4" />
                          </td>
                          <Td>
                            <button
                              onClick={() => onViewOrder(order.id)}
                              className="font-medium text-[var(--accent-blue)] hover:underline text-left"
                            >
                              {order.customer}
                            </button>
                          </Td>
                          <Td>{order.item}</Td>
                          <Td>
                            <div className="flex items-center gap-1.5">
                              <ColorDot color={order.color} />
                              {order.needs_filament && (
                                <span className="text-xs text-[var(--accent-orange)]" title="Requires new filament purchase">⚠</span>
                              )}
                            </div>
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
                            <span className="text-[var(--accent-green)] font-medium">${(order.price ?? 5).toFixed(2)}</span>
                          </Td>
                          <Td>
                            <span className="text-[var(--muted-foreground)]">${(order.cost ?? 2).toFixed(2)}</span>
                          </Td>
                          <Td>
                            <ProfitBadge profit={(order.price ?? 5) - (order.cost ?? 2)} />
                          </Td>
                          <Td>
                            <span className="text-[var(--muted-foreground)] text-xs">{order.notes || '—'}</span>
                          </Td>
                          <Td align="right">
                            <OrderActions
                              onEdit={() => setEditOrder(order)}
                              onDelete={() => setDeleteTarget(order)}
                            />
                          </Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-3">
                  {visibleActive.map(order => (
                    <MobileCard
                      key={order.id}
                      order={order}
                      onView={() => onViewOrder(order.id)}
                      onEdit={() => setEditOrder(order)}
                      onDelete={() => setDeleteTarget(order)}
                      onTogglePaid={() => void handleTogglePaid(order)}
                    />
                  ))}
                </div>
              </>
            )}

            {/* ── Completed / Cancelled accordion ─── */}
            {visibleComplete.length > 0 && (
              <Accordion
                title="Completed & Cancelled"
                badge={
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--secondary)] text-[var(--muted-foreground)]">
                    {visibleComplete.length}
                  </span>
                }
              >
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)]">
                        <Th>Customer</Th>
                        <Th>Item</Th>
                        <Th>Color</Th>
                        <Th>Status</Th>
                        <Th>Paid</Th>
                        <Th>Price</Th>
                        <Th>Cost</Th>
                        <Th>Profit</Th>
                        <Th>Notes</Th>
                        <Th align="right">Actions</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleComplete.map(order => (
                        <tr
                          key={order.id}
                          className="border-b border-[var(--border)] bg-[var(--card)] hover:bg-[var(--secondary)] transition-colors opacity-80"
                        >
                          <Td>
                            <button
                              onClick={() => onViewOrder(order.id)}
                              className="font-medium text-[var(--accent-blue)] hover:underline text-left"
                            >
                              {order.customer}
                            </button>
                          </Td>
                          <Td>{order.item}</Td>
                          <Td>
                            <div className="flex items-center gap-1.5">
                              <ColorDot color={order.color} />
                              {order.needs_filament && (
                                <span className="text-xs text-[var(--accent-orange)]" title="Requires new filament purchase">⚠</span>
                              )}
                            </div>
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
                            <span className="text-[var(--accent-green)] font-medium">${(order.price ?? 5).toFixed(2)}</span>
                          </Td>
                          <Td>
                            <span className="text-[var(--muted-foreground)]">${(order.cost ?? 2).toFixed(2)}</span>
                          </Td>
                          <Td>
                            <ProfitBadge profit={(order.price ?? 5) - (order.cost ?? 2)} />
                          </Td>
                          <Td>
                            <span className="text-[var(--muted-foreground)] text-xs">{order.notes || '—'}</span>
                          </Td>
                          <Td align="right">
                            <OrderActions
                              onEdit={() => setEditOrder(order)}
                              onDelete={() => setDeleteTarget(order)}
                            />
                          </Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden divide-y divide-[var(--border)]">
                  {visibleComplete.map(order => (
                    <div key={order.id} className="p-2">
                      <MobileCard
                        order={order}
                        onView={() => onViewOrder(order.id)}
                        onEdit={() => setEditOrder(order)}
                        onDelete={() => setDeleteTarget(order)}
                        onTogglePaid={() => void handleTogglePaid(order)}
                        muted
                      />
                    </div>
                  ))}
                </div>
              </Accordion>
            )}
          </div>
        )}

        <p className="text-xs text-center text-[var(--muted-foreground)]">
          {visibleActive.length + visibleComplete.length} order{(visibleActive.length + visibleComplete.length) !== 1 ? 's' : ''} shown
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
            onGoToInventory={() => { setEditOrder(null); onInventory() }}
            models={models}
            filaments={filaments}
            orders={orders}
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

// ── Mobile card ────────────────────────────────────────────────────────────────

interface MobileCardProps {
  order: WorkOrder
  onView: () => void
  onEdit: () => void
  onDelete: () => void
  onTogglePaid: () => void
  muted?: boolean
}

function MobileCard({ order, onView, onEdit, onDelete, onTogglePaid, muted }: MobileCardProps) {
  const profit = (order.price ?? 5) - (order.cost ?? 2)
  return (
    <div className={`bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 space-y-3 ${muted ? 'opacity-80' : ''}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-[var(--foreground)]">{order.item}</p>
          <button
            onClick={onView}
            className="text-sm text-[var(--accent-blue)] hover:underline text-left"
          >
            {order.customer}
          </button>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <ColorDot color={order.color} />
          {order.needs_filament && (
            <span className="text-xs text-[var(--accent-orange)]" title="Requires new filament purchase">⚠ Special color</span>
          )}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-[var(--muted-foreground)]">Paid</span>
          <Switch
            isSelected={order.paid}
            onChange={onTogglePaid}
            color="green"
            aria-label={order.paid ? 'Mark unpaid' : 'Mark paid'}
          />
        </div>
      </div>

      {/* Price / Cost / Profit row */}
      <div className="flex items-center gap-4 text-xs">
        <span className="text-[var(--muted-foreground)]">
          Price <span className="text-[var(--accent-green)] font-medium">${(order.price ?? 5).toFixed(2)}</span>
        </span>
        <span className="text-[var(--muted-foreground)]">
          Cost <span className="font-medium">${(order.cost ?? 2).toFixed(2)}</span>
        </span>
        <span className="text-[var(--muted-foreground)]">
          Profit <ProfitBadge profit={profit} />
        </span>
      </div>

      {order.notes && (
        <p className="text-xs text-[var(--muted-foreground)]">{order.notes}</p>
      )}

      <div className="flex items-center gap-2 pt-1 border-t border-[var(--border)]">
        <Button variant="ghost" className="flex-1 justify-center text-xs py-1" onPress={onEdit}>
          Edit
        </Button>
        <button
          onClick={onDelete}
          className="px-3 py-1 rounded-lg text-xs text-[var(--destructive)] hover:bg-[var(--accent-red-light)] transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

// ── Desktop action buttons ─────────────────────────────────────────────────────

interface OrderActionsProps {
  onEdit: () => void
  onDelete: () => void
}

function OrderActions({ onEdit, onDelete }: OrderActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        onClick={onEdit}
        className="p-1.5 rounded hover:bg-[var(--accent-orange-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-orange)] transition-colors"
        title="Edit"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        onClick={onDelete}
        className="p-1.5 rounded hover:bg-[var(--accent-red-light)] text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}

// ── Small helpers ──────────────────────────────────────────────────────────────

function Th({ children, align = 'left' }: { children?: React.ReactNode; align?: 'left' | 'right' }) {
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

function ProfitBadge({ profit }: { profit: number }) {
  const isPositive = profit >= 0
  return (
    <span className={`font-medium text-xs ${isPositive ? 'text-[var(--accent-green)]' : 'text-[var(--destructive)]'}`}>
      {isPositive ? '+' : ''}${Math.abs(profit).toFixed(2)}
    </span>
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
  value: number | string
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
