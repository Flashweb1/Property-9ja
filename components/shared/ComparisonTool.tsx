"use client"

import { useState, useEffect } from "react"
import { X, Bed, Bath, Car, Check, Minus } from "lucide-react"
import { Property } from "@/types"
import { formatPrice, cn } from "@/lib/utils"
import { getPropertyById } from "@/lib/api"

interface ComparisonToolProps {
  propertyIds: string[]
  onRemove: (id: string) => void
  onClose: () => void
}

export function ComparisonTool({ propertyIds, onRemove, onClose }: ComparisonToolProps) {
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    Promise.all(propertyIds.map((id) => getPropertyById(id))).then((results) => {
      setProperties(results.filter(Boolean) as Property[])
    })
  }, [propertyIds])

  if (properties.length === 0) return null

  const rows = [
    { label: "Price", render: (p: Property) => <span className="font-bold text-brand-green">{formatPrice(p.price)}</span> },
    { label: "Type", render: (p: Property) => <span className="capitalize">{p.type}</span> },
    { label: "Location", render: (p: Property) => <span>{p.neighborhood}, {p.city}</span> },
    { label: "Bedrooms", render: (p: Property) => <div className="flex items-center justify-center gap-1"><Bed className="h-4 w-4" />{p.bedrooms}</div> },
    { label: "Bathrooms", render: (p: Property) => <div className="flex items-center justify-center gap-1"><Bath className="h-4 w-4" />{p.bathrooms}</div> },
    { label: "Parking", render: (p: Property) => <div className="flex items-center justify-center gap-1"><Car className="h-4 w-4" />{p.parking}</div> },
    { label: "Furnished", render: (p: Property) => p.furnished ? <Check className="h-5 w-5 text-green-600 mx-auto" /> : <Minus className="h-5 w-5 text-gray-300 mx-auto" /> },
    { label: "Electricity", render: (p: Property) => <span className="capitalize">{p.electricity}</span> },
    { label: "Water", render: (p: Property) => <span className="capitalize">{p.water}</span> },
    { label: "Trust Score", render: (p: Property) => (
      <span className={cn("font-bold", p.trustScore >= 90 ? "text-green-600" : p.trustScore >= 70 ? "text-yellow-600" : "text-red-600")}>
        {p.trustScore}%
      </span>
    )},
    { label: "Total Move-In", render: (p: Property) => <span className="font-semibold">{formatPrice(p.totalMoveInCost)}</span> },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-5xl max-h-[85vh] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-900">Compare Properties</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid gap-4" style={{ gridTemplateColumns: `160px repeat(${properties.length}, 1fr)` }}>
            {/* Headers */}
            <div />
            {properties.map((p) => (
              <div key={p.id} className="text-center">
                <div className="relative mb-3">
                  <img src={p.images[0]} alt={p.title} className="w-full h-28 object-cover rounded-lg" />
                  <button
                    onClick={() => onRemove(p.id)}
                    className="absolute top-1 right-1 h-6 w-6 rounded-full bg-white/90 flex items-center justify-center shadow hover:bg-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <p className="text-sm font-semibold text-gray-900 leading-tight">{p.title}</p>
              </div>
            ))}

            {/* Rows */}
            {rows.map((row) => (
              <div key={row.label} className="contents">
                <div className="text-sm font-semibold text-gray-700 py-3 px-2 bg-gray-50 rounded-l flex items-center">
                  {row.label}
                </div>
                {properties.map((p) => (
                  <div key={p.id} className="text-sm text-gray-600 py-3 px-2 text-center border-t flex items-center justify-center">
                    {row.render(p)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
