"use client"

import { useState } from "react"
import { X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-sm font-semibold text-gray-900"
      >
        {title}
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  )
}

export function FilterPanel() {
  const { filterDrawerOpen, setFilterDrawerOpen, filters, setFilters, resetFilters } = useAppStore()
  const [localFilters, setLocalFilters] = useState(filters)

  const propertyTypes = ["Flat", "Duplex", "Self-Contain", "Bungalow", "Commercial"]
  const bedroomOptions = [1, 2, 3, 4, 5]
  const bathroomOptions = [1, 2, 3, 4]
  const amenities = ["Parking", "Security", "Water", "Electricity", "Furnished", "Air Conditioning", "POP Ceiling"]

  const updateFilter = (key: string, value: any) => {
    setLocalFilters((prev: any) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    setFilters(localFilters)
    setFilterDrawerOpen(false)
  }

  const clearFilters = () => {
    setLocalFilters({})
    resetFilters()
  }

  const isActive = Object.keys(localFilters).length > 0

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-24 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            {isActive && (
              <button onClick={clearFilters} className="text-xs text-brand-green hover:underline">
                Clear all
              </button>
            )}
          </div>

          <div className="rounded-xl border bg-white p-4 space-y-2">
            <FilterSection title="Verified Only">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.verifiedOnly !== false}
                  onChange={(e) => updateFilter("verifiedOnly", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                />
                <span className="text-sm text-gray-700">Show only verified listings</span>
              </label>
            </FilterSection>

            <FilterSection title="Property Type">
              <div className="space-y-2">
                {propertyTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localFilters.types?.includes(type.toLowerCase()) || false}
                      onChange={(e) => {
                        const current = localFilters.types || []
                        if (e.target.checked) {
                          updateFilter("types", [...current, type.toLowerCase()])
                        } else {
                          updateFilter("types", current.filter((t: string) => t !== type.toLowerCase()))
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Price Range">
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500">Min Price (₦)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={localFilters.minPrice || ""}
                    onChange={(e) => updateFilter("minPrice", Number(e.target.value))}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Max Price (₦)</label>
                  <input
                    type="number"
                    placeholder="Any"
                    value={localFilters.maxPrice || ""}
                    onChange={(e) => updateFilter("maxPrice", Number(e.target.value))}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                  />
                </div>
              </div>
            </FilterSection>

            <FilterSection title="Bedrooms">
              <div className="flex flex-wrap gap-2">
                {bedroomOptions.map((num) => (
                  <button
                    key={num}
                    onClick={() => updateFilter("bedrooms", localFilters.bedrooms === num ? null : num)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm border transition-colors",
                      localFilters.bedrooms === num
                        ? "bg-brand-green text-white border-brand-green"
                        : "bg-white text-gray-700 border-gray-200 hover:border-brand-green"
                    )}
                  >
                    {num} {num === 1 ? "Bed" : "Beds"}
                  </button>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Bathrooms">
              <div className="flex flex-wrap gap-2">
                {bathroomOptions.map((num) => (
                  <button
                    key={num}
                    onClick={() => updateFilter("bathrooms", localFilters.bathrooms === num ? null : num)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm border transition-colors",
                      localFilters.bathrooms === num
                        ? "bg-brand-green text-white border-brand-green"
                        : "bg-white text-gray-700 border-gray-200 hover:border-brand-green"
                    )}
                  >
                    {num} {num === 1 ? "Bath" : "Baths"}
                  </button>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Amenities">
              <div className="space-y-2">
                {amenities.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localFilters.amenities?.includes(amenity) || false}
                      onChange={(e) => {
                        const current = localFilters.amenities || []
                        if (e.target.checked) {
                          updateFilter("amenities", [...current, amenity])
                        } else {
                          updateFilter("amenities", current.filter((a: string) => a !== amenity))
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </FilterSection>
          </div>

          <Button className="w-full" onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setFilterDrawerOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between z-10">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setFilterDrawerOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {/* Same filter content as desktop */}
              <div className="space-y-2">
                <FilterSection title="Verified Only">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localFilters.verifiedOnly !== false}
                      onChange={(e) => updateFilter("verifiedOnly", e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-brand-green"
                    />
                    <span className="text-sm text-gray-700">Show only verified listings</span>
                  </label>
                </FilterSection>
                <FilterSection title="Property Type">
                  <div className="space-y-2">
                    {propertyTypes.map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={localFilters.types?.includes(type.toLowerCase()) || false}
                          onChange={(e) => {
                            const current = localFilters.types || []
                            if (e.target.checked) {
                              updateFilter("types", [...current, type.toLowerCase()])
                            } else {
                              updateFilter("types", current.filter((t: string) => t !== type.toLowerCase()))
                            }
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-brand-green"
                        />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t p-4 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={clearFilters}>
                Clear
              </Button>
              <Button className="flex-1" onClick={applyFilters}>
                Show Results
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
