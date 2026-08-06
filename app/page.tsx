import type { Metadata } from "next"

import { getBrands, getHeroContact, getHomePage } from "@/lib/strapi"
import { Hero } from "@/components/home/hero"
import { BrandGrid } from "@/components/home/brand-grid"
import { FeatureCards } from "@/components/home/feature-cards"
import { seoMetadata } from "@/lib/metadata"
import { mediaUrl } from "@/lib/media"
import { JsonLd, websiteJsonLd } from "@/lib/structured-data"

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomePage()

  return seoMetadata(
    home?.seo,
    {
      title: "BPR Service - จำหน่าย ติดตั้ง และซ่อมแอร์",
      description:
        home?.heroSubtitle ||
        "จำหน่ายแอร์พร้อมติดตั้ง ซ่อมและดูแลเครื่องปรับอากาศ ราคารวมติดตั้ง ประหยัดไฟ รับประกันโดยทีมช่างมืออาชีพ",
    },
    {
      path: "/",
      image: mediaUrl(home?.heroImage),
    }
  )
}

export default async function HomePage() {
  const [home, heroContact, brands] = await Promise.all([
    getHomePage(),
    getHeroContact(),
    getBrands(),
  ])

  return (
    <main>
      <JsonLd data={websiteJsonLd()} />
      <Hero home={home} contact={heroContact} />
      <BrandGrid brands={brands} />
      <FeatureCards features={home?.features} />
    </main>
  )
}
