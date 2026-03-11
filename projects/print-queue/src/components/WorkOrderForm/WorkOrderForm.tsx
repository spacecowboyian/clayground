import { useState } from 'react'
import type React from 'react'
import { Button, TextField, Select, Switch, TextArea } from '@gearhead/ui'
import type { WorkOrder, WorkOrderInput, WorkOrderStatus } from '../../types/WorkOrder'

const STATUS_OPTIONS = [
  { id: 'Queue',     label: 'Queue' },
  { id: 'Printing',  label: 'Printing' },
  { id: 'Complete',  label: 'Complete' },
  { id: 'Cancelled', label: 'Cancelled' },
]

interface WorkOrderFormProps {
  initial?: WorkOrder
  onSave: (input: WorkOrderInput) => Promise<void>
  onCancel: () => void
}

export function WorkOrderForm({ initial, onSave, onCancel }: WorkOrderFormProps) {
  const [customer, setCustomer] = useState(initial?.customer  ?? '')
  const [item, setItem]         = useState(initial?.item      ?? '')
  const [color, setColor]       = useState(initial?.color     ?? '')
  const [modelUrl, setModelUrl] = useState(initial?.model_url ?? '')
  const [status, setStatus]     = useState<WorkOrderStatus>(initial?.status ?? 'Queue')
  const [paid, setPaid]         = useState(initial?.paid      ?? false)
  const [notes, setNotes]       = useState(initial?.notes     ?? '')
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState<string | null>(null)

  async function handleSave() {
    if (!customer.trim() || !item.trim() || !color.trim()) {
      setError('Customer, Item, and Color are required.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      await onSave({
        customer: customer.trim(),
        item: item.trim(),
        color: color.trim(),
        model_url: modelUrl.trim(),
        status,
        paid,
        notes: notes.trim(),
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
          label="Customer"
          value={customer}
          onChange={setCustomer}
          isRequired
          placeholder="e.g. Karen coworker"
        />
        <TextField
          label="Item"
          value={item}
          onChange={setItem}
          isRequired
          placeholder="e.g. Heart curio shelf"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Color"
          value={color}
          onChange={setColor}
          isRequired
          placeholder="e.g. Pink"
        />
        <Select
          label="Status"
          options={STATUS_OPTIONS}
          selectedKey={status}
          onSelectionChange={(key: React.Key) => setStatus(key as WorkOrderStatus)}
        />
      </div>
      <TextField
        label="Model URL"
        value={modelUrl}
        onChange={setModelUrl}
        placeholder="https://makerworld.com/..."
      />
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
