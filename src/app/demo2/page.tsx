import { Column, Row, Heading, Text, Button, Grid, Card } from '@once-ui-system/core';
import Link from 'next/link';
import { ProductCard } from '@/components/demo2/ProductCard';
import { HeroBanner } from '@/components/shared/HeroBanner';
import { Demo2PricingSection } from '@/components/demo2/PricingSection';

import categoriesTree from '@data/categories.tree.json';
import products from '@data/products.enriched.json';

const heroImages = [
  '/images/hero/hero-1.jpg',
  '/images/hero/hero-2.jpg',
  '/images/hero/hero-3.jpg',
  '/images/hero/hero-4.jpg',
  '/images/hero/hero-5.jpg',
];

export default function Demo2Home() {
  const activeProducts = (products as any[]).filter((p: any) => p.status === 1);
  const featured = activeProducts.sort((a: any, b: any) => b.viewed - a.viewed).slice(0, 12);
  const topCategories = (categoriesTree as any[]).filter((c: any) => c.status === 1);

  return (
    <Column gap="0">
      <HeroBanner
        images={heroImages}
        height="480px"
        intervalMs={4000}
        overlay={
          <Column gap="l" horizontal="center" style={{ maxWidth: 700 }}>
            <Text variant="label-default-s" style={{ color: '#d4a017', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Est. 1980 &bull; Nottinghamshire
            </Text>
            <Heading as="h1" variant="display-strong-xl" style={{
              color: 'white',
              textShadow: '0 3px 12px rgba(0,0,0,0.6)',
              letterSpacing: '0.05em',
            }}>
              BUNTINGS AGRI
            </Heading>
            <Text variant="heading-default-l" style={{ color: 'rgba(255,255,255,0.85)' }}>
              New &amp; Used Agricultural Equipment &bull; Parts &bull; Expert Advice
            </Text>

            {/* Stats row */}
            <div style={{
              display: 'flex',
              gap: 32,
              padding: '16px 0',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              {[
                { value: '160+', label: 'Products' },
                { value: '40+', label: 'Years' },
                { value: '£1.30', label: 'Fencing From' },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ color: '#d4a017', fontSize: 28, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
                    {s.value}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <Row gap="l" horizontal="center">
              <Link href="/demo2/categories">
                <Button variant="primary" size="l" label="Shop Equipment" />
              </Link>
              <Link href="/demo2/contact">
                <Button variant="secondary" size="l" label="Contact Team" />
              </Link>
            </Row>
          </Column>
        }
      />

      <Column maxWidth="xl" style={{ margin: '0 auto', width: '100%' }} padding="l" gap="xl">
        {/* Categories */}
        <Column gap="l">
          <Row horizontal="between" vertical="center">
            <Heading as="h2" variant="display-strong-m" style={{ letterSpacing: '0.03em' }}>CATEGORIES</Heading>
            <Link href="/demo2/categories">
              <Button variant="tertiary" size="s" label="View All" />
            </Link>
          </Row>
          <Grid style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }} gap="m">
            {topCategories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/demo2/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${cat.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Card
                  padding="l"
                  radius="l"
                  border="neutral-alpha-weak"
                  style={{
                    cursor: 'pointer',
                    minHeight: 130,
                    borderLeft: '4px solid var(--brand-strong)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <Column gap="s" vertical="end" fill>
                    <Heading as="h3" variant="heading-strong-l">{cat.name}</Heading>
                    {cat.children && cat.children.length > 0 && (
                      <Row gap="xs" vertical="center">
                        <div style={{
                          background: 'var(--brand-strong)',
                          color: 'var(--static-black, #000)',
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 10,
                        }}>
                          {cat.children.length}
                        </div>
                        <Text variant="body-default-s" onBackground="neutral-weak">
                          subcategories
                        </Text>
                      </Row>
                    )}
                  </Column>
                </Card>
              </Link>
            ))}
          </Grid>
        </Column>

        {/* Pricing */}
        <Demo2PricingSection />

        {/* Products */}
        <Column gap="l">
          <Row horizontal="between" vertical="center">
            <Heading as="h2" variant="display-strong-m" style={{ letterSpacing: '0.03em' }}>POPULAR</Heading>
            <Link href="/demo2/categories">
              <Button variant="secondary" size="s" label="View All" />
            </Link>
          </Row>
          <Grid style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }} gap="l">
            {featured.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Grid>
        </Column>
      </Column>
    </Column>
  );
}
