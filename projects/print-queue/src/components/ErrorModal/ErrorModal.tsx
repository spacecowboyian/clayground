import { Button } from '@gearhead/ui'
import { AlertCircle } from 'lucide-react'

interface ErrorModalProps {
  /** The error message to display */
  error: string
  /** Called when the user clicks Retry */
  onRetry: () => void
  /** Called when the user dismisses the modal (optional) */
  onDismiss?: () => void
}

/**
 * Full-screen overlay modal shown when data cannot be loaded from Supabase.
 * Provides a Retry button to re-trigger the failed fetch.
 */
export function ErrorModal({ error, onRetry, onDismiss }: ErrorModalProps) {
  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div className="bg-[var(--card)] border border-[var(--destructive)] rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5">
        {/* Icon + title */}
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 shrink-0 text-[var(--destructive)] mt-0.5" aria-hidden="true" />
          <div>
            <h2
              id="error-modal-title"
              className="text-base font-semibold text-[var(--foreground)]"
            >
              Unable to load data
            </h2>
            <p
              id="error-modal-desc"
              className="mt-1 text-sm text-[var(--muted-foreground)] leading-relaxed"
            >
              {error}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <Button variant="primary" color="orange" onPress={onRetry} className="flex-1 justify-center">
            Retry
          </Button>
          {onDismiss && (
            <Button variant="outline" onPress={onDismiss} className="flex-1 justify-center">
              Dismiss
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
