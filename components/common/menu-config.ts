import { User, Settings, LogOut, LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
  showSeparatorAfter?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  requireAuth?: boolean;
}

export interface MenuConfig {
  navItems: NavItem[];
  userMenuItems: Omit<MenuItem, 'onClick'>[];
}

export const menuConfig: MenuConfig = {
  // 헤더 네비게이션 메뉴
  navItems: [
    {
      id: 'about',
      label: '소개',
      href: '/about',
    },
    {
      id: 'docs',
      label: '문서',
      href: '/docs',
      requireAuth: true,
    },
  ],

  // 유저 드롭다운 메뉴
  userMenuItems: [
    {
      id: 'profile',
      label: '내 정보',
      icon: User,
    },
    {
      id: 'settings',
      label: '설정',
      icon: Settings,
      showSeparatorAfter: true,
    },
    {
      id: 'logout',
      label: '로그아웃',
      icon: LogOut,
      className: 'text-red-600',
    },
  ],
};
