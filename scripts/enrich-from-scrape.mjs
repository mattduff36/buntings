#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SCRAPE_DIR = join(ROOT, 'private', 'Buntings_scrape', 'buntingsagri.co.uk');
const OUT_DIR = join(ROOT, 'data', 'processed');

function stripHtml(html) {
  return (html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function readHtml(filename) {
  const path = join(SCRAPE_DIR, filename);
  if (!existsSync(path)) return null;
  return readFileSync(path, 'utf-8');
}

const extras = {
  heroSlides: [],
  footerInfo: {
    address: 'Franderground Farm, Kirkby Lane, Pinxton, Nottinghamshire, NG16 6JB',
    phone: '01623 752158',
    mobile: '07970061595',
    email: 'sales@buntingsagri.co.uk',
  },
  priceListPages: [],
  navCategories: [],
};

console.log('Extracting content from scraped HTML…');

const homepage = readHtml('index.html');
if (homepage) {
  const slideRegex = /swiper-slide[^>]*>(?:<a[^>]*>)?<img\s+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi;
  let match;
  while ((match = slideRegex.exec(homepage)) !== null) {
    extras.heroSlides.push({
      imageSrc: match[1],
      alt: match[2],
    });
  }
  console.log(`  Found ${extras.heroSlides.length} hero slides.`);

  const navRegex = /<li[^>]*class="dropdown"[^>]*><a[^>]*>([^<]+)<\/a>/gi;
  while ((match = navRegex.exec(homepage)) !== null) {
    extras.navCategories.push(stripHtml(match[1]));
  }
  console.log(`  Found ${extras.navCategories.length} nav categories.`);
}

const siteMeta = JSON.parse(readFileSync(join(OUT_DIR, 'site.meta.json'), 'utf-8'));
extras.footerInfo.address = siteMeta.address || extras.footerInfo.address;
extras.footerInfo.phone = siteMeta.telephone?.split('Mob:')[0]?.trim() || extras.footerInfo.phone;
extras.footerInfo.mobile = siteMeta.telephone?.split('Mob:')[1]?.trim() || extras.footerInfo.mobile;
extras.footerInfo.email = siteMeta.email || extras.footerInfo.email;
extras.footerInfo.storeName = siteMeta.storeName;

const pricePages = ['indexeca6.html', 'indexe245.html', 'indexce0b.html'];
const priceNames = ['Timber Price List', 'Metal & Wooden Gate Price Lists', 'Stocknetting & Wire'];
for (let i = 0; i < pricePages.length; i++) {
  const html = readHtml(pricePages[i]);
  if (html) {
    const contentMatch = html.match(/<div id="content"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i);
    extras.priceListPages.push({
      title: priceNames[i],
      hasContent: !!contentMatch,
      snippet: contentMatch ? stripHtml(contentMatch[1]).substring(0, 500) : null,
    });
  }
}
console.log(`  Found ${extras.priceListPages.length} price list pages.`);

extras.extractedAt = new Date().toISOString();

writeFileSync(join(OUT_DIR, 'content.extras.json'), JSON.stringify(extras, null, 2), 'utf-8');
console.log('  ✓ content.extras.json');
console.log('Done.');
