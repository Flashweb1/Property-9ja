"use client"

import { Conversation } from "@/types"
import { Avatar } from "@/components/shared/Avatar"
import { cn, timeAgo } from "@/lib/utils"

interface ConversationListProps {
  conversations: Conversation[]
  activeId?: string
  onSelect: (id: string) => void
}

export function ConversationList({ conversations, activeId, onSelect }: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-gray-500">
        No conversations yet
      </div>
    )
  }

  return (
    <div className="divide-y">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv.id)}
          className={cn(
            "flex items-start gap-3 w-full text-left p-4 hover:bg-gray-50 transition-colors",
            activeId === conv.id && "bg-verified-green/5"
          )}
        >
          <div className="relative flex-shrink-0">
            <Avatar src={conv.participantAvatar} alt={conv.participantName} size="md" />
            {conv.participantVerified && (
              <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-verified-green text-white flex items-center justify-center">
                <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900 truncate">{conv.participantName}</span>
              <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{timeAgo(conv.lastMessageAt)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{conv.propertyTitle}</p>
            <p className="text-sm text-gray-600 mt-1 truncate">{conv.lastMessage}</p>
          </div>
          {conv.unreadCount > 0 && (
            <span className="flex-shrink-0 h-5 min-w-[20px] rounded-full bg-verified-green text-white text-[10px] font-bold flex items-center justify-center px-1">
              {conv.unreadCount}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
