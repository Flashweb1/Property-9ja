"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { getBlogPosts } from "@/lib/api"
import { BlogPost } from "@/types"
import { PageHero } from "@/components/shared/PageHero"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    getBlogPosts().then(setPosts)
  }, [])

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <PageHero title="Property 9ja Blog" subtitle="Tips, guides, and insights for Nigerian property seekers and agents" />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl overflow-hidden border bg-white hover:shadow-lg transition-all"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-green transition-colors">{post.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-1 mt-4 text-sm font-medium text-brand-green">
                    Read More <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
