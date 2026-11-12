import { useEffect, useRef } from 'react'
import '@wakata/ds/color-picker/define'
import type { WkColorPicker } from '@wakata/ds/color-picker'
import '../WakataTextField/wakata-text-field.css'
import './wakata-color-picker.css'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
  className?: string
}

const HEX_RE = /^#[0-9a-f]{6}$/i

/** Syncs React state with wk-color-picker; only valid #rrggbb (or cleared) values reach state. */
export function ColorPicker({ label, value, onChange, className }: ColorPickerProps) {
  const ref = useRef<WkColorPicker>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    const host = ref.current
    if (!host) return
    const handle = (event: Event) => {
      const next = (event as CustomEvent<{ value: string }>).detail.value
      if (next === '' || HEX_RE.test(next)) onChangeRef.current(next)
    }
    host.addEventListener('wk-input', handle)
    return () => host.removeEventListener('wk-input', handle)
  }, [])

  useEffect(() => {
    const host = ref.current
    if (host && host.value !== value) host.value = value
  }, [value])

  return (
    <wk-color-picker
      ref={ref}
      class={['pq-wk-field', 'pq-wk-color-picker', className].filter(Boolean).join(' ')}
      label={label}
    />
  )
}
