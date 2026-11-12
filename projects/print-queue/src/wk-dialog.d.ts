import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { WkDialog } from '@wakata/ds/dialog'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wk-dialog': DetailedHTMLProps<HTMLAttributes<WkDialog>, WkDialog>
    }
  }
}
