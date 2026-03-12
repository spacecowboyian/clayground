import { logout } from '../../lib/auth'

export type AppPage = 'dashboard' | 'inventory' | 'settings'

interface AppHeaderProps {
  currentPage: AppPage
  subtitle?: string
  onDashboard: () => void
  onInventory: () => void
  onSettings: () => void
  onLogout?: () => void
}

export function AppHeader({
  currentPage,
  subtitle,
  onDashboard,
  onInventory,
  onSettings,
  onLogout,
}: AppHeaderProps) {
  function handleLogout() {
    logout()
    onLogout?.()
  }

  const navItems: { id: AppPage; label: string; onPress: () => void }[] = [
    { id: 'dashboard', label: 'Orders',    onPress: onDashboard },
    { id: 'inventory', label: 'Inventory', onPress: onInventory },
    { id: 'settings',  label: 'Settings',  onPress: onSettings  },
  ]

  const pageSubtitles: Record<AppPage, string> = {
    dashboard: 'Print Queue',
    inventory: 'Inventory',
    settings:  'Farm Settings',
  }

  const displaySubtitle = subtitle ?? pageSubtitles[currentPage]

  return (
    <header className="border-b border-[var(--border)] bg-[var(--card)] sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <img src="./tinyprints-printer.svg" alt="Tiny Prints" className="w-9 h-9 object-contain" />
          <span className="font-bold text-[var(--foreground)] text-lg hidden sm:block">Tiny Prints</span>
          <span className="text-[var(--muted-foreground)] text-sm hidden sm:block">/ {displaySubtitle}</span>
        </div>

        {/* Primary nav — left-aligned next to logo */}
        <nav className="flex items-center gap-1">
          {navItems.map(({ id, label, onPress }) => {
            const isActive = currentPage === id
            return (
              <button
                key={id}
                onClick={onPress}
                aria-current={isActive ? 'page' : undefined}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[var(--accent-orange)] text-white'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]'
                }`}
              >
                {label}
              </button>
            )
          })}
        </nav>

        {/* Lock button — pushed to the right */}
        {onLogout && (
          <button
            onClick={handleLogout}
            className="ml-auto px-3 py-1.5 rounded-lg text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
          >
            Lock
          </button>
        )}
      </div>
    </header>
  )
}
