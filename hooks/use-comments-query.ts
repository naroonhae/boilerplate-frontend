'use client';

import { useQuery } from '@tanstack/react-query';
import { commentService } from '@/services/comment.service';

export function useCommentsQuery(contentId: number, page: number = 1, size: number = 10) {
  return useQuery({
    queryKey: ['comments', contentId, page, size],
    queryFn: () => commentService.getComments(contentId, page - 1, size), // API는 0부터 시작
    staleTime: 2 * 60 * 1000, // 2분
    gcTime: 5 * 60 * 1000, // 5분
  });
}
