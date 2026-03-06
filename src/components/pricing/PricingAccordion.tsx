'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface PriceItem {
  name: string;
  price: number;
  unit: string;
}

interface Subcategory {
  name: string;
  items: PriceItem[];
}

interface PricingAccordionProps {
  subcategories: Subcategory[];
  accentColor?: string;
  variant?: 'elegant' | 'compact' | 'bold';
}

function formatPrice(price: number): string {
  return `£${price.toFixed(2)}`;
}

function getPriceRange(items: PriceItem[]): string {
  const prices = items.map((i) => i.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return formatPrice(min);
  return `${formatPrice(min)} – ${formatPrice(max)}`;
}

export function PricingAccordion({
  subcategories,
  accentColor = 'var(--brand-strong)',
  variant = 'elegant',
}: PricingAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: variant === 'compact' ? 4 : 8 }}>
      {subcategories.map((sub, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={sub.name}
            style={{
              borderRadius: variant === 'bold' ? 16 : 12,
              overflow: 'hidden',
              border: `1px solid ${isOpen ? accentColor : 'var(--neutral-alpha-weak, rgba(0,0,0,0.08))'}`,
              transition: 'border-color 0.3s ease',
              background: 'var(--surface-background, var(--background))',
            }}
          >
            <button
              onClick={() => toggle(i)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: variant === 'compact' ? '12px 16px' : '16px 20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                gap: 12,
                fontFamily: 'inherit',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                <span style={{
                  fontSize: variant === 'bold' ? 18 : variant === 'compact' ? 14 : 16,
                  fontWeight: 600,
                  color: 'var(--neutral-on-background-strong, inherit)',
                }}>
                  {sub.name}
                </span>
                <span style={{
                  fontSize: variant === 'compact' ? 12 : 13,
                  color: 'var(--neutral-on-background-weak, #888)',
                }}>
                  {sub.items.length} items &middot; {getPriceRange(sub.items)}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ flexShrink: 0 }}
              >
                <ChevronDown size={variant === 'compact' ? 16 : 20} color={accentColor} />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{
                    padding: variant === 'compact' ? '0 16px 12px' : '0 20px 16px',
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0,
                    }}>
                      {sub.items.map((item, j) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.04, duration: 0.3 }}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: variant === 'compact' ? '8px 0' : '10px 0',
                            borderBottom: j < sub.items.length - 1
                              ? '1px solid var(--neutral-alpha-weak, rgba(0,0,0,0.06))'
                              : 'none',
                            gap: 16,
                          }}
                        >
                          <span style={{
                            fontSize: variant === 'compact' ? 13 : 14,
                            color: 'var(--neutral-on-background-strong, inherit)',
                          }}>
                            {item.name}
                          </span>
                          <span style={{
                            fontSize: variant === 'compact' ? 13 : 15,
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
