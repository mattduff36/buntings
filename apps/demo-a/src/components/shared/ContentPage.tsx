import { Column, Heading, Card } from '@once-ui-system/core';
import { notFound } from 'next/navigation';

import pages from '@data/pages.enriched.json';

export function getPageStaticParams() {
  return (pages as any[]).map((p: any) => ({ slug: p.slug }));
}

export function ContentPage({ slug }: { slug: string }) {
  const page = (pages as any[]).find((p: any) => p.slug === slug);
  if (!page) notFound();

  return (
    <Column gap="l" maxWidth="m" style={{ margin: '0 auto' }}>
      <Heading as="h1" variant="display-strong-m">{page.title}</Heading>
      <Card padding="l" radius="l" border="neutral-alpha-weak">
        <div
          dangerouslySetInnerHTML={{ __html: page.html }}
          style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--neutral-on-background-weak)' }}
        />
      </Card>
    </Column>
  );
}
