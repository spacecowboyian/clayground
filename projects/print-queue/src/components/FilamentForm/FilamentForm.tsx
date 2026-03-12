import { useState } from 'react'
import { Button, TextField, Switch, Select, NumberField } from '@gearhead/ui'
import type { Filament, FilamentInput } from '../../types/Inventory'

const MATERIAL_OPTIONS = [
  { id: 'PLA',   label: 'PLA' },
  { id: 'PETG',  label: 'PETG' },
  { id: 'ASA',   label: 'ASA' },
  { id: 'TPU',   label: 'TPU' },
  { id: 'ABS',   label: 'ABS' },
  { id: 'Other', label: 'Other' },
]

const PREDEFINED_MATERIALS = new Set(MATERIAL_OPTIONS.map(o => o.id))

/** Derive dropdown key + custom text from a stored material string. */
function resolveMaterialKey(stored: string | undefined): { key: string; custom: string } {
  const m = stored ?? 'PETG'
  if (PREDEFINED_MATERIALS.has(m)) return { key: m, custom: '' }
  // Stored value is a free-text "Other" name (e.g. "Nylon")
  return { key: 'Other', custom: m }
}

interface FilamentFormProps {
  initial?: Filament
  onSave: (input: FilamentInput) => Promise<void>
  onCancel: () => void
}

export function FilamentForm({ initial, onSave, onCancel }: FilamentFormProps) {
  const initialMaterial                     = resolveMaterialKey(initial?.material)
  const [brand, setBrand]                   = useState(initial?.brand             ?? '')
  const [materialKey, setMaterialKey]       = useState(initialMaterial.key)
  const [customMaterial, setCustomMaterial] = useState(initialMaterial.custom)
  const [color, setColor]                   = useState(initial?.color             ?? '')
  const [colorHex, setColorHex]             = useState(initial?.color_hex         ?? '')
  const [inStock, setInStock]               = useState(initial?.in_stock          ?? true)
  const [rollCost, setRollCost]             = useState(initial?.roll_cost         ?? 20)
  const [rollSize, setRollSize]             = useState(initial?.roll_size_g       ?? 1000)
  const [currentQty, setCurrentQty]         = useState(initial?.current_quantity_g ?? 1000)
  const [purchaseUrl, setPurchaseUrl]       = useState(initial?.purchase_url      ?? '')
  const [saving, setSaving]                 = useState(false)
  const [error, setError]                   = useState<string | null>(null)

  const isOther = materialKey === 'Other'

  /** Resolved material value stored on the filament record. */
  function resolveMaterial(): string {
    if (isOther) return customMaterial.trim() || 'Other'
    return materialKey
  }

  async function handleSave() {
    if (!color.trim()) {
      setError('Color name is required.')
      return
    }
    if (isOther && !customMaterial.trim()) {
      setError('Please specify the material type.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      await onSave({
        brand: brand.trim(),
        material: resolveMaterial(),
        color: color.trim(),
        color_hex: colorHex.trim(),
        in_stock: inStock,
        roll_cost: rollCost,
        roll_size_g: rollSize,
        current_quantity_g: currentQty,
        purchase_url: purchaseUrl.trim(),
      })
    } catch {
      setError('Failed to save. Please try again.')
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Brand"
          value={brand}
          onChange={setBrand}
          placeholder="e.g. Bambu, eSUN, Generic"
        />
        <div className="space-y-2">
          <Select
            label="Material Type"
            options={MATERIAL_OPTIONS}
            selectedKey={materialKey}
            onSelectionChange={key => {
              if (key != null) {
                setMaterialKey(key as string)
                if (key !== 'Other') setCustomMaterial('')
              }
            }}
          />
          {isOther && (
            <TextField
              label="Specify material"
              value={customMaterial}
              onChange={setCustomMaterial}
              isRequired
              placeholder="e.g. Nylon, PA-CF, HIPS…"
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Color Name"
          value={color}
          onChange={setColor}
          isRequired
          placeholder="e.g. Light Blue"
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[var(--foreground)]">Color Swatch</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={colorHex || '#9ca3af'}
              onChange={e => setColorHex(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border border-[var(--border)] bg-transparent"
              title="Pick a color"
            />
            <span className="text-xs text-[var(--muted-foreground)]">
              {colorHex || 'No hex set'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <NumberField
          label="Roll Cost ($)"
          value={rollCost}
          onChange={setRollCost}
          minValue={0}
          formatOptions={{ style: 'currency', currency: 'USD' }}
        />
        <NumberField
          label="Roll Size (g)"
          value={rollSize}
          onChange={setRollSize}
          minValue={1}
          formatOptions={{ maximumFractionDigits: 0 }}
        />
      </div>
      <p className="text-xs text-[var(--muted-foreground)]">
        Roll cost and size are used to calculate the material cost per print.
      </p>

      <NumberField
        label="Current Quantity on Hand (g)"
        value={currentQty}
        onChange={setCurrentQty}
        minValue={0}
        formatOptions={{ maximumFractionDigits: 0 }}
      />
      <p className="text-xs text-[var(--muted-foreground)]">
        How many grams of this filament you currently have. Used to track reservations and warn about low stock.
      </p>

      <TextField
        label="Purchase Link (optional)"
        value={purchaseUrl}
        onChange={setPurchaseUrl}
        placeholder="https://store.example.com/filament"
      />

      <div className="flex items-center gap-3">
        <Switch isSelected={inStock} onChange={setInStock} color="green">
          In Stock
        </Switch>
        <span className="text-xs text-[var(--muted-foreground)]">
          Only in-stock filaments appear as color options when creating orders.
        </span>
      </div>

      {error && (
        <p className="text-sm text-[var(--destructive)]">{error}</p>
      )}

      <div className="sticky bottom-0 bg-[var(--card)] -mx-6 px-6 pt-4 pb-4 border-t border-[var(--border)] flex justify-end gap-3 mt-2">
        <Button variant="outline" onPress={onCancel} isDisabled={saving}>
          Cancel
        </Button>
        <Button variant="primary" color="orange" onPress={handleSave} isDisabled={saving}>
          {saving ? 'Saving…' : (initial ? 'Save Changes' : 'Add Filament')}
        </Button>
      </div>
    </div>
  )
}
