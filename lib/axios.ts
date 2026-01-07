import axios, { AxiosError } from 'axios'; // [1] InternalAxiosRequestConfig 가져오기
import { useAuthStore } from '@/store/auth';
import { REFRESH_TOKEN_KEY } from '@/constants/constants';

const instance = axios.create({
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const refreshToken = await cookieStore.get(REFRESH_TOKEN_KEY);
    if (error.response?.status === 401 && refreshToken) {
      cookieStore.delete('isLoggedIn');
      useAuthStore.getState().logout();

      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

export default instance;
