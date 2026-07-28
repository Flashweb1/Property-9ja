"use client"

import { useState, useEffect } from "react"
import { Users, Search, Filter, Shield, ShieldOff, MoreHorizontal } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/shared/Avatar"
import { getUsers } from "@/lib/api"
import { User } from "@/types"
import { formatNumber } from "@/lib/utils"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data)
      setLoading(false)
    })
  }, [])

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-500 mt-1">{users.length} registered users</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input className="w-64 rounded-lg border border-gray-300 pl-9 pr-4 py-2 text-sm focus:border-verified-green focus:outline-none" placeholder="Search users..." />
            </div>
            <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1" />Filter</Button>
          </div>
        </div>

        <div className="rounded-xl border bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">User</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Role</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Verification</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Trust Score</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={user.avatar} alt={user.name} size="md" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={user.verificationStatus === "fully-verified" ? "success" : "secondary"}>
                        {user.verificationStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${user.trustScore >= 90 ? "bg-green-500" : user.trustScore >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                            style={{ width: `${user.trustScore}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{user.trustScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500"><Shield className="h-4 w-4" /></button>
                        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500"><MoreHorizontal className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
