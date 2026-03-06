import { CategoryPage, getCategoryStaticParams } from '@/components/shared/CategoryPage';
import { ProductCard } from '@/components/demo2/ProductCard';
import { PageWrapper } from '@/components/shared/PageWrapper';

export const generateStaticParams = getCategoryStaticParams;

export default async function Demo2Category({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <PageWrapper>
      <CategoryPage slug={slug} basePath="/demo2" ProductCard={ProductCard} />
    </PageWrapper>
  );
}
