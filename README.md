# Buntings Agri — Demo Showcase

Three distinct frontend demo directions for the Buntings Agri website rebuild, all served from a single Next.js app. Built with **Once UI** + **Next.js 15**.

**Live:** Deployed on Vercel

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page — choose a demo |
| `/demo1/*` | **Modern Minimal** — light theme, green accents, clean whitespace |
| `/demo2/*` | **Bold Cards** — dark theme, orange/yellow, big typography |
| `/demo3/*` | **Catalogue Dense** — light theme, blue/cyan, compact layout |

Each demo includes: Home, Categories, Category Detail, Product Detail, Content Pages, Contact, and Image QA.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (port 4000)
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) to see the demo chooser.

## Regenerating Data

The data pipeline converts a local OpenCart SQL dump and scraped images into JSON + static assets:

```bash
npm run data:build
```

| Script | Description |
|--------|-------------|
| `npm run data:parse` | Parse SQL dump → JSON files in `data/processed/` |
| `npm run data:images` | Resolve DB image paths → copy to `public/legacy-images/` |
| `npm run data:enrich` | Extract extra content from scraped HTML |
| `npm run data:build` | Run all three in sequence |

### Data Sources

| Source | Location |
|--------|----------|
| OpenCart SQL dump | `private/buntin_db1_2026-03-05_19-12-20_backup.sql` |
| Scraped site images (cache) | `private/Buntings_scrape/buntingsagri.co.uk/image/cache` |
| Scraped HTML pages | `private/Buntings_scrape/buntingsagri.co.uk/` |

> The `private/` directory is gitignored. Data regeneration requires these source files locally. However, the generated JSON and images are committed to the repo, so the app runs without them.

## Demo Themes

| Demo | Direction | Best For |
|------|-----------|----------|
| Demo 1 | Modern Minimal | Clean brand presentation, professional audiences |
| Demo 2 | Bold Cards / Big Typography | Visual impact, trade shows, product showcasing |
| Demo 3 | Catalogue Dense | Power users, quick scanning, price-list browsing |

## Image QA

Each demo includes a `/demoN/qa/images` route that lists all products with their resolved image and confidence score. Use the filter toggles to spot-check missing or low-confidence matches.

## Project Structure

```
buntings/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Landing page (demo chooser)
│   │   ├── layout.tsx                # Root layout (fonts + Once UI)
│   │   ├── demo1/                    # Demo 1 routes + layout
│   │   ├── demo2/                    # Demo 2 routes + layout
│   │   └── demo3/                    # Demo 3 routes + layout
│   ├── components/
│   │   ├── shared/                   # Shared page components + context
│   │   ├── demo1/                    # Demo 1 Header + ProductCard
│   │   ├── demo2/                    # Demo 2 Header + ProductCard
│   │   └── demo3/                    # Demo 3 Header + ProductCard
│   └── resources/                    # Once UI config + custom CSS
├── scripts/                          # Data generation scripts
├── data/processed/                   # Generated JSON data
├── public/legacy-images/             # Resolved product images + placeholders
├── shared/                           # TypeScript types + data loaders
├── deliverables/                     # Client-facing notes
├── private/                          # SQL dump + scrape archive (gitignored)
├── package.json
├── tsconfig.json
└── next.config.mjs
```

## Build & Deploy

```bash
# Production build (553 static pages)
npm run build

# Start production server
npm run start
```

Vercel auto-detects as Next.js and deploys from `main`.
