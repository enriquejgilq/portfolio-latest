import React, { useState, useEffect } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

export interface GalleryImage {
  id: string
  src: string
  alt: string
  title?: string
  category: string
  projectImages?: string[]
}

interface ImageGalleryProps {
  images: GalleryImage[]
  columns?: {
    mobile: number
    tablet: number
    desktop: number
  }
}

export function ImageGallery({ images, columns = { mobile: 1, tablet: 2, desktop: 3 } }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories = ["all", ...Array.from(new Set(images.map((img) => img.category)))]
  
  const filteredImages = activeFilter === "all" ? images : images.filter((img) => img.category === activeFilter)

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image)
    setCurrentImageIndex(0) // Empezar siempre por la primera (portada)
    setIsZoomed(false)
  }

  const handleClose = () => {
    setSelectedImage(null)
    setIsZoomed(false)
  }

  const handleToggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    const projectImages = selectedImage?.projectImages
    if (projectImages && projectImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
    }
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    const projectImages = selectedImage?.projectImages
    if (projectImages && projectImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
    }
  }

  return (
    <>
      <div className="flex flex-nowrap overflow-x-auto pb-4 gap-2 mb-8 justify-start md:justify-center md:flex-wrap md:overflow-visible custom-scrollbar scroll-smooth">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={cn(
              "px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap",
              "hover:scale-105 active:scale-95 flex-shrink-0",
              activeFilter === category
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            {category === "all" ? "Todas" : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="mb-4 text-center">
        <p className="text-sm text-muted-foreground">
          Mostrando {filteredImages.length} {filteredImages.length === 1 ? "proyecto" : "proyectos"}
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-xl bg-muted cursor-pointer aspect-square animate-in fade-in duration-500"
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110"
              loading="lazy"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                <div className="flex flex-col items-center gap-2">
                  <ZoomIn className="w-8 h-8 text-primary-foreground" />
                  {image.projectImages && image.projectImages.length > 1 && (
                    <span className="text-primary-foreground text-xs font-bold bg-black/30 px-2 py-1 rounded">
                      {image.projectImages.length} fotos
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Image Title */}
            {image.title && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-primary-foreground font-medium text-sm">{image.title}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No se encontraron proyectos en esta categoría</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={handleClose}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-background/10 hover:bg-background/20 text-primary-foreground transition-colors duration-200 z-[60]"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          {selectedImage.projectImages && selectedImage.projectImages.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/20 hover:bg-background/40 text-primary-foreground transition-all duration-200 z-[60]"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/20 hover:bg-background/40 text-primary-foreground transition-all duration-200 z-[60]"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
              
              {/* Pagination counter */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-background/20 text-primary-foreground text-sm font-medium z-[60]">
                {currentImageIndex + 1} / {selectedImage.projectImages?.length || 0}
              </div>
            </>
          )}

          {/* Zoom Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleToggleZoom()
            }}
            className="absolute top-4 right-16 p-2 rounded-full bg-background/10 hover:bg-background/20 text-primary-foreground transition-colors duration-200 z-[60]"
            aria-label={isZoomed ? "Reducir zoom" : "Ampliar"}
          >
            <ZoomIn className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-7xl max-h-[80vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={(selectedImage.projectImages?.[currentImageIndex] || selectedImage.src) || "/placeholder.svg"}
              alt={selectedImage.alt}
              className={cn(
                "max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-300",
                isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in",
              )}
              onClick={handleToggleZoom}
            />

            {/* Image Info - Dark Glassmorphism Card */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] max-w-2xl p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-2 drop-shadow-md">
                {selectedImage.title}
              </h3>
              {selectedImage.alt && (
                <p className="text-white/90 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none overflow-y-auto max-h-32 md:max-h-none pr-2 custom-scrollbar">
                  {selectedImage.alt}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
