'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface PriceItem {
  name: string;
  price: number;
  unit: string;
}

interface Subcategory {
  name: string;
  items: PriceItem[];
}

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

interface PriceFilterProps {
  categories: Category[];
  accentColor?: string;
  variant?: 'dark' | 'light';
}

function formatPrice(price: number): string {
  return `£${price.toFixed(2)}`;
}

export function PriceFilter({
  categories,
  accentColor = 'var(--brand-strong)',
  variant = 'dark',
}: PriceFilterProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allItems = useMemo(() => {
    return categories.flatMap((cat) =>
      cat.subcategories.flatMap((sub) =>
        sub.items.map((item) => ({
          ...item,
          category: cat.name,
          categoryId: cat.id,
          subcategory: sub.name,
        }))
      )
    );
  }, [categories]);

  const filtered = useMemo(() => {
    return allItems.filter((item) => {
      const matchesSearch =
        !search || item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.subcategory.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !activeCategory || item.categoryId === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allItems, search, activeCategory]);

  const isDark = variant === 'dark';
  const inputBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)';
  const inputBorder = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)';
  const textPrimary = isDark ? '#fff' : 'var(--neutral-on-background-strong, #1a1a1a)';
  const textSecondary = isDark ? 'rgba(255,255,255,0.6)' : 'var(--neutral-on-background-weak, #666)';
  const rowBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const hoverBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ position: 'relative' }}>
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            color: textSecondary,
            pointerEvents: 'none',
          }}
        />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 40px 12px 40px',
            borderRadius: 10,
            border: `1px solid ${inputBorder}`,
            background: inputBg,
            color: textPrimary,
            fontSize: 14,
            fontFamily: 'inherit',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 2,
              display: 'flex',
            }}
          >
            <X size={14} color={textSecondary} />
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveCategory(null)}
          style={{
            padding: '6px 14px',
            borderRadius: 20,
            border: `1px solid ${!activeCategory ? accentColor : inputBorder}`,
            background: !activeCategory ? accentColor : 'transparent',
            color: !activeCategory ? (isDark ? '#000' : '#fff') : textPrimary,
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.2s',
          }}
        >
          All ({allItems.length})
        </button>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = cat.subcategories.reduce((sum, s) => sum + s.items.length, 0);
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(isActive ? null : cat.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: `1px solid ${isActive ? accentColor : inputBorder}`,
                background: isActive ? accentColor : 'transparent',
                color: isActive ? (isDark ? '#000' : '#fff') : textPrimary,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
              }}
            >
              {cat.name.replace(' Price List', '').replace(' Price Lists', '')} ({count})
            </button>
          );
        })}
      </div>

      <div style={{
        fontSize: 12,
        color: textSecondary,
        padding: '4px 0',
      }}>
        {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 2,
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${rowBorder}`,
      }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={`${item.categoryId}-${item.subcategory}-${item.name}`}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 16px',
                background: hoverBg,
                gap: 12,
                borderBottom: `1px solid ${rowBorder}`,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                <span style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: textPrimary,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {item.name}
                </span>
                <span style={{
                  fontSize: 11,
                  color: textSecondary,
                }}>
                  {item.subcategory}
                </span>
              </div>
              <span style={{
                fontSize: 14,
                fontWeight: 700,
                color: accentColor,
                whiteSpace: 'nowrap',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {formatPrice(item.price)}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: textSecondary,
          fontSize: 14,
        }}>
          No products match your search. Try a different term.
        </div>
      )}
    </div>
  );
}
