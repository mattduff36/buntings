import { Column, Row, Heading, Text, Button, Grid, Card } from '@once-ui-system/core';
import Link from 'next/link';
import { ProductCard } from '@/components/demo1/ProductCard';

import categoriesTree from '@data/categories.tree.json';
import products from '@data/products.enriched.json';
import siteMeta from '@data/site.meta.json';

export default function Demo1Home() {
  const activeProducts = (products as any[]).filter((p: any) => p.status === 1);
  const featured = activeProducts.sort((a: any, b: any) => b.viewed - a.viewed).slice(0, 8);
  const topCategories = (categoriesTree as any[]).filter((c: any) => c.status === 1);

  return (
    <Column gap="xl">
      <Column gap="m" paddingY="xl" style={{ textAlign: 'center' }}>
        <Heading as="h1" variant="display-strong-l">Quality Agricultural Equipment</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" style={{ maxWidth: 600, margin: '0 auto' }}>
          New and used machinery, parts, sundries, and expert advice from {(siteMeta as any).storeName}.
        </Text>
        <Row gap="m" horizontal="center">
          <Link href="/demo1/categories">
            <Button variant="primary" size="l" label="Browse Equipment" />
          </Link>
          <Link href="/demo1/contact">
            <Button variant="secondary" size="l" label="Get in Touch" />
          </Link>
        </Row>
      </Column>

      <Column gap="m">
        <Heading as="h2" variant="heading-strong-l">Categories</Heading>
        <Grid gap="m" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {topCategories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/demo1/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${cat.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Card padding="m" radius="l" border="neutral-alpha-weak" style={{ textAlign: 'center', cursor: 'pointer' }}>
                <Text variant="label-strong-s">{cat.name}</Text>
                {cat.children && cat.children.length > 0 && (
                  <Text variant="body-default-xs" onBackground="neutral-weak">{cat.children.length} subcategories</Text>
                )}
              </Card>
            </Link>
          ))}
        </Grid>
      </Column>

      <Column gap="m">
        <Heading as="h2" variant="heading-strong-l">Popular Equipment</Heading>
        <Grid gap="m" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
          {featured.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Grid>
      </Column>
    </Column>
  );
}
