import { Column, Row, Heading, Text, Button, Card, Badge, Grid } from '@once-ui-system/core';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import products from '@data/products.enriched.json';
import categoriesRaw from '@data/categories.raw.json';
import siteMeta from '@data/site.meta.json';

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
  const enquirySubject = encodeURIComponent(`Enquiry: ${product.name}`);
  const enquiryBody = encodeURIComponent(`Hi,\n\nI'm interested in the ${product.name} (ID: ${product.id}).\n\nPlease could you provide more information?\n\nThank you.`);

  return (
    <Column gap="l">
      <Link href={`${basePath}/categories`} style={{ textDecoration: 'none' }}>
        <Text variant="label-default-xs" onBackground="neutral-weak">&larr; Back to Categories</Text>
      </Link>

      <Grid gap="l" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <Column gap="m">
          <div style={{
            width: '100%',
            aspectRatio: '1',
            overflow: 'hidden',
            borderRadius: 'var(--radius-l)',
            background: 'var(--neutral-alpha-weak)',
          }}>
            <img src={imgSrc} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {product.imageUrls && product.imageUrls.length > 0 && (
            <Row gap="s" wrap>
              {product.imageUrls.map((url: string, i: number) => (
                <div key={i} style={{
                  width: 80, height: 80, overflow: 'hidden',
                  borderRadius: 'var(--radius-m)', background: 'var(--neutral-alpha-weak)',
                }}>
                  <img src={url} alt={`${product.name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
              ))}
            </Row>
          )}
        </Column>

        <Column gap="m">
          <Column gap="xs">
            {product.manufacturer && (
              <Text variant="label-default-s" onBackground="neutral-weak">{product.manufacturer}</Text>
            )}
            <Heading as="h1" variant="display-strong-m">{product.name}</Heading>
          </Column>

          {product.price > 0 && (
            <Heading as="p" variant="heading-strong-l" onBackground="brand-strong">
              {formatPrice(product.price)} + VAT
            </Heading>
          )}

          <Row gap="s" wrap>
            <Badge title={product.stockStatus} />
            {product.model && <Badge title={product.model} />}
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

          <Row gap="m">
            <a href={`mailto:${email}?subject=${enquirySubject}&body=${enquiryBody}`}>
              <Button variant="primary" size="l" label="Send Enquiry" />
            </a>
            <a href={`tel:${(siteMeta as any).telephone?.split(' ')[0]}`}>
              <Button variant="secondary" size="l" label="Call Us" />
            </a>
          </Row>

          {product.descriptionHtml && (
            <Card padding="l" radius="l" border="neutral-alpha-weak">
              <Column gap="s">
                <Heading as="h2" variant="heading-strong-s">Description</Heading>
                <div
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--neutral-on-background-weak)' }}
                />
              </Column>
            </Card>
          )}
        </Column>
      </Grid>
    </Column>
  );
}
