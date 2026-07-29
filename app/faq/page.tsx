"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronDown, HelpCircle, MessageCircle, X, Send, Bot, Loader2 } from "lucide-react"
import { askChatbot } from "@/lib/api"
import { PageHero } from "@/components/shared/PageHero"

const faqs = [
  { q: "What makes Property 9ja different from other property sites?", a: "Property 9ja is Nigeria's first verification-first marketplace. Every property listing is physically inspected, every agent's identity is verified, and the total move-in cost is displayed upfront. We have zero tolerance for fake listings or hidden fees." },
  { q: "How does the verification process work?", a: "Agents submit government-issued IDs and proof of address for identity verification. Properties are physically inspected by our team to confirm they exist and match the listing. Ownership documents are also checked before a property can be listed." },
  { q: "What is a Trust Score?", a: "The Trust Score (0-100) is calculated based on verification status, review ratings, listing history, and user activity. Higher scores indicate more reliable agents and properties. Fully verified agents with positive reviews typically score 90+." },
  { q: "How is the total move-in cost calculated?", a: "The total move-in cost includes one year's rent plus all applicable fees: agency fee (typically 10%), agreement fee, legal fee, caution deposit, and service charge. Every fee is itemized on the property page." },
  { q: "Is Property 9ja free for renters?", a: "Yes! Browsing properties, saving favorites, messaging agents, and scheduling viewings are completely free for tenants and renters." },
  { q: "How do I list my property?", a: "Create an agent account, complete your identity verification, and then you can start listing properties. Each listing goes through our verification process before being published." },
  { q: "What happens if I encounter a fraudulent listing?", a: "You can report any listing using the 'Report' button on the property page. Our trust and safety team investigates every report within 24 hours and takes appropriate action." },
  { q: "Can I get a refund if the property is not as described?", a: "Property 9ja verifies properties before listing, but we recommend scheduling a viewing before making any payments. If you encounter a misrepresented listing, report it immediately and our team will investigate." },
  { q: "How long does agent verification take?", a: "Identity verification typically takes 24-48 hours. Property verification may take 2-3 business days depending on location and inspector availability." },
  { q: "How do I contact an agent?", a: "You can send a direct message through our platform, schedule a viewing, or call the agent directly using the phone number displayed on their profile and property pages." },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hi! I'm the Property 9ja assistant. Ask me anything about our platform, verification, pricing, or how to get started." },
  ])
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => { document.title = "FAQs | Property 9ja" }, [])
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [chatMessages])

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return
    const msg = chatInput.trim()
    setChatInput("")
    setChatMessages((prev) => [...prev, { role: "user", text: msg }])
    setChatLoading(true)
    try {
      const reply = await askChatbot(msg)
      setChatMessages((prev) => [...prev, { role: "bot", text: reply || "Sorry, I couldn't process that. Please try again." }])
    } catch (error) {
      console.error("Chatbot error:", error);
      setChatMessages((prev) => [...prev, { role: "bot", text: "I'm having trouble connecting right now. Please try again later." }])
    } finally {
      setChatLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <PageHero
        icon={<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green"><HelpCircle className="h-8 w-8 text-white" /></div>}
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about Property 9ja"
      />

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

      {/* Chatbot FAB */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-brand-green text-white shadow-lg flex items-center justify-center hover:bg-brand-green-dark transition-colors"
        aria-label="Ask AI assistant"
      >
        {chatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chatbot Widget */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border overflow-hidden flex flex-col animate-fade-in-up">
          <div className="bg-brand-green text-white px-4 py-3 flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <span className="font-semibold text-sm">AI Assistant</span>
          </div>
          <div className="flex-1 p-4 space-y-3 max-h-80 overflow-y-auto bg-gray-50">
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "bg-brand-green text-white rounded-br-sm"
                    : "bg-white text-gray-800 border rounded-bl-sm"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-500 border rounded-xl rounded-bl-sm px-3 py-2 text-sm flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" /> Thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="border-t p-3 flex gap-2 bg-white">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChat()}
              placeholder="Ask a question..."
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
            />
            <button
              onClick={sendChat}
              disabled={chatLoading || !chatInput.trim()}
              className="h-9 w-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green-dark disabled:opacity-50"
            >
              {chatLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
