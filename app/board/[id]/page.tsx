import PageContainer from '@/components/common/page-container';
import { contentService } from '@/services/content.service';
import { Suspense } from 'react';
import ContentComponent from './content-component';

export default async function ContentPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const content = await contentService.getContentServer(id);

  return (
    <PageContainer>
      <Suspense fallback={<div>로딩 중...</div>}>
        <ContentComponent content={content} />
      </Suspense>
    </PageContainer>
  );
}
