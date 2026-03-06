import { Column, Row, Heading, Text, Button, Grid } from '@once-ui-system/core';
import Link from 'next/link';
import { ProductCard } from '@/components/demo3/ProductCard';
import { HeroBanner } from '@/components/shared/HeroBanner';
import { Demo3PricingSection } from '@/components/demo3/PricingSection';

import categoriesTree from '@data/categories.tree.json';
import products from '@data/products.enriched.json';
import siteMeta from '@data/site.meta.json';
import contentExtras from '@data/content.extras.json';

export default function Demo3Home() {
  const activeProducts = (products as any[]).filter((p: any) => p.status === 1);
  const featured = activeProducts.sort((a: any, b: any) => b.viewed - a.viewed).slice(0, 16);
  const topCategories = (categoriesTree as any[]).filter((c: any) => c.status === 1);
  const footer = (contentExtras as any).footerInfo;

  return (
    <Column gap="0">
      <HeroBanner
        images={['/images/hero/hero-4.jpg', '/images/hero/hero-2.jpg', '/images/hero/hero-5.jpg']}
        height="min(70vh, 520px)"
        intervalMs={5000}
        overlay={
          <Column gap="m" horizontal="center" style={{ maxWidth: 600 }}>
            <img
              src="/images/logo.png"
              alt="Buntings Agri Ltd."
              style={{
                height: 60,
                width: 'auto',
                filter: 'brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
              }}
            />
            <div style={{
              width: 60,
              height: 3,
              background: '#d4a55a',
              borderRadius: 2,
            }} />
            <Heading as="h1" variant="display-strong-l" style={{
              color: 'white',
              textShadow: '0 2px 16px rgba(0,0,0,0.5)',
            }}>
              Agricultural Equipment &amp; Fencing Supplies
            </Heading>
            <Text variant="body-default-m" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Trusted by farmers across Nottinghamshire &amp; Derbyshire since 1980
            </Text>
            <Row gap="m" horizontal="center" style={{ paddingTop: 8 }}>
              <Link href="/demo3/categories">
                <Button variant="primary" size="l" label="Explore Catalogue" />
              </Link>
              <Link href="/demo3/contact">
                <Button
                  variant="secondary"
                  size="l"
                  label="Get a Quote"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                  }}
                />
              </Link>
            </Row>
          </Column>
        }
      />

      {/* Story strip */}
      <div style={{
        background: '#5c3d1e',
        overflow: 'hidden',
      }}>
        <div style={{
          maxWidth: 'var(--responsive-xl, 1200px)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
        }}>
          {[
            { title: 'Family Business', body: 'Three generations of farming knowledge since 1980' },
            { title: 'All In Stock', body: 'No minimum order — take away same day' },
            { title: 'Best Prices', body: 'Competitive pricing on fencing, gates & machinery' },
          ].map((item, i) => (
            <div key={item.title} style={{
              padding: '20px 24px',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              textAlign: 'center',
            }}>
              <div style={{ color: '#d4a55a', fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
                {item.title}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.4 }}>
                {item.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Column maxWidth="xl" style={{ margin: '0 auto', width: '100%' }} padding="l" gap="xl">
        {/* Categories as hero-style banners */}
        <Column gap="m">
          <Column gap="xs">
            <Heading as="h2" variant="heading-strong-l">What We Offer</Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Browse our range of agricultural equipment and fencing supplies
            </Text>
          </Column>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 16,
          }}>
            {topCategories.map((cat: any, i: number) => {
              const bgImages = ['/images/hero/hero-1.jpg', '/images/hero/hero-3.jpg', '/images/hero/hero-5.jpg'];
              return (
                <Link
                  key={cat.id}
                  href={`/demo3/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${cat.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{
                    position: 'relative',
                    borderRadius: 16,
                    overflow: 'hidden',
                    height: 200,
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}>
                    <img
                      src={bgImages[i % bgImages.length]}
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
                      background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05) 100%)',
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '20px 24px',
                    }}>
                      <div style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: 'white',
                        marginBottom: 4,
                        textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                      }}>
                        {cat.name}
                      </div>
                      {cat.children && cat.children.length > 0 && (
                        <div style={{
                          fontSize: 13,
                          color: '#d4a55a',
                          fontWeight: 500,
                        }}>
                          {cat.children.length} subcategories &rarr;
                        </div>
                      )}
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      background: '#d4a55a',
                      color: '#2a1a08',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 12,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      Browse
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Column>

        {/* Pricing */}
        <Demo3PricingSection />

        {/* Equipment */}
        <Column gap="m">
          <Row horizontal="between" vertical="center" style={{ flexWrap: 'wrap', gap: 12 }}>
            <Column gap="xs">
              <Heading as="h2" variant="heading-strong-l">Latest Equipment</Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {activeProducts.length} products available
              </Text>
            </Column>
            <Link href="/demo3/categories">
              <Button variant="secondary" size="s" label="Full Catalogue" />
            </Link>
          </Row>
          <Grid style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }} gap="s">
            {featured.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Grid>
        </Column>

        {/* CTA Banner */}
        <div style={{
          position: 'relative',
          borderRadius: 20,
          overflow: 'hidden',
          padding: '48px 32px',
          textAlign: 'center',
        }}>
          <img
            src="/images/hero/hero-3.jpg"
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(92,61,30,0.92) 0%, rgba(42,26,8,0.88) 100%)',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Column gap="m" horizontal="center" style={{ maxWidth: 480 }}>
              <Heading as="h2" variant="heading-strong-l" style={{ color: 'white' }}>
                Ready to Talk?
              </Heading>
              <Text variant="body-default-m" style={{ color: 'rgba(255,255,255,0.85)' }}>
                Our experienced team can help with equipment selection, pricing, and delivery.
              </Text>
              <Row gap="m" horizontal="center">
                <Link href="/demo3/contact">
                  <Button variant="primary" size="l" label="Send Enquiry" />
                </Link>
                <a href={`tel:${footer.phone}`} style={{ textDecoration: 'none' }}>
                  <Button variant="secondary" size="l" label={`Call ${footer.phone}`}
                    style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                  />
                </a>
              </Row>
            </Column>
          </div>
        </div>
      </Column>
    </Column>
  );
}
