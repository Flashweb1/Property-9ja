import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabaseServer"

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { requestType, notes } = await request.json()

  const { data, error } = await supabase
    .from("verification_requests")
    .insert({
      user_id: user.id,
      request_type: requestType,
      status: "pending",
      admin_notes: notes || "",
      submitted_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ verification: data }, { status: 201 })
}
