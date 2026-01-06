import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Member } from '@/services/auth.service';

interface AuthState {
  member: Member | null;
  isLoggedIn: boolean;

  login: (member: Member) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      member: null,
      isLoggedIn: false,

      login: (member) => set({ member: member, isLoggedIn: true }),

      logout: () => set({ member: null, isLoggedIn: false }),
    }),
    { name: 'auth-storage' }, // access token은 새로고침 유지를 위해 로컬스토리지 저장 (선택사항)
  ),
);
