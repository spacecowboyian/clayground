// Demo build: no password gate, no session storage.
export function isAuthenticated(): boolean {
  return true
}

export function login(): boolean {
  return true
}

export function logout(): void {
  // no-op in the demo
}
