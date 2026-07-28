import type { Metadata } from "next"
import Link from "next/link"
import { Briefcase, MapPin, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Careers | Property 9ja",
  description: "Join the Property 9ja team. View open roles in engineering, product, operations, and more.",
}

const openRoles = [
  { title: "Senior Software Engineer", dept: "Engineering", location: "Lagos (Hybrid)", type: "Full-time" },
  { title: "Product Designer", dept: "Product", location: "Lagos (Hybrid)", type: "Full-time" },
  { title: "Property Inspector", dept: "Operations", location: "Lagos, Abuja, Port Harcourt", type: "Full-time" },
  { title: "Customer Success Manager", dept: "Support", location: "Lagos (Remote)", type: "Full-time" },
  { title: "Marketing Lead", dept: "Marketing", location: "Lagos", type: "Full-time" },
  { title: "Data Analyst", dept: "Data", location: "Lagos (Remote)", type: "Full-time" },
]

export default function CareersPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="bg-brand-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-gray-300">Help us build Nigeria&apos;s most trusted property marketplace</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Why Work With Us?</h2>
            <p className="text-gray-600">
              At Property 9ja, we&apos;re solving a real problem — making property transactions in Nigeria 
              transparent and trustworthy. We&apos;re a fast-growing team of builders, designers, and operators 
              passionate about creating real impact.
            </p>
          </div>

          <div className="space-y-4 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Positions</h2>
            {openRoles.map((role) => (
              <Link
                key={role.title}
                href={`/contact?subject=${encodeURIComponent(`Application for ${role.title}`)}`}
                className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border bg-white p-5 text-left hover:shadow-md hover:border-brand-green/30 transition-all group"
              >
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-green transition-colors">{role.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{role.dept}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{role.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{role.type}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-brand-green transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>

          <div className="rounded-xl bg-brand-green/5 border border-brand-green/10 p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Don&apos;t see the right role?</h2>
            <p className="text-gray-600 mb-6">We&apos;re always looking for talented people. Send us your CV.</p>
            <Link href="/contact">
              <Button variant="outline">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
