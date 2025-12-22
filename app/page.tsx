'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';
import { ShieldCheck, Zap } from 'lucide-react';
import PageContainer from '@/components/common/page-container';
import ImageBanner from '@/components/banner/image-banner';
import ImageTextCard from '@/components/card/image-text-card';

export default function Home() {
  const { isLoggedIn, user, accessToken } = useAuthStore();

  return (
    <PageContainer>
      <ImageBanner />

      {isLoggedIn ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>내 정보</CardTitle>
              <CardDescription>현재 로그인된 사용자 정보입니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">이름</span>
                <span>{user?.nickname}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">이메일</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-semibold">권한</span>
                <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                  {user?.role}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>인증 상태</CardTitle>
              <CardDescription>Access Token 정보입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded bg-slate-100 p-3">
                <p className="break-all text-xs text-slate-500 line-clamp-4">
                  {accessToken || '토큰 없음'}
                </p>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                * 실제 운영 시에는 이 카드를 숨기세요.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>빠른 작업</CardTitle>
              <CardDescription>자주 사용하는 메뉴입니다.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button variant="outline" className="justify-start">
                <Zap className="mr-2 h-4 w-4" /> 게시글 작성하기
              </Button>
              <Button variant="outline" className="justify-start">
                <ShieldCheck className="mr-2 h-4 w-4" /> 관리자 페이지 이동
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <ImageTextCard
            image="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1160"
            title="Next.js 템플릿"
            description="Next.js 14, TypeScript, Tailwind CSS, Shadcn UI, React Query, Zod 등 최신 기술 스택으로 구성된 풀스택 템플릿입니다."
          />
          <ImageTextCard
            image="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1160"
            title="개발 생산성 향상"
            description="클린 아키텍처 기반의 프로젝트 구조와 재사용 가능한 컴포넌트로 개발 속도를 높여줍니다."
          />
          <ImageTextCard
            image="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1160"
            title="개완벽한 인증 시스템"
            description="JWT, Refresh Token Rotation, 보안 로그인까지 모두 구현되어 있습니다."
          />
          <ImageTextCard
            image="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1160"
            title="초고속 개발 환경"
            description="Next.js App Router와 React Query로 생산성을 극대화하세요."
          />
          <ImageTextCard
            image="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1160"
            title="타입 안정성"
            description="Backend부터 Frontend까지 TypeScript로 안전하게 개발하세요."
          />
        </div>
      )}
    </PageContainer>
  );
}
