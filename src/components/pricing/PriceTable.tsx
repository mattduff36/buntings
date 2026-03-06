'use client';

import { motion } from 'framer-motion';

interface PriceItem {
  name: string;
  price: number;
  unit: string;
}

interface Subcategory {
  name: string;
  items: PriceItem[];
}

interface PriceTableProps {
  subcategories: Subcategory[];
  accentColor?: string;
  compact?: boolean;
}

function formatPrice(price: number): string {
  return `£${price.toFixed(2)}`;
}

export function PriceTable({
  subcategories,
  accentColor = 'var(--brand-strong)',
  compact = false,
}: PriceTableProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 24 : 32 }}>
      {subcategories.map((sub, si) => (
        <motion.div
          key={sub.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: si * 0.1, duration: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            paddingBottom: 8,
            borderBottom: `2px solid ${accentColor}`,
          }}>
            <h3 style={{
              margin: 0,
              fontSize: compact ? 16 : 18,
              fontWeight: 700,
              color: 'var(--neutral-on-background-strong, inherit)',
            }}>
              {sub.name}
            </h3>
            <span style={{
              fontSize: 12,
              color: 'var(--neutral-on-background-weak, #888)',
              marginLeft: 'auto',
            }}>
              {sub.items.length} items
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {sub.items.map((item, j) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: si * 0.1 + j * 0.03, duration: 0.3 }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: compact ? '8px 0' : '10px 0',
                  borderBottom: j < sub.items.length - 1
                    ? '1px solid var(--neutral-alpha-weak, rgba(0,0,0,0.06))'
                    : 'none',
                }}
              >
                <span style={{
                  fontSize: compact ? 13 : 14,
                  color: 'var(--neutral-on-background-strong, inherit)',
                }}>
                  {item.name}
                </span>
                <span style={{
                  fontSize: compact ? 13 : 15,
                  fontWeight: 700,
                  color: accentColor,
                  fontVariantNumeric: 'tabular-nums',
                  whiteSpace: 'nowrap',
                  marginLeft: 16,
                }}>
                  {formatPrice(item.price)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
