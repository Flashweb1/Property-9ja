"use client"

import { Heart, MapPin } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { PropertyCard } from "@/components/property/PropertyCard"
import { EmptyState } from "@/components/shared/EmptyState"
import { useAppStore } from "@/lib/store"
import { mockProperties } from "@/lib/mockData"

export default function SavedPropertiesPage() {
  const { favorites } = useAppStore()
  const saved = mockProperties.filter((p) => favorites.includes(p.id))

  return (
    <DashboardLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Saved Properties</h1>
          <p className="text-gray-500 mt-1">{saved.length} properties saved</p>
        </div>

        {saved.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No saved properties"
            description="Start browsing and save properties you're interested in"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {saved.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
