import type { Metadata } from "next"

import { WorksGallery } from "@/components/works/works-gallery"
import { getWorksPage } from "@/lib/strapi"
import { mediaUrl, toMediaArray } from "@/lib/media"
import { seoMetadata } from "@/lib/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const works = await getWorksPage()

  return seoMetadata(works?.seo, {
    title: "ผลงานของเรา",
    description:
      "ชมผลงานติดตั้ง ซ่อม และดูแลเครื่องปรับอากาศโดยทีมช่าง BPR Service",
  })
}

export default async function WorksPage() {
  const works = await getWorksPage()
  const images = toMediaArray(works?.images)
  const photos = images
    .map((image, index) => {
      const src = mediaUrl(image)
      if (!src) return null

      return {
        src,
        width: image.width ?? 4,
        height: image.height ?? 3,
        alt:
          image.alternativeText?.trim() ||
          `ผลงานติดตั้งแอร์ภาพที่ ${index + 1}`,
      }
    })
    .filter((photo): photo is NonNullable<typeof photo> => photo !== null)

  return (
    <main>
      <div className="container py-10 md:py-14">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          ผลงานของเรา
        </h1>

        {photos.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed bg-muted/30 p-10 text-center text-sm text-muted-foreground">
            ยังไม่มีรูปผลงาน
          </div>
        ) : (
          <div className="mt-8">
            <WorksGallery photos={photos} />
          </div>
        )}
      </div>
    </main>
  )
}
