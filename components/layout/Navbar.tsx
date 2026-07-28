"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Search, MessageSquare, Heart, Menu, X, User, LogOut, Home, Building, BarChart3, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { mockCurrentUser } from "@/lib/mockData"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const { isAuthenticated, userRole, mobileMenuOpen, setMobileMenuOpen } = useAppStore()

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + "/")

  const navLinks = [
    { href: "/search", label: "Search", icon: Search },
    { href: "/dashboard/saved", label: "Saved", icon: Heart },
    { href: "/messages", label: "Messages", icon: MessageSquare },
  ]

  const agentLinks = [
    { href: "/dashboard/agent", label: "Dashboard", icon: BarChart3 },
    { href: "/dashboard/agent/listings", label: "My Listings", icon: Building },
    { href: "/messages", label: "Messages", icon: MessageSquare },
  ]

  const links = userRole === "agent" ? agentLinks : navLinks

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-verified-green">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight text-verified-navy">VERIFIED</span>
            <span className="text-[10px] leading-tight tracking-wider text-verified-green font-semibold">TRUST FIRST</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-verified-green/10 text-verified-green"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {userRole === "agent" && (
                <Link href="/dashboard/agent/listings/new">
                  <Button size="sm" className="gap-2">
                    <Building className="h-4 w-4" />
                    List Property
                  </Button>
                </Link>
              )}
              <div className="flex items-center gap-3 border-l pl-3">
                <Link href="/dashboard/settings">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                      <img src={mockCurrentUser?.avatar} alt="Profile" className="h-full w-full object-cover" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{mockCurrentUser?.name}</span>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Log In</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium",
                  isActive(link.href)
                    ? "bg-verified-green/10 text-verified-green"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <>
                <Link
                  href="/dashboard/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50">
                  <LogOut className="h-5 w-5" />
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
