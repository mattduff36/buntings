'use client';

import { Column, Row, Text, Heading, Badge } from '@once-ui-system/core';
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

export function ProductCard({ product, basePath = '/demo2' }: ProductCardProps) {
  const imgSrc = product.mainImageUrl || '/legacy-images/placeholders/equipment.svg';

  return (
    <Link href={`${basePath}/product/${product.slug}-${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <motion.div
        whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          height: '100%',
          borderRadius: 'var(--radius-l, 12px)',
          border: '1px solid var(--neutral-alpha-weak, rgba(255,255,255,0.06))',
          background: 'var(--surface-background, rgba(255,255,255,0.04))',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: '100%',
          aspectRatio: '4/3',
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.04)',
          position: 'relative',
        }}>
          <motion.img
            src={imgSrc}
            alt={product.name}
            loading="lazy"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {product.manufacturer && (
            <div style={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              color: '#d4a017',
              fontSize: 10,
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 6,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {product.manufacturer}
            </div>
          )}
        </div>
        <div className="product-card-content" style={{ padding: 'var(--spacing-m, 14px)' }}>
          <Column gap="s">
            <Heading as="h3" variant="heading-strong-s" style={{
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {product.name}
            </Heading>
            {product.price > 0 && (
              <Row vertical="center" gap="xs">
                <Heading as="p" variant="heading-strong-m" onBackground="brand-strong">
                  {formatPrice(product.price)}
                </Heading>
                <Text variant="body-default-xs" onBackground="neutral-weak">+ VAT</Text>
              </Row>
            )}
          </Column>
        </div>
      </motion.div>
    </Link>
  );
}
