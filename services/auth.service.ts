import axios from '@/lib/axios'; // 우리가 만든 axios 인스턴스
import { ApiResponse } from '@/types/response';

export interface Member {
  email: string;
  nickname: string;
  role: string;
  status: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

interface VerifyEmailRequest {
  email: string;
}
interface SendVerifyEmailRequest {
  email: string;
}

interface VerifyEmailCodeRequest {
  email: string;
  code: string;
}

export const authService = {
  login: async (data: LoginRequest): Promise<string> => {
    const response = await axios.post<ApiResponse<string>>(
      '/server/auth-service/api/v1/login',
      data,
    );
    return response.data.data;
  },
  me: async (): Promise<ApiResponse<Member>> => {
    const response = await axios.get<ApiResponse<Member>>(
      '/server/member-service/api/v1/members/me',
    );
    return response.data;
  },
  exchange: async (code: string): Promise<string> => {
    const response = await axios.post<ApiResponse<string>>(
      `/server/auth-service/api/v1/exchange?code=${code}`,
    );
    return response.data.data;
  },
  verifyEmail: async (request: VerifyEmailRequest): Promise<boolean> => {
    const response = await axios.post<ApiResponse<boolean>>(
      `/server/auth-service/api/v1/verify-email`,
      request,
    );
    return response.data.data;
  },
  sendVerifyEmail: async (request: SendVerifyEmailRequest): Promise<boolean> => {
    const response = await axios.post<ApiResponse<null>>(
      `/server/auth-service/api/v1/send-verification-email`,
      request,
    );
    return response.data.result == 'SUCCESS';
  },
  verifyEmailCode: async (request: VerifyEmailCodeRequest): Promise<boolean> => {
    const response = await axios.post<ApiResponse<boolean>>(
      `/server/auth-service/api/v1/verify-email-code`,
      request,
    );
    return response.data.data;
  },
  // 나중에 추가될 API들...
  // getMe: async () => { ... }
};
