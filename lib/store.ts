import { create } from "zustand"
import { Property, Conversation, SavedSearch } from "@/types"

interface AppState {
  // Auth
  isAuthenticated: boolean
  userRole: "renter" | "agent" | "landlord" | "admin" | null
  setAuth: (auth: boolean, role?: "renter" | "agent" | "landlord" | "admin") => void

  // Search
  searchQuery: string
  filters: Record<string, any>
  setSearchQuery: (query: string) => void
  setFilters: (filters: Record<string, any>) => void
  resetFilters: () => void

  // Favorites
  favorites: string[]
  toggleFavorite: (propertyId: string) => void
  isFavorite: (propertyId: string) => boolean

  // UI
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  filterDrawerOpen: boolean
  setFilterDrawerOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  isAuthenticated: false,
  userRole: null,
  setAuth: (auth, role) => set({ isAuthenticated: auth, userRole: role || null }),

  searchQuery: "",
  filters: {},
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),
  resetFilters: () => set({ filters: {} }),

  favorites: [],
  toggleFavorite: (propertyId) => {
    const current = get().favorites
    if (current.includes(propertyId)) {
      set({ favorites: current.filter((id) => id !== propertyId) })
    } else {
      set({ favorites: [...current, propertyId] })
    }
  },
  isFavorite: (propertyId) => get().favorites.includes(propertyId),

  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  filterDrawerOpen: false,
  setFilterDrawerOpen: (open) => set({ filterDrawerOpen: open }),
}))
