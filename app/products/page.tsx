import Link from "next/link"

import { getBrands } from "@/lib/strapi"
import { BrandGrid } from "@/components/home/brand-grid"

export default async function ProductsPage() {
  const brands = await getBrands()

  return (
    <main className="container py-10">
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          เลือกแบรนด์
        </h1>
        <p className="text-sm text-muted-foreground">
          หรือกลับไปที่
          <Link href="/" className="ml-1 text-primary underline">
            หน้าแรก
          </Link>
        </p>
      </div>

      <BrandGrid brands={brands} />
    </main>
  )
}
