import { useState } from 'react'
import { Button, TextField, Switch, Select } from '@gearhead/ui'
import type { Filament, FilamentInput } from '../../types/Inventory'

const MATERIAL_OPTIONS = [
  { id: 'PLA',  label: 'PLA' },
  { id: 'PETG', label: 'PETG' },
  { id: 'ABS',  label: 'ABS' },
  { id: 'TPU',  label: 'TPU' },
  { id: 'ASA',  label: 'ASA' },
  { id: 'Other', label: 'Other' },
]

interface FilamentFormProps {
  initial?: Filament
  onSave: (input: FilamentInput) => Promise<void>
  onCancel: () => void
}

export function FilamentForm({ initial, onSave, onCancel }: FilamentFormProps) {
  const [brand, setBrand]       = useState(initial?.brand     ?? '')
  const [material, setMaterial] = useState(initial?.material  ?? 'PLA')
  const [color, setColor]       = useState(initial?.color     ?? '')
  const [colorHex, setColorHex] = useState(initial?.color_hex ?? '')
  const [inStock, setInStock]   = useState(initial?.in_stock  ?? true)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState<string | null>(null)

  async function handleSave() {
    if (!color.trim()) {
      setError('Color name is required.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      await onSave({
        brand: brand.trim(),
        material,
        color: color.trim(),
        color_hex: colorHex.trim(),
        in_stock: inStock,
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
        <Select
          label="Material"
          options={MATERIAL_OPTIONS}
          selectedKey={material}
          onSelectionChange={key => { if (key != null) setMaterial(key as string) }}
        />
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

      <div className="flex justify-end gap-3 pt-2">
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
