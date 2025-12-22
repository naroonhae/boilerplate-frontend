import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Zustand는 클라이언트 전용이라 여기서 못 씀.
  // 대신 persist로 저장한 쿠키나 localStorage 확인이 필요하지만,
  // 서버 사이드에서 localStorage 접근 불가.
  // 보통 실무에선 '쿠키'에 토큰을 담거나, 클라이언트 사이드 체크를 병행함.

  // 여기서는 간단하게 경로 보호 로직 예시만 둡니다.
  const token = request.cookies.get('token')?.value; // 쿠키 방식 사용 시

  // 로그인이 필요한 페이지들
  const protectedRoutes = ['/dashboard', '/mypage'];
  const isProtected = protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
