import type { Brand } from "@/lib/types"
import { BrandCard } from "@/components/home/brand-card"

export function BrandGrid({ brands }: { brands: Brand[] }) {
  return (
    <section id="brands" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        {brands.length === 0 ? (
          <p className="text-center text-muted-foreground">
            ยังไม่มีข้อมูลแบรนด์
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
