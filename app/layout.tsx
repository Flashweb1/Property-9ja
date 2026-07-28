import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ToastProvider } from "@/components/shared/Toast"
import { ScrollToTop } from "@/components/shared/ScrollToTop"
import { CookieConsent } from "@/components/shared/CookieConsent"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VERIFIED — Nigeria's Most Trusted Property Marketplace",
  description: "Find verified properties for rent and sale in Nigeria. Every listing verified. Every agent verified. Zero tolerance for fraud.",
  keywords: ["Nigeria property", "rent in Lagos", "verified agents", "property marketplace Nigeria", "real estate Nigeria", "Abuja apartments", "Lekki houses"],
  authors: [{ name: "VERIFIED" }],
  openGraph: {
    title: "VERIFIED — Nigeria's Most Trusted Property Marketplace",
    description: "Every listing verified. Every agent verified. Zero fake properties.",
    type: "website",
    locale: "en_NG",
    siteName: "VERIFIED",
  },
  twitter: {
    card: "summary_large_image",
    title: "VERIFIED — Nigeria's Most Trusted Property Marketplace",
    description: "Every listing verified. Every agent verified. Zero fake properties.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/icons/icon-192.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <div className="min-h-screen flex flex-col bg-verified-cream">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ScrollToTop />
          <CookieConsent />
        </ToastProvider>
      </body>
    </html>
  )
}
