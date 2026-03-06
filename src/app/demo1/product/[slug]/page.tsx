import { ProductPage, getProductStaticParams } from '@/components/shared/ProductPage';
import { PageWrapper } from '@/components/shared/PageWrapper';

export const generateStaticParams = getProductStaticParams;

export default async function Demo1Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <PageWrapper>
      <ProductPage slug={slug} basePath="/demo1" />
    </PageWrapper>
  );
}
