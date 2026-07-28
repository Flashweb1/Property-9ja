import { Property, Agent, Conversation, Message, SavedSearch, VerificationItem, User } from "@/types"
import {
  mockProperties,
  mockAgents,
  mockConversations,
  mockSavedSearches,
  mockVerifications,
  mockCurrentUser,
  mockAdminStats,
} from "./mockData"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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
  await delay(300)
  let results = [...mockProperties]

  if (filters?.q) {
    const q = filters.q.toLowerCase()
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
    )
  }
  if (filters?.location) {
    const loc = filters.location.toLowerCase()
    results = results.filter(
      (p) =>
        p.city.toLowerCase().includes(loc) ||
        p.neighborhood.toLowerCase().includes(loc) ||
        p.lga.toLowerCase().includes(loc)
    )
  }
  if (filters?.city) {
    results = results.filter((p) => p.city.toLowerCase() === filters.city!.toLowerCase())
  }
  if (filters?.type) {
    results = results.filter((p) => p.type === filters.type)
  }
  if (filters?.types && filters.types.length > 0) {
    results = results.filter((p) => filters.types!.includes(p.type))
  }
  if (filters?.minPrice) {
    results = results.filter((p) => p.price >= filters.minPrice!)
  }
  if (filters?.maxPrice) {
    results = results.filter((p) => p.price <= filters.maxPrice!)
  }
  if (filters?.bedrooms) {
    results = results.filter((p) => p.bedrooms === filters.bedrooms)
  }
  if (filters?.bathrooms) {
    results = results.filter((p) => p.bathrooms === filters.bathrooms)
  }
  if (filters?.verifiedOnly) {
    results = results.filter((p) => p.verificationStatus === "fully-verified")
  }
  if (filters?.amenities && filters.amenities.length > 0) {
    results = results.filter((p) =>
      filters.amenities!.every((a) => p.amenities.some((pa) => pa.toLowerCase().includes(a.toLowerCase())))
    )
  }

  return results
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  await delay(200)
  return mockProperties.find((p) => p.slug === slug) || null
}

export async function getPropertyById(id: string): Promise<Property | null> {
  await delay(200)
  return mockProperties.find((p) => p.id === id) || null
}

export async function getFeaturedProperties(): Promise<Property[]> {
  await delay(200)
  return mockProperties.filter((p) => p.verificationStatus === "fully-verified").slice(0, 6)
}

export async function getAgent(id: string): Promise<Agent | null> {
  await delay(200)
  return mockAgents.find((a) => a.id === id) || null
}

export async function getAgentProperties(agentId: string): Promise<Property[]> {
  await delay(200)
  return mockProperties.filter((p) => p.agentId === agentId)
}

export async function getConversations(): Promise<Conversation[]> {
  await delay(200)
  return mockConversations
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  await delay(200)
  const messages: Record<string, Message[]> = {
    "conv-1": [
      { id: "msg-1", senderId: "user-1", content: "Hi, is this property still available?", createdAt: "2024-06-20T12:00:00Z" },
      { id: "msg-2", senderId: "agent-1", content: "Yes, the property is still available. When would you like to schedule an inspection?", createdAt: "2024-06-20T12:30:00Z" },
      { id: "msg-3", senderId: "user-1", content: "This weekend works for me. Is Saturday morning available?", createdAt: "2024-06-20T13:00:00Z" },
      { id: "msg-4", senderId: "agent-1", content: "Saturday at 10am works perfectly. I'll send you the address details.", createdAt: "2024-06-20T14:30:00Z" },
    ],
    "conv-2": [
      { id: "msg-5", senderId: "agent-1", content: "Hello! I saw you're interested in the Lekki duplex. Any questions?", createdAt: "2024-06-18T09:00:00Z" },
      { id: "msg-6", senderId: "user-1", content: "Yes, what does the service charge cover?", createdAt: "2024-06-19T08:00:00Z" },
      { id: "msg-7", senderId: "agent-1", content: "The service charge covers waste disposal, security, and compound maintenance.", createdAt: "2024-06-19T10:15:00Z" },
    ],
  }
  return messages[conversationId] || []
}

export async function sendMessage(conversationId: string, content: string): Promise<Message> {
  await delay(100)
  return {
    id: `msg-${Date.now()}`,
    senderId: "user-1",
    content,
    createdAt: new Date().toISOString(),
  }
}

export async function getSavedSearches(): Promise<SavedSearch[]> {
  await delay(200)
  return mockSavedSearches
}

export async function getCurrentUser(): Promise<User> {
  await delay(100)
  return mockCurrentUser
}

export async function getAdminStats(): Promise<typeof mockAdminStats> {
  await delay(200)
  return mockAdminStats
}

export async function getVerifications(): Promise<VerificationItem[]> {
  await delay(200)
  return mockVerifications
}

export async function getUsers(): Promise<User[]> {
  await delay(300)
  return [
    mockCurrentUser,
    { id: "user-2", name: "Chioma Nwachukwu", email: "chioma@email.com", phone: "+234 802 345 6789", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", role: "renter", verificationStatus: "fully-verified", trustScore: 92 },
    { id: "user-3", name: "Emeka Okafor", email: "emeka@email.com", phone: "+234 803 456 7890", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face", role: "agent", verificationStatus: "fully-verified", trustScore: 88 },
    { id: "user-4", name: "Fatima Kuti", email: "fatima@email.com", phone: "+234 804 567 8901", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face", role: "renter", verificationStatus: "identity-verified", trustScore: 70 },
    { id: "user-5", name: "Admin User", email: "admin@verified.ng", phone: "+234 800 000 0000", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", role: "admin", verificationStatus: "fully-verified", trustScore: 100 },
  ]
}

export async function getAllListings(): Promise<Property[]> {
  await delay(200)
  return mockProperties
}
