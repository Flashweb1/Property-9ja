"use client"

import { useState, useEffect } from "react"
import { Shield, Search, CheckCircle, XCircle, Clock, FileText } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getVerifications } from "@/lib/api"
import { VerificationItem } from "@/types"
import { timeAgo } from "@/lib/utils"

export default function AdminVerificationsPage() {
  const [verifications, setVerifications] = useState<VerificationItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getVerifications().then((data) => {
      setVerifications(data)
      setLoading(false)
    })
  }, [])

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Verification Requests</h1>
            <p className="text-gray-500 mt-1">{verifications.length} requests</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input className="w-64 rounded-lg border border-gray-300 pl-9 pr-4 py-2 text-sm focus:border-brand-green focus:outline-none" placeholder="Search..." />
          </div>
        </div>

        <div className="space-y-4">
          {verifications.map((ver) => (
            <div key={ver.id} className="rounded-xl border bg-white p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    ver.status === "verified" ? "bg-green-100" : ver.status === "rejected" ? "bg-red-100" : "bg-yellow-100"
                  }`}>
                    {ver.status === "verified" ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : ver.status === "rejected" ? (
                      <XCircle className="h-6 w-6 text-red-600" />
                    ) : (
                      <Clock className="h-6 w-6 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 capitalize">{ver.type} Verification</h3>
                      <Badge variant={ver.status === "verified" ? "success" : ver.status === "rejected" ? "destructive" : "secondary"}>
                        {ver.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Submitted {timeAgo(ver.submittedAt)}</p>
                    {ver.notes && <p className="text-sm text-gray-600 mt-2">{ver.notes}</p>}

                    <div className="flex items-center gap-3 mt-3">
                      {ver.documents.map((doc, i) => (
                        <button key={i} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-green bg-gray-50 rounded-lg px-2.5 py-1.5">
                          <FileText className="h-3.5 w-3.5" />
                          {doc}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
