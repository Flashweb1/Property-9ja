import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabaseAdmin
    .from("properties")
    .select("*")
    .eq("slug", params.id)
    .single()

  if (error || !data) {
    const { data: byId } = await supabaseAdmin
      .from("properties")
      .select("*")
      .eq("id", params.id)
      .single()
    if (!byId) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }
    return NextResponse.json({ property: byId })
  }

  return NextResponse.json({ property: data })
}
