import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { WkSelect } from '@wakata/ds/select'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wk-select': DetailedHTMLProps<HTMLAttributes<WkSelect>, WkSelect> & {
        class?: string
        label?: string
        error?: string
        disabled?: boolean
        'data-pq-focus'?: string
      }
    }
  }
}
