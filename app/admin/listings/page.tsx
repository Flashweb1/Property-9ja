"use client"

import { useState, useEffect } from "react"
import { Building, Search, Filter, MoreHorizontal, Eye, CheckCircle, XCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/shared/Avatar"
import { getAllListings } from "@/lib/api"
import { Property } from "@/types"
import { formatPrice } from "@/lib/utils"

export default function AdminListingsPage() {
  const [listings, setListings] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllListings().then((data) => {
      setListings(data)
      setLoading(false)
    })
  }, [])

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Listings</h1>
            <p className="text-gray-500 mt-1">{listings.length} total properties</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input className="w-64 rounded-lg border border-gray-300 pl-9 pr-4 py-2 text-sm focus:border-brand-green focus:outline-none" placeholder="Search listings..." />
            </div>
            <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1" />Filter</Button>
          </div>
        </div>

        <div className="rounded-xl border bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Property</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Agent</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Verification</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Price</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {listings.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={property.images[0]} alt={property.title} className="h-10 w-14 rounded object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{property.title}</p>
                          <p className="text-xs text-gray-500">{property.neighborhood}, {property.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Avatar src={property.agent.avatar} alt={property.agent.name} size="sm" />
                        <span className="text-sm text-gray-700">{property.agent.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={property.verificationStatus === "fully-verified" ? "success" : property.verificationStatus === "identity-verified" ? "secondary" : "destructive"}>
                        {property.verificationStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={property.status === "active" ? "success" : property.status === "pending" ? "secondary" : "destructive"}>
                        {property.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatPrice(property.price)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500"><Eye className="h-4 w-4" /></button>
                        <button className="p-1.5 rounded hover:bg-green-50 text-green-600"><CheckCircle className="h-4 w-4" /></button>
                        <button className="p-1.5 rounded hover:bg-red-50 text-red-500"><XCircle className="h-4 w-4" /></button>
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
