import { Property, Agent, Conversation, Message, SavedSearch, VerificationItem, User, BlogPost } from "@/types"
import { mockProperties } from "./mockData"

export async function getProperties(filters?: {
  q?: string
  location?: string
  city?: string
  type?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  amenities?: string[]
  verifiedOnly?: boolean
  types?: string[]
}): Promise<Property[]> {
  const params = new URLSearchParams()
  if (filters?.q) params.set("q", filters.q)
  if (filters?.city) params.set("city", filters.city)
  if (filters?.type) params.set("type", filters.type)
  if (filters?.minPrice) params.set("minPrice", String(filters.minPrice))
  if (filters?.maxPrice) params.set("maxPrice", String(filters.maxPrice))
  if (filters?.bedrooms) params.set("bedrooms", String(filters.bedrooms))
  if (filters?.bathrooms) params.set("bathrooms", String(filters.bathrooms))
  if (filters?.verifiedOnly) params.set("verifiedOnly", "true")

  try {
    const res = await fetch(`/api/properties?${params}`)
    if (!res.ok) throw new Error("Failed to fetch")
    const data = await res.json()
    return data.properties || []
  } catch {
    return mockProperties
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const res = await fetch(`/api/properties/${slug}`)
    if (!res.ok) return null
    const data = await res.json()
    return data.property || null
  } catch {
    return mockProperties.find((p) => p.slug === slug) || null
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  return getPropertyBySlug(id)
}

export async function getFeaturedProperties(): Promise<Property[]> {
  try {
    const res = await fetch("/api/properties?limit=8&sort=trust")
    if (!res.ok) throw new Error("Failed")
    const data = await res.json()
    return data.properties?.filter((p: Property) => p.verificationStatus === "fully-verified").slice(0, 6) || []
  } catch {
    return mockProperties.filter((p) => p.verificationStatus === "fully-verified").slice(0, 6)
  }
}

export async function getAgent(id: string): Promise<Agent | null> {
  try {
    const res = await fetch(`/api/agent/${id}`)
    if (!res.ok) return null
    const data = await res.json()
    return data.agent || null
  } catch {
    return null
  }
}

export async function getAgentProperties(agentId: string): Promise<Property[]> {
  try {
    const res = await fetch(`/api/properties?limit=50`)
    if (!res.ok) return []
    const data = await res.json()
    return data.properties?.filter((p: Property) => p.agentId === agentId) || []
  } catch {
    return mockProperties.filter((p) => p.agentId === agentId)
  }
}

export async function getConversations(): Promise<Conversation[]> {
  try {
    const res = await fetch("/api/conversations")
    if (!res.ok) return []
    const data = await res.json()
    return data.conversations || []
  } catch {
    return []
  }
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  try {
    const res = await fetch(`/api/conversations/${conversationId}/messages`)
    if (!res.ok) return []
    const data = await res.json()
    return data.messages || []
  } catch {
    return []
  }
}

export async function sendMessage(conversationId: string, content: string): Promise<Message | null> {
  try {
    const res = await fetch(`/api/conversations/${conversationId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.message || null
  } catch {
    return null
  }
}

export async function startConversation(propertyId: string, agentId: string, message: string) {
  try {
    const res = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId, agentId, message }),
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function toggleFavorite(propertyId: string): Promise<boolean | null> {
  try {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.favorited
  } catch {
    return null
  }
}

export async function getFavorites(): Promise<string[]> {
  try {
    const res = await fetch("/api/favorites")
    if (!res.ok) return []
    const data = await res.json()
    return data.favorites || []
  } catch {
    return []
  }
}

export async function getSavedSearches(): Promise<SavedSearch[]> {
  return []
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const res = await fetch("/api/user")
    if (!res.ok) return null
    const data = await res.json()
    return data.user || null
  } catch {
    return null
  }
}

export async function getAdminStats() {
  try {
    const res = await fetch("/api/admin/stats")
    if (!res.ok) throw new Error("Failed")
    return await res.json()
  } catch {
    return { totalProperties: 0, totalUsers: 0, pendingVerifications: 0, totalViews: "0" }
  }
}

export async function getVerifications(): Promise<VerificationItem[]> {
  try {
    const res = await fetch("/api/admin/verifications")
    if (!res.ok) return []
    const data = await res.json()
    return data.verifications || []
  } catch {
    return []
  }
}

export async function getAllListings(): Promise<Property[]> {
  return getProperties()
}

export async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch("/api/admin/users")
    if (!res.ok) return []
    const data = await res.json()
    return data.users || []
  } catch {
    return []
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch("/api/blog")
    if (!res.ok) return []
    const data = await res.json()
    return data.posts || []
  } catch {
    return []
  }
}

export async function naturalSearch(query: string): Promise<Record<string, any> | null> {
  try {
    const res = await fetch("/api/ai/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.filters || null
  } catch {
    return null
  }
}

export async function generateDescription(details: Record<string, any>): Promise<string | null> {
  try {
    const res = await fetch("/api/ai/describe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.description || null
  } catch {
    return null
  }
}

export async function askChatbot(message: string): Promise<string | null> {
  try {
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.reply || null
  } catch {
    return null
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`/api/blog/${slug}`)
    if (!res.ok) return null
    const data = await res.json()
    return data.post || null
  } catch {
    return null
  }
}
