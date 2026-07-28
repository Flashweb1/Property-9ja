"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

const contactMethods = [
  { icon: Mail, title: "Email", detail: "support@verified.ng", sub: "We respond within 24 hours" },
  { icon: Phone, title: "Phone", detail: "+234 800 123 4567", sub: "Mon-Fri 8AM - 6PM (WAT)" },
  { icon: MapPin, title: "Office", detail: "12 Admiralty Way, Lekki Phase 1", sub: "Lagos, Nigeria" },
  { icon: Clock, title: "Hours", detail: "Monday - Friday", sub: "8:00 AM - 6:00 PM (WAT)" },
]

function ContactForm() {
  const searchParams = useSearchParams()
  const [sent, setSent] = useState(false)
  const [subject] = useState(searchParams.get("subject") || "")

  useEffect(() => { document.title = "Contact Us | Property 9ja" }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget.elements as any
    const data = { name: form.name.value, email: form.email.value, message: form.message.value }
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    } catch { /* fallback */ }
    setSent(true)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="bg-brand-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300">We&apos;re here to help with any questions or concerns</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              {contactMethods.map((m) => (
                <div key={m.title} className="flex items-start gap-4 rounded-xl border bg-white p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10 flex-shrink-0">
                    <m.icon className="h-5 w-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{m.title}</h3>
                    <p className="text-sm text-gray-900 mt-0.5">{m.detail}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{m.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Send Us a Message</h2>
              {sent ? (
                <p className="text-brand-green font-medium text-center py-8">Message sent! We'll get back to you within 24 hours.</p>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows={4} required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                  </div>
                  <button type="submit" className="w-full rounded-lg bg-brand-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-dark transition-colors">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-4rem)]" />}>
      <ContactForm />
    </Suspense>
  )
}
