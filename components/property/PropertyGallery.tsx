"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react"

interface PropertyGalleryProps {
  images: string[]
  videoUrl?: string
}

export function PropertyGallery({ images, videoUrl }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <>
      <div className="relative rounded-xl overflow-hidden bg-gray-100">
        <div className="aspect-[16/10] relative">
          <img
            src={images[currentIndex]}
            alt={`Property image ${currentIndex + 1}`}
            className="h-full w-full object-cover cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Video Play Button */}
          {videoUrl && currentIndex === 0 && (
            <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group">
              <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="h-7 w-7 text-brand-green ml-1" fill="currentColor" />
              </div>
            </button>
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 p-3 bg-white border-t overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 h-16 w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                idx === currentIndex ? "border-brand-green" : "border-transparent hover:border-gray-300"
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white" aria-label="Close full view">
            <X className="h-6 w-6" />
          </button>
          <img
            src={images[currentIndex]}
            alt="Full view"
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}
