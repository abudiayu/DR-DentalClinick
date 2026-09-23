// src/lib/supabase.ts
// Supabase browser client — uses the ANON key only (safe to ship in frontend).
// The service-role key NEVER appears here; it lives in dental-backend only.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  as string
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnon) {
  throw new Error(
    '❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in your .env file.\n' +
    '   Copy dental/.env.example → dental/.env and fill in the values from\n' +
    '   Supabase Dashboard → Project Settings → API.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: {
    // Keep session in localStorage so the user stays logged in on page refresh.
    persistSession: true,
    autoRefreshToken: true,
    // Detect the OAuth callback on the /auth page if you add OAuth later.
    detectSessionInUrl: true,
  },
})
