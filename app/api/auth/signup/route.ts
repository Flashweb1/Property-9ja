import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email, password, options } = await req.json()

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/signup`,
      {
        method: "POST",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          data: options?.data || {},
          gotrue_meta_security: {},
        }),
      },
    )

    const body = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { error: body.msg || body.error_description || body.error || `Signup failed (${res.status})` },
        { status: res.status },
      )
    }

    return NextResponse.json(body)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 },
    )
  }
}
