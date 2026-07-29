import type { Metadata } from "next"
import { PageHero } from "@/components/shared/PageHero"

export const metadata: Metadata = {
  title: "Terms of Service | Property 9ja",
  description: "Terms and conditions for using Property 9ja, Nigeria's most trusted property marketplace.",
}

export default function TermsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <PageHero title="Terms of Service"><p className="text-lg text-gray-300">Last updated: June 2024</p></PageHero>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl prose prose-lg">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using Property 9ja ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Platform.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description of Service</h2>
              <p>Property 9ja is a property marketplace that connects tenants, landlords, and agents. We provide verification services to ensure listings are accurate and agents are trustworthy. We facilitate communication but are not a party to any rental or sale agreements.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. User Accounts</h2>
              <p>You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate information during registration. Property 9ja reserves the right to suspend accounts that violate our policies.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Listing Accuracy</h2>
              <p>Agents and landlords are responsible for the accuracy of their listings. Property 9ja conducts physical inspections and identity verification but does not guarantee the absolute accuracy of every detail provided by third parties.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Prohibited Activities</h2>
              <p>Users may not: post fake or misleading listings; use the Platform for fraudulent purposes; harass other users; attempt to circumvent verification systems; or use automated tools to scrape data.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Verification Services</h2>
              <p>Verification badges and trust scores are based on information available to Property 9ja at the time of assessment. We strive for accuracy but verification status may change and should not be considered a guarantee.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">7. Limitation of Liability</h2>
              <p>Property 9ja acts as an intermediary platform. We are not liable for disputes between tenants, landlords, or agents. Users should conduct their own due diligence before entering into any agreement.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Users will be notified of material changes via email or platform notification. Continued use after changes constitutes acceptance.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact</h2>
              <p>For questions about these terms, contact us at <strong>support@verified.ng</strong>.</p>
            </div>
        </div>
      </section>
    </div>
  )
}
