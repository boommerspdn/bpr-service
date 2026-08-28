# BPR Service Project Notes

## Purpose

`bpr-service` is the BPR Service public site for air-conditioner services, brand browsing, works/gallery content, and product specs. It is a Next.js 16 App Router project using React 19, TypeScript, Tailwind CSS 4, and shadcn/ui primitives.

## Local Development

- Dev URL: `http://localhost:3002`
- Backend: `http://localhost:1337`
- Start only this app: `npm run dev`
- Start from workspace root: `npm run dev:bpr`

Required environment values:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3002
STRAPI_TOKEN=your-strapi-read-token
```

## Source Map

- `app/`: App Router routes and metadata files.
- `components/home`, `components/products`, `components/works`: domain UI areas.
- `components/ui`: reusable shadcn/ui primitives.
- `lib/strapi.ts`: Strapi REST fetch layer for the `bprservice-*` domain.
- `lib/types.ts`: frontend data contracts.
- `lib/env.ts`: required environment parsing.

## Strapi Domain

This app consumes the `bprservice-*` Strapi API group from `../strapi-global`:

- `GET /api/bprservice-layout`
- `GET /api/bprservice-home-page`
- `GET /api/bprservice-contact-page`
- `GET /api/bprservice-works-page`
- `GET /api/bprservice-brands`
- `GET /api/bprservice-brands/:id`
- `GET /api/bprservice-products`

See `../strapi-global/docs/domains/bprservice.md` for field-level API notes.

## Frontend Architecture

- The app is configured with `output: "export"` and `trailingSlash: true`.
- Strapi data is fetched during build/server render through `lib/strapi.ts`.
- Keep dynamic paths enumerable with `generateStaticParams()` and set `dynamicParams = false` for static export routes.
- Remote Strapi media must stay browser-accessible because images are unoptimized for static export.
- Use `node_modules/next/dist/docs/` before Next 16 API changes; this repo already includes the agent warning.

## Verification

Run before handoff:

```bash
npm run typecheck
npm run lint
```

Run `npm run build` when changing static routing, metadata, or Strapi-driven page generation.
