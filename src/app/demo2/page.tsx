import { Column, Row, Heading, Text, Button, Grid } from '@once-ui-system/core';
import Link from 'next/link';
import { ProductCard } from '@/components/demo2/ProductCard';
import { HeroBanner } from '@/components/shared/HeroBanner';
import { Demo2CategoriesWithPricing } from '@/components/demo2/CategoriesWithPricing';

import categoriesTree from '@data/categories.tree.json';
import products from '@data/products.enriched.json';

const heroImages = [
  '/images/hero/hero-1.jpg',
  '/images/hero/hero-3.jpg',
];

export default function Demo2Home() {
  const activeProducts = (products as any[]).filter((p: any) => p.status === 1);
  const featured = activeProducts.sort((a: any, b: any) => b.viewed - a.viewed).slice(0, 12);
  const topCategories = (categoriesTree as any[]).filter((c: any) => c.status === 1);

  return (
    <Column gap="0">
      <HeroBanner
        images={heroImages}
        height="360px"
        intervalMs={4000}
        overlayOpacity={0.6}
        overlay={
          <Column gap="8" horizontal="center" style={{ maxWidth: 700, width: '100%', padding: '0 1rem' }}>
            <Text variant="label-default-s" style={{ color: '#d4a017', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Est. 1980 &bull; Nottinghamshire
            </Text>
            <img
              src="/images/logo.png"
              alt="Buntings Agri"
              className="hero-logo"
              style={{
                width: '100%',
                maxWidth: 673,
                maxHeight: 160,
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 3px 12px rgba(0,0,0,0.6))',
              }}
            />
            <Text variant="body-strong-s" className="hero-subtitle" style={{ color: '#d4a017', textAlign: 'center' }}>
              New &amp; Used Agricultural Equipment &bull; Parts &bull; Expert Advice
            </Text>
          </Column>
        }
      />

      <Column maxWidth="xl" className="demo2-main-content" style={{ margin: '0 auto', width: '100%' }} padding="l" gap="xl">
        {/* Categories + Pricing toggle */}
        <Demo2CategoriesWithPricing categories={topCategories} />

        {/* Products */}
        <Column gap="l">
          <Row horizontal="between" vertical="center">
            <Heading as="h2" variant="display-strong-m" className="section-heading" style={{ letterSpacing: '0.03em' }}>POPULAR</Heading>
            <Link href="/demo2/categories">
              <Button variant="secondary" size="s" label="View All" />
            </Link>
          </Row>
          <Grid className="demo2-product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))' }} gap="l">
            {featured.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Grid>
        </Column>
      </Column>
    </Column>
  );
}
