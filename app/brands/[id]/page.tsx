import Image from "next/image"
import { notFound } from "next/navigation"

import { mediaUrl } from "@/lib/media"
import { getBrand, getBrands, getProductsByBrand } from "@/lib/strapi"
import { ProductGrid } from "@/components/products/product-grid"

export const dynamicParams = false

interface BrandProductsPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const brands = await getBrands()
  return brands.map((brand) => ({ id: brand.documentId }))
}

export default async function BrandProductsPage({
  params,
}: BrandProductsPageProps) {
  const { id } = await params
  const [brand, products] = await Promise.all([
    getBrand(id),
    getProductsByBrand(id),
  ])

  if (!brand) notFound()

  const logo = mediaUrl(brand.logo)

  return (
    <main className="container py-10">
      <div className="mb-8 flex items-center gap-4">
        {logo && (
          <div className="relative h-12 w-28 shrink-0">
            <Image
              src={logo}
              alt={brand.name}
              fill
              sizes="112px"
              className="object-contain object-left"
            />
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          สินค้า {brand.name}
        </h1>
      </div>

      <ProductGrid products={products} />
    </main>
  )
}
