import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q") || ""
  const city = searchParams.get("city") || ""
  const type = searchParams.get("type") || ""
  const minPrice = searchParams.get("minPrice") || ""
  const maxPrice = searchParams.get("maxPrice") || ""
  const bedrooms = searchParams.get("bedrooms") || ""
  const bathrooms = searchParams.get("bathrooms") || ""
  const verifiedOnly = searchParams.get("verifiedOnly") || ""
  const sort = searchParams.get("sort") || "newest"
  const limit = parseInt(searchParams.get("limit") || "50")
  const page = parseInt(searchParams.get("page") || "1")

  let query = supabaseAdmin.from("properties").select("*", { count: "exact" })

  if (q) {
    query = query.textSearch("search_vector", q, { config: "english" })
  }
  if (city) {
    query = query.eq("city", city)
  }
  if (type) {
    query = query.eq("type", type)
  }
  if (minPrice) {
    query = query.gte("price", parseFloat(minPrice))
  }
  if (maxPrice) {
    query = query.lte("price", parseFloat(maxPrice))
  }
  if (bedrooms) {
    query = query.gte("bedrooms", parseInt(bedrooms))
  }
  if (bathrooms) {
    query = query.gte("bathrooms", parseInt(bathrooms))
  }
  if (verifiedOnly === "true") {
    query = query.eq("verification_status", "verified")
  }

  switch (sort) {
    case "price_asc": query = query.order("price", { ascending: true }); break
    case "price_desc": query = query.order("price", { ascending: false }); break
    case "trust": query = query.order("trust_score", { ascending: false }); break
    default: query = query.order("created_at", { ascending: false })
  }

  const from = (page - 1) * limit
  const to = from + limit - 1
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ properties: data, total: count, page, limit })
}
