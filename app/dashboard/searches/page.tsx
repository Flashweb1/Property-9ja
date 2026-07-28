"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Bell, BellOff, Trash2, Clock, Edit3 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/shared/EmptyState"
import { getSavedSearches } from "@/lib/api"
import { SavedSearch } from "@/types"

export default function SavedSearchesPage() {
  const [searches, setSearches] = useState<SavedSearch[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSavedSearches().then((data) => {
      setSearches(data)
      setLoading(false)
    })
  }, [])

  return (
    <DashboardLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Saved Searches</h1>
          <p className="text-gray-500 mt-1">Get notified when new properties match your criteria</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse rounded-xl border bg-white p-5">
                <div className="h-5 bg-gray-200 rounded w-48 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-64 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-32" />
              </div>
            ))}
          </div>
        ) : searches.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No saved searches"
            description="Save your search filters to get alerts when new properties match"
          />
        ) : (
          <div className="space-y-4">
            {searches.map((search) => {
              const filters = search.filters as Record<string, any>
              return (
                <div key={search.id} className="rounded-xl border bg-white p-5 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10">
                        <Search className="h-5 w-5 text-brand-green" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{search.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {Object.entries(filters).map(([key, value]) => (
                            <Badge key={key} variant="secondary" className="text-xs">
                              {key}: {String(value)}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Created {new Date(search.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            {search.alertFrequency === "instant" ? (
                              <Bell className="h-3 w-3 text-brand-green" />
                            ) : (
                              <BellOff className="h-3 w-3 text-gray-400" />
                            )}
                            {search.alertFrequency} alerts
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm"><Edit3 className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
