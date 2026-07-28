"use client"

import Link from "next/link"
import { Shield, Search, CheckCircle, MapPin, TrendingUp, Users, Building, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search/SearchBar"
import { PropertyCard } from "@/components/property/PropertyCard"
import { VerificationBadge } from "@/components/shared/VerificationBadge"
import { mockProperties } from "@/lib/mockData"

const neighborhoods = [
  { name: "Yaba", city: "Lagos", avgRent: "₦1.2M - ₦2.5M", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop" },
  { name: "Lekki Phase 1", city: "Lagos", avgRent: "₦3M - ₦8M", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop" },
  { name: "Wuse 2", city: "Abuja", avgRent: "₦1.5M - ₦4M", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop" },
  { name: "Ikeja GRA", city: "Lagos", avgRent: "₦4M - ₦10M", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop" },
  { name: "Gwarinpa", city: "Abuja", avgRent: "₦800K - ₦2M", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=300&fit=crop" },
  { name: "Victoria Island", city: "Lagos", avgRent: "₦5M - ₦15M", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop" },
]

const stats = [
  { icon: Building, value: "12,000+", label: "Verified Properties" },
  { icon: Users, value: "500+", label: "Verified Agents" },
  { icon: Shield, value: "0", label: "Fake Listings" },
  { icon: Star, value: "4.9", label: "User Rating" },
]

const steps = [
  { icon: Search, title: "Search", desc: "Find properties using AI-powered natural language search or browse by location, budget, and amenities." },
  { icon: CheckCircle, title: "Verify", desc: "Every listing is physically inspected and verified. Check the trust score before you visit." },
  { icon: Shield, title: "Move In", desc: "Transparent pricing with no hidden fees. Secure messaging and digital documentation." },
]

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-verified-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-verified-green/20 border border-verified-green/30 px-4 py-1.5 mb-6">
              <Shield className="h-4 w-4 text-verified-green-light" />
              <span className="text-sm font-medium text-verified-green-light">Nigeria's First Verification-First Property Platform</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Find Properties You Can{" "}
              <span className="text-verified-green-light">Actually Trust</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Every listing verified. Every agent verified. Zero fake properties. Zero hidden fees. 
              The most transparent way to rent or buy property in Nigeria.
            </p>

            <SearchBar variant="hero" />

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-verified-green-light" />
                Verified Listings
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-verified-green-light" />
                Transparent Pricing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-verified-green-light" />
                No Fake Agents
              </span>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-verified-green-light" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Verified Properties</h2>
              <p className="text-gray-500 mt-2">Hand-picked listings with the highest trust scores</p>
            </div>
            <Link href="/search">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProperties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How VERIFIED Works</h2>
            <p className="text-gray-500 mt-3">We've reimagined property search from the ground up — with trust at the center.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={step.title} className="relative text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-verified-green/10 mb-6">
                  <step.icon className="h-8 w-8 text-verified-green" />
                </div>
                <div className="absolute top-8 left-1/2 w-full hidden md:block">
                  {idx < steps.length - 1 && (
                    <div className="h-0.5 bg-gray-200 w-1/2 ml-8" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Explore Neighborhoods</h2>
            <p className="text-gray-500 mt-3">Discover properties in Nigeria's most sought-after locations</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {neighborhoods.map((hood) => (
              <Link
                key={hood.name}
                href={`/search?location=${encodeURIComponent(hood.name)}`}
                className="group relative rounded-xl overflow-hidden aspect-[4/3]"
              >
                <img
                  src={hood.image}
                  alt={hood.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">{hood.name}</h3>
                  <p className="text-sm text-gray-300">{hood.city}</p>
                  <p className="text-xs text-verified-green-light mt-1">{hood.avgRent}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-24 bg-verified-navy text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Trust Matters in Nigerian Real Estate
              </h2>
              <div className="space-y-4">
                {[
                  "Fake listings cost Nigerians millions in inspection fees every year",
                  "Agents advertise properties they don't control or that don't exist",
                  "Hidden fees appear only after you've committed time and money",
                  "No standardized way to verify who owns what property",
                  "Scammers exploit the lack of a trusted central platform",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-verified-green-light mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/trust-and-safety">
                  <Button size="lg" className="gap-2">
                    <Shield className="h-5 w-5" />
                    Learn About Our Verification
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-6">The VERIFIED Difference</h3>
              <div className="space-y-4">
                {[
                  { label: "Physical Property Inspection", us: true, them: false },
                  { label: "Agent Identity Verification", us: true, them: false },
                  { label: "Ownership Document Check", us: true, them: false },
                  { label: "Transparent Total Move-In Cost", us: true, them: false },
                  { label: "AI Fraud Detection", us: true, them: false },
                  { label: "Review System", us: true, them: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                    <span className="text-sm text-gray-300">{item.label}</span>
                    <div className="flex gap-8">
                      <span className={item.us ? "text-verified-green-light font-semibold text-sm" : "text-gray-600 text-sm"}>
                        {item.us ? "✓" : "✗"} VERIFIED
                      </span>
                      <span className={item.them ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>
                        {item.them ? "✓" : "✗"} Others
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-verified-green rounded-2xl p-8 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Next Home?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of Nigerians who trust VERIFIED for their property search. 
              No scams. No surprises. Just verified properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search">
                <Button size="lg" variant="secondary" className="bg-white text-verified-green hover:bg-gray-100">
                  <Search className="h-5 w-5 mr-2" />
                  Search Properties
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Building className="h-5 w-5 mr-2" />
                  List Your Property
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
