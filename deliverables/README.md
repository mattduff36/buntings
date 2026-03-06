# Buntings Frontend Demo Deliverables

Three distinct frontend-only demo sites built from the same Buntings Agri data pack. Each demonstrates a different UI direction using Once UI + Next.js.

## Demo A — Modern Minimal

- **Theme:** Light, clean, generous whitespace
- **Typography:** Geist font family, moderate sizing
- **Colors:** Slate neutral, green brand, emerald accent
- **Layout:** Centered content, spacious product cards, clear hierarchy
- **Best for:** Clean brand presentation, investor/partner-facing demos, professional audiences

**Run:** `npm run demo:a` (port 3001)

## Demo B — Bold Cards / Big Typography

- **Theme:** Dark mode, high contrast
- **Typography:** Uppercase headings, large display text, 105% scaling
- **Colors:** Gray neutral, orange brand, yellow accent
- **Layout:** Edge-to-edge cards, 4:3 image ratios, manufacturer badges
- **Best for:** Visual impact, trade shows, product showcasing, social media screenshots

**Run:** `npm run demo:b` (port 3002)

## Demo C — Catalogue-first / Dense Clean

- **Theme:** Light, utilitarian
- **Typography:** 14px base, compact labels, 95% scaling
- **Colors:** Sand neutral, blue brand, cyan accent
- **Layout:** Dense grids, compact cards, quick-nav toolbar, phone/email in header
- **Best for:** Power users, quick scanning, price-list browsing, repeat buyers

**Run:** `npm run demo:c` (port 3003)

## Shared Features (All Demos)

- Homepage with featured categories and products
- Category browsing (tree structure with subcategories)
- Product detail pages with image gallery and enquiry CTA
- Content pages (About, Privacy, Terms, etc.)
- Contact page with phone, email, address
- Client-side image QA review page at `/qa/images`
- "Data last generated" timestamp in footer
- Local image serving (no remote dependencies)

## How to Capture Screenshots

1. Start a demo: `npm run demo:a`
2. Open browser to `http://localhost:3001`
3. Use browser DevTools to set viewport (e.g., 1440x900 for desktop)
4. Use browser's screenshot feature or a tool like:
   - Firefox: Ctrl+Shift+S (full page screenshot)
   - Chrome DevTools: Ctrl+Shift+P > "Capture full size screenshot"
5. Repeat for key pages: Home, Category, Product, Contact

## Data Regeneration

If SQL dump or scrape assets change:

```bash
npm run data:build
```

Then restart any running demo server.

## Image QA

Visit `/qa/images` on any running demo to review image resolution quality. Use the filter toggles to spot-check:
- **Missing** — products with no matched image (using placeholder)
- **Low Confidence** — products matched via folder-hint fallback (Stage C)

Current stats:
- 59 high confidence matches (exact basename)
- 50 medium confidence matches (extension swap)
- 8 low confidence matches (folder hint)
- 43 missing (placeholder)
