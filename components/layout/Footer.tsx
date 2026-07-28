import Link from "next/link"
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-verified-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-verified-green">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">VERIFIED</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Nigeria's most trusted property marketplace. Every listing verified. Every agent verified. Zero tolerance for fraud.
            </p>
            <div className="flex gap-3">
              <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-verified-green transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-verified-green transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-verified-green transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-verified-green transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* For Renters */}
          <div>
            <h4 className="font-semibold mb-4">For Renters</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/search" className="hover:text-white transition-colors">Search Properties</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/trust-and-safety" className="hover:text-white transition-colors">Trust & Safety</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* For Agents */}
          <div>
            <h4 className="font-semibold mb-4">For Agents</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/register" className="hover:text-white transition-colors">List Your Property</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
              <li><Link href="/verify" className="hover:text-white transition-colors">Get Verified</Link></li>
              <li><Link href="/dashboard/agent" className="hover:text-white transition-colors">Agent Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-verified-green" />
                support@verified.ng
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-verified-green" />
                +234 800 VERIFIED
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-verified-green mt-0.5" />
                <span>12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2024 VERIFIED. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
