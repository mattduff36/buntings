import { Column, Row, Heading, Text, Card, Button } from '@once-ui-system/core';

import siteMeta from '@data/site.meta.json';
import contentExtras from '@data/content.extras.json';

export function ContactPage() {
  const meta = siteMeta as any;
  const extras = (contentExtras as any).footerInfo;

  return (
    <Column gap="l" maxWidth="m" style={{ margin: '0 auto' }}>
      <Column gap="s" style={{ textAlign: 'center' }}>
        <Heading as="h1" variant="display-strong-l">Contact Us</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          Get in touch with our team for enquiries, parts, and advice.
        </Text>
      </Column>

      <Card padding="xl" radius="l" border="neutral-alpha-weak">
        <Column gap="l">
          <Column gap="s">
            <Heading as="h2" variant="heading-strong-m">Phone</Heading>
            <Text variant="body-default-m">Office: {extras.phone}</Text>
            <Text variant="body-default-m">Mobile: {extras.mobile}</Text>
          </Column>
          <Column gap="s">
            <Heading as="h2" variant="heading-strong-m">Email</Heading>
            <Text variant="body-default-m">{extras.email}</Text>
          </Column>
          <Column gap="s">
            <Heading as="h2" variant="heading-strong-m">Address</Heading>
            <Text variant="body-default-m" style={{ whiteSpace: 'pre-line' }}>{meta.address}</Text>
          </Column>
          <Row gap="m">
            <a href={`mailto:${extras.email}`}>
              <Button variant="primary" size="l" label="Email Us" />
            </a>
            <a href={`tel:${extras.phone}`}>
              <Button variant="secondary" size="l" label="Call Us" />
            </a>
          </Row>
        </Column>
      </Card>
    </Column>
  );
}
