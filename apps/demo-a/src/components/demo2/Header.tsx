'use client';

import { Row, Column, Heading, Text, Button } from '@once-ui-system/core';
import Link from 'next/link';
import { useDemo } from '../shared/DemoContext';

import categoriesTree from '@data/categories.tree.json';

export function Header() {
  const { basePath } = useDemo();
  const topCategories = (categoriesTree as any[]).filter((c: any) => c.status === 1);

  return (
    <Column as="header" background="surface" borderBottom="neutral-alpha-weak" padding="l">
      <Row maxWidth="xl" style={{ margin: '0 auto', width: '100%' }} horizontal="between" vertical="center" gap="l">
        <Link href={basePath} style={{ textDecoration: 'none' }}>
          <Heading as="h1" variant="heading-strong-m" onBackground="brand-strong">BUNTINGS</Heading>
        </Link>

        <Row as="nav" gap="l" vertical="center">
          <Link href={`${basePath}/categories`} style={{ textDecoration: 'none' }}>
            <Text variant="label-strong-s" onBackground="neutral-strong">EQUIPMENT</Text>
          </Link>
          {topCategories.slice(0, 2).map((cat: any) => (
            <Link
              key={cat.id}
              href={`${basePath}/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${cat.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Text variant="label-strong-s" onBackground="neutral-strong">{cat.name.toUpperCase()}</Text>
            </Link>
          ))}
          <Link href={`${basePath}/contact`}>
            <Button variant="primary" size="s" label="CONTACT" />
          </Link>
        </Row>
      </Row>
    </Column>
  );
}
