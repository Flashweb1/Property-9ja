"use client"

import { Users, Mail, Phone, MessageSquare, Clock, MoreHorizontal } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Avatar } from "@/components/shared/Avatar"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/shared/EmptyState"
import { formatNumber, timeAgo } from "@/lib/utils"

const leads = [
  { id: "1", name: "Chioma Nwachukwu", email: "chioma@email.com", phone: "+234 802 345 6789", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", property: "Modern 2-Bedroom Flat Near UNILAG", status: "new", date: "2024-06-20T10:00:00Z", message: "Is this still available?" },
  { id: "2", name: "Emeka Okafor", email: "emeka@email.com", phone: "+234 803 456 7890", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", property: "Luxury 3-Bedroom Duplex in Lekki Phase 1", status: "contacted", date: "2024-06-19T14:30:00Z", message: "Can I schedule a viewing?" },
  { id: "3", name: "Fatima Kuti", email: "fatima@email.com", phone: "+234 804 567 8901", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", property: "Spacious 4-Bedroom Bungalow in Ikeja GRA", status: "interested", date: "2024-06-18T09:00:00Z", message: "What's the total move-in cost?" },
]

export default function LeadsPage() {
  return (
    <DashboardLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-500 mt-1">{leads.length} potential tenants</p>
        </div>

        <div className="space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="rounded-xl border bg-white p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <Avatar src={lead.avatar} alt={lead.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{lead.name}</p>
                      <p className="text-xs text-gray-500">{lead.property}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={lead.status === "new" ? "default" : "secondary"}>
                        {lead.status}
                      </Badge>
                      <span className="text-xs text-gray-400">{timeAgo(lead.date)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 bg-gray-50 rounded-lg p-3">&ldquo;{lead.message}&rdquo;</p>
                  <div className="flex items-center gap-4 mt-3">
                    <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-verified-green">
                      <Mail className="h-3.5 w-3.5" />
                      {lead.email}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-verified-green">
                      <Phone className="h-3.5 w-3.5" />
                      {lead.phone}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-verified-green font-medium hover:underline">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
