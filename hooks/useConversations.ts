"use client"

import { useState, useEffect } from "react"
import { Conversation, Message } from "@/types"
import { getConversations, getMessages, sendMessage as apiSendMessage } from "@/lib/api"

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getConversations().then((data) => {
      setConversations(data)
      setLoading(false)
    })
  }, [])

  return { conversations, loading }
}

export function useMessages(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!conversationId) return
    setLoading(true)
    getMessages(conversationId).then((data) => {
      setMessages(data)
      setLoading(false)
    })
  }, [conversationId])

  const sendMessage = async (content: string) => {
    const msg = await apiSendMessage(conversationId, content)
    setMessages((prev) => [...prev, msg])
  }

  return { messages, loading, sendMessage }
}
