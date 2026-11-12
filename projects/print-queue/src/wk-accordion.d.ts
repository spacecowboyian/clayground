import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { WkAccordion, WkAccordionItem } from '@wakata/ds/accordion'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wk-accordion': DetailedHTMLProps<HTMLAttributes<WkAccordion>, WkAccordion> & {
        class?: string
        multiple?: boolean
      }
      'wk-accordion-item': DetailedHTMLProps<HTMLAttributes<WkAccordionItem>, WkAccordionItem> & {
        value?: string
        level?: number
        disabled?: boolean
      }
    }
  }
}
