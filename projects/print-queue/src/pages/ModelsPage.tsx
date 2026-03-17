import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Dialog, Card, SearchField } from '@gearhead/ui'
import { Pencil, Plus, Trash2, ExternalLink } from 'lucide-react'
import { totalFilamentUsageG } from '../lib/costing'
import { ModelForm } from '../components/ModelForm/ModelForm'
import { ErrorModal } from '../components/ErrorModal/ErrorModal'
import { AppHeader } from '../components/AppHeader/AppHeader'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchInventory, addModel, editModel as editModelThunk, removeModel, clearInventoryError } from '../store/inventorySlice'
import { fetchOrders } from '../store/ordersSlice'
import type { PrintModel, PrintModelInput } from '../types/Inventory'

interface ModelsPageProps {
  onLogout?: () => void
  onPrintQueue: () => void
  onOrders: () => void
  onModels: () => void
  onFilaments: () => void
  onSettings: () => void
}

export function ModelsPage({ onLogout, onPrintQueue, onOrders, onModels, onFilaments, onSettings }: ModelsPageProps) {
  const dispatch  = useAppDispatch()
  const models    = useAppSelector(state => state.inventory.models)
  const filaments = useAppSelector(state => state.inventory.filaments)
  const orders    = useAppSelector(state => state.orders.items)
  const loading   = useAppSelector(state => state.inventory.loading || state.orders.loading)
  const error     = useAppSelector(state => state.inventory.error ?? state.orders.error)

  const [addModelOpen, setAddModelOpen]           = useState(false)
  const [editModel, setEditModel]                 = useState<PrintModel | null>(null)
  const [deleteModelTarget, setDeleteModelTarget] = useState<PrintModel | null>(null)
  const [modelSearch, setModelSearch]             = useState('')
  const [showAllDefault, setShowAllDefault]       = useState(false)

  const load = useCallback(() => {
    void dispatch(fetchInventory())
    void dispatch(fetchOrders())
  }, [dispatch])

  useEffect(() => { load() }, [load])

  async function handleCreateModel(input: PrintModelInput) {
    await dispatch(addModel(input)).unwrap()
    setAddModelOpen(false)
  }

  async function handleEditModel(input: PrintModelInput) {
    if (!editModel) return
    await dispatch(editModelThunk({ id: editModel.id, patch: input })).unwrap()
    setEditModel(null)
  }

  async function handleDeleteModel() {
    if (!deleteModelTarget) return
    await dispatch(removeModel(deleteModelTarget.id)).unwrap()
    setDeleteModelTarget(null)
  }

  function printHistoryForModel(model: PrintModel) {
    const completed = orders.filter(
      o => o.status === 'complete' && (o.model_id === model.id || o.item === model.name)
    )
    const colorSet = new Set(completed.map(o => o.color))
    return { count: completed.length, colors: [...colorSet] }
  }

  const modelQuery = modelSearch.trim().toLowerCase()
  const isSearching = modelQuery.length > 1

  const recentModels = useMemo(
    () =>
      [...models]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 6),
    [models],
  )

  const searchResults = useMemo(() => {
    if (!isSearching) return []
    function score(model: PrintModel): number {
      let s = 0
      const name = model.name.toLowerCase()
      if (name === modelQuery)              s += 100
      else if (name.startsWith(modelQuery)) s += 80
      else if (name.includes(modelQuery))   s += 60
      if (model.description.toLowerCase().includes(modelQuery)) s += 40
      if (String(model.post_processing_mins).includes(modelQuery)) s += 10
      model.filament_requirements?.forEach(req => {
        if (String(req.quantity_g).includes(modelQuery)) s += 10
      })
      return s
    }
    return models
      .map(m => ({ model: m, score: score(m) }))
      .filter(({ score: s }) => s > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ model }) => model)
  }, [models, isSearching, modelQuery])

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppHeader
        currentPage="models"
        onPrintQueue={onPrintQueue}
        onOrders={onOrders}
        onModels={onModels}
        onFilaments={onFilaments}
        onSettings={onSettings}
        onLogout={onLogout}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {loading && <p className="text-[var(--muted-foreground)]">Loading models…</p>}

        {error && (
          <ErrorModal
            error={error}
            onRetry={() => { dispatch(clearInventoryError()); load() }}
            onDismiss={() => dispatch(clearInventoryError())}
          />
        )}

        {!loading && (
          <section className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-lg font-semibold text-[var(--foreground)] shrink-0">Model Catalog</h2>
              <div className="flex-1 min-w-0 max-w-xs">
                <SearchField
                  value={modelSearch}
                  onChange={setModelSearch}
                  placeholder="Search models…"
                  focusColor="orange"
                  aria-label="Search models"
                />
              </div>
              <div className="ml-auto shrink-0 hidden sm:block">
                <Button variant="primary" color="orange" onPress={() => setAddModelOpen(true)}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Model
                </Button>
              </div>
            </div>
            <Button variant="primary" color="orange" className="sm:hidden w-full justify-center" onPress={() => setAddModelOpen(true)}>
              <Plus className="w-4 h-4 mr-1" />
              Add Model
            </Button>

            {models.length === 0 ? (
              <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-8 text-center">
                <p className="text-[var(--muted-foreground)]">No models yet. Add your first model to get started.</p>
              </div>
            ) : isSearching ? (
              <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
                {searchResults.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-[var(--muted-foreground)]">No models match &ldquo;{modelSearch}&rdquo;</p>
                  </div>
                ) : (
                  <>
                    <div className="hidden sm:block overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[var(--border)]">
                            <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Notes</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Filament</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.map(model => (
                            <tr key={model.id} className="border-b border-[var(--border)] hover:bg-[var(--secondary)] transition-colors">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-medium text-[var(--foreground)]">{model.name}</span>
                                  {model.self_created && (
                                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--accent-orange-light)] text-[var(--accent-orange)] font-medium">Self-created</span>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] max-w-xs truncate">{model.description || '—'}</td>
                              <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{totalFilamentUsageG(model.filament_requirements)}g</td>
                              <td className="px-4 py-3 text-right">
                                <ModelActions model={model} onEdit={setEditModel} onDelete={setDeleteModelTarget} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="sm:hidden divide-y divide-[var(--border)]">
                      {searchResults.map(model => (
                        <div key={model.id} className="p-4 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-medium text-[var(--foreground)]">{model.name}</p>
                                {model.self_created && (
                                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--accent-orange-light)] text-[var(--accent-orange)]">Self-created</span>
                                )}
                              </div>
                              {model.description && <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{model.description}</p>}
                            </div>
                            <ModelActions model={model} onEdit={setEditModel} onDelete={setDeleteModelTarget} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {(showAllDefault ? models : recentModels).map(model => {
                    const history = printHistoryForModel(model)
                    return (
                      <Card
                        key={model.id}
                        footer={
                          <div className="flex items-center gap-2">
                            {model.model_url && (
                              <a href={model.model_url} target="_blank" rel="noopener noreferrer"
                                className="p-1.5 rounded hover:bg-[var(--accent-blue-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-blue)] transition-colors" title="Open model">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                            <button onClick={() => setEditModel(model)}
                              className="p-1.5 rounded hover:bg-[var(--accent-orange-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-orange)] transition-colors" title="Edit">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button onClick={() => setDeleteModelTarget(model)}
                              className="p-1.5 rounded hover:bg-[var(--accent-red-light)] text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        }
                      >
                        {model.image_url && (
                          model.model_url ? (
                            <a href={model.model_url} target="_blank" rel="noopener noreferrer" className="block" title="Open model">
                              <img src={model.image_url} alt={model.name} className="w-full h-32 object-cover rounded-lg border border-[var(--border)] hover:opacity-80 transition-opacity" />
                            </a>
                          ) : (
                            <img src={model.image_url} alt={model.name} className="w-full h-32 object-cover rounded-lg border border-[var(--border)]" />
                          )
                        )}
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium text-[var(--foreground)]">{model.name}</p>
                            {model.self_created && (
                              <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--accent-orange-light)] text-[var(--accent-orange)] font-medium shrink-0">Self-created</span>
                            )}
                          </div>
                          {model.description && <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{model.description}</p>}
                        </div>
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
                                    {fil ? <ColorChip color={fil.color} hex={fil.color_hex} /> : <span className="italic">Unassigned</span>}
                                    <span>— {req.quantity_g}g</span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}
                        <div className="text-xs space-y-1">
                          <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                            <span>Printed:</span>
                            <span className="font-medium text-[var(--accent-green)]">{history.count}×</span>
                          </div>
                          {history.colors.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {history.colors.map(c => <ColorChip key={c} color={c} />)}
                            </div>
                          )}
                        </div>
                      </Card>
                    )
                  })}
                </div>
                {models.length > 6 && !showAllDefault && (
                  <p className="text-xs text-center text-[var(--muted-foreground)]">
                    Showing 6 of {models.length} models ·{' '}
                    <button className="text-[var(--accent-orange)] hover:underline" onClick={() => setShowAllDefault(true)}>
                      Show all
                    </button>
                    {' '}or search above to filter
                  </p>
                )}
              </>
            )}
          </section>
        )}
      </main>

      {addModelOpen && (
        <Dialog isOpen size="xl" onOpenChange={open => { if (!open) setAddModelOpen(false) }} trigger={<span />} title="Add Model">
          <ModelForm onSave={handleCreateModel} onCancel={() => setAddModelOpen(false)} filaments={filaments} />
        </Dialog>
      )}
      {editModel && (
        <Dialog isOpen size="xl" onOpenChange={open => { if (!open) setEditModel(null) }} trigger={<span />} title="Edit Model">
          <ModelForm initial={editModel} onSave={handleEditModel} onCancel={() => setEditModel(null)} filaments={filaments} />
        </Dialog>
      )}
      {deleteModelTarget && (
        <Dialog isOpen onOpenChange={open => { if (!open) setDeleteModelTarget(null) }} trigger={<span />} title="Delete Model"
          footer={
            <>
              <Button variant="outline" onPress={() => setDeleteModelTarget(null)}>Cancel</Button>
              <Button variant="destructive" onPress={() => void handleDeleteModel()}>Delete</Button>
            </>
          }
        >
          <p>Are you sure you want to delete <strong>{deleteModelTarget.name}</strong>? This cannot be undone.</p>
        </Dialog>
      )}
    </div>
  )
}

function ModelActions({ model, onEdit, onDelete }: { model: PrintModel; onEdit: (m: PrintModel) => void; onDelete: (m: PrintModel) => void }) {
  return (
    <div className="flex items-center justify-end gap-1">
      {model.model_url && (
        <a href={model.model_url} target="_blank" rel="noopener noreferrer"
          className="p-1.5 rounded hover:bg-[var(--accent-blue-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-blue)] transition-colors" title="Open model">
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
      <button onClick={() => onEdit(model)}
        className="p-1.5 rounded hover:bg-[var(--accent-orange-light)] text-[var(--muted-foreground)] hover:text-[var(--accent-orange)] transition-colors" title="Edit">
        <Pencil className="w-4 h-4" />
      </button>
      <button onClick={() => onDelete(model)}
        className="p-1.5 rounded hover:bg-[var(--accent-red-light)] text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors" title="Delete">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}

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
