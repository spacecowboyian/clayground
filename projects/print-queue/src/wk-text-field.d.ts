import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { WkTextField } from '@wakata/ds/text-field'
import type { WkNumberField } from '@wakata/ds/number-field'
import type { WkTextArea } from '@wakata/ds/text-area'

interface WkFieldAttrs {
  class?: string
  name?: string
  label?: string
  'help-text'?: string
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
  'data-pq-focus'?: string
  size?: 'small' | 'medium' | 'large' | 'xlarge'
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wk-text-field': DetailedHTMLProps<HTMLAttributes<WkTextField>, WkTextField> &
        WkFieldAttrs & { type?: 'text' | 'email' | 'password' | 'search' }
      'wk-number-field': DetailedHTMLProps<HTMLAttributes<WkNumberField>, WkNumberField> &
        WkFieldAttrs & { min?: string; max?: string; step?: string; currency?: string; locale?: string }
      'wk-text-area': DetailedHTMLProps<HTMLAttributes<WkTextArea>, WkTextArea> &
        WkFieldAttrs & { rows?: number; 'max-rows'?: number }
    }
  }
}
