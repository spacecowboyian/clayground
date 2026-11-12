import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { WkCard } from '@wakata/ds/card'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wk-card': DetailedHTMLProps<HTMLAttributes<WkCard>, WkCard> & {
        class?: string
      }
      'pq-model-card': DetailedHTMLProps<HTMLAttributes<WkCard>, WkCard> & {
        class?: string
      }
    }
  }
}
