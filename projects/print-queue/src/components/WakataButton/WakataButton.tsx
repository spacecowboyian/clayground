import { useEffect, useRef, type ReactNode } from 'react'
import '@wakata/ds/button/define'
import type { WkButton } from '@wakata/ds/button'
import './wakata-button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
export type ButtonColor = 'orange' | 'blue' | 'green' | 'purple' | 'red'
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge'

interface WakataButtonProps {
  variant?: ButtonVariant
  color?: ButtonColor
  onPress?: () => void
  isDisabled?: boolean
  appearance?: 'plain' | 'icon' | 'filter'
  isCurrent?: boolean
  size?: ButtonSize
  'aria-label'?: string
  title?: string
  className?: string
  children?: ReactNode
}

const WK_VARIANT: Record<ButtonVariant, 'primary' | 'secondary' | 'tertiary'> = {
  primary: 'primary',
  secondary: 'secondary',
  outline: 'secondary',
  ghost: 'secondary',
  destructive: 'primary',
}

/** React bridge: one native click on <wk-button> maps to exactly one onPress call. */
export function Button({
  variant = 'primary',
  color = 'orange',
  onPress,
  isDisabled = false,
  appearance,
  isCurrent,
  size = 'small',
  'aria-label': ariaLabel,
  title,
  className,
  children,
}: WakataButtonProps) {
  const ref = useRef<WkButton>(null)
  const onPressRef = useRef(onPress)
  const disabledRef = useRef(isDisabled)
  onPressRef.current = onPress
  disabledRef.current = isDisabled

  useEffect(() => {
    const host = ref.current
    if (!host) return
    const handle = () => {
      if (!disabledRef.current) onPressRef.current?.()
    }
    host.addEventListener('click', handle)
    return () => host.removeEventListener('click', handle)
  }, [])

  return (
    <wk-button
      ref={ref}
      class={['pq-wk-button', className].filter(Boolean).join(' ')}
      variant={WK_VARIANT[variant]}
      intent={variant === 'destructive' ? 'danger' : undefined}
      size={size}
      disabled={isDisabled || undefined}
      aria-label={ariaLabel}
      aria-current={isCurrent ? 'page' : undefined}
      title={title}
      data-pq-appearance={appearance}
      data-pq-variant={variant}
      data-pq-color={color}
    >
      {children}
    </wk-button>
  )
}
