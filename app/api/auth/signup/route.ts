import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const { email, password, options } = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    const { data, error } = await supabase.auth.signUp({ email, password, options })

    if (error) {
      console.error("[signup] Supabase error:", JSON.stringify({ message: error.message, status: error.status, code: error.code, name: error.name }, null, 2))
      return NextResponse.json({ error: error.message, code: error.code, status: error.status }, { status: 400 })
    }

    console.log("[signup] Success:", data.user?.id)
    return NextResponse.json(data)
  } catch (err) {
    console.error("[signup] Unhandled exception:", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 },
    )
  }
}
