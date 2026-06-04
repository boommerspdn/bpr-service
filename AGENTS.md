# BPR Service Agent Notes

## Project Shape

- Next.js app router project using TypeScript, Tailwind CSS, and shadcn/ui primitives.
- Content comes from Strapi REST APIs at build time.
- The deployed artifact is static HTML/assets from `next build` with `output: "export"`.
- The generated `out/` directory is copied to a VPS Apache document root over `scp`.

## Static Export Rules

- Do not add request-time rendering for deployed pages. Avoid `force-dynamic`, server actions, middleware, route handlers, rewrites, or API routes for production behavior.
- Dynamic routes must define `generateStaticParams()` and `dynamicParams = false`.
- Query-string driven server pages are not suitable for the exported site. Prefer real static paths such as `/brands/[id]` or `/products/[slug]`.
- Remote Strapi images must work as plain browser URLs. `next/image` is configured with `unoptimized: true` because static export cannot use the Next image optimizer.
- `NEXT_PUBLIC_STRAPI_URL` must point to a Strapi/media URL that remains reachable from users' browsers after deployment, unless media files are separately mirrored.

## Verification

- Run `npm run typecheck` and `npm run lint` before handoff.
- Run `npm run build` when changing routing, data fetching, image handling, or static-export config.
- Build output is `out/`.

## Deployment

- Set `NEXT_PUBLIC_STRAPI_URL` and optional `STRAPI_TOKEN` in the build environment.
- Set `STATIC_DEPLOY_TARGET` to an scp destination such as `user@example.com:/var/www/html/`.
- Deploy with `npm run deploy:static`.
