import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { WkProgress } from '@wakata/ds/progress'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wk-progress': DetailedHTMLProps<HTMLAttributes<WkProgress>, WkProgress> & {
        class?: string
        current?: number
      }
    }
  }
}
