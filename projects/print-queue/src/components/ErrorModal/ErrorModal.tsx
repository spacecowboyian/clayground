import { useId } from 'react'
import { Button } from '../WakataButton/WakataButton'
import { Dialog } from '../WakataDialog/WakataDialog'
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
 * Alert dialog (wk-dialog alert mode) shown when data cannot be loaded from Supabase.
 * Provides a Retry button to re-trigger the failed fetch.
 */
export function ErrorModal({ error, onRetry, onDismiss }: ErrorModalProps) {
  const descId = useId()
  return (
    <Dialog
      isOpen
      isAlertDialog
      describedById={descId}
      title="Unable to load data"
      className="pq-wk-dialog--alert"
      onOpenChange={open => { if (!open) onDismiss?.() }}
      footer={
        <>
          <Button variant="primary" color="orange" onPress={onRetry} className="flex-1 justify-center">
            Retry
          </Button>
          {onDismiss && (
            <Button variant="outline" onPress={onDismiss} className="flex-1 justify-center">
              Dismiss
            </Button>
          )}
        </>
      }
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="pq-wk-dialog__alert-icon" aria-hidden="true" />
        <p id={descId} className="pq-wk-dialog__alert-desc">{error}</p>
      </div>
    </Dialog>
  )
}
