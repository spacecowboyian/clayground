import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { WkLink } from '@wakata/ds/link'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wk-link': DetailedHTMLProps<HTMLAttributes<WkLink>, WkLink> & {
        class?: string
        href?: string
        target?: string
        rel?: string
        variant?: string
      }
    }
  }
}
