'use client';

import { Column, Row, Text, Line, Button } from '@once-ui-system/core';
import { Phone, Mail, MapPin, Smartphone, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useDemo } from './DemoContext';
import { Logo } from './Logo';

import siteMeta from '@data/site.meta.json';
import contentExtras from '@data/content.extras.json';

export function Footer() {
  const { basePath } = useDemo();
  const footer = (contentExtras as any).footerInfo;

  return (
    <Column as="footer" background="surface" borderTop="neutral-alpha-weak" padding="0" gap="0">
      {/* CTA strip */}
      <div style={{
        background: 'var(--brand-strong)',
        padding: '20px 24px',
      }}>
        <div style={{
          maxWidth: 'var(--responsive-xl, 1200px)',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <div style={{ color: 'var(--static-white, #fff)', fontSize: 16, fontWeight: 700 }}>
              Need help choosing the right equipment?
            </div>
            <div style={{ color: 'var(--static-white, rgba(255,255,255,0.8))', fontSize: 13 }}>
              Our friendly team has 40+ years of experience and are happy to advise.
            </div>
          </div>
          <div className="footer-cta-row" style={{ display: 'flex', gap: 10 }}>
            <Link href={`${basePath}/contact`}>
              <Button variant="secondary" size="m" label="Send Enquiry"
                style={{ background: 'rgba(255,255,255,0.15)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
              />
            </Link>
            <a href={`tel:${footer.phone?.replace(/\s/g, '')}`} style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="m" label={footer.phone}
                style={{ background: 'rgba(255,255,255,0.15)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ padding: 'var(--spacing-l, 32px) var(--spacing-l, 24px)' }}>
        <div style={{
          maxWidth: 'var(--responsive-xl, 1200px)',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
          gap: '2rem',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Logo height={35} />
            <Text variant="body-default-xs" onBackground="neutral-weak">
              Quality agricultural equipment, parts, and sundries since 1980.
            </Text>
            <Row gap="s" vertical="center">
              <Clock size={13} style={{ flexShrink: 0, opacity: 0.6 }} />
              <Text variant="body-default-xs" onBackground="neutral-weak">
                Mon–Fri: 8am–5pm, Sat: 8am–12pm
              </Text>
            </Row>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Text variant="label-strong-s">Contact</Text>
            <a href={`tel:${footer.phone?.replace(/\s/g, '')}`} style={{ textDecoration: 'none' }}>
              <Row gap="s" vertical="center">
                <Phone size={13} style={{ flexShrink: 0 }} />
                <Text variant="body-default-xs" onBackground="neutral-weak">{footer.phone}</Text>
              </Row>
            </a>
            {footer.mobile && (
              <a href={`tel:${footer.mobile?.replace(/\s/g, '')}`} style={{ textDecoration: 'none' }}>
                <Row gap="s" vertical="center">
                  <Smartphone size={13} style={{ flexShrink: 0 }} />
                  <Text variant="body-default-xs" onBackground="neutral-weak">{footer.mobile}</Text>
                </Row>
              </a>
            )}
            <a href={`mailto:${footer.email}`} style={{ textDecoration: 'none' }}>
              <Row gap="s" vertical="center">
                <Mail size={13} style={{ flexShrink: 0 }} />
                <Text variant="body-default-xs" onBackground="neutral-weak">{footer.email}</Text>
              </Row>
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Text variant="label-strong-s">Address</Text>
            <Row gap="s" vertical="start">
              <MapPin size={13} style={{ flexShrink: 0, marginTop: 2 }} />
              <Text variant="body-default-xs" onBackground="neutral-weak" style={{ whiteSpace: 'pre-line' }}>
                {(siteMeta as any).address}
              </Text>
            </Row>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Text variant="label-strong-s">Quick Links</Text>
            {[
              { label: 'All Equipment', href: `${basePath}/categories` },
              { label: 'Fencing Prices', href: `${basePath}/category/fencing-price-lists-188` },
              { label: 'Contact Us', href: `${basePath}/contact` },
              { label: 'About Us', href: `${basePath}/pages/about-us` },
              { label: 'Privacy Policy', href: `${basePath}/pages/privacy-policy` },
            ].map((link) => (
              <Link key={link.label} href={link.href} style={{ textDecoration: 'none' }}>
                <Row gap="xs" vertical="center">
                  <Text variant="body-default-xs" onBackground="neutral-weak">{link.label}</Text>
                  <ArrowUpRight size={10} style={{ opacity: 0.4 }} />
                </Row>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Line />
      <div style={{ padding: '12px var(--spacing-l, 24px)' }}>
        <Row maxWidth="xl" style={{ margin: '0 auto', width: '100%' }} horizontal="between" vertical="center">
          <Text variant="body-default-xs" onBackground="neutral-weak">
            {(siteMeta as any).storeName} &copy; {new Date().getFullYear()}
          </Text>
          <Link href="/">
            <Button variant="tertiary" size="s" label="&larr; All Demos" />
          </Link>
        </Row>
      </div>
    </Column>
  );
}
