import { NextRequest, NextResponse } from "next/server"
import { askAI } from "@/lib/openrouter"

const SYSTEM_PROMPT = `You are a property search assistant for Property 9ja (a Nigerian property marketplace).
Extract structured search filters from the user's natural language query.

Respond with ONLY a valid JSON object (no markdown, no explanation).
Use these exact keys: q, location, city, type, minPrice, maxPrice, bedrooms, bathrooms, verifiedOnly.

Rules:
- city: one of Lagos, Abuja, Port Harcourt, Ibadan, Enugu (capitalize)
- type: one of flat, duplex, self-contain, bungalow, commercial
- price in Naira (₦). "under" → maxPrice, "above" → minPrice
- numbers like "2-bedroom" → bedrooms: 2
- verifiedOnly: true only if user explicitly asks for verified/trusted
- q: leave as "" if all info is captured in other fields
- If user mentions a neighborhood, put it in location field

Example input: "3-bedroom flat in Yaba under 2 million naira"
Example output: {"q":"","location":"Yaba","city":"Lagos","type":"flat","minPrice":null,"maxPrice":2000000,"bedrooms":3,"bathrooms":null,"verifiedOnly":false}

Example input: "show me verified duplexes in Abuja"
Example output: {"q":"","location":"","city":"Abuja","type":"duplex","minPrice":null,"maxPrice":null,"bedrooms":null,"bathrooms":null,"verifiedOnly":true}

Example input: "properties with pool in Lekki"
Example output: {"q":"pool","location":"Lekki","city":"Lagos","type":"","minPrice":null,"maxPrice":null,"bedrooms":null,"bathrooms":null,"verifiedOnly":false}`

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()
    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Missing query" }, { status: 400 })
    }

    const raw = await askAI(SYSTEM_PROMPT, query)
    const trimmed = raw.replace(/```(?:json)?\s*/gi, "").trim()
    const filters = JSON.parse(trimmed)

    return NextResponse.json({ filters })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
