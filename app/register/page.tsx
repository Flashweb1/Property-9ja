"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<"account" | "role">("account")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailRef.current?.value || !passwordRef.current?.value) return
    setStep("role")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const form = new FormData(e.target as HTMLFormElement)
    const role = form.get("role") as string || "renter"
    const name = `${firstNameRef.current?.value || ""} ${lastNameRef.current?.value || ""}`.trim()
    const email = emailRef.current?.value || ""
    const password = passwordRef.current?.value || ""

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          options: { data: { name, role, phone: phoneRef.current?.value || "" } },
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Registration failed")

      const { createClient } = await import("@/lib/supabaseBrowser")
      const supabase = createClient()
      await supabase.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      })

      router.push("/search?welcome=1")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative h-12 w-12">
              <Image
                src="/images/Logo Icon Property9ja.png"
                alt="Property 9ja"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 mt-2">Join Nigeria's most trusted property marketplace</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`h-2 w-2 rounded-full ${step === "account" ? "bg-brand-green" : "bg-gray-300"}`} />
          <div className="h-0.5 w-8 bg-gray-300" />
          <div className={`h-2 w-2 rounded-full ${step === "role" ? "bg-brand-green" : "bg-gray-300"}`} />
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
        )}

        <form onSubmit={step === "account" ? handleNext : handleSubmit} className="bg-white rounded-xl border p-6 space-y-5">
          {step === "account" ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input ref={firstNameRef} type="text" placeholder="John" required className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input ref={lastNameRef} type="text" placeholder="Doe" required className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input ref={emailRef} type="email" placeholder="you@email.com" required className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input ref={phoneRef} type="tel" placeholder="+234 800 000 0000" required className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input ref={passwordRef} type={showPassword ? "text" : "password"} placeholder="Create a strong password" required minLength={6} className="w-full rounded-lg border border-gray-300 pl-10 pr-10 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters</p>
              </div>

              <Button type="submit" className="w-full h-11">Continue</Button>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600 text-center">Choose how you'll use Property 9ja</p>

              <div className="space-y-3">
                <label className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-brand-green hover:bg-brand-green/5 transition-colors has-[:checked]:border-brand-green has-[:checked]:bg-brand-green/5">
                  <input type="radio" name="role" value="renter" defaultChecked className="h-4 w-4 text-brand-green focus:ring-brand-green" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">I'm looking for a property</p>
                    <p className="text-xs text-gray-500 mt-0.5">Search and rent verified properties</p>
                  </div>
                </label>
                <label className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-brand-green hover:bg-brand-green/5 transition-colors has-[:checked]:border-brand-green has-[:checked]:bg-brand-green/5">
                  <input type="radio" name="role" value="agent" className="h-4 w-4 text-brand-green focus:ring-brand-green" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">I'm a property agent</p>
                    <p className="text-xs text-gray-500 mt-0.5">List properties and manage leads</p>
                  </div>
                </label>
                <label className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-brand-green hover:bg-brand-green/5 transition-colors has-[:checked]:border-brand-green has-[:checked]:bg-brand-green/5">
                  <input type="radio" name="role" value="landlord" className="h-4 w-4 text-brand-green focus:ring-brand-green" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">I own property</p>
                    <p className="text-xs text-gray-500 mt-0.5">List and manage your own properties</p>
                  </div>
                </label>
              </div>

              <Button type="submit" className="w-full h-11" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </>
          )}

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-green font-semibold hover:underline">Sign in</Link>
          </p>
          <p className="text-xs text-gray-400 text-center">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline">Terms of Service</Link> and{" "}
            <Link href="/privacy" className="underline">Privacy Policy</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
