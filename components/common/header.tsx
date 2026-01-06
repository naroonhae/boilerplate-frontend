'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';
import Logo from './logo';
import NavMenu from './nav-menu';
import UserMenu from './user-menu';

export default function Header() {
  const { isLoggedIn } = useAuthStore();

  return (
    <header className="border-b bg-sidebar fixed w-full z-10">
      <div className="container mx-auto flex h-12 items-center justify-between px-4">
        {/* 로고 영역 */}
        <div className="flex items-center gap-8">
          <Logo className="text-xl font-bold" />
        </div>

        {/* 우측 메뉴 영역 */}
        <div className="flex items-center gap-4">
          {/* 네비게이션 메뉴 */}
          <NavMenu />
          {isLoggedIn ? (
            /* 로그인 상태일 때: 유저 메뉴 */
            <UserMenu />
          ) : (
            /* 비로그인 상태일 때: 로그인/회원가입 버튼 */
            <div className="flex gap-2">
              <Link href="/login">
                <Button>로그인</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
