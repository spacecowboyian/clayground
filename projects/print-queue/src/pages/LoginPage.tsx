import { useState } from 'react'
import { Button, TextField } from '@gearhead/ui'
import { login } from '../lib/auth'

interface LoginPageProps {
  onSuccess: () => void
}

export function LoginPage({ onSuccess }: LoginPageProps) {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(false)

  function handleLogin() {
    if (login(password)) {
      onSuccess()
    } else {
      setError(true)
      setPassword('')
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <img
            src="./tinyprints-logo.svg"
            alt="Tiny Prints logo"
            className="w-32 h-auto"
          />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Print Queue</h1>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">Enter the password to manage orders</p>
          </div>
        </div>

        {/* Login card */}
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 space-y-4">
          <div onKeyDown={handleKey}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(val: string) => { setPassword(val); setError(false) }}
              placeholder="••••••••"
              focusColor="orange"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-sm text-[var(--destructive)]">Incorrect password. Try again.</p>
          )}
          <Button
            variant="primary"
            color="orange"
            className="w-full justify-center"
            onPress={handleLogin}
          >
            Unlock Dashboard
          </Button>
        </div>

        <p className="text-center text-xs text-[var(--muted-foreground)]">
          Need to view a specific order?{' '}
          <span className="text-[var(--accent-orange)]">Use the order link you were given.</span>
        </p>
      </div>
    </div>
  )
}
