import axios from '@/lib/axios';
import { serverApi } from '@/lib/server-api';
import { ApiResponse, Paged } from '@/types/response';

type ContentType = 'POST' | 'ARTICLE' | 'NOTICE' | 'QNA';
type ContentStatus = 'DRAFT' | 'PUBLISHED' | 'DELETED';
type ContentVisibility = 'PUBLIC' | 'PRIVATE' | 'UNLISTED';

interface CreateContentRequest {
  categoryId: number;
  title: string;
  content: string;
  contentType: ContentType;
  thumbnail: '';
  status: ContentStatus;
  visibility: ContentVisibility;
  tags: [];
}

interface UpdateContentRequest {
  categoryId: number;
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
}

export interface Content {
  id: number;
  author: string;
  title: string;
  content: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export const contentService = {
  createContent: async (request: CreateContentRequest): Promise<Content> => {
    const response = await axios.post<ApiResponse<Content>>(
      '/server/content-service/api/v1/contents',
      request,
    );
    return response.data.data;
  },

  getContentsServer: async (
    category: number,
    search: string,
    page: number,
    size: number,
  ): Promise<Paged<Content[]>> => {
    const searchParams = new URLSearchParams();
    searchParams.append('category', category.toString());
    searchParams.append('search', search);
    searchParams.append('page', page.toString());
    searchParams.append('size', size.toString());

    const response = await serverApi<Paged<Content[]>>(
      `/content-service/api/v1/contents?${searchParams.toString()}`,
    );
    return response;
  },

  getOwnContentsServer: async (
    category: number,
    search: string,
    page: number,
    size: number,
  ): Promise<Paged<Content[]>> => {
    const searchParams = new URLSearchParams();
    searchParams.append('category', category.toString());
    searchParams.append('search', search);
    searchParams.append('page', page.toString());
    searchParams.append('size', size.toString());

    const response = await serverApi<Paged<Content[]>>(
      `/content-service/api/v1/contents/me?${searchParams.toString()}`,
    );
    return response;
  },

  getContentServer: async (id: number): Promise<Content> => {
    const response = await serverApi<Content>(`/content-service/api/v1/contents/${id}`);
    return response;
  },

  updateContent: async (id: number, request: UpdateContentRequest): Promise<Content> => {
    const response = await axios.put<ApiResponse<Content>>(
      `/server/content-service/api/v1/contents/${id}`,
      request,
    );
    return response.data.data;
  },

  deleteContent: async (id: number): Promise<string> => {
    const response = await axios.delete(`/server/content-service/api/v1/contents/${id}`);
    return response.data.result;
  },
};
