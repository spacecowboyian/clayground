import { useMemo, useState } from 'react'
import { Button, TextField, Select, Switch, TextArea, NumberField } from '@gearhead/ui'
import { Plus, Trash2 } from 'lucide-react'
import type { WorkOrder, WorkOrderInput, WorkOrderStatus, OrderItem } from '../../types/WorkOrder'
import type { PrintModel, Filament } from '../../types/Inventory'
import { loadSettings } from '../../lib/settings'
import { calculateItemCost } from '../../lib/costing'
import { computeFilamentStats } from '../../lib/inventory'

const STATUS_OPTIONS = [
  { id: 'Queue',    label: 'Queue' },
  { id: 'Printing', label: 'Printing' },
  { id: 'Complete', label: 'Complete' },
]

const FILAMENT_SURCHARGE = 5

const CUSTOM_COLOR_ID = '__custom__'

// ── Per-item draft ─────────────────────────────────────────────────────────────

interface ItemDraft {
  _key: string
  modelId: string
  filamentId: string  // '' | filament.id | CUSTOM_COLOR_ID
  customColor: string
  quantity: number
}

function emptyDraft(): ItemDraft {
  return { _key: crypto.randomUUID(), modelId: '', filamentId: '', customColor: '', quantity: 1 }
}

function draftFromOrderItem(item: OrderItem, filaments: Filament[]): ItemDraft {
  const match = filaments.find(f => f.color.toLowerCase() === item.color.toLowerCase())
  return {
    _key: crypto.randomUUID(),
    modelId: item.model_id ?? '',
    filamentId: match ? match.id : (item.color ? CUSTOM_COLOR_ID : ''),
    customColor: match ? '' : item.color,
    quantity: item.quantity ?? 1,
  }
}

function draftFromLegacyOrder(order: WorkOrder, models: PrintModel[], filaments: Filament[]): ItemDraft {
  const modelMatch = models.find(m => m.id === order.model_id || m.name === order.item)
  const filamentMatch = filaments.find(f => f.color.toLowerCase() === order.color.toLowerCase())
  return {
    _key: crypto.randomUUID(),
    modelId: modelMatch?.id ?? '',
    filamentId: filamentMatch ? filamentMatch.id : (order.color ? CUSTOM_COLOR_ID : ''),
    customColor: filamentMatch ? '' : order.color,
    quantity: 1,
  }
}

// ── Props ──────────────────────────────────────────────────────────────────────

interface WorkOrderFormProps {
  initial?: WorkOrder
  models: PrintModel[]
  filaments: Filament[]
  orders: WorkOrder[]
  onSave: (input: WorkOrderInput) => Promise<void>
  onCancel: () => void
  onGoToInventory?: () => void
}

// ── Component ──────────────────────────────────────────────────────────────────

export function WorkOrderForm({ initial, models, filaments, orders, onSave, onCancel, onGoToInventory }: WorkOrderFormProps) {
  // Initialise item drafts from order_items (new format) or from legacy flat fields
  const initialDrafts: ItemDraft[] = initial?.order_items?.length
    ? initial.order_items.map(i => draftFromOrderItem(i, filaments))
    : initial
      ? [draftFromLegacyOrder(initial, models, filaments)]
      : [emptyDraft()]

  const [customer, setCustomer]         = useState(initial?.customer ?? '')
  const [items, setItems]               = useState<ItemDraft[]>(initialDrafts)
  const [status, setStatus]             = useState<WorkOrderStatus>(initial?.status ?? 'Queue')
  const [paid, setPaid]                 = useState(initial?.paid ?? false)
  const [notes, setNotes]               = useState(initial?.notes ?? '')
  const [price, setPrice]               = useState(initial?.price ?? 5)
  const [saving, setSaving]             = useState(false)
  const [error, setError]               = useState<string | null>(null)

  const settings = loadSettings()

  const modelOptions = models.map(m => ({ id: m.id, label: m.name }))
  const inStockFilaments = filaments.filter(f => f.in_stock)
  const filamentOptions = [
    ...inStockFilaments.map(f => ({ id: f.id, label: f.color })),
    { id: CUSTOM_COLOR_ID, label: '✦ Custom / Special Color (+$5)' },
  ]

  // ── Derived per-item values ────────────────────────────────────────────────

  // For each draft, resolve the model + filament objects and calculate cost
  const resolvedItems = useMemo(() => {
    return items.map(draft => {
      const model    = models.find(m => m.id === draft.modelId) ?? null
      const filament = filaments.find(f => f.id === draft.filamentId) ?? null
      const isCustom = draft.filamentId === CUSTOM_COLOR_ID
      const color    = isCustom ? draft.customColor.trim() : (filament?.color ?? '')
      const needsFil = isCustom && draft.customColor.trim().length > 0

      const calcCost = (() => {
        if (!model) return null
        const hasAssigned = model.filament_requirements?.some(r => r.filament_id !== null)
        if (!hasAssigned) return null
        return calculateItemCost(model, filaments, settings.labor_rate_per_hour)
      })()

      const unitCost = calcCost ? calcCost.total_cost : 0

      return { draft, model, filament, isCustom, color, needsFil, calcCost, unitCost }
    })
  }, [items, models, filaments, settings.labor_rate_per_hour])

  // Total calculated cost across all items (× quantity) — used when saving
  const totalCalcCost = useMemo(() => {
    return resolvedItems.reduce((sum, r) => {
      if (r.calcCost === null) return sum
      return sum + r.unitCost * r.draft.quantity
    }, 0)
  }, [resolvedItems])

  // Filament availability warnings (one per item)
  const filamentWarnings = useMemo(() => {
    const ordersForCheck = initial ? orders.filter(o => o.id !== initial.id) : orders
    return resolvedItems.map(({ draft, model, filament, isCustom }) => {
      if (!model || !filament || isCustom) return null
      const allStats = computeFilamentStats(filaments, ordersForCheck, models)
      const stat = allStats.find(s => s.filament_id === filament.id)
      if (!stat) return null
      const needed = (model.filament_requirements?.reduce((s, r) => s + r.quantity_g, 0) ?? 0) * draft.quantity
      if (stat.remaining_g < needed) {
        return `Insufficient ${filament.color}: ${stat.remaining_g.toFixed(0)}g remaining, need ${needed.toFixed(0)}g.`
      }
      return null
    })
  }, [resolvedItems, filaments, orders, models, initial])

  const hasFilamentWarning = filamentWarnings.some(w => w !== null)

  // ── Item draft helpers ─────────────────────────────────────────────────────

  function updateItem(idx: number, patch: Partial<ItemDraft>) {
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, ...patch } : it))
  }

  function addItem() {
    setItems(prev => [...prev, emptyDraft()])
  }

  function removeItem(idx: number) {
    if (items.length <= 1) return
    setItems(prev => prev.filter((_, i) => i !== idx))
  }

  function handleFilamentChange(idx: number, key: string) {
    const prev = items[idx].filamentId
    const wasCustom = prev === CUSTOM_COLOR_ID
    const isNowCustom = key === CUSTOM_COLOR_ID

    updateItem(idx, { filamentId: key, customColor: isNowCustom ? items[idx].customColor : '' })

    // Apply / remove surcharge from order price
    if (!wasCustom && isNowCustom) {
      setPrice(p => p + FILAMENT_SURCHARGE)
    } else if (wasCustom && !isNowCustom) {
      setPrice(p => Math.max(0, p - FILAMENT_SURCHARGE))
    }
  }

  // ── Save ────────────────────────────────────────────────────────────────────

  async function handleSave() {
    if (!customer.trim()) {
      setError('Customer is required.')
      return
    }
    for (let i = 0; i < resolvedItems.length; i++) {
      const r = resolvedItems[i]
      if (!r.model) {
        setError(`Item ${i + 1}: please select a model.`)
        return
      }
      if (!r.color) {
        setError(`Item ${i + 1}: please select a color or enter a custom color.`)
        return
      }
    }

    const orderItems: OrderItem[] = resolvedItems.map(r => ({
      model_id:       r.model?.id ?? null,
      item:           r.model?.name ?? '',
      color:          r.color,
      model_url:      r.model?.model_url ?? '',
      needs_filament: r.needsFil,
      quantity:       r.draft.quantity,
      price:          0, // per-item price not tracked; total is at order level
      cost:           r.unitCost * r.draft.quantity,
    }))

    const firstItem = resolvedItems[0]

    setSaving(true)
    setError(null)
    try {
      await onSave({
        customer:       customer.trim(),
        // Legacy flat fields — mirror first item for backward compat
        item:           firstItem?.model?.name ?? '',
        color:          firstItem?.color ?? '',
        model_url:      firstItem?.model?.model_url ?? '',
        model_id:       firstItem?.model?.id ?? null,
        needs_filament: resolvedItems.some(r => r.needsFil),
        // Multi-item payload
        order_items:    orderItems,
        status,
        paid,
        notes:          notes.trim(),
        price,
        cost:           totalCalcCost,
        sort_order:     initial?.sort_order ?? 0,
      })
    } catch {
      setError('Failed to save. Please try again.')
      setSaving(false)
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-5">
      {/* Customer */}
      <TextField
        label="Customer"
        value={customer}
        onChange={setCustomer}
        isRequired
        placeholder="e.g. Karen coworker"
      />

      {/* Items */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-[var(--foreground)]">Items</label>
          <button
            type="button"
            onClick={addItem}
            className="text-xs text-[var(--accent-orange)] hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Add item
          </button>
        </div>

        <div className="space-y-3">
          {items.map((draft, idx) => {
            const r       = resolvedItems[idx]
            const warning = filamentWarnings[idx]
            return (
              <div
                key={draft._key}
                className="rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-3 space-y-3"
              >
                {items.length > 1 && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--muted-foreground)] font-medium">
                      Item {idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      aria-label="Remove item"
                      className="p-1 rounded hover:bg-[var(--accent-red-light)] text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Model */}
                <div className="space-y-1">
                  <Select
                    label="Model"
                    options={modelOptions}
                    selectedKey={draft.modelId}
                    onSelectionChange={key => { if (key != null) updateItem(idx, { modelId: key as string }) }}
                    placeholder="Select a model…"
                  />
                  {onGoToInventory && idx === 0 && (
                    <button
                      type="button"
                      onClick={onGoToInventory}
                      className="text-xs text-[var(--accent-orange)] hover:underline flex items-center gap-1 pl-0.5"
                    >
                      <span>＋</span> Add a new model
                    </button>
                  )}
                  {r.calcCost !== null && (
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Est. cost/unit: ${r.calcCost.total_cost.toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Color + Quantity row */}
                <div className="grid grid-cols-[1fr_auto] gap-3 items-start">
                  <div className="space-y-2 min-w-0">
                    <Select
                      label="Color"
                      options={filamentOptions}
                      selectedKey={draft.filamentId}
                      onSelectionChange={key => { if (key != null) handleFilamentChange(idx, key as string) }}
                      placeholder="Select a color…"
                    />
                    {onGoToInventory && idx === 0 && (
                      <button
                        type="button"
                        onClick={onGoToInventory}
                        className="text-xs text-[var(--accent-orange)] hover:underline flex items-center gap-1 pl-0.5"
                      >
                        <span>＋</span> Add a new filament
                      </button>
                    )}
                    {draft.filamentId === CUSTOM_COLOR_ID && (
                      <div className="space-y-2 pl-1 border-l-2 border-[var(--accent-orange)] ml-1">
                        <TextField
                          label="Custom Color Name"
                          value={draft.customColor}
                          onChange={v => updateItem(idx, { customColor: v })}
                          isRequired
                          placeholder="e.g. Neon Yellow"
                        />
                        {draft.customColor.trim() && (
                          <p className="text-xs text-[var(--accent-orange)] flex items-center gap-1.5">
                            <span>⚠</span>
                            <span>Requires new filament roll. <strong>$5 surcharge</strong> added.</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="w-20 shrink-0">
                    <NumberField
                      label="Qty"
                      value={draft.quantity}
                      onChange={v => updateItem(idx, { quantity: Math.max(1, v) })}
                      minValue={1}
                      formatOptions={{ maximumFractionDigits: 0 }}
                    />
                  </div>
                </div>

                {/* Per-item filament warning */}
                {warning && (
                  <div className="rounded border border-[var(--accent-orange)] bg-[var(--accent-orange-light)] px-2 py-1.5 text-xs text-[var(--accent-orange)] flex gap-2">
                    <span className="shrink-0">⚠</span>
                    <span>{warning}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Status */}
      <Select
        label="Status"
        options={STATUS_OPTIONS}
        selectedKey={status}
        onSelectionChange={(key) => { if (key != null) setStatus(key as WorkOrderStatus) }}
      />

      {/* Price */}
      <NumberField
        label="Price ($)"
        value={price}
        onChange={setPrice}
        minValue={0}
        formatOptions={{ style: 'currency', currency: 'USD' }}
      />

      {/* Notes */}
      <TextArea
        label="Notes"
        value={notes}
        onChange={setNotes}
        placeholder="Any additional notes…"
        rows={3}
      />

      {/* Paid */}
      <div className="flex items-center gap-3">
        <Switch isSelected={paid} onChange={setPaid} color="green">
          Paid
        </Switch>
      </div>

      {/* Global filament warning */}
      {hasFilamentWarning && (
        <div className="rounded-lg border border-[var(--accent-orange)] bg-[var(--accent-orange-light)] px-3 py-2 text-xs text-[var(--accent-orange)] flex gap-2">
          <span className="shrink-0">⚠</span>
          <span>Some items have insufficient filament stock. You can still save, but restock before printing.</span>
        </div>
      )}

      {error && (
        <p className="text-sm text-[var(--destructive)]">{error}</p>
      )}

      {/* Sticky footer buttons */}
      <div className="sticky bottom-0 bg-[var(--card)] -mx-6 px-6 pt-4 pb-4 border-t border-[var(--border)] flex justify-end gap-3 mt-2">
        <Button variant="outline" onPress={onCancel} isDisabled={saving}>
          Cancel
        </Button>
        <Button variant="primary" color="orange" onPress={handleSave} isDisabled={saving}>
          {saving ? 'Saving…' : (initial ? 'Save Changes' : 'Add Order')}
        </Button>
      </div>
    </div>
  )
}

