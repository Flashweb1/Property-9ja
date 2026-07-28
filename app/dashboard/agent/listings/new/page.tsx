"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, Upload, X, Plus, Sparkles, Loader2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { generateDescription } from "@/lib/api"

export default function NewListingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [descTone, setDescTone] = useState<"premium" | "standard" | "short">("standard")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Flat",
    city: "",
    neighborhood: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
    furnished: "yes",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) { setStep(step + 1); return }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      router.push("/dashboard/agent/listings")
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add New Listing</h1>
          <p className="text-gray-500 mt-1">List a verified property on Property 9ja</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                s <= step ? "bg-brand-green text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {s}
              </div>
              <span className={`text-xs font-medium ${s <= step ? "text-brand-green" : "text-gray-400"}`}>
                {s === 1 ? "Details" : s === 2 ? "Media" : "Pricing"}
              </span>
              {s < 3 && <div className={`flex-1 h-0.5 ${s < step ? "bg-brand-green" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-6 space-y-6">
          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold text-gray-900">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text" required value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <div className="flex items-center gap-2">
                      <select
                        value={descTone}
                        onChange={(e) => setDescTone(e.target.value as typeof descTone)}
                        className="text-xs rounded border border-gray-200 px-2 py-1 bg-gray-50"
                      >
                        <option value="premium">Premium</option>
                        <option value="standard">Standard</option>
                        <option value="short">Short</option>
                      </select>
                      <button
                        type="button"
                        onClick={async () => {
                          setAiLoading(true)
                          try {
                            const desc = await generateDescription({
                              type: formData.type,
                              bedrooms: formData.bedrooms || "N/A",
                              bathrooms: formData.bathrooms || "N/A",
                              city: formData.city || "N/A",
                              neighborhood: formData.neighborhood || "N/A",
                              furnished: formData.furnished === "yes",
                              tone: descTone,
                            })
                            if (desc) setFormData({ ...formData, description: desc })
                          } finally {
                            setAiLoading(false)
                          }
                        }}
                        disabled={aiLoading}
                        className="flex items-center gap-1 text-xs bg-brand-green text-white px-2.5 py-1 rounded hover:bg-brand-green-dark disabled:opacity-50"
                      >
                        {aiLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                        {aiLoading ? "Generating..." : "AI Generate"}
                      </button>
                    </div>
                  </div>
                  <textarea
                    rows={4} required value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green">
                    <option>Flat</option>
                    <option>Duplex</option>
                    <option>Self-Contain</option>
                    <option>Bungalow</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" required value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Neighborhood</label>
                  <input type="text" required value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" required value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                  <input type="number" min={0} required value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                  <input type="number" min={0} required value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parking Spaces</label>
                  <input type="number" min={0} value={formData.parking}
                    onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Furnished</label>
                  <select value={formData.furnished}
                    onChange={(e) => setFormData({ ...formData, furnished: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold text-gray-900">Photos & Media</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-brand-green transition-colors cursor-pointer">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700">Click to upload photos</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB each</p>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative aspect-square rounded-lg bg-gray-100 overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=200&fit=crop`} alt="" className="h-full w-full object-cover" />
                    <button className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <button className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-brand-green transition-colors">
                  <Plus className="h-6 w-6 text-gray-400" />
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video Tour URL (optional)</label>
                <input type="url" placeholder="https://youtube.com/..." className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-lg font-semibold text-gray-900">Pricing & Fees</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Rent (₦)</label>
                  <input type="number" required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agency Fee (₦)</label>
                  <input type="number" required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agreement Fee (₦)</label>
                  <input type="number" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Caution Fee (₦)</label>
                  <input type="number" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Charge (₦)</label>
                  <input type="number" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Fees (₦)</label>
                  <input type="number" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
              </div>

              <div className="rounded-lg bg-brand-green/5 border border-brand-green/10 p-4">
                <p className="text-sm font-semibold text-brand-green">Why transparent pricing?</p>
                <p className="text-xs text-gray-600 mt-1">Property 9ja requires all fees to be disclosed upfront. No hidden charges for tenants.</p>
              </div>
            </>
          )}

          <div className="flex justify-between pt-4 border-t">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
            ) : <div />}
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : step === 3 ? "Submit for Review" : "Continue"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
