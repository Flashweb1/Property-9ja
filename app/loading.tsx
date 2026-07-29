import Image from "next/image"

export default function RootLoading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center">
        <div className="relative h-16 w-16 mx-auto animate-pulse-soft">
          <Image
            src="/images/Logo Icon Property9ja.png"
            alt="Property 9ja"
            fill
            className="object-contain"
          />
        </div>
        <div className="mt-6 h-2 w-24 mx-auto bg-brand-green/20 rounded-full overflow-hidden">
          <div className="h-full w-full bg-brand-green rounded-full animate-shimmer" style={{ backgroundSize: "200% auto" }} />
        </div>
        <p className="text-sm text-gray-500 mt-4">Loading...</p>
      </div>
    </div>
  )
}
