"use client"

import { useState, useEffect, useCallback } from "react"
import { Conversation, Message } from "@/types"
import { getConversations, getMessages, sendMessage as apiSendMessage } from "@/lib/api"
import { supabase } from "@/lib/supabase"

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

  useEffect(() => {
    if (!conversationId) return

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMsg: Message = {
            id: payload.new.id,
            senderId: payload.new.sender_id,
            content: payload.new.content,
            createdAt: payload.new.created_at,
          }
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev
            return [...prev, newMsg]
          })
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [conversationId])

  const sendMessage = useCallback(async (content: string) => {
    const msg = await apiSendMessage(conversationId, content)
    if (msg) setMessages((prev) => {
      if (prev.some((m) => m.id === msg.id)) return prev
      return [...prev, msg]
    })
  }, [conversationId])

  return { messages, loading, sendMessage }
}
