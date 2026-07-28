"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  { q: "What makes VERIFIED different from other property sites?", a: "VERIFIED is Nigeria's first verification-first marketplace. Every property listing is physically inspected, every agent's identity is verified, and the total move-in cost is displayed upfront. We have zero tolerance for fake listings or hidden fees." },
  { q: "How does the verification process work?", a: "Agents submit government-issued IDs and proof of address for identity verification. Properties are physically inspected by our team to confirm they exist and match the listing. Ownership documents are also checked before a property can be listed." },
  { q: "What is a Trust Score?", a: "The Trust Score (0-100) is calculated based on verification status, review ratings, listing history, and user activity. Higher scores indicate more reliable agents and properties. Fully verified agents with positive reviews typically score 90+." },
  { q: "How is the total move-in cost calculated?", a: "The total move-in cost includes one year's rent plus all applicable fees: agency fee (typically 10%), agreement fee, legal fee, caution deposit, and service charge. Every fee is itemized on the property page." },
  { q: "Is VERIFIED free for renters?", a: "Yes! Browsing properties, saving favorites, messaging agents, and scheduling viewings are completely free for tenants and renters." },
  { q: "How do I list my property?", a: "Create an agent account, complete your identity verification, and then you can start listing properties. Each listing goes through our verification process before being published." },
  { q: "What happens if I encounter a fraudulent listing?", a: "You can report any listing using the 'Report' button on the property page. Our trust and safety team investigates every report within 24 hours and takes appropriate action." },
  { q: "Can I get a refund if the property is not as described?", a: "VERIFIED verifies properties before listing, but we recommend scheduling a viewing before making any payments. If you encounter a misrepresented listing, report it immediately and our team will investigate." },
  { q: "How long does agent verification take?", a: "Identity verification typically takes 24-48 hours. Property verification may take 2-3 business days depending on location and inspector availability." },
  { q: "How do I contact an agent?", a: "You can send a direct message through our platform, schedule a viewing, or call the agent directly using the phone number displayed on their profile and property pages." },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="bg-verified-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-verified-green">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300">Everything you need to know about VERIFIED</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border bg-white overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${openIndex === idx ? "rotate-180" : ""}`} />
                </button>
                {openIndex === idx && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
