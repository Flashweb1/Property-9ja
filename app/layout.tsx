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
  title: "Property 9ja — Nigeria's #1 Property Marketplace",
  description: "Find verified properties for rent and sale in Nigeria. Every listing verified. Every agent verified. Zero tolerance for fraud.",
  keywords: ["Nigeria property", "rent in Lagos", "verified agents", "property marketplace Nigeria", "real estate Nigeria", "Abuja apartments", "Lekki houses"],
  authors: [{ name: "Property 9ja" }],
  openGraph: {
    title: "Property 9ja — Nigeria's #1 Property Marketplace",
    description: "Every listing verified. Every agent verified. Zero fake properties. Zero hidden fees.",
    type: "website",
    locale: "en_NG",
    siteName: "Property 9ja",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property 9ja — Nigeria's #1 Property Marketplace",
    description: "Every listing verified. Every agent verified. Zero fake properties. Zero hidden fees.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/icon-192.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1A2B4A" />
      </head>
      <body className={inter.className}>
        <ToastProvider>
          <div className="min-h-screen flex flex-col bg-brand-cream">
            <Navbar />
            <main className="flex-1 animate-fade-in">{children}</main>
            <Footer />
          </div>
          <ScrollToTop />
          <CookieConsent />
        </ToastProvider>
      </body>
    </html>
  )
}
