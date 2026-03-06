import { Column, Row, Heading, Text, Button, Card, Badge } from '@once-ui-system/core';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, Mail, ArrowLeft, Package, Tag } from 'lucide-react';

import products from '@data/products.enriched.json';
import categoriesRaw from '@data/categories.raw.json';
import siteMeta from '@data/site.meta.json';
import contentExtras from '@data/content.extras.json';

function extractId(slug: string): number | null {
  const match = slug.match(/-(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(price);
}

export function getProductStaticParams() {
  return (products as any[])
    .filter((p: any) => p.status === 1)
    .map((p: any) => ({ slug: `${p.slug}-${p.id}` }));
}

export function ProductPage({ slug, basePath }: { slug: string; basePath: string }) {
  const productId = extractId(slug);
  if (!productId) notFound();

  const product = (products as any[]).find((p: any) => p.id === productId);
  if (!product) notFound();

  const categories = product.categoryIds
    .map((cid: number) => (categoriesRaw as any[]).find((c: any) => c.id === cid))
    .filter(Boolean);

  const imgSrc = product.mainImageUrl || '/legacy-images/placeholders/equipment.svg';
  const email = (siteMeta as any).email;
  const footer = (contentExtras as any).footerInfo;
  const enquirySubject = encodeURIComponent(`Enquiry: ${product.name}`);
  const enquiryBody = encodeURIComponent(`Hi,\n\nI'm interested in the ${product.name} (ID: ${product.id}).\n\nPlease could you provide more information?\n\nThank you.`);

  return (
    <Column gap="l">
      <Link href={`${basePath}/categories`} style={{ textDecoration: 'none' }}>
        <Row gap="xs" vertical="center">
          <ArrowLeft size={14} />
          <Text variant="label-default-xs" onBackground="neutral-weak">Back to Categories</Text>
        </Row>
      </Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 'var(--spacing-l, 1.5rem)',
      }}>
        {/* Image gallery */}
        <Column gap="m">
          <div style={{
            width: '100%',
            aspectRatio: '1',
            overflow: 'hidden',
            borderRadius: 'var(--radius-l)',
            background: 'var(--neutral-alpha-weak)',
            position: 'relative',
          }}>
            <img
              src={imgSrc}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
              }}
            />
          </div>
          {product.imageUrls && product.imageUrls.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
              gap: 8,
            }}>
              {product.imageUrls.map((url: string, i: number) => (
                <div key={i} style={{
                  aspectRatio: '1',
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-m)',
                  background: 'var(--neutral-alpha-weak)',
                  border: '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}>
                  <img src={url} alt={`${product.name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </Column>

        {/* Product info */}
        <Column gap="m">
          <Column gap="xs">
            {product.manufacturer && (
              <Text variant="label-default-s" onBackground="brand-strong" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {product.manufacturer}
              </Text>
            )}
            <Heading as="h1" variant="display-strong-m">{product.name}</Heading>
          </Column>

          {product.price > 0 && (
            <div style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-l)',
              background: 'var(--brand-alpha-weak, rgba(0,128,0,0.06))',
              border: '1px solid var(--brand-alpha-medium, rgba(0,128,0,0.12))',
            }}>
              <Row gap="s" vertical="center">
                <Tag size={18} style={{ color: 'var(--brand-strong)' }} />
                <Heading as="p" variant="heading-strong-l" onBackground="brand-strong">
                  {formatPrice(product.price)} + VAT
                </Heading>
              </Row>
            </div>
          )}

          <Row gap="s" wrap>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              borderRadius: 20,
              background: 'var(--neutral-alpha-weak, rgba(0,0,0,0.04))',
              fontSize: 13,
            }}>
              <Package size={14} />
              <span>{product.stockStatus}</span>
            </div>
            {product.model && (
              <Badge title={product.model} />
            )}
          </Row>

          {categories.length > 0 && (
            <Row gap="xs" wrap>
              {categories.map((cat: any) => (
                <Link key={cat.id} href={`${basePath}/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${cat.id}`}>
                  <Badge title={cat.name} />
                </Link>
              ))}
            </Row>
          )}

          {/* CTAs */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            padding: '16px 0',
          }}>
            <Row gap="m">
              <a href={`mailto:${email}?subject=${enquirySubject}&body=${enquiryBody}`} style={{ flex: 1 }}>
                <Button variant="primary" size="l" label="Send Enquiry" style={{ width: '100%' }} />
              </a>
              <a href={`tel:${footer.phone?.replace(/\s/g, '')}`} style={{ flex: 1 }}>
                <Button variant="secondary" size="l" label="Call Us" style={{ width: '100%' }} />
              </a>
            </Row>
            <Row gap="m" style={{ fontSize: 13, color: 'var(--neutral-on-background-weak, #888)' }}>
              <Row gap="xs" vertical="center">
                <Phone size={13} />
                <span>{footer.phone}</span>
              </Row>
              <Row gap="xs" vertical="center">
                <Mail size={13} />
                <span>{footer.email}</span>
              </Row>
            </Row>
          </div>

          {product.descriptionHtml && (
            <Card padding="l" radius="l" border="neutral-alpha-weak">
              <Column gap="s">
                <Heading as="h2" variant="heading-strong-s">Description</Heading>
                <div
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--neutral-on-background-weak)' }}
                />
              </Column>
            </Card>
          )}
        </Column>
      </div>
    </Column>
  );
}
