import { Column, Row, Heading, Text, Card, Grid, Badge, Button } from '@once-ui-system/core';
import { LayoutProvider } from '@once-ui-system/core';
import Link from 'next/link';

const demos = [
  {
    id: 'demo1',
    title: 'Country Green',
    subtitle: 'Modern clean agricultural brand with premium editorial feel',
    description: 'Light theme with deep green accents. Full-viewport hero, interactive accordion pricing, image-forward category cards, and scroll-triggered animations. Elegant and spacious.',
    tags: ['Light Theme', 'Green / Emerald', 'Accordion Pricing', 'Editorial'],
    href: '/demo1',
  },
  {
    id: 'demo2',
    title: 'Dark Machinery',
    subtitle: 'Data-driven catalogue with powerful filtering and stats',
    description: 'Dark theme with gold accents. Carousel hero with animated stats, real-time searchable price list with category filters, compact product grids. Information-first.',
    tags: ['Dark Theme', 'Amber / Gold', 'Filterable Prices', 'Data-Dense'],
    href: '/demo2',
  },
  {
    id: 'demo3',
    title: 'Classic Earth',
    subtitle: 'High-impact marketing with bold storytelling sections',
    description: 'Warm earth tones with bronze accents. Hero carousel, story strip, image-based category banners, expandable pricing cards, and bold CTA sections. Brand-forward and engaging.',
    tags: ['Light Theme', 'Bronze / Earth', 'Category Reveal', 'Marketing'],
    href: '/demo3',
  },
];

export default function LandingPage() {
  return (
    <LayoutProvider>
      <Column minHeight="100vh" background="page">
        <Column
          padding="xl"
          paddingY="xl"
          gap="xl"
          maxWidth="l"
          style={{ margin: '0 auto', width: '100%' }}
        >
          <Column gap="m" style={{ textAlign: 'center' }} paddingY="xl">
            <Badge title="DEMO SHOWCASE" />
            <Heading as="h1" variant="display-strong-xl">
              Buntings Agri
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" style={{ maxWidth: 560, margin: '0 auto' }}>
              Three distinct frontend directions for the Buntings Agri website rebuild.
              Same data, same features, three visual identities.
            </Text>
          </Column>

          <Grid gap="l" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {demos.map((demo) => (
              <Link key={demo.id} href={demo.href} style={{ textDecoration: 'none' }}>
                <Card
                  padding="l"
                  radius="l"
                  border="neutral-alpha-weak"
                  style={{ height: '100%', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
                >
                  <Column gap="m" fill>
                    <Column gap="xs">
                      <Text variant="label-default-xs" onBackground="neutral-weak">{demo.id.toUpperCase()}</Text>
                      <Heading as="h2" variant="heading-strong-l">{demo.title}</Heading>
                      <Text variant="body-default-m" onBackground="neutral-weak">{demo.subtitle}</Text>
                    </Column>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {demo.description}
                    </Text>
                    <Row gap="xs" wrap style={{ marginTop: 'auto' }}>
                      {demo.tags.map((tag) => (
                        <Badge key={tag} title={tag} />
                      ))}
                    </Row>
                    <Button variant="primary" label={`View ${demo.title}`} size="m" />
                  </Column>
                </Card>
              </Link>
            ))}
          </Grid>

          <Column gap="s" style={{ textAlign: 'center' }} paddingY="l">
            <Text variant="body-default-s" onBackground="neutral-weak">
              Each demo includes: Home, Categories, Product Detail, Interactive Pricing, Content Pages, and Contact.
            </Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              Built with Once UI + Next.js + Framer Motion &bull; Real product and pricing data &bull; 100+ fencing price items
            </Text>
          </Column>
        </Column>
      </Column>
    </LayoutProvider>
  );
}
