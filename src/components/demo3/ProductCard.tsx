import { Card, Column, Row, Text } from '@once-ui-system/core';
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

export function ProductCard({ product, basePath = '/demo3' }: ProductCardProps) {
  const imgSrc = product.mainImageUrl || '/legacy-images/placeholders/equipment.svg';

  return (
    <Link href={`${basePath}/product/${product.slug}-${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <Card padding="s" radius="s" border="neutral-alpha-weak" style={{ height: '100%', cursor: 'pointer' }}>
        <Column gap="xs">
          <div style={{
            width: '100%', aspectRatio: '1', overflow: 'hidden',
            borderRadius: 'var(--radius-xs)', background: 'var(--neutral-alpha-weak)',
          }}>
            <img src={imgSrc} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          </div>
          <Text variant="label-default-xs" style={{
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.3,
          }}>
            {product.name}
          </Text>
          <Row horizontal="between" vertical="center">
            {product.price > 0 && (
              <Text variant="label-strong-xs" onBackground="brand-strong">{formatPrice(product.price)}</Text>
            )}
            {product.manufacturer && (
              <Text variant="body-default-xs" onBackground="neutral-weak">{product.manufacturer}</Text>
            )}
          </Row>
        </Column>
      </Card>
    </Link>
  );
}
