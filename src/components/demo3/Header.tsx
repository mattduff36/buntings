'use client';

import { Row, Column, Text, Button } from '@once-ui-system/core';
import Link from 'next/link';
import { useDemo } from '../shared/DemoContext';

import categoriesTree from '@data/categories.tree.json';
import siteMeta from '@data/site.meta.json';
import contentExtras from '@data/content.extras.json';

export function Header() {
  const { basePath } = useDemo();
  const topCategories = (categoriesTree as any[]).filter((c: any) => c.status === 1);
  const phone = (contentExtras as any).footerInfo?.phone;

  return (
    <Column as="header" background="surface" borderBottom="neutral-alpha-weak">
      <Row
        maxWidth="xl"
        style={{ margin: '0 auto', width: '100%' }}
        horizontal="between"
        vertical="center"
        padding="xs"
        paddingX="m"
      >
        <Text variant="body-default-xs" onBackground="neutral-weak">{phone}</Text>
        <Text variant="body-default-xs" onBackground="neutral-weak">{(siteMeta as any).email}</Text>
      </Row>
      <Row
        maxWidth="xl"
        style={{ margin: '0 auto', width: '100%' }}
        horizontal="between"
        vertical="center"
        padding="s"
        paddingX="m"
        borderTop="neutral-alpha-weak"
      >
        <Link href={basePath} style={{ textDecoration: 'none' }}>
          <Text variant="label-strong-m" onBackground="brand-strong">{(siteMeta as any).storeName}</Text>
        </Link>

        <Row as="nav" gap="s" vertical="center" wrap>
          <Link href={`${basePath}/categories`} style={{ textDecoration: 'none' }}>
            <Text variant="label-default-xs">Catalogue</Text>
          </Link>
          {topCategories.slice(0, 4).map((cat: any) => (
            <Link
              key={cat.id}
              href={`${basePath}/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${cat.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Text variant="label-default-xs">{cat.name}</Text>
            </Link>
          ))}
          <Link href={`${basePath}/contact`}>
            <Button variant="primary" size="s" label="Enquire" />
          </Link>
        </Row>
      </Row>
    </Column>
  );
}
