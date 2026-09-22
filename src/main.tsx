import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './i18n'
import './index.css'
import App from './App.tsx'

// Safety net: if localStorage has no explicit theme saved, force light.
// This clears any stale "dark" value left from OS preference detection.
try {
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light')
    document.documentElement.setAttribute('data-theme', 'light')
  }
} catch (_) { /* ignore */ }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
