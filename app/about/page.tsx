import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Shield, Users, Building, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About Us | Property 9ja",
  description: "Nigeria's most trusted property marketplace. Every listing verified. Every agent verified. Zero fake properties.",
}

const values = [
  { icon: Shield, title: "Trust First", desc: "Every listing is physically verified. Every agent is identity-checked. Zero tolerance for fraud." },
  { icon: Users, title: "Tenant Protection", desc: "We display total move-in costs upfront, including all fees. No hidden charges. No surprises." },
  { icon: Building, title: "Market Expertise", desc: "Deep knowledge of Nigerian property markets — from Lagos to Abuja, Port Harcourt to Enugu." },
  { icon: Award, title: "Innovation", desc: "AI-powered search, transparent trust scores, and digital tools that simplify property transactions." },
]

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="bg-brand-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="flex justify-center mb-4">
            <div className="relative h-16 w-16">
              <Image
                src="/images/Logo Icon Property9ja.png"
                alt="Property 9ja"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Property 9ja</h1>
          <p className="text-xl text-gray-300">Nigeria&apos;s most trusted property marketplace</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none mb-16">
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Property 9ja was built to solve Nigeria&apos;s real estate trust problem. We&apos;re on a mission to 
              make property transactions transparent, secure, and accessible for every Nigerian — whether 
              you&apos;re renting your first apartment in Yaba or buying a family home in Abuja.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Every property on our platform is physically inspected, every agent&apos;s identity is verified, 
              and every fee is displayed upfront. No fake listings. No hidden charges. Just honest property 
              transactions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 mb-4">
                  <v.icon className="h-6 w-6 text-brand-green" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "12,000+", label: "Verified Properties" },
              { value: "500+", label: "Verified Agents" },
              { value: "0", label: "Fake Listings" },
              { value: "4.9", label: "User Rating" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-green-light">{s.value}</div>
                <div className="text-sm text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-green/5">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to find your next home?</h2>
          <p className="text-gray-600 mb-8">Join thousands of Nigerians who trust Property 9ja for their property search.</p>
          <Link href="/search">
            <Button size="lg">Search Properties</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
