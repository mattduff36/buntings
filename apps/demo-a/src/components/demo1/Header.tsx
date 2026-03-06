'use client';

import { Row, Column, Heading, Text, Button } from '@once-ui-system/core';
import Link from 'next/link';
import { useDemo } from '../shared/DemoContext';

import categoriesTree from '@data/categories.tree.json';
import siteMeta from '@data/site.meta.json';

export function Header() {
  const { basePath } = useDemo();
  const topCategories = (categoriesTree as any[]).filter((c: any) => c.status === 1);

  return (
    <Column as="header" background="surface" borderBottom="neutral-alpha-weak" padding="m">
      <Row maxWidth="xl" style={{ margin: '0 auto', width: '100%' }} horizontal="between" vertical="center" gap="m">
        <Link href={basePath} style={{ textDecoration: 'none' }}>
          <Heading as="h1" variant="heading-strong-s">{(siteMeta as any).storeName}</Heading>
        </Link>

        <Row as="nav" gap="m" vertical="center">
          <Link href={`${basePath}/categories`} style={{ textDecoration: 'none' }}>
            <Text variant="label-default-s" onBackground="neutral-strong">Equipment</Text>
          </Link>
          {topCategories.slice(0, 3).map((cat: any) => (
            <Link
              key={cat.id}
              href={`${basePath}/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${cat.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Text variant="label-default-s" onBackground="neutral-strong">{cat.name}</Text>
            </Link>
          ))}
          <Link href={`${basePath}/contact`} style={{ textDecoration: 'none' }}>
            <Text variant="label-default-s" onBackground="neutral-strong">Contact</Text>
          </Link>
        </Row>

        <Row gap="s" vertical="center">
          <Link href={`${basePath}/categories`}>
            <Button variant="secondary" size="s" label="Browse" />
          </Link>
        </Row>
      </Row>
    </Column>
  );
}
