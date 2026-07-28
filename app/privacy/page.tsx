export default function PrivacyPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="bg-verified-navy text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-300">Last updated: June 2024</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl text-gray-600 text-sm leading-relaxed space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly: name, email, phone number, profile photos, and verification documents. We also collect usage data: pages visited, searches made, properties viewed, and interactions with other users.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>To provide and improve our verification services</li>
              <li>To connect tenants with agents and landlords</li>
              <li>To calculate trust scores and verification status</li>
              <li>To send notifications about messages and updates</li>
              <li>To detect and prevent fraud</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Data Sharing</h2>
            <p>We share information with: other users as necessary for property transactions (e.g., agents see your contact when you inquire); verification partners who help us verify documents; law enforcement when required by law. We do not sell your personal data to third parties.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Security</h2>
            <p>We implement industry-standard security measures including encryption in transit and at rest, access controls, and regular security audits. However, no online service is 100% secure.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Your Rights</h2>
            <p>You have the right to: access your personal data; correct inaccurate data; delete your account and data; export your data; withdraw consent for data processing. To exercise these rights, contact support@verified.ng.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cookies</h2>
            <p>We use cookies and similar tracking technologies to enhance your experience, analyze usage, and serve relevant content. You can control cookie preferences through your browser settings. See our Cookie Policy for more details.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Data Retention</h2>
            <p>We retain your information as long as your account is active or as needed to provide services. Verification documents are retained for 3 years after account closure for fraud prevention purposes.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Contact</h2>
            <p>For privacy-related inquiries, contact our Data Protection Officer at <strong>privacy@verified.ng</strong> or write to: 12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
