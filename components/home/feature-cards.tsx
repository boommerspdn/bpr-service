import Image from "next/image"
import type React from "react"
import { Leaf, ShieldCheck, Wrench, type LucideIcon } from "lucide-react"

import { mediaUrl } from "@/lib/media"
import type { Feature } from "@/lib/types"

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
  separated,
}: (typeof FALLBACK)[number] & { separated?: boolean }) {
  return (
    <FeatureItem
      title={title}
      description={description}
      icon={<Icon className="size-8" aria-hidden />}
      framedIcon
      separated={separated}
    />
  )
}

function CmsCard({
  feature,
  separated,
}: {
  feature: Feature
  separated?: boolean
}) {
  const icon = mediaUrl(feature.icon)
  return (
    <FeatureItem
      title={feature.title}
      description={feature.description}
      icon={
        icon && (
          <Image
            src={icon}
            alt=""
            width={64}
            height={64}
            className="size-14 object-contain md:size-16"
          />
        )
      }
      separated={separated}
    />
  )
}

function FeatureItem({
  title,
  description,
  icon,
  framedIcon,
  separated,
}: {
  title: string
  description?: string | null
  icon?: React.ReactNode
  framedIcon?: boolean
  separated?: boolean
}) {
  return (
    <div
      className={`flex min-h-20 items-center gap-4 px-5 py-4 sm:px-6 lg:min-h-36 lg:gap-5 lg:px-6 xl:px-8 ${
        separated ? "border-t border-primary/15 lg:border-t-0 lg:border-l" : ""
      }`}
    >
      <span
        className={`flex size-14 shrink-0 items-center justify-center rounded-full text-primary sm:size-16 ${
          framedIcon ? "border-2 border-primary bg-white" : ""
        }`}
      >
        {icon}
      </span>
      <div className="min-w-0 space-y-1">
        <h3 className="text-xl leading-tight font-bold text-primary sm:text-2xl lg:text-[1.35rem] xl:text-2xl">
          {title}
        </h3>
        {description && (
          <p className="text-sm leading-snug text-slate-500 sm:text-[15px]">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

function renderFeatureCards(features?: Feature[]) {
  if (features && features.length > 0) {
    return features.map((feature, index) => (
      <CmsCard key={feature.id} feature={feature} separated={index > 0} />
    ))
  }

  return FALLBACK.map((card, index) => (
    <FallbackCard key={card.title} {...card} separated={index > 0} />
  ))
}

export function FeatureCards({ features }: { features?: Feature[] }) {
  return (
    <section className="bg-white py-8 md:py-10">
      <div className="container">
        <div className="grid overflow-hidden rounded-lg bg-[#edf6ff] ring-1 ring-primary/5 lg:grid-cols-3">
          {renderFeatureCards(features)}
        </div>
      </div>
    </section>
  )
}
