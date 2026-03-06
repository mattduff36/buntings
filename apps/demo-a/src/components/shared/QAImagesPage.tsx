'use client';

import { useState } from 'react';
import { Column, Row, Heading, Text, Button, Card, Grid, Badge } from '@once-ui-system/core';

import imageMap from '@data/image-map.json';
import products from '@data/products.enriched.json';

type FilterType = 'all' | 'missing' | 'low';

export function QAImagesPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const productMap = Object.fromEntries((products as any[]).map((p: any) => [p.id, p]));

  const items = (imageMap as any[]).map((entry: any) => ({
    ...entry,
    product: productMap[entry.productId],
  }));

  const filtered = items.filter((item: any) => {
    if (filter === 'missing') return item.mainConfidence === 'missing' || !item.mainLocalUrl || item.mainLocalUrl.includes('placeholder');
    if (filter === 'low') return item.mainConfidence === 'low';
    return true;
  });

  return (
    <Column gap="l">
      <Column gap="s">
        <Heading as="h1" variant="display-strong-m">Image QA Review</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {items.length} products total. Use filters to spot-check image resolution quality.
        </Text>
      </Column>

      <Row gap="s">
        <Button variant={filter === 'all' ? 'primary' : 'secondary'} size="s" label={`All (${items.length})`} onClick={() => setFilter('all')} />
        <Button variant={filter === 'missing' ? 'primary' : 'secondary'} size="s" label={`Missing (${items.filter((i: any) => i.mainConfidence === 'missing' || !i.mainLocalUrl || i.mainLocalUrl.includes('placeholder')).length})`} onClick={() => setFilter('missing')} />
        <Button variant={filter === 'low' ? 'primary' : 'secondary'} size="s" label={`Low Confidence (${items.filter((i: any) => i.mainConfidence === 'low').length})`} onClick={() => setFilter('low')} />
      </Row>

      <Grid gap="m" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {filtered.map((item: any) => (
          <Card key={item.productId} padding="m" radius="l" border="neutral-alpha-weak">
            <Column gap="s">
              <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: 'var(--radius-m)', background: 'var(--neutral-alpha-weak)' }}>
                <img
                  src={item.mainLocalUrl || '/legacy-images/placeholders/equipment.svg'}
                  alt={item.product?.name || ''}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <Text variant="label-strong-xs" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {item.product?.name || `Product ${item.productId}`}
              </Text>
              <Row gap="xs" wrap>
                <Badge title={`Stage ${item.mainStage}`} />
                <Badge title={item.mainConfidence || 'missing'} />
                {item.galleryMissing > 0 && <Badge title={`${item.galleryMissing} gallery missing`} />}
              </Row>
              <Text variant="body-default-xs" onBackground="neutral-weak" style={{ wordBreak: 'break-all' }}>
                DB: {item.mainDbPath || 'none'}
              </Text>
            </Column>
          </Card>
        ))}
      </Grid>
    </Column>
  );
}
