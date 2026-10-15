# RSX landing page development guide

A Portuguese landing page for RSX, the native macOS screenshot and annotation app. Built with Vite, React, TypeScript, Tailwind CSS and shadcn/ui. Source code, comments and developer documentation are written in English; public product copy is in Portuguese.

## Getting started

Use Node.js 22.12+ and pnpm 11.25.0 (declared in `packageManager`).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Commands

```sh
pnpm check          # TypeScript verification
pnpm format:check   # Formatting verification
pnpm build          # Static preview build; noindex without SITE_URL
pnpm preview        # Serve dist locally on port 4173
pnpm test           # Desktop and mobile browser integration tests
pnpm lighthouse          # Lighthouse against the local preview
pnpm media          # Rebuild images and videos; requires FFmpeg and Chromium
```

Install the test browser once with `pnpm exec playwright install chromium`. The generated media are committed as project assets, so ordinary development and builds do not require FFmpeg or image generation access.

## Architecture

```text
src/
  App.tsx                       Page composition only
  components/
    ui/                         shadcn/ui primitives
    layout/                     Site header and footer
    media/                      On-demand video player and playback fallback
    brand.tsx                   Shared product identity
    icon.tsx                    Product icon set
  features/landing/components/   Landing sections, download cards and installation steps
  config/product.ts             Verified release, compatibility and download configuration
  content/faq.ts                 Public FAQ copy
  lib/utils.ts                  Shared class-name utility
  styles/                       Theme, base, layout, landing and responsive styles
scripts/                        Static HTML, production validation and media generation
tests/                          User-facing browser integration tests
assets/source/                  Original screenshots and generated background
public/media/                   Optimized website assets
```

shadcn/ui is configured through `components.json` and the `@/` import alias. Button, Badge, Card and Sheet are generated from the official registry and customized locally. Native HTML disclosures are used for the FAQ to keep it fully operable without JavaScript. The mobile Sheet supplies focus management, Escape dismissal and keyboard navigation.

## Static HTML and production SEO

`pnpm build` produces the Vite bundle and then prerenders the same React tree into `dist/index.html`. React hydrates that HTML in the browser. Product descriptions, FAQs and actual download links are present before JavaScript runs. Videos request their sources only after playback is requested.

Copy `.env.example` to `.env` and set `SITE_URL` to the final public HTTPS origin. Then run:

```sh
pnpm build:production
```

This command rejects a missing or invalid public origin. It generates the canonical address, absolute social image URLs, `SoftwareApplication` structured data, `robots.txt` and `sitemap.xml`. Without a configured origin, preview builds deliberately use `noindex, nofollow` and block crawling. No placeholder domain is shipped as the production address. Deployment and Search Console registration are separate steps.

## Releases and installation

`src/config/product.ts` contains GitHub assets verified on October 15, 2026. Version 0.3.0 supplies ZIP files for Apple Silicon and Intel with SHA-256 files. Its archives and bundled application still use **RXS**, while the current product brand is **RSX**. The page explains this distinction and the release's ad-hoc signature and lack of Apple notarization. Only update download configuration after confirming the new public assets.

## Visual assets

See [the visual asset provenance](../assets/README.md) for source attribution, generation prompt and reproduction details. The videos are animated demonstrations assembled from actual editor images, not recordings of a capture flow or a feature offered by the app. They contain no audio and include Portuguese WebVTT captions and a textual explanation on the page.

## Verification

The browser suite covers static HTML with JavaScript disabled, published download URLs, FAQ interactions, mobile navigation, on-demand media requests, actual playback and duration, failed playback fallback, keyboard access and reduced motion. Lighthouse reports and desktop/mobile screenshots are written to `output/qa/` and excluded from version control.
