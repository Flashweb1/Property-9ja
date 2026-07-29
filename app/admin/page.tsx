"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, Users, Building, TrendingUp, AlertTriangle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { getAdminStats, getVerifications } from "@/lib/api"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalProperties: 0, totalUsers: 0, pendingVerifications: 0, totalViews: "0" })
  const [pendingList, setPendingList] = useState<any[]>([])

  useEffect(() => {
    getAdminStats().then(setStats)
    getVerifications().then((v) => setPendingList(v.filter((x) => x.status === "pending").slice(0, 5)))
  }, [])

  const cards = [
    { icon: Building, label: "Properties", value: stats.totalProperties, href: "/admin/listings", color: "text-brand-navy bg-brand-navy/10" },
    { icon: Users, label: "Users", value: stats.totalUsers, href: "/admin/users", color: "text-brand-green bg-brand-green/10" },
    { icon: Shield, label: "Pending Verifications", value: stats.pendingVerifications, href: "/admin/verifications", color: "text-brand-gold bg-brand-gold/10" },
    { icon: TrendingUp, label: "Total Views", value: stats.totalViews, href: "#", color: "text-brand-green-light bg-brand-green-light/10" },
  ]

  return (
    <DashboardLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your property marketplace</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <Link key={card.label} href={card.href} className="rounded-xl border bg-white p-5 hover:shadow-md transition-shadow">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${card.color} mb-3`}>
                <card.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </Link>
          ))}
        </div>

        {/* Recent Verification Requests */}
        <div className="rounded-xl border bg-white">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="font-semibold text-gray-900">Pending Verifications</h2>
            <Link href="/admin/verifications" className="text-sm text-brand-green hover:underline">View all</Link>
          </div>
          {pendingList.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500 text-sm">
              <Shield className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              No pending verifications
            </div>
          ) : (
            <div className="divide-y">
              {pendingList.map((v: any) => (
                <div key={v.id} className="flex items-center gap-3 px-6 py-3">
                  <AlertTriangle className="h-4 w-4 text-brand-gold" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate capitalize">{v.type} Verification</p>
                    <p className="text-xs text-gray-500">Submitted {new Date(v.submittedAt).toLocaleDateString()}</p>
                  </div>
                  <Link href="/admin/verifications" className="text-xs text-brand-green font-medium hover:underline">Review</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
