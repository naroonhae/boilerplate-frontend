'use client';

import { Download } from 'lucide-react';
import Link from 'next/link';

import Logo from '@/components/common/logo';
import NavMenu from '@/components/common/nav-menu';
import UserMenu from '@/components/common/user-menu';
import { Button } from '@/components/ui/button';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { useAuthStore } from '@/store/auth';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const { isLoggedIn } = useAuthStore();
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // 초기 상태 설정
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInstall = async () => {
    if (isInstalled) {
      // 이미 설치된 경우
      alert('이미 앱이 설치되어 있습니다.');
      return;
    }

    if (!isInstallable) {
      // 설치가 불가능한 경우 (브라우저가 지원하지 않거나 조건 미충족)
      alert('이 브라우저에서는 앱 설치가 지원되지 않습니다.');
      return;
    }

    const installed = await promptInstall();
    if (installed) {
      console.log('PWA installed successfully');
    }
  };

  return (
    <header
      className={cn(
        'fixed w-full z-10 transition-all duration-300',
        isScrolled
          ? 'border-b bg-sidebar/95 backdrop-blur-sm'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container mx-auto flex h-12 items-center justify-between px-4">
        {/* 로고 영역 */}
        <div className="flex items-center gap-8">
          <Logo className="text-xl font-bold" />
        </div>

        {/* 우측 메뉴 영역 */}
        <div className="flex items-center gap-4">
          {/* 네비게이션 메뉴 */}
          <NavMenu />
          {/* PWA 설치 버튼 - 항상 표시 */}
          <Button onClick={handleInstall} variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            {isInstalled ? '설치됨' : '앱 설치'}
          </Button>
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
