import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { WkBadge } from '@wakata/ds/badge'
import type { WkStatus } from '@wakata/ds/status'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wk-badge': DetailedHTMLProps<HTMLAttributes<WkBadge>, WkBadge> & {
        class?: string
        variant?: 'informational' | 'success' | 'warning' | 'danger'
        'data-pq-tone'?: string
      }
      'wk-status': DetailedHTMLProps<HTMLAttributes<WkStatus>, WkStatus> & {
        class?: string
        variant?: 'informational' | 'success' | 'warning' | 'danger'
        live?: 'polite' | 'assertive'
      }
    }
  }
}
