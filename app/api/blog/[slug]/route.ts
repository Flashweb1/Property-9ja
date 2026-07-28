import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single()

  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const post = {
    id: data.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    date: new Date(data.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    readTime: `${data.read_time} min`,
    image: data.image,
    author: data.author,
    tags: data.tags || [],
    category: data.category || "general",
    published: data.published,
    createdAt: data.created_at,
  }

  return NextResponse.json({ post })
}
