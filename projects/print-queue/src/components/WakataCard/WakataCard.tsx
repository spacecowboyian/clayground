import type { ReactNode } from 'react'
import './pq-model-card'
import './wakata-card.css'

interface CardProps {
  children: ReactNode
  footer?: ReactNode
  className?: string
  bodyClassName?: string
  padding?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export function Card({ children, footer, className, bodyClassName, padding = 'md' }: CardProps) {
  return (
    <pq-model-card class={['pq-wk-card', `pq-wk-card--${padding}`, className].filter(Boolean).join(' ')}>
      <div className={['pq-wk-card__body', bodyClassName].filter(Boolean).join(' ')}>{children}</div>
      {footer && <div slot="actions" className="pq-wk-card__footer">{footer}</div>}
    </pq-model-card>
  )
}
