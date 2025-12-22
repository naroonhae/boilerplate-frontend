'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { menuConfig } from './menu-config';
import { useAuthStore } from '@/store/auth';
import { Button } from '../ui/button';

export default function NavMenu() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuthStore();

  // 로그인 상태에 따라 메뉴 필터링
  const visibleNavItems = menuConfig.navItems.filter((item) => {
    // requireAuth가 true인 경우, 로그인된 사용자만 볼 수 있음
    if (item.requireAuth) {
      return isLoggedIn;
    }
    return true;
  });

  return (
    <nav className="flex items-center gap-2">
      {visibleNavItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              'flex items-center gap-2 text-sm font-medium transition-colors hover:text-slate-900',
              isActive ? 'text-slate-900' : 'text-slate-600',
            )}
          >
            <Button variant={'ghost'}>{item.label}</Button>
          </Link>
        );
      })}
    </nav>
  );
}
