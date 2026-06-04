import { getBrands, getHomePage } from "@/lib/strapi"
import { Hero } from "@/components/home/hero"
import { BrandGrid } from "@/components/home/brand-grid"
import { FeatureCards } from "@/components/home/feature-cards"

// CMS-driven content rendered at request time (not prerendered at build).
export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [home, brands] = await Promise.all([getHomePage(), getBrands()])
  console.log(home)

  return (
    <main>
      <Hero home={home} />
      <BrandGrid brands={brands} />
      <FeatureCards features={home?.features} />
    </main>
  )
}
