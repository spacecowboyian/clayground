import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { WkSwitch } from '@wakata/ds/switch'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wk-switch': DetailedHTMLProps<HTMLAttributes<WkSwitch>, WkSwitch> & {
        class?: string
        label?: string
        disabled?: boolean
        'data-pq-color'?: string
      }
    }
  }
}
