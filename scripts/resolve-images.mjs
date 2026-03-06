#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, statSync, readdirSync } from 'fs';
import { join, dirname, basename, extname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_DIR = join(ROOT, 'data', 'processed');
const CACHE_DIR = join(ROOT, 'private', 'Buntings_scrape', 'buntingsagri.co.uk', 'image', 'cache');
const DEST_DIR = join(ROOT, 'public', 'legacy-images');
const PLACEHOLDER_DIR = join(DEST_DIR, 'placeholders');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function walkDir(dir) {
  const results = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...walkDir(full));
      } else if (IMAGE_EXTS.has(extname(entry.name).toLowerCase())) {
        results.push(full);
      }
    }
  } catch { /* skip unreadable dirs */ }
  return results;
}

function stripSizeSuffix(stem) {
  return stem.replace(/-\d+x\d+$/, '');
}

function normalizeBasename(filePath) {
  const base = basename(filePath);
  const ext = extname(base).toLowerCase();
  const stem = base.slice(0, -ext.length);
  return { base, ext, stem, stemNorm: stripSizeSuffix(stem).toLowerCase() };
}

console.log('Indexing cache directory…');
const cacheFiles = walkDir(CACHE_DIR);
console.log(`  Found ${cacheFiles.length} image files in cache.`);

const cacheIndex = new Map();
const cacheFolderIndex = new Map();

for (const filePath of cacheFiles) {
  const { stemNorm, ext } = normalizeBasename(filePath);
  const key = stemNorm + ext;
  if (!cacheIndex.has(key)) cacheIndex.set(key, []);
  cacheIndex.get(key).push(filePath);

  const keyNoExt = stemNorm;
  if (!cacheIndex.has(keyNoExt)) cacheIndex.set(keyNoExt, []);
  cacheIndex.get(keyNoExt).push(filePath);

  const relPath = filePath.replace(CACHE_DIR, '').replace(/\\/g, '/').toLowerCase();
  const parts = relPath.split('/').filter(Boolean);
  for (const part of parts.slice(0, -1)) {
    const token = part.toLowerCase();
    if (!cacheFolderIndex.has(token)) cacheFolderIndex.set(token, []);
    cacheFolderIndex.get(token).push(filePath);
  }
}

function pickBest(candidates) {
  if (candidates.length === 0) return null;
  if (candidates.length === 1) return candidates[0];
  return candidates.reduce((best, cur) => {
    try {
      const bestSize = statSync(best).size;
      const curSize = statSync(cur).size;
      return curSize > bestSize ? cur : best;
    } catch {
      return best;
    }
  });
}

function resolveImage(dbPath) {
  if (!dbPath) return { match: null, confidence: null, stage: null, candidates: [] };

  const { stemNorm, ext } = normalizeBasename(dbPath);

  const exactKey = stemNorm + ext;
  const exactCandidates = cacheIndex.get(exactKey) || [];
  if (exactCandidates.length > 0) {
    return {
      match: pickBest(exactCandidates),
      confidence: 'high',
      stage: 'A',
      candidates: exactCandidates,
    };
  }

  const noExtCandidates = (cacheIndex.get(stemNorm) || []).filter(f => {
    const fExt = extname(f).toLowerCase();
    return IMAGE_EXTS.has(fExt);
  });
  if (noExtCandidates.length > 0) {
    return {
      match: pickBest(noExtCandidates),
      confidence: 'medium',
      stage: 'B',
      candidates: noExtCandidates,
    };
  }

  const dbDir = dirname(dbPath).replace(/\\/g, '/');
  const tokens = dbDir.split('/').filter(t => t && t !== '.' && t.toLowerCase() !== 'catalog');
  for (const token of tokens) {
    const folderCandidates = cacheFolderIndex.get(token.toLowerCase()) || [];
    if (folderCandidates.length > 0) {
      const stemLower = stemNorm;
      const fuzzy = folderCandidates.filter(f => {
        const fStem = normalizeBasename(f).stemNorm;
        return fStem.includes(stemLower) || stemLower.includes(fStem);
      });
      if (fuzzy.length > 0) {
        return {
          match: pickBest(fuzzy),
          confidence: 'low',
          stage: 'C',
          candidates: fuzzy,
        };
      }
    }
  }

  return { match: null, confidence: null, stage: 'D', candidates: [] };
}

const CATEGORY_PLACEHOLDERS = {
  tractors: 'tractor',
  trailers: 'trailer',
  machinery: 'machinery',
  livestock: 'livestock',
  fencing: 'fencing',
  default: 'equipment',
};

function generatePlaceholders(categoriesRaw) {
  mkdirSync(PLACEHOLDER_DIR, { recursive: true });
  const catKeywords = {};
  for (const cat of categoriesRaw) {
    const nameLower = (cat.name || '').toLowerCase();
    let matchedType = 'default';
    for (const [keyword, type] of Object.entries(CATEGORY_PLACEHOLDERS)) {
      if (keyword === 'default') continue;
      if (nameLower.includes(keyword)) {
        matchedType = type;
        break;
      }
    }
    catKeywords[cat.id] = matchedType;
  }

  const types = new Set(Object.values(CATEGORY_PLACEHOLDERS));
  for (const type of types) {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="700" viewBox="0 0 700 700">
  <rect width="700" height="700" fill="#e8e8e8"/>
  <text x="350" y="320" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#999">No Image Available</text>
  <text x="350" y="370" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#bbb">${type.charAt(0).toUpperCase() + type.slice(1)}</text>
</svg>`;
    writeFileSync(join(PLACEHOLDER_DIR, `${type}.svg`), svgContent);
  }

  return catKeywords;
}

console.log('\nLoading processed JSON…');
const products = JSON.parse(readFileSync(join(DATA_DIR, 'products.enriched.json'), 'utf-8'));
const categoriesRaw = JSON.parse(readFileSync(join(DATA_DIR, 'categories.raw.json'), 'utf-8'));

console.log('Generating category-based placeholders…');
const catKeywords = generatePlaceholders(categoriesRaw);

function getPlaceholderForProduct(product) {
  for (const catId of product.categoryIds) {
    const type = catKeywords[catId];
    if (type && type !== 'default') {
      return `/legacy-images/placeholders/${type}.svg`;
    }
  }
  return '/legacy-images/placeholders/equipment.svg';
}

const imageMap = [];
const imageMissing = [];
const imageCandidates = [];

let stats = { high: 0, medium: 0, low: 0, missing: 0, total: 0 };

console.log('\nResolving images for products…');
for (const product of products) {
  const mainResult = resolveImage(product.mainImagePath);
  let mainDestUrl = null;

  stats.total++;
  if (mainResult.match) {
    stats[mainResult.confidence]++;
    const ext = extname(mainResult.match).toLowerCase();
    const destDir = join(DEST_DIR, 'products', String(product.id));
    mkdirSync(destDir, { recursive: true });
    const destFile = join(destDir, `main${ext}`);
    copyFileSync(mainResult.match, destFile);
    mainDestUrl = `/legacy-images/products/${product.id}/main${ext}`;
  } else {
    stats.missing++;
    mainDestUrl = getPlaceholderForProduct(product);
    imageMissing.push({
      productId: product.id,
      productName: product.name,
      dbPath: product.mainImagePath,
      type: 'main',
    });
  }

  product.mainImageUrl = mainDestUrl;
  product.imageSource = 'cache';
  product.imageMatchConfidence = mainResult.confidence || 'missing';

  const galleryUrls = [];
  const galleryImages = (product.imagePaths || []).slice(1);
  for (let gi = 0; gi < galleryImages.length; gi++) {
    const gResult = resolveImage(galleryImages[gi]);
    if (gResult.match) {
      const ext = extname(gResult.match).toLowerCase();
      const destDir = join(DEST_DIR, 'products', String(product.id), 'gallery');
      mkdirSync(destDir, { recursive: true });
      const destFile = join(destDir, `${gi}${ext}`);
      copyFileSync(gResult.match, destFile);
      galleryUrls.push(`/legacy-images/products/${product.id}/gallery/${gi}${ext}`);
    } else {
      imageMissing.push({
        productId: product.id,
        productName: product.name,
        dbPath: galleryImages[gi],
        type: 'gallery',
        index: gi,
      });
    }
  }
  product.imageUrls = galleryUrls;

  imageMap.push({
    productId: product.id,
    mainDbPath: product.mainImagePath,
    mainLocalUrl: product.mainImageUrl,
    mainConfidence: product.imageMatchConfidence,
    mainStage: mainResult.stage,
    galleryCount: galleryUrls.length,
    galleryMissing: galleryImages.length - galleryUrls.length,
  });

  imageCandidates.push({
    productId: product.id,
    productName: product.name,
    mainDbPath: product.mainImagePath,
    mainMatch: mainResult.match ? mainResult.match.replace(CACHE_DIR, '').replace(/\\/g, '/') : null,
    mainStage: mainResult.stage,
    mainConfidence: mainResult.confidence,
    mainCandidateCount: mainResult.candidates.length,
    mainCandidates: mainResult.candidates.slice(0, 5).map(c =>
      c.replace(CACHE_DIR, '').replace(/\\/g, '/')
    ),
  });
}

function writeJson(filename, data) {
  writeFileSync(join(DATA_DIR, filename), JSON.stringify(data, null, 2), 'utf-8');
  console.log(`  ✓ ${filename}`);
}

console.log('\nWriting outputs…');
writeJson('products.enriched.json', products);
writeJson('image-map.json', imageMap);
writeJson('image-missing.json', imageMissing);
writeJson('image-candidates.json', imageCandidates);

console.log('\n=== Image Resolution Summary ===');
console.log(`Total products: ${stats.total}`);
console.log(`  High confidence (Stage A): ${stats.high}`);
console.log(`  Medium confidence (Stage B): ${stats.medium}`);
console.log(`  Low confidence (Stage C): ${stats.low}`);
console.log(`  Missing (Stage D): ${stats.missing}`);
console.log(`  Missing image entries: ${imageMissing.length}`);
console.log('Done.');
