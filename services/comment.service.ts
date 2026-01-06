import axios from '@/lib/axios';
import { serverApi } from '@/lib/server-api';
import { ApiResponse, Paged } from '@/types/response';

export interface Comment {
  id: number;
  author: string;
  content: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

interface PostCommentRequest {
  content: string;
}

export const commentService = {
  getCommentsServer: async (id: number, page: number, size: number): Promise<Paged<Comment[]>> => {
    const searchParams = new URLSearchParams();
    searchParams.append('page', page.toString());
    searchParams.append('size', size.toString());
    const response = await serverApi<Paged<Comment[]>>(
      `/content-service/api/v1/contents/${id}/comments?${searchParams.toString()}`,
    );
    return response;
  },

  postComment: async (id: number, request: PostCommentRequest): Promise<Comment> => {
    const response = await axios.post<ApiResponse<Comment>>(
      `/server/content-service/api/v1/contents/${id}/comments`,
      request,
    );
    return response.data.data;
  },

  replyComment: async (
    id: number,
    commentId: number,
    request: PostCommentRequest,
  ): Promise<Comment> => {
    const response = await axios.post<ApiResponse<Comment>>(
      `/server/content-service/api/v1/comments/${id}/comments/${commentId}`,
      request,
    );
    return response.data.data;
  },

  updateComment: async (id: number, request: PostCommentRequest): Promise<Comment> => {
    const response = await axios.put<ApiResponse<Comment>>(
      `/server/content-service/api/v1/comments/${id}`,
      request,
    );
    return response.data.data;
  },

  deleteComment: async (id: number): Promise<string> => {
    const response = await axios.delete(`/server/content-service/api/v1/comments/${id}`);
    return response.data.result;
  },
};
