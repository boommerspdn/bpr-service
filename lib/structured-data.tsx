import { siteUrl, SITE_NAME } from "@/lib/metadata"
import { mediaUrl } from "@/lib/media"
import type { Brand, Layout, Product } from "@/lib/types"

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue | undefined }

function stripUndefined(value: JsonValue | undefined): JsonValue | undefined {
  if (Array.isArray(value)) {
    return value
      .map((item) => stripUndefined(item))
      .filter((item): item is JsonValue => item !== undefined)
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, item]) => [key, stripUndefined(item)])
        .filter((entry): entry is [string, JsonValue] => entry[1] !== undefined)
    )
  }

  return value
}

export function JsonLd({ data }: { data: JsonValue }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(stripUndefined(data)),
      }}
    />
  )
}

export function localBusinessJsonLd(siteLayout: Layout | null) {
  const logo = mediaUrl(siteLayout?.logo)

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: siteUrl("/"),
    logo,
    image: logo,
    telephone: siteLayout?.phoneNumber || undefined,
    address: siteLayout?.address
      ? {
          "@type": "PostalAddress",
          streetAddress: siteLayout.address,
          addressCountry: "TH",
        }
      : undefined,
    contactPoint: siteLayout?.phoneNumber
      ? {
          "@type": "ContactPoint",
          telephone: siteLayout.phoneNumber,
          contactType: "customer service",
          areaServed: "TH",
          availableLanguage: ["th"],
        }
      : undefined,
    sameAs: siteLayout?.lineId
      ? [`https://line.me/R/ti/p/${encodeURIComponent(siteLayout.lineId)}`]
      : undefined,
  } satisfies JsonValue
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl("/"),
    inLanguage: "th",
  } satisfies JsonValue
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: siteUrl(item.path),
    })),
  } satisfies JsonValue
}

export function productItemListJsonLd({
  brand,
  products,
  path,
}: {
  brand: Brand
  products: Product[]
  path: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: siteUrl(path),
    itemListElement: products.map((product, index) => {
      const image = Array.isArray(product.image)
        ? mediaUrl(product.image[0])
        : mediaUrl(product.image)
      const prices = product.specs
        ?.map((spec) => spec.price)
        .filter((price): price is number => typeof price === "number")
      const minPrice = prices?.length ? Math.min(...prices) : undefined

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          brand: {
            "@type": "Brand",
            name: brand.name,
          },
          image,
          offers: minPrice
            ? {
                "@type": "AggregateOffer",
                priceCurrency: "THB",
                lowPrice: minPrice,
                offerCount: prices?.length,
              }
            : undefined,
        },
      }
    }),
  } satisfies JsonValue
}
