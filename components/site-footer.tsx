import Image from "next/image"
import Link from "next/link"

import { NAV_ITEMS } from "@/lib/constants"
import { mediaUrl } from "@/lib/media"
import type { Layout } from "@/lib/types"

function lineHref(lineId: string) {
  return `https://line.me/R/ti/p/${encodeURIComponent(lineId)}`
}

function phoneHref(phoneNumber: string) {
  return `tel:${phoneNumber.replace(/[^\d+]/g, "")}`
}

export function SiteFooter({ siteLayout }: { siteLayout: Layout | null }) {
  const logoSrc = mediaUrl(siteLayout?.logo)
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-[#f4faff]">
      <div className="container grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1.2fr] md:py-12">
        <div className="space-y-4">
          <Link href="/" className="inline-flex max-w-48 items-center">
            {logoSrc && siteLayout?.logo?.width && siteLayout.logo.height ? (
              <Image
                src={logoSrc}
                alt={siteLayout.logo.alternativeText || "BPR Service"}
                width={siteLayout.logo.width}
                height={siteLayout.logo.height}
                sizes="192px"
                className="h-12 w-auto object-contain"
              />
            ) : (
              <span className="text-lg leading-none font-bold tracking-tight text-primary">
                BPR <span className="font-medium text-foreground">Service</span>
              </span>
            )}
          </Link>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            ศูนย์บริการแอร์คุณภาพ ติดตั้ง ซ่อม และดูแลโดยช่างมืออาชีพ
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">เมนู</h2>
          <nav className="mt-4 grid gap-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">ติดต่อเรา</h2>
          <div className="mt-4 grid gap-3">
            {siteLayout?.lineId && (
              <a
                href={lineHref(siteLayout.lineId)}
                target="_blank"
                rel="noreferrer"
                className="flex min-w-0 items-center gap-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#06C755] [&_img]:brightness-0 [&_img]:invert">
                  <Image
                    src="/icons/line.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="size-5"
                  />
                </span>
                <span className="min-w-0 break-words">{siteLayout.lineId}</span>
              </a>
            )}
            {siteLayout?.phoneNumber && (
              <a
                href={phoneHref(siteLayout.phoneNumber)}
                className="flex min-w-0 items-center gap-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#2297e8] [&_img]:brightness-0 [&_img]:invert">
                  <Image
                    src="/icons/phone-call.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="size-5"
                  />
                </span>
                <span className="min-w-0 break-words">
                  {siteLayout.phoneNumber}
                </span>
              </a>
            )}
            {!siteLayout?.lineId && !siteLayout?.phoneNumber && (
              <Link
                href="/contact"
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                ไปที่หน้าติดต่อเรา
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="container py-4 text-xs text-center text-muted-foreground">
          <p>© {year} BPR Service. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
