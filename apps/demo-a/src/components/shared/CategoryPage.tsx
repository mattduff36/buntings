import { Column, Row, Heading, Text, Grid, Button } from '@once-ui-system/core';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import categoriesRaw from '@data/categories.raw.json';
import products from '@data/products.enriched.json';

function extractId(slug: string): number | null {
  const match = slug.match(/-(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}

export function getCategoryStaticParams() {
  return (categoriesRaw as any[])
    .filter((c: any) => c.status === 1)
    .map((c: any) => ({
      slug: `${c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${c.id}`,
    }));
}

export function CategoryPage({ slug, basePath, ProductCard }: { slug: string; basePath: string; ProductCard: React.ComponentType<{ product: any }> }) {
  const categoryId = extractId(slug);
  if (!categoryId) notFound();

  const category = (categoriesRaw as any[]).find((c: any) => c.id === categoryId);
  if (!category) notFound();

  const allCategories = categoriesRaw as any[];
  const childIds = allCategories.filter((c: any) => c.parentId === categoryId).map((c: any) => c.id);
  const relevantIds = [categoryId, ...childIds];

  const categoryProducts = (products as any[])
    .filter((p: any) => p.status === 1 && p.categoryIds.some((cid: number) => relevantIds.includes(cid)))
    .sort((a: any, b: any) => a.sortOrder - b.sortOrder);

  const subcategories = allCategories.filter((c: any) => c.parentId === categoryId && c.status === 1);

  return (
    <Column gap="l">
      <Column gap="s">
        <Link href={`${basePath}/categories`} style={{ textDecoration: 'none' }}>
          <Text variant="label-default-xs" onBackground="neutral-weak">&larr; All Categories</Text>
        </Link>
        <Heading as="h1" variant="display-strong-m">{category.name}</Heading>
        {category.descriptionText && (
          <Text variant="body-default-m" onBackground="neutral-weak">{category.descriptionText}</Text>
        )}
      </Column>

      {subcategories.length > 0 && (
        <Row gap="s" wrap>
          {subcategories.map((sub: any) => (
            <Link key={sub.id} href={`${basePath}/category/${sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${sub.id}`}>
              <Button variant="secondary" size="s" label={sub.name} />
            </Link>
          ))}
        </Row>
      )}

      {categoryProducts.length > 0 ? (
        <Grid gap="m" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
          {categoryProducts.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Grid>
      ) : (
        <Text variant="body-default-m" onBackground="neutral-weak">
          No products currently listed in this category.
        </Text>
      )}
    </Column>
  );
}
