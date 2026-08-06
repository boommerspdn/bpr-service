import type { Metadata } from "next"
import { ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { seoMetadata } from "@/lib/metadata"
import { getContactPage, getSiteLayout } from "@/lib/strapi"
import { JsonLd, breadcrumbJsonLd } from "@/lib/structured-data"

function lineHref(lineId: string) {
  return `https://line.me/R/ti/p/${encodeURIComponent(lineId)}`
}

function phoneHref(phoneNumber: string) {
  return `tel:${phoneNumber.replace(/[^\d+]/g, "")}`
}

function googleMapsSearchHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`
}

function extractIframeSrc(value?: string | null) {
  if (!value) return null

  const trimmed = value.trim()
  const srcMatch = trimmed.match(/\ssrc=["']([^"']+)["']/i)

  return srcMatch?.[1] || trimmed
}

function getGoogleMapEmbedSrc(value?: string | null) {
  const src = extractIframeSrc(value)
  if (!src) return null

  try {
    const url = new URL(src)
    const hostname = url.hostname.replace(/^www\./, "")
    const isGoogleMapsHost =
      hostname === "google.com" ||
      hostname === "maps.google.com" ||
      hostname.endsWith(".google.com")

    const isEmbed =
      isGoogleMapsHost &&
      (url.pathname.startsWith("/maps/embed") ||
        url.searchParams.get("output") === "embed")

    return isEmbed ? url.toString() : null
  } catch {
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage()

  return seoMetadata(
    page?.seo,
    {
      title: "ติดต่อเรา",
      description:
        page?.description ||
        "ติดต่อ BPR Service สำหรับจำหน่าย ติดตั้ง ซ่อม และดูแลเครื่องปรับอากาศ นัดหมายผ่านโทรศัพท์หรือ LINE",
    },
    {
      path: "/contact",
    }
  )
}

export default async function ContactPage() {
  const [page, siteLayout] = await Promise.all([
    getContactPage(),
    getSiteLayout(),
  ])

  const subtitle = page?.subtitle || "สอบถามบริการติดตั้งและซ่อมแอร์"
  const description =
    page?.description ||
    "ติดต่อทีมงาน BPR Service เพื่อรับคำแนะนำ ตรวจหน้างาน และนัดหมายบริการจากช่างมืออาชีพ"
  const mapTitle = page?.mapTitle || "แผนที่"
  const hasContactDetails =
    siteLayout?.lineId || siteLayout?.phoneNumber || siteLayout?.address
  const mapEmbedSrc = getGoogleMapEmbedSrc(siteLayout?.googleMapEmbedSrc)
  const mapHref = siteLayout?.address
    ? googleMapsSearchHref(siteLayout.address)
    : siteLayout?.googleMapEmbedSrc || null

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "หน้าแรก", path: "/" },
          { name: "ติดต่อเรา", path: "/contact" },
        ])}
      />
      <section className="border-b bg-[#f4faff]">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              ติดต่อเรา
            </h1>
            <p className="mt-4 text-lg font-medium text-primary">{subtitle}</p>
            <p className="mt-4 max-w-2xl leading-7 whitespace-pre-line text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </section>

      <section className="container grid gap-8 py-10 md:grid-cols-[0.8fr_1.2fr] md:py-14">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            ช่องทางติดต่อ
          </h2>

          {hasContactDetails ? (
            <div className="mt-5 grid gap-3">
              {siteLayout?.phoneNumber && (
                <a
                  href={phoneHref(siteLayout.phoneNumber)}
                  className="flex min-w-0 items-center gap-4 rounded-lg border bg-background p-4 transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#2297e8] text-white">
                    <Phone className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-muted-foreground">
                      โทรศัพท์
                    </span>
                    <span className="block font-semibold break-words text-foreground">
                      {siteLayout.phoneNumber}
                    </span>
                  </span>
                </a>
              )}

              {siteLayout?.lineId && (
                <a
                  href={lineHref(siteLayout.lineId)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-w-0 items-center gap-4 rounded-lg border bg-background p-4 transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#06C755] text-white">
                    <MessageCircle className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-muted-foreground">
                      LINE
                    </span>
                    <span className="block font-semibold break-words text-foreground">
                      {siteLayout.lineId}
                    </span>
                  </span>
                </a>
              )}

              {siteLayout?.address && (
                <div className="flex min-w-0 items-start gap-4 rounded-lg border bg-background p-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <MapPin className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-muted-foreground">
                      ที่อยู่
                    </span>
                    <span className="block leading-7 font-semibold break-words whitespace-pre-line text-foreground">
                      {siteLayout.address}
                    </span>
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-5 rounded-lg border border-dashed bg-muted/30 p-6 text-sm text-muted-foreground">
              ยังไม่มีข้อมูลช่องทางติดต่อ
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">{mapTitle}</h2>

          {mapEmbedSrc ? (
            <div className="mt-5 overflow-hidden rounded-lg border bg-muted">
              <iframe
                src={mapEmbedSrc}
                title={mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full md:aspect-[16/10]"
              />
            </div>
          ) : (
            <div className="mt-5 flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed bg-[#f4faff] p-6 text-center md:aspect-[16/10]">
              <div className="flex max-w-sm flex-col items-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <MapPin className="size-7" aria-hidden="true" />
                </span>
                <p className="mt-4 text-base font-semibold text-foreground">
                  ยังไม่มีแผนที่ให้แสดง
                </p>
                {siteLayout?.address && (
                  <p className="mt-2 text-sm leading-6 whitespace-pre-line text-muted-foreground">
                    {siteLayout.address}
                  </p>
                )}
                {mapHref && (
                  <Button asChild className="mt-5">
                    <a href={mapHref} target="_blank" rel="noreferrer">
                      เปิดแผนที่
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
