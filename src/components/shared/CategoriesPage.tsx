import { Column, Heading, Text, Grid, Card } from '@once-ui-system/core';
import Link from 'next/link';

import categoriesTree from '@data/categories.tree.json';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function CategoryItem({ cat, depth = 0, basePath }: { cat: any; depth?: number; basePath: string }) {
  return (
    <Column gap="s">
      <Link href={`${basePath}/category/${slugify(cat.name)}-${cat.id}`} style={{ textDecoration: 'none' }}>
        <Card padding="m" radius="l" border="neutral-alpha-weak" style={{ cursor: 'pointer' }}>
          <Column gap="xs">
            <Heading as={depth === 0 ? 'h2' : 'h3'} variant={depth === 0 ? 'heading-strong-m' : 'heading-strong-s'}>
              {cat.name}
            </Heading>
            {cat.descriptionText && (
              <Text variant="body-default-xs" onBackground="neutral-weak" style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {cat.descriptionText}
              </Text>
            )}
            {cat.children && cat.children.length > 0 && (
              <Text variant="label-default-xs" onBackground="brand-strong">
                {cat.children.length} subcategories
              </Text>
            )}
          </Column>
        </Card>
      </Link>
      {cat.children && cat.children.length > 0 && (
        <Grid gap="s" style={{ paddingLeft: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {cat.children.map((child: any) => (
            <CategoryItem key={child.id} cat={child} depth={depth + 1} basePath={basePath} />
          ))}
        </Grid>
      )}
    </Column>
  );
}

export function CategoriesPage({ basePath }: { basePath: string }) {
  const tree = categoriesTree as any[];

  return (
    <Column gap="l">
      <Column gap="s">
        <Heading as="h1" variant="display-strong-m">All Categories</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Browse our full range of agricultural equipment and supplies.
        </Text>
      </Column>
      <Column gap="m">
        {tree.map((cat: any) => (
          <CategoryItem key={cat.id} cat={cat} basePath={basePath} />
        ))}
      </Column>
    </Column>
  );
}
