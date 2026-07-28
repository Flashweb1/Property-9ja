"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  MapPin, Bed, Bath, Car, Calendar, Shield, Share2, Heart,
  ChevronLeft, Building, Phone, Mail, Clock, Star, CheckCircle,
  AlertCircle, Flag
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PropertyGallery } from "@/components/property/PropertyGallery"
import { PriceBreakdownPanel } from "@/components/property/PriceBreakdown"
import { VerificationBadge } from "@/components/shared/VerificationBadge"
import { TrustScore } from "@/components/shared/TrustScore"
import { Avatar } from "@/components/shared/Avatar"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { ScheduleViewing } from "@/components/shared/ScheduleViewing"
import { ReportListing } from "@/components/shared/ReportListing"
import { PropertyDetailSkeleton } from "@/components/shared/LoadingSkeleton"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useProperty } from "@/hooks/useProperties"
import { useAppStore } from "@/lib/store"
import { formatPrice, cn } from "@/lib/utils"
import { useToast } from "@/components/shared/Toast"

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { property, loading } = useProperty(id)
  const { toggleFavorite, isFavorite } = useAppStore()
  const { toast } = useToast()
  const [showSchedule, setShowSchedule] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [recent, setRecent] = useState<any[]>([])

  useEffect(() => {
    if (property) {
      try {
        const stored = JSON.parse(localStorage.getItem("recently-viewed") || "[]")
        const updated = [property.id, ...stored.filter((x: string) => x !== property.id)].slice(0, 10)
        localStorage.setItem("recently-viewed", JSON.stringify(updated))
        Promise.all(
          updated.filter((x: string) => x !== property.id).slice(0, 4).map(
            (pid: string) => import("@/lib/api").then((m: any) => m.getPropertyById(pid))
          )
        ).then((results) => setRecent(results.filter(Boolean)))
      } catch {}
    }
  }, [property])

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: property?.title, url: window.location.href })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast("success", "Link copied to clipboard")
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8"><PropertyDetailSkeleton /></div>
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900">Property not found</h2>
        <p className="text-gray-500 mt-2 mb-6">This property may have been removed or doesn't exist.</p>
        <Link href="/search"><Button>Browse Properties</Button></Link>
      </div>
    )
  }

  const favorited = isFavorite(property.id)

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/search" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <ChevronLeft className="h-4 w-4" />
            Back to results
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => { toggleFavorite(property.id); toast("success", favorited ? "Removed from saved" : "Property saved") }}>
              <Heart className={cn("h-4 w-4 mr-1", favorited ? "fill-red-500 text-red-500" : "")} />
              {favorited ? "Saved" : "Save"}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}><Share2 className="h-4 w-4 mr-1" />Share</Button>
            <Button variant="ghost" size="sm" onClick={() => setShowReport(true)} className="text-gray-400 hover:text-red-500">
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs items={[
          { label: "Search", href: "/search" },
          { label: property.neighborhood, href: `/search?location=${encodeURIComponent(property.neighborhood)}` },
          { label: property.title },
        ]} />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyGallery images={property.images} videoUrl={property.videoUrl} />

            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <VerificationBadge status={property.verificationStatus} size="md" />
                    <Badge variant="outline">{property.type.charAt(0).toUpperCase() + property.type.slice(1)}</Badge>
                    <Badge variant={property.availabilityStatus === "available" ? "success" : "secondary"}>
                      {property.availabilityStatus}
                    </Badge>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
                  <div className="flex items-center gap-1 mt-2 text-gray-500">
                    <MapPin className="h-4 w-4 text-verified-green" />
                    <span>{property.address}, {property.neighborhood}, {property.city}, {property.state}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl md:text-3xl font-bold text-verified-green">{formatPrice(property.price)}</p>
                  <p className="text-sm text-gray-500">per year</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Bed, label: "Bedrooms", value: property.bedrooms },
                { icon: Bath, label: "Bathrooms", value: property.bathrooms },
                { icon: Car, label: "Parking", value: property.parking },
                { icon: Building, label: "Type", value: property.type },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border bg-white p-4 text-center">
                  <stat.icon className="h-5 w-5 text-verified-green mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            <Tabs defaultValue="amenities">
              <TabsList>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="history">Property History</TabsTrigger>
                <TabsTrigger value="nearby">Nearby Places</TabsTrigger>
              </TabsList>

              <TabsContent value="amenities">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { label: "Furnished", value: property.furnished ? "Yes" : "No" },
                    { label: "Electricity", value: property.electricity },
                    { label: "Water Supply", value: property.water },
                    ...property.amenities.map((a) => ({ label: a, value: "Yes" })),
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-verified-green flex-shrink-0" />
                      <span className="capitalize">{item.label.replace(/-/g, " ")}</span>
                    </div>
                  ))}
                </div>
                {property.security.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Security Features</p>
                    <div className="flex flex-wrap gap-2">
                      {property.security.map((s) => (
                        <Badge key={s} variant="secondary">{s.replace(/-/g, " ")}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="history">
                <div className="space-y-4">
                  {property.propertyHistory.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-3 w-3 rounded-full bg-verified-green border-2 border-verified-green-light" />
                        {idx < property.propertyHistory.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 mt-1" />}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-semibold text-gray-900">{item.event}</p>
                        <p className="text-sm text-gray-500">{item.details}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="nearby">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.nearby.map((place, idx) => (
                    <div key={idx} className="flex items-center gap-3 rounded-lg border p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-verified-green/10">
                        <MapPin className="h-5 w-5 text-verified-green" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{place.name}</p>
                        <p className="text-xs text-gray-500">{place.distance} &bull; {place.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border bg-white p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar src={property.agent.avatar} alt={property.agent.name} size="lg" />
                <div>
                  <Link href={`/agent/${property.agent.id}`} className="font-semibold text-gray-900 hover:text-verified-green">
                    {property.agent.name}
                  </Link>
                  {property.agent.agency && (
                    <p className="text-sm text-gray-500">{property.agent.agency}</p>
                  )}
                  <div className="flex items-center gap-1 mt-1">
                    <VerificationBadge status={property.agent.verificationStatus} size="sm" />
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4 text-verified-green" />
                  <span>{property.agent.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4 text-verified-green" />
                  <span>{property.agent.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4 text-verified-green" />
                  <span>Response: {property.agent.responseTime}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4 text-verified-green" />
                  <span>Member since {new Date(property.agent.memberSince).getFullYear()}</span>
                </div>
              </div>

              <TrustScore score={property.agent.trustScore} className="mt-4 pt-4 border-t" />

              <div className="mt-4 space-y-2">
                <Button className="w-full gap-2" onClick={() => setShowSchedule(true)}>
                  <Calendar className="h-4 w-4" />
                  Schedule Viewing
                </Button>
                <div className="flex gap-2">
                  <Link href={`/messages?agent=${property.agent.id}&property=${property.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">Send Message</Button>
                  </Link>
                  <Button variant="outline" onClick={() => { navigator.clipboard.writeText(property.agent.phone); toast("success", "Phone number copied") }}>
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <PriceBreakdownPanel pricing={property.pricingBreakdown} total={property.totalMoveInCost} />

            <div className="rounded-xl border bg-white p-5">
              <TrustScore score={property.trustScore} size="lg" />
            </div>
          </div>
        </div>
      </div>

      {recent.length > 0 && (
        <div className="border-t bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recently Viewed</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recent.map((p: any) => (
                <Link key={p.id} href={`/property/${p.id}`} className="group flex gap-3 rounded-lg border bg-white p-3 hover:shadow-md transition-shadow">
                  <img src={p.images[0]} alt={p.title} className="h-16 w-16 rounded-lg object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-verified-green">{p.title}</p>
                    <p className="text-xs text-gray-500 truncate">{p.neighborhood}</p>
                    <p className="text-xs font-bold text-verified-green mt-0.5">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {showSchedule && (
        <ScheduleViewing propertyTitle={property.title} agentName={property.agent.name} onClose={() => setShowSchedule(false)} />
      )}
      {showReport && (
        <ReportListing propertyTitle={property.title} onClose={() => setShowReport(false)} />
      )}
    </div>
  )
}
