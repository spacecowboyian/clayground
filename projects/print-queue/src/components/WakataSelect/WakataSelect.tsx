import { useEffect, useRef } from 'react'
import '@wakata/ds/select/define'
import type { WkSelect } from '@wakata/ds/select'
import '../WakataTextField/wakata-text-field.css'
import './wakata-select.css'

interface SelectOption {
  id: string
  label: string
}

interface SelectProps {
  label?: string
  'aria-label'?: string
  options: SelectOption[]
  selectedKey: string | null
  onSelectionChange: (key: string) => void
  placeholder?: string
  errorMessage?: string
  isDisabled?: boolean
  compact?: boolean
  className?: string
}

/** Wraps <wk-select>; React owns the light-DOM native select, Wakata owns the field chrome. */
export function Select({
  label,
  'aria-label': ariaLabel,
  options,
  selectedKey,
  onSelectionChange,
  placeholder,
  errorMessage,
  isDisabled,
  compact,
  className,
}: SelectProps) {
  const ref = useRef<WkSelect>(null)
  const onChangeRef = useRef(onSelectionChange)
  onChangeRef.current = onSelectionChange
  const value = selectedKey ?? ''

  useEffect(() => {
    const host = ref.current
    if (!host) return
    const handle = (event: Event) => {
      onChangeRef.current((event as CustomEvent<{ value: string }>).detail.value)
    }
    host.addEventListener('wk-change', handle)
    return () => host.removeEventListener('wk-change', handle)
  }, [])

  // Runs after every render so option changes re-resolve the selection.
  useEffect(() => {
    const host = ref.current
    if (host && host.value !== value) host.value = value
  })

  const hasSelectedOption = options.some(o => o.id === value)

  return (
    <wk-select
      ref={ref}
      class={['pq-wk-field', 'pq-wk-select', compact && 'pq-wk-select--compact', className]
        .filter(Boolean)
        .join(' ')}
      data-pq-focus="orange"
      label={label}
      error={errorMessage}
      disabled={isDisabled || undefined}
    >
      <select
        slot="input"
        aria-label={label ? undefined : ariaLabel}
        defaultValue={value}
        disabled={isDisabled}
      >
        {placeholder && !hasSelectedOption && (
          <option value="" disabled>{placeholder}</option>
        )}
        {options.map(o => (
          <option key={o.id} value={o.id}>{o.label}</option>
        ))}
      </select>
    </wk-select>
  )
}
