import { Column, Row, Heading, Text, Button, Grid, Card } from '@once-ui-system/core';
import Link from 'next/link';
import { ProductCard } from '@/components/demo2/ProductCard';

import categoriesTree from '@data/categories.tree.json';
import products from '@data/products.enriched.json';

export default function Demo2Home() {
  const activeProducts = (products as any[]).filter((p: any) => p.status === 1);
  const featured = activeProducts.sort((a: any, b: any) => b.viewed - a.viewed).slice(0, 12);
  const topCategories = (categoriesTree as any[]).filter((c: any) => c.status === 1);

  return (
    <Column gap="xl">
      <Column gap="l" paddingY="xl" style={{ textAlign: 'center' }}>
        <Heading as="h1" variant="display-strong-xl">BUNTINGS AGRI</Heading>
        <Text variant="heading-default-l" onBackground="neutral-weak" style={{ maxWidth: 700, margin: '0 auto' }}>
          New &amp; Used Agricultural Equipment &bull; Parts &bull; Expert Advice
        </Text>
        <Row gap="l" horizontal="center" paddingTop="m">
          <Link href="/demo2/categories">
            <Button variant="primary" size="l" label="Shop Equipment" />
          </Link>
          <Link href="/demo2/contact">
            <Button variant="secondary" size="l" label="Contact Team" />
          </Link>
        </Row>
      </Column>

      <Column gap="l">
        <Heading as="h2" variant="display-strong-m">CATEGORIES</Heading>
        <Grid style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }} gap="m">
          {topCategories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/demo2/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${cat.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Card padding="l" radius="l" border="neutral-alpha-weak" style={{ cursor: 'pointer', minHeight: 120 }}>
                <Column gap="s" vertical="end" fill>
                  <Heading as="h3" variant="heading-strong-l">{cat.name}</Heading>
                  {cat.children && cat.children.length > 0 && (
                    <Text variant="body-default-s" onBackground="neutral-weak">{cat.children.length} subcategories &rarr;</Text>
                  )}
                </Column>
              </Card>
            </Link>
          ))}
        </Grid>
      </Column>

      <Column gap="l">
        <Row horizontal="between" vertical="center">
          <Heading as="h2" variant="display-strong-m">POPULAR</Heading>
          <Link href="/demo2/categories">
            <Button variant="secondary" size="s" label="View All &rarr;" />
          </Link>
        </Row>
        <Grid style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }} gap="l">
          {featured.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Grid>
      </Column>
    </Column>
  );
}
