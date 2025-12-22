import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'; // [1] InternalAxiosRequestConfig 가져오기
import { useAuthStore } from '@/store/auth';
import { ApiResponse } from '@/types/response';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// [2] Axios의 설정 타입을 상속받아서 _retry 속성을 추가한 커스텀 타입 정의
interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const instance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomRequestConfig;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // [변경 핵심]
        // refreshToken을 바디에 담을 필요 없음! (쿠키가 자동으로 감)
        const { data } = await axios.post<ApiResponse<string>>(
          `${baseURL}/auth-service/api/v1/reissue`,
          {}, // 바디 비움
          { withCredentials: true }, // 쿠키 전송 필수
        );

        // 서버는 AccessToken만 JSON으로 줌
        const newAccessToken = data.data;

        // 스토어 업데이트
        useAuthStore.getState().setAccessToken(newAccessToken);

        // 헤더 업데이트 및 재요청
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // 재발급 실패 시 (쿠키 만료 등) -> 로그아웃
        useAuthStore.getState().logout();
        await axios.post(`${baseURL}/auth-service/api/v1/logout`, {}, { withCredentials: true });

        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
