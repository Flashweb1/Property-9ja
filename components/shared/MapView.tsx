"use client"

import { MapPin } from "lucide-react"
import { Property } from "@/types"
import { formatPrice } from "@/lib/utils"

interface MapViewProps {
  properties: Property[]
  center?: { lat: number; lng: number }
  zoom?: number
  onMarkerClick?: (property: Property) => void
}

export function MapView({ properties, onMarkerClick }: MapViewProps) {
  const minLat = Math.min(...properties.map((p) => p.lat))
  const maxLat = Math.max(...properties.map((p) => p.lat))
  const minLng = Math.min(...properties.map((p) => p.lng))
  const maxLng = Math.max(...properties.map((p) => p.lng))
  const centerLat = (minLat + maxLat) / 2
  const centerLng = (minLng + maxLng) / 2

  const padding = 0.05
  const latRange = maxLat - minLat + padding * 2
  const lngRange = maxLng - minLng + padding * 2
  const scale = Math.min(350 / latRange, 500 / lngRange, 120)

  const toX = (lng: number) => ((lng - (minLng - padding)) / lngRange) * 500
  const toY = (lat: number) => ((maxLat + padding - lat) / latRange) * 350

  return (
    <div className="relative w-full bg-gray-50 rounded-xl border overflow-hidden">
      <div className="relative w-full" style={{ aspectRatio: "500/350" }}>
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 350" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="500" height="350" fill="url(#grid)" />
        </svg>

        {/* Markers */}
        {properties.map((p) => (
          <button
            key={p.id}
            onClick={() => onMarkerClick?.(p)}
            className="absolute group cursor-pointer"
            style={{
              left: `${(toX(p.lng) / 500) * 100}%`,
              top: `${(toY(p.lat) / 350) * 100}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="flex flex-col items-center">
              <div className="bg-verified-green text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap group-hover:bg-verified-green-dark transition-colors">
                {formatPrice(p.price)}
              </div>
              <MapPin className="h-5 w-5 text-verified-green -mt-0.5" fill="#0A7B3E" />
            </div>
          </button>
        ))}

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ display: 'none' }}>
          <div className="h-3 w-3 rounded-full bg-verified-green/30 border-2 border-verified-green" />
        </div>
      </div>

      {properties.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80">
          <p className="text-sm text-gray-500">No properties to show on map</p>
        </div>
      )}
    </div>
  )
}
