import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import {
  getActiveServiceTypes,
  SERVICE_TYPES,
  UNIT_TYPE_LABEL,
} from "@/lib/constants"
import { mediaUrl, toMediaArray } from "@/lib/media"
import {
  getBrand,
  getBrands,
  getProductsByBrandAndUnitType,
} from "@/lib/strapi"
import { seoMetadata } from "@/lib/metadata"
import type { Product, UnitType } from "@/lib/types"
import {
  JsonLd,
  breadcrumbJsonLd,
  productItemListJsonLd,
} from "@/lib/structured-data"
import { ProductGallery } from "@/components/products/product-gallery"
import { SpecsTable } from "@/components/products/specs-table"

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

export async function generateMetadata({
  params,
}: BrandTypeProductsPageProps): Promise<Metadata> {
  const { id, type } = await params
  const path = `/brands/${id}/${type}`

  if (!isUnitType(type)) {
    return seoMetadata(
      null,
      {
        title: "สินค้าแอร์",
        description: "เลือกดูสินค้าเครื่องปรับอากาศจาก BPR Service",
      },
      {
        path,
      }
    )
  }

  const [brand, products] = await Promise.all([
    getBrand(id),
    getProductsByBrandAndUnitType(id, type),
  ])
  const unitTypeLabel = UNIT_TYPE_LABEL[type]
  const firstProductImage = products
    .flatMap((product) => toMediaArray(product.image))
    .map((image) => mediaUrl(image))
    .find((url): url is string => Boolean(url))

  return seoMetadata(
    null,
    {
      title: brand
        ? `แอร์ ${brand.name} ${unitTypeLabel} - ราคาและติดตั้ง`
        : "สินค้าแอร์",
      description: brand
        ? `เลือกดูแอร์ ${brand.name} ประเภท${unitTypeLabel} พร้อม BTU ฉลากประหยัดไฟ ราคา และบริการติดตั้งจาก BPR Service`
        : "เลือกดูสินค้าเครื่องปรับอากาศจาก BPR Service",
    },
    {
      path,
      image: firstProductImage || mediaUrl(brand?.logo),
    }
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
  const unitTypeLabel = UNIT_TYPE_LABEL[type]
  const path = `/brands/${id}/${type}`

  return (
    <main className="container py-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "หน้าแรก", path: "/" },
          { name: "แบรนด์สินค้า", path: "/brands" },
          { name: `${brand.name} ${unitTypeLabel}`, path },
        ])}
      />
      {products.length > 0 && (
        <JsonLd data={productItemListJsonLd({ brand, products, path })} />
      )}
      <Link
        href="/brands"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        เลือกแบรนด์และประเภท
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
            แอร์ {brand.name} {unitTypeLabel}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            ดูรุ่นสินค้า BTU ฉลากประหยัดไฟ SEER และราคารวมติดตั้งสำหรับ
            {unitTypeLabel} จาก BPR Service
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          ยังไม่มีสินค้าสำหรับแบรนด์และประเภทนี้
        </p>
      ) : (
        <div className="space-y-12">
          {products.map((product) => (
            <ProductSeries key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}

function ProductSeries({ product }: { product: Product }) {
  const images = toMediaArray(product.image)
    .map((m) => mediaUrl(m))
    .filter((url): url is string => Boolean(url))

  return (
    <section className="scroll-mt-24 border-t pt-8 first:border-t-0 first:pt-0">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          {product.name}
        </h2>
      </div>

      <div className="mx-auto max-w-3xl">
        <ProductGallery images={images} alt={product.name} />
      </div>

      <div className="mt-8">
        <SpecsTable specs={product.specs ?? []} />
      </div>
    </section>
  )
}
