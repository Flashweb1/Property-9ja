"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, SlidersHorizontal, Sparkles, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { naturalSearch } from "@/lib/api"

interface SearchBarProps {
  variant?: "hero" | "compact"
  initialQuery?: string
}

export function SearchBar({ variant = "compact", initialQuery = "" }: SearchBarProps) {
  const router = useRouter()
  const { setFilterDrawerOpen } = useAppStore()
  const [query, setQuery] = useState(initialQuery)
  const [location, setLocation] = useState("")
  const [nlpLoading, setNlpLoading] = useState(false)

  const handleSearch = async () => {
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (location) params.set("location", location)
    router.push(`/search?${params.toString()}`)
  }

  const handleNLSearch = async () => {
    if (!query.trim() || nlpLoading) return
    setNlpLoading(true)
    try {
      const filters = await naturalSearch(query)
      if (filters) {
        const params = new URLSearchParams()
        if (filters.q) params.set("q", filters.q)
        if (filters.location) params.set("location", filters.location)
        if (filters.city) params.set("city", filters.city)
        if (filters.type) params.set("type", filters.type)
        if (filters.minPrice) params.set("minPrice", String(filters.minPrice))
        if (filters.maxPrice) params.set("maxPrice", String(filters.maxPrice))
        if (filters.bedrooms) params.set("bedrooms", String(filters.bedrooms))
        if (filters.bathrooms) params.set("bathrooms", String(filters.bathrooms))
        if (filters.verifiedOnly) params.set("verifiedOnly", "true")
        router.push(`/search?${params.toString()}`)
      } else {
        handleSearch()
      }
    } finally {
      setNlpLoading(false)
    }
  }

  if (variant === "hero") {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-2 max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder='Try: "2-bedroom in Yaba under ₦2m near UNILAG"'
              className="pl-10 h-14 text-base border-0 shadow-none focus-visible:ring-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNLSearch()}
            />
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1 md:w-48">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Location"
                className="pl-10 h-14 border-0 shadow-none focus-visible:ring-0 bg-gray-50 md:bg-transparent"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Button
              size="lg"
              className="h-14 px-8 rounded-xl"
              onClick={handleNLSearch}
              disabled={nlpLoading}
            >
              {nlpLoading ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Sparkles className="h-5 w-5 mr-2" />
              )}
              {nlpLoading ? "Thinking..." : "Search"}
            </Button>
          </div>
        </div>
        <div className="px-4 pb-2 pt-1">
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <span className="bg-brand-green/10 text-brand-green px-1.5 py-0.5 rounded text-[10px] font-medium">AI</span>
            Try natural language search
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search properties..."
          className="pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      <Button variant="outline" size="icon" onClick={() => setFilterDrawerOpen(true)}>
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
      <Button onClick={handleSearch}>
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  )
}
