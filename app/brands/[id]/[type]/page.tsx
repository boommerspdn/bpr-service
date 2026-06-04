import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import {
  getActiveServiceTypes,
  SERVICE_TYPES,
  UNIT_TYPE_LABEL,
} from "@/lib/constants"
import { mediaUrl } from "@/lib/media"
import {
  getBrand,
  getBrands,
  getProductsByBrandAndUnitType,
} from "@/lib/strapi"
import type { UnitType } from "@/lib/types"
import { ProductGrid } from "@/components/products/product-grid"

export const dynamicParams = false

interface BrandTypeProductsPageProps {
  params: Promise<{ id: string; type: string }>
}

function isUnitType(type: string): type is UnitType {
  return SERVICE_TYPES.some(({ key }) => key === type)
}

export async function generateStaticParams() {
  const brands = await getBrands()

  return brands.flatMap((brand) =>
    getActiveServiceTypes(brand).map(({ key }) => ({
      id: brand.documentId,
      type: key,
    }))
  )
}

export default async function BrandTypeProductsPage({
  params,
}: BrandTypeProductsPageProps) {
  const { id, type } = await params

  if (!isUnitType(type)) notFound()

  const [brand, products] = await Promise.all([
    getBrand(id),
    getProductsByBrandAndUnitType(id, type),
  ])

  if (!brand) notFound()

  const logo = mediaUrl(brand.logo)

  return (
    <main className="container py-10">
      <Link
        href={`/brands/${brand.documentId}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        สินค้าทั้งหมดของ {brand.name}
      </Link>

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
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            สินค้า {brand.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {UNIT_TYPE_LABEL[type]}
          </p>
        </div>
      </div>

      <ProductGrid products={products} />
    </main>
  )
}
