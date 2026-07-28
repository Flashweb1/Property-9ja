import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("verification_requests")
    .select("*")
    .order("submitted_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const verifications = data.map((v: any) => ({
    id: v.id,
    type: v.request_type || "identity",
    status: v.status,
    submittedAt: v.submitted_at,
    reviewedAt: v.reviewed_at,
    notes: v.admin_notes || "",
    documents: v.documents || [],
  }))

  return NextResponse.json({ verifications })
}
