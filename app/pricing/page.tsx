import Link from "next/link"
import { CheckCircle, Shield, Building, Star, Users, MessageSquare, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Free",
    price: "₦0",
    period: "forever",
    features: [
      "Browse all listings",
      "Save favorites",
      "Contact agents",
      "Schedule viewings",
      "Receive updates",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Agent Basic",
    price: "Free",
    period: "to list",
    features: [
      "Up to 5 listings",
      "Identity verification",
      "Basic analytics",
      "Messaging with tenants",
      "Listing management",
    ],
    cta: "Start Listing",
    featured: false,
  },
  {
    name: "Agent Pro",
    price: "Coming Soon",
    period: "",
    features: [
      "Unlimited listings",
      "Priority verification",
      "Advanced analytics",
      "Featured listings",
      "Lead management tools",
      "API access",
    ],
    cta: "Join Waitlist",
    featured: true,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="bg-verified-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-xl text-gray-300">Start for free. Upgrade as you grow.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 flex flex-col ${
                  plan.featured ? "bg-verified-navy text-white border-verified-green ring-2 ring-verified-green scale-105" : "bg-white"
                }`}
              >
                <h3 className={`text-lg font-semibold ${plan.featured ? "text-verified-green-light" : "text-gray-900"}`}>{plan.name}</h3>
                <div className="mt-4">
                  <span className={`text-4xl font-bold ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                  {plan.period && <span className={`text-sm ${plan.featured ? "text-gray-400" : "text-gray-500"}`}>/{plan.period}</span>}
                </div>
                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${plan.featured ? "text-verified-green-light" : "text-verified-green"}`} />
                      <span className={plan.featured ? "text-gray-200" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-8">
                  <Button className={`w-full ${plan.featured ? "bg-verified-green hover:bg-verified-green-dark text-white" : ""}`} variant={plan.featured ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-sm text-gray-500">
              All plans include our verification system, trust scores, and secure messaging.
              Agent Pro pricing will be announced at launch. Join the waitlist to get early access.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
