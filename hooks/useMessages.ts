"use client"

import { useState, useEffect } from "react"
import { Message } from "@/types"
import { getMessages, sendMessage } from "@/lib/api"

export function useMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!conversationId) {
      setMessages([])
      return
    }
    setLoading(true)
    getMessages(conversationId).then(setMessages).finally(() => setLoading(false))
  }, [conversationId])

  const send = async (content: string) => {
    if (!conversationId) return
    const id: string = conversationId
    const msg = await sendMessage(id, content)
    if (msg) setMessages((prev) => [...prev, msg])
  }

  return { messages, loading, send }
}
