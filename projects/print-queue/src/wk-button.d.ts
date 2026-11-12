import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { WkButton } from '@wakata/ds/button'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wk-button': DetailedHTMLProps<HTMLAttributes<WkButton>, WkButton> & {
        class?: string
        variant?: string
        intent?: string
        size?: string
        disabled?: boolean
      }
    }
  }
}
