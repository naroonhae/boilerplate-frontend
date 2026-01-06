import axios from '@/lib/axios';
import { ApiResponse } from '@/types/response';

interface SignupRequest {
  nickname: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  id: number;
}

export const memberService = {
  signup: async (request: SignupRequest): Promise<boolean> => {
    const response = await axios.post<ApiResponse<SignupResponse>>(
      '/server/member-service/api/v1/members',
      request,
    );
    return response.data.result == 'SUCCESS';
  },
};
