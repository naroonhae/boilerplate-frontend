import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  let accessToken = request.cookies.get('X-ACCESS-TOKEN')?.value;
  const refreshToken = request.cookies.get('X-REFRESH-TOKEN')?.value;

  // 2. 액세스 토큰은 없는데 리프레시 토큰은 있다면? -> 재발급 시도
  if (!accessToken && refreshToken) {
    try {
      // 백엔드로 재발급 요청 (fetch 사용)
      const res = await fetch('http://localhost:8080/auth-service/api/v1/reissue', {
        method: 'POST',
        headers: {
          // 리프레시 토큰 쿠키를 그대로 전달
          Cookie: `X-REFRESH-TOKEN=${refreshToken}`,
        },
      });

      if (res.ok) {
        // 백엔드가 Set-Cookie 헤더를 줬다면 그걸 파싱하거나, Body에서 꺼냄
        const data = await res.json();
        const response = data.data;
        accessToken = response.accessToken;
      }
    } catch (e) {
      console.error('Middleware Reissue Failed', e);
    }
  }

  // 2. 헤더 조작을 위한 객체 생성
  const requestHeaders = new Headers(request.headers);

  // 3. 토큰이 있다면 Authorization 헤더 추가 (Backend가 알아먹게 변환)
  if (accessToken) {
    requestHeaders.set('Authorization', `Bearer ${accessToken}`);
  }

  // 로그인이 필요한 페이지들
  const protectedRoutes = ['/dashboard', '/mypage'];
  const isProtected = protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. 변경된 헤더를 가지고 요청 계속 진행
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // [추가] 만약 백엔드에서 온 응답 헤더에 'Set-Cookie'가 있고, 거기에 'refreshToken'이 포함되어 있다면?
  // (즉, 로그인이나 Reissue가 성공해서 토큰이 구워진 상황)
  const setCookieHeader = response.headers.get('set-cookie');

  if (setCookieHeader && setCookieHeader.includes('refreshToken')) {
    // 자바스크립트가 읽을 수 있는 'isLoggedIn' 쿠키를 추가로 구워줌
    response.cookies.set('isLoggedIn', 'true', {
      path: '/',
      httpOnly: false, // [핵심] JS에서 읽을 수 있어야 함
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 14, // 적당히 길게 (Refresh Token 수명과 맞추면 좋음)
    });
  }

  // [추가] 로그아웃 감지: refreshToken이 삭제되는 경우 (Max-Age=0 등)
  if (
    (setCookieHeader && setCookieHeader.includes('refreshToken=;')) ||
    request.nextUrl.pathname === '/auth-service/api/v1/logout'
  ) {
    response.cookies.delete('isLoggedIn');
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
