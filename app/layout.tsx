import type { Metadata } from "next"
import { Geist_Mono, Noto_Sans_Thai } from "next/font/google"

import "./globals.css"
import "react-photo-album/columns.css"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import {
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_TITLE,
  SITE_NAME,
  siteUrl,
} from "@/lib/metadata"
import { getSiteLayout } from "@/lib/strapi"
import { JsonLd, localBusinessJsonLd } from "@/lib/structured-data"
import { cn } from "@/lib/utils"

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl("/")),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_SITE_TITLE,
    template: `%s | BPR Service`,
  },
  description: DEFAULT_SITE_DESCRIPTION,
  alternates: {
    canonical: siteUrl("/"),
  },
  openGraph: {
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    url: siteUrl("/"),
    siteName: SITE_NAME,
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteLayout = await getSiteLayout()

  return (
    <html
      lang="th"
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        notoSansThai.variable
      )}
    >
      <body>
        <JsonLd data={localBusinessJsonLd(siteLayout)} />
        <div className="flex min-h-svh flex-col">
          <SiteHeader logo={siteLayout?.logo} />
          <div className="flex-1">{children}</div>
          <SiteFooter siteLayout={siteLayout} />
        </div>
      </body>
    </html>
  )
}
