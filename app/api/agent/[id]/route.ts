import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!profile) return NextResponse.json({ error: "Agent not found" }, { status: 404 })

  const { data: reviews } = await supabaseAdmin
    .from("reviews")
    .select("*")
    .eq("agent_id", params.id)
    .order("created_at", { ascending: false })

  const { count: listingsCount } = await supabaseAdmin
    .from("properties")
    .select("*", { count: "exact", head: true })
    .eq("agent_id", params.id)

  const agent = {
    id: profile.id,
    name: profile.name || "",
    email: profile.email || "",
    phone: profile.phone || "",
    avatar: profile.avatar_url || "",
    agency: profile.agency || undefined,
    verificationStatus: profile.verification_status || "unverified",
    trustScore: Math.round((Number(profile.trust_score) || 0) * 20),
    responseTime: profile.response_time || "Within 24 hours",
    memberSince: profile.member_since
      ? new Date(profile.member_since).toLocaleDateString("en-US", { month: "long", year: "numeric" })
      : new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    listingsCount: listingsCount || profile.listings_count || 0,
    propertiesSold: profile.properties_sold || 0,
    bio: profile.bio || "",
    reviews: (reviews || []).map((r: any) => ({
      id: r.id,
      userName: r.user_name || "Anonymous",
      avatar: r.user_avatar || "",
      rating: r.rating || 0,
      comment: r.comment || "",
      date: r.created_at ? new Date(r.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "",
      propertyTitle: r.property_title || "",
    })),
  }

  return NextResponse.json({ agent })
}
