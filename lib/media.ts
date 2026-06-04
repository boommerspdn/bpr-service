import { STRAPI_URL } from "@/lib/env"
import type { StrapiMedia } from "@/lib/types"

/**
 * Resolve a Strapi media object to an absolute URL.
 * Relative urls (e.g. `/uploads/x.png`) are prefixed with STRAPI_URL;
 * already-absolute urls are returned as-is. Returns undefined when absent.
 */
export function mediaUrl(
  media: StrapiMedia | null | undefined
): string | undefined {
  const url = media?.url
  if (!url) return undefined
  if (url.startsWith("http://") || url.startsWith("https://")) return url
  return `${STRAPI_URL}${url}`
}

/** Normalize a single-or-array image field to an array of media objects. */
export function toMediaArray(
  image: StrapiMedia | StrapiMedia[] | null | undefined
): StrapiMedia[] {
  if (!image) return []
  return Array.isArray(image) ? image : [image]
}
