import { readFileSync } from 'fs';
import { join } from 'path';
import type {
  Category,
  CategoryTree,
  Product,
  Page,
  SiteMeta,
  ContentExtras,
  Manufacturer,
  SeoUrl,
  ImageMapEntry,
} from './types';

const DATA_DIR = join(process.cwd(), '..', '..', 'data', 'processed');

function loadJson<T>(filename: string): T {
  const raw = readFileSync(join(DATA_DIR, filename), 'utf-8');
  return JSON.parse(raw) as T;
}

let _categoriesRaw: Category[] | null = null;
let _categoriesTree: CategoryTree[] | null = null;
let _productsEnriched: Product[] | null = null;
let _pages: Page[] | null = null;
let _siteMeta: SiteMeta | null = null;
let _contentExtras: ContentExtras | null = null;
let _manufacturers: Manufacturer[] | null = null;
let _seoUrls: SeoUrl[] | null = null;
let _imageMap: ImageMapEntry[] | null = null;

export function getCategoriesRaw(): Category[] {
  if (!_categoriesRaw) _categoriesRaw = loadJson<Category[]>('categories.raw.json');
  return _categoriesRaw;
}

export function getCategoriesTree(): CategoryTree[] {
  if (!_categoriesTree) _categoriesTree = loadJson<CategoryTree[]>('categories.tree.json');
  return _categoriesTree;
}

export function getProducts(): Product[] {
  if (!_productsEnriched) _productsEnriched = loadJson<Product[]>('products.enriched.json');
  return _productsEnriched;
}

export function getActiveProducts(): Product[] {
  return getProducts().filter(p => p.status === 1);
}

export function getProductBySlugId(slug: string, id: number): Product | undefined {
  return getProducts().find(p => p.id === id);
}

export function getProductsByCategory(categoryId: number): Product[] {
  return getActiveProducts().filter(p => p.categoryIds.includes(categoryId));
}

export function getPages(): Page[] {
  if (!_pages) _pages = loadJson<Page[]>('pages.enriched.json');
  return _pages;
}

export function getPageBySlug(slug: string): Page | undefined {
  return getPages().find(p => p.slug === slug);
}

export function getSiteMeta(): SiteMeta {
  if (!_siteMeta) _siteMeta = loadJson<SiteMeta>('site.meta.json');
  return _siteMeta;
}

export function getContentExtras(): ContentExtras {
  if (!_contentExtras) _contentExtras = loadJson<ContentExtras>('content.extras.json');
  return _contentExtras;
}

export function getManufacturers(): Manufacturer[] {
  if (!_manufacturers) _manufacturers = loadJson<Manufacturer[]>('manufacturers.json');
  return _manufacturers;
}

export function getSeoUrls(): SeoUrl[] {
  if (!_seoUrls) _seoUrls = loadJson<SeoUrl[]>('seo_urls.json');
  return _seoUrls;
}

export function getImageMap(): ImageMapEntry[] {
  if (!_imageMap) _imageMap = loadJson<ImageMapEntry[]>('image-map.json');
  return _imageMap;
}

export function getActiveCategories(): Category[] {
  return getCategoriesRaw().filter(c => c.status === 1);
}

export function getCategoryById(id: number): Category | undefined {
  return getCategoriesRaw().find(c => c.id === id);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return getActiveProducts().filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.model.toLowerCase().includes(q) ||
    p.descriptionText.toLowerCase().includes(q) ||
    (p.manufacturer && p.manufacturer.toLowerCase().includes(q))
  );
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 120);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function getPlaceholderImage(): string {
  return '/legacy-images/placeholders/equipment.svg';
}

export function getProductImageUrl(product: Product): string {
  return product.mainImageUrl || getPlaceholderImage();
}
