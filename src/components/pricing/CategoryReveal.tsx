'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface PriceItem {
  name: string;
  price: number;
  unit: string;
}

interface Subcategory {
  name: string;
  items: PriceItem[];
}

interface CategoryRevealProps {
  subcategories: Subcategory[];
  accentColor?: string;
}

function formatPrice(price: number): string {
  return `£${price.toFixed(2)}`;
}

function getPriceRange(items: PriceItem[]) {
  const prices = items.map((i) => i.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function CategoryReveal({
  subcategories,
  accentColor = 'var(--brand-strong)',
}: CategoryRevealProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 12,
    }}>
      {subcategories.map((sub) => {
        const isExpanded = expanded === sub.name;
        const range = getPriceRange(sub.items);

        return (
          <motion.div
            key={sub.name}
            layout
            style={{
              borderRadius: 16,
              border: `1px solid ${isExpanded ? accentColor : 'var(--neutral-alpha-weak, rgba(0,0,0,0.08))'}`,
              overflow: 'hidden',
              background: 'var(--surface-background, var(--background))',
              gridColumn: isExpanded ? '1 / -1' : undefined,
              transition: 'border-color 0.3s',
            }}
          >
            <motion.button
              layout="position"
              onClick={() => setExpanded(isExpanded ? null : sub.name)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                <span style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: 'var(--neutral-on-background-strong, inherit)',
                }}>
                  {sub.name}
                </span>
                <span style={{
                  fontSize: 13,
                  color: 'var(--neutral-on-background-weak, #888)',
                }}>
                  {sub.items.length} items &middot; From {formatPrice(range.min)}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ flexShrink: 0 }}
              >
                <ChevronRight size={20} color={accentColor} />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: 1,
                    padding: '0 16px 16px',
                  }}>
                    {sub.items.map((item, j) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: j * 0.03, duration: 0.3 }}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px 12px',
                          borderRadius: 8,
                          background: 'var(--neutral-alpha-weak, rgba(0,0,0,0.02))',
                          gap: 16,
                        }}
                      >
                        <span style={{
                          fontSize: 14,
                          color: 'var(--neutral-on-background-strong, inherit)',
                        }}>
                          {item.name}
                        </span>
                        <span style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: accentColor,
                          whiteSpace: 'nowrap',
                          fontVariantNumeric: 'tabular-nums',
                        }}>
                          {formatPrice(item.price)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
