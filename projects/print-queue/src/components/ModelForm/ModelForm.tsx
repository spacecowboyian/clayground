import { useState } from 'react'
import { Button, TextField, TextArea, NumberField } from '@gearhead/ui'
import type { PrintModel, PrintModelInput } from '../../types/Inventory'

interface ModelFormProps {
  initial?: PrintModel
  onSave: (input: PrintModelInput) => Promise<void>
  onCancel: () => void
}

export function ModelForm({ initial, onSave, onCancel }: ModelFormProps) {
  const [name, setName]                     = useState(initial?.name                ?? '')
  const [description, setDesc]              = useState(initial?.description         ?? '')
  const [modelUrl, setModelUrl]             = useState(initial?.model_url           ?? '')
  const [imageUrl, setImageUrl]             = useState(initial?.image_url           ?? '')
  const [filamentUsage, setFilamentUsage]   = useState(initial?.filament_usage_g    ?? 0)
  const [postProcessing, setPostProcessing] = useState(initial?.post_processing_mins ?? 0)
  const [saving, setSaving]                 = useState(false)
  const [error, setError]                   = useState<string | null>(null)

  async function handleSave() {
    if (!name.trim()) {
      setError('Name is required.')
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
        filament_usage_g: filamentUsage,
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
      <TextField
        label="Model URL"
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

      <div className="grid grid-cols-2 gap-4">
        <NumberField
          label="Filament Usage (g)"
          value={filamentUsage}
          onChange={setFilamentUsage}
          minValue={0}
          formatOptions={{ maximumFractionDigits: 1 }}
        />
        <NumberField
          label="Post-Processing (min)"
          value={postProcessing}
          onChange={setPostProcessing}
          minValue={0}
          formatOptions={{ maximumFractionDigits: 0 }}
        />
      </div>
      <p className="text-xs text-[var(--muted-foreground)]">
        Filament usage and post-processing time are used to calculate the estimated cost per item.
      </p>

      {error && (
        <p className="text-sm text-[var(--destructive)]">{error}</p>
      )}

      <div className="flex justify-end gap-3 pt-2">
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
