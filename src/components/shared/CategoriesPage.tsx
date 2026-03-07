import { Column, Heading, Text, Grid, Card, Row } from '@once-ui-system/core';
import { FolderOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import categoriesTree from '@data/categories.tree.json';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function CategoryItem({ cat, depth = 0, basePath }: { cat: any; depth?: number; basePath: string }) {
  const name = cat.name?.trim() || `Category ${cat.id}`;
  const isTopLevel = depth === 0;

  return (
    <Column gap="s">
      <Link href={`${basePath}/category/${slugify(name)}-${cat.id}`} style={{ textDecoration: 'none' }}>
        <Card padding={isTopLevel ? 'l' : 'm'} radius="l" border="neutral-alpha-weak" style={{
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          borderLeft: isTopLevel ? '3px solid var(--brand-strong)' : undefined,
        }}>
          <Row gap="m" vertical="center" horizontal="between">
            <Column gap="xs" style={{ flex: 1 }}>
              <Row gap="s" vertical="center">
                {isTopLevel && <FolderOpen size={18} style={{ color: 'var(--brand-strong)', flexShrink: 0 }} />}
                <Heading as={isTopLevel ? 'h2' : 'h3'} variant={isTopLevel ? 'heading-strong-m' : 'heading-strong-s'}>
                  {name}
                </Heading>
              </Row>
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
            <ChevronRight size={16} style={{ opacity: 0.4, flexShrink: 0 }} />
          </Row>
        </Card>
      </Link>
      {cat.children && cat.children.length > 0 && (
        <Grid gap="s" style={{ paddingLeft: isTopLevel ? 20 : 16, gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))' }}>
          {cat.children.map((child: any) => (
            <CategoryItem key={child.id} cat={child} depth={depth + 1} basePath={basePath} />
          ))}
        </Grid>
      )}
    </Column>
  );
}

export function CategoriesPage({ basePath }: { basePath: string }) {
  const preferredOrder = [205, 142, 188];

  const tree = (categoriesTree as any[])
    .map((cat: any) => ({
      ...cat,
      children: cat.children
        ?.filter((ch: any) => ch.name && ch.name.trim().length > 0)
        .sort((a: any, b: any) => (a.name || '').localeCompare(b.name || '')),
    }))
    .sort((a: any, b: any) => {
      const ai = preferredOrder.indexOf(a.id);
      const bi = preferredOrder.indexOf(b.id);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return (a.name || '').localeCompare(b.name || '');
    });

  const totalSubcategories = tree.reduce((sum: number, cat: any) => sum + (cat.children?.length || 0), 0);

  return (
    <Column gap="l">
      <Column gap="s">
        <Row gap="m" vertical="center">
          <Heading as="h1" variant="display-strong-m">All Categories</Heading>
          <div style={{
            background: 'var(--brand-alpha-weak, rgba(0,128,0,0.08))',
            color: 'var(--brand-strong)',
            fontSize: 12,
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: 12,
          }}>
            {tree.length} categories &middot; {totalSubcategories} subcategories
          </div>
        </Row>
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
