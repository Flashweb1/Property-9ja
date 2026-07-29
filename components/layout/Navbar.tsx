"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Shield, Search, MessageSquare, Heart, Menu, X, User, LogOut, Home, Building, BarChart3, Settings, Info, Grid, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils" // Assuming useAuth exposes a logout function

export function Navbar() {
  const pathname = usePathname()
  const { isAuthenticated, userRole, mobileMenuOpen, setMobileMenuOpen } = useAppStore()
  const { user } = useAuth()

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + "/")

  const publicLinks = [
    { href: "/about", label: "About", icon: Info },
    { href: "/search", label: "Search", icon: Search },
    { href: "/neighborhoods", label: "Neighborhoods", icon: Grid },
  ]

  const moreLinks = [
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
  ]

  const userLinks = [
    { href: "/dashboard/saved", label: "Saved", icon: Heart },
    { href: "/messages", label: "Messages", icon: MessageSquare },
  ]

  const agentLinks = [
    { href: "/dashboard/agent", label: "Dashboard", icon: BarChart3 },
    { href: "/dashboard/agent/listings", label: "My Listings", icon: Building },
    { href: "/messages", label: "Messages", icon: MessageSquare },
  ]

  const roleLinks = userRole === "agent" ? agentLinks : userLinks

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo — using actual logo image */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="relative h-9 w-9">
            <Image
              src="/images/Logo Icon Property9ja.png"
              alt="Property 9ja"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight text-brand-navy">Property 9ja</span>
            <span className="text-[10px] leading-tight tracking-wider text-brand-green font-semibold">TRUST FIRST</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-brand-green/10 text-brand-green"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
          {/* More dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
              More <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="absolute right-0 top-full mt-1 w-44 rounded-xl border bg-white py-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-2 text-sm transition-colors",
                    isActive(link.href)
                      ? "text-brand-green font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          {/* Divider */}
          <div className="mx-2 h-5 w-px bg-gray-200" />
          {/* Role-based links */}
          {roleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-brand-green/10 text-brand-green"
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
                      {user?.avatar ? (
                        <img src={user.avatar} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-full w-full p-1.5 text-gray-500" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user?.name || "User"}</span>
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
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Explore</p>
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium",
                  isActive(link.href)
                    ? "bg-brand-green/10 text-brand-green"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
            {moreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium",
                  isActive(link.href)
                    ? "bg-brand-green/10 text-brand-green"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 border-t" />
            <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">My Account</p>
            {roleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium",
                  isActive(link.href)
                    ? "bg-brand-green/10 text-brand-green"
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
                <button
                  onClick={() => { /* Call your logout function here */ }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                >
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
