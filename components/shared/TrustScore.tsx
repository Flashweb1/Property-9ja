"use client"

import { cn, getTrustColor } from "@/lib/utils"

interface TrustScoreProps {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

export function TrustScore({ score, size = "md", showLabel = true, className }: TrustScoreProps) {
  const circumference = 2 * Math.PI * 16
  const strokeDashoffset = circumference - (score / 100) * circumference

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  }

  const textSizes = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  }

  const getColor = (s: number) => {
    if (s >= 90) return "text-green-600"
    if (s >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getStrokeColor = (s: number) => {
    if (s >= 90) return "stroke-green-500"
    if (s >= 70) return "stroke-yellow-500"
    return "stroke-red-500"
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative flex items-center justify-center", sizeClasses[size])}>
        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-200" strokeWidth="3" />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className={getStrokeColor(score)}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <span className={cn("absolute font-bold", textSizes[size], getColor(score))}>
          {score}
        </span>
      </div>
      {showLabel && (
        <div className="flex flex-col">
          <span className={cn("text-xs font-semibold", getColor(score))}>{score}% Trust Score</span>
          <span className="text-[10px] text-gray-500">Based on verification & reviews</span>
        </div>
      )}
    </div>
  )
}
