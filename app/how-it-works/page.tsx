import { Search, CheckCircle, Shield, MessageSquare, Calendar, Star } from "lucide-react"

const renterSteps = [
  { icon: Search, title: "1. Search & Browse", desc: "Use our AI-powered search to find properties by location, budget, or natural language. Filter by trust score, amenities, and more." },
  { icon: CheckCircle, title: "2. Check Verification", desc: "Every listing shows its verification status and trust score. Only properties marked 'Fully Verified' have been physically inspected." },
  { icon: Calendar, title: "3. Schedule a Viewing", desc: "Contact the agent directly through our messaging system or schedule a viewing at your convenience." },
  { icon: Shield, title: "4. Transparent Move-In", desc: "The total move-in cost is displayed on every listing. No hidden fees. No surprises." },
]

const agentSteps = [
  { icon: Star, title: "1. Create an Account", desc: "Sign up as an agent and complete your identity verification by submitting your documents." },
  { icon: CheckCircle, title: "2. Get Verified", desc: "Our team verifies your identity and agency documents. This builds trust with potential tenants." },
  { icon: Shield, title: "3. List Your Properties", desc: "Add properties with detailed descriptions, photos, and transparent pricing. Schedule inspections." },
  { icon: MessageSquare, title: "4. Manage Leads", desc: "Receive inquiries, schedule viewings, and communicate with tenants through our dashboard." },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="bg-verified-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How VERIFIED Works</h1>
          <p className="text-xl text-gray-300">Nigeria's first verification-first property marketplace</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">For Renters & Tenants</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {renterSteps.map((s) => (
              <div key={s.title} className="rounded-xl border bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-verified-green/10 mb-4">
                  <s.icon className="h-6 w-6 text-verified-green" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">For Agents & Landlords</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {agentSteps.map((s) => (
              <div key={s.title} className="rounded-xl border bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-verified-green/10 mb-4">
                  <s.icon className="h-6 w-6 text-verified-green" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
