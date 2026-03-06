'use client';

import { Column, Row, Text, Line, Button } from '@once-ui-system/core';
import Link from 'next/link';
import { useDemo } from './DemoContext';

import siteMeta from '@data/site.meta.json';
import contentExtras from '@data/content.extras.json';

export function Footer() {
  const { basePath } = useDemo();
  const footer = (contentExtras as any).footerInfo;

  return (
    <Column as="footer" background="surface" borderTop="neutral-alpha-weak" padding="l" gap="m">
      <Row maxWidth="xl" style={{ margin: '0 auto', width: '100%' }} gap="xl" wrap>
        <Column gap="s" flex={1} minWidth={200}>
          <Text variant="label-strong-s">Contact</Text>
          <Text variant="body-default-xs" onBackground="neutral-weak">{footer.phone}</Text>
          <Text variant="body-default-xs" onBackground="neutral-weak">{footer.email}</Text>
        </Column>
        <Column gap="s" flex={1} minWidth={200}>
          <Text variant="label-strong-s">Address</Text>
          <Text variant="body-default-xs" onBackground="neutral-weak" style={{ whiteSpace: 'pre-line' }}>
            {(siteMeta as any).address}
          </Text>
        </Column>
        <Column gap="s" flex={1} minWidth={200}>
          <Text variant="label-strong-s">Links</Text>
          <Link href={`${basePath}/pages/about-us`} style={{ textDecoration: 'none' }}>
            <Text variant="body-default-xs" onBackground="neutral-weak">About Us</Text>
          </Link>
          <Link href={`${basePath}/pages/privacy-policy`} style={{ textDecoration: 'none' }}>
            <Text variant="body-default-xs" onBackground="neutral-weak">Privacy Policy</Text>
          </Link>
          <Link href={`${basePath}/contact`} style={{ textDecoration: 'none' }}>
            <Text variant="body-default-xs" onBackground="neutral-weak">Contact Us</Text>
          </Link>
        </Column>
      </Row>
      <Line />
      <Row maxWidth="xl" style={{ margin: '0 auto', width: '100%' }} horizontal="between" vertical="center">
        <Text variant="body-default-xs" onBackground="neutral-weak">
          {(siteMeta as any).storeName} &copy; {new Date().getFullYear()}
        </Text>
        <Link href="/">
          <Button variant="tertiary" size="s" label="&larr; All Demos" />
        </Link>
      </Row>
    </Column>
  );
}
