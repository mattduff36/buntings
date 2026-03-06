import { Card, Column, Row, Text, Heading } from '@once-ui-system/core';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    price: number;
    mainImageUrl: string | null;
    manufacturer: string | null;
    stockStatus: string;
    imageMatchConfidence: string | null;
  };
  basePath?: string;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(price);
}

export function ProductCard({ product, basePath = '/demo1' }: ProductCardProps) {
  const imgSrc = product.mainImageUrl || '/legacy-images/placeholders/equipment.svg';

  return (
    <Link href={`${basePath}/product/${product.slug}-${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <Card padding="m" radius="l" border="neutral-alpha-weak" style={{ height: '100%', cursor: 'pointer', transition: 'transform 0.2s' }}>
        <Column gap="m" fill>
          <div style={{
            width: '100%', aspectRatio: '1', overflow: 'hidden',
            borderRadius: 'var(--radius-m)', background: 'var(--neutral-alpha-weak)',
          }}>
            <img src={imgSrc} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          </div>
          <Column gap="xs">
            {product.manufacturer && (
              <Text variant="label-default-xs" onBackground="neutral-weak">{product.manufacturer}</Text>
            )}
            <Heading as="h3" variant="heading-strong-xs" style={{
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {product.name}
            </Heading>
            <Row horizontal="between" vertical="center">
              {product.price > 0 && (
                <Text variant="label-strong-s" onBackground="brand-strong">{formatPrice(product.price)} + VAT</Text>
              )}
            </Row>
          </Column>
        </Column>
      </Card>
    </Link>
  );
}
