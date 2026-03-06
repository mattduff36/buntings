'use client';

import { TreePine, Fence, Cable } from 'lucide-react';
import { CategoryReveal } from '@/components/pricing/CategoryReveal';
import { PriceCard } from '@/components/pricing/PriceCard';
import { AnimatedSection } from '@/components/pricing/AnimatedSection';
import pricingData from '@data/pricing.json';

const categoryMeta: Record<string, { icon: React.ReactNode }> = {
  timber: { icon: <TreePine size={26} color="#d4a55a" /> },
  gates: { icon: <Fence size={26} color="#d4a55a" /> },
  'stocknetting-wire': { icon: <Cable size={26} color="#d4a55a" /> },
};

function getTotalItems(subcategories: { items: any[] }[]): number {
  return subcategories.reduce((sum, s) => sum + s.items.length, 0);
}

function getPriceRange(subcategories: { items: { price: number }[] }[]): string {
  const all = subcategories.flatMap((s) => s.items);
  const min = Math.min(...all.map((i) => i.price));
  const max = Math.max(...all.map((i) => i.price));
  return `£${min.toFixed(2)} – £${max.toFixed(2)}`;
}

export function Demo3PricingSection() {
  const categories = (pricingData as any).categories;

  return (
    <AnimatedSection>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <h2 style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 800,
            color: 'var(--neutral-on-background-strong, inherit)',
          }}>
            Fencing &amp; Timber Supplies
          </h2>
          <p style={{
            margin: '6px 0 0',
            fontSize: 15,
            color: 'var(--neutral-on-background-weak, #888)',
          }}>
            All items in stock with no minimum order. Prices include VAT.
          </p>
        </div>

        {/* Category overview cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 12,
        }}>
          {categories.map((cat: any) => {
            const meta = categoryMeta[cat.id];
            return (
              <PriceCard
                key={cat.id}
                title={cat.name}
                description={`Updated ${cat.dateLabel}`}
                priceRange={getPriceRange(cat.subcategories)}
                itemCount={getTotalItems(cat.subcategories)}
                icon={meta?.icon}
                accentColor="#d4a55a"
                variant="bold"
              />
            );
          })}
        </div>

        {/* Reveal pricing for each category */}
        {categories.map((cat: any) => (
          <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <div style={{ height: 2, flex: 1, background: 'var(--neutral-alpha-weak, rgba(0,0,0,0.06))' }} />
              <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#d4a55a',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
              }}>
                {cat.name}
              </span>
              <div style={{ height: 2, flex: 1, background: 'var(--neutral-alpha-weak, rgba(0,0,0,0.06))' }} />
            </div>
            <CategoryReveal
              subcategories={cat.subcategories}
              accentColor="#d4a55a"
            />
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
