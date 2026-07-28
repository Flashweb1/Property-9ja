"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consented = localStorage.getItem("cookie-consent")
    if (!consented) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-2xl p-4 md:p-6">
      <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700">
            <strong>🍪 We use cookies</strong> — to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Read our{" "}
            <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a>{" "}
            and{" "}
            <a href="/terms" className="underline hover:text-gray-600">Terms of Service</a>.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button size="sm" variant="outline" onClick={() => setVisible(false)}>
            Decline
          </Button>
          <Button size="sm" onClick={accept}>
            Accept All
          </Button>
        </div>
      </div>
    </div>
  )
}
