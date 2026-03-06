import { Column, Row, Heading, Text, Card, Grid, Badge, Button } from '@once-ui-system/core';
import { LayoutProvider } from '@once-ui-system/core';
import Link from 'next/link';

const demos = [
  {
    id: 'demo1',
    title: 'Modern Minimal',
    subtitle: 'Clean lines, generous whitespace, professional tone',
    description: 'Light theme with slate neutrals and green accents. Best for brand presentation, investor-facing materials, and professional audiences.',
    tags: ['Light Theme', 'Green / Emerald', 'Conservative Borders'],
    href: '/demo1',
  },
  {
    id: 'demo2',
    title: 'Bold Cards',
    subtitle: 'High contrast, big typography, dark mode impact',
    description: 'Dark theme with orange brand and yellow accents. Best for trade shows, product showcasing, social media screenshots, and visual impact.',
    tags: ['Dark Theme', 'Orange / Yellow', 'Playful Borders', '105% Scale'],
    href: '/demo2',
  },
  {
    id: 'demo3',
    title: 'Catalogue Dense',
    subtitle: 'Information-first, compact layout, quick scanning',
    description: 'Light theme with sand neutrals and blue accents. Best for power users, quick scanning, price-list browsing, and repeat buyers.',
    tags: ['Light Theme', 'Blue / Cyan', 'Sharp Borders', '95% Scale'],
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
              Each demo includes: Home, Categories, Product Detail, Content Pages, Contact, and Image QA.
            </Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              Built with Once UI + Next.js &bull; Data from OpenCart SQL dump
            </Text>
          </Column>
        </Column>
      </Column>
    </LayoutProvider>
  );
}
