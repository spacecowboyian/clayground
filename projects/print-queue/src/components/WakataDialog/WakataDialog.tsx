import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import '@wakata/ds/dialog/define'
import '@wakata/ds/button/define'
import type { WkDialog } from '@wakata/ds/dialog'
import { Button } from '../WakataButton/WakataButton'
import './wakata-dialog.css'

interface WakataDialogProps {
  title?: string
  isOpen: boolean
  onOpenChange?: (isOpen: boolean) => void
  children: ReactNode
  footer?: ReactNode
  className?: string
  /** 'md' = 28rem (default), 'xl' = 42rem */
  size?: 'md' | 'xl'
  /** Alert mode: alertdialog role, no header close button. Requires `describedById`. */
  isAlertDialog?: boolean
  /** id of an element inside `children`/`footer` that describes the dialog */
  describedById?: string
}

/**
 * React bridge for <wk-dialog>. Controlled only: the parent owns `isOpen`.
 * Escape, the mobile backdrop strip and the close button all report through
 * onOpenChange(false); the wk-dialog itself handles focus trap and modality.
 */
export function Dialog({ title, isOpen, onOpenChange, children, footer, className, size = 'md', isAlertDialog, describedById }: WakataDialogProps) {
  const ref = useRef<WkDialog>(null)
  const titleId = useId()
  const onOpenChangeRef = useRef(onOpenChange)
  onOpenChangeRef.current = onOpenChange
  const returnFocusRef = useRef<Element | null>(null)
  const isOpenRef = useRef(isOpen)
  isOpenRef.current = isOpen

  useEffect(() => {
    const host = ref.current
    if (!host) return
    if (!returnFocusRef.current) returnFocusRef.current = document.activeElement
    const onOpened = () => {
      if (!host.opened && isOpenRef.current) onOpenChangeRef.current?.(false)
    }
    host.addEventListener('opened-changed', onOpened)
    return () => host.removeEventListener('opened-changed', onOpened)
  }, [])

  useEffect(() => {
    const host = ref.current
    if (!host) return
    if (isOpen && !host.opened) {
      host.open().catch(err => console.error(err))
    } else if (!isOpen && host.opened) {
      void host.close()
    }
  }, [isOpen])

  // Call sites unmount the dialog on close, so restore focus to the opener on unmount.
  useEffect(() => {
    const host = ref.current
    return () => {
      const target = returnFocusRef.current
      if (host?.opened) void host.close()
      queueMicrotask(() => {
        if (target instanceof HTMLElement && target.isConnected && !document.querySelector('[data-wk-dialog-content]')) {
          const active = document.activeElement
          if (!active || active === document.body) target.focus()
        }
      })
    }
  }, [])

  return (
    <wk-dialog ref={ref} {...(isAlertDialog ? { 'is-alert-dialog': '' } : {})}>
      <div
        slot="content"
        role={isAlertDialog ? 'alertdialog' : 'dialog'}
        aria-labelledby={titleId}
        aria-describedby={describedById}
        className={['pq-wk-dialog', size === 'xl' && 'pq-wk-dialog--xl', className].filter(Boolean).join(' ')}
      >
        <div className="pq-wk-dialog__header">
          <h2 id={titleId} className="pq-wk-dialog__title">{title}</h2>
          {!isAlertDialog && (
            <Button
              variant="ghost"
              appearance="icon"
              className="pq-wk-dialog__close"
              aria-label="Close dialog"
              onPress={() => onOpenChange?.(false)}
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </Button>
          )}
        </div>
        <div className="pq-wk-dialog__body">{children}</div>
        {footer && <div className="pq-wk-dialog__footer">{footer}</div>}
      </div>
    </wk-dialog>
  )
}
