"use client"

import Link from "next/link"
import { Building, Plus, Edit3, Trash2, Eye, Copy } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockProperties, mockAgents } from "@/lib/mockData"
import { formatPrice } from "@/lib/utils"

export default function AgentListingsPage() {
  const agent = mockAgents[0]
  const listings = mockProperties.filter((p) => p.agentId === agent.id)

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
            <p className="text-gray-500 mt-1">{listings.length} total listings</p>
          </div>
          <Link href="/dashboard/agent/listings/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Listing
            </Button>
          </Link>
        </div>

        <div className="rounded-xl border bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Property</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Price</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Views</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {listings.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={property.images[0]} alt={property.title} className="h-12 w-16 rounded-lg object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <Link href={`/property/${property.id}`} className="text-sm font-semibold text-gray-900 hover:text-verified-green truncate block">
                            {property.title}
                          </Link>
                          <p className="text-xs text-gray-500">{property.neighborhood}, {property.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={property.status === "active" ? "success" : "secondary"}>
                        {property.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatPrice(property.price)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">142</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"><Eye className="h-4 w-4" /></button>
                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"><Copy className="h-4 w-4" /></button>
                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"><Edit3 className="h-4 w-4" /></button>
                        <button className="p-2 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
