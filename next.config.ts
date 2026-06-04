import type { NextConfig } from "next"

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${strapiUrl}/uploads/**`)],
    // Strapi runs on localhost in dev; Next.js blocks private IPs by default.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
  },
}

export default nextConfig
