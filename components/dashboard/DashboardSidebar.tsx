"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Heart,
  Search,
  MessageSquare,
  Settings,
  BarChart3,
  Building,
  Users,
  Shield,
  LogOut,
  LayoutDashboard,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"

interface SidebarItem {
  href: string
  label: string
  icon: any
  badge?: number
}

const renterLinks: SidebarItem[] = [
  { href: "/dashboard/saved", label: "Saved Properties", icon: Heart },
  { href: "/dashboard/searches", label: "Saved Searches", icon: Search },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

const agentLinks: SidebarItem[] = [
  { href: "/dashboard/agent", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/agent/listings", label: "My Listings", icon: Building },
  { href: "/dashboard/agent/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/agent/leads", label: "Leads", icon: Users },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

const adminLinks: SidebarItem[] = [
  { href: "/admin/listings", label: "Listings", icon: Building },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/verifications", label: "Verifications", icon: Shield },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { userRole } = useAppStore()

  const links = userRole === "agent" ? agentLinks : userRole === "admin" ? adminLinks : renterLinks

  return (
    <aside className="w-64 bg-white border-r hidden lg:block flex-shrink-0">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 px-3">
        <nav className="space-y-1">
          {links.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(link.href + "/")
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-verified-green/10 text-verified-green"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <link.icon className="h-5 w-5 flex-shrink-0" />
                <span>{link.label}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="ml-auto bg-verified-green text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="mt-8 pt-6 border-t">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </aside>
  )
}
