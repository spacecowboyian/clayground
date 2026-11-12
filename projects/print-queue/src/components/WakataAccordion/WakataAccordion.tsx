import { useEffect, useRef, useState, type ReactNode } from 'react'
import '@wakata/ds/accordion/define'
import type { WkAccordion } from '@wakata/ds/accordion'
import './wakata-accordion.css'

const ITEM_VALUE = 'section'

interface AccordionProps {
  title: ReactNode
  badge?: ReactNode
  children: ReactNode
  isExpanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (isExpanded: boolean) => void
  className?: string
}

/** Thin bridge over wk-accordion / wk-accordion-item; one item per accordion. */
export function Accordion({
  title,
  badge,
  children,
  isExpanded,
  defaultExpanded = false,
  onExpandedChange,
  className,
}: AccordionProps) {
  const [internal, setInternal] = useState(defaultExpanded)
  const open = isExpanded ?? internal
  const ref = useRef<WkAccordion>(null)
  const latest = useRef({ isExpanded, onExpandedChange })
  useEffect(() => {
    latest.current = { isExpanded, onExpandedChange }
  })

  // Programmatic writes emit no wk-change.
  useEffect(() => {
    if (ref.current) ref.current.value = open ? [ITEM_VALUE] : []
  }, [open])

  useEffect(() => {
    const host = ref.current
    if (!host) return
    const handle = (event: Event) => {
      const next = (event as CustomEvent<{ value: string[] }>).detail.value.includes(ITEM_VALUE)
      const { isExpanded: controlled, onExpandedChange: notify } = latest.current
      if (controlled === undefined) setInternal(next)
      else host.value = controlled ? [ITEM_VALUE] : []
      notify?.(next)
    }
    host.addEventListener('wk-change', handle)
    return () => host.removeEventListener('wk-change', handle)
  }, [])

  return (
    <wk-accordion ref={ref} class={['pq-accordion', className].filter(Boolean).join(' ')}>
      <wk-accordion-item value={ITEM_VALUE} level={3}>
        <span slot="heading" className="pq-accordion__title">
          {title}
          {badge}
        </span>
        {children}
      </wk-accordion-item>
    </wk-accordion>
  )
}
