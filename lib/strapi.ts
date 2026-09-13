import { cache } from "react"

import { API_URL, STRAPI_TOKEN } from "@/lib/env"
import type {
  Brand,
  ContactPage,
  HomePage,
  Layout,
  LayoutContact,
  Product,
  WorksPage,
  StrapiListResponse,
  StrapiSingleResponse,
  UnitType,
} from "@/lib/types"

async function strapiFetch<T>(path: string): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: {
        Accept: "application/json",
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      },
    })

    if (!res.ok) {
      throw new Error(`Strapi request failed (${res.status}): ${path}`)
    }

    return (await res.json()) as T
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error(`Strapi request error: ${path}`)
  }
}

async function fetchSingle<T>(path: string): Promise<T | null> {
  const res = await strapiFetch<StrapiSingleResponse<T>>(path)
  return res.data ?? null
}

async function fetchList<T>(path: string): Promise<T[]> {
  const res = await strapiFetch<StrapiListResponse<T>>(path)
  return res.data ?? []
}

/** Layout singleton: header/footer contact data. */
export const getSiteLayout = cache(async (): Promise<Layout | null> => {
  return fetchSingle<Layout>(
    "/bprservice-layout?fields[0]=lineId&fields[1]=phoneNumber&fields[2]=address&fields[3]=googleMapEmbedSrc&populate[logo]=true"
  )
})

/** Layout singleton: homepage hero contact data only. */
export const getHeroContact = cache(async (): Promise<LayoutContact | null> => {
  return fetchSingle<LayoutContact>(
    "/bprservice-layout?fields[0]=lineId&fields[1]=phoneNumber"
  )
})

/** Homepage singleton: hero copy/image + feature cards. */
export const getHomePage = cache(async (): Promise<HomePage | null> => {
  return fetchSingle<HomePage>(
    "/bprservice-home-page?fields[0]=heroTitle&fields[1]=heroSubtitle&populate[heroImage]=true&populate[features][populate]=icon&populate[seo]=true"
  )
})

/** Contact singleton: page copy + SEO metadata. */
export const getContactPage = cache(async (): Promise<ContactPage | null> => {
  return fetchSingle<ContactPage>(
    "/bprservice-contact-page?fields[0]=subtitle&fields[1]=description&fields[2]=mapTitle&populate[seo]=true"
  )
})

/** Works singleton: gallery images only. */
export const getWorksPage = cache(async (): Promise<WorksPage | null> => {
  return fetchSingle<WorksPage>(
    "/bprservice-works-page?populate[images]=true&populate[seo]=true"
  )
})

/** All brands for the homepage grid, sorted by CMS sort order. */
export const getBrands = cache(async (): Promise<Brand[]> => {
  return fetchList<Brand>(
    "/bprservice-brands?populate=logo&pagination[pageSize]=100&sort=sortOrder:asc"
  )
})

/** A single brand by Strapi documentId (for the product list heading). */
export const getBrand = cache(async (documentId: string): Promise<Brand | null> => {
  return fetchSingle<Brand>(
    `/bprservice-brands/${encodeURIComponent(documentId)}?populate=logo`
  )
})

/** Products belonging to a brand and AC unit type. */
export const getProductsByBrandAndUnitType = cache(
  async (
    brandDocumentId: string,
    unitType: UnitType
  ): Promise<Product[]> => {
    return fetchList<Product>(
      `/bprservice-products?filters[brand][documentId][$eq]=${encodeURIComponent(
        brandDocumentId
      )}&filters[unitType][$eq]=${encodeURIComponent(
        unitType
      )}&populate=image&populate=specs&pagination[pageSize]=100`
    )
  }
)
