import type { Metadata } from "next"

import { BrandGrid } from "@/components/home/brand-grid"
import { getBrands } from "@/lib/strapi"

export const metadata: Metadata = {
  title: "เลือกแบรนด์",
  description: "เลือกแบรนด์และประเภทแอร์เพื่อดูสินค้าทั้งหมดจาก BPR Service",
}

export default async function BrandsPage() {
  const brands = await getBrands()

  return (
    <main>
      <div className="container pt-10">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            เลือกแบรนด์
          </h1>
          <p className="text-sm text-muted-foreground">
            เลือกประเภทแอร์ในแต่ละแบรนด์เพื่อดูสินค้าทั้งหมด
          </p>
        </div>
      </div>
      <BrandGrid brands={brands} />
    </main>
  )
}
