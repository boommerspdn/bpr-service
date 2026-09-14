const rawStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL

if (!rawStrapiUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_STRAPI_URL. Copy .env.example to .env and set the Strapi base URL."
  )
}

/** Strapi base URL, e.g. `http://localhost:1337` (no trailing slash). */
export const STRAPI_URL = rawStrapiUrl.replace(/\/$/, "")

/** CMS REST API root. Defaults to Strapi and can point at the WordPress compatibility API. */
export const API_URL = `${STRAPI_URL}${process.env.NEXT_PUBLIC_CMS_API_PREFIX ?? "/api"}`

/** Strapi API bearer token for authenticated requests. */
export const STRAPI_TOKEN = process.env.STRAPI_TOKEN ?? ""

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL

/**
 * Public site origin used for canonical URLs, sitemap entries, and structured
 * data. Set NEXT_PUBLIC_SITE_URL in production; localhost keeps local builds
 * functional when the value is omitted.
 */
export const SITE_URL = (rawSiteUrl || "http://localhost:3000").replace(
  /\/$/,
  ""
)
