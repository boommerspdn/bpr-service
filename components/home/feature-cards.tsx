import Image from "next/image"

import { mediaUrl } from "@/lib/media"
import type { Feature } from "@/lib/types"

export function FeatureCards({ features }: { features?: Feature[] }) {
  return (
    <section className="bg-white pt-0 pb-12 md:pb-16">
      <div className="container">
        {!features || features.length === 0 ? (
          <p className="rounded-lg bg-[#edf6ff] px-5 py-8 text-center text-sm text-[#64748b]">
            ยังไม่มีข้อมูลจุดเด่นของบริการ
          </p>
        ) : (
          <div className="grid overflow-hidden rounded-lg bg-[#edf6ff] lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                separated={index > 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function FeatureCard({
  feature,
  separated,
}: {
  feature: Feature
  separated?: boolean
}) {
  const icon = mediaUrl(feature.icon)

  return (
    <div
      className={`flex min-h-20 items-center gap-4 px-5 py-4 sm:px-6 lg:min-h-36 lg:gap-5 lg:px-6 xl:px-8 ${
        separated
          ? "border-t border-[rgba(43,103,185,0.15)] lg:border-t-0 lg:border-l"
          : ""
      }`}
    >
      <span className="flex size-14 shrink-0 items-center justify-center rounded-full text-[#2b67b9] sm:size-16">
        {icon && (
          <Image
            src={icon}
            alt=""
            width={64}
            height={64}
            className="size-14 object-contain md:size-16"
          />
        )}
      </span>
      <div className="min-w-0 space-y-1">
        <h3 className="text-xl leading-tight font-bold text-[#2b67b9] sm:text-2xl lg:text-[1.35rem] xl:text-2xl">
          {feature.title}
        </h3>
        {feature.description && (
          <p className="text-sm leading-snug text-[#475569] sm:text-[15px]">
            {feature.description}
          </p>
        )}
      </div>
    </div>
  )
}
