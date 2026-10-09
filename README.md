# Kelechi Alexander Ugoh portfolio

The personal portfolio of creative technologist Kelechi Alexander Ugoh, published under the name **Thunderboy**.

The visual direction brings the original portfolio's atmospheric background, centered layouts, and soft glass surfaces together with the Thunderboy wordmark, typography, and yellow accent.

## Stack

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS
- Sanity for portfolio content
- A clearly labelled email-app draft for contact

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Create `.env.local` with the services used by your environment. Keep values out of Git.

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
```

The Sanity project has public development fallbacks in `src/sanity/lib/client.ts`. The contact form opens a draft in the visitor's email app. The visitor reviews and sends it there; the website does not deliver email or claim successful delivery. Fields remain on the page if no email app opens. Direct email is always available.

## Useful commands

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

## Content model

Projects are managed in Sanity and support:

- title and one-line summary;
- detailed description;
- thumbnail;
- technology list;
- live and source URLs;
- situation, task, action, and result notes.

The public Work page keeps each project concise. The longer notes remain available in Sanity for future case studies. Claims and metrics should be supported before publication.

## Brand assets

Canonical web assets live in `public/brand`. Preserve SVG view boxes, aspect ratios, and the transparent strike in the Thunderboy wordmark and Junction. Font licence files are included beside the font binaries.

## Release boundary

Local validation does not publish the website. Deployment, domain changes, repository pushes, and production environment-variable changes require a separate release action and verification pass.
