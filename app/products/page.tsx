import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getBrand, getProductsByBrand } from "@/lib/strapi"
import { mediaUrl } from "@/lib/media"
import { ProductGrid } from "@/components/products/product-grid"

interface ProductsPageProps {
  searchParams: Promise<{ brand?: string }>
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { brand: brandId } = await searchParams

  if (!brandId) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-center text-muted-foreground">
          กรุณาเลือกแบรนด์จาก
          <Link href="/" className="ml-1 text-primary underline">
            หน้าแรก
          </Link>
        </p>
      </main>
    )
  }

  const [brand, products] = await Promise.all([
    getBrand(brandId),
    getProductsByBrand(brandId),
  ])

  if (!brand) notFound()

  const logo = mediaUrl(brand.logo)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
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
