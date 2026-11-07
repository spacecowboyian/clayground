import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { PqItemStatusSelect } from './components/pq-item-status-select'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'pq-item-status-select': DetailedHTMLProps<HTMLAttributes<PqItemStatusSelect>, PqItemStatusSelect>
    }
  }
}
