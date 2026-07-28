import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Neighborhoods | Property 9ja",
  description: "Explore Nigeria's best neighborhoods — Lekki, Yaba, Victoria Island, Wuse 2, and more. Find your perfect area.",
}

const neighborhoods = [
  { name: "Lekki Phase 1", city: "Lagos", desc: "Premium waterfront living with upscale homes, shopping, and dining.", avgRent: "₦3M - ₦8M/year", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop" },
  { name: "Yaba", city: "Lagos", desc: "Tech hub of Lagos — vibrant, youthful, and full of energy.", avgRent: "₦1.2M - ₦2.5M/year", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop" },
  { name: "Ikeja GRA", city: "Lagos", desc: "Elite residential area with quiet streets and luxury homes.", avgRent: "₦4M - ₦10M/year", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop" },
  { name: "Victoria Island", city: "Lagos", desc: "The heart of Lagos business district with prime real estate.", avgRent: "₦5M - ₦15M/year", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop" },
  { name: "Wuse 2", city: "Abuja", desc: "Diplomatic zone with high-end apartments and embassies nearby.", avgRent: "₦1.5M - ₦4M/year", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop" },
  { name: "Gwarinpa", city: "Abuja", desc: "One of West Africa's largest housing estates — affordable and family-friendly.", avgRent: "₦800K - ₦2M/year", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&h=400&fit=crop" },
  { name: "GRA Phase 2", city: "Port Harcourt", desc: "Garden city's premier neighborhood with beautiful homes and greenery.", avgRent: "₦2M - ₦5M/year", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop" },
  { name: "Independence Layout", city: "Enugu", desc: "The coal city's most sought-after neighborhood.", avgRent: "₦800K - ₦2M/year", image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&h=400&fit=crop" },
]

export default function NeighborhoodsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="bg-brand-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Neighborhoods</h1>
          <p className="text-xl text-gray-300">Explore Nigeria&apos;s best places to live</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {neighborhoods.map((n) => (
              <Link
                key={n.name}
                href={`/search?city=${n.city.toLowerCase()}`}
                className="group rounded-xl overflow-hidden border bg-white hover:shadow-lg transition-all"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={n.image} alt={n.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-sm text-brand-green mb-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{n.city}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{n.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{n.desc}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <span className="text-sm font-semibold text-brand-green">{n.avgRent}</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-brand-green transition-colors" />
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
