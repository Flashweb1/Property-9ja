import { Loader2 } from "lucide-react"

export default function RootLoading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-green mx-auto" />
        <p className="text-sm text-gray-500 mt-3">Loading...</p>
      </div>
    </div>
  )
}
