'use client';

import { useState } from 'react';
import { TreePine, Fence, Cable } from 'lucide-react';
import { PricingAccordion } from '@/components/pricing/PricingAccordion';
import { PriceCard } from '@/components/pricing/PriceCard';
import { AnimatedSection } from '@/components/pricing/AnimatedSection';
import pricingData from '@data/pricing.json';

const categoryMeta: Record<string, { icon: React.ReactNode; color: string }> = {
  timber: { icon: <TreePine size={24} color="#2d6a2d" />, color: '#2d6a2d' },
  gates: { icon: <Fence size={24} color="#2d6a2d" />, color: '#2d6a2d' },
  'stocknetting-wire': { icon: <Cable size={24} color="#2d6a2d" />, color: '#2d6a2d' },
};

function getPriceRange(items: { price: number }[]): string {
  const prices = items.map((i) => i.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return `£${min.toFixed(2)} – £${max.toFixed(2)}`;
}

function getTotalItems(subcategories: { items: { price: number }[] }[]): number {
  return subcategories.reduce((sum, s) => sum + s.items.length, 0);
}

function getAllPrices(subcategories: { items: { price: number }[] }[]): string {
  const all = subcategories.flatMap((s) => s.items);
  return getPriceRange(all);
}

export function Demo1PricingSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <AnimatedSection>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'center' }}>
          <h2 style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 700,
            color: 'var(--neutral-on-background-strong, inherit)',
          }}>
            Fencing & Timber Price Lists
          </h2>
          <p style={{
            margin: 0,
            fontSize: 15,
            color: 'var(--neutral-on-background-weak, #888)',
          }}>
            Competitive prices on all fencing supplies. All items in stock — no minimum order. Prices include VAT.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 12,
        }}>
          {(pricingData as any).categories.map((cat: any) => {
            const meta = categoryMeta[cat.id] || { icon: null, color: '#2d6a2d' };
            const isActive = activeCategory === cat.id;
            return (
              <div key={cat.id} onClick={() => setActiveCategory(isActive ? null : cat.id)}>
                <PriceCard
                  title={cat.name}
                  description={cat.description}
                  priceRange={getAllPrices(cat.subcategories)}
                  itemCount={getTotalItems(cat.subcategories)}
                  icon={meta.icon}
                  accentColor={meta.color}
                  variant="default"
                />
              </div>
            );
          })}
        </div>

        {activeCategory && (() => {
          const cat = (pricingData as any).categories.find((c: any) => c.id === activeCategory);
          if (!cat) return null;
          return (
            <div style={{
              background: 'var(--surface-background, #fafafa)',
              borderRadius: 16,
              padding: 24,
              border: '1px solid var(--neutral-alpha-weak, rgba(0,0,0,0.08))',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{cat.name}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--neutral-on-background-weak, #888)' }}>
                    Updated {cat.dateLabel} &middot; Prices include VAT
                  </p>
                </div>
                <button
                  onClick={() => setActiveCategory(null)}
                  style={{
                    background: 'none',
                    border: '1px solid var(--neutral-alpha-weak, rgba(0,0,0,0.1))',
                    borderRadius: 8,
                    padding: '6px 14px',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontFamily: 'inherit',
                    color: 'var(--neutral-on-background-weak, #666)',
                  }}
                >
                  Close
                </button>
              </div>
              <PricingAccordion
                subcategories={cat.subcategories}
                accentColor="#2d6a2d"
                variant="elegant"
              />
            </div>
          );
        })()}
      </div>
    </AnimatedSection>
  );
}
