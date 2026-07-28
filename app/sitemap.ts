import { MetadataRoute } from "next"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://property9ja.ng"

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${baseUrl}/register`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${baseUrl}/verify`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${baseUrl}/neighborhoods`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
  ]

  const { data: properties } = await supabaseAdmin
    .from("properties")
    .select("id, updated_at")
    .eq("status", "active")

  const propertyPages = (properties || []).map((p) => ({
    url: `${baseUrl}/property/${p.id}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const { data: agents } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("role", "agent")

  const agentPages = (agents || []).map((a) => ({
    url: `${baseUrl}/agent/${a.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  const { data: blogPosts } = await supabaseAdmin
    .from("blog_posts")
    .select("slug")
    .eq("published", true)

  const blogPages = (blogPosts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...propertyPages, ...agentPages, ...blogPages]
}
