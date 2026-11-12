import { useCallback, useEffect, useRef } from 'react'
import '@wakata/ds/number-field/define'
import type { WkNumberField } from '@wakata/ds/number-field'
import { Button } from '../WakataButton/WakataButton'
import '../WakataTextField/wakata-text-field.css'
import './wakata-number-field.css'

interface NumberFieldProps {
  label: string
  value: number
  onChange: (value: number) => void
  minValue?: number
  maxValue?: number
  step?: number
  formatOptions?: Intl.NumberFormatOptions
  isDisabled?: boolean
  className?: string
}

function clamp(n: number, min?: number, max?: number) {
  let v = n
  if (min !== undefined) v = Math.max(min, v)
  if (max !== undefined) v = Math.min(max, v)
  return v
}

/** Thin bridge over wk-number-field (native number input) plus app-local stepper buttons. Currency is a display-only preview in Wakata. */
export function NumberField({
  label,
  value,
  onChange,
  minValue,
  maxValue,
  step = 1,
  formatOptions,
  isDisabled = false,
  className,
}: NumberFieldProps) {
  const ref = useRef<WkNumberField>(null)
  const currency = formatOptions?.style === 'currency' ? String(formatOptions.currency ?? '') : ''
  const fractionDigits = formatOptions?.maximumFractionDigits ?? (currency ? 2 : 0)
  const allowsDecimals = fractionDigits > 0
  // A integer step on a decimal field would flag valid decimals as step mismatches.
  const nativeStep = allowsDecimals && Number.isInteger(step) ? 'any' : String(step)
  const normalize = useCallback((n: number) => clamp(
    Math.round(n * 10 ** fractionDigits) / 10 ** fractionDigits,
    minValue,
    maxValue,
  ), [fractionDigits, minValue, maxValue])

  const latest = useRef({ onChange, value, normalize })
  latest.current = { onChange, value, normalize }

  // Follow external value changes unless the user is editing.
  useEffect(() => {
    const host = ref.current
    if (!host || host.contains(document.activeElement)) return
    if (host.valueAsNumber !== value) host.value = String(value)
  }, [value])

  useEffect(() => {
    const host = ref.current
    if (!host) return
    const onInput = () => {
      const n = host.valueAsNumber
      if (Number.isFinite(n)) latest.current.onChange(clamp(n, minValue, maxValue))
    }
    const onFocusOut = () => {
      const c = latest.current
      const n = host.valueAsNumber
      const next = Number.isFinite(n) ? c.normalize(n) : c.value
      if (next !== c.value) c.onChange(next)
      host.value = String(next)
    }
    host.addEventListener('wk-input', onInput)
    host.addEventListener('focusout', onFocusOut)
    return () => {
      host.removeEventListener('wk-input', onInput)
      host.removeEventListener('focusout', onFocusOut)
    }
  }, [minValue, maxValue])

  const bump = (dir: 1 | -1) => {
    const next = normalize(value + dir * step)
    onChange(next)
    if (ref.current) ref.current.value = String(next)
  }
  const atMin = minValue !== undefined && value <= minValue
  const atMax = maxValue !== undefined && value >= maxValue

  return (
    <div className={['pq-wk-number-field', className].filter(Boolean).join(' ')}>
      <wk-number-field
        ref={ref}
        class="pq-wk-field pq-wk-number-field__input"
        data-pq-focus="orange"
        label={label}
        min={minValue !== undefined ? String(minValue) : undefined}
        max={maxValue !== undefined ? String(maxValue) : undefined}
        step={nativeStep}
        currency={currency || undefined}
        disabled={isDisabled || undefined}
      />
      <div className="pq-wk-number-field__stepper" role="group" aria-label={`${label} stepper`}>
        <Button className="pq-wk-number-field__step" variant="secondary" isDisabled={isDisabled || atMax} onPress={() => bump(1)}>
          <span aria-hidden="true">+</span>
          <span className="sr-only">Increase {label}</span>
        </Button>
        <Button className="pq-wk-number-field__step" variant="secondary" isDisabled={isDisabled || atMin} onPress={() => bump(-1)}>
          <span aria-hidden="true">−</span>
          <span className="sr-only">Decrease {label}</span>
        </Button>
      </div>
    </div>
  )
}
