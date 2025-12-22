import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/services/auth.service';

interface AuthState {
  accessToken: string | null;
  // refreshToken: string | null; // [삭제] 쿠키로 관리되므로 스토어에서 제거
  user: User | null;
  isLoggedIn: boolean;

  setAccessToken: (token: string) => void; // 이름 변경 (setTokens -> setAccessToken)
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isLoggedIn: false,

      // 이제 Access Token만 받습니다.
      setAccessToken: (accessToken) => set({ accessToken, isLoggedIn: true }),

      setUser: (user) => set({ user }),

      logout: () => set({ accessToken: null, user: null, isLoggedIn: false }),
    }),
    { name: 'auth-storage' }, // access token은 새로고침 유지를 위해 로컬스토리지 저장 (선택사항)
  ),
);
