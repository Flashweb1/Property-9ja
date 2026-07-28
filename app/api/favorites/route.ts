import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabaseServer"

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data, error } = await supabase
    .from("saved_properties")
    .select("property_id")
    .eq("user_id", user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ favorites: data.map((d) => d.property_id) })
}

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { propertyId } = await request.json()
  if (!propertyId) return NextResponse.json({ error: "propertyId required" }, { status: 400 })

  const { data: existing } = await supabase
    .from("saved_properties")
    .select()
    .eq("user_id", user.id)
    .eq("property_id", propertyId)
    .single()

  if (existing) {
    await supabase.from("saved_properties").delete().eq("user_id", user.id).eq("property_id", propertyId)
    return NextResponse.json({ favorited: false })
  }

  await supabase.from("saved_properties").insert({ user_id: user.id, property_id: propertyId })
  return NextResponse.json({ favorited: true })
}
