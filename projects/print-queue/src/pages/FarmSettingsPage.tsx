import { useState } from 'react'
import { Button, NumberField } from '@gearhead/ui'
import { DEFAULT_FARM_SETTINGS } from '../types/FarmSettings'
import { useAppDispatch, useAppSelector } from '../store'
import { updateSettings } from '../store/settingsSlice'

interface FarmSettingsPageProps {
  onBack: () => void
}

export function FarmSettingsPage({ onBack }: FarmSettingsPageProps) {
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
      <header className="border-b border-[var(--border)] bg-[var(--card)] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="./tinyprints-printer.svg" alt="Tiny Prints" className="w-9 h-9 object-contain" />
            <span className="font-bold text-[var(--foreground)] text-lg hidden sm:block">Tiny Prints</span>
            <span className="text-[var(--muted-foreground)] text-sm hidden sm:block">/ Farm Settings</span>
          </div>
          <Button variant="ghost" onPress={onBack} className="text-sm">
            ← Queue
          </Button>
        </div>
      </header>

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
