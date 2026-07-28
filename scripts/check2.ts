import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
const s = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })

async function check() {
  const { data: p, error: pe } = await s.from("profiles").select("id, name, email, role")
  if (pe) { console.log("Error:", pe.message); return }
  console.log("Profiles:", JSON.stringify(p, null, 2))
  console.log("Profile count:", p?.length || 0)
}
check()
