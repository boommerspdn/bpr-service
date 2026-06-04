"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import { NAV_ITEMS } from "@/lib/constants"
import { mediaUrl } from "@/lib/media"
import type { StrapiMedia } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader({ logo }: { logo?: StrapiMedia | null }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const logoSrc = mediaUrl(logo)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex h-full min-w-0 items-center py-3"
          onClick={() => setOpen(false)}
        >
          {logoSrc && logo?.width && logo?.height ? (
            <Image
              src={logoSrc}
              alt={logo.alternativeText || "BPR Service"}
              width={logo.width}
              height={logo.height}
              priority
              sizes="160px"
              className="h-full w-auto object-contain"
            />
          ) : (
            <span className="text-lg leading-none font-bold tracking-tight text-primary">
              BPR <span className="font-medium text-foreground">Service</span>
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(pathname, item.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="เมนู"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open && (
        <nav className="border-t bg-background md:hidden">
          <div className="container flex flex-col py-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(pathname, item.href)
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
