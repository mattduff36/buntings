export interface Category {
  id: number;
  name: string;
  description: string;
  descriptionText: string;
  parentId: number;
  image: string | null;
  sortOrder: number;
  status: number;
  metaTitle: string;
  metaDescription: string;
  top: number;
  column: number;
  children?: CategoryTree[];
}

export interface CategoryTree extends Category {
  children: CategoryTree[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  descriptionHtml: string;
  descriptionText: string;
  model: string;
  sku: string;
  price: number;
  quantity: number;
  stockStatusId: number;
  stockStatus: string;
  mainImagePath: string | null;
  imagePaths: string[];
  categoryIds: number[];
  manufacturer: string | null;
  manufacturerId: number;
  status: number;
  viewed: number;
  dateAdded: string;
  dateModified: string;
  sortOrder: number;
  mainImageUrl: string | null;
  imageUrls: string[];
  imageSource: string | null;
  imageMatchConfidence: 'high' | 'medium' | 'low' | 'missing' | null;
}

export interface Manufacturer {
  id: number;
  name: string;
  image: string | null;
  sortOrder: number;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  html: string;
  text: string;
  status: number;
  sortOrder: number;
  bottom: number;
}

export interface SeoUrl {
  id: number;
  storeId: number;
  languageId: number;
  query: string;
  keyword: string;
}

export interface SiteMeta {
  storeName: string;
  owner: string;
  email: string;
  telephone: string;
  address: string;
  generatedAt: string;
  languageId: number;
  counts: {
    categories: number;
    activeCategories: number;
    products: number;
    activeProducts: number;
    pages: number;
    manufacturers: number;
    seoUrls: number;
  };
}

export interface ContentExtras {
  heroSlides: { imageSrc: string; alt: string }[];
  footerInfo: {
    address: string;
    phone: string;
    mobile: string;
    email: string;
    storeName: string;
  };
  priceListPages: {
    title: string;
    hasContent: boolean;
    snippet: string | null;
  }[];
  navCategories: string[];
  extractedAt: string;
}

export interface ImageMapEntry {
  productId: number;
  mainDbPath: string | null;
  mainLocalUrl: string;
  mainConfidence: string;
  mainStage: string;
  galleryCount: number;
  galleryMissing: number;
}
