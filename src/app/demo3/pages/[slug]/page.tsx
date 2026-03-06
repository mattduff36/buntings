import { ContentPage, getPageStaticParams } from '@/components/shared/ContentPage';
import { PageWrapper } from '@/components/shared/PageWrapper';

export const generateStaticParams = getPageStaticParams;

export default async function Demo3ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <PageWrapper>
      <ContentPage slug={slug} />
    </PageWrapper>
  );
}
