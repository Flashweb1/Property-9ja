"use client"

import { useState, useEffect } from "react"
import { Property } from "@/types"
import { getProperties, getPropertyById, getPropertyBySlug, getFeaturedProperties, getAgentProperties } from "@/lib/api"

export function useProperties(filters?: Record<string, any>) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getProperties(filters).then((data) => {
      setProperties(data)
      setLoading(false)
    })
  }, [JSON.stringify(filters)])

  return { properties, loading }
}

export function useProperty(idOrSlug: string) {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!idOrSlug) return
    setLoading(true)
    const isSlug = idOrSlug.includes("-")
    const fetcher = isSlug ? getPropertyBySlug(idOrSlug) : getPropertyById(idOrSlug)
    fetcher.then((data) => {
      setProperty(data)
      setLoading(false)
    })
  }, [idOrSlug])

  return { property, loading }
}

export function useFeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeaturedProperties().then((data) => {
      setProperties(data)
      setLoading(false)
    })
  }, [])

  return { properties, loading }
}

export function useAgentProperties(agentId: string) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!agentId) return
    getAgentProperties(agentId).then((data) => {
      setProperties(data)
      setLoading(false)
    })
  }, [agentId])

  return { properties, loading }
}
