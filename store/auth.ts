import { Member } from '@/services/auth.service';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  member: Member | null;
  isLoggedIn: boolean;
  isHydrated: boolean;
  login: (member: Member) => void;
  logout: () => void;
  setMember: (member: Member | null) => void;
  hydrate: (member: Member | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      member: null,
      isLoggedIn: false,
      isHydrated: false,
      login: (member) => set({ member, isLoggedIn: true, isHydrated: true }),
      logout: () => set({ member: null, isLoggedIn: false, isHydrated: true }),
      setMember: (member) => set({ member, isLoggedIn: !!member }),
      hydrate: (member) =>
        set({
          member,
          isLoggedIn: !!member,
          isHydrated: true,
        }),
    }),
    {
      name: 'auth-storage', // localStorage 키 이름
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        member: state.member,
        isLoggedIn: state.isLoggedIn,
        // isHydrated는 저장하지 않음 (항상 false로 시작)
      }),
    },
  ),
);
