import { Column, Row, Heading, Text, Button, Grid, Line } from '@once-ui-system/core';
import Link from 'next/link';
import { ProductCard } from '@/components/demo3/ProductCard';

import categoriesTree from '@data/categories.tree.json';
import products from '@data/products.enriched.json';
import siteMeta from '@data/site.meta.json';

export default function Demo3Home() {
  const activeProducts = (products as any[]).filter((p: any) => p.status === 1);
  const featured = activeProducts.sort((a: any, b: any) => b.viewed - a.viewed).slice(0, 16);
  const topCategories = (categoriesTree as any[]).filter((c: any) => c.status === 1);

  return (
    <Column gap="l">
      <Row horizontal="between" vertical="end" wrap gap="m">
        <Column gap="xs">
          <Text variant="label-default-xs" onBackground="neutral-weak">SINCE 1980</Text>
          <Heading as="h1" variant="heading-strong-l">{(siteMeta as any).storeName}</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Agricultural equipment, parts &amp; sundries. Nottinghamshire/Derbyshire border.
          </Text>
        </Column>
        <Row gap="s">
          <Link href="/demo3/categories">
            <Button variant="primary" size="s" label="Full Catalogue" />
          </Link>
          <Link href="/demo3/contact">
            <Button variant="secondary" size="s" label="Contact" />
          </Link>
        </Row>
      </Row>

      <Line />

      <Column gap="s">
        <Row horizontal="between" vertical="center">
          <Text variant="label-strong-xs" onBackground="neutral-weak">QUICK NAV</Text>
        </Row>
        <Row gap="xs" wrap>
          {topCategories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/demo3/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${cat.id}`}
            >
              <Button variant="tertiary" size="s" label={cat.name} />
            </Link>
          ))}
        </Row>
      </Column>

      <Line />

      <Column gap="s">
        <Row horizontal="between" vertical="center">
          <Heading as="h2" variant="heading-strong-m">Latest Equipment</Heading>
          <Text variant="label-default-xs" onBackground="neutral-weak">{activeProducts.length} products</Text>
        </Row>
        <Grid style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }} gap="s">
          {featured.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Grid>
      </Column>
    </Column>
  );
}
