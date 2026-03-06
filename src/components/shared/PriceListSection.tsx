import { Column, Row, Heading, Text, Card } from '@once-ui-system/core';
import { TreePine, CircleDollarSign, Fence } from 'lucide-react';
import Link from 'next/link';

const priceLists = [
  {
    title: 'Timber Price List',
    description: 'Stakes, rails, jump poles, straining posts, and more. All items in stock, no minimum quantity.',
    icon: TreePine,
    slug: 'fencing-price-lists-188',
  },
  {
    title: 'Metal & Wooden Gates',
    description: 'Galvanised metal gates, half mesh gates, wooden gates and hanging kits at competitive prices.',
    icon: Fence,
    slug: 'fencing-price-lists-188',
  },
  {
    title: 'Stocknetting & Wire',
    description: 'Stock netting, horse netting, deer netting, barbed wire, plain wire and weld mesh.',
    icon: CircleDollarSign,
    slug: 'fencing-price-lists-188',
  },
];

interface PriceListSectionProps {
  basePath: string;
  variant?: 'default' | 'compact' | 'dark';
}

export function PriceListSection({ basePath, variant = 'default' }: PriceListSectionProps) {
  if (variant === 'compact') {
    return (
      <Column gap="m">
        <Row horizontal="between" vertical="center">
          <Heading as="h2" variant="heading-strong-m">Fencing Price Lists</Heading>
          <Link href={`${basePath}/category/fencing-price-lists-188`} style={{ textDecoration: 'none' }}>
            <Text variant="label-default-xs" onBackground="brand-strong">View all &rarr;</Text>
          </Link>
        </Row>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--spacing-s, 0.5rem)',
        }}>
          {priceLists.map((pl) => (
            <Link key={pl.title} href={`${basePath}/category/${pl.slug}`} style={{ textDecoration: 'none' }}>
              <Card padding="m" radius="m" border="neutral-alpha-weak" style={{ cursor: 'pointer', height: '100%' }}>
                <Row gap="s" vertical="center">
                  <pl.icon size={20} style={{ flexShrink: 0 }} />
                  <Column gap="2">
                    <Text variant="label-strong-s">{pl.title}</Text>
                    <Text variant="body-default-xs" onBackground="neutral-weak">{pl.description}</Text>
                  </Column>
                </Row>
              </Card>
            </Link>
          ))}
        </div>
      </Column>
    );
  }

  return (
    <Column gap="m">
      <Column gap="xs" style={{ textAlign: 'center' }}>
        <Heading as="h2" variant="heading-strong-l">Fencing & Timber Price Lists</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Competitive prices on fencing supplies. All items in stock with no minimum order.
        </Text>
      </Column>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--spacing-m, 1rem)',
      }}>
        {priceLists.map((pl) => (
          <Link key={pl.title} href={`${basePath}/category/${pl.slug}`} style={{ textDecoration: 'none' }}>
            <Card
              padding="l"
              radius="l"
              border="neutral-alpha-weak"
              style={{
                cursor: 'pointer',
                height: '100%',
                textAlign: 'center',
              }}
            >
              <Column gap="m" horizontal="center" vertical="center">
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'var(--brand-alpha-weak)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <pl.icon size={28} color="var(--brand-strong)" />
                </div>
                <Heading as="h3" variant="heading-strong-m">{pl.title}</Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">{pl.description}</Text>
                <Text variant="label-strong-s" onBackground="brand-strong">View Prices &rarr;</Text>
              </Column>
            </Card>
          </Link>
        ))}
      </div>
    </Column>
  );
}
