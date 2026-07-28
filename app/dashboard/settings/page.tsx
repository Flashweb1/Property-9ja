"use client"

import { useState } from "react"
import { User, Mail, Phone, Shield, Bell, Lock, Camera } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/shared/Avatar"
import { useAuth } from "@/hooks/useAuth"

export default function SettingsPage() {
  const { user } = useAuth()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <div className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <Avatar src={user?.avatar || ""} alt={user?.name || "User"} size="xl" />
                <button className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-brand-green text-white flex items-center justify-center shadow-sm hover:bg-brand-green-dark transition-colors">
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user?.name || "User"}</p>
                <p className="text-sm text-gray-500 capitalize">{user?.role || "renter"}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    defaultValue={user?.name || ""}
                    className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    defaultValue={user?.email || ""}
                    className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    defaultValue={user?.phone || ""}
                    className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
            <div className="space-y-4">
              {[
                { label: "Email notifications for new messages", default: true },
                { label: "Daily digest of new properties", default: false },
                { label: "Weekly newsletter", default: true },
                { label: "Marketing emails", default: false },
              ].map((item) => (
                <label key={item.label} className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <input
                    type="checkbox"
                    defaultChecked={item.default}
                    className="h-4 w-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Password */}
          <div className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input type="password" className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input type="password" className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input type="password" className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Verification</h2>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="font-semibold text-gray-900">Identity Verified</p>
                <p className="text-sm text-gray-500">Your identity has been verified</p>
              </div>
            </div>
            <Button variant="outline" size="sm">View Verification Details</Button>
          </div>

          {/* Save */}
          <div className="flex items-center gap-3">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            {saved && <span className="text-sm text-brand-green font-medium">Changes saved successfully</span>}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
