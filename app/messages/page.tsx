"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { MessageSquare, Send, Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/shared/Avatar"
import { MessageBubble } from "@/components/messaging/MessageBubble"
import { ConversationList } from "@/components/messaging/ConversationList"
import { EmptyState } from "@/components/shared/EmptyState"
import { useConversations, useMessages } from "@/hooks/useConversations"
import { mockCurrentUser } from "@/lib/mockData"

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const preselectedId = searchParams.get("agent") ? "conv-1" : undefined

  const { conversations, loading: convLoading } = useConversations()
  const [activeConvId, setActiveConvId] = useState<string | undefined>(preselectedId)
  const [newMessage, setNewMessage] = useState("")

  const { messages, loading: msgLoading, sendMessage } = useMessages(activeConvId || "")

  const activeConv = conversations.find((c) => c.id === activeConvId)
  const currentUserId = mockCurrentUser.id

  const handleSend = async () => {
    if (!newMessage.trim()) return
    await sendMessage(newMessage.trim())
    setNewMessage("")
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Conversation List - Desktop */}
      <div className="hidden md:flex md:w-80 lg:w-96 flex-col border-r bg-white">
        <div className="p-4 border-b">
          <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-verified-green" />
            Messages
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {convLoading ? (
            <div className="space-y-4 p-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="h-10 w-10 rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                    <div className="h-2 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ConversationList
              conversations={conversations}
              activeId={activeConvId}
              onSelect={setActiveConvId}
            />
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {activeConv && activeConvId ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setActiveConvId(undefined)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar src={activeConv.participantAvatar} alt={activeConv.participantName} size="md" />
              <div>
                <p className="font-semibold text-sm text-gray-900">{activeConv.participantName}</p>
                <p className="text-xs text-gray-500">{activeConv.propertyTitle}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {msgLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                </div>
              ) : (
                messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} isOwn={msg.senderId === currentUserId} />
                ))
              )}
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 hidden md:flex">
            <EmptyState
              icon={MessageSquare}
              title="Select a conversation"
              description="Choose a conversation from the left to start messaging"
            />
          </div>
        )}

        {/* Mobile: No conversation selected */}
        {!activeConvId && (
          <div className="flex-1 flex md:hidden">
            <div className="w-full">
              <div className="p-4 border-b">
                <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-verified-green" />
                  Messages
                </h1>
              </div>
              <div className="overflow-y-auto">
                {convLoading ? (
                  <div className="space-y-4 p-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex items-center gap-3 animate-pulse">
                        <div className="h-10 w-10 rounded-full bg-gray-200" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-gray-200 rounded w-3/4" />
                          <div className="h-2 bg-gray-200 rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ConversationList
                    conversations={conversations}
                    activeId={activeConvId}
                    onSelect={setActiveConvId}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
