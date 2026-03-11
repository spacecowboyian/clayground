import { useCallback, useEffect, useState } from 'react'
import { Button, Dialog, Accordion, Card } from '@gearhead/ui'
import { Pencil, Plus, ShoppingCart, Trash2, ExternalLink } from 'lucide-react'
import {
  listModels, createModel, updateModel, deleteModel,
  listFilaments, createFilament, updateFilament, deleteFilament,
  computeFilamentStats,
} from '../lib/inventory'
import { listOrders } from '../lib/storage'
import { totalFilamentUsageG } from '../lib/costing'
import { ModelForm } from '../components/ModelForm/ModelForm'
import { FilamentForm } from '../components/FilamentForm/FilamentForm'
import type { PrintModel, PrintModelInput, Filament, FilamentInput, FilamentStats } from '../types/Inventory'
import type { WorkOrder } from '../types/WorkOrder'

interface InventoryPageProps {
  onBack: () => void
}

export function InventoryPage({ onBack }: InventoryPageProps) {
  const [models, setModels]       = useState<PrintModel[]>([])
  const [filaments, setFilaments] = useState<Filament[]>([])
  const [orders, setOrders]       = useState<WorkOrder[]>([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState<string | null>(null)

  const [addModelOpen, setAddModelOpen]       = useState(false)
  const [editModel, setEditModel]             = useState<PrintModel | null>(null)
  const [deleteModelTarget, setDeleteModelTarget] = useState<PrintModel | null>(null)

  const [addFilamentOpen, setAddFilamentOpen]       = useState(false)
  const [editFilament, setEditFilament]             = useState<Filament | null>(null)
  const [deleteFilamentTarget, setDeleteFilamentTarget] = useState<Filament | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [m, f, o] = await Promise.all([listModels(), listFilaments(), listOrders()])
      setModels(m)
      setFilaments(f)
      setOrders(o)
    } catch {
      setError('Failed to load inventory. Check your configuration.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void reload() }, [reload])

  // ── Model handlers ───────────────────────────────────────────────────────────
  async function handleCreateModel(input: PrintModelInput) {
    await createModel(input)
    setAddModelOpen(false)
    await reload()
  }

  async function handleEditModel(input: PrintModelInput) {
    if (!editModel) return
    await updateModel(editModel.id, input)
    setEditModel(null)
    await reload()
  }

  async function handleDeleteModel() {
    if (!deleteModelTarget) return
    await deleteModel(deleteModelTarget.id)
    setDeleteModelTarget(null)
    await reload()
  }

  // ── Filament handlers ────────────────────────────────────────────────────────
  async function handleCreateFilament(input: FilamentInput) {
    await createFilament(input)
    setAddFilamentOpen(false)
    await reload()
  }

  async function handleEditFilament(input: FilamentInput) {
    if (!editFilament) return
    await updateFilament(editFilament.id, input)
    setEditFilament(null)
    await reload()
  }

  async function handleDeleteFilament() {
    if (!deleteFilamentTarget) return
    await deleteFilament(deleteFilamentTarget.id)
    setDeleteFilamentTarget(null)
    await reload()
  }

  // ── Derived: print history per model ────────────────────────────────────────
  function printHistoryForModel(model: PrintModel) {
    const completed = orders.filter(
      o => o.status === 'Complete' && (o.model_id === model.id || o.item === model.name)
    )
    const colorSet = new Set(completed.map(o => o.color))
    return { count: completed.length, colors: [...colorSet] }
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top bar */}
      <header className="border-b border-[var(--border)] bg-[var(--card)] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="./tinyprints-printer.svg" alt="Tiny Prints" className="w-9 h-9 object-contain" />
            <span className="font-bold text-[var(--foreground)] text-lg hidden sm:block">Tiny Prints</span>
            <span className="text-[var(--muted-foreground)] text-sm hidden sm:block">/ Inventory</span>
          </div>
          <Button variant="ghost" onPress={onBack} className="text-sm">
            ← Queue
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {loading && (
          <p className="text-[var(--muted-foreground)]">Loading inventory…</p>
        )}
        {error && (
          <p className="text-sm text-[var(--destructive)]">{error}</p>
        )}

        {!loading && (
          <>
            {/* ── Model Catalog ─────────────────────────────────────────── */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">Model Catalog</h2>
                  <p className="text-xs text-[var(--muted-foreground)]">Printable items you offer. Print history is derived from completed orders.</p>
                </div>
                <Button variant="primary" color="orange" onPress={() => setAddModelOpen(true)}>
                  <Plus className="w-4 h-4 mr-1" />
                  <span className="sm:hidden">Add</span>
                  <span className="hidden sm:inline">Add Model</span>
                </Button>
              </div>

              {models.length === 0 ? (
                <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-8 text-center">
                  <p className="text-[var(--muted-foreground)]">No models yet. Add your first model to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {models.map(model => {
                    const history = printHistoryForModel(model)
                    return (
                      <Card
                        key={model.id}
                        footer={
                          <div className="flex items-center gap-2">
                            {model.model_url && (
                              <a
                                href={model.model_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded hover:bg-[var(--accent-blue-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-blue)] transition-colors"
                                title="Open model"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                            <button
                              onClick={() => setEditModel(model)}
                              className="p-1.5 rounded hover:bg-[var(--accent-orange-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-orange)] transition-colors"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteModelTarget(model)}
                              className="p-1.5 rounded hover:bg-[var(--accent-red-light)] text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        }
                      >
                        {model.image_url && (
                          model.model_url ? (
                            <a
                              href={model.model_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                              title="Open model"
                            >
                              <img
                                src={model.image_url}
                                alt={model.name}
                                className="w-full h-32 object-cover rounded-lg border border-[var(--border)] hover:opacity-80 transition-opacity"
                              />
                            </a>
                          ) : (
                            <img
                              src={model.image_url}
                              alt={model.name}
                              className="w-full h-32 object-cover rounded-lg border border-[var(--border)]"
                            />
                          )
                        )}
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium text-[var(--foreground)]">{model.name}</p>
                            {model.self_created && (
                              <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--accent-orange-light)] text-[var(--accent-orange)] font-medium shrink-0">
                                Self-created
                              </span>
                            )}
                          </div>
                          {model.description && (
                            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{model.description}</p>
                          )}
                        </div>

                        {/* Filament requirements */}
                        {model.filament_requirements?.length > 0 && (
                          <div className="text-xs space-y-1">
                            <p className="text-[var(--muted-foreground)] font-medium">
                              Filament · {totalFilamentUsageG(model.filament_requirements)}g total
                            </p>
                            <div className="space-y-0.5">
                              {model.filament_requirements.map((req, i) => {
                                const fil = filaments.find(f => f.id === req.filament_id)
                                return (
                                  <div key={i} className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
                                    {fil ? (
                                      <ColorChip color={fil.color} hex={fil.color_hex} />
                                    ) : (
                                      <span className="italic">Unassigned</span>
                                    )}
                                    <span>— {req.quantity_g}g</span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* Print history */}
                        <div className="text-xs space-y-1">
                          <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                            <span>Printed:</span>
                            <span className="font-medium text-[var(--accent-green)]">{history.count}×</span>
                          </div>
                          {history.colors.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {history.colors.map(c => (
                                <ColorChip key={c} color={c} />
                              ))}
                            </div>
                          )}
                        </div>
                      </Card>
                    )
                  })}
                </div>
              )}
            </section>

            {/* ── Filament Inventory ────────────────────────────────────── */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">Filament Inventory</h2>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Filament rolls you currently have. Only in-stock filaments appear as color options when creating orders.
                  </p>
                </div>
                <Button variant="primary" color="orange" onPress={() => setAddFilamentOpen(true)}>
                  <Plus className="w-4 h-4 mr-1" />
                  <span className="sm:hidden">Add</span>
                  <span className="hidden sm:inline">Add Filament</span>
                </Button>
              </div>

              {filaments.length === 0 ? (
                <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-8 text-center">
                  <p className="text-[var(--muted-foreground)]">No filaments yet. Add your first filament to get started.</p>
                </div>
              ) : (
                <>
                  {/* In-stock */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-[var(--foreground)]">
                      In Stock <span className="text-[var(--accent-green)]">({filaments.filter(f => f.in_stock).length})</span>
                    </h3>
                    <FilamentTable
                      filaments={filaments.filter(f => f.in_stock)}
                      stats={computeFilamentStats(filaments, orders, models)}
                      onEdit={setEditFilament}
                      onDelete={setDeleteFilamentTarget}
                      onToggleStock={async f => {
                        await updateFilament(f.id, { in_stock: !f.in_stock })
                        await reload()
                      }}
                    />
                  </div>

                  {/* Out of stock */}
                  {filaments.some(f => !f.in_stock) && (
                    <Accordion
                      title="Out of Stock"
                      badge={
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--secondary)] text-[var(--muted-foreground)]">
                          {filaments.filter(f => !f.in_stock).length}
                        </span>
                      }
                    >
                      <FilamentTable
                        filaments={filaments.filter(f => !f.in_stock)}
                        stats={computeFilamentStats(filaments, orders, models)}
                        onEdit={setEditFilament}
                        onDelete={setDeleteFilamentTarget}
                        onToggleStock={async f => {
                          await updateFilament(f.id, { in_stock: !f.in_stock })
                          await reload()
                        }}
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

      {/* Add Model Dialog */}
      {addModelOpen && (
        <Dialog
          isOpen
          onOpenChange={open => { if (!open) setAddModelOpen(false) }}
          trigger={<span />}
          title="Add Model"
        >
          <ModelForm
            onSave={handleCreateModel}
            onCancel={() => setAddModelOpen(false)}
            filaments={filaments}
          />
        </Dialog>
      )}

      {/* Edit Model Dialog */}
      {editModel && (
        <Dialog
          isOpen
          onOpenChange={open => { if (!open) setEditModel(null) }}
          trigger={<span />}
          title="Edit Model"
        >
          <ModelForm
            initial={editModel}
            onSave={handleEditModel}
            onCancel={() => setEditModel(null)}
            filaments={filaments}
          />
        </Dialog>
      )}

      {/* Delete Model Dialog */}
      {deleteModelTarget && (
        <Dialog
          isOpen
          onOpenChange={open => { if (!open) setDeleteModelTarget(null) }}
          trigger={<span />}
          title="Delete Model"
          footer={
            <>
              <Button variant="outline" onPress={() => setDeleteModelTarget(null)}>Cancel</Button>
              <Button variant="destructive" onPress={() => void handleDeleteModel()}>Delete</Button>
            </>
          }
        >
          <p>
            Are you sure you want to delete <strong>{deleteModelTarget.name}</strong>? This cannot be undone.
          </p>
        </Dialog>
      )}

      {/* Add Filament Dialog */}
      {addFilamentOpen && (
        <Dialog
          isOpen
          onOpenChange={open => { if (!open) setAddFilamentOpen(false) }}
          trigger={<span />}
          title="Add Filament"
        >
          <FilamentForm
            onSave={handleCreateFilament}
            onCancel={() => setAddFilamentOpen(false)}
          />
        </Dialog>
      )}

      {/* Edit Filament Dialog */}
      {editFilament && (
        <Dialog
          isOpen
          onOpenChange={open => { if (!open) setEditFilament(null) }}
          trigger={<span />}
          title="Edit Filament"
        >
          <FilamentForm
            initial={editFilament}
            onSave={handleEditFilament}
            onCancel={() => setEditFilament(null)}
          />
        </Dialog>
      )}

      {/* Delete Filament Dialog */}
      {deleteFilamentTarget && (
        <Dialog
          isOpen
          onOpenChange={open => { if (!open) setDeleteFilamentTarget(null) }}
          trigger={<span />}
          title="Delete Filament"
          footer={
            <>
              <Button variant="outline" onPress={() => setDeleteFilamentTarget(null)}>Cancel</Button>
              <Button variant="destructive" onPress={() => void handleDeleteFilament()}>Delete</Button>
            </>
          }
        >
          <p>
            Are you sure you want to delete the <strong>{deleteFilamentTarget.color}</strong> filament? This cannot be undone.
          </p>
        </Dialog>
      )}
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
              <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">On Hand</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Reserved</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Consumed</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Remaining</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Stock</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filaments.map(f => {
              const fs = getStats(f.id)
              const remaining = fs?.remaining_g ?? f.current_quantity_g
              const overcommitted = remaining < 0
              const lowStock = !overcommitted && remaining < 100
              return (
                <tr key={f.id} className="border-b border-[var(--border)] hover:bg-[var(--secondary)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <ColorChip color={f.color} hex={f.color_hex} />
                      {overcommitted && (
                        <span className="text-xs text-[var(--destructive)]" title="Overcommitted — not enough filament for queued orders">⚠</span>
                      )}
                      {lowStock && (
                        <span className="text-xs text-[var(--accent-orange)]" title="Running low">↓</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--foreground)]">
                    {f.brand ? `${f.brand} · ` : ''}{f.material}
                  </td>
                  <td className="px-4 py-3 text-[var(--foreground)]">{f.current_quantity_g}g</td>
                  <td className="px-4 py-3 text-[var(--accent-orange)]">{fs ? `${fs.reserved_g}g` : '—'}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{fs ? `${fs.consumed_g}g` : '—'}</td>
                  <td className={`px-4 py-3 font-medium ${overcommitted ? 'text-[var(--destructive)]' : lowStock ? 'text-[var(--accent-orange)]' : 'text-[var(--accent-green)]'}`}>
                    {fs ? `${remaining}g` : '—'}
                    {overcommitted && <span className="ml-1 text-xs font-normal">overcommitted</span>}
                    {lowStock && <span className="ml-1 text-xs font-normal">low</span>}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onToggleStock(f)}
                      className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
                        f.in_stock
                          ? 'bg-[var(--accent-green-light)] text-[var(--accent-green)] hover:opacity-80'
                          : 'bg-[var(--secondary)] text-[var(--muted-foreground)] hover:opacity-80'
                      }`}
                    >
                      {f.in_stock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {f.purchase_url && (
                        <a
                          href={f.purchase_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded hover:bg-[var(--accent-blue-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-blue)] transition-colors"
                          title="Buy filament"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => onEdit(f)}
                        className="p-1.5 rounded hover:bg-[var(--accent-orange-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-orange)] transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(f)}
                        className="p-1.5 rounded hover:bg-[var(--accent-red-light)] text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors"
                        title="Delete"
                      >
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
          const overcommitted = remaining < 0
          const lowStock = !overcommitted && remaining < 100
          return (
            <div key={f.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <ColorChip color={f.color} hex={f.color_hex} />
                  {overcommitted && <span className="text-xs text-[var(--destructive)]" title="Overcommitted">⚠</span>}
                  {lowStock && <span className="text-xs text-[var(--accent-orange)]" title="Low stock">↓</span>}
                </div>
                <button
                  onClick={() => onToggleStock(f)}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    f.in_stock
                      ? 'bg-[var(--accent-green-light)] text-[var(--accent-green)]'
                      : 'bg-[var(--secondary)] text-[var(--muted-foreground)]'
                  }`}
                >
                  {f.in_stock ? 'In Stock' : 'Out of Stock'}
                </button>
              </div>
              <p className="text-xs text-[var(--muted-foreground)]">{f.brand ? `${f.brand} · ` : ''}{f.material}</p>
              {fs && (
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-[var(--muted-foreground)]">On hand</p>
                    <p className="font-medium text-[var(--foreground)]">{f.current_quantity_g}g</p>
                  </div>
                  <div>
                    <p className="text-[var(--muted-foreground)]">Reserved</p>
                    <p className="font-medium text-[var(--accent-orange)]">{fs.reserved_g}g</p>
                  </div>
                  <div>
                    <p className="text-[var(--muted-foreground)]">Remaining</p>
                    <p className={`font-medium ${overcommitted ? 'text-[var(--destructive)]' : lowStock ? 'text-[var(--accent-orange)]' : 'text-[var(--accent-green)]'}`}>
                      {remaining}g
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-1 pt-1">
                {f.purchase_url && (
                  <a
                    href={f.purchase_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded hover:bg-[var(--accent-blue-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-blue)] transition-colors"
                    title="Buy filament"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => onEdit(f)}
                  className="p-1.5 rounded hover:bg-[var(--accent-orange-light)] text-[var(--muted-foreground)] transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(f)}
                  className="p-1.5 rounded hover:bg-[var(--accent-red-light)] text-[var(--muted-foreground)] transition-colors"
                >
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

// ── Color chip helper ──────────────────────────────────────────────────────────

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
      <span
        className="w-3 h-3 rounded-full border border-[var(--border)] shrink-0"
        style={{ background: bg }}
      />
      {color}
    </span>
  )
}
