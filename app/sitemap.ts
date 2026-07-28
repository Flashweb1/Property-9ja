import { MetadataRoute } from "next"
import { mockProperties } from "@/lib/mockData"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://verified.ng"

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${baseUrl}/register`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${baseUrl}/verify`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
  ]

  const propertyPages = mockProperties.map((property) => ({
    url: `${baseUrl}/property/${property.id}`,
    lastModified: new Date(property.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const agentIds = Array.from(new Set(mockProperties.map((p) => p.agentId)))
  const agentPages = agentIds.map((agentId) => ({
    url: `${baseUrl}/agent/${agentId}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...propertyPages, ...agentPages]
}
