import Link from "next/link"
import Image from "next/image"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative h-24 w-24 mx-auto">
            <Image
              src="/images/Logo Icon Property9ja.png"
              alt="Property 9ja"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-2">Page not found</p>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="outline" className="gap-2">
              Search Properties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
