"use client"

import { TrendingUp, Eye, MessageSquare, Star, Users, ArrowUp, ArrowDown } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"

export default function AnalyticsPage() {
  const metrics = [
    { label: "Profile Views", value: "1,234", change: "+12%", up: true, icon: Eye },
    { label: "Listing Views", value: "4,567", change: "+8%", up: true, icon: TrendingUp },
    { label: "Inquiries", value: "28", change: "-3%", up: false, icon: MessageSquare },
    { label: "Conversion Rate", value: "12.5%", change: "+2.1%", up: true, icon: Users },
  ]

  return (
    <DashboardLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">Track your performance and listing engagement</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-xl border bg-white p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <m.icon className="h-5 w-5 text-gray-600" />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${m.up ? "text-green-600" : "text-red-600"}`}>
                  {m.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {m.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{m.value}</p>
              <p className="text-sm text-gray-500">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border bg-white p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Views Over Time</h2>
            <div className="h-48 flex items-end justify-between gap-2">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-brand-green/20 rounded-t" style={{ height: `${h}%` }}>
                    <div className="w-full bg-brand-green rounded-t" style={{ height: `${h * 0.7}%` }} />
                  </div>
                  <span className="text-[10px] text-gray-400">W{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Top Performing Listings</h2>
            <div className="space-y-4">
              {["Modern 2-Bedroom Flat Near UNILAG", "Luxury 3-Bedroom Duplex in Lekki Phase 1", "Spacious 4-Bedroom Bungalow in Ikeja GRA"].map((title, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
                    <p className="text-xs text-gray-500">{[234, 156, 98][i]} views</p>
                  </div>
                  <Star className="h-4 w-4 text-yellow-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
