import { cn } from '@/lib/utils';

interface PageContainerProps {
  children?: React.ReactNode;
  className?: string;
  noPadding?: boolean; // 특정 페이지에서 padding을 제거하고 싶을 때
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'; // 컨테이너 최대 너비
  banner?: React.ReactNode; // 배너 컴포넌트 (좌우 가득 차게 표시)
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
  banner,
}: PageContainerProps) {
  return (
    <div className="w-full relative">
      {/* 배경 그라데이션 */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* 좌측 상단 - 큰 보라색 원 */}
        <div className="absolute -top-[50%] -left-[25%] w-250 h-250 bg-primary/30 rounded-full blur-[180px]" />
        {/* 우측 하단 - 큰 accent 원 */}
        <div className="absolute -bottom-[50%] -right-[25%] w-300 h-300 bg-accent/30 rounded-full blur-[180px]" />
      </div>

      {/* 배너: 좌우 가득 차게 표시 */}
      {banner && <div className="w-full">{banner}</div>}

      {/* 메인 콘텐츠: 기존 레이아웃 유지 */}
      {children ? (
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
      ) : (
        ''
      )}
    </div>
  );
}
