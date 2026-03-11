import { useEffect, useMemo, useState } from 'react'
import { Button, TextField, Select, Switch, TextArea, NumberField } from '@gearhead/ui'
import type { WorkOrder, WorkOrderInput, WorkOrderStatus } from '../../types/WorkOrder'
import type { PrintModel, Filament } from '../../types/Inventory'
import { loadSettings } from '../../lib/settings'
import { calculateItemCost } from '../../lib/costing'
import { computeFilamentStats } from '../../lib/inventory'

const STATUS_OPTIONS = [
  { id: 'Queue',     label: 'Queue' },
  { id: 'Printing',  label: 'Printing' },
  { id: 'Complete',  label: 'Complete' },
  { id: 'Cancelled', label: 'Cancelled' },
]

const FILAMENT_SURCHARGE = 5

const CUSTOM_COLOR_ID = '__custom__'

interface WorkOrderFormProps {
  initial?: WorkOrder
  models: PrintModel[]
  filaments: Filament[]
  orders: WorkOrder[]
  onSave: (input: WorkOrderInput) => Promise<void>
  onCancel: () => void
  /** Called when the user wants to leave this form and go add inventory items. */
  onGoToInventory?: () => void
}

export function WorkOrderForm({ initial, models, filaments, orders, onSave, onCancel, onGoToInventory }: WorkOrderFormProps) {
  // Resolve initial model id: either stored model_id or find by matching item name
  const initialModelId = initial?.model_id
    ?? models.find(m => m.name === initial?.item)?.id
    ?? (models.length > 0 ? '' : '')

  // Resolve initial filament: check if initial color matches a filament
  const initialFilamentId = (() => {
    if (!initial?.color) return ''
    const match = filaments.find(f => f.color.toLowerCase() === initial.color.toLowerCase())
    return match ? match.id : CUSTOM_COLOR_ID
  })()

  const [customer, setCustomer]           = useState(initial?.customer  ?? '')
  const [modelId, setModelId]             = useState(initialModelId)
  const [filamentId, setFilamentId]       = useState(initialFilamentId)
  const [customColor, setCustomColor]     = useState(
    initialFilamentId === CUSTOM_COLOR_ID ? (initial?.color ?? '') : ''
  )
  const [status, setStatus]               = useState<WorkOrderStatus>(initial?.status ?? 'Queue')
  const [paid, setPaid]                   = useState(initial?.paid      ?? false)
  const [notes, setNotes]                 = useState(initial?.notes     ?? '')
  const [price, setPrice]                 = useState(initial?.price     ?? 5)
  const [cost, setCost]                   = useState(initial?.cost      ?? 2)
  const [costOverride, setCostOverride]   = useState(false)
  const [saving, setSaving]               = useState(false)
  const [error, setError]                 = useState<string | null>(null)

  const isCustomColor = filamentId === CUSTOM_COLOR_ID
  const needsFilament = isCustomColor && customColor.trim().length > 0

  const selectedModel    = models.find(m => m.id === modelId)
  const selectedFilament = filaments.find(f => f.id === filamentId)

  const modelOptions = [
    ...models.map(m => ({ id: m.id, label: m.name })),
  ]

  const inStockFilaments = filaments.filter(f => f.in_stock)
  const filamentOptions = [
    ...inStockFilaments.map(f => ({
      id: f.id,
      label: f.color,
    })),
    { id: CUSTOM_COLOR_ID, label: '✦ Custom / Special Color (+$5)' },
  ]

  // Auto-calculated cost — uses model's filament requirements, not the order's chosen color
  const calculatedCost = useMemo(() => {
    if (!selectedModel) return null
    // Only calculate if at least one requirement has an assigned filament
    const hasAssigned = selectedModel.filament_requirements?.some(r => r.filament_id !== null)
    if (!hasAssigned) return null
    const settings = loadSettings()
    return calculateItemCost(selectedModel, filaments, settings.labor_rate_per_hour)
  }, [selectedModel, filaments])

  // Filament availability check — exclude the order being edited from reservations
  const filamentWarning = useMemo(() => {
    if (!selectedModel || !selectedFilament || isCustomColor) return null
    // Compute stats against all orders except the one being edited (to avoid double-counting)
    const ordersForCheck = initial ? orders.filter(o => o.id !== initial.id) : orders
    const allStats = computeFilamentStats(filaments, ordersForCheck, models)
    const stat = allStats.find(s => s.filament_id === selectedFilament.id)
    if (!stat) return null
    const available = stat.remaining_g
    const needed = selectedModel.filament_usage_g
    if (available < needed) {
      return `Insufficient filament: only ${available}g of ${selectedFilament.color} will remain after active reservations, but this order requires ${needed}g. You can still create the order, but you may need to restock before printing.`
    }
    return null
  }, [selectedModel, selectedFilament, isCustomColor, filaments, orders, models, initial])

  // When the calculated cost changes and no override, sync the cost field
  useEffect(() => {
    if (!costOverride && calculatedCost !== null) {
      setCost(calculatedCost.total_cost)
    }
  }, [calculatedCost, costOverride])

  function handleFilamentChange(key: string) {
    const prev = filamentId
    const wasCustom = prev === CUSTOM_COLOR_ID
    const isNowCustom = key === CUSTOM_COLOR_ID

    setFilamentId(key)

    // Apply / remove the filament surcharge automatically
    if (!wasCustom && isNowCustom) {
      setPrice(p => p + FILAMENT_SURCHARGE)
    } else if (wasCustom && !isNowCustom) {
      setPrice(p => Math.max(0, p - FILAMENT_SURCHARGE))
    }

    if (!isNowCustom) setCustomColor('')
  }

  function resolveColor(): string {
    if (isCustomColor) return customColor.trim()
    return selectedFilament?.color ?? ''
  }

  async function handleSave() {
    const resolvedColor = resolveColor()
    if (!customer.trim()) {
      setError('Customer is required.')
      return
    }
    if (!modelId || !selectedModel) {
      setError('Please select a model.')
      return
    }
    if (!resolvedColor) {
      setError('Please select a color or enter a custom color.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      await onSave({
        customer:       customer.trim(),
        item:           selectedModel.name,
        color:          resolvedColor,
        model_url:      selectedModel.model_url,
        model_id:       selectedModel.id,
        needs_filament: needsFilament,
        status,
        paid,
        notes:          notes.trim(),
        price:          price,
        cost,
        sort_order:     initial?.sort_order ?? 0,
      })
    } catch {
      setError('Failed to save. Please try again.')
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <TextField
        label="Customer"
        value={customer}
        onChange={setCustomer}
        isRequired
        placeholder="e.g. Karen coworker"
      />

      <div className="space-y-1">
        <Select
          label="Model"
          options={modelOptions}
          selectedKey={modelId}
          onSelectionChange={key => { if (key != null) setModelId(key as string) }}
          placeholder="Select a model…"
        />
        {onGoToInventory && (
          <button
            type="button"
            onClick={onGoToInventory}
            className="text-xs text-[var(--accent-orange)] hover:underline flex items-center gap-1 pl-0.5"
          >
            <span>＋</span> Add a new model
          </button>
        )}
      </div>

      <div className="space-y-2">
        <Select
          label="Color"
          options={filamentOptions}
          selectedKey={filamentId}
          onSelectionChange={key => { if (key != null) handleFilamentChange(key as string) }}
          placeholder="Select a color…"
        />
        {onGoToInventory && (
          <button
            type="button"
            onClick={onGoToInventory}
            className="text-xs text-[var(--accent-orange)] hover:underline flex items-center gap-1 pl-0.5"
          >
            <span>＋</span> Add a new filament
          </button>
        )}
        {isCustomColor && (
          <div className="space-y-2 pl-1 border-l-2 border-[var(--accent-orange)] ml-1">
            <TextField
              label="Custom Color Name"
              value={customColor}
              onChange={setCustomColor}
              isRequired
              placeholder="e.g. Neon Yellow"
            />
            {customColor.trim() && (
              <p className="text-xs text-[var(--accent-orange)] flex items-center gap-1.5">
                <span>⚠</span>
                <span>
                  This color requires buying a new roll of filament. A <strong>$5 surcharge</strong> has been added to the price.
                </span>
              </p>
            )}
          </div>
        )}
      </div>

      <Select
        label="Status"
        options={STATUS_OPTIONS}
        selectedKey={status}
        onSelectionChange={(key) => { if (key != null) setStatus(key as WorkOrderStatus) }}
      />

      <div className="grid grid-cols-2 gap-4">
        <NumberField
          label="Price ($)"
          value={price}
          onChange={setPrice}
          minValue={0}
          formatOptions={{ style: 'currency', currency: 'USD' }}
        />
        <div className="space-y-1">
          <NumberField
            label="Cost ($)"
            value={cost}
            onChange={v => { setCost(v); setCostOverride(true) }}
            minValue={0}
            formatOptions={{ style: 'currency', currency: 'USD' }}
          />
          {calculatedCost !== null && (
            <div className="text-xs space-y-0.5 text-[var(--muted-foreground)]">
              <p className="font-medium text-[var(--foreground)]">
                Calculated: ${calculatedCost.total_cost.toFixed(2)}
              </p>
              <p>Material: ${calculatedCost.material_cost.toFixed(2)} · Labor: ${calculatedCost.labor_cost.toFixed(2)}</p>
              {costOverride && (
                <button
                  type="button"
                  onClick={() => { setCost(calculatedCost.total_cost); setCostOverride(false) }}
                  className="text-[var(--accent-orange)] hover:underline"
                >
                  ↺ Reset to calculated
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <TextArea
        label="Notes"
        value={notes}
        onChange={setNotes}
        placeholder="Any additional notes…"
        rows={3}
      />
      <div className="flex items-center gap-3">
        <Switch isSelected={paid} onChange={setPaid} color="green">
          Paid
        </Switch>
      </div>

      {filamentWarning && (
        <div className="rounded-lg border border-[var(--accent-orange)] bg-[var(--accent-orange-light)] px-3 py-2 text-xs text-[var(--accent-orange)] flex gap-2">
          <span className="shrink-0">⚠</span>
          <span>{filamentWarning}</span>
        </div>
      )}

      {error && (
        <p className="text-sm text-[var(--destructive)]">{error}</p>
      )}

      <div className="flex justify-end gap-3 pt-2">
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
