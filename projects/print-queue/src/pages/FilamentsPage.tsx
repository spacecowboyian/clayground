import { useCallback, useEffect } from 'react'
import { Button, Dialog, Accordion } from '@gearhead/ui'
import { Pencil, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { computeFilamentStats } from '../lib/inventory'
import { FilamentForm } from '../components/FilamentForm/FilamentForm'
import { ErrorModal } from '../components/ErrorModal/ErrorModal'
import { AppHeader } from '../components/AppHeader/AppHeader'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchInventory, addFilament, editFilament as editFilamentThunk, removeFilament, clearInventoryError } from '../store/inventorySlice'
import { fetchOrders } from '../store/ordersSlice'
import type { Filament, FilamentInput, FilamentStats } from '../types/Inventory'
import { useState } from 'react'

const AMS_SLOTS = [1, 2, 3, 4] as const

interface FilamentsPageProps {
  onLogout?: () => void
  onPrintQueue: () => void
  onOrders: () => void
  onModels: () => void
  onFilaments: () => void
  onSettings: () => void
}

export function FilamentsPage({ onLogout, onPrintQueue, onOrders, onModels, onFilaments, onSettings }: FilamentsPageProps) {
  const dispatch  = useAppDispatch()
  const filaments = useAppSelector(state => state.inventory.filaments)
  const models    = useAppSelector(state => state.inventory.models)
  const orders    = useAppSelector(state => state.orders.items)
  const loading   = useAppSelector(state => state.inventory.loading || state.orders.loading)
  const error     = useAppSelector(state => state.inventory.error ?? state.orders.error)

  const [addFilamentOpen, setAddFilamentOpen]           = useState(false)
  const [editFilament, setEditFilament]                 = useState<Filament | null>(null)
  const [deleteFilamentTarget, setDeleteFilamentTarget] = useState<Filament | null>(null)

  const load = useCallback(() => {
    void dispatch(fetchInventory())
    void dispatch(fetchOrders())
  }, [dispatch])

  useEffect(() => { load() }, [load])

  async function handleCreateFilament(input: FilamentInput) {
    await dispatch(addFilament(input)).unwrap()
    setAddFilamentOpen(false)
  }

  async function handleEditFilament(input: FilamentInput) {
    if (!editFilament) return
    await dispatch(editFilamentThunk({ id: editFilament.id, patch: input })).unwrap()
    setEditFilament(null)
  }

  async function handleDeleteFilament() {
    if (!deleteFilamentTarget) return
    await dispatch(removeFilament(deleteFilamentTarget.id)).unwrap()
    setDeleteFilamentTarget(null)
  }

  function handleToggleStock(f: Filament) {
    void dispatch(editFilamentThunk({ id: f.id, patch: { in_stock: !f.in_stock } }))
  }

  async function handleAmsSlotAssign(slot: number, filamentId: string | null) {
    // Clear any filament currently in this slot
    const currentInSlot = filaments.find(f => f.ams_slot === slot)
    if (currentInSlot && currentInSlot.id !== filamentId) {
      await dispatch(editFilamentThunk({ id: currentInSlot.id, patch: { ams_slot: null } })).unwrap()
    }
    if (filamentId) {
      // If the chosen filament was in a different slot, clear that too
      const chosen = filaments.find(f => f.id === filamentId)
      if (chosen && chosen.ams_slot !== null && chosen.ams_slot !== slot) {
        // ams_slot will be overwritten below
      }
      await dispatch(editFilamentThunk({ id: filamentId, patch: { ams_slot: slot } })).unwrap()
    }
  }

  async function handleAmsClear(slot: number) {
    const current = filaments.find(f => f.ams_slot === slot)
    if (current) {
      await dispatch(editFilamentThunk({ id: current.id, patch: { ams_slot: null } })).unwrap()
    }
  }

  const stats = computeFilamentStats(filaments, orders, models)
  const inStock    = filaments.filter(f => f.in_stock)
  const outOfStock = filaments.filter(f => !f.in_stock)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppHeader
        currentPage="filaments"
        onPrintQueue={onPrintQueue}
        onOrders={onOrders}
        onModels={onModels}
        onFilaments={onFilaments}
        onSettings={onSettings}
        onLogout={onLogout}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {loading && <p className="text-[var(--muted-foreground)]">Loading filaments…</p>}

        {error && (
          <ErrorModal
            error={error}
            onRetry={() => { dispatch(clearInventoryError()); load() }}
            onDismiss={() => dispatch(clearInventoryError())}
          />
        )}

        {!loading && (
          <>
            {/* ── AMS Slots ─────────────────────────────────────────────── */}
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">AMS Slots</h2>
              <p className="text-xs text-[var(--muted-foreground)]">
                Select which filament is currently loaded in each AMS slot. Used for print queue estimates.
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

            {/* ── Filament Inventory ─────────────────────────────────────── */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">Filament Inventory</h2>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Only in-stock filaments appear as color options when creating orders.
                  </p>
                </div>
                <Button variant="primary" color="orange" className="hidden sm:flex" onPress={() => setAddFilamentOpen(true)}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Filament
                </Button>
              </div>
              <Button variant="primary" color="orange" className="sm:hidden w-full justify-center" onPress={() => setAddFilamentOpen(true)}>
                <Plus className="w-4 h-4 mr-1" />
                Add Filament
              </Button>

              {filaments.length === 0 ? (
                <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-8 text-center">
                  <p className="text-[var(--muted-foreground)]">No filaments yet. Add your first filament to get started.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-[var(--foreground)]">
                      In Stock <span className="text-[var(--accent-green)]">({inStock.length})</span>
                    </h3>
                    <FilamentTable
                      filaments={inStock}
                      stats={stats}
                      onEdit={setEditFilament}
                      onDelete={setDeleteFilamentTarget}
                      onToggleStock={handleToggleStock}
                    />
                  </div>

                  {outOfStock.length > 0 && (
                    <Accordion
                      title="Out of Stock"
                      badge={
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--secondary)] text-[var(--muted-foreground)]">
                          {outOfStock.length}
                        </span>
                      }
                    >
                      <FilamentTable
                        filaments={outOfStock}
                        stats={stats}
                        onEdit={setEditFilament}
                        onDelete={setDeleteFilamentTarget}
                        onToggleStock={handleToggleStock}
                        muted
                      />
                    </Accordion>
                  )}
                </>
              )}
            </section>
          </>
        )}
      </main>

      {addFilamentOpen && (
        <Dialog isOpen size="xl" onOpenChange={open => { if (!open) setAddFilamentOpen(false) }} trigger={<span />} title="Add Filament">
          <FilamentForm onSave={handleCreateFilament} onCancel={() => setAddFilamentOpen(false)} />
        </Dialog>
      )}
      {editFilament && (
        <Dialog isOpen size="xl" onOpenChange={open => { if (!open) setEditFilament(null) }} trigger={<span />} title="Edit Filament">
          <FilamentForm initial={editFilament} onSave={handleEditFilament} onCancel={() => setEditFilament(null)} />
        </Dialog>
      )}
      {deleteFilamentTarget && (
        <Dialog isOpen onOpenChange={open => { if (!open) setDeleteFilamentTarget(null) }} trigger={<span />} title="Delete Filament"
          footer={
            <>
              <Button variant="outline" onPress={() => setDeleteFilamentTarget(null)}>Cancel</Button>
              <Button variant="destructive" onPress={() => void handleDeleteFilament()}>Delete</Button>
            </>
          }
        >
          <p>Are you sure you want to delete the <strong>{deleteFilamentTarget.color}</strong> filament? This cannot be undone.</p>
        </Dialog>
      )}
    </div>
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

// ── Filament table ─────────────────────────────────────────────────────────────

interface FilamentTableProps {
  filaments: Filament[]
  stats: FilamentStats[]
  onEdit: (f: Filament) => void
  onDelete: (f: Filament) => void
  onToggleStock: (f: Filament) => void
  muted?: boolean
}

function FilamentTable({ filaments, stats, onEdit, onDelete, onToggleStock, muted }: FilamentTableProps) {
  if (filaments.length === 0) return null

  function getStats(id: string): FilamentStats | undefined {
    return stats.find(s => s.filament_id === id)
  }

  return (
    <div className={`bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden ${muted ? 'opacity-70' : ''}`}>
      {/* Desktop */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Color</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Brand / Material</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">AMS</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Last count</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Reserved</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Consumed</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Remaining</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filaments.map(f => {
              const fs = getStats(f.id)
              const remaining = fs?.remaining_g ?? f.current_quantity_g
              const depleted = remaining <= 0
              const lowStock = !depleted && remaining < 100
              return (
                <tr key={f.id} className="border-b border-[var(--border)] hover:bg-[var(--secondary)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <ColorChip color={f.color} hex={f.color_hex} />
                      {depleted && <span className="text-xs text-[var(--destructive)]" title={remaining < 0 ? 'Overcommitted' : 'Out of stock'}>⚠</span>}
                      {lowStock && <span className="text-xs text-[var(--accent-orange)]" title="Running low">↓</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--foreground)]">{f.brand ? `${f.brand} · ` : ''}{f.material}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)] text-xs">
                    {f.ams_slot != null ? `Slot ${f.ams_slot}` : '—'}
                  </td>
                  <td className="px-4 py-3 text-[var(--foreground)]">{f.current_quantity_g}g</td>
                  <td className="px-4 py-3 text-[var(--accent-orange)]">{fs ? `${fs.reserved_g}g` : '—'}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{fs ? `${fs.consumed_g}g` : '—'}</td>
                  <td className={`px-4 py-3 ${depleted ? 'font-bold text-[var(--destructive)]' : lowStock ? 'font-medium text-[var(--accent-orange)]' : 'font-medium text-[var(--accent-green)]'}`}>
                    {fs ? `${remaining}g` : '—'}
                    {remaining < 0 && <span className="ml-1 text-xs font-normal">overcommitted</span>}
                    {lowStock && <span className="ml-1 text-xs font-normal">low</span>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {f.purchase_url && (
                        <a href={f.purchase_url} target="_blank" rel="noopener noreferrer"
                          className="p-1.5 rounded hover:bg-[var(--accent-blue-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-blue)] transition-colors" title="Buy filament">
                          <ShoppingCart className="w-4 h-4" />
                        </a>
                      )}
                      <button onClick={() => onEdit(f)}
                        className="p-1.5 rounded hover:bg-[var(--accent-orange-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-orange)] transition-colors" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(f)}
                        className="p-1.5 rounded hover:bg-[var(--accent-red-light)] text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="sm:hidden divide-y divide-[var(--border)]">
        {filaments.map(f => {
          const fs = getStats(f.id)
          const remaining = fs?.remaining_g ?? f.current_quantity_g
          const depleted = remaining <= 0
          const lowStock = !depleted && remaining < 100
          return (
            <div key={f.id} className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-1.5 min-w-0">
                  <ColorChip color={f.color} hex={f.color_hex} />
                  {depleted && <span className="text-xs text-[var(--destructive)]">⚠</span>}
                  {lowStock && <span className="text-xs text-[var(--accent-orange)]">↓</span>}
                  {f.ams_slot != null && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--accent-blue-light)] text-[var(--accent-blue)] font-medium">
                      Slot {f.ams_slot}
                    </span>
                  )}
                </div>
                <button onClick={() => onToggleStock(f)} className="p-1 rounded shrink-0 hover:opacity-70 transition-opacity"
                  title={f.in_stock ? 'In Stock' : 'Out of Stock'}>
                  <span className={`block w-3 h-3 rounded-full ${f.in_stock ? 'bg-[var(--accent-green)]' : 'bg-[var(--destructive)]'}`} />
                </button>
              </div>
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs text-[var(--muted-foreground)] min-w-0">{f.brand ? `${f.brand} · ` : ''}{f.material}</p>
                {fs && (
                  <div className="flex gap-3 text-xs shrink-0">
                    <div className="text-right">
                      <p className="text-[var(--muted-foreground)]">Last count</p>
                      <p className="font-medium text-[var(--foreground)]">{f.current_quantity_g}g</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[var(--muted-foreground)]">Rsv</p>
                      <p className="font-medium text-[var(--accent-orange)]">{fs.reserved_g}g</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[var(--muted-foreground)]">Rem</p>
                      <p className={`${depleted ? 'font-bold text-[var(--destructive)]' : lowStock ? 'font-medium text-[var(--accent-orange)]' : 'font-medium text-[var(--accent-green)]'}`}>
                        {remaining}g
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end gap-1 pt-1">
                {f.purchase_url && (
                  <a href={f.purchase_url} target="_blank" rel="noopener noreferrer"
                    className="p-1.5 rounded hover:bg-[var(--accent-blue-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-blue)] transition-colors" title="Buy">
                    <ShoppingCart className="w-4 h-4" />
                  </a>
                )}
                <button onClick={() => onEdit(f)}
                  className="p-1.5 rounded hover:bg-[var(--accent-orange-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-orange)] transition-colors" title="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(f)}
                  className="p-1.5 rounded hover:bg-[var(--accent-red-light)] text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function colorNameToHex(name: string): string {
  const map: Record<string, string> = {
    pink: '#f472b6', purple: '#a855f7', 'light blue': '#7dd3fc',
    yellow: '#fde047', blue: '#3b82f6', 'dark blue': '#1e40af',
    red: '#ef4444', green: '#22c55e', orange: '#f97316',
    white: '#f5f5f5', black: '#1a1a1a', gray: '#9ca3af', tbd: '#6b7280',
  }
  return map[name.toLowerCase()] ?? '#9ca3af'
}

function ColorChip({ color, hex }: { color: string; hex?: string }) {
  const bg = hex || colorNameToHex(color)
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-[var(--foreground)]">
      <span className="w-3 h-3 rounded-full border border-[var(--border)] shrink-0" style={{ background: bg }} />
      {color}
    </span>
  )
}
