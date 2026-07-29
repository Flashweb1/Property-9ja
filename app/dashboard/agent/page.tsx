"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Building, Eye, MessageSquare, TrendingUp, Users, Plus, Star, Clock } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { getProperties } from "@/lib/api"
import { Property } from "@/types"
import { formatPrice } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"

export default function AgentDashboardPage() {
  const { user } = useAuth()
  const [listings, setListings] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const agentId = user?.id || ""

  useEffect(() => {
    if (!agentId) return
    getProperties().then((all) => {
      setListings(all.filter((p) => p.agentId === agentId))
      setLoading(false)
    })
  }, [agentId])

  const stats = [
    { icon: Building, label: "Active Listings", value: listings.length, color: "text-brand-navy bg-brand-navy/10" },
    { icon: Eye, label: "Total Views", value: "1,234", color: "text-brand-green bg-brand-green/10" },
    { icon: MessageSquare, label: "Inquiries", value: "28", color: "text-brand-green-light bg-brand-green-light/10" },
    { icon: Star, label: "Trust Score", value: "92%", color: "text-brand-gold bg-brand-gold/10" },
  ]

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back</p>
          </div>
          <Link href="/dashboard/agent/listings/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Listing
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-white p-5">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${stat.color} mb-3`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Listings */}
        <div className="rounded-xl border bg-white">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="font-semibold text-gray-900">Recent Listings</h2>
            <Link href="/dashboard/agent/listings" className="text-sm text-brand-green hover:underline">View all</Link>
          </div>
          <div className="divide-y">
            {listings.map((property) => (
              <div key={property.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <img src={property.images[0]} alt={property.title} className="h-14 w-20 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 truncate">{property.title}</p>
                  <p className="text-xs text-gray-500">{property.neighborhood}, {property.city}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold text-brand-green">{formatPrice(property.price)}</p>
                  <p className="text-xs text-gray-500 capitalize">{property.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
