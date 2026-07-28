import { Shield, CheckCircle, Search, FileCheck, Camera, Users, Building, Star } from "lucide-react"

const steps = [
  { icon: FileCheck, title: "Agent Identity Verification", desc: "Every agent submits government-issued ID and proof of address. We verify each document before they can list." },
  { icon: Camera, title: "Physical Property Inspection", desc: "Our inspectors visit every property to verify it exists, matches the listing, and meets quality standards." },
  { icon: Search, title: "Ownership Document Check", desc: "We verify that the agent or landlord has legal authorization to list the property through CAC and land documents." },
  { icon: Users, title: "Tenant Screening", desc: "Tenants can also verify their identity, building trust with landlords and agents alike." },
]

export default function TrustAndSafetyPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="bg-verified-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-verified-green">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Trust & Safety</h1>
          <p className="text-xl text-gray-300">How VERIFIED eliminates real estate fraud in Nigeria</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <div key={i} className="rounded-xl border bg-white p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-verified-green/10 mb-4">
                  <s.icon className="h-7 w-7 text-verified-green" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">The VERIFIED Trust Score</h2>
          <div className="space-y-6">
            {[
              { score: "90-100", label: "Excellent", color: "text-green-600", desc: "Fully verified agent and property. High review scores. No complaints." },
              { score: "70-89", label: "Good", color: "text-yellow-600", desc: "Identity verified. Property inspected. Minor issues may exist." },
              { score: "50-69", label: "Fair", color: "text-orange-600", desc: "Basic verification complete. Some reviews or history concerns." },
              { score: "0-49", label: "Low", color: "text-red-600", desc: "Incomplete verification or reported issues. Proceed with caution." },
            ].map((tier) => (
              <div key={tier.label} className="flex items-center gap-4 rounded-xl border p-4">
                <div className={`h-14 w-14 rounded-full flex items-center justify-center font-bold text-lg ${tier.color} bg-gray-50`}>{tier.score}</div>
                <div>
                  <p className={`font-semibold ${tier.color}`}>{tier.label}</p>
                  <p className="text-sm text-gray-500">{tier.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Fraud Protection Pledge</h2>
          <div className="space-y-4">
            {[
              "Every listing is physically inspected before being marked as verified",
              "Agents must pass identity verification before they can list properties",
              "Total move-in cost is displayed upfront — no hidden fees",
              "All communications happen through our secure messaging system",
              "Fraudulent listings are removed immediately and reported to authorities",
              "We maintain a 24/7 trust and safety team to investigate reports",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-verified-green mt-0.5 flex-shrink-0" />
                <p className="text-gray-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
