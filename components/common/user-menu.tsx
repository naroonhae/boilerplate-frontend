'use client';

import { useRouter } from 'next/navigation';

import { menuConfig } from '@/components/common/menu-config';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth';

export default function UserMenu() {
  const router = useRouter();
  const { member, logout } = useAuthStore();

  // 메뉴 아이템별 액션 핸들러
  const menuHandlers: Record<string, () => void> = {
    profile: () => alert('마이페이지 준비중'),
    settings: () => alert('설정 준비중'),
    logout: () => {
      authService.logout();
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
