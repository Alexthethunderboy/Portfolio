# Kelechi Alexander Ugoh portfolio

The personal portfolio of Kelechi Alexander Ugoh, a developer transitioning into cybersecurity and currently training with **10Alytics**. Cybersecurity is the foreground of his direction, with application security (AppSec) as a natural bridge from development alongside broader security foundations. He continues building digital products and visual identities as **Thunderboy**.

[Explore Thunderboy](https://thunderboy.vercel.app)

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

## Editorial project order

Home and Work use the same order from `mergeProjects`. This is an editorial assessment of the real preview captures and repository-backed scope descriptions, not measured usage or performance. CineChive leads for its catalogue, archive, journal and backup workflow; DRAWN follows for its distinctive focused picker; TheGriot adds a distinctive interactive globe; AlienMint shows broader technical scope but retains its simulation/testnet limitations. Dumami Hair, DirDeo and Ace-in-art demonstrate visual direction; Kan Powers demonstrates a clear enquiry workflow; ThunderWeather, Shopper, TaxAble and ThunderSpace follow. Unverified checkout, transactions and tax correctness are not treated as proven functionality.

## Dependency risk disclosure

The local dependency review on 13 October 2026 records 22 vulnerable package entries (1 critical, 14 high, 7 moderate), down from 33 before targeted PrismJS, Sanity UUID-wrapper and adm-zip updates. Counts include inherited affected packages. The critical finding remains in the transitive Sanity CLI `decompress` archive-extraction chain; no critical public request path has been demonstrated. Unpatched build/watch and package-manager tooling findings remain. Local fixes do not establish that the deployed website uses these versions; this work must not be described as vulnerability-free.
