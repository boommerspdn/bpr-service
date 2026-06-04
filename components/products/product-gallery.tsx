"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ProductGalleryProps {
  images: string[]
  alt: string
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0)

  if (images.length === 0) {
    return <div className="aspect-square w-full rounded-2xl bg-muted" />
  }

  const go = (delta: number) =>
    setActive((i) => (i + delta + images.length) % images.length)

  return (
    <div className="space-y-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
        />

        {images.length > 1 && (
          <>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="ภาพก่อนหน้า"
              onClick={() => go(-1)}
              className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-background/80"
            >
              <ChevronLeft />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="ภาพถัดไป"
              onClick={() => go(1)}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-background/80"
            >
              <ChevronRight />
            </Button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex flex-wrap gap-3">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              aria-label={`ภาพที่ ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "relative size-20 overflow-hidden rounded-xl border-2 bg-muted transition-colors",
                i === active ? "border-primary" : "border-transparent"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
