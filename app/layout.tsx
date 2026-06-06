import type { Metadata } from "next"
import { Geist_Mono, Noto_Sans_Thai } from "next/font/google"

import "./globals.css"
import "react-photo-album/columns.css"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getHomePage } from "@/lib/strapi"
import { cn } from "@/lib/utils"

const notoSansThai = Noto_Sans_Thai({ subsets: ["thai", "latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "BPR Service - ศูนย์บริการแอร์คุณภาพ",
  description: "ราคารวมติดตั้ง ประหยัดไฟ รับประกัน บริการโดยช่างมืออาชีพ",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const home = await getHomePage()

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
        <div className="flex min-h-svh flex-col">
          <SiteHeader logo={home?.logo} />
          <div className="flex-1">{children}</div>
          <SiteFooter home={home} />
        </div>
      </body>
    </html>
  )
}
