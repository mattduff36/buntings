import { Column, Row, Heading, Text, Grid, Button } from '@once-ui-system/core';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, FolderOpen } from 'lucide-react';

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

  const subcategories = allCategories
    .filter((c: any) => c.parentId === categoryId && c.status === 1 && c.name && c.name.trim().length > 0);

  return (
    <Column gap="l">
      <Column gap="s">
        <Link href={`${basePath}/categories`} style={{ textDecoration: 'none' }}>
          <Row gap="xs" vertical="center">
            <ArrowLeft size={14} />
            <Text variant="label-default-xs" onBackground="neutral-weak">All Categories</Text>
          </Row>
        </Link>
        <Row gap="m" vertical="center">
          <Heading as="h1" variant="display-strong-m">{category.name || 'Category'}</Heading>
          {categoryProducts.length > 0 && (
            <div style={{
              background: 'var(--brand-alpha-weak, rgba(0,128,0,0.08))',
              color: 'var(--brand-strong)',
              fontSize: 12,
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: 12,
            }}>
              {categoryProducts.length} items
            </div>
          )}
        </Row>
        {category.descriptionText && (
          <Text variant="body-default-m" onBackground="neutral-weak" style={{ maxWidth: 600 }}>
            {category.descriptionText}
          </Text>
        )}
      </Column>

      {subcategories.length > 0 && (
        <div style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          padding: '12px 16px',
          background: 'var(--surface-background, var(--background))',
          borderRadius: 'var(--radius-l)',
          border: '1px solid var(--neutral-alpha-weak, rgba(0,0,0,0.06))',
        }}>
          <Row gap="xs" vertical="center" style={{ marginRight: 8 }}>
            <FolderOpen size={14} style={{ opacity: 0.5 }} />
            <Text variant="label-default-xs" onBackground="neutral-weak">Subcategories:</Text>
          </Row>
          {subcategories.map((sub: any) => (
            <Link key={sub.id} href={`${basePath}/category/${sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${sub.id}`}>
              <Button variant="secondary" size="s" label={sub.name} />
            </Link>
          ))}
        </div>
      )}

      {categoryProducts.length > 0 ? (
        <Grid gap="m" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
          {categoryProducts.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Grid>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '48px 24px',
          borderRadius: 'var(--radius-l)',
          background: 'var(--surface-background, var(--background))',
          border: '1px solid var(--neutral-alpha-weak, rgba(0,0,0,0.06))',
        }}>
          <Text variant="body-default-m" onBackground="neutral-weak">
            No products currently listed in this category.
          </Text>
        </div>
      )}
    </Column>
  );
}
