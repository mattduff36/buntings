#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SQL_PATH = join(ROOT, 'private', 'buntin_db1_2026-03-05_19-12-20_backup.sql');
const OUT_DIR = join(ROOT, 'data', 'processed');

mkdirSync(OUT_DIR, { recursive: true });

const sql = readFileSync(SQL_PATH, 'utf-8');

function parseInserts(tableName, sql) {
  const rows = [];
  const pattern = new RegExp(
    `INSERT INTO \`${tableName}\`\\s*\\(([^)]+)\\)\\s*VALUES\\s*\\((.+?)\\);`,
    'gi'
  );
  let match;
  while ((match = pattern.exec(sql)) !== null) {
    const columns = match[1]
      .split(',')
      .map(c => c.trim().replace(/`/g, ''));
    const rawValues = match[2];
    const values = parseValues(rawValues);
    if (values.length === columns.length) {
      const row = {};
      columns.forEach((col, i) => {
        row[col] = values[i];
      });
      rows.push(row);
    }
  }
  return rows;
}

function parseValues(raw) {
  const values = [];
  let i = 0;
  while (i < raw.length) {
    while (i < raw.length && raw[i] === ' ') i++;
    if (i >= raw.length) break;

    if (raw[i] === "'") {
      i++;
      let val = '';
      while (i < raw.length) {
        if (raw[i] === '\\' && i + 1 < raw.length) {
          const next = raw[i + 1];
          if (next === "'") { val += "'"; i += 2; }
          else if (next === '\\') { val += '\\'; i += 2; }
          else if (next === 'n') { val += '\n'; i += 2; }
          else if (next === 'r') { val += '\r'; i += 2; }
          else if (next === 't') { val += '\t'; i += 2; }
          else { val += next; i += 2; }
        } else if (raw[i] === "'" && i + 1 < raw.length && raw[i + 1] === "'") {
          val += "'";
          i += 2;
        } else if (raw[i] === "'") {
          i++;
          break;
        } else {
          val += raw[i];
          i++;
        }
      }
      values.push(val);
    } else {
      let val = '';
      while (i < raw.length && raw[i] !== ',') {
        val += raw[i];
        i++;
      }
      val = val.trim();
      values.push(val === 'NULL' ? null : val);
    }

    while (i < raw.length && raw[i] === ' ') i++;
    if (i < raw.length && raw[i] === ',') i++;
  }
  return values;
}

function decodeHtmlEntities(str) {
  if (!str) return str;
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 120);
}

console.log('Parsing SQL dump…');

const languageRows = parseInserts('oc_language', sql);
let languageId = '1';
if (languageRows.length > 0) {
  const en = languageRows.find(r => r.code === 'en-gb');
  if (en) {
    languageId = en.language_id;
    console.log(`Detected language_id=${languageId} for en-gb`);
  } else {
    languageId = languageRows[0].language_id;
    console.log(`No en-gb found, using first language_id=${languageId}`);
  }
} else {
  console.log('No oc_language table found, defaulting to language_id=1');
}

const categories = parseInserts('oc_category', sql);
const categoryDescs = parseInserts('oc_category_description', sql)
  .filter(r => r.language_id === languageId);
const categoryPaths = parseInserts('oc_category_path', sql);
const categoryToStore = parseInserts('oc_category_to_store', sql);

const products = parseInserts('oc_product', sql);
const productDescs = parseInserts('oc_product_description', sql)
  .filter(r => r.language_id === languageId);
const productToCategory = parseInserts('oc_product_to_category', sql);
const productImages = parseInserts('oc_product_image', sql);

const manufacturers = parseInserts('oc_manufacturer', sql);
const manufacturerToStore = parseInserts('oc_manufacturer_to_store', sql);

const information = parseInserts('oc_information', sql);
const informationDescs = parseInserts('oc_information_description', sql)
  .filter(r => r.language_id === languageId);
const informationToStore = parseInserts('oc_information_to_store', sql);

const seoUrls = parseInserts('oc_seo_url', sql);
const settings = parseInserts('oc_setting', sql);

const descMap = Object.fromEntries(categoryDescs.map(d => [d.category_id, d]));
const categoriesRaw = categories.map(c => {
  const desc = descMap[c.category_id] || {};
  return {
    id: Number(c.category_id),
    name: decodeHtmlEntities(desc.name || ''),
    description: decodeHtmlEntities(desc.description || ''),
    descriptionText: stripHtml(decodeHtmlEntities(desc.description || '')),
    parentId: Number(c.parent_id),
    image: c.image || null,
    sortOrder: Number(c.sort_order || 0),
    status: Number(c.status),
    metaTitle: decodeHtmlEntities(desc.meta_title || ''),
    metaDescription: decodeHtmlEntities(desc.meta_description || ''),
    top: Number(c.top || 0),
    column: Number(c.column || 0),
  };
});

function buildTree(items, parentId = 0) {
  return items
    .filter(i => i.parentId === parentId && i.status === 1)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(item => ({
      ...item,
      children: buildTree(items, item.id),
    }));
}

const categoriesTree = buildTree(categoriesRaw);

const prodDescMap = Object.fromEntries(productDescs.map(d => [d.product_id, d]));
const prodCatMap = {};
productToCategory.forEach(pc => {
  if (!prodCatMap[pc.product_id]) prodCatMap[pc.product_id] = [];
  prodCatMap[pc.product_id].push(Number(pc.category_id));
});
const prodImgMap = {};
productImages.forEach(pi => {
  if (!prodImgMap[pi.product_id]) prodImgMap[pi.product_id] = [];
  prodImgMap[pi.product_id].push({
    image: pi.image,
    sortOrder: Number(pi.sort_order || 0),
  });
});
prodImgMap && Object.values(prodImgMap).forEach(arr =>
  arr.sort((a, b) => a.sortOrder - b.sortOrder)
);

const mfgMap = Object.fromEntries(manufacturers.map(m => [m.manufacturer_id, m.name]));

const productsRaw = products.map(p => {
  const desc = prodDescMap[p.product_id] || {};
  return {
    id: Number(p.product_id),
    name: decodeHtmlEntities(desc.name || ''),
    model: p.model || '',
    sku: p.sku || '',
    price: parseFloat(p.price) || 0,
    quantity: Number(p.quantity || 0),
    stockStatusId: Number(p.stock_status_id || 0),
    image: p.image || null,
    manufacturerId: Number(p.manufacturer_id || 0),
    status: Number(p.status),
    viewed: Number(p.viewed || 0),
    dateAdded: p.date_added,
    dateModified: p.date_modified,
    descriptionHtml: decodeHtmlEntities(desc.description || ''),
    metaTitle: decodeHtmlEntities(desc.meta_title || ''),
    metaDescription: decodeHtmlEntities(desc.meta_description || ''),
    sortOrder: Number(p.sort_order || 0),
  };
});

const productsEnriched = products.map(p => {
  const desc = prodDescMap[p.product_id] || {};
  const decodedHtml = decodeHtmlEntities(desc.description || '');
  const additionalImages = (prodImgMap[p.product_id] || []).map(i => i.image);
  const allImages = [p.image, ...additionalImages].filter(Boolean);

  return {
    id: Number(p.product_id),
    name: decodeHtmlEntities(desc.name || ''),
    slug: slugify(decodeHtmlEntities(desc.name || '') || p.model || `product-${p.product_id}`),
    descriptionHtml: decodedHtml,
    descriptionText: stripHtml(decodedHtml),
    model: p.model || '',
    sku: p.sku || '',
    price: parseFloat(p.price) || 0,
    quantity: Number(p.quantity || 0),
    stockStatusId: Number(p.stock_status_id || 0),
    stockStatus: Number(p.quantity) > 0 ? 'In Stock' : 'Out of Stock',
    mainImagePath: p.image || null,
    imagePaths: allImages,
    categoryIds: prodCatMap[p.product_id] || [],
    manufacturer: mfgMap[p.manufacturer_id] || null,
    manufacturerId: Number(p.manufacturer_id || 0),
    status: Number(p.status),
    viewed: Number(p.viewed || 0),
    dateAdded: p.date_added,
    dateModified: p.date_modified,
    sortOrder: Number(p.sort_order || 0),
    mainImageUrl: null,
    imageUrls: [],
    imageSource: null,
    imageMatchConfidence: null,
  };
});

const manufacturersOut = manufacturers.map(m => ({
  id: Number(m.manufacturer_id),
  name: m.name,
  image: m.image || null,
  sortOrder: Number(m.sort_order || 0),
}));

const pagesRaw = information.map(info => {
  const desc = informationDescs.find(d => d.information_id === info.information_id) || {};
  return {
    id: Number(info.information_id),
    title: decodeHtmlEntities(desc.title || ''),
    description: decodeHtmlEntities(desc.description || ''),
    bottom: Number(info.bottom || 0),
    sortOrder: Number(info.sort_order || 0),
    status: Number(info.status),
  };
});

const pagesEnriched = pagesRaw.map(p => ({
  id: p.id,
  title: p.title,
  slug: slugify(p.title || `page-${p.id}`),
  html: p.description,
  text: stripHtml(p.description),
  status: p.status,
  sortOrder: p.sortOrder,
  bottom: p.bottom,
}));

const seoUrlsOut = seoUrls.map(s => ({
  id: Number(s.seo_url_id),
  storeId: Number(s.store_id),
  languageId: Number(s.language_id),
  query: s.query,
  keyword: s.keyword,
}));

function getSettingValue(key) {
  const row = settings.find(s => s.key === key);
  return row ? row.value : null;
}

const siteMeta = {
  storeName: getSettingValue('config_name') || 'Buntings Agri Ltd.',
  owner: getSettingValue('config_owner') || '',
  email: getSettingValue('config_email') || '',
  telephone: getSettingValue('config_telephone') || '',
  address: (getSettingValue('config_address') || '').replace(/\\r\\n/g, '\n').replace(/\r\n/g, '\n'),
  generatedAt: new Date().toISOString(),
  languageId: Number(languageId),
  counts: {
    categories: categoriesRaw.length,
    activeCategories: categoriesRaw.filter(c => c.status === 1).length,
    products: productsEnriched.length,
    activeProducts: productsEnriched.filter(p => p.status === 1).length,
    pages: pagesEnriched.length,
    manufacturers: manufacturersOut.length,
    seoUrls: seoUrlsOut.length,
  },
};

function writeJson(filename, data) {
  const path = join(OUT_DIR, filename);
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`  ✓ ${filename} (${Array.isArray(data) ? data.length + ' items' : 'object'})`);
}

console.log('\nWriting JSON files…');
writeJson('categories.raw.json', categoriesRaw);
writeJson('categories.tree.json', categoriesTree);
writeJson('products.raw.json', productsRaw);
writeJson('products.enriched.json', productsEnriched);
writeJson('manufacturers.json', manufacturersOut);
writeJson('pages.raw.json', pagesRaw);
writeJson('pages.enriched.json', pagesEnriched);
writeJson('seo_urls.json', seoUrlsOut);
writeJson('site.meta.json', siteMeta);

console.log('\nDone. Site meta:', JSON.stringify(siteMeta.counts, null, 2));
