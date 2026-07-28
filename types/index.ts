export interface Property {
  id: string
  slug: string
  title: string
  description: string
  type: "flat" | "duplex" | "self-contain" | "bungalow" | "commercial"
  status: "active" | "pending" | "rented" | "under-review"
  price: number
  address: string
  city: string
  state: string
  lga: string
  neighborhood: string
  lat: number
  lng: number
  bedrooms: number
  bathrooms: number
  toilets: number
  parking: number
  furnished: boolean
  electricity: "prepaid" | "postpaid" | "generator"
  water: "borehole" | "treated" | "none"
  security: string[]
  amenities: string[]
  images: string[]
  videoUrl?: string
  ownerId: string
  agentId: string
  verificationStatus: "unverified" | "identity-verified" | "fully-verified"
  trustScore: number
  availabilityStatus: "available" | "rented" | "unavailable"
  totalMoveInCost: number
  createdAt: string
  updatedAt: string
  agent: Agent
  pricingBreakdown: PricingBreakdown
  propertyHistory: PropertyHistoryItem[]
  nearby: NearbyItem[]
}

export interface PricingBreakdown {
  rent: number
  agencyFee: number
  agreementFee: number
  legalFee: number
  cautionFee: number
  serviceCharge: number
  otherFees: number
}

export interface PropertyHistoryItem {
  date: string
  event: string
  details: string
}

export interface NearbyItem {
  name: string
  type: "school" | "hospital" | "market" | "transport" | "mall"
  distance: string
}

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  agency?: string
  verificationStatus: "unverified" | "identity-verified" | "fully-verified"
  trustScore: number
  responseTime: string
  memberSince: string
  listingsCount: number
  propertiesSold: number
  bio: string
  reviews: Review[]
}

export interface Review {
  id: string
  userName: string
  avatar: string
  rating: number
  comment: string
  date: string
  propertyTitle: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  role: "renter" | "agent" | "landlord" | "admin"
  verificationStatus: "unverified" | "identity-verified" | "fully-verified"
  trustScore: number
}

export interface Message {
  id: string
  senderId: string
  content: string
  attachments?: string[]
  readAt?: string
  createdAt: string
}

export interface Conversation {
  id: string
  propertyId: string
  propertyTitle: string
  propertyImage: string
  participantId: string
  participantName: string
  participantAvatar: string
  participantVerified: boolean
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
}

export interface SavedSearch {
  id: string
  name: string
  filters: Record<string, any>
  alertFrequency: "instant" | "daily" | "weekly"
  createdAt: string
}

export interface VerificationItem {
  id: string
  type: "identity" | "property" | "agency"
  status: "pending" | "under-review" | "verified" | "rejected"
  submittedAt: string
  reviewedAt?: string
  notes?: string
  documents: string[]
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  image: string
  slug: string
  author: string
  tags: string[]
  category: string
  published: boolean
  createdAt: string
}
