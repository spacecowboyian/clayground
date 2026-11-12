import { Button } from '../WakataButton/WakataButton'
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
    { id: 'orders',      label: 'Orders',      onPress: onOrders     },
    { id: 'print-queue', label: 'Queue',       onPress: onPrintQueue },
    { id: 'models',      label: 'Models',      onPress: onModels     },
    { id: 'filaments',   label: 'Filaments',   onPress: onFilaments  },
    { id: 'settings',    label: 'Settings',    onPress: onSettings   },
  ]

  return (
    <header className="border-b border-[var(--border)] bg-[var(--card)] sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 min-h-14 py-2 sm:py-0 flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <img src="./tinyprints-printer.svg" alt="Tiny Prints" className="w-9 h-9 object-contain" />
          <span className="font-bold text-[var(--foreground)] text-lg hidden sm:block">Tiny Prints</span>
        </div>

        {/* Primary nav — left-aligned next to logo */}
        <nav className="order-2 sm:order-none w-full sm:w-auto flex flex-wrap sm:flex-nowrap items-center gap-1">
          {navItems.map(({ id, label, onPress }) => {
            const isActive = currentPage === id
            return (
              <Button
                key={id}
                variant={isActive ? 'primary' : 'ghost'}
                onPress={onPress}
                isCurrent={isActive}
              >
                {label}
              </Button>
            )
          })}
        </nav>

        {/* Lock button — pushed to the right */}
        {onLogout && (
          <Button variant="ghost" onPress={handleLogout} className="ml-auto">
            Lock
          </Button>
        )}
      </div>
    </header>
  )
}
