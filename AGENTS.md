# BPR Service Agent Notes

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Shape

- Next.js app router project using TypeScript, Tailwind CSS, and shadcn/ui primitives.
- Content comes from Strapi REST APIs at build time.
- The deployed artifact is static HTML/assets from `next build` with `output: "export"`.
- The generated `out/` directory is copied to a VPS Apache document root over `scp`.
- Dev port is `3002`.
- This app owns the `bprservice-*` Strapi API domain in `../strapi-global`.

## Static Export Rules

- Do not add request-time rendering for deployed pages. Avoid `force-dynamic`, server actions, middleware, route handlers, rewrites, or API routes for production behavior.
- Dynamic routes must define `generateStaticParams()` and `dynamicParams = false`.
- Query-string driven server pages are not suitable for the exported site. Prefer real static paths such as `/brands/[id]` or `/products/[slug]`.
- Remote Strapi images must work as plain browser URLs. `next/image` is configured with `unoptimized: true` because static export cannot use the Next image optimizer.
- `NEXT_PUBLIC_STRAPI_URL` must point to a Strapi/media URL that remains reachable from users' browsers after deployment, unless media files are separately mirrored.

## Verification

- Run `npm run typecheck` and `npm run lint` before handoff.
- Do not require `npm run build` or `dev/start` as part of routine verification on this project.
- Build output is `out/`.

## Documentation

- Read `docs/PROJECT.md` for the repo map.
- Read `../strapi-global/docs/domains/bprservice.md` for field-level CMS notes.

## Deployment

- Set `NEXT_PUBLIC_STRAPI_URL` and optional `STRAPI_TOKEN` in the build environment.
- Set `STATIC_DEPLOY_TARGET` to an scp destination such as `user@example.com:/var/www/html/`.
- Deploy with `npm run deploy:static`.
