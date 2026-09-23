// src/App.tsx
// React.lazy on admin pages means they are split into separate chunks.
// Auth.tsx triggers the preload while the user types, so by the time they
// authenticate the chunk is already in the browser cache.

import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HomeContent from './components/sections/HomeContent'
import Booking from './pages/Booking/Booking'
import Queue from './pages/Queue/Queue'
import Auth from './pages/AdminPages/Auth/Auth'
import { Error } from './Error/Error'
import ProtectedRoute from './routes/ProtectedRoute'

// Lazily loaded so each role's page is its own JS chunk.
// Auth.tsx imports these same dynamic imports to preload them while the user types.
const Manager = lazy(() => import('./pages/AdminPages/Manager/Manager'))
const Nerse   = lazy(() => import('./pages/AdminPages/NersePage/Nerse'))
const Card    = lazy(() => import('./pages/AdminPages/Card/Card'))

// Minimal fallback — shown only if the chunk hasn't loaded yet (should be
// invisible after the first keystroke triggers the preload)
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <span className="w-6 h-6 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function Home() {
  return (
    <main className="min-h-screen bg-[#f0f0f0]">
      <Hero />
      <HomeContent />
    </main>
  )
}

const HIDE_NAV = ['/auth', '/manager', '/card', '/nerse']

export default function App() {
  const { pathname } = useLocation()
  const showNav = !HIDE_NAV.includes(pathname.toLowerCase())

  return (
    <>
      {showNav && <Navbar />}
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/queue"   element={<Queue />} />
        <Route path="/auth"    element={<Auth />} />

        {/* Manager only */}
        <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
          <Route
            path="/manager"
            element={<Suspense fallback={<PageLoader />}><Manager /></Suspense>}
          />
        </Route>

        {/* Nurse + Manager */}
        <Route element={<ProtectedRoute allowedRoles={['nurse', 'manager']} />}>
          <Route
            path="/Nerse"
            element={<Suspense fallback={<PageLoader />}><Nerse /></Suspense>}
          />
          <Route
            path="/card"
            element={<Suspense fallback={<PageLoader />}><Card /></Suspense>}
          />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  )
}
