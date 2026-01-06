'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/auth';
import { menuConfig } from './menu-config';

export default function UserMenu() {
  const router = useRouter();
  const { member, logout } = useAuthStore();

  // 메뉴 아이템별 액션 핸들러
  const menuHandlers: Record<string, () => void> = {
    profile: () => alert('마이페이지 준비중'),
    settings: () => alert('설정 준비중'),
    logout: () => {
      // 1. (선택) 백엔드 로그아웃 API 호출 (authService.logout())
      // 2. 스토어 초기화
      logout();
      alert('로그아웃 되었습니다.');
      router.push('/login');
    },
  };

  if (!member) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {/* 이미지가 없으면 이름 앞글자로 대체 */}
            <AvatarImage src="" alt={member.nickname} />
            <AvatarFallback>{member.nickname.substring(0, 1)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{member.nickname}</p>
            <p className="text-xs leading-none text-muted-foreground">{member.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuConfig.userMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id}>
              <DropdownMenuItem onClick={menuHandlers[item.id]} className={item.className}>
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </DropdownMenuItem>
              {item.showSeparatorAfter && <DropdownMenuSeparator />}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
