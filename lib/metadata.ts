import type { Metadata } from "next"

import type { Seo } from "@/lib/types"

export const DEFAULT_SITE_TITLE = "BPR Service - ศูนย์บริการแอร์คุณภาพ"
export const DEFAULT_SITE_DESCRIPTION =
  "ราคารวมติดตั้ง ประหยัดไฟ รับประกัน บริการโดยช่างมืออาชีพ"

type SeoMetadataFallback = {
  title: string
  description?: string | null
}

function clean(value?: string | null) {
  const trimmed = value?.trim()
  return trimmed || null
}

export function seoMetadata(
  seo: Seo | null | undefined,
  fallback: SeoMetadataFallback
): Metadata {
  const title = clean(seo?.title) || clean(seo?.metaTitle) || fallback.title
  const description =
    clean(seo?.description) ||
    clean(seo?.metaDescription) ||
    clean(fallback.description) ||
    DEFAULT_SITE_DESCRIPTION

  return {
    title,
    description,
  }
}
