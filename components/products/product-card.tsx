import Image from "next/image"
import Link from "next/link"

import { UNIT_TYPE_LABEL } from "@/lib/constants"
import { mediaUrl, toMediaArray } from "@/lib/media"
import type { Product } from "@/lib/types"
import { Card } from "@/components/ui/card"

export function ProductCard({ product }: { product: Product }) {
  const image = mediaUrl(toMediaArray(product.image)[0])
  const subtitle = product.unitType
    ? UNIT_TYPE_LABEL[product.unitType]
    : undefined

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="h-full gap-0 overflow-hidden p-0 transition-colors group-hover:border-primary/40">
        <div className="relative aspect-square w-full bg-muted">
          {image && (
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform group-hover:scale-105"
            />
          )}
        </div>
        <div className="space-y-1 p-4">
          <h3 className="font-semibold leading-snug">{product.name}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </Card>
    </Link>
  )
}
