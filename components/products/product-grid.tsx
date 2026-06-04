import type { Product } from "@/lib/types"
import { ProductCard } from "@/components/products/product-card"

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        ยังไม่มีสินค้าสำหรับแบรนด์นี้
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
