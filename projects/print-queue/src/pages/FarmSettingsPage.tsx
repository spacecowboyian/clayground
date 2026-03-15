import { useState } from 'react'
import { Button, NumberField, TextField } from '@gearhead/ui'
import { DEFAULT_FARM_SETTINGS } from '../types/FarmSettings'
import { useAppDispatch, useAppSelector } from '../store'
import { updateSettings } from '../store/settingsSlice'
import { AppHeader } from '../components/AppHeader/AppHeader'
import { fetchBambuTasks } from '../lib/bambu'

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

  // Bambu settings state
  const [bambuToken, setBambuToken]       = useState(settings.bambu_access_token ?? '')
  const [bambuProxy, setBambuProxy]       = useState(settings.bambu_cors_proxy ?? '')
  const [bambuTesting, setBambuTesting]   = useState(false)
  const [bambuTestResult, setBambuTestResult] = useState<{ ok: boolean; msg: string } | null>(null)

  function handleSave() {
    dispatch(updateSettings({
      ...settings,
      labor_rate_per_hour: laborRate,
      bambu_access_token: bambuToken,
      bambu_cors_proxy: bambuProxy,
    }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleReset() {
    setLaborRate(DEFAULT_FARM_SETTINGS.labor_rate_per_hour)
  }

  async function handleTestBambu() {
    if (!bambuToken.trim()) {
      setBambuTestResult({ ok: false, msg: 'Enter an access token first.' })
      return
    }
    setBambuTesting(true)
    setBambuTestResult(null)
    try {
      const tasks = await fetchBambuTasks(bambuToken.trim(), { corsProxy: bambuProxy.trim(), limit: 1 })
      setBambuTestResult({ ok: true, msg: `Connection successful — ${tasks.length} recent print(s) found.` })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      const isCors =
        msg.includes('Failed to fetch') ||
        msg.includes('NetworkError') ||
        msg.includes('CORS')
      setBambuTestResult({
        ok: false,
        msg: isCors
          ? 'CORS error — the Bambu API blocked the browser request. Configure a CORS proxy URL below and try again.'
          : msg,
      })
    } finally {
      setBambuTesting(false)
    }
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

        {/* Bambu Integration */}
        <section className="max-w-md space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Bambu Integration</h2>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              Connect your Bambu Lab account to import recent print jobs directly as new orders.
            </p>
          </div>

          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 space-y-5">
            <div className="space-y-2">
              <TextField
                label="Cloud Access Token"
                type="password"
                value={bambuToken}
                onChange={setBambuToken}
                placeholder="Paste your Bambu cloud token"
              />
              <p className="text-xs text-[var(--muted-foreground)]">
                This integration uses Bambu cloud APIs with bearer-token auth.
                Token availability can vary by app version/account policy.
                It is stored locally and never sent to Supabase.
              </p>
            </div>

            <div className="space-y-2">
              <TextField
                label="CORS Proxy URL (optional)"
                value={bambuProxy}
                onChange={setBambuProxy}
                placeholder="e.g. https://corsproxy.io/?"
              />
              <p className="text-xs text-[var(--muted-foreground)]">
                The Bambu API blocks direct browser requests (CORS). Add a proxy prefix if you see
                a network error. Leave empty to attempt a direct connection.
              </p>
            </div>

            {bambuTestResult && (
              <div
                className={`rounded-lg border p-3 text-sm ${
                  bambuTestResult.ok
                    ? 'border-[var(--accent-green)] bg-[var(--secondary)] text-[var(--accent-green)]'
                    : 'border-[var(--destructive)] bg-[var(--accent-red-light)] text-[var(--destructive)]'
                }`}
              >
                {bambuTestResult.msg}
              </div>
            )}

            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <Button variant="outline" onPress={() => void handleTestBambu()} isDisabled={bambuTesting}>
                {bambuTesting ? 'Testing…' : 'Test Connection'}
              </Button>
              <Button variant="primary" color="orange" onPress={handleSave}>
                {saved ? '✓ Saved' : 'Save Settings'}
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

