const rawStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL

if (!rawStrapiUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_STRAPI_URL. Copy .env.example to .env and set the Strapi base URL."
  )
}

/** Strapi base URL, e.g. `http://localhost:1337` (no trailing slash). */
export const STRAPI_URL = rawStrapiUrl.replace(/\/$/, "")

/** Strapi REST API root, e.g. `http://localhost:1337/api`. */
export const API_URL = `${STRAPI_URL}/api`

/** Strapi API bearer token for authenticated requests. */
export const STRAPI_TOKEN = process.env.STRAPI_TOKEN ?? ""
