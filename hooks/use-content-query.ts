'use client';

import { useQuery } from '@tanstack/react-query';
import { contentService } from '@/services/content.service';

export function useContentQuery(id: number) {
  return useQuery({
    queryKey: ['content', id],
    queryFn: () => contentService.getContentServer(id),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
