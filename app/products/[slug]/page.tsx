import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { UNIT_TYPE_LABEL } from "@/lib/constants"
import { mediaUrl, toMediaArray } from "@/lib/media"
import {
  getProductByRouteParam,
  getProducts,
  productRouteParam,
} from "@/lib/strapi"
import { ProductGallery } from "@/components/products/product-gallery"
import { SpecsTable } from "@/components/products/specs-table"

export const dynamicParams = false

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({ slug: productRouteParam(product) }))
}

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params
  const product = await getProductByRouteParam(slug)

  if (!product) notFound()

  const images = toMediaArray(product.image)
    .map((m) => mediaUrl(m))
    .filter((url): url is string => Boolean(url))
  const subtitle = product.unitType
    ? UNIT_TYPE_LABEL[product.unitType]
    : undefined

  return (
    <main className="container py-8">
      {product.brand && (
        <Link
          href={`/brands/${product.brand.documentId}`}
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
        {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
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
