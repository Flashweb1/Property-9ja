"use client"

import Link from "next/link"
import Image from "next/image"
import { Shield, Search, CheckCircle, Users, Building, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search/SearchBar"
import { PropertyCard } from "@/components/property/PropertyCard"
import { VerificationBadge } from "@/components/shared/VerificationBadge"
import { useState, useEffect } from "react"
import { Property } from "@/types"
import { getFeaturedProperties } from "@/lib/api"

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
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([])

  useEffect(() => {
    getFeaturedProperties().then(setFeaturedProperties)
  }, [])
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-navy">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/85 via-brand-navy/70 to-brand-navy" />
        </div>

        {/* Decorative floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[15%] h-32 w-32 rounded-full border border-brand-green/10 animate-float" />
          <div className="absolute bottom-40 right-[20%] h-24 w-24 rounded-full border border-brand-green/5 animate-float-delayed" />
          <div className="absolute top-60 right-[10%] h-16 w-16 rounded-full bg-brand-green/[0.03] animate-float" style={{ animationDelay: "3s" }} />
        </div>

        {/* Logo Watermark */}
        <div className="absolute -right-20 -top-20 pointer-events-none hidden md:block animate-pulse-soft">
          <Image src="/images/Logo Icon Property9ja.png" alt="" width={400} height={400} className="w-[400px] h-[400px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-16 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-green/15 border border-brand-green/30 px-4 py-1.5 mb-6 animate-glow-pulse">
                <Image src="/images/Logo Icon Property9ja.png" alt="" width={16} height={16} className="w-4 h-4" />
                <span className="text-sm font-medium text-brand-green-light">Nigeria's #1 Property Marketplace</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white animate-fade-in-up animation-delay-150">
              Find Your Perfect Home in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-brand-green-light to-green-200 bg-[length:200%_auto] animate-shimmer drop-shadow-lg">
                Nigeria
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
              Every listing verified. Every agent verified. Zero fake properties. Zero hidden fees.
            </p>

            {/* Search Bar */}
            <div className="animate-fade-in-up animation-delay-450">
              <SearchBar variant="hero" />
            </div>

            {/* Trust Signals */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5 text-white/60 animate-fade-in-up animation-delay-600">
                <CheckCircle className="h-4 w-4 text-brand-green-light" /> Verified Listings
              </span>
              <span className="flex items-center gap-1.5 text-white/60 animate-fade-in-up animation-delay-700">
                <CheckCircle className="h-4 w-4 text-brand-green-light" /> Transparent Pricing
              </span>
              <span className="flex items-center gap-1.5 text-white/60 animate-fade-in-up animation-delay-800">
                <CheckCircle className="h-4 w-4 text-brand-green-light" /> No Fake Agents
              </span>
            </div>

            {/* Quick City Links */}
            <div className="mt-8 flex items-center justify-center gap-2 flex-wrap animate-fade-in-up animation-delay-900">
              <span className="text-xs text-white/40 uppercase tracking-wider font-medium mr-1">Popular:</span>
              {["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Enugu"].map((city) => (
                <Link key={city} href={`/search?city=${city.toLowerCase()}`}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 hover:bg-brand-green hover:text-white hover:border-brand-green hover:scale-105 transition-all duration-200">
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-10 border-t border-white/10">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <div key={stat.label} className="text-center animate-fade-in-up" style={{ animationDelay: `${1000 + i * 150}ms` }}>
                  <div className="flex justify-center mb-1">
                    <stat.icon className="h-5 w-5 text-brand-green-light" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs md:text-sm text-white/50 mt-0.5">{stat.label}</div>
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
            {featuredProperties.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How Property 9ja Works</h2>
            <p className="text-gray-500 mt-3">We've reimagined property search from the ground up — with trust at the center.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={step.title} className="relative text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green/10 mb-6">
                  <step.icon className="h-8 w-8 text-brand-green" />
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
                  <p className="text-xs text-brand-green-light mt-1">{hood.avgRent}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-24 bg-brand-navy text-white">
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
                    <CheckCircle className="h-5 w-5 text-brand-green-light mt-0.5 flex-shrink-0" />
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
              <h3 className="text-xl font-semibold mb-6">The Property 9ja Difference</h3>
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
                      <span className={item.us ? "text-brand-green-light font-semibold text-sm" : "text-gray-600 text-sm"}>
                        {item.us ? "✓" : "✗"} Property 9ja
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
          <div className="bg-brand-green rounded-2xl p-8 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Next Home?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of Nigerians who trust Property 9ja for their property search. 
              No scams. No surprises. Just verified properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search">
                <Button size="lg" variant="secondary" className="bg-white text-brand-green hover:bg-gray-100">
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
