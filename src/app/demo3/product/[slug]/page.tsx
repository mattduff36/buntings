import { ProductPage, getProductStaticParams } from '@/components/shared/ProductPage';

export const generateStaticParams = getProductStaticParams;

export default async function Demo3Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductPage slug={slug} basePath="/demo3" />;
}
