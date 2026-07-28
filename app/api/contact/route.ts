import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json()

  const { error } = await supabaseAdmin.from("contact_messages").insert({
    name,
    email,
    message,
    created_at: new Date().toISOString(),
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
