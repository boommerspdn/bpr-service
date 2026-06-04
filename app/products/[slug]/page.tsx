import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { UNIT_TYPE_LABEL } from "@/lib/constants"
import { mediaUrl, toMediaArray } from "@/lib/media"
import { getProductBySlug } from "@/lib/strapi"
import { ProductGallery } from "@/components/products/product-gallery"
import { SpecsTable } from "@/components/products/specs-table"

// Slug content is CMS-driven; render at request time.
export const dynamic = "force-dynamic"

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const images = toMediaArray(product.image)
    .map((m) => mediaUrl(m))
    .filter((url): url is string => Boolean(url))
  const subtitle = product.unitType
    ? UNIT_TYPE_LABEL[product.unitType]
    : undefined

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {product.brand && (
        <Link
          href={`/products?brand=${product.brand.id}`}
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          {product.brand.name}
        </Link>
      )}

      <div className="mb-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          {product.name}
        </h1>
        {subtitle && (
          <p className="mt-1 text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="mx-auto mt-6 max-w-xl">
        <ProductGallery images={images} alt={product.name} />
      </div>

      <div className="mt-10">
        <SpecsTable specs={product.specs ?? []} />
      </div>
    </main>
  )
}
