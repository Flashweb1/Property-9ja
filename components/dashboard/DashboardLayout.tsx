"use client"

import { DashboardSidebar } from "./DashboardSidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        {children}
      </div>
    </div>
  )
}
