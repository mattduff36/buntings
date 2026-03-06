'use client';

import { Column, Row, Text, Heading } from '@once-ui-system/core';
import { motion } from 'framer-motion';
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
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          height: '100%',
          borderRadius: 'var(--radius-l, 12px)',
          border: '1px solid var(--neutral-alpha-weak, rgba(0,0,0,0.08))',
          background: 'var(--surface-background, var(--background))',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: '100%',
          aspectRatio: '1',
          overflow: 'hidden',
          background: 'var(--neutral-alpha-weak)',
          position: 'relative',
        }}>
          <motion.img
            src={imgSrc}
            alt={product.name}
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ padding: 'var(--spacing-m, 12px)' }}>
          <Column gap="xs">
            {product.manufacturer && (
              <Text variant="label-default-xs" onBackground="brand-strong" style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {product.manufacturer}
              </Text>
            )}
            <Heading as="h3" variant="heading-strong-xs" style={{
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {product.name}
            </Heading>
            {product.price > 0 && (
              <Row vertical="center" gap="xs">
                <Text variant="label-strong-s" onBackground="brand-strong">{formatPrice(product.price)}</Text>
                <Text variant="body-default-xs" onBackground="neutral-weak">+ VAT</Text>
              </Row>
            )}
          </Column>
        </div>
      </motion.div>
    </Link>
  );
}
