'use client';

import { useEffect, useRef } from 'react';

import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const hasInitialized = useRef(false);

  useEffect(() => {
    // 한 번만 실행되도록 보장
    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;

    // 현재 상태 확인
    const currentState = useAuthStore.getState();

    // 이미 hydrated 되었으면 스킵
    if (currentState.isHydrated) {
      return;
    }

    // 쿠키에서 토큰 확인 및 유저 정보 로드
    const loadUser = async () => {
      try {
        const response = await authService.me();

        if (response.success && response.data) {
          useAuthStore.getState().hydrate(response.data);
        } else {
          useAuthStore.getState().hydrate(null);
        }
      } catch {
        useAuthStore.getState().hydrate(null);
      }
    };

    loadUser();
  }, []);

  return <>{children}</>;
}
