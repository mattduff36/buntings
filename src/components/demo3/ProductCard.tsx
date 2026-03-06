'use client';

import { Column, Row, Text } from '@once-ui-system/core';
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

export function ProductCard({ product, basePath = '/demo3' }: ProductCardProps) {
  const imgSrc = product.mainImageUrl || '/legacy-images/placeholders/equipment.svg';

  return (
    <Link href={`${basePath}/product/${product.slug}-${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          height: '100%',
          borderRadius: 10,
          border: '1px solid var(--neutral-alpha-weak, rgba(0,0,0,0.08))',
          background: 'var(--surface-background, var(--background))',
          overflow: 'hidden',
          cursor: 'pointer',
          padding: 'var(--spacing-s, 8px)',
        }}
      >
        <div style={{
          width: '100%',
          aspectRatio: '1',
          overflow: 'hidden',
          borderRadius: 8,
          background: 'var(--neutral-alpha-weak)',
          position: 'relative',
        }}>
          <motion.img
            src={imgSrc}
            alt={product.name}
            loading="lazy"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {product.price > 0 && (
            <div style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              background: '#5c3d1e',
              color: '#d4a55a',
              fontSize: 13,
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 8,
              fontVariantNumeric: 'tabular-nums',
            }}>
              {formatPrice(product.price)}
            </div>
          )}
        </div>
        <div style={{ padding: '8px 4px 4px' }}>
          <Text variant="label-default-xs" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
          }}>
            {product.name}
          </Text>
          {product.manufacturer && (
            <Text variant="body-default-xs" onBackground="neutral-weak" style={{ marginTop: 2 }}>
              {product.manufacturer}
            </Text>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
