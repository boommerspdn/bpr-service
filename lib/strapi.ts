import { cache } from "react"

import { API_URL, STRAPI_TOKEN } from "@/lib/env"
import type {
  Brand,
  HomePage,
  Product,
  StrapiListResponse,
  StrapiSingleResponse,
} from "@/lib/types"

/**
 * Fetch a path under the Strapi API root and parse JSON.
 * Uncached by default (Next 16) — data is CMS-driven and may change.
 * On failure (network error or non-2xx, e.g. a 403 before public-role
 * permissions are set) it logs and returns `fallback` so pages can render
 * their empty states instead of crashing.
 */
async function strapiFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: {
        Accept: "application/json",
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      },
    })

    if (!res.ok) {
      console.warn(`Strapi request failed (${res.status}): ${path}`)
      return fallback
    }

    return (await res.json()) as T
  } catch (error) {
    console.warn(`Strapi request error: ${path}`, error)
    return fallback
  }
}

/** Homepage singleton: hero + feature cards. */
export const getHomePage = cache(async (): Promise<HomePage | null> => {
  const res = await strapiFetch<StrapiSingleResponse<HomePage>>(
    "/bprservice-home-page?populate[heroImage]=true&populate[features][populate]=icon",
    { data: null, meta: {} }
  )
  return res.data
})

/** All brands for the homepage grid, sorted by name. */
export const getBrands = cache(async (): Promise<Brand[]> => {
  const res = await strapiFetch<StrapiListResponse<Brand>>(
    "/bprservice-brands?populate=logo&pagination[pageSize]=100&sort=name:asc",
    { data: [], meta: {} }
  )
  return res.data
})

/** A single brand by numeric id (for the product list heading). */
export const getBrand = cache(async (id: string): Promise<Brand | null> => {
  const res = await strapiFetch<StrapiSingleResponse<Brand>>(
    `/bprservice-brands/${id}?populate=logo`,
    { data: null, meta: {} }
  )
  return res.data
})

/** Products belonging to a brand. */
export const getProductsByBrand = cache(
  async (brandId: string): Promise<Product[]> => {
    const res = await strapiFetch<StrapiListResponse<Product>>(
      `/bprservice-products?filters[brand][id][$eq]=${brandId}&populate=image&populate=specs&pagination[pageSize]=100`,
      { data: [], meta: {} }
    )
    return res.data
  }
)

/** A single product by its slug (UUID). Returns the first match or null. */
export const getProductBySlug = cache(
  async (slug: string): Promise<Product | null> => {
    const res = await strapiFetch<StrapiListResponse<Product>>(
      `/bprservice-products?filters[slug][$eq]=${encodeURIComponent(
        slug
      )}&populate=image&populate=brand.logo&populate=specs`,
      { data: [], meta: {} }
    )
    return res.data[0] ?? null
  }
)
