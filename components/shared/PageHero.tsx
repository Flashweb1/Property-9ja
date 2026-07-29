import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageHeroProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  children?: ReactNode
  className?: string
}

export function PageHero({ title, subtitle, icon, children, className }: PageHeroProps) {
  return (
    <section className={cn("bg-brand-navy text-white py-16 md:py-24", className)}>
      <div className="container mx-auto px-4 text-center max-w-3xl">
        {icon && <div className="flex justify-center mb-4">{icon}</div>}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-xl text-gray-300">{subtitle}</p>}
        {children}
      </div>
    </section>
  )
}
