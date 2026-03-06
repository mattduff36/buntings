import { Column, Row, Heading, Text, Card, Button } from '@once-ui-system/core';
import { Phone, Smartphone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

import siteMeta from '@data/site.meta.json';
import contentExtras from '@data/content.extras.json';

export function ContactPage() {
  const meta = siteMeta as any;
  const extras = (contentExtras as any).footerInfo;

  return (
    <Column gap="l" maxWidth="l" style={{ margin: '0 auto' }}>
      <Column gap="s" style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
        <Heading as="h1" variant="display-strong-l">Get in Touch</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          Whether you need advice, a quote, or want to arrange a visit — we are here to help.
        </Text>
      </Column>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--spacing-m, 16px)',
      }}>
        {/* Contact methods */}
        <Card padding="l" radius="l" border="neutral-alpha-weak">
          <Column gap="l">
            <Row gap="s" vertical="center">
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'var(--brand-alpha-weak, rgba(0,128,0,0.08))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Phone size={18} style={{ color: 'var(--brand-strong)' }} />
              </div>
              <Heading as="h2" variant="heading-strong-m">Phone</Heading>
            </Row>
            <Column gap="s">
              <a href={`tel:${extras.phone?.replace(/\s/g, '')}`} style={{ textDecoration: 'none' }}>
                <Row gap="s" vertical="center">
                  <Phone size={15} style={{ flexShrink: 0 }} />
                  <Text variant="body-default-m">Office: {extras.phone}</Text>
                </Row>
              </a>
              {extras.mobile && (
                <a href={`tel:${extras.mobile?.replace(/\s/g, '')}`} style={{ textDecoration: 'none' }}>
                  <Row gap="s" vertical="center">
                    <Smartphone size={15} style={{ flexShrink: 0 }} />
                    <Text variant="body-default-m">Mobile: {extras.mobile}</Text>
                  </Row>
                </a>
              )}
            </Column>
          </Column>
        </Card>

        <Card padding="l" radius="l" border="neutral-alpha-weak">
          <Column gap="l">
            <Row gap="s" vertical="center">
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'var(--brand-alpha-weak, rgba(0,128,0,0.08))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Mail size={18} style={{ color: 'var(--brand-strong)' }} />
              </div>
              <Heading as="h2" variant="heading-strong-m">Email</Heading>
            </Row>
            <a href={`mailto:${extras.email}`} style={{ textDecoration: 'none' }}>
              <Row gap="s" vertical="center">
                <Mail size={15} style={{ flexShrink: 0 }} />
                <Text variant="body-default-m">{extras.email}</Text>
              </Row>
            </a>
          </Column>
        </Card>

        <Card padding="l" radius="l" border="neutral-alpha-weak">
          <Column gap="l">
            <Row gap="s" vertical="center">
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'var(--brand-alpha-weak, rgba(0,128,0,0.08))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <MapPin size={18} style={{ color: 'var(--brand-strong)' }} />
              </div>
              <Heading as="h2" variant="heading-strong-m">Visit Us</Heading>
            </Row>
            <Column gap="s">
              <Text variant="body-default-m" style={{ whiteSpace: 'pre-line' }}>{meta.address}</Text>
              <Row gap="xs" vertical="center">
                <Clock size={14} style={{ opacity: 0.6 }} />
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Mon–Fri: 8am–5pm, Sat: 8am–12pm
                </Text>
              </Row>
            </Column>
          </Column>
        </Card>
      </div>

      {/* Actions */}
      <Card padding="xl" radius="l" border="neutral-alpha-weak" style={{ textAlign: 'center' }}>
        <Column gap="m" horizontal="center">
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: 'var(--brand-alpha-weak, rgba(0,128,0,0.08))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <MessageSquare size={24} style={{ color: 'var(--brand-strong)' }} />
          </div>
          <Heading as="h2" variant="heading-strong-m">Send Us a Message</Heading>
          <Text variant="body-default-m" onBackground="neutral-weak" style={{ maxWidth: 420 }}>
            Email us with your enquiry and we will get back to you as soon as possible.
          </Text>
          <Row gap="m" horizontal="center">
            <a href={`mailto:${extras.email}`}>
              <Button variant="primary" size="l" label="Email Us" />
            </a>
            <a href={`tel:${extras.phone?.replace(/\s/g, '')}`}>
              <Button variant="secondary" size="l" label="Call Us" />
            </a>
          </Row>
        </Column>
      </Card>
    </Column>
  );
}
