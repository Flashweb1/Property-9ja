"use client"

import Link from "next/link"
import { Phone, Mail, Clock, Calendar, Building, Star, MapPin, Shield, ChevronLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VerificationBadge } from "@/components/shared/VerificationBadge"
import { TrustScore } from "@/components/shared/TrustScore"
import { Avatar } from "@/components/shared/Avatar"
import { PropertyCard } from "@/components/property/PropertyCard"
import { PropertyCardSkeleton } from "@/components/shared/LoadingSkeleton"
import { getAgent, getAgentProperties } from "@/lib/api"
import { useState, useEffect } from "react"
import { Agent, Property } from "@/types"

export default function AgentProfilePage({ params }: { params: { id: string } }) {
  const { id } = params
  const [agent, setAgent] = useState<Agent | null>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAgent(id), getAgentProperties(id)]).then(([a, p]) => {
      setAgent(a)
      setProperties(p)
      setLoading(false)
    })
  }, [id])

  if (loading) return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-6">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-gray-200" />
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-48" />
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => <PropertyCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  )

  if (!agent) return (
    <div className="container mx-auto px-4 py-16 text-center">
      <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-gray-900">Agent not found</h2>
      <p className="text-gray-500 mt-2 mb-6">This agent profile doesn't exist or has been removed.</p>
      <Link href="/search"><Button>Browse Properties</Button></Link>
    </div>
  )

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Link href="/search" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <ChevronLeft className="h-4 w-4" />
            Back to search
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Agent Header */}
        <div className="bg-white rounded-xl border p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <Avatar src={agent.avatar} alt={agent.name} size="xl" />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
                    <VerificationBadge status={agent.verificationStatus} size="md" />
                  </div>
                  {agent.agency && (
                    <p className="text-gray-500 flex items-center gap-1.5">
                      <Building className="h-4 w-4" />
                      {agent.agency}
                    </p>
                  )}
                </div>
                <TrustScore score={agent.trustScore} size="md" showLabel={false} />
              </div>

              <p className="text-gray-600 mt-4 leading-relaxed max-w-2xl">{agent.bio}</p>

              <div className="flex flex-wrap gap-6 mt-5 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4 text-verified-green" />
                  {agent.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4 text-verified-green" />
                  {agent.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4 text-verified-green" />
                  Response: {agent.responseTime}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4 text-verified-green" />
                  Member since {new Date(agent.memberSince).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button className="gap-2">
                  <Mail className="h-4 w-4" />
                  Send Message
                </Button>
                <Button variant="outline" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call Agent
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t">
            {[
              { label: "Listings", value: agent.listingsCount, icon: Building },
              { label: "Properties Sold", value: agent.propertiesSold, icon: Shield },
              { label: "Reviews", value: agent.reviews.length, icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-5 w-5 text-verified-green mx-auto mb-1" />
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        {agent.reviews.length > 0 && (
          <div className="bg-white rounded-xl border p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Reviews ({agent.reviews.length})</h2>
            <div className="space-y-4">
              {agent.reviews.map((review) => (
                <div key={review.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <Avatar src={review.avatar} alt={review.userName} size="md" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900 text-sm">{review.userName}</p>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`h-3.5 w-3.5 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                    <p className="text-xs text-gray-400 mt-1">Property: {review.propertyTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agent's Listings */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Listings by {agent.name}</h2>
          {properties.length === 0 ? (
            <p className="text-gray-500 text-sm">No active listings at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
