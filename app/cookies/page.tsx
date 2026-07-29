import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/shared/PageHero"

export const metadata: Metadata = {
  title: "Cookie Policy | Property 9ja",
  description: "How Property 9ja uses cookies and similar technologies on our platform.",
}

export default function CookiesPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <PageHero title="Cookie Policy"><p className="text-lg text-gray-300">Last updated: June 2024</p></PageHero>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl prose prose-lg">
          <h2>What Are Cookies</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help us improve your experience by remembering preferences, analyzing site traffic, and enabling core functionality.</p>

          <h2>How We Use Cookies</h2>
          <ul>
            <li><strong>Essential cookies</strong> — Required for the platform to function (authentication, security)</li>
            <li><strong>Analytics cookies</strong> — Help us understand how users interact with our site</li>
            <li><strong>Preference cookies</strong> — Remember your settings and preferences</li>
            <li><strong>Marketing cookies</strong> — Used to deliver relevant advertisements (with your consent)</li>
          </ul>

          <h2>Third-Party Cookies</h2>
          <p>We use services like Google Analytics and Supabase for analytics and authentication. These providers may set their own cookies. We do not sell your personal data.</p>

          <h2>Managing Cookies</h2>
          <p>You can control cookies through your browser settings. Disabling certain cookies may affect platform functionality. Most browsers allow you to block or delete cookies through their preferences menu.</p>

          <h2>Contact</h2>
          <p>For questions about our cookie policy, contact us at <a href="mailto:support@property9ja.ng">support@property9ja.ng</a>.</p>

          <div className="mt-8">
            <Link href="/" className="text-brand-green hover:underline">Return to Home</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
