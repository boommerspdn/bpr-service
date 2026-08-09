import { ImageResponse } from "next/og"

import { DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_TITLE, SITE_NAME } from "@/lib/metadata"

export const dynamic = "force-static"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.8, marginBottom: 24 }}>{SITE_NAME}</div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.2, maxWidth: 960 }}>
          {DEFAULT_SITE_TITLE}
        </div>
        <div style={{ fontSize: 28, opacity: 0.85, marginTop: 32, maxWidth: 900 }}>
          {DEFAULT_SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size }
  )
}
