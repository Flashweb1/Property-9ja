"use client"

import { useState, useEffect } from "react"
import { Agent, Property } from "@/types"
import { getAgent, getAgentProperties } from "@/lib/api"

export function useAgent(id: string) {
  const [agent, setAgent] = useState<Agent | null>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const [a, p] = await Promise.all([getAgent(id), getAgentProperties(id)])
      setAgent(a)
      setProperties(p)
      setLoading(false)
    }
    fetch()
  }, [id])

  return { agent, properties, loading }
}
