import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const users = data.map((u: any) => ({
    id: u.id,
    name: u.full_name || u.name || "",
    email: u.email || "",
    phone: u.phone || "",
    avatar: u.avatar_url || u.avatar || "",
    role: u.role || "renter",
    verificationStatus: u.verification_status || "unverified",
    trustScore: u.trust_score || 0,
  }))

  return NextResponse.json({ users })
}
