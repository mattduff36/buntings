'use client';

import { PriceFilter } from '@/components/pricing/PriceFilter';
import { AnimatedSection } from '@/components/pricing/AnimatedSection';
import pricingData from '@data/pricing.json';

export function Demo2PricingSection() {
  return (
    <AnimatedSection>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: '0.03em',
              color: 'var(--neutral-on-background-strong, #fff)',
            }}>
              FENCING PRICE LISTS
            </h2>
            <p style={{
              margin: '4px 0 0',
              fontSize: 14,
              color: 'var(--neutral-on-background-weak, rgba(255,255,255,0.6))',
            }}>
              All prices include VAT &middot; No minimum order &middot; All items in stock
            </p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 12px',
            borderRadius: 6,
            background: 'rgba(212,160,23,0.15)',
            border: '1px solid rgba(212,160,23,0.3)',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ fontSize: 12, color: '#d4a017', fontWeight: 500 }}>
              Updated {(pricingData as any).categories[0].dateLabel}
            </span>
          </div>
        </div>

        <PriceFilter
          categories={(pricingData as any).categories}
          accentColor="#d4a017"
          variant="dark"
        />
      </div>
    </AnimatedSection>
  );
}
