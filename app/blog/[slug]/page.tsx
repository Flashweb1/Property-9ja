import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { BlogPost } from "@/types"

async function getPost(slug: string): Promise<BlogPost | null> {
  const { data } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (!data) return null

  return {
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
}

async function getRelatedPosts(slug: string): Promise<BlogPost[]> {
  const { data } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .neq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(3)

  return (data || []).map((p: any) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    date: new Date(p.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    readTime: `${p.read_time} min`,
    image: p.image,
    author: p.author,
    tags: p.tags || [],
    category: p.category || "general",
    published: p.published,
    createdAt: p.created_at,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) return { title: "Post Not Found | Property 9ja" }
  return {
    title: `${post.title} | Property 9ja Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const related = await getRelatedPosts(params.slug)

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/30" />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-brand-green-light hover:text-white transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{post.title}</h1>
            <p className="text-lg text-gray-300">{post.excerpt}</p>
            <div className="flex items-center gap-2 mt-6">
              <span className="text-sm text-gray-500">By</span>
              <span className="text-sm font-medium text-white">{post.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <article className="lg:col-span-2 prose prose-lg max-w-none">
              {post.content.split("\n").map((line, i) => {
                if (line.startsWith("## ")) {
                  return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.replace("## ", "")}</h2>
                }
                if (line.startsWith("### ")) {
                  return <h3 key={i} className="text-xl font-semibold text-gray-900 mt-6 mb-3">{line.replace("### ", "")}</h3>
                }
                if (line.startsWith("**") && line.endsWith("**")) {
                  return <p key={i} className="font-semibold text-gray-900 mt-4">{line.replace(/\*\*/g, "")}</p>
                }
                if (line.startsWith("- **")) {
                  const match = line.match(/- \*\*(.+?)\*\* — (.+)/)
                  if (match) {
                    return (
                      <p key={i} className="text-gray-700 ml-4 mt-2">
                        <strong>{match[1]}</strong> — {match[2]}
                      </p>
                    )
                  }
                }
                if (line.startsWith("- ")) {
                  return <li key={i} className="text-gray-700 ml-4 mt-1">{line.replace("- ", "")}</li>
                }
                if (line.startsWith("| ")) {
                  return null
                }
                if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ") || line.startsWith("5. ")) {
                  return <li key={i} className="text-gray-700 ml-4 mt-1 list-decimal">{line.replace(/^\d\. /, "")}</li>
                }
                if (line.startsWith("✅ ")) {
                  return <li key={i} className="text-gray-700 ml-4 mt-1 list-disc text-brand-green">{line}</li>
                }
                if (line.trim() === "") {
                  return <div key={i} className="h-4" />
                }
                return <p key={i} className="text-gray-700 leading-relaxed">{line}</p>
              })}
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              <div className="rounded-xl border bg-white p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-brand-green/10 px-3 py-1 text-xs font-medium text-brand-green">
                      <Tag className="h-3 w-3" />{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border bg-white p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Share</h3>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-[#1DA1F2]/10 p-2.5 hover:bg-[#1DA1F2]/20 transition-colors" aria-label="Share on X">
                    <svg className="h-4 w-4 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </button>
                  <button className="rounded-lg bg-[#1877F2]/10 p-2.5 hover:bg-[#1877F2]/20 transition-colors" aria-label="Share on Facebook">
                    <svg className="h-4 w-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </button>
                  <button className="rounded-lg bg-[#0A66C2]/10 p-2.5 hover:bg-[#0A66C2]/20 transition-colors" aria-label="Share on LinkedIn">
                    <svg className="h-4 w-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-brand-green/5 border border-brand-green/10 p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Find Your Next Home</h3>
                <p className="text-sm text-gray-600 mb-4">Search verified properties across Nigeria</p>
                <Link href="/search">
                  <Button size="sm" className="w-full">Search Properties</Button>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group rounded-xl overflow-hidden border bg-white hover:shadow-lg transition-all"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={r.image} alt={r.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{r.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{r.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-green transition-colors text-sm">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
