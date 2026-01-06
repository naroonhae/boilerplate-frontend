import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'; // [1] InternalAxiosRequestConfig 가져오기
import { useAuthStore } from '@/store/auth';

// [2] Axios의 설정 타입을 상속받아서 _retry 속성을 추가한 커스텀 타입 정의
interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const instance = axios.create({
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const authApi = axios.create({
  baseURL: '',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const handleUnauthorized = () => {
  useAuthStore.getState().logout();
  window.location.href = '/login'; // 강제 이동
};

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomRequestConfig;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      useAuthStore.getState().isLoggedIn
    ) {
      originalRequest._retry = true;
      try {
        // 1. Reissue 호출
        // 백엔드가 알아서 Set-Cookie로 새 Access/Refresh 토큰을 갱신해줌
        await authApi.post('/server/auth-service/api/v1/reissue', {}, { withCredentials: true });

        // 2. 프론트엔드는 아무것도 "저장"할 필요 없음 (쿠키가 갱신됐으니까)

        // 3. 재요청 (변경된 쿠키가 자동으로 실려감 -> 미들웨어가 헤더로 변환)
        return instance(originalRequest);
      } catch (error) {
        await authApi.post('/server/auth-service/api/v1/logout', {}, { withCredentials: true });
        handleUnauthorized();
        return Promise.reject(error);
      }
    }
    handleUnauthorized();
    return Promise.reject(error);
  },
);

export default instance;
