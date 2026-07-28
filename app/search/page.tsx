"use client"

import { Suspense, useState, useMemo, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { MapPin, Grid3X3, List, SlidersHorizontal, ChevronDown, Map, Columns3, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SearchBar } from "@/components/search/SearchBar"
import { FilterPanel } from "@/components/search/FilterPanel"
import { PropertyCard } from "@/components/property/PropertyCard"
import { PropertyCardSkeleton } from "@/components/shared/LoadingSkeleton"
import { EmptyState } from "@/components/shared/EmptyState"
import { MapView } from "@/components/shared/MapView"
import { ComparisonTool } from "@/components/shared/ComparisonTool"
import { useProperties } from "@/hooks/useProperties"
import { useAppStore } from "@/lib/store"
import { Property } from "@/types"

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const initialLocation = searchParams.get("location") || ""
  const { filters } = useAppStore()

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showMap, setShowMap] = useState(false)
  const [sortBy, setSortBy] = useState<string>("newest")
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [showCompare, setShowCompare] = useState(false)

  const queryFilters = useMemo(() => {
    const f: Record<string, any> = { ...filters }
    if (initialQuery) f.q = initialQuery
    if (initialLocation) f.location = initialLocation
    return f
  }, [filters, initialQuery, initialLocation])

  const { properties, loading } = useProperties(queryFilters)

  const sorted = useMemo(() => {
    const arr = [...properties]
    switch (sortBy) {
      case "price-asc": return arr.sort((a, b) => a.price - b.price)
      case "price-desc": return arr.sort((a, b) => b.price - a.price)
      case "trust": return arr.sort((a, b) => b.trustScore - a.trustScore)
      default: return arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
  }, [properties, sortBy])

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    )
  }, [])

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex gap-8">
        <FilterPanel />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {loading ? "Searching..." : `${sorted.length} properties found`}
                </h1>
                {(initialQuery || initialLocation) && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    {initialQuery && `"${initialQuery}"`}
                    {initialQuery && initialLocation && " in "}
                    {initialLocation && `${initialLocation}`}
                  </p>
                )}
              </div>
              {compareIds.length > 0 && (
                <button
                  onClick={() => setShowCompare(true)}
                  className="flex items-center gap-1.5 text-xs bg-verified-green text-white px-3 py-1.5 rounded-full font-medium hover:bg-verified-green-dark"
                >
                  <Columns3 className="h-3.5 w-3.5" />
                  Compare ({compareIds.length})
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none rounded-lg border border-gray-300 bg-white pl-3 pr-8 py-2 text-sm text-gray-700 focus:border-verified-green focus:outline-none focus:ring-1 focus:ring-verified-green"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="trust">Highest Trust Score</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="hidden sm:flex items-center rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-verified-green text-white" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-verified-green text-white" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              <Button
                variant={showMap ? "default" : "outline"}
                size="sm"
                onClick={() => setShowMap(!showMap)}
              >
                <Map className="h-4 w-4 mr-1" />
                Map
              </Button>

              <Button variant="outline" size="sm" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-1" />
                Filters
              </Button>
            </div>
          </div>

          {showMap && !loading && (
            <div className="mb-6">
              <MapView properties={sorted} />
            </div>
          )}

          {loading ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {[1, 2, 3, 4, 5, 6].map((i) => <PropertyCardSkeleton key={i} />)}
            </div>
          ) : sorted.length === 0 ? (
            <EmptyState icon={MapPin} title="No properties found" description="Try adjusting your filters or search for a different location" />
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {sorted.map((property) => (
                <div key={property.id} className="relative group">
                  <PropertyCard property={property} variant={viewMode === "list" ? "compact" : "default"} />
                  <button
                    onClick={() => toggleCompare(property.id)}
                    className={`absolute top-3 right-3 z-10 h-6 w-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-colors ${
                      compareIds.includes(property.id)
                        ? "bg-verified-green border-verified-green text-white"
                        : "bg-white border-gray-300 text-gray-400 opacity-0 group-hover:opacity-100 hover:border-verified-green"
                    }`}
                    title="Compare"
                  >
                    {compareIds.includes(property.id) ? compareIds.indexOf(property.id) + 1 : "+"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showCompare && (
        <ComparisonTool
          propertyIds={compareIds}
          onRemove={(id) => setCompareIds((prev) => prev.filter((x) => x !== id))}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="bg-white border-b sticky top-16 z-30">
        <div className="container mx-auto px-4 py-3">
          <SearchBar initialQuery="" />
        </div>
      </div>
      <Suspense fallback={
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => <PropertyCardSkeleton key={i} />)}
          </div>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </div>
  )
}
