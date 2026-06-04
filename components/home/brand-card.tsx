import Image from "next/image"
import Link from "next/link"

import { getActiveServiceTypes } from "@/lib/constants"
import { mediaUrl } from "@/lib/media"
import type { Brand } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function BrandCard({ brand }: { brand: Brand }) {
  const logo = mediaUrl(brand.logo)
  const activeTypes = getActiveServiceTypes(brand)

  return (
    <Card className="flex h-full flex-row items-center gap-4 p-5">
      <div className="relative flex h-14 w-24 shrink-0 items-center justify-center">
        {logo ? (
          <Image
            src={logo}
            alt={brand.name}
            fill
            sizes="96px"
            className="object-contain"
          />
        ) : (
          <span className="text-sm font-semibold text-foreground">
            {brand.name}
          </span>
        )}
      </div>

      <Separator orientation="vertical" className="h-12" />

      <ul className="min-w-0 flex-1 space-y-1.5 text-sm text-muted-foreground">
        {activeTypes.map(({ key, label, icon }) => (
          <li key={key}>
            <Link
              href={`/brands/${brand.documentId}/${key}`}
              className="flex w-full items-center gap-2 rounded-md p-1 transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Image
                src={icon}
                alt={label}
                width={16}
                height={16}
                className="size-4 object-contain"
              />
              <span className="min-w-0 truncate">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  )
}
