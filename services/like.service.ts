import axios from '@/lib/axios';
import { ApiResponse } from '@/types/response';

export const likeService = {
  likeContent: async (id: number): Promise<string> => {
    const response = await axios.post<ApiResponse<null>>(
      `/server/content-service/api/v1/contents/${id}/likes`,
    );
    return response.data.result;
  },

  unlikeContent: async (id: number): Promise<string> => {
    const response = await axios.delete<ApiResponse<null>>(
      `/server/content-service/api/v1/contents/${id}/likes`,
    );
    return response.data.result;
  },

  likeComment: async (id: number): Promise<string> => {
    const response = await axios.post<ApiResponse<null>>(
      `/server/content-service/api/v1/comments/${id}/likes`,
    );
    return response.data.result;
  },

  unlikeComment: async (id: number): Promise<string> => {
    const response = await axios.delete<ApiResponse<null>>(
      `/server/content-service/api/v1/comments/${id}/likes`,
    );
    return response.data.result;
  },
};
