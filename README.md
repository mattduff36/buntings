# Buntings Frontend Demo Rebuild

Three distinct frontend-only demo sites built from the same data pack, using **Once UI** + **Next.js**.

## Data Sources

| Source | Location |
|--------|----------|
| OpenCart SQL dump | `private/buntin_db1_2026-03-05_19-12-20_backup.sql` |
| Scraped site images (cache) | `private/Buntings_scrape/buntingsagri.co.uk/image/cache` |
| Scraped HTML pages | `private/Buntings_scrape/buntingsagri.co.uk/` |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Generate JSON data + resolve images
npm run data:build

# 3. Run a demo (pick one)
npm run demo:a   # Modern Minimal        (port 3001)
npm run demo:b   # Bold Cards            (port 3002)
npm run demo:c   # Catalogue-first Dense (port 3003)
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run data:parse` | Parse SQL dump into JSON files in `data/processed/` |
| `npm run data:images` | Resolve DB image paths to local cache files, copy into `public/legacy-images/` |
| `npm run data:enrich` | Extract extra content from scraped HTML |
| `npm run data:build` | Run all three data scripts in sequence |
| `npm run demo:a` | Start demo-a dev server |
| `npm run demo:b` | Start demo-b dev server |
| `npm run demo:c` | Start demo-c dev server |
| `npm run build:all` | Production build all three demos |

## Regenerating JSON

If the SQL dump or scrape assets change, re-run:

```bash
npm run data:build
```

This will re-parse the SQL, re-resolve images, and re-extract content. Then restart any running demo server to pick up the new data.

## Demo Themes

| Demo | Direction | Best For |
|------|-----------|----------|
| demo-a | Modern Minimal | Clean brand presentation, investor/partner audiences |
| demo-b | Bold Cards / Big Typography | Visual impact, showcasing product range |
| demo-c | Catalogue-first / Dense | Power users, quick scanning, price-list feel |

## Image QA

Each demo includes a `/qa/images` route that lists all products with their resolved image and confidence score. Use the filter toggles to quickly spot-check missing or low-confidence matches.

## Project Structure

```
buntings/
├── scripts/                  # Data generation scripts
├── data/
│   ├── raw/                  # (reserved for future raw exports)
│   └── processed/            # Generated JSON data packs
├── apps/
│   ├── demo-a/               # Next.js app — Modern Minimal
│   ├── demo-b/               # Next.js app — Bold Cards
│   └── demo-c/               # Next.js app — Catalogue-first
├── public/
│   └── legacy-images/        # Resolved product images (gitignored, regenerated)
├── deliverables/             # Client-facing notes
├── private/                  # SQL dump + scrape archive (gitignored)
└── package.json              # Workspace root
```
