import { useCallback, useEffect, useState } from 'react'
import { Dialog } from '@gearhead/ui'
import { Pencil, ShoppingBag } from 'lucide-react'
import { StatusBadge } from '../components/StatusBadge/StatusBadge'
import { WorkOrderForm } from '../components/WorkOrderForm/WorkOrderForm'
import { ErrorModal } from '../components/ErrorModal/ErrorModal'
import { AppHeader } from '../components/AppHeader/AppHeader'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchOrders, editOrder as editOrderThunk, clearOrdersError } from '../store/ordersSlice'
import { fetchInventory, editFilament as editFilamentThunk, clearInventoryError } from '../store/inventorySlice'
import type { WorkOrder, WorkOrderInput, OrderItem, PrintItemStatus, WorkOrderStatus } from '../types/WorkOrder'
import type { Filament } from '../types/Inventory'
import { colorNameToHex } from '../utils/colors'

const AMS_SLOTS = [1, 2, 3, 4] as const

interface PrintQueuePageProps {
  onLogout: () => void
  onPrintQueue: () => void
  onOrders: () => void
  onModels: () => void
  onFilaments: () => void
  onSettings: () => void
}

/** An individual printable item expanded from an order */
interface PrintQueueRow {
  orderId: string
  itemIndex: number
  orderNumber: number
  customer: string
  item: string
  color: string
  filamentId: string | null
  filamentUsageG: number
  itemStatus: PrintItemStatus
}

const ITEM_STATUS_OPTIONS: Array<{ id: PrintItemStatus; label: string }> = [
  { id: 'queue',    label: 'Queue' },
  { id: 'printing', label: 'Printing' },
  { id: 'complete', label: 'Complete' },
]

export function PrintQueuePage({
  onLogout, onPrintQueue, onOrders, onModels, onFilaments, onSettings,
}: PrintQueuePageProps) {
  const dispatch   = useAppDispatch()
  const orders     = useAppSelector(state => state.orders.items)
  const models     = useAppSelector(state => state.inventory.models)
  const filaments  = useAppSelector(state => state.inventory.filaments)
  const loading    = useAppSelector(state => state.orders.loading || state.inventory.loading)
  const ordersError    = useAppSelector(state => state.orders.error)
  const inventoryError = useAppSelector(state => state.inventory.error)
  const error = ordersError ?? inventoryError

  const [editOrder, setEditOrder] = useState<WorkOrder | null>(null)

  const load = useCallback(() => {
    void dispatch(fetchOrders())
    void dispatch(fetchInventory())
  }, [dispatch])

  useEffect(() => { load() }, [load])

  // Build a flat list of individual print rows from non-complete orders
  const rows: PrintQueueRow[] = []
  const modelMap = new Map(models.map(m => [m.id, m]))
  const filamentMap = new Map(filaments.map(f => [f.id, f]))

  const activeOrders = orders
    .filter(o => o.status !== 'complete' && o.status !== 'cancelled')
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

  for (const order of activeOrders) {
    if (order.order_items && order.order_items.length > 0) {
      order.order_items.forEach((item, idx) => {
        if (item.status === 'complete') return

        const model = item.model_id ? modelMap.get(item.model_id) : null
        const filamentId = item.filament_id ?? null

        // Filament usage: from model requirements filtered to this filament
        let usageG = 0
        if (model) {
          const reqs = filamentId
            ? model.filament_requirements.filter(r => r.filament_id === filamentId)
            : model.filament_requirements
          usageG = reqs.reduce((sum, r) => sum + r.quantity_g, 0) * (item.quantity ?? 1)
        }

        rows.push({
          orderId: order.id,
          itemIndex: idx,
          orderNumber: order.order_number,
          customer: order.customer,
          item: item.item,
          color: item.color,
          filamentId,
          filamentUsageG: usageG,
          itemStatus: item.status ?? 'queue',
        })
      })
    } else {
      // Legacy single-item order
      const model = order.model_id ? modelMap.get(order.model_id) : null
      const usageG = model
        ? model.filament_requirements.reduce((sum, r) => sum + r.quantity_g, 0)
        : 0
      rows.push({
        orderId: order.id,
        itemIndex: -1,
        orderNumber: order.order_number,
        customer: order.customer,
        item: order.item,
        color: order.color,
        filamentId: null,
        filamentUsageG: usageG,
        itemStatus: 'queue',
      })
    }
  }

  // Sort by filament (grouped), nulls last, then by order sort_order (already sorted above)
  rows.sort((a, b) => {
    if (a.filamentId === b.filamentId) return 0
    if (!a.filamentId) return 1
    if (!b.filamentId) return -1
    const fa = filamentMap.get(a.filamentId)?.color ?? ''
    const fb = filamentMap.get(b.filamentId)?.color ?? ''
    return fa.localeCompare(fb)
  })

  async function handleItemStatusChange(row: PrintQueueRow, newStatus: PrintItemStatus) {
    const order = orders.find(o => o.id === row.orderId)
    if (!order || !order.order_items || row.itemIndex < 0) return

    const updatedItems = order.order_items.map((item, i) =>
      i === row.itemIndex ? { ...item, status: newStatus } : item
    )

    // Automatically derive the order-level status from item statuses
    const derivedStatus = deriveOrderStatus(updatedItems)
    const patch: Partial<WorkOrderInput> = { order_items: updatedItems }
    if (derivedStatus !== order.status) {
      patch.status = derivedStatus
    }

    // $0 orders are automatically considered paid once all items finish printing
    if (derivedStatus === 'complete' && (order.price ?? 0) === 0 && !order.paid) {
      patch.paid = true
      patch.payment_status = 'paid'
    }

    await dispatch(editOrderThunk({ id: order.id, patch })).unwrap()
  }

  async function handleAmsSlotAssign(slot: number, filamentId: string | null) {
    // Clear any filament currently in this slot
    const currentInSlot = filaments.find(f => f.ams_slot === slot)
    if (currentInSlot && currentInSlot.id !== filamentId) {
      await dispatch(editFilamentThunk({ id: currentInSlot.id, patch: { ams_slot: null } })).unwrap()
    }
    if (filamentId) {
      await dispatch(editFilamentThunk({ id: filamentId, patch: { ams_slot: slot } })).unwrap()
    }
  }

  async function handleAmsClear(slot: number) {
    const current = filaments.find(f => f.ams_slot === slot)
    if (current) {
      await dispatch(editFilamentThunk({ id: current.id, patch: { ams_slot: null } })).unwrap()
    }
  }

  async function handleEditOrder(input: WorkOrderInput) {
    if (!editOrder) return
    await dispatch(editOrderThunk({ id: editOrder.id, patch: input })).unwrap()
    setEditOrder(null)
  }

  function getFilament(id: string | null): Filament | null {
    return id ? (filamentMap.get(id) ?? null) : null
  }

  // Group rows by filament for section headers
  const filamentGroups: { filament: Filament | null; filamentId: string | null; rows: PrintQueueRow[] }[] = []
  for (const row of rows) {
    const last = filamentGroups[filamentGroups.length - 1]
    if (last && last.filamentId === row.filamentId) {
      last.rows.push(row)
    } else {
      filamentGroups.push({
        filament: getFilament(row.filamentId),
        filamentId: row.filamentId,
        rows: [row],
      })
    }
  }

  const inStock = filaments.filter(f => f.status === 'in_stock')

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppHeader
        currentPage="print-queue"
        onPrintQueue={onPrintQueue}
        onOrders={onOrders}
        onModels={onModels}
        onFilaments={onFilaments}
        onSettings={onSettings}
        onLogout={onLogout}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
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

        {/* AMS Slots */}
        {!loading && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">AMS Slots</h2>
            <p className="text-xs text-[var(--muted-foreground)]">
              Select which filament is currently loaded in each AMS slot.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {AMS_SLOTS.map(slot => {
                const loaded = filaments.find(f => f.ams_slot === slot) ?? null
                return (
                  <AmsSlotTile
                    key={slot}
                    slot={slot}
                    loaded={loaded}
                    filaments={inStock}
                    onAssign={id => void handleAmsSlotAssign(slot, id)}
                    onClear={() => void handleAmsClear(slot)}
                  />
                )
              })}
            </div>
          </section>
        )}

        {loading ? (
          <div className="text-center py-12 text-[var(--muted-foreground)]">Loading queue…</div>
        ) : rows.length === 0 ? (
          <div className="text-center py-12 space-y-2">
            <p className="text-4xl">🖨️</p>
            <p className="text-[var(--muted-foreground)]">Nothing left to print.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filamentGroups.map(group => (
              <div key={group.filamentId ?? '__none__'} className="space-y-2">
                {/* Filament group header */}
                <div className="flex items-center gap-2">
                  {group.filament ? (
                    <>
                      <span
                        className="w-3 h-3 rounded-full border border-[var(--border)] shrink-0"
                        style={{ background: group.filament.color_hex || colorNameToHex(group.filament.color) }}
                      />
                      <h3 className="text-sm font-semibold text-[var(--foreground)]">
                        {group.filament.color}
                      </h3>
                      <span className="text-xs text-[var(--muted-foreground)]">
                        {group.filament.brand} {group.filament.material}
                        {group.filament.ams_slot != null && ` · Slot ${group.filament.ams_slot}`}
                      </span>
                    </>
                  ) : (
                    <h3 className="text-sm font-semibold text-[var(--muted-foreground)]">
                      Unassigned / Custom Color
                    </h3>
                  )}
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--secondary)] text-[var(--muted-foreground)]">
                    {group.rows.length}
                  </span>
                </div>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto rounded-xl border border-[var(--border)]">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] bg-[var(--card)]">
                        <Th>Item</Th>
                        <Th>Status</Th>
                        <Th>Color</Th>
                        <Th>Filament</Th>
                        <Th>Order</Th>
                        <Th>Customer</Th>
                        <Th align="right">Actions</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.rows.map(row => {
                        const order = orders.find(o => o.id === row.orderId)
                        return (
                          <tr
                            key={`${row.orderId}-${row.itemIndex}`}
                            className="border-b border-[var(--border)] bg-[var(--card)] hover:bg-[var(--secondary)] transition-colors"
                          >
                            <Td><span className="font-medium text-[var(--foreground)]">{row.item}</span></Td>
                            <Td>
                              <ItemStatusSelect row={row} onChange={handleItemStatusChange} />
                            </Td>
                            <Td>
                              <ColorDot color={row.color} hex={getFilament(row.filamentId)?.color_hex} />
                            </Td>
                            <Td>
                              <span className="text-[var(--muted-foreground)]">
                                {row.filamentUsageG > 0 ? `${row.filamentUsageG}g` : '—'}
                              </span>
                            </Td>
                            <Td>
                              <span className="font-medium text-[var(--accent-blue)] tabular-nums">
                                #{row.orderNumber}
                              </span>
                            </Td>
                            <Td>{row.customer}</Td>
                            <Td align="right">
                              <div className="flex items-center justify-end gap-1">
                                {order && (
                                  <>
                                    <button
                                      onClick={() => setEditOrder(order)}
                                      className="p-1.5 rounded hover:bg-[var(--accent-orange-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-orange)] transition-colors"
                                      title="Edit order"
                                    >
                                      <ShoppingBag className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => setEditOrder(order)}
                                      className="p-1.5 rounded hover:bg-[var(--accent-blue-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-blue)] transition-colors"
                                      title="Edit item"
                                    >
                                      <Pencil className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </Td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-2">
                  {group.rows.map(row => {
                    const order = orders.find(o => o.id === row.orderId)
                    return (
                      <div
                        key={`${row.orderId}-${row.itemIndex}`}
                        className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-[var(--foreground)]">{row.item}</p>
                            <p className="text-xs text-[var(--muted-foreground)]">{row.customer} · #{row.orderNumber}</p>
                          </div>
                          <StatusBadge status={row.itemStatus} />
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                          <ColorDot color={row.color} hex={getFilament(row.filamentId)?.color_hex} />
                          {row.filamentUsageG > 0 && <span>{row.filamentUsageG}g</span>}
                        </div>
                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-[var(--border)]">
                          <ItemStatusSelect row={row} onChange={handleItemStatusChange} />
                          {order && (
                            <div className="flex gap-1">
                              <button
                                onClick={() => setEditOrder(order)}
                                className="p-1.5 rounded hover:bg-[var(--accent-orange-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-orange)] transition-colors"
                                title="Edit order"
                              >
                                <ShoppingBag className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditOrder(order)}
                                className="p-1.5 rounded hover:bg-[var(--accent-blue-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-blue)] transition-colors"
                                title="Edit item"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && rows.length > 0 && (
          <p className="text-xs text-center text-[var(--muted-foreground)]">
            {rows.length} item{rows.length !== 1 ? 's' : ''} to print
          </p>
        )}
      </main>

      {/* Edit Order Dialog */}
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
            onSave={handleEditOrder}
            onCancel={() => setEditOrder(null)}
            onGoToInventory={() => { setEditOrder(null); onModels() }}
            models={models}
            filaments={filaments}
            orders={orders}
          />
        </Dialog>
      )}
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

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

function ColorDot({ color, hex }: { color: string; hex?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-[var(--foreground)]">
      <span
        className="w-2.5 h-2.5 rounded-full border border-[var(--border)] shrink-0"
        style={{ background: hex || colorNameToHex(color) }}
      />
      {color}
    </span>
  )
}

function ItemStatusSelect({
  row,
  onChange,
}: {
  row: PrintQueueRow
  onChange: (row: PrintQueueRow, status: PrintItemStatus) => void
}) {
  return (
    <select
      value={row.itemStatus}
      onChange={e => void onChange(row, e.target.value as PrintItemStatus)}
      className="bg-[var(--input)] border border-[var(--border)] text-sm rounded px-2 py-1 text-[var(--foreground)] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--accent-orange)]"
    >
      {ITEM_STATUS_OPTIONS.map(o => (
        <option key={o.id} value={o.id}>{o.label}</option>
      ))}
    </select>
  )
}

// ── AMS Slot Tile ──────────────────────────────────────────────────────────────

interface AmsSlotTileProps {
  slot: number
  loaded: Filament | null
  filaments: Filament[]
  onAssign: (filamentId: string) => void
  onClear: () => void
}

function AmsSlotTile({ slot, loaded, filaments, onAssign, onClear }: AmsSlotTileProps) {
  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
          Slot {slot}
        </span>
        {loaded && (
          <button
            onClick={onClear}
            className="text-xs text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors"
            title="Clear slot"
          >
            Clear
          </button>
        )}
      </div>

      {loaded ? (
        <div className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded-full border border-[var(--border)] shrink-0"
            style={{ background: loaded.color_hex || colorNameToHex(loaded.color) }}
          />
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">{loaded.color}</p>
            <p className="text-xs text-[var(--muted-foreground)]">{loaded.brand} {loaded.material}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-[var(--muted-foreground)] italic">Empty</p>
      )}

      <select
        value={loaded?.id ?? ''}
        onChange={e => {
          if (e.target.value) onAssign(e.target.value)
          else onClear()
        }}
        className="w-full bg-[var(--input)] border border-[var(--border)] text-sm rounded px-2 py-1.5 text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-orange)]"
      >
        <option value="">— Empty —</option>
        {filaments.map(f => (
          <option key={f.id} value={f.id}>{f.color} ({f.material})</option>
        ))}
      </select>
    </div>
  )
}

/** Derive the order-level status from all item statuses.
 *  - All items complete → 'complete'
 *  - Any item printing or complete (but not all complete) → 'in_progress'
 *  - All items queued → 'waiting'
 */
function deriveOrderStatus(items: OrderItem[]): WorkOrderStatus {
  const statuses = items.map(i => i.status ?? 'queue')
  if (statuses.every(s => s === 'complete')) return 'complete'
  if (statuses.some(s => s === 'printing' || s === 'complete')) return 'in_progress'
  return 'waiting'
}
