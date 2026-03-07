'use client';

import { useState } from 'react';
import { Row, Column, Text, Button } from '@once-ui-system/core';
import { Phone, Mail, Menu, X } from 'lucide-react';
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
    { label: 'Equipment', href: `${basePath}/categories` },
    ...topCategories.slice(0, 3).map((cat: any) => ({
      label: cat.name.trim(),
      href: `${basePath}/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${cat.id}`,
    })),
  ];

  return (
    <Column as="header" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Top bar */}
      <div style={{ background: '#1a3d1a', color: 'white' }}>
        <Row
          maxWidth="xl"
          style={{ margin: '0 auto', width: '100%' }}
          horizontal="between"
          vertical="center"
          paddingX="m"
          paddingY="xs"
        >
          <Row gap="m" vertical="center">
            <a href={`tel:${footer.phone?.replace(/\s/g, '')}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Phone size={12} color="#8bc48b" />
              <Text variant="body-default-xs" style={{ color: '#c8e6c8' }}>{footer.phone}</Text>
            </a>
            <a href={`mailto:${footer.email}`} className="header-top-contact" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Mail size={12} color="#8bc48b" />
              <Text variant="body-default-xs" style={{ color: '#c8e6c8' }}>{footer.email}</Text>
            </a>
          </Row>
          <Text variant="body-default-xs" style={{ color: '#8bc48b' }}>Est. 1980</Text>
        </Row>
      </div>

      {/* Main nav */}
      <div style={{
        background: 'var(--page-background, white)',
        borderBottom: '3px solid #2d6a2d',
        backdropFilter: 'blur(12px)',
      }}>
        <Row
          maxWidth="xl"
          style={{ margin: '0 auto', width: '100%' }}
          horizontal="between"
          vertical="center"
          paddingX="m"
          paddingY="s"
          gap="m"
        >
          <Link href={basePath} style={{ textDecoration: 'none' }}>
            <Logo height={42} />
          </Link>

          {/* Desktop nav */}
          <Row as="nav" gap="m" vertical="center" style={{ display: 'var(--nav-desktop, flex)' }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none', padding: '6px 0' }}>
                <Text variant="label-strong-s" onBackground="neutral-strong" style={{ transition: 'color 0.2s' }}>
                  {link.label}
                </Text>
              </Link>
            ))}
            <Link href={`${basePath}/contact`}>
              <Button variant="primary" size="s" label="Contact Us" />
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
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
                  <div style={{ padding: '10px 12px', borderRadius: 8, transition: 'background 0.2s' }}>
                    <Text variant="label-strong-s">{link.label}</Text>
                  </div>
                </Link>
              ))}
              <Link href={`${basePath}/contact`} onClick={() => setMobileOpen(false)}>
                <Button variant="primary" size="m" label="Contact Us" style={{ width: '100%', marginTop: 8 }} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Column>
  );
}
