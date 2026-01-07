'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login: setUser } = useAuthStore();

  useEffect(() => {
    async function exchangeCode(code: string) {
      await authService.exchange(code);
      const response = await authService.me();
      if (!response.success) {
        alert('유저 정보 로드 실패');
        return;
      }
      const userData = response.data;
      setUser(userData);
      router.push('/');
    }
    const code = searchParams.get('code');
    if (code) {
      exchangeCode(code);
    }
  }, [searchParams, router, setUser]); // 의존성 배열

  return <div>로그인 처리 중...</div>;
}
