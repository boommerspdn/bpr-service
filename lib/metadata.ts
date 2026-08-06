import type { Metadata } from "next"

import { SITE_URL } from "@/lib/env"
import type { Seo } from "@/lib/types"

export const SITE_NAME = "BPR Service"
export const DEFAULT_SITE_TITLE = "BPR Service - ศูนย์บริการแอร์คุณภาพ"
export const DEFAULT_SITE_DESCRIPTION =
  "จำหน่าย ติดตั้ง ซ่อม และดูแลเครื่องปรับอากาศ ราคารวมติดตั้ง ประหยัดไฟ รับประกัน บริการโดยช่างมืออาชีพ"

type SeoMetadataFallback = {
  title: string
  description?: string | null
}

type SeoMetadataOptions = {
  path?: string
  image?: string | null
  type?: "website" | "article"
}

function clean(value?: string | null) {
  const trimmed = value?.trim()
  return trimmed || null
}

export function sitePath(path = "/") {
  if (path === "/") return "/"

  const normalized = path.startsWith("/") ? path : `/${path}`
  const lastSegment = normalized.split("/").pop() ?? ""
  if (lastSegment.includes(".")) return normalized

  return normalized.endsWith("/") ? normalized : `${normalized}/`
}

export function siteUrl(path = "/") {
  return `${SITE_URL}${sitePath(path)}`
}

export function seoMetadata(
  seo: Seo | null | undefined,
  fallback: SeoMetadataFallback,
  options: SeoMetadataOptions = {}
): Metadata {
  const title = clean(seo?.title) || clean(seo?.metaTitle) || fallback.title
  const description =
    clean(seo?.description) ||
    clean(seo?.metaDescription) ||
    clean(fallback.description) ||
    DEFAULT_SITE_DESCRIPTION
  const canonical = siteUrl(options.path)
  const image = clean(options.image)

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "th_TH",
      type: options.type ?? "website",
      ...(image
        ? {
            images: [
              {
                url: image,
                alt: title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  }
}
