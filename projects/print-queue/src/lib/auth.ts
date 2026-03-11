const SESSION_KEY = 'print_queue_authed'
const PASSWORD = import.meta.env.VITE_PRINT_QUEUE_PASSWORD || 'beeps'

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'yes'
}

export function login(password: string): boolean {
  if (password === PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, 'yes')
    return true
  }
  return false
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY)
}
