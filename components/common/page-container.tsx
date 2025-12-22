import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean; // 특정 페이지에서 padding을 제거하고 싶을 때
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'; // 컨테이너 최대 너비
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

export default function PageContainer({
  children,
  className,
  noPadding = false,
  maxWidth = 'xl',
}: PageContainerProps) {
  return (
    <main
      className={cn(
        'mx-auto w-full',
        maxWidthClasses[maxWidth],
        noPadding ? '' : 'px-4 pt-12',
        className,
      )}
    >
      {children}
    </main>
  );
}
