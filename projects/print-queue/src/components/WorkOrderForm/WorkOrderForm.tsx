import { useMemo, useState } from 'react'
import { Button, TextField, Select, Switch, TextArea, NumberField } from '@gearhead/ui'
import { Plus, Trash2 } from 'lucide-react'
import type { WorkOrder, WorkOrderInput, WorkOrderStatus, OrderItem } from '../../types/WorkOrder'
import type { PrintModel, Filament } from '../../types/Inventory'
import { loadSettings } from '../../lib/settings'
import { calculateItemCost } from '../../lib/costing'
import { computeFilamentStats } from '../../lib/inventory'
import { extractMessage } from '../../utils/errors'

const STATUS_OPTIONS = [
  { id: 'waiting',     label: 'Waiting' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'complete',    label: 'Complete' },
]

const FILAMENT_SURCHARGE = 5

const CUSTOM_COLOR_ID = '__custom__'

// ── Per-item draft ─────────────────────────────────────────────────────────────

interface ItemDraft {
  _key: string
  modelId: string
  /** Filament selection per requirement slot (index matches model.filament_requirements[]).
   *  '' = unselected, CUSTOM_COLOR_ID = custom, filament.id = real filament */
  filamentSlots: string[]
  /** Custom color text — used when slot 0 is CUSTOM_COLOR_ID */
  customColor: string
  quantity: number
}

function emptyDraft(): ItemDraft {
  return { _key: crypto.randomUUID(), modelId: '', filamentSlots: [''], customColor: '', quantity: 1 }
}

/** Build default slot IDs from a model's filament_requirements */
function defaultSlotsForModel(model: PrintModel | null): string[] {
  if (!model?.filament_requirements?.length) return ['']
  const slots = model.filament_requirements.map(req => req.filament_id ?? '')
  return slots.length > 0 ? slots : ['']
}

function draftFromOrderItem(item: OrderItem, filaments: Filament[]): ItemDraft {
  // New multi-slot format
  if (item.filament_selections && item.filament_selections.length > 0) {
    const slots = item.filament_selections.map(sel => {
      if (!sel.filament_id) return sel.color ? CUSTOM_COLOR_ID : ''
      return filaments.find(f => f.id === sel.filament_id)?.id ?? ''
    })
    return {
      _key: crypto.randomUUID(),
      modelId: item.model_id ?? '',
      filamentSlots: slots,
      customColor: '',
      quantity: item.quantity ?? 1,
    }
  }
  // Legacy single-filament: prefer direct filament_id lookup; fall back to colour-string match
  const match = item.filament_id
    ? filaments.find(f => f.id === item.filament_id)
    : filaments.find(f => f.color.toLowerCase() === item.color.toLowerCase())
  return {
    _key: crypto.randomUUID(),
    modelId: item.model_id ?? '',
    filamentSlots: [match ? match.id : (item.color ? CUSTOM_COLOR_ID : '')],
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
    filamentSlots: [filamentMatch ? filamentMatch.id : (order.color ? CUSTOM_COLOR_ID : '')],
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
  const [status, setStatus]             = useState<WorkOrderStatus>(initial?.status ?? 'waiting')
  const [paid, setPaid]                 = useState(initial?.paid ?? false)
  const [notes, setNotes]               = useState(initial?.notes ?? '')
  const [price, setPrice]               = useState(initial?.price ?? 5)
  const [saving, setSaving]             = useState(false)
  const [error, setError]               = useState<string | null>(null)

  const settings = loadSettings()

  const modelOptions = models.map(m => ({ id: m.id, label: m.name }))
  const allFilamentStats = useMemo(
    () => computeFilamentStats(filaments, orders, models),
    [filaments, orders, models]
  )
  const inStockFilaments = useMemo(
    () => filaments.filter(f => {
      if (f.status !== 'in_stock') return false
      const s = allFilamentStats.find(st => st.filament_id === f.id)
      return s ? s.remaining_g > 0 : f.current_quantity_g > 0
    }),
    [filaments, allFilamentStats]
  )
  const filamentStatsMap = useMemo(
    () => new Map(allFilamentStats.map(s => [s.filament_id, s])),
    [allFilamentStats]
  )
  const filamentOptions = useMemo(() => {
    // AMS-loaded filaments first (sorted by slot), then the rest (sorted by color)
    const sorted = [...inStockFilaments].sort((a, b) => {
      const aInAms = a.ams_slot !== null
      const bInAms = b.ams_slot !== null
      if (aInAms && !bInAms) return -1
      if (!aInAms && bInAms) return 1
      if (aInAms && bInAms) return (a.ams_slot as number) - (b.ams_slot as number)
      return a.color.localeCompare(b.color)
    })
    return [
      ...sorted.map(f => {
        const stat = filamentStatsMap.get(f.id)
        const remaining = stat ? stat.remaining_g : f.current_quantity_g
        const amsTag = f.ams_slot !== null ? ` · AMS ${f.ams_slot}` : ''
        return { id: f.id, label: `${f.color}${amsTag} — ${remaining.toFixed(0)}g` }
      }),
      { id: CUSTOM_COLOR_ID, label: '✦ Custom / Special Color (+$5)' },
    ]
  }, [inStockFilaments, filamentStatsMap])

  // ── Derived per-item values ────────────────────────────────────────────────

  // For each draft, resolve the model + per-slot filament objects and calculate cost
  const resolvedItems = useMemo(() => {
    return items.map(draft => {
      const model     = models.find(m => m.id === draft.modelId) ?? null
      const numSlots  = model?.filament_requirements?.length ?? 1

      // Resolve filament for each requirement slot
      const slotFilaments = Array.from({ length: Math.max(numSlots, draft.filamentSlots.length) }, (_, i) => {
        const slotId = draft.filamentSlots[i] ?? ''
        if (slotId === '' || slotId === CUSTOM_COLOR_ID) return null
        return filaments.find(f => f.id === slotId) ?? null
      })

      // Slot 0 is the "primary" filament for backward compat colour / needs-filament logic
      const slot0Id   = draft.filamentSlots[0] ?? ''
      const filament  = filaments.find(f => f.id === slot0Id) ?? null
      const isCustom  = slot0Id === CUSTOM_COLOR_ID
      const color     = isCustom ? draft.customColor.trim() : (filament?.color ?? '')
      const needsFil  = isCustom && draft.customColor.trim().length > 0

      const calcCost = (() => {
        if (!model) return null
        if (!model.filament_requirements?.length) return null
        const hasAssigned = model.filament_requirements.some(r => r.filament_id !== null)
        // Need at least one selected filament to price colour-agnostic requirements
        if (!hasAssigned && slotFilaments.every(f => f === null)) return null
        return calculateItemCost(model, filaments, settings.labor_rate_per_hour, slotFilaments)
      })()

      const unitCost = calcCost ? calcCost.total_cost : 0

      return { draft, model, filament, slotFilaments, isCustom, color, needsFil, calcCost, unitCost }
    })
  }, [items, models, filaments, settings.labor_rate_per_hour])

  // Total calculated cost across all items (× quantity) — used when saving
  const totalCalcCost = useMemo(() => {
    return resolvedItems.reduce((sum, r) => {
      if (r.calcCost === null) return sum
      return sum + r.unitCost * r.draft.quantity
    }, 0)
  }, [resolvedItems])

  // Per-slot insufficient-stock errors: [itemIdx][slotIdx] → error string | null
  // Insufficient stock is a hard error that MUST be resolved before saving.
  const slotFilamentErrors = useMemo(() => {
    const ordersForCheck = initial ? orders.filter(o => o.id !== initial.id) : orders
    const allStats = computeFilamentStats(filaments, ordersForCheck, models)
    return resolvedItems.map(({ draft, model, slotFilaments }) => {
      const reqs = model?.filament_requirements ?? []
      if (reqs.length === 0) return [] as (string | null)[]
      return reqs.map((req, slotIdx) => {
        const filament = slotFilaments[slotIdx]
        if (!filament) return null
        const stat = allStats.find(s => s.filament_id === filament.id)
        if (!stat) return null
        const needed = req.quantity_g * draft.quantity
        if (stat.remaining_g < needed) {
          return `Insufficient ${filament.color}: ${stat.remaining_g.toFixed(0)}g left, ${needed.toFixed(0)}g needed — must change`
        }
        return null
      })
    })
  }, [resolvedItems, filaments, orders, models, initial])

  const hasFilamentError = slotFilamentErrors.some(itemErrors => itemErrors.some(e => e !== null))

  // Pre-computed AMS slot → filament lookup for the summary panel
  const amsSlotMap = useMemo(
    () => Object.fromEntries(
      filaments.filter(f => f.ams_slot !== null).map(f => [f.ams_slot as number, f])
    ),
    [filaments]
  )

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

  function handleModelChange(idx: number, modelId: string) {
    const model = models.find(m => m.id === modelId) ?? null
    const slots = defaultSlotsForModel(model)
    updateItem(idx, { modelId, filamentSlots: slots })
  }

  function handleFilamentChange(idx: number, slotIdx: number, key: string) {
    const currentSlots = [...items[idx].filamentSlots]
    while (currentSlots.length <= slotIdx) currentSlots.push('')
    const prevKey    = currentSlots[slotIdx]
    const wasCustom  = prevKey === CUSTOM_COLOR_ID
    const isNowCustom = key === CUSTOM_COLOR_ID
    currentSlots[slotIdx] = key
    updateItem(idx, {
      filamentSlots: currentSlots,
      customColor: isNowCustom ? items[idx].customColor : (slotIdx === 0 ? '' : items[idx].customColor),
    })
    // Apply / remove $5 surcharge — only tracked for slot 0
    if (slotIdx === 0) {
      if (!wasCustom && isNowCustom) setPrice(p => p + FILAMENT_SURCHARGE)
      else if (wasCustom && !isNowCustom) setPrice(p => Math.max(0, p - FILAMENT_SURCHARGE))
    }
  }

  // ── Save ────────────────────────────────────────────────────────────────────

  async function handleSave() {
    if (!customer.trim()) {
      setError('Customer is required.')
      return
    }
    const hasFilamentSelected = resolvedItems.some(r => r.filament !== null || r.isCustom)
    if (!hasFilamentSelected) {
      setError('At least one item must have a filament selected.')
      return
    }
    if (hasFilamentError) {
      setError('One or more filament selections have insufficient stock — please change them before saving.')
      return
    }

    const orderItems: OrderItem[] = resolvedItems.map(r => {
      const numSlots      = r.model?.filament_requirements?.length ?? 1
      const hasMultiSlots = numSlots > 1

      // Build filament_selections for multi-slot models; null for single-slot (backward compat)
      const filament_selections = hasMultiSlots
        ? r.slotFilaments.map((fil, i) => ({
            filament_id: r.draft.filamentSlots[i] === CUSTOM_COLOR_ID ? null : (fil?.id ?? null),
            color:       fil?.color ?? '',
          }))
        : null

      return {
        model_id:           r.model?.id ?? null,
        item:               r.model?.name ?? '',
        color:              r.color,
        filament_id:        r.draft.filamentSlots[0] === CUSTOM_COLOR_ID ? null : (r.filament?.id ?? null),
        model_url:          r.model?.model_url ?? '',
        needs_filament:     r.needsFil,
        quantity:           r.draft.quantity,
        price:              0, // per-item price not tracked; total is at order level
        cost:               r.unitCost * r.draft.quantity,
        status:             'queue' as const,
        filament_selections,
      }
    })

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
    } catch (err) {
      const detail = extractMessage(err, '')
      setError(detail ? `Failed to save: ${detail}` : 'Failed to save. Please try again.')
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

      {/* AMS Summary – shown when at least one slot is loaded */}
      {Object.keys(amsSlotMap).length > 0 && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-3 space-y-2">
          <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Current AMS</p>
          <div className="grid grid-cols-4 gap-2">
            {([1, 2, 3, 4] as const).map(slot => {
              const loaded = amsSlotMap[slot] ?? null
              return (
                <div key={slot} className="space-y-1">
                  <span className="text-[10px] font-medium text-[var(--muted-foreground)]">Slot {slot}</span>
                  {loaded ? (
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className="w-3 h-3 rounded-full border border-[var(--border)] shrink-0"
                        style={{ background: loaded.color_hex || '#888' }}
                        aria-hidden="true"
                      />
                      <span className="text-xs text-[var(--foreground)] truncate">{loaded.color}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-[var(--muted-foreground)]">—</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

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
            const r         = resolvedItems[idx]
            const itemErrors = slotFilamentErrors[idx] ?? []
            const model      = r.model
            const reqs       = model?.filament_requirements ?? []
            const numSlots   = Math.max(reqs.length, 1)
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
                    onSelectionChange={key => { if (key != null) handleModelChange(idx, key as string) }}
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

                {/* Filament slots + Quantity row */}
                <div className="grid grid-cols-[1fr_auto] gap-3 items-start">
                  <div className="space-y-3 min-w-0">
                    {Array.from({ length: numSlots }, (_, slotIdx) => {
                      const slotId    = draft.filamentSlots[slotIdx] ?? ''
                      const slotError = itemErrors[slotIdx] ?? null
                      const slotLabel = numSlots > 1
                        ? (slotIdx === 0 ? 'Color (Filament 1)' : `Color (Filament ${slotIdx + 1})`)
                        : 'Color'
                      return (
                        <div key={slotIdx} className="space-y-2">
                          <Select
                            label={slotLabel}
                            options={filamentOptions}
                            selectedKey={slotId}
                            onSelectionChange={key => { if (key != null) handleFilamentChange(idx, slotIdx, key as string) }}
                            placeholder="Select a color…"
                            isInvalid={slotError !== null}
                            errorMessage={slotError ?? undefined}
                          />
                          {slotIdx === 0 && onGoToInventory && idx === 0 && (
                            <button
                              type="button"
                              onClick={onGoToInventory}
                              className="text-xs text-[var(--accent-orange)] hover:underline flex items-center gap-1 pl-0.5"
                            >
                              <span>＋</span> Add a new filament
                            </button>
                          )}
                          {slotIdx === 0 && slotId === CUSTOM_COLOR_ID && (
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
                      )
                    })}
                  </div>

                  <div className="shrink-0">
                    <NumberField
                      label="Qty"
                      value={draft.quantity}
                      onChange={v => updateItem(idx, { quantity: Math.max(1, v) })}
                      minValue={1}
                      formatOptions={{ maximumFractionDigits: 0 }}
                    />
                  </div>
                </div>
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

      {/* Global filament error — insufficient stock blocks saving */}
      {hasFilamentError && (
        <div className="rounded-lg border border-[var(--destructive)] bg-[var(--destructive)]/10 px-3 py-2 text-xs text-[var(--destructive)] flex gap-2">
          <span className="shrink-0">✕</span>
          <span>One or more filament selections have insufficient stock. Select a different filament for the highlighted slots before saving.</span>
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

