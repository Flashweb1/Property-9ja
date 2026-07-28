"use client"

import { Message } from "@/types"
import { cn, timeAgo } from "@/lib/utils"

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5",
          isOwn
            ? "bg-verified-green text-white rounded-br-sm"
            : "bg-gray-100 text-gray-900 rounded-bl-sm"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <p
          className={cn(
            "text-[10px] mt-1 text-right",
            isOwn ? "text-white/70" : "text-gray-400"
          )}
        >
          {timeAgo(message.createdAt)}
        </p>
      </div>
    </div>
  )
}
