import { useState } from 'react'
import { Button, NumberField } from '@gearhead/ui'
import { DEFAULT_FARM_SETTINGS } from '../types/FarmSettings'
import { useAppDispatch, useAppSelector } from '../store'
import { updateSettings } from '../store/settingsSlice'
import { AppHeader } from '../components/AppHeader/AppHeader'

interface FarmSettingsPageProps {
  onLogout?: () => void
  onPrintQueue: () => void
  onOrders: () => void
  onModels: () => void
  onFilaments: () => void
  onSettings: () => void
}

export function FarmSettingsPage({ onLogout, onPrintQueue, onOrders, onModels, onFilaments, onSettings }: FarmSettingsPageProps) {
  const dispatch  = useAppDispatch()
  const settings  = useAppSelector(state => state.settings.settings)
  const [saved, setSaved]         = useState(false)
  const [laborRate, setLaborRate] = useState(settings.labor_rate_per_hour)

  function handleSave() {
    dispatch(updateSettings({ ...settings, labor_rate_per_hour: laborRate }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleReset() {
    setLaborRate(DEFAULT_FARM_SETTINGS.labor_rate_per_hour)
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top bar */}
      <AppHeader
        currentPage="settings"
        onPrintQueue={onPrintQueue}
        onOrders={onOrders}
        onModels={onModels}
        onFilaments={onFilaments}
        onSettings={onSettings}
        onLogout={onLogout}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        <section className="max-w-md space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Costing Variables</h2>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              These values are used to automatically calculate the cost of each order based on
              filament usage and post-processing time.
            </p>
          </div>

          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 space-y-5">
            <div className="space-y-2">
              <NumberField
                label="Labor Rate ($/hour)"
                value={laborRate}
                onChange={setLaborRate}
                minValue={0}
                formatOptions={{ style: 'currency', currency: 'USD' }}
              />
              <p className="text-xs text-[var(--muted-foreground)]">
                Applied to post-processing time per model to calculate labor cost per item.
                Default is $30/hour.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <Button variant="primary" color="orange" onPress={handleSave}>
                {saved ? '✓ Saved' : 'Save Settings'}
              </Button>
              <Button variant="ghost" onPress={handleReset} className="text-sm">
                Reset to defaults
              </Button>
            </div>
          </div>

          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 space-y-3">
            <h3 className="text-sm font-medium text-[var(--foreground)]">How cost is calculated</h3>
            <div className="text-xs text-[var(--muted-foreground)] space-y-2">
              <p>
                <span className="text-[var(--foreground)] font-medium">Material cost</span>
                {' = (filament usage ÷ roll size) × roll cost'}
              </p>
              <p>
                <span className="text-[var(--foreground)] font-medium">Labor cost</span>
                {' = (post-processing minutes ÷ 60) × labor rate'}
              </p>
              <p>
                <span className="text-[var(--foreground)] font-medium">Total cost</span>
                {' = material cost + labor cost'}
              </p>
              <p className="pt-1">
                Filament usage and post-processing time are set per model in the Inventory page.
                Roll cost and roll size are set per filament.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

