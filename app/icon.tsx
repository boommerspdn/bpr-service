import { ImageResponse } from "next/og"

import { mediaUrl } from "@/lib/media"
import { getSiteLayout } from "@/lib/strapi"

export const dynamic = "force-static"
export const size = { width: 64, height: 64 }
export const contentType = "image/png"

export default async function Icon() {
  const siteLayout = await getSiteLayout()
  const logo = mediaUrl(siteLayout?.logo)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            alt=""
            width={size.width}
            height={size.height}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            B
          </div>
        )}
      </div>
    ),
    { ...size }
  )
}
