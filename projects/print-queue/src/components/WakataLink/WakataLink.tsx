import type { ReactNode } from 'react'
import '@wakata/ds/link/define'
import './wakata-link.css'

interface WakataLinkProps {
  href: string
  appearance?: 'text' | 'icon' | 'cta' | 'media'
  /** Icon-only links: visually hidden text used as the accessible name. */
  label?: string
  className?: string
  children?: ReactNode
}

/** External link via <wk-link>; always opens in a new tab with noopener noreferrer. */
export function Link({ href, appearance = 'text', label, className, children }: WakataLinkProps) {
  return (
    <wk-link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="standalone"
      class={['pq-wk-link', className].filter(Boolean).join(' ')}
      data-pq-appearance={appearance}
    >
      {children}
      {label && <span className="sr-only">{label}</span>}
    </wk-link>
  )
}
