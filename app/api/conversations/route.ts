import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabaseServer"

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .or(`buyer_id.eq.${user.id},agent_id.eq.${user.id}`)
    .order("last_message_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ conversations: data })
}

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { propertyId, agentId, message } = await request.json()

  const { data: existing } = await supabase
    .from("conversations")
    .select("id")
    .eq("property_id", propertyId)
    .eq("buyer_id", user.id)
    .single()

  if (existing) {
    if (message) {
      await supabase.from("messages").insert({
        conversation_id: existing.id,
        sender_id: user.id,
        content: message,
      })
    }
    return NextResponse.json({ conversationId: existing.id })
  }

  const { data: prop } = await supabase
    .from("properties")
    .select("title, images")
    .eq("id", propertyId)
    .single()

  const { data: conv, error } = await supabase
    .from("conversations")
    .insert({
      property_id: propertyId,
      property_title: prop?.title || "",
      property_image: prop?.images?.[0] || "",
      buyer_id: user.id,
      agent_id: agentId,
    })
    .select("id")
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (message) {
    await supabase.from("messages").insert({
      conversation_id: conv.id,
      sender_id: user.id,
      content: message,
    })
  }

  return NextResponse.json({ conversationId: conv.id })
}
