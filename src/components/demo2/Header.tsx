'use client';

import { useState } from 'react';
import { Row, Column, Text, Button } from '@once-ui-system/core';
import { Phone, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemo } from '../shared/DemoContext';
import { Logo } from '../shared/Logo';

import categoriesTree from '@data/categories.tree.json';
import contentExtras from '@data/content.extras.json';

export function Header() {
  const { basePath } = useDemo();
  const [mobileOpen, setMobileOpen] = useState(false);
  const topCategories = (categoriesTree as any[]).filter((c: any) => c.status === 1);
  const footer = (contentExtras as any).footerInfo;

  const navLinks = [
    { label: 'EQUIPMENT', href: `${basePath}/categories` },
    ...topCategories.slice(0, 2).map((cat: any) => ({
      label: cat.name.toUpperCase().trim(),
      href: `${basePath}/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${cat.id}`,
    })),
  ];

  return (
    <Column as="header" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{
        background: '#111',
        borderBottom: '2px solid #d4a017',
      }}>
        <Row
          maxWidth="xl"
          style={{ margin: '0 auto', width: '100%' }}
          horizontal="between"
          vertical="center"
          paddingX="m"
          paddingY="m"
          gap="l"
        >
          <Link href={basePath} style={{ textDecoration: 'none' }}>
            <Logo height={38} />
          </Link>

          {/* Desktop nav */}
          <Row as="nav" gap="l" vertical="center" style={{ display: 'var(--nav-desktop, flex)' }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none', padding: '4px 0' }}>
                <Text variant="label-strong-s" style={{
                  color: '#e0e0e0',
                  letterSpacing: '0.06em',
                  fontSize: 13,
                  transition: 'color 0.2s',
                }}>
                  {link.label}
                </Text>
              </Link>
            ))}
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.12)' }} />
            <a href={`tel:${footer.phone?.replace(/\s/g, '')}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Phone size={13} color="#d4a017" />
              <Text variant="body-default-xs" style={{ color: '#999' }}>{footer.phone}</Text>
            </a>
            <Link href={`${basePath}/contact`}>
              <Button variant="primary" size="s" label="CONTACT" />
            </Link>
          </Row>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'var(--nav-mobile, none)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              color: '#fff',
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </Row>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              overflow: 'hidden',
              background: '#111',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'var(--nav-mobile, none)',
            }}
          >
            <div style={{ padding: '8px 16px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
                  <div style={{ padding: '10px 12px', borderRadius: 8 }}>
                    <Text variant="label-strong-s" style={{ color: '#e0e0e0', letterSpacing: '0.05em' }}>
                      {link.label}
                    </Text>
                  </div>
                </Link>
              ))}
              <Link href={`${basePath}/contact`} onClick={() => setMobileOpen(false)} style={{ marginTop: 8 }}>
                <Button variant="primary" size="m" label="CONTACT" style={{ width: '100%' }} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Column>
  );
}
