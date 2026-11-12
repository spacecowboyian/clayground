import { useEffect, useRef } from 'react'
import '@wakata/ds/text-field/define'
import '@wakata/ds/text-area/define'
import type { WkTextField } from '@wakata/ds/text-field'
import type { WkTextArea } from '@wakata/ds/text-area'
import './wakata-text-field.css'

type FocusColor = 'orange' | 'blue' | 'green' | 'purple'
type FieldSize = 'small' | 'medium' | 'large' | 'xlarge'

interface BaseFieldProps {
  label?: string
  description?: string
  errorMessage?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  isRequired?: boolean
  isDisabled?: boolean
  autoFocus?: boolean
  focusColor?: FocusColor
  className?: string
}

interface TextFieldProps extends BaseFieldProps {
  type?: 'text' | 'email' | 'password'
}

interface TextAreaProps extends BaseFieldProps {
  rows?: number
}

type FieldHost = (WkTextField | WkTextArea) & HTMLElement

/** Keeps the Lion-backed value and the React state in sync; wk-input fires only on user edits. */
function useFieldBridge(
  value: string | undefined,
  onChange: ((value: string) => void) | undefined,
  autoFocus: boolean | undefined,
) {
  const ref = useRef<FieldHost>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    const host = ref.current
    if (!host) return
    const handle = (event: Event) => {
      onChangeRef.current?.((event as CustomEvent<{ value: string }>).detail.value)
    }
    host.addEventListener('wk-input', handle)
    return () => host.removeEventListener('wk-input', handle)
  }, [])

  useEffect(() => {
    const host = ref.current
    if (host && value !== undefined && host.value !== value) host.value = value
  }, [value])

  useEffect(() => {
    if (!autoFocus) return
    const host = ref.current
    if (!host) return
    let cancelled = false
    void host.updateComplete.then(() => {
      if (!cancelled) host.focus()
    })
    return () => {
      cancelled = true
    }
  }, [autoFocus])

  return ref
}

export function TextField({
  label,
  description,
  errorMessage,
  placeholder,
  value,
  onChange,
  isRequired,
  isDisabled,
  autoFocus,
  focusColor = 'blue',
  type = 'text',
  className,
}: TextFieldProps) {
  const ref = useFieldBridge(value, onChange, autoFocus)
  return (
    <wk-text-field
      ref={ref as React.Ref<WkTextField>}
      class={['pq-wk-field', className].filter(Boolean).join(' ')}
      data-pq-focus={focusColor}
      type={type}
      label={label}
      help-text={description}
      error={errorMessage}
      placeholder={placeholder}
      required={isRequired || undefined}
      disabled={isDisabled || undefined}
    />
  )
}

export function TextArea({
  label,
  description,
  errorMessage,
  placeholder,
  value,
  onChange,
  isRequired,
  isDisabled,
  autoFocus,
  focusColor = 'blue',
  rows = 4,
  className,
}: TextAreaProps) {
  const ref = useFieldBridge(value, onChange, autoFocus)
  return (
    <wk-text-area
      ref={ref as React.Ref<WkTextArea>}
      class={['pq-wk-field', className].filter(Boolean).join(' ')}
      data-pq-focus={focusColor}
      label={label}
      help-text={description}
      error={errorMessage}
      placeholder={placeholder}
      rows={rows}
      required={isRequired || undefined}
      disabled={isDisabled || undefined}
    />
  )
}

interface SearchFieldProps {
  'aria-label': string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  focusColor?: FocusColor
  className?: string
  compact?: boolean
  size?: FieldSize
}

/** wk-text-field with a native type="search" input; the label is visually hidden but names the input. */
export function SearchField({
  'aria-label': ariaLabel,
  placeholder,
  value,
  onChange,
  focusColor = 'blue',
  className,
  compact = false,
  size = 'medium',
}: SearchFieldProps) {
  const ref = useFieldBridge(value, onChange, false)
  return (
    <wk-text-field
      ref={ref as React.Ref<WkTextField>}
      class={['pq-wk-field', 'pq-wk-search', compact && 'pq-wk-search--compact', className].filter(Boolean).join(' ')}
      data-pq-focus={focusColor}
      size={size}
      type="search"
      label={ariaLabel}
      placeholder={placeholder}
    />
  )
}
