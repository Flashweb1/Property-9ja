"use client"

import { Shield, ShieldCheck, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"

interface VerificationBadgeProps {
  status: "unverified" | "identity-verified" | "fully-verified"
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

export function VerificationBadge({ status, size = "md", showLabel = true, className }: VerificationBadgeProps) {
  const config = {
    "fully-verified": {
      icon: ShieldCheck,
      label: "Fully Verified",
      className: "bg-green-100 text-green-700 border-green-200",
      iconClass: "text-green-600",
    },
    "identity-verified": {
      icon: Shield,
      label: "Identity Verified",
      className: "bg-yellow-100 text-yellow-700 border-yellow-200",
      iconClass: "text-yellow-600",
    },
    "unverified": {
      icon: ShieldAlert,
      label: "Unverified",
      className: "bg-red-100 text-red-700 border-red-200",
      iconClass: "text-red-600",
    },
  }

  const { icon: Icon, label, className: badgeClass, iconClass } = config[status]

  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5 gap-0.5",
    md: "text-xs px-2 py-0.5 gap-1",
    lg: "text-sm px-3 py-1 gap-1.5",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-semibold",
        badgeClass,
        sizeClasses[size],
        className
      )}
    >
      <Icon className={cn(iconSizes[size], iconClass)} />
      {showLabel && <span>{label}</span>}
    </span>
  )
}
