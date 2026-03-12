import { useEffect, useState } from 'react'
import { isAuthenticated } from './lib/auth'
import { LoginPage } from './pages/LoginPage'
import { PrintQueuePage } from './pages/PrintQueuePage'
import { DashboardPage } from './pages/DashboardPage'
import { OrderDetailPage } from './pages/OrderDetailPage'
import { ModelsPage } from './pages/ModelsPage'
import { FilamentsPage } from './pages/FilamentsPage'
import { FarmSettingsPage } from './pages/FarmSettingsPage'

type Route =
  | { page: 'login' }
  | { page: 'print-queue' }
  | { page: 'orders' }
  | { page: 'order'; id: string }
  | { page: 'models' }
  | { page: 'filaments' }
  | { page: 'settings' }

function parseHash(hash: string): Route {
  const path = hash.replace(/^#\/?/, '')
  if (path.startsWith('order/')) {
    const id = path.slice('order/'.length)
    return { page: 'order', id }
  }
  if (path === 'print-queue') return { page: 'print-queue' }
  if (path === 'orders')      return { page: 'orders' }
  if (path === 'models')      return { page: 'models' }
  if (path === 'filaments')   return { page: 'filaments' }
  if (path === 'settings')    return { page: 'settings' }
  // Legacy route compat
  if (path === 'dashboard')   return { page: 'orders' }
  if (path === 'inventory')   return { page: 'models' }
  return { page: 'login' }
}

function navigate(hash: string) {
  window.location.hash = hash
}

const NAV = {
  onPrintQueue: () => navigate('#/print-queue'),
  onOrders:     () => navigate('#/orders'),
  onModels:     () => navigate('#/models'),
  onFilaments:  () => navigate('#/filaments'),
  onSettings:   () => navigate('#/settings'),
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

  // Auto-redirect: if hitting the root and already authenticated, go to print queue
  useEffect(() => {
    if (route.page === 'login' && isAuthenticated()) {
      navigate('#/print-queue')
    }
  }, [route])

  if (route.page === 'order') {
    return (
      <OrderDetailPage
        orderId={route.id}
        onBack={() => navigate(isAuthenticated() ? '#/orders' : '#/')}
      />
    )
  }

  function requireAuth() {
    if (!isAuthenticated()) {
      navigate('#/')
      return false
    }
    return true
  }

  if (route.page === 'print-queue') {
    if (!requireAuth()) return null
    return <PrintQueuePage {...NAV} onLogout={() => navigate('#/')} />
  }

  if (route.page === 'orders') {
    if (!requireAuth()) return null
    return (
      <DashboardPage
        onLogout={() => navigate('#/')}
        onViewOrder={id => navigate(`#/order/${id}`)}
        {...NAV}
      />
    )
  }

  if (route.page === 'models') {
    if (!requireAuth()) return null
    return <ModelsPage {...NAV} onLogout={() => navigate('#/')} />
  }

  if (route.page === 'filaments') {
    if (!requireAuth()) return null
    return <FilamentsPage {...NAV} onLogout={() => navigate('#/')} />
  }

  if (route.page === 'settings') {
    if (!requireAuth()) return null
    return <FarmSettingsPage {...NAV} onLogout={() => navigate('#/')} />
  }

  // login
  return (
    <LoginPage onSuccess={() => navigate('#/print-queue')} />
  )
}
