// src/routes/ProtectedRoute.tsx
// Guards protected routes using the live Supabase session.
// Role is read from user_metadata (set by the backend at registration) — never
// from a client-supplied value, so the UI can't escalate privileges.

import { useState, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Role } from '../lib/auth'

type Props = {
  allowedRoles: Role[]
}

type State = 'loading' | 'ok' | 'no-session' | 'wrong-role'

export default function ProtectedRoute({ allowedRoles }: Props) {
  const location = useLocation()
  const [state, setState] = useState<State>('loading')

  useEffect(() => {
    let cancelled = false

    async function check() {
      // getSession() reads from localStorage — synchronous in practice,
      // but the API is async to handle the refresh-token flow correctly.
      const { data } = await supabase.auth.getSession()
      if (cancelled) return

      const session = data.session
      if (!session) {
        setState('no-session')
        return
      }

      const role = session.user.user_metadata?.role as Role | undefined
      if (!role || !allowedRoles.includes(role)) {
        setState('wrong-role')
        return
      }

      setState('ok')
    }

    check()

    // Also re-check whenever the auth state changes (logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return
      if (!session) {
        setState('no-session')
        return
      }
      const role = session.user.user_metadata?.role as Role | undefined
      setState(!role || !allowedRoles.includes(role) ? 'wrong-role' : 'ok')
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedRoles.join(',')])

  if (state === 'loading') {
    // Tiny spinner — avoids flash of wrong page
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <span className="w-6 h-6 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (state === 'no-session') {
    return <Navigate to="/auth" replace state={{ from: location }} />
  }

  if (state === 'wrong-role') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
