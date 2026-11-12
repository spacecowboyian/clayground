import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './demo/demo.css'
import { Provider } from 'react-redux'
import { App } from './App'
import { store } from './store'
import { Button } from './components/WakataButton/WakataButton'

const demoBanner = (
    <div
      role="region"
      aria-label="Demo notice"
      className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 text-sm font-semibold bg-[var(--accent-orange)] text-[var(--background)]"
    >
      <span>DEMO DATA — fake orders, no password, no app data is sent to the backend.</span>
      <Button
        variant="outline"
        onPress={() => window.location.reload()}
        className="px-3 py-1 rounded bg-[var(--background)] text-[var(--foreground)]"
      >
        Reset demo
      </Button>
    </div>
)

document.body.classList.add('demo-mode')

if (!window.location.hash || window.location.hash === '#/') {
  window.location.hash = '#/orders'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {demoBanner}
      <App />
    </Provider>
  </StrictMode>,
)
