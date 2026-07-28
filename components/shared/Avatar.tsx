interface AvatarProps {
  src: string
  alt: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function Avatar({ src, alt, size = "md", className = "" }: AvatarProps) {
  const sizes = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-14 w-14", xl: "h-20 w-20" }
  return (
    <div className={`${sizes[size]} rounded-full bg-gray-200 overflow-hidden flex-shrink-0 ${className}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  )
}
