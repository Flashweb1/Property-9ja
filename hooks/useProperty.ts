"use client"

import { useState, useEffect } from "react"
import { Property } from "@/types"
import { getPropertyBySlug, getPropertyById } from "@/lib/api"

export function useProperty(slugOrId: string) {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slugOrId) return
    setLoading(true)
    setError(null)

    Promise.all([
      getPropertyBySlug(slugOrId),
      getPropertyById(slugOrId),
    ]).then(([bySlug, byId]) => {
      setProperty(bySlug || byId || null)
      if (!bySlug && !byId) setError("Property not found")
    }).catch(() => {
      setError("Failed to load property")
    }).finally(() => {
      setLoading(false)
    })
  }, [slugOrId])

  return { property, loading, error }
}
