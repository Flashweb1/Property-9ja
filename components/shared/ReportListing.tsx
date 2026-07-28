"use client"

import { useState } from "react"
import { Flag, X, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReportListingProps {
  propertyTitle: string
  onClose: () => void
}

const reasons = [
  "Fake or misleading listing",
  "Property not available",
  "Wrong price or fees",
  "Suspicious agent behavior",
  "Duplicate listing",
  "Inappropriate content",
  "Other",
]

export function ReportListing({ propertyTitle, onClose }: ReportListingProps) {
  const [selected, setSelected] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Report Submitted</h3>
          <p className="text-sm text-gray-500 mb-6">
            Thank you. Our team will review this listing and take appropriate action within 24 hours.
          </p>
          <Button onClick={onClose} className="w-full">Done</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-bold text-gray-900">Report Listing</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X className="h-5 w-5" /></button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Why are you reporting <strong className="text-gray-700">{propertyTitle}</strong>?
        </p>
        <div className="space-y-2 mb-6">
          {reasons.map((r) => (
            <label
              key={r}
              className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                selected === r ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="reason"
                value={r}
                checked={selected === r}
                onChange={() => setSelected(r)}
                className="h-4 w-4 text-red-500 focus:ring-red-400"
              />
              <span className="text-sm text-gray-700">{r}</span>
            </label>
          ))}
        </div>
        <div className="flex items-start gap-2 bg-yellow-50 rounded-lg p-3 mb-4">
          <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-yellow-700">Abusive reports may result in account suspension.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button className="flex-1 bg-red-600 hover:bg-red-700" disabled={!selected} onClick={() => setSubmitted(true)}>
            Submit Report
          </Button>
        </div>
      </div>
    </div>
  )
}
