import { CategoryPage, getCategoryStaticParams } from '@/components/shared/CategoryPage';
import { ProductCard } from '@/components/demo1/ProductCard';

export const generateStaticParams = getCategoryStaticParams;

export default async function Demo1Category({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CategoryPage slug={slug} basePath="/demo1" ProductCard={ProductCard} />;
}
