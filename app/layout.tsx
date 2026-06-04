import type { Metadata } from "next"
import { Geist_Mono, Noto_Sans_Thai } from "next/font/google"

import "./globals.css"
import { SiteHeader } from "@/components/site-header"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
