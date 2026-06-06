"use client"

import Image from "next/image"
import {
  ColumnsPhotoAlbum,
  type RenderImageContext,
  type RenderImageProps,
} from "react-photo-album"

type WorksPhoto = {
  src: string
  width: number
  height: number
  alt: string
}

function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext
) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        src={photo.src}
        alt={alt}
        title={title}
        sizes={sizes}
        className="object-contain"
      />
    </div>
  )
}

export function WorksGallery({ photos }: { photos: WorksPhoto[] }) {
  return (
    <ColumnsPhotoAlbum
      photos={photos}
      render={{ image: renderNextImage }}
      defaultContainerWidth={1200}
      columns={(containerWidth) => {
        if (containerWidth < 640) return 1
        if (containerWidth < 1024) return 2
        return 3
      }}
      spacing={16}
      sizes={{
        size: "1168px",
        sizes: [
          {
            viewport: "(max-width: 1200px)",
            size: "calc(100vw - 32px)",
          },
        ],
      }}
    />
  )
}
