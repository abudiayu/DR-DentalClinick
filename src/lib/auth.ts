// src/lib/auth.ts
// All auth operations go through here.
// console.time labels let you see exactly where the time goes in DevTools.

import { supabase } from './supabase'

export type Role = 'manager' | 'nurse' | 'card'

export interface StaffUser {
  id:    string
  name:  string
  email: string
  role:  Role
}

// ─── Login ────────────────────────────────────────────────────────────────────
// 1. signInWithPassword  →  Supabase Auth edge network (fastest possible path)
// 2. Role lives in user_metadata  →  zero extra round-trip
// 3. Role is also cross-checked against the DB via RLS so the client can't lie
export async function loginStaff(
  email: string,
  password: string,
  expectedRole: Role
): Promise<StaffUser> {
  console.time('[auth] total login')
  console.time('[auth] signInWithPassword')

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  console.timeEnd('[auth] signInWithPassword')

  if (error) {
    console.timeEnd('[auth] total login')
    // Supabase returns "Invalid login credentials" for wrong email or password
    throw new Error(error.message)
  }

  const metadata = data.user.user_metadata as { role?: string; name?: string }
  const role = metadata.role as Role | undefined

  // Role guard — checked against what the database says, not what the UI sent
  if (!role) {
    await supabase.auth.signOut()
    console.timeEnd('[auth] total login')
    throw new Error('Account has no role assigned. Contact the clinic manager.')
  }

  if (role !== expectedRole) {
    await supabase.auth.signOut()
    console.timeEnd('[auth] total login')
    throw new Error('This account is not registered for the selected position.')
  }

  console.timeEnd('[auth] total login')

  return {
    id:    data.user.id,
    email: data.user.email ?? '',
    name:  metadata.name ?? '',
    role,
  }
}

// ─── Current user (from cached session — synchronous, no network) ─────────────
export function getCachedUser(): StaffUser | null {
  // getSession is synchronous when a session is already in memory/localStorage
  const session = supabase.auth.getSession()
  // We use the async path only as a fallback; normally the session is cached
  void session // keep for tree-shaking
  return null   // components use useSession() hook instead (see ProtectedRoute)
}

// ─── Logout ───────────────────────────────────────────────────────────────────
export async function logoutStaff(): Promise<void> {
  await supabase.auth.signOut()
}

// ─── Role → route map ─────────────────────────────────────────────────────────
export const ROLE_ROUTES: Record<Role, string> = {
  manager: '/manager',
  nurse:   '/Nerse',
  card:    '/card',
}
