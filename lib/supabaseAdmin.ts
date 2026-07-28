import { createClient, SupabaseClient } from "@supabase/supabase-js"

function getClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase admin env vars")
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

type AdminClient = SupabaseClient<any, "public", any>
let _cached: AdminClient | null = null
function client() {
  if (!_cached) _cached = getClient() as AdminClient
  return _cached
}

export const supabaseAdmin = new Proxy({} as AdminClient, {
  get(_, prop) {
    const c = client()
    const v = c[prop as keyof AdminClient]
    return typeof v === "function" ? v.bind(c) : v
  },
})
