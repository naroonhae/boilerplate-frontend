'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios'; // [1] Axios 에러 타입 추가

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { authService, LoginRequest } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.email('이메일 형식이 올바르지 않습니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

interface ErrorResponse {
  result: string;
  message: string;
  errorCode: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { setAccessToken, setUser } = useAuthStore(); // 변경된 함수 사용
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),

    onSuccess: async (accessToken) => {
      setAccessToken(accessToken);

      try {
        const userData = await authService.me();
        setUser(userData);

        alert(`환영합니다, ${userData.nickname}님!`);
        router.push('/');
      } catch (error) {
        console.error('유저 정보 로드 실패', error);
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = error.response?.data?.message || '로그인에 실패했습니다.';
      alert(errorMessage);
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    loginMutation.mutate(values);
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-100">
        <CardHeader>
          <CardTitle className="text-center text-2xl">로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="example@test.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? '로그인 중...' : '로그인'}
              </Button>

              <Link href={'http://localhost:8080/oauth2/authorization/google'}>
                <Button type="button" className="w-full">
                  Google
                </Button>
              </Link>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
