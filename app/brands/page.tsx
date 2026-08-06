import type { Metadata } from "next"

import { BrandGrid } from "@/components/home/brand-grid"
import { seoMetadata } from "@/lib/metadata"
import { getBrands } from "@/lib/strapi"
import { JsonLd, breadcrumbJsonLd } from "@/lib/structured-data"

export const metadata: Metadata = seoMetadata(
  null,
  {
    title: "เลือกแบรนด์แอร์",
    description:
      "เลือกแบรนด์และประเภทเครื่องปรับอากาศ ดูรุ่นแอร์ BTU ราคา และบริการติดตั้งจาก BPR Service",
  },
  {
    path: "/brands",
  }
)

export default async function BrandsPage() {
  const brands = await getBrands()

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "หน้าแรก", path: "/" },
          { name: "แบรนด์สินค้า", path: "/brands" },
        ])}
      />
      <div className="container pt-10">
        <div className="max-w-3xl space-y-3">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            เลือกแบรนด์แอร์และประเภทสินค้า
          </h1>
          <p className="leading-7 text-muted-foreground">
            เลือกแบรนด์และประเภทเครื่องปรับอากาศเพื่อดูรุ่นสินค้า รายละเอียด BTU
            ฉลากประหยัดไฟ และราคารวมติดตั้งจาก BPR Service
          </p>
        </div>
      </div>
      <BrandGrid brands={brands} />
    </main>
  )
}
