import Image from "next/image"
import { ShieldCheck, Snowflake, Wrench, type LucideIcon } from "lucide-react"

import { mediaUrl } from "@/lib/media"
import type { HomePage } from "@/lib/types"

type Contact = {
  icon: string
  label: string
  className: string
  textClassName: string
}

function ContactItem({ icon, label, className, textClassName }: Contact) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className={className}>
        <Image src={icon} alt="" width={32} height={32} className="size-7" />
      </span>
      <span
        className={`min-w-0 text-2xl leading-tight font-bold tracking-normal sm:text-3xl md:text-[1.75rem] ${textClassName}`}
      >
        {label}
      </span>
    </div>
  )
}

const HERO_FEATURES: { title: string; icon: LucideIcon }[] = [
  { title: "บริการโดยช่างมืออาชีพ", icon: ShieldCheck },
  { title: "เย็นเร็ว ประหยัดไฟ", icon: Snowflake },
  { title: "ติดตั้งมาตรฐาน ทุกขั้นตอน", icon: Wrench },
]

function FeatureItem({
  title,
  icon: Icon,
}: {
  title: string
  icon: LucideIcon
}) {
  return (
    <li className="flex min-w-0 items-center gap-3 text-sm font-medium text-slate-700 sm:text-base lg:text-xl">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sky-100/60 text-primary shadow-sm ring-1 ring-primary/10">
        <Icon className="size-6" strokeWidth={1.9} aria-hidden />
      </span>
      <span className="min-w-0 leading-snug">{title}</span>
    </li>
  )
}

export function Hero({ home }: { home: HomePage | null }) {
  const image = mediaUrl(home?.heroImage)
  const contacts: Contact[] = []

  if (home?.lineId) {
    contacts.push({
      icon: "/icons/line.svg",
      label: home.lineId,
      className:
        "flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#06C755] text-white sm:size-14 [&_img]:brightness-0 [&_img]:invert",
      textClassName: "text-[#13bf51]",
    })
  }

  if (home?.phoneNumber) {
    contacts.push({
      icon: "/icons/phone-call.svg",
      label: home.phoneNumber,
      className:
        "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#2297e8] text-white sm:size-14 [&_img]:brightness-0 [&_img]:invert",
      textClassName: "text-[#2297e8]",
    })
  }

  if (!image && !home?.heroTitle && !home?.heroSubtitle) return null

  return (
    <section
      className="relative isolate flex min-h-[520px] overflow-hidden bg-[#eaf7ff] bg-cover bg-[position:58%_center] sm:min-h-[440px] lg:min-h-[380px] xl:bg-center"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/95 via-white/72 to-white/8 md:from-white/88 md:via-white/45 md:to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#eaf7ff]/80 via-transparent to-transparent md:hidden" />

      <div className="container flex items-center py-9">
        <div className="flex w-full max-w-[920px] flex-col gap-6 lg:max-w-[960px] lg:gap-7 2xl:max-w-[1040px]">
          <div className="space-y-3">
            {home?.heroTitle && (
              <h1 className="max-w-none text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.08] font-bold tracking-normal text-[#102f66] lg:whitespace-nowrap">
                {home.heroTitle}
              </h1>
            )}
            {home?.heroSubtitle && (
              <p className="max-w-none text-[clamp(1.2rem,2vw,1.875rem)] leading-snug font-medium tracking-normal text-slate-600">
                {home.heroSubtitle}
              </p>
            )}
          </div>

          {contacts.length > 0 && (
            <div className="flex flex-row flex-wrap items-center gap-x-6 gap-y-4 text-[#2297e8] sm:gap-x-10">
              {contacts.map((contact) => (
                <ContactItem key={contact.label} {...contact} />
              ))}
            </div>
          )}

          <ul className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4 lg:mt-8 lg:gap-x-10">
            {HERO_FEATURES.map((feature) => (
              <FeatureItem key={feature.title} {...feature} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
