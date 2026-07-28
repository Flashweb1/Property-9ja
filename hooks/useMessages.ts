"use client"

import { useState, useEffect } from "react"
import { Conversation, Message } from "@/types"
import { getConversations, getMessages, sendMessage } from "@/lib/api"

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getConversations().then(setConversations).finally(() => setLoading(false))
  }, [])

  return { conversations, loading }
}

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
    const msg = await sendMessage(conversationId, content)
    setMessages((prev) => [...prev, msg])
  }

  return { messages, loading, send }
}
