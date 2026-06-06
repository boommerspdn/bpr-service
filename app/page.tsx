import type { Metadata } from "next"

import { getBrands, getHeroContact, getHomePage } from "@/lib/strapi"
import { Hero } from "@/components/home/hero"
import { BrandGrid } from "@/components/home/brand-grid"
import { FeatureCards } from "@/components/home/feature-cards"
import { seoMetadata } from "@/lib/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomePage()

  return seoMetadata(home?.seo, {
    title: "BPR Service - ศูนย์บริการแอร์คุณภาพ",
    description:
      home?.heroSubtitle ||
      "ราคารวมติดตั้ง ประหยัดไฟ รับประกัน บริการโดยช่างมืออาชีพ",
  })
}

export default async function HomePage() {
  const [home, heroContact, brands] = await Promise.all([
    getHomePage(),
    getHeroContact(),
    getBrands(),
  ])

  return (
    <main>
      <Hero home={home} contact={heroContact} />
      <BrandGrid brands={brands} />
      <FeatureCards features={home?.features} />
    </main>
  )
}
