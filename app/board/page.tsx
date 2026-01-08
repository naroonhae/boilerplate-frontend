import { LucideEdit } from 'lucide-react';

import BoardComponent from '@/app/board/board-component';
import BoardPagination from '@/app/board/board-pagination';
import PageContainer from '@/components/common/page-container';
import { Button } from '@/components/ui/button';
import { formatTimeAgo } from '@/lib/date-utils';
import { contentService } from '@/services/content.service';

interface BoardPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BoardPage({ searchParams }: BoardPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const pageSize = 20;

  const paged = await contentService.getContentsServer(1, '', currentPage - 1, pageSize);
  return (
    <PageContainer>
      <div className="w-full flex py-2">
        <Button className="ms-auto" variant={'outline'} size={'sm'}>
          <LucideEdit />
          글쓰기
        </Button>
      </div>
      <BoardComponent
        className="w-full"
        data={paged.content}
        columns={[
          {
            header: '번호',
            value: (content) => content.id.toString(),
            className: 'w-[80px] text-center',
          },
          {
            header: '제목',
            value: (content) => (
              <div className="flex items-center gap-1">
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {content.title}
                </span>
                {content.commentCount > 0 && (
                  <span className="shrink-0 text-sm text-muted-foreground">
                    [{content.commentCount}]
                  </span>
                )}
              </div>
            ),
            className: 'text-left w-auto',
          },
          {
            header: '작성자',
            value: (content) => content.author,
            className: 'w-[120px] text-left overflow-hidden text-ellipsis whitespace-nowrap',
          },
          {
            header: '작성일',
            value: (content) => formatTimeAgo(content.createdAt),
            className: 'w-[80px] text-center',
          },
          {
            header: '조회',
            value: (content) => content.viewCount.toString(),
            className: 'w-[60px] text-center',
          },
          {
            header: '추천',
            value: (content) => content.likeCount.toString(),
            className: 'w-[60px] text-center',
          },
        ]}
      />
      <BoardPagination currentPage={currentPage} totalPages={paged.totalPages} />
    </PageContainer>
  );
}
