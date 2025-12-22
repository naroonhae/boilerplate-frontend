import axios from '@/lib/axios'; // 우리가 만든 axios 인스턴스
import { ApiResponse } from '@/types/response';

export interface User {
  email: string;
  nickname: string;
  role: string;
  status: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authService = {
  login: async (data: LoginRequest): Promise<string> => {
    const response = await axios.post<ApiResponse<string>>('/auth-service/api/v1/login', data);
    return response.data.data;
  },
  me: async (): Promise<User> => {
    const response = await axios.get<ApiResponse<User>>('/member-service/api/v1/members/me');
    return response.data.data;
  },
  exchange: async (code: string): Promise<string> => {
    const response = await axios.post<ApiResponse<string>>(
      `/auth-service/api/v1/exchange?code=${code}`,
    );
    return response.data.data;
  },
  // 나중에 추가될 API들...
  // getMe: async () => { ... }
};
