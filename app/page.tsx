'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';
import { LucideClipboard, LucideShieldCheck, LucideUser, ShieldCheck, Zap } from 'lucide-react';
import PageContainer from '@/components/common/page-container';
import ImageBanner from '@/components/banner/image-banner';
import ImageTextCard from '@/components/card/image-text-card';
import FeatureGrid from '@/components/grid/feature-grid';

export default function Home() {
  const { isLoggedIn, member } = useAuthStore();

  return (
    <PageContainer>
      <ImageBanner />
      <FeatureGrid
        title={'Backend'}
        description={
          '확장 가능한 클린 아키텍처를 지향하며 웹 사이트에서 자주 사용되는 필수 기능이 구현되어 있습니다.'
        }
        items={[
          {
            title: 'Auth',
            description:
              'Json Web Token 인증, 인가. 토큰 자동 갱신. Google, Kakao, Naver 등 소셜 로그인.',
            icon: LucideShieldCheck,
          },
          {
            title: 'Post',
            description: '게시글 및 댓글 CRUD',
            icon: LucideClipboard,
          },
          {
            title: 'Profile',
            description: '사용자 프로필 CRUD',
            icon: LucideUser,
          },
        ]}
      />
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
                <span>{member?.nickname}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">이메일</span>
                <span>{member?.email}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-semibold">권한</span>
                <span className="rounded px-2 py-0.5 text-xs">{member?.role}</span>
              </div>
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
            title="완벽한 인증 시스템"
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
