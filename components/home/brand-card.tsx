import Image from "next/image"
import Link from "next/link"

import { SERVICE_TYPES } from "@/lib/constants"
import { mediaUrl } from "@/lib/media"
import type { Brand } from "@/lib/types"
import { Card } from "@/components/ui/card"

const BRAND_FLAG_MAP: Record<string, keyof Brand> = {
  wall_unit: "wallUnit",
  floor_unit: "floorUnit",
  ceiling_cassette: "ceilingCassette",
  hanging_unit: "hangingUnit",
}

export function BrandCard({ brand }: { brand: Brand }) {
  const logo = mediaUrl(brand.logo)
  const activeTypes = SERVICE_TYPES.filter(({ key }) => brand[BRAND_FLAG_MAP[key]] === true)

  return (
    <Link
      href={`/products?brand=${brand.id}`}
      className="group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="flex h-full flex-row items-center gap-4 p-5 transition-colors group-hover:border-primary/40 group-hover:bg-accent/40">
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

        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {activeTypes.map(({ key, label, icon }) => (
            <li key={key} className="flex items-center gap-2">
              <Image src={icon} alt={label} width={16} height={16} className="size-4 object-contain" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </Card>
    </Link>
  )
}
