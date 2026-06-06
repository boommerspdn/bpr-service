import { cache } from "react"

import { API_URL, STRAPI_TOKEN } from "@/lib/env"
import type {
  Brand,
  HomePage,
  Product,
  StrapiListResponse,
  StrapiSingleResponse,
  UnitType,
} from "@/lib/types"

/**
 * Fetch a path under the Strapi API root and parse JSON.
 * Uncached by default (Next 16) — data is CMS-driven and may change.
 * On failure (network error or non-2xx, e.g. a 403 before public-role
 * permissions are set) it logs and returns null so callers can render honest
 * empty states instead of crashing or showing demo content.
 */
async function strapiFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: {
        Accept: "application/json",
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      },
    })

    if (!res.ok) {
      console.warn(`Strapi request failed (${res.status}): ${path}`)
      return null
    }

    return (await res.json()) as T
  } catch (error) {
    console.warn(`Strapi request error: ${path}`, error)
    return null
  }
}

async function fetchSingle<T>(path: string): Promise<T | null> {
  const res = await strapiFetch<StrapiSingleResponse<T>>(path)
  return res?.data ?? null
}

async function fetchList<T>(path: string): Promise<T[]> {
  const res = await strapiFetch<StrapiListResponse<T>>(path)
  return res?.data ?? []
}

/** Homepage singleton: hero + feature cards. */
export const getHomePage = cache(async (): Promise<HomePage | null> => {
  return fetchSingle<HomePage>(
    "/bprservice-home-page?populate[logo]=true&populate[heroImage]=true&populate[features][populate]=icon"
  )
})

/** All brands for the homepage grid, sorted by name. */
export const getBrands = cache(async (): Promise<Brand[]> => {
  return fetchList<Brand>(
    "/bprservice-brands?populate=logo&pagination[pageSize]=100&sort=name:asc"
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
