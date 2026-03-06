'use client';

import { useState } from 'react';
import { Row, Column, Text, Button } from '@once-ui-system/core';
import { Phone, Mail, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemo } from '../shared/DemoContext';
import { Logo } from '../shared/Logo';

import categoriesTree from '@data/categories.tree.json';
import siteMeta from '@data/site.meta.json';
import contentExtras from '@data/content.extras.json';

export function Header() {
  const { basePath } = useDemo();
  const [mobileOpen, setMobileOpen] = useState(false);
  const topCategories = (categoriesTree as any[]).filter((c: any) => c.status === 1);
  const phone = (contentExtras as any).footerInfo?.phone;

  const navLinks = [
    { label: 'Catalogue', href: `${basePath}/categories` },
    ...topCategories.slice(0, 3).map((cat: any) => ({
      label: cat.name.trim(),
      href: `${basePath}/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${cat.id}`,
    })),
  ];

  return (
    <Column as="header" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Top bar */}
      <div style={{ background: '#5c3d1e', color: 'white' }}>
        <Row
          maxWidth="xl"
          style={{ margin: '0 auto', width: '100%' }}
          horizontal="between"
          vertical="center"
          paddingX="m"
          paddingY="xs"
        >
          <Row gap="m" vertical="center">
            <a href={`tel:${phone?.replace(/\s/g, '')}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Phone size={12} color="#d4a55a" />
              <Text variant="body-default-xs" style={{ color: '#e8d5b8' }}>{phone}</Text>
            </a>
            <a href={`mailto:${(siteMeta as any).email}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Mail size={12} color="#d4a55a" />
              <Text variant="body-default-xs" style={{ color: '#e8d5b8' }}>{(siteMeta as any).email}</Text>
            </a>
          </Row>
          <Text variant="body-default-xs" style={{ color: '#d4a55a', fontWeight: 600 }}>Established 1980</Text>
        </Row>
      </div>

      {/* Main nav */}
      <div style={{
        background: 'var(--page-background, white)',
        borderBottom: '1px solid var(--neutral-alpha-weak, rgba(0,0,0,0.08))',
        backdropFilter: 'blur(12px)',
      }}>
        <Row
          maxWidth="xl"
          style={{ margin: '0 auto', width: '100%' }}
          horizontal="between"
          vertical="center"
          padding="s"
          paddingX="m"
        >
          <Link href={basePath} style={{ textDecoration: 'none' }}>
            <Logo height={38} />
          </Link>

          {/* Desktop nav */}
          <Row as="nav" gap="m" vertical="center" style={{ display: 'var(--nav-desktop, flex)' }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none', padding: '6px 0' }}>
                <Text variant="label-default-s" style={{ transition: 'color 0.2s' }}>
                  {link.label}
                </Text>
              </Link>
            ))}
            <Link href={`${basePath}/contact`}>
              <Button variant="primary" size="s" label="Get a Quote" />
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              overflow: 'hidden',
              background: 'var(--page-background, white)',
              borderBottom: '1px solid var(--neutral-alpha-weak, rgba(0,0,0,0.08))',
              display: 'var(--nav-mobile, none)',
            }}
          >
            <div style={{ padding: '8px 16px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
                  <div style={{ padding: '10px 12px', borderRadius: 8 }}>
                    <Text variant="label-default-s">{link.label}</Text>
                  </div>
                </Link>
              ))}
              <Link href={`${basePath}/contact`} onClick={() => setMobileOpen(false)} style={{ marginTop: 8 }}>
                <Button variant="primary" size="m" label="Get a Quote" style={{ width: '100%' }} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Column>
  );
}
