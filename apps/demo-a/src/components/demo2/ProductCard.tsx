import { Card, Column, Row, Text, Heading, Badge } from '@once-ui-system/core';
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

export function ProductCard({ product, basePath = '/demo2' }: ProductCardProps) {
  const imgSrc = product.mainImageUrl || '/legacy-images/placeholders/equipment.svg';

  return (
    <Link href={`${basePath}/product/${product.slug}-${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <Card padding="0" radius="l" border="neutral-alpha-weak" style={{ height: '100%', cursor: 'pointer', overflow: 'hidden' }}>
        <div style={{
          width: '100%', aspectRatio: '4/3', overflow: 'hidden',
          background: 'var(--neutral-alpha-weak)',
        }}>
          <img src={imgSrc} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        </div>
        <Column padding="m" gap="s">
          {product.manufacturer && <Badge title={product.manufacturer} />}
          <Heading as="h3" variant="heading-strong-s" style={{
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {product.name}
          </Heading>
          {product.price > 0 && (
            <Heading as="p" variant="heading-strong-m" onBackground="brand-strong">
              {formatPrice(product.price)}
              <Text as="span" variant="body-default-xs" onBackground="neutral-weak"> + VAT</Text>
            </Heading>
          )}
        </Column>
      </Card>
    </Link>
  );
}
