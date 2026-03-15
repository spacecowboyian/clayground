import { useEffect, useState } from 'react'
import { Button } from '@gearhead/ui'
import { Printer } from 'lucide-react'
import {
  fetchBambuTasks,
  cleanPrintTitle,
  bambuHexToCSS,
  formatPrintTime,
  type BambuTask,
} from '../../lib/bambu'

/** Data extracted from a Bambu print job, used to pre-fill the WorkOrderForm */
export interface BambuPrefillData {
  bambuTitle: string
  customer: string
  item: string
  color: string
  notes: string
  status: string
  price: number
}

interface BambuImportDialogProps {
  accessToken: string
  corsProxy: string
  onImport: (prefill: BambuPrefillData) => void
  onClose: () => void
}

/** Build a human-readable color label from AMS slot 0 */
function colorLabelFromTask(task: BambuTask): string {
  const slot = task.amsDetailMapping?.[0]
  if (!slot) return ''
  // Use filament type as the primary label; append the hex swatch hint
  const type = slot.filamentType || slot.targetFilamentType || ''
  return type || bambuHexToCSS(slot.targetColor || slot.sourceColor)
}

/** Build a notes string summarising the print */
function notesFromTask(task: BambuTask): string {
  const parts: string[] = []
  if (task.costTime) parts.push(`Print time: ${formatPrintTime(task.costTime)}`)
  if (task.weight) parts.push(`Filament: ${task.weight.toFixed(1)} g`)
  if (task.startTime) {
    const date = new Date(task.startTime.replace(' ', 'T'))
    if (!isNaN(date.getTime())) {
      parts.push(`Printed: ${date.toLocaleDateString()}`)
    }
  }
  return parts.join(' · ')
}

/** Convert a BambuTask into a BambuPrefillData object */
function prefillFromTask(task: BambuTask): BambuPrefillData {
  const itemName = cleanPrintTitle(task.title)
  const color = colorLabelFromTask(task)
  const notes = notesFromTask(task)
  return {
    bambuTitle: itemName,
    customer: 'New Print',
    item: itemName,
    color,
    notes,
    status: 'waiting',
    price: 0,
  }
}

export function BambuImportDialog({ accessToken, corsProxy, onImport, onClose }: BambuImportDialogProps) {
  const [tasks, setTasks]   = useState<BambuTask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchBambuTasks(accessToken, { corsProxy })
      .then((result) => {
        if (!cancelled) {
          setTasks(result)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : String(err)
          // Provide a richer hint when the error looks CORS-related
          if (
            msg.includes('Failed to fetch') ||
            msg.includes('NetworkError') ||
            msg.includes('CORS') ||
            msg.includes('blocked by CORS')
          ) {
            setError(
              'Could not reach the Bambu API — this is usually a CORS restriction. ' +
              'Configure a CORS proxy URL in Farm Settings (e.g. https://corsproxy.io/?) and try again.',
            )
          } else if (msg.includes('No compatible Bambu task endpoint')) {
            setError(
              'Bambu cloud task endpoints were not available for this account/token. ' +
              'This can happen if Bambu changed cloud API access for your account or app version.',
            )
          } else {
            setError(msg)
          }
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [accessToken, corsProxy])

  return (
    <div className="space-y-4">
      {loading && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center justify-center py-10 text-[var(--muted-foreground)]"
        >
          <span className="animate-spin mr-2" aria-hidden>⏳</span>
          Fetching recent prints from Bambu…
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-[var(--destructive)] bg-[var(--accent-red-light)] p-4 text-sm text-[var(--destructive)] space-y-2">
          <p className="font-medium">Failed to load Bambu prints</p>
          <p>{error}</p>
          <p className="text-xs text-[var(--muted-foreground)]">
            Tip: Set a CORS proxy URL in{' '}
            <span className="font-medium text-[var(--foreground)]">Farm Settings → Bambu Integration</span>.
          </p>
        </div>
      )}

      {!loading && !error && tasks.length === 0 && (
        <div className="text-center py-10 text-[var(--muted-foreground)]">
          <Printer className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p>No completed prints found in your Bambu account.</p>
        </div>
      )}

      {!loading && !error && tasks.length > 0 && (
        <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
          {tasks.map((task) => {
            const slot0 = task.amsDetailMapping?.[0]
            const cssColor = slot0
              ? bambuHexToCSS(slot0.targetColor || slot0.sourceColor)
              : '#9ca3af'
            const itemName = cleanPrintTitle(task.title)
            const printDate = task.startTime
              ? new Date(task.startTime.replace(' ', 'T')).toLocaleDateString()
              : '—'

            return (
              <div
                key={task.id}
                className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 hover:bg-[var(--secondary)] transition-colors"
              >
                {/* Color swatch */}
                <span
                  className="w-5 h-5 rounded-full border border-[var(--border)] shrink-0"
                  style={{ background: cssColor }}
                  aria-hidden
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-[var(--foreground)] truncate">{itemName}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {printDate}
                    {task.weight ? ` · ${task.weight.toFixed(1)} g` : ''}
                    {task.costTime ? ` · ${formatPrintTime(task.costTime)}` : ''}
                    {slot0?.filamentType ? ` · ${slot0.filamentType}` : ''}
                  </p>
                </div>

                <Button
                  variant="outline"
                  onPress={() => onImport(prefillFromTask(task))}
                  className="shrink-0 text-xs"
                >
                  Import
                </Button>
              </div>
            )
          })}
        </div>
      )}

      <div className="flex justify-end pt-2 border-t border-[var(--border)]">
        <Button variant="ghost" onPress={onClose}>Cancel</Button>
      </div>
    </div>
  )
}
