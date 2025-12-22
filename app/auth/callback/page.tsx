'use client';

import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAccessToken, setUser } = useAuthStore();

  useEffect(() => {
    async function exchangeCode(code: string) {
      const accessToken = await authService.exchange(code);
      setAccessToken(accessToken);
      const userData = await authService.me();
      setUser(userData);
      router.push('/');
    }
    const code = searchParams.get('code');
    if (code) {
      exchangeCode(code);
    }
  }, [searchParams, router, setAccessToken, setUser]); // 의존성 배열

  return <div>로그인 처리 중...</div>;
}
