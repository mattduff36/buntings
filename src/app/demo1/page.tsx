import { Column, Row, Heading, Text, Button, Grid, Card } from '@once-ui-system/core';
import { Tractor, Wrench, Fence, Phone, ArrowRight, Leaf } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/demo1/ProductCard';
import { HeroBanner } from '@/components/shared/HeroBanner';
import { Demo1PricingSection } from '@/components/demo1/PricingSection';

import categoriesTree from '@data/categories.tree.json';
import products from '@data/products.enriched.json';
import siteMeta from '@data/site.meta.json';
import contentExtras from '@data/content.extras.json';

const categoryIcons: Record<string, React.ReactNode> = {
  'Machinery & Equipment ': <Tractor size={28} color="#2d6a2d" />,
  'Livestock Feeding & Handling': <Wrench size={28} color="#2d6a2d" />,
  'Fencing Price Lists': <Fence size={28} color="#2d6a2d" />,
};

const categoryImages: Record<string, string> = {
  'Machinery & Equipment ': '/images/hero/hero-1.jpg',
  'Livestock Feeding & Handling': '/images/hero/hero-3.jpg',
  'Fencing Price Lists': '/images/hero/hero-5.jpg',
};

export default function Demo1Home() {
  const activeProducts = (products as any[]).filter((p: any) => p.status === 1);
  const featured = activeProducts.sort((a: any, b: any) => b.viewed - a.viewed).slice(0, 8);
  const topCategories = (categoriesTree as any[]).filter((c: any) => c.status === 1);
  const footer = (contentExtras as any).footerInfo;

  return (
    <Column gap="0">
      <HeroBanner
        images={['/images/hero/hero-2.jpg']}
        height="min(85vh, 620px)"
        overlay={
          <Column gap="l" horizontal="center" style={{ maxWidth: 680 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              background: 'rgba(45,106,45,0.85)',
              borderRadius: 24,
              backdropFilter: 'blur(8px)',
            }}>
              <Leaf size={14} color="#a8e6a8" />
              <span style={{ color: '#a8e6a8', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Est. 1980 &bull; Nottinghamshire
              </span>
            </div>
            <Heading as="h1" variant="display-strong-xl" style={{
              color: 'white',
              textShadow: '0 2px 20px rgba(0,0,0,0.4)',
              lineHeight: 1.1,
            }}>
              Quality Agricultural Equipment
            </Heading>
            <Text variant="body-default-l" style={{ color: 'rgba(255,255,255,0.9)', maxWidth: 520 }}>
              Trusted suppliers of new and used machinery, fencing, parts and expert advice from {(siteMeta as any).storeName}
            </Text>
            <Row gap="m" horizontal="center" style={{ paddingTop: 8 }}>
              <Link href="/demo1/categories">
                <Button variant="primary" size="l" label="Browse Equipment" />
              </Link>
              <Link href="/demo1/contact">
                <Button
                  variant="secondary"
                  size="l"
                  label="Get in Touch"
                  style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}
                />
              </Link>
            </Row>
          </Column>
        }
      />

      {/* Trust bar */}
      <div style={{
        background: '#1a3d1a',
        padding: '16px 24px',
      }}>
        <div style={{
          maxWidth: 'var(--responsive-xl, 1200px)',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 32,
          flexWrap: 'wrap',
        }}>
          {[
            { label: '40+ Years', sub: 'Established 1980' },
            { label: '160+ Products', sub: 'In Stock' },
            { label: 'No Minimum', sub: 'Order Quantity' },
            { label: 'Expert Team', sub: 'Friendly Advice' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ color: '#a8e6a8', fontSize: 16, fontWeight: 700 }}>{stat.label}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <Column maxWidth="xl" style={{ margin: '0 auto', width: '100%' }} padding="l" gap="xl">
        {/* Categories */}
        <Column gap="m">
          <Column gap="xs">
            <Heading as="h2" variant="heading-strong-l">Browse Our Range</Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Explore our full catalogue of agricultural equipment and supplies
            </Text>
          </Column>
          <Grid gap="m" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {topCategories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/demo1/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${cat.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Card
                  padding="0"
                  radius="l"
                  border="neutral-alpha-weak"
                  style={{
                    cursor: 'pointer',
                    height: '100%',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  <div style={{
                    height: 160,
                    overflow: 'hidden',
                    position: 'relative',
                  }}>
                    <img
                      src={categoryImages[cat.name] || '/images/hero/hero-1.jpg'}
                      alt={cat.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                    }} />
                  </div>
                  <div style={{ padding: 'var(--spacing-m, 16px)' }}>
                    <Column gap="s">
                      <Row gap="s" vertical="center">
                        <div style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: '#e8f5e8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          {categoryIcons[cat.name] || <Tractor size={22} color="#2d6a2d" />}
                        </div>
                        <Column gap="2">
                          <Heading as="h3" variant="heading-strong-m">{cat.name}</Heading>
                          {cat.children && cat.children.length > 0 && (
                            <Text variant="body-default-xs" onBackground="neutral-weak">
                              {cat.children.length} subcategories
                            </Text>
                          )}
                        </Column>
                      </Row>
                      <Row horizontal="end">
                        <Text variant="label-strong-xs" onBackground="brand-strong" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          Browse <ArrowRight size={12} />
                        </Text>
                      </Row>
                    </Column>
                  </div>
                </Card>
              </Link>
            ))}
          </Grid>
        </Column>

        {/* Pricing */}
        <Demo1PricingSection />

        {/* Popular Equipment */}
        <div style={{
          background: 'linear-gradient(135deg, #f0f7f0 0%, #e8f5e8 100%)',
          borderRadius: 'var(--radius-l)',
          padding: 'var(--spacing-l)',
        }}>
          <Column gap="m">
            <Row horizontal="between" vertical="center">
              <Column gap="xs">
                <Heading as="h2" variant="heading-strong-l">Popular Equipment</Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Our most viewed machinery and supplies
                </Text>
              </Column>
              <Link href="/demo1/categories">
                <Button variant="secondary" size="s" label="View All" />
              </Link>
            </Row>
            <Grid gap="m" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
              {featured.map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </Grid>
          </Column>
        </div>

        {/* CTA */}
        <div style={{
          background: '#1a3d1a',
          borderRadius: 'var(--radius-l)',
          padding: 'var(--spacing-xl)',
          textAlign: 'center',
        }}>
          <Column gap="m" horizontal="center" style={{ maxWidth: 500 }}>
            <Heading as="h2" variant="heading-strong-l" style={{ color: 'white' }}>
              Need Expert Advice?
            </Heading>
            <Text variant="body-default-m" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Our friendly team has over 40 years of experience. Get in touch for help choosing the right equipment.
            </Text>
            <Row gap="m" horizontal="center">
              <Link href="/demo1/contact">
                <Button variant="primary" size="l" label="Send Enquiry" />
              </Link>
              <a href={`tel:${footer.phone}`} style={{ textDecoration: 'none' }}>
                <Button variant="secondary" size="l" label={footer.phone}
                  style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                />
              </a>
            </Row>
          </Column>
        </div>
      </Column>
    </Column>
  );
}
