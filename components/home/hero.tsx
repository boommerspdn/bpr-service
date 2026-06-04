import Image from "next/image"

import { mediaUrl } from "@/lib/media"
import type { HomePage } from "@/lib/types"

export function Hero({ home }: { home: HomePage | null }) {
  const media = home?.heroImage
  const image = mediaUrl(media)

  return (
    <div className="w-full">
      {image && media?.width && media?.height && (
        <Image
          src={image}
          alt=""
          width={media.width}
          height={media.height}
          priority
          quality={100}
          sizes="100vw"
          className="w-full h-auto"
        />
      )}
    </div>
  )
}
