import { logout } from '../../lib/auth'

export type AppPage = 'print-queue' | 'orders' | 'models' | 'filaments' | 'settings'

interface AppHeaderProps {
  currentPage: AppPage
  onPrintQueue: () => void
  onOrders: () => void
  onModels: () => void
  onFilaments: () => void
  onSettings: () => void
  onLogout?: () => void
}

export function AppHeader({
  currentPage,
  onPrintQueue,
  onOrders,
  onModels,
  onFilaments,
  onSettings,
  onLogout,
}: AppHeaderProps) {
  function handleLogout() {
    logout()
    onLogout?.()
  }

  const navItems: { id: AppPage; label: string; onPress: () => void }[] = [
    { id: 'print-queue', label: 'Print Queue', onPress: onPrintQueue },
    { id: 'orders',      label: 'Orders',      onPress: onOrders     },
    { id: 'models',      label: 'Models',      onPress: onModels     },
    { id: 'filaments',   label: 'Filaments',   onPress: onFilaments  },
    { id: 'settings',    label: 'Settings',    onPress: onSettings   },
  ]

  return (
    <header className="border-b border-[var(--border)] bg-[var(--card)] sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <img src="./tinyprints-printer.svg" alt="Tiny Prints" className="w-9 h-9 object-contain" />
          <span className="font-bold text-[var(--foreground)] text-lg hidden sm:block">Tiny Prints</span>
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
