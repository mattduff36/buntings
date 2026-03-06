import { CategoryPage, getCategoryStaticParams } from '@/components/shared/CategoryPage';
import { ProductCard } from '@/components/demo3/ProductCard';

export const generateStaticParams = getCategoryStaticParams;

export default async function Demo3Category({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CategoryPage slug={slug} basePath="/demo3" ProductCard={ProductCard} />;
}
