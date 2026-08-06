# BPR Service

Static-exported Next.js site backed by Strapi content, styled with Tailwind CSS
and shadcn/ui components.

## Local Development

Create `.env` from `.env.example` and point it at Strapi:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STRAPI_TOKEN=your-strapi-api-token-here
```

Run the app:

```bash
npm run dev
```

## Static Export

This app is configured with `output: "export"`. `next build` writes static
HTML and assets to `out/`.

```bash
npm run build
```

Important constraints:

- Strapi must be reachable during the build.
- Set `NEXT_PUBLIC_SITE_URL` to the public website origin before production
  builds so canonical URLs, robots, sitemap, and structured data are correct.
- Dynamic pages must be enumerable with `generateStaticParams()`.
- Strapi media URLs must remain browser-accessible after deployment, unless you
  mirror media separately.

## Deploy To Apache Over SCP

Set the destination to your VPS Apache document root, then build and copy `out/`:

```bash
export STATIC_DEPLOY_TARGET='user@example.com:/var/www/html/'
npm run deploy:static
```

## Adding shadcn/ui Components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button"
```
