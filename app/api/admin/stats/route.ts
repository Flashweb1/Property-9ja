export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function GET() {
  const [propsCount, usersCount, pendingVerif] = await Promise.all([
    supabaseAdmin.from("properties").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("profiles").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("verification_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
  ])

  return NextResponse.json({
    totalProperties: propsCount.count || 0,
    totalUsers: usersCount.count || 0,
    pendingVerifications: pendingVerif.count || 0,
    totalViews: "1,234",
  })
}
