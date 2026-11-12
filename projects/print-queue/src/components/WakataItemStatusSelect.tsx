import { useEffect, useRef } from 'react'
import type { PqItemStatusSelect } from './pq-item-status-select'
import './pq-item-status-select'
import type { PrintItemStatus } from '../types/WorkOrder'

const OPTIONS: Array<{ id: PrintItemStatus; label: string }> = [
  { id: 'queue', label: 'Queue' },
  { id: 'printing', label: 'Printing' },
  { id: 'complete', label: 'Complete' },
]

interface WakataItemStatusSelectProps {
  value: PrintItemStatus
  label: string
  onChange: (status: PrintItemStatus) => Promise<void>
}

export function WakataItemStatusSelect({ value, label, onChange }: WakataItemStatusSelectProps) {
  const ref = useRef<PqItemStatusSelect>(null)
  const onChangeRef = useRef(onChange)
  const valueRef = useRef(value)
  const pendingRef = useRef(false)
  onChangeRef.current = onChange
  valueRef.current = value

  useEffect(() => {
    const host = ref.current
    if (!host) return
    const handle = (e: Event) => {
      if (pendingRef.current) {
        host.value = valueRef.current
        return
      }
      pendingRef.current = true
      host.setAttribute('aria-busy', 'true')
      const next = (e as CustomEvent<{ value: string }>).detail.value as PrintItemStatus
      void onChangeRef.current(next).catch(() => {
        host.value = valueRef.current
      }).finally(() => {
        pendingRef.current = false
        host.removeAttribute('aria-busy')
      })
    }
    host.addEventListener('wk-change', handle)
    return () => host.removeEventListener('wk-change', handle)
  }, [])

  useEffect(() => {
    const host = ref.current
    if (host && host.value !== value) host.value = value
  }, [value])

  return (
    <pq-item-status-select ref={ref}>
      <select slot="input" aria-label={label} defaultValue={value}>
        {OPTIONS.map(o => (
          <option key={o.id} value={o.id}>{o.label}</option>
        ))}
      </select>
    </pq-item-status-select>
  )
}
