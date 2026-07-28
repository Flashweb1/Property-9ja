import { supabaseAdmin } from "../lib/supabaseAdmin"

async function check() {
  const { data: p, error: pe } = await supabaseAdmin.from("profiles").select("id, name, email, role")
  if (pe) { console.log("Error:", pe.message); return }
  console.log("Profiles:", JSON.stringify(p, null, 2))
  const { data: users } = await supabaseAdmin.auth.admin.listUsers()
  const filtered = users?.users.filter(u => u.email?.includes("@property9ja"))
  console.log("\nAuth users:", filtered?.map(u => ({ id: u.id, email: u.email })))
}
check()
