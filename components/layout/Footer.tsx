import Link from "next/link"
import Image from "next/image"
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-brand-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative h-9 w-9">
                <Image
                  src="/images/Logo Icon Property9ja.png"
                  alt="Property 9ja"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold">Property 9ja</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Nigeria's most trusted property marketplace. Every listing verified. Every agent verified. Zero tolerance for fraud.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com/property9ja" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-2 hover:bg-brand-green transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com/property9ja" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-2 hover:bg-brand-green transition-colors" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/property9ja" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-2 hover:bg-brand-green transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/company/property9ja" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-2 hover:bg-brand-green transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* For Renters */}
          <div>
            <h4 className="font-semibold mb-4">For Renters</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/search" className="hover:text-white transition-colors">Search Properties</Link></li>
              <li><Link href="/neighborhoods" className="hover:text-white transition-colors">Neighborhoods</Link></li>
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
                <Mail className="h-4 w-4 text-brand-green" />
                support@verified.ng
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-green" />
                +234 800 123 4567
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-green mt-0.5" />
                <span>12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2024 Property 9ja. All rights reserved.</p>
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
