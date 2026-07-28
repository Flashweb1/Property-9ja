"use client"

import { User } from "@/types"
import { getCurrentUser } from "@/lib/api"
import { useAppStore } from "@/lib/store"
import { useState, useEffect } from "react"

export function useAuth() {
  const { isAuthenticated, userRole, setAuth } = useAppStore()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser().then((data) => {
      setUser(data)
      setLoading(false)
    })
  }, [])

  const login = (email: string, password: string) => {
    setAuth(true, "renter")
    return Promise.resolve()
  }

  const logout = () => {
    setAuth(false)
    setUser(null)
  }

  return { isAuthenticated, user, userRole, loading, login, logout }
}
