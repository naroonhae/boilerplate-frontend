'use client';

import { useQuery } from '@tanstack/react-query';
import { contentService } from '@/services/content.service';
import { useSearchParams } from 'next/navigation';

export function useBoardQuery() {
  const searchParams = useSearchParams();

  const category = Number(searchParams.get('category') || '0');
  const search = searchParams.get('search') || '';
  const page = Number(searchParams.get('page') || '1');
  const size = 12; // 한 페이지당 12개

  return useQuery({
    queryKey: ['contents', category, search, page, size],
    queryFn: () => contentService.getContentsServer(category, search, page - 1, size), // API는 0부터 시작
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
