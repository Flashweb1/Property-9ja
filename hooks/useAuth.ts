"use client"

import { User } from "@/types"
import { createClient } from "@/lib/supabaseBrowser"
import { useAppStore } from "@/lib/store"
import { useState, useEffect, useCallback } from "react"

function buildUser(authUser: any, profile?: any): User {
  return {
    id: authUser.id,
    name: profile?.name || authUser.user_metadata?.name || authUser.email || "",
    email: authUser.email || "",
    phone: profile?.phone || authUser.user_metadata?.phone || "",
    avatar: profile?.avatar_url || authUser.user_metadata?.avatar_url || "",
    role: (profile?.role || authUser.user_metadata?.role || "renter") as User["role"],
    verificationStatus: (profile?.verification_status || "unverified") as User["verificationStatus"],
    trustScore: Math.round((Number(profile?.trust_score) || 0) * 20),
  }
}

export function useAuth() {
  const { isAuthenticated, userRole, setAuth } = useAppStore()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data, error }) => {
      if (error || !data.user) {
        setLoading(false)
        return
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single()
      const u = buildUser(data.user, profile)
      setUser(u)
      setAuth(true, u.role)
      setLoading(false)
    })
  }, [setAuth])

  const login = useCallback(async (email: string, password: string) => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user!.id)
      .single()
    const u = buildUser(data.user!, profile)
    setUser(u)
    setAuth(true, u.role)
  }, [setAuth])

  const logout = useCallback(async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setAuth(false)
    setUser(null)
  }, [setAuth])

  return { isAuthenticated, user, userRole, loading, login, logout }
}
