import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { WkColorPicker } from '@wakata/ds/color-picker'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wk-color-picker': DetailedHTMLProps<HTMLAttributes<WkColorPicker>, WkColorPicker> & {
        class?: string
        label?: string
      }
    }
  }
}
