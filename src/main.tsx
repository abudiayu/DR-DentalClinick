/**
 * main.tsx — App entry point
 *
 * Rendering strategy:
 *
 *   phase 1 → show ONLY <LoadingScreen> (App is not mounted at all)
 *   phase 2 → fade out LoadingScreen, fade in <App>
 *   phase 3 → LoadingScreen is fully unmounted
 *
 * sessionStorage key "appLoaded" ensures the loading screen only runs
 * once per browser session.  Tab refreshes within the same session will
 * skip it and boot straight to the app.
 */

import { StrictMode, useState, useEffect, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './i18n'
import './index.css'
import App from './App.tsx'
import AppErrorBoundary from './components/AppErrorBoundary'
import LoadingScreen from './components/LoadingScreen'

// ── Theme initialisation (runs before React mounts) ─────────────────────────
try {
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light')
    document.documentElement.setAttribute('data-theme', 'light')
  }
} catch (_) { /* ignore */ }

// ── Minimum display time prevents a flash on fast connections ────────────────
const MIN_DISPLAY_MS = 1_200

// ── Session guard ────────────────────────────────────────────────────────────
// True  → first load this session  → show loading screen
// False → user already saw it      → skip straight to app
const isFirstLoad = !sessionStorage.getItem('appLoaded')

// ── Root component ───────────────────────────────────────────────────────────
function Root() {
  /**
   * appReady   – false = loading screen is the only thing rendered
   *              true  = app is rendered, loading screen fades out then unmounts
   * screenGone – true  = LoadingScreen has completed its fade-out and is unmounted
   */
  const [appReady,   setAppReady]   = useState(!isFirstLoad)
  const [screenGone, setScreenGone] = useState(!isFirstLoad)

  // Called once: runs async init and sets appReady
  useEffect(() => {
    if (!isFirstLoad) return   // already loaded this session — nothing to do

    const start = Date.now()

    async function init() {
      // ── Drop any async startup work here ──────────────────────────────────
      // Examples:
      //   await authApi.verifySession()
      //   await remoteConfig.fetch()
      // ─────────────────────────────────────────────────────────────────────

      // Honour minimum display time so the screen never flickers away
      const elapsed   = Date.now() - start
      const remaining = MIN_DISPLAY_MS - elapsed
      if (remaining > 0) {
        await new Promise<void>(res => setTimeout(res, remaining))
      }

      sessionStorage.setItem('appLoaded', '1')
      setAppReady(true)   // ← triggers LoadingScreen fade-out
    }

    init()
  }, [])

  // Called by LoadingScreen after its fade-out CSS transition ends
  const handleScreenDone = useCallback(() => setScreenGone(true), [])

  return (
    <>
      {/* ── Loading screen — rendered ONLY while appReady is false ──────────
          Once appReady flips true it fades out and then calls handleScreenDone,
          which sets screenGone=true and fully removes it from the DOM.      */}
      {!screenGone && (
        <LoadingScreen visible={!appReady} onDone={handleScreenDone} />
      )}

      {/* ── Main app — rendered only after appReady === true ────────────────
          We keep it out of the DOM entirely until loading is done so the
          user never sees a partial render behind the loading screen.        */}
      {appReady && (
        <BrowserRouter>
          <AppErrorBoundary>
            <App />
          </AppErrorBoundary>
        </BrowserRouter>
      )}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
