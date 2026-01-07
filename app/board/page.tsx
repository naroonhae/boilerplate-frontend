import PageContainer from '@/components/common/page-container';
import { contentService } from '@/services/content.service';

export default async function BoardPage() {
  const contents = await contentService.getContentsServer(1, '', 0, 20);
  return (
    <PageContainer>
      <>{contents.content.length}</>
    </PageContainer>
  );
}
