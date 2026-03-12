import { useEffect, useState } from 'react'
import { isAuthenticated } from './lib/auth'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { OrderDetailPage } from './pages/OrderDetailPage'
import { InventoryPage } from './pages/InventoryPage'
import { FarmSettingsPage } from './pages/FarmSettingsPage'

type Route =
  | { page: 'login' }
  | { page: 'dashboard' }
  | { page: 'order'; id: string }
  | { page: 'inventory' }
  | { page: 'settings' }

function parseHash(hash: string): Route {
  const path = hash.replace(/^#\/?/, '')
  if (path.startsWith('order/')) {
    const id = path.slice('order/'.length)
    return { page: 'order', id }
  }
  if (path === 'dashboard') return { page: 'dashboard' }
  if (path === 'inventory') return { page: 'inventory' }
  if (path === 'settings')  return { page: 'settings' }
  return { page: 'login' }
}

function navigate(hash: string) {
  window.location.hash = hash
}

export function App() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))

  useEffect(() => {
    function onHashChange() {
      setRoute(parseHash(window.location.hash))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Auto-redirect: if hitting the root and already authenticated, go to dashboard
  useEffect(() => {
    if (route.page === 'login' && isAuthenticated()) {
      navigate('#/dashboard')
    }
  }, [route])

  if (route.page === 'order') {
    return (
      <OrderDetailPage
        orderId={route.id}
        onBack={() => navigate(isAuthenticated() ? '#/dashboard' : '#/')}
      />
    )
  }

  if (route.page === 'inventory') {
    if (!isAuthenticated()) {
      navigate('#/')
      return null
    }
    return (
      <InventoryPage
        onBack={() => navigate('#/dashboard')}
        onDashboard={() => navigate('#/dashboard')}
        onSettings={() => navigate('#/settings')}
      />
    )
  }

  if (route.page === 'settings') {
    if (!isAuthenticated()) {
      navigate('#/')
      return null
    }
    return (
      <FarmSettingsPage
        onBack={() => navigate('#/settings')}
        onDashboard={() => navigate('#/dashboard')}
        onInventory={() => navigate('#/inventory')}
      />
    )
  }

  if (route.page === 'dashboard') {
    if (!isAuthenticated()) {
      navigate('#/')
      return null
    }
    return (
      <DashboardPage
        onLogout={() => navigate('#/')}
        onViewOrder={id => navigate(`#/order/${id}`)}
        onInventory={() => navigate('#/inventory')}
        onSettings={() => navigate('#/settings')}
        onDashboard={() => navigate('#/dashboard')}
      />
    )
  }

  // login
  return (
    <LoginPage onSuccess={() => navigate('#/dashboard')} />
  )
}
