import { useState } from 'react'
import { Button, TextField, TextArea, NumberField, Select, Switch } from '@gearhead/ui'
import { Plus, Trash2 } from 'lucide-react'
import type { PrintModel, PrintModelInput, Filament, ModelFilamentRequirement } from '../../types/Inventory'

const MAX_FILAMENT_REQUIREMENTS = 4

interface ModelFormProps {
  initial?: PrintModel
  filaments: Filament[]
  onSave: (input: PrintModelInput) => Promise<void>
  onCancel: () => void
}

export function ModelForm({ initial, filaments, onSave, onCancel }: ModelFormProps) {
  const [name, setName]                     = useState(initial?.name                ?? '')
  const [description, setDesc]              = useState(initial?.description         ?? '')
  const [modelUrl, setModelUrl]             = useState(initial?.model_url           ?? '')
  const [imageUrl, setImageUrl]             = useState(initial?.image_url           ?? '')
  const [selfCreated, setSelfCreated]       = useState(initial?.self_created        ?? false)
  const [requirements, setRequirements]     = useState<ModelFilamentRequirement[]>(
    initial?.filament_requirements?.length
      ? initial.filament_requirements
      : [{ filament_id: null, quantity_g: 0 }]
  )
  const [postProcessing, setPostProcessing] = useState(initial?.post_processing_mins ?? 0)
  const [saving, setSaving]                 = useState(false)
  const [error, setError]                   = useState<string | null>(null)

  // ── Filament requirement helpers ────────────────────────────────────────────
  function updateRequirement(index: number, patch: Partial<ModelFilamentRequirement>) {
    setRequirements(prev => prev.map((r, i) => i === index ? { ...r, ...patch } : r))
  }

  function addRequirement() {
    if (requirements.length >= MAX_FILAMENT_REQUIREMENTS) return
    setRequirements(prev => [...prev, { filament_id: null, quantity_g: 0 }])
  }

  function removeRequirement(index: number) {
    if (requirements.length <= 1) return
    setRequirements(prev => prev.filter((_, i) => i !== index))
  }

  // Build options for the filament selector (all filaments regardless of stock)
  const filamentOptions = [
    { id: '__none__', label: '— Not assigned —' },
    ...filaments.map(f => ({ id: f.id, label: `${f.color}${f.brand ? ` (${f.brand})` : ''}` })),
  ]

  async function handleSave() {
    if (!name.trim()) {
      setError('Name is required.')
      return
    }
    // Validate requirements: every row must have a positive quantity
    const validReqs = requirements.filter(r => r.quantity_g > 0)
    if (validReqs.length === 0) {
      setError('Add at least one filament requirement with a quantity greater than 0.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      await onSave({
        name: name.trim(),
        description: description.trim(),
        model_url: modelUrl.trim(),
        image_url: imageUrl.trim(),
        self_created: selfCreated,
        filament_requirements: validReqs,
        post_processing_mins: postProcessing,
      })
    } catch {
      setError('Failed to save. Please try again.')
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <TextField
        label="Model Name"
        value={name}
        onChange={setName}
        isRequired
        placeholder="e.g. Heart curio shelf"
      />
      <TextArea
        label="Description"
        value={description}
        onChange={setDesc}
        placeholder="Brief description of the model…"
        rows={2}
      />

      {/* Self-created toggle */}
      <div className="flex items-center gap-3">
        <Switch isSelected={selfCreated} onChange={setSelfCreated} color="orange">
          Self-created design
        </Switch>
      </div>
      {selfCreated && (
        <p className="text-xs text-[var(--muted-foreground)] -mt-2 pl-0.5">
          This model was designed by you. A source URL is optional.
        </p>
      )}

      {/* Model URL — de-emphasised when self-created */}
      <TextField
        label={selfCreated ? 'Source URL (optional)' : 'Model URL'}
        value={modelUrl}
        onChange={setModelUrl}
        placeholder="https://makerworld.com/…"
      />
      <TextField
        label="Image URL"
        value={imageUrl}
        onChange={setImageUrl}
        placeholder="https://… (optional)"
      />

      {/* Filament Requirements */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-[var(--foreground)]">
            Filament Requirements
          </label>
          {requirements.length < MAX_FILAMENT_REQUIREMENTS && (
            <button
              type="button"
              onClick={addRequirement}
              className="text-xs text-[var(--accent-orange)] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add filament
            </button>
          )}
        </div>
        <p className="text-xs text-[var(--muted-foreground)]">
          Specify how much of each filament is needed per printed unit. Up to {MAX_FILAMENT_REQUIREMENTS} filaments.
        </p>
        <div className="space-y-2">
          {requirements.map((req, idx) => (
            <div
              key={idx}
              className="flex items-end gap-2 p-3 rounded-lg bg-[var(--secondary)] border border-[var(--border)]"
            >
              <div className="flex-1 min-w-0">
                <Select
                  label={idx === 0 ? 'Filament' : `Filament ${idx + 1}`}
                  options={filamentOptions}
                  selectedKey={req.filament_id ?? '__none__'}
                  onSelectionChange={key => {
                    const val = key as string
                    updateRequirement(idx, { filament_id: val === '__none__' ? null : val })
                  }}
                />
              </div>
              <div className="w-20 shrink-0">
                <NumberField
                  label="Qty (g)"
                  value={req.quantity_g}
                  onChange={v => updateRequirement(idx, { quantity_g: v })}
                  minValue={0}
                  formatOptions={{ maximumFractionDigits: 1 }}
                />
              </div>
              {requirements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRequirement(idx)}
                  className="mb-1 p-1.5 rounded hover:bg-[var(--accent-red-light)] text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors shrink-0"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <NumberField
          label="Post-Processing (min)"
          value={postProcessing}
          onChange={setPostProcessing}
          minValue={0}
          formatOptions={{ maximumFractionDigits: 0 }}
        />
      </div>
      <p className="text-xs text-[var(--muted-foreground)]">
        Filament requirements and post-processing time are used to calculate the estimated cost per item.
      </p>

      {error && (
        <p className="text-sm text-[var(--destructive)]">{error}</p>
      )}

      <div className="sticky bottom-0 bg-[var(--card)] -mx-6 px-6 pt-4 pb-4 border-t border-[var(--border)] flex justify-end gap-3 mt-2">
        <Button variant="outline" onPress={onCancel} isDisabled={saving}>
          Cancel
        </Button>
        <Button variant="primary" color="orange" onPress={handleSave} isDisabled={saving}>
          {saving ? 'Saving…' : (initial ? 'Save Changes' : 'Add Model')}
        </Button>
      </div>
    </div>
  )
}
