import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Dialog, Accordion } from '@gearhead/ui'
import { DollarSign, GripVertical, Pencil, Plus, Trash2 } from 'lucide-react'
import { StatusBadge } from '../components/StatusBadge/StatusBadge'
import { WorkOrderForm } from '../components/WorkOrderForm/WorkOrderForm'
import { ErrorModal } from '../components/ErrorModal/ErrorModal'
import { AppHeader } from '../components/AppHeader/AppHeader'
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

const STATUS_FILTERS: Array<WorkOrderStatus | 'All'> = ['All', 'Queue', 'Printing', 'Complete']

const ACTIVE_STATUSES   = new Set<WorkOrderStatus>(['Queue', 'Printing'])
const COMPLETE_STATUSES = new Set<WorkOrderStatus>(['Complete'])

interface DashboardPageProps {
  onLogout: () => void
  onViewOrder: (id: string) => void
  onInventory: () => void
  onSettings: () => void
  onDashboard: () => void
}

export function DashboardPage({ onLogout, onViewOrder, onInventory, onSettings, onDashboard }: DashboardPageProps) {
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
    try {
      await dispatch(editOrderThunk({ id: editOrder.id, patch: input })).unwrap()
      setEditOrder(null)
    } catch (err) {
      // Clear the Redux error so the generic "Unable to load data" ErrorModal
      // does not appear for save failures — the WorkOrderForm already shows
      // an inline error message via its own catch block.
      dispatch(clearOrdersError())
      throw err
    }
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
  const total          = orders.length
  const unpaid         = orders.filter(o => !o.paid).length
  const due            = orders.filter(o => !o.paid).reduce((sum, o) => sum + (o.price ?? 5), 0)
  const expectedProfit = orders.reduce((sum, o) => sum + ((o.price ?? 5) - (o.cost ?? 2)), 0)
  const profit         = orders
    .filter(o => o.paid)
    .reduce((sum, o) => sum + ((o.price ?? 5) - (o.cost ?? 2)), 0)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top bar */}
      <AppHeader
        currentPage="dashboard"
        onDashboard={onDashboard}
        onInventory={onInventory}
        onSettings={onSettings}
        onLogout={onLogout}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Total Orders"     value={total}    />
          <StatCard label="Awaiting Payment" value={unpaid}   accent="orange" />
          <StatCard label="Due"              value={`$${due.toFixed(2)}`} accent="blue" />
          <StatCard
            label="Profit"
            value={
              <>
                <span className="text-[var(--foreground)]">${expectedProfit.toFixed(2)}</span>
                <span className="text-[var(--muted-foreground)] font-normal text-xl"> / </span>
                <span className="text-[var(--accent-green)]">${profit.toFixed(2)}</span>
              </>
            }
          />
        </div>

        {/* Toolbar */}
        <div className="space-y-3">
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

            {/* Add Order button — desktop (sm+) */}
            <div className="ml-auto hidden sm:block">
              <Dialog
                isOpen={addOpen}
                onOpenChange={setAddOpen}
                size="xl"
                trigger={
                  <Button variant="primary" color="orange" onPress={() => setAddOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Add Order
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

          {/* Add Order button — mobile full width */}
          <div className="sm:hidden">
            <Dialog
              isOpen={addOpen}
              onOpenChange={setAddOpen}
              size="xl"
              trigger={
                <Button variant="primary" color="orange" className="w-full justify-center" onPress={() => setAddOpen(true)}>
                  <Plus className="w-4 h-4" />
                  Add Order
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
                        <Th>#</Th>
                        <Th>Customer</Th>
                        <Th>Item</Th>
                        <Th>Color</Th>
                        <Th>Status</Th>
                        <Th>Due / Profit</Th>
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
                              className="font-medium text-[var(--accent-blue)] hover:underline text-left tabular-nums"
                            >
                              #{order.order_number}
                            </button>
                          </Td>
                          <Td>
                            <span className="font-medium text-[var(--foreground)]">{order.customer}</span>
                          </Td>
                          <Td>{orderItemLabel(order)}</Td>
                          <Td>
                            <div className="flex items-center gap-1.5">
                              <ColorDot color={orderColorLabel(order)} />
                              {order.needs_filament && (
                                <span className="text-xs text-[var(--accent-orange)]" title="Requires new filament purchase">⚠</span>
                              )}
                            </div>
                          </Td>
                          <Td>
                            <StatusSelect order={order} onChange={handleStatusChange} />
                          </Td>
                          <Td>
                            <DueProfitCell order={order} />
                          </Td>
                          <Td align="right">
                            <OrderActions
                              order={order}
                              onEdit={() => setEditOrder(order)}
                              onDelete={() => setDeleteTarget(order)}
                              onTogglePaid={() => void handleTogglePaid(order)}
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

            {/* ── Completed accordion ─── */}
            {visibleComplete.length > 0 && (
              <Accordion
                title="Completed"
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
                        <Th>#</Th>
                        <Th>Customer</Th>
                        <Th>Item</Th>
                        <Th>Color</Th>
                        <Th>Status</Th>
                        <Th>Due / Profit</Th>
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
                              className="font-medium text-[var(--accent-blue)] hover:underline text-left tabular-nums"
                            >
                              #{order.order_number}
                            </button>
                          </Td>
                          <Td>
                            <span className="font-medium text-[var(--foreground)]">{order.customer}</span>
                          </Td>
                          <Td>{orderItemLabel(order)}</Td>
                          <Td>
                            <div className="flex items-center gap-1.5">
                              <ColorDot color={orderColorLabel(order)} />
                              {order.needs_filament && (
                                <span className="text-xs text-[var(--accent-orange)]" title="Requires new filament purchase">⚠</span>
                              )}
                            </div>
                          </Td>
                          <Td>
                            <StatusSelect order={order} onChange={handleStatusChange} />
                          </Td>
                          <Td>
                            <DueProfitCell order={order} />
                          </Td>
                          <Td align="right">
                            <OrderActions
                              order={order}
                              onEdit={() => setEditOrder(order)}
                              onDelete={() => setDeleteTarget(order)}
                              onTogglePaid={() => void handleTogglePaid(order)}
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
          size="xl"
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
  return (
    <div className={`bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 space-y-3 ${muted ? 'opacity-80' : ''}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={onView}
              className="text-xs font-medium text-[var(--accent-blue)] hover:underline tabular-nums"
            >
              #{order.order_number}
            </button>
            <p className="font-medium text-[var(--foreground)]">{orderItemLabel(order)}</p>
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">{order.customer}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="flex items-center gap-1.5">
        <ColorDot color={orderColorLabel(order)} />
        {order.needs_filament && (
          <span className="text-xs text-[var(--accent-orange)]" title="Requires new filament purchase">⚠ Special color</span>
        )}
      </div>

      {/* Due / Profit row */}
      <div className="flex items-center gap-4 text-xs">
        <span className="text-[var(--muted-foreground)]">
          {order.paid ? 'Profit' : 'Due'}{' '}<DueProfitCell order={order} />
        </span>
      </div>

      {order.notes && (
        <p className="text-xs text-[var(--muted-foreground)]">{order.notes}</p>
      )}

      <div className="flex items-center justify-end gap-1 pt-1 border-t border-[var(--border)]">
        <button
          onClick={onTogglePaid}
          className={`p-1.5 rounded transition-colors ${
            order.paid
              ? 'text-[var(--accent-green)]'
              : 'text-[var(--muted-foreground)] hover:text-[var(--accent-green)]'
          }`}
          title={order.paid ? 'Mark unpaid' : 'Mark paid'}
          aria-label={order.paid ? 'Mark unpaid' : 'Mark paid'}
        >
          <DollarSign className="w-4 h-4" />
        </button>
        <button
          onClick={onEdit}
          className="p-1.5 rounded hover:bg-[var(--accent-orange-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-orange)] transition-colors"
          title="Edit"
          aria-label="Edit"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 rounded hover:bg-[var(--accent-red-light)] text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors"
          title="Delete"
          aria-label="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ── Desktop action buttons ─────────────────────────────────────────────────────

interface OrderActionsProps {
  order: WorkOrder
  onEdit: () => void
  onDelete: () => void
  onTogglePaid: () => void
}

function OrderActions({ order, onEdit, onDelete, onTogglePaid }: OrderActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        onClick={onTogglePaid}
        className={`p-1.5 rounded transition-colors ${
          order.paid
            ? 'text-[var(--accent-green)] hover:bg-[var(--secondary)]'
            : 'text-[var(--muted-foreground)] hover:text-[var(--accent-green)] hover:bg-[var(--secondary)]'
        }`}
        title={order.paid ? 'Mark unpaid' : 'Mark paid'}
        aria-label={order.paid ? 'Mark unpaid' : 'Mark paid'}
      >
        <DollarSign className="w-4 h-4" />
      </button>
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

function DueProfitCell({ order }: { order: WorkOrder }) {
  if (!order.paid) {
    return (
      <span className="font-medium text-xs text-[var(--foreground)]">
        ${(order.price ?? 5).toFixed(2)}
      </span>
    )
  }
  return <ProfitBadge profit={(order.price ?? 5) - (order.cost ?? 2)} />
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

/** Returns a display label for the item(s) in an order */
function orderItemLabel(order: WorkOrder): string {
  if (order.order_items && order.order_items.length > 1) {
    return `${order.order_items[0].item} +${order.order_items.length - 1} more`
  }
  return order.order_items?.[0]?.item ?? order.item
}

/** Returns a display label for the color(s) in an order */
function orderColorLabel(order: WorkOrder): string {
  if (order.order_items && order.order_items.length > 1) {
    const colors = [...new Set(order.order_items.map(i => i.color))].filter(Boolean)
    if (colors.length > 1) return `${colors[0]} +${colors.length - 1}`
    return colors[0] ?? order.color
  }
  return order.order_items?.[0]?.color ?? order.color
}

const STATUS_OPTIONS_INLINE = [
  { id: 'Queue',    label: 'Queue' },
  { id: 'Printing', label: 'Printing' },
  { id: 'Complete', label: 'Complete' },
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
  value: React.ReactNode
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
      <p className={`text-2xl font-bold ${typeof value === 'string' || typeof value === 'number' ? colors[accent] : ''}`}>{value}</p>
      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{label}</p>
    </div>
  )
}
