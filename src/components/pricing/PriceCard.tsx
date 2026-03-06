'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PriceCardProps {
  title: string;
  description?: string;
  priceRange: string;
  itemCount: number;
  icon?: ReactNode;
  accentColor?: string;
  onClick?: () => void;
  variant?: 'default' | 'bold' | 'minimal';
}

export function PriceCard({
  title,
  description,
  priceRange,
  itemCount,
  icon,
  accentColor = 'var(--brand-strong)',
  onClick,
  variant = 'default',
}: PriceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      style={{
        padding: variant === 'minimal' ? 16 : variant === 'bold' ? 28 : 20,
        borderRadius: variant === 'bold' ? 20 : 14,
        border: '1px solid var(--neutral-alpha-weak, rgba(0,0,0,0.08))',
        background: 'var(--surface-background, var(--background))',
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: variant === 'minimal' ? 8 : 12,
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {variant === 'bold' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: accentColor,
        }} />
      )}

      {icon && (
        <div style={{
          width: variant === 'bold' ? 52 : 40,
          height: variant === 'bold' ? 52 : 40,
          borderRadius: variant === 'bold' ? 14 : 10,
          background: `color-mix(in srgb, ${accentColor} 12%, transparent)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h3 style={{
          margin: 0,
          fontSize: variant === 'bold' ? 20 : variant === 'minimal' ? 14 : 16,
          fontWeight: 700,
          color: 'var(--neutral-on-background-strong, inherit)',
          lineHeight: 1.3,
        }}>
          {title}
        </h3>
        {description && (
          <p style={{
            margin: 0,
            fontSize: variant === 'minimal' ? 12 : 13,
            color: 'var(--neutral-on-background-weak, #888)',
            lineHeight: 1.5,
          }}>
            {description}
          </p>
        )}
      </div>

      <div style={{
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        borderTop: '1px solid var(--neutral-alpha-weak, rgba(0,0,0,0.06))',
      }}>
        <span style={{
          fontSize: variant === 'minimal' ? 12 : 13,
          color: 'var(--neutral-on-background-weak, #888)',
        }}>
          {itemCount} products
        </span>
        <span style={{
          fontSize: variant === 'bold' ? 15 : 13,
          fontWeight: 600,
          color: accentColor,
        }}>
          {priceRange}
        </span>
      </div>
    </motion.div>
  );
}
