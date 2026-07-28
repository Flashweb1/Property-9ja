"use client"

import { PricingBreakdown } from "@/types"
import { formatPrice } from "@/lib/utils"
import { Receipt, AlertCircle } from "lucide-react"

interface PriceBreakdownProps {
  pricing: PricingBreakdown
  total: number
}

export function PriceBreakdownPanel({ pricing, total }: PriceBreakdownProps) {
  const items = [
    { label: "Rent (1 year)", value: pricing.rent },
    { label: "Agency Fee", value: pricing.agencyFee, note: `${Math.round((pricing.agencyFee / pricing.rent) * 100)}%` },
    { label: "Agreement Fee", value: pricing.agreementFee },
    { label: "Legal Fee", value: pricing.legalFee },
    { label: "Caution Fee", value: pricing.cautionFee },
    { label: "Service Charge", value: pricing.serviceCharge },
  ]

  if (pricing.otherFees > 0) {
    items.push({ label: "Other Fees", value: pricing.otherFees })
  }

  return (
    <div className="rounded-xl border bg-white overflow-hidden">
      <div className="bg-brand-green/5 border-b border-brand-green/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-brand-green" />
          <h3 className="font-semibold text-gray-900">Total Move-In Cost Breakdown</h3>
        </div>
        <p className="text-xs text-gray-500 mt-1">No hidden fees. No surprises.</p>
      </div>

      <div className="p-5">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center gap-2">
                {item.label}
                {item.note && (
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{item.note}</span>
                )}
              </span>
              <span className="font-medium text-gray-900">{formatPrice(item.value)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t-2 border-dashed border-brand-green/20">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">Total First Payment</span>
            <span className="text-xl font-bold text-brand-green">{formatPrice(total)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 p-3">
          <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            This is the total amount you'll need to pay before moving in. Some fees like caution deposit may be refundable at the end of your tenancy.
          </p>
        </div>
      </div>
    </div>
  )
}
