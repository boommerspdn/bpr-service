import type { MetadataRoute } from "next"

import { getActiveServiceTypes } from "@/lib/constants"
import { siteUrl } from "@/lib/metadata"
import { getBrands } from "@/lib/strapi"

export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const brands = await getBrands()
  const staticRoutes = ["/", "/brands", "/works", "/contact"]

  const brandRoutes = brands.flatMap((brand) =>
    getActiveServiceTypes(brand).map(
      ({ key }) => `/brands/${brand.documentId}/${key}`
    )
  )

  return [...staticRoutes, ...brandRoutes].map((path) => ({
    url: siteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/brands/") ? 0.8 : 0.7,
  }))
}
