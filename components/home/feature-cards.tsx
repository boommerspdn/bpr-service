import Image from "next/image"
import { Leaf, ShieldCheck, Wrench, type LucideIcon } from "lucide-react"

import { mediaUrl } from "@/lib/media"
import type { Feature } from "@/lib/types"
import { Card } from "@/components/ui/card"

/** Static fallback cards mirroring the mockup when the CMS has no features. */
const FALLBACK: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "ราคารวมติดตั้ง",
    description: "รวมค่าแรง วัสดุ อุปกรณ์ ครบจบในที่เดียว",
    icon: Wrench,
  },
  {
    title: "ประหยัดไฟ SEER 5",
    description: "เทคโนโลยีประหยัดพลังงาน ช่วยลดค่าไฟ ให้ความเย็นสบาย",
    icon: Leaf,
  },
  {
    title: "รับประกัน 5 ปี",
    description: "มั่นใจในคุณภาพสินค้าและบริการ รับประกันคอมเพรสเซอร์ 5 ปี",
    icon: ShieldCheck,
  },
]

function FallbackCard({
  title,
  description,
  icon: Icon,
}: (typeof FALLBACK)[number]) {
  return (
    <Card className="flex flex-col items-center gap-3 p-6 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-7" aria-hidden />
      </span>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  )
}

function CmsCard({ feature }: { feature: Feature }) {
  const icon = mediaUrl(feature.icon)
  return (
    <Card className="flex flex-col items-center gap-3 p-6 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon && (
          <Image
            src={icon}
            alt=""
            width={28}
            height={28}
            className="object-contain"
          />
        )}
      </span>
      <h3 className="text-lg font-semibold">{feature.title}</h3>
      {feature.description && (
        <p className="text-sm text-muted-foreground">{feature.description}</p>
      )}
    </Card>
  )
}

export function FeatureCards({ features }: { features?: Feature[] }) {
  const hasFeatures = features && features.length > 0

  return (
    <section className="bg-muted/40">
      <div className="container grid gap-4 py-12 md:grid-cols-3 md:py-16">
        {hasFeatures
          ? features.map((feature) => (
              <CmsCard key={feature.id} feature={feature} />
            ))
          : FALLBACK.map((card) => <FallbackCard key={card.title} {...card} />)}
      </div>
    </section>
  )
}
