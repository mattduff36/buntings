'use client';

import { useState, useRef } from 'react';
import { Column, Row, Heading, Button, Card } from '@once-ui-system/core';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Demo2PricingSection } from './PricingSection';

interface Category {
  id: number;
  name: string;
  children?: { length: number }[];
  [key: string]: any;
}

interface Props {
  categories: Category[];
}

const FENCING_ID = 188;

export function Demo2CategoriesWithPricing({ categories }: Props) {
  const [showPricing, setShowPricing] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const allCategories: Category = { id: -1, name: 'All Categories' };
  const machinery = categories.find((c) => c.id === 205);
  const livestock = categories.find((c) => c.id === 142);
  const fencing = categories.find((c) => c.id === FENCING_ID);

  const orderedCategories = [allCategories, machinery, livestock, fencing].filter(Boolean) as Category[];

  function handleCardClick(cat: Category) {
    setShowPricing((prev) => !prev);
    if (!showPricing) {
      setTimeout(() => {
        pricingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  function renderCard(cat: Category) {
    return (
      <Card
        padding="l"
        radius="l"
        border="neutral-alpha-weak"
        style={{
          cursor: 'pointer',
          width: '100%',
          height: '100%',
          minHeight: 120,
          borderLeft: '4px solid var(--brand-strong)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        <Column vertical="center" fill>
          <Heading as="h3" variant="heading-strong-l">{cat.name}</Heading>
        </Column>
      </Card>
    );
  }

  return (
    <Column gap="l">
      <AnimatePresence>
        {showPricing && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowPricing(false)}
            style={{
              position: 'fixed',
              top: 130,
              right: 24,
              zIndex: 40,
              background: '#d4a017',
              color: '#000',
              border: 'none',
              borderRadius: 8,
              padding: '10px 18px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              letterSpacing: '0.03em',
            }}
          >
            Hide Price Lists
          </motion.button>
        )}
      </AnimatePresence>

      <Row horizontal="between" vertical="center">
        <Heading as="h2" variant="display-strong-m" style={{ letterSpacing: '0.03em' }}>CATEGORIES</Heading>
        <Link href="/demo2/categories">
          <Button variant="tertiary" size="s" label="View All" />
        </Link>
      </Row>
      <div className="demo2-cat-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'var(--spacing-m, 16px)',
      }}>
        {orderedCategories.map((cat) => {
          if (cat.id === FENCING_ID) {
            return (
              <div
                key={cat.id}
                onClick={() => handleCardClick(cat)}
                style={{ textDecoration: 'none', minWidth: 0, display: 'flex' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(cat); }}
              >
                {renderCard(cat)}
              </div>
            );
          }

          const href = cat.id === -1
            ? '/demo2/categories'
            : `/demo2/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${cat.id}`;

          return (
            <Link key={cat.id} href={href} style={{ textDecoration: 'none', minWidth: 0, display: 'flex' }}>
              {renderCard(cat)}
            </Link>
          );
        })}
      </div>

      <div ref={pricingRef}>
        <AnimatePresence>
          {showPricing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <Demo2PricingSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Column>
  );
}
