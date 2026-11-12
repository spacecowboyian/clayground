import { useEffect, useRef } from 'react'
import '@wakata/ds/switch/define'
import type { WkSwitch } from '@wakata/ds/switch'
import './wakata-switch.css'

interface SwitchProps {
  isSelected: boolean
  onChange: (isSelected: boolean) => void
  color?: 'orange' | 'blue' | 'green' | 'purple'
  isDisabled?: boolean
  children?: string
  className?: string
}

/** Keeps the Lion-backed checked state in sync with React; wk-change fires only on user activation. */
export function Switch({
  isSelected,
  onChange,
  color = 'blue',
  isDisabled,
  children,
  className,
}: SwitchProps) {
  const ref = useRef<WkSwitch>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    const host = ref.current
    if (!host) return
    const handle = (event: Event) => {
      onChangeRef.current((event as CustomEvent<{ checked: boolean }>).detail.checked)
    }
    host.addEventListener('wk-change', handle)
    return () => host.removeEventListener('wk-change', handle)
  }, [])

  useEffect(() => {
    const host = ref.current
    if (host && host.checked !== isSelected) host.checked = isSelected
  }, [isSelected])

  return (
    <wk-switch
      ref={ref}
      class={['pq-wk-switch', className].filter(Boolean).join(' ')}
      data-pq-color={color}
      label={children}
      disabled={isDisabled || undefined}
    />
  )
}
