"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Shield, Upload, CheckCircle, AlertCircle, FileText, Camera, Building, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const verificationTypes = [
  { id: "identity", label: "Identity Verification", icon: User, desc: "Verify your identity with NIN, Driver's License, or International Passport" },
  { id: "agency", label: "Agency Verification", icon: Building, desc: "Verify your registered business with CAC documents" },
  { id: "property", label: "Property Verification", icon: FileText, desc: "Submit proof of ownership or authorization to list" },
]

export default function VerifyPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => { document.title = "Get Verified | Property 9ja" }, [])

  const handleSubmit = async () => {
    if (!selectedType) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/verifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestType: selectedType, notes: "" }),
      })
      if (res.ok) setSubmitted(true)
    } catch {
      // submission failed silently
    }
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Submitted</h2>
          <p className="text-gray-500 mb-6">
            Your documents have been submitted for review. Our team will verify them within 24-48 hours.
            You'll receive a notification once the verification is complete.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-yellow-800">What happens next?</p>
                <ul className="text-xs text-yellow-700 mt-2 space-y-1">
                  <li>Our team reviews your submitted documents</li>
                  <li>You may be contacted for additional information</li>
                  <li>Once verified, your trust score will be updated</li>
                  <li>Verified badge will appear on your profile</li>
                </ul>
              </div>
            </div>
          </div>
          <Button onClick={() => { setSubmitted(false); setSelectedType(null) }}>Submit Another Verification</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
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
          <h1 className="text-3xl font-bold text-gray-900">Get Verified</h1>
          <p className="text-gray-500 mt-2">Build trust with tenants and landlords through Property 9ja&apos;s verification system</p>
        </div>

        {!selectedType ? (
          <div className="grid gap-4">
            {verificationTypes.map((vt) => (
              <button
                key={vt.id}
                onClick={() => setSelectedType(vt.id)}
                className="group text-left rounded-xl border bg-white p-6 hover:border-brand-green hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-green/10 group-hover:bg-brand-green/20 transition-colors">
                    <vt.icon className="h-7 w-7 text-brand-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{vt.label}</h3>
                    <p className="text-sm text-gray-500 mt-1">{vt.desc}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <Badge variant="secondary">Free</Badge>
                      <span className="text-xs text-gray-400">Takes 24-48 hours</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    <div className="h-8 w-8 rounded-full border-2 border-gray-200 group-hover:border-brand-green flex items-center justify-center transition-colors">
                      <div className="h-3 w-3 rounded-full bg-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <button onClick={() => setSelectedType(null)} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
              ← Back to verification types
            </button>

            <div className="rounded-xl border bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1 capitalize">{selectedType} Verification</h2>
              <p className="text-sm text-gray-500 mb-6">Upload the required documents below</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-brand-green transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, or PNG (max 10MB)</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {["NIN Front", "NIN Back", "Selfie", "Signature"].map((doc) => (
                    <div key={doc} className="rounded-lg border border-dashed border-gray-300 p-4 text-center hover:border-brand-green transition-colors cursor-pointer">
                      <Camera className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs font-medium text-gray-700">{doc}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (optional)</label>
                  <textarea rows={3} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" placeholder="Any additional information for the verification team..." />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-blue-800">Document Requirements</p>
                      <ul className="text-xs text-blue-700 mt-1 space-y-0.5">
                        <li>All documents must be clear and legible</li>
                        <li>Accepted formats: PDF, JPG, PNG</li>
                        <li>Maximum file size: 10MB per file</li>
                        <li>Your data is encrypted and securely stored</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button className="w-full h-12" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Submitting..." : `Submit ${selectedType} Verification`}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
