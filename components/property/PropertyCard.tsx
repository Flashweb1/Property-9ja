"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, MapPin, Bed, Bath, Car } from "lucide-react"
import { Property } from "@/types"
import { formatPrice, cn } from "@/lib/utils"
import { VerificationBadge } from "@/components/shared/VerificationBadge"
import { TrustScore } from "@/components/shared/TrustScore"
import { useAppStore } from "@/lib/store"

interface PropertyCardProps {
  property: Property
  variant?: "default" | "compact"
}

export function PropertyCard({ property, variant = "default" }: PropertyCardProps) {
  const { toggleFavorite, isFavorite } = useAppStore()
  const favorited = isFavorite(property.id)

  if (variant === "compact") {
    return (
      <Link href={`/property/${property.id}`} className="group flex gap-3 rounded-lg border bg-white p-3 hover:shadow-md transition-shadow">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
          <img src={property.images[0]} alt={property.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
          <div className="absolute top-1 left-1">
            <VerificationBadge status={property.verificationStatus} size="sm" showLabel={false} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-gray-900 truncate">{property.title}</h3>
          <p className="text-verified-green font-bold text-sm mt-0.5">{formatPrice(property.price)}<span className="text-gray-400 font-normal text-xs">/year</span></p>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Bed className="h-3 w-3" />{property.bedrooms}</span>
            <span className="flex items-center gap-1"><Bath className="h-3 w-3" />{property.bathrooms}</span>
            <span className="flex items-center gap-1"><Car className="h-3 w-3" />{property.parking}</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="group relative rounded-xl border bg-white overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <VerificationBadge status={property.verificationStatus} size="sm" />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleFavorite(property.id)
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors"
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("h-4 w-4", favorited ? "fill-red-500 text-red-500" : "text-gray-600")} />
        </button>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <span className="bg-verified-navy/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
          <span className="bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-md">
            {property.images.length} photos
          </span>
        </div>
      </div>

      {/* Content */}
      <Link href={`/property/${property.id}`} className="block p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-verified-green transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
              <MapPin className="h-3.5 w-3.5 text-verified-green" />
              <span className="truncate">{property.neighborhood}, {property.city}</span>
            </div>
          </div>
        </div>

        <p className="text-verified-green font-bold text-lg mt-2">
          {formatPrice(property.price)}<span className="text-gray-400 text-sm font-normal">/year</span>
        </p>

        <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-gray-400" />
            {property.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-gray-400" />
            {property.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <Car className="h-4 w-4 text-gray-400" />
            {property.parking} Park
          </span>
        </div>

        <div className="mt-3 pt-3 border-t flex items-center justify-between">
          <TrustScore score={property.trustScore} size="sm" showLabel={false} />
          <span className="text-xs text-gray-500">{property.agent.name}</span>
        </div>
      </Link>
    </div>
  )
}
