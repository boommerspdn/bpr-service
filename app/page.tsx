import { getBrands, getHomePage } from "@/lib/strapi"
import { Hero } from "@/components/home/hero"
import { BrandGrid } from "@/components/home/brand-grid"
import { FeatureCards } from "@/components/home/feature-cards"

export default async function HomePage() {
  const [home, brands] = await Promise.all([getHomePage(), getBrands()])

  return (
    <main>
      <Hero home={home} />
      <BrandGrid brands={brands} />
      <FeatureCards features={home?.features} />
    </main>
  )
}
