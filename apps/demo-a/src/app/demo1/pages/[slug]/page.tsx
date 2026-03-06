import { ContentPage, getPageStaticParams } from '@/components/shared/ContentPage';

export const generateStaticParams = getPageStaticParams;

export default async function Demo1ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ContentPage slug={slug} />;
}
