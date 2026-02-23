export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, margin: '4rem auto', padding: '0 1rem' }}>
      <h1>🧪 Template Vite Project</h1>
      <p style={{ color: '#666', marginTop: '.5rem' }}>
        This is your starting point. Edit <code>src/App.tsx</code> to begin experimenting!
      </p>
      <ul style={{ marginTop: '1.5rem', lineHeight: 2 }}>
        <li>Run <code>npm run dev</code> to develop locally</li>
        <li>Run <code>npm run build</code> to export a static build to <code>docs/template/</code></li>
        <li>Push to <code>main</code> to deploy via GitHub Actions</li>
      </ul>
      <p style={{ marginTop: '2rem' }}>
        <a href="/clayground/" style={{ color: '#6c63ff' }}>← Back to Clayground</a>
      </p>
    </main>
  )
}
