import { jwtDecode } from 'jwt-decode';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ACCESS_TOKEN_KEY, API_URL, REFRESH_TOKEN_KEY } from '@/constants/constants';
import { extractCookieValue } from '@/lib/utils';

const REFRESH_THRESHOLD = 5 * 60; // 5분
const PROTECTED_ROUTES = ['/mypage', '/settings', '/write'];

interface JwtPayload {
  exp: number;
}
export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_KEY)?.value;
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  if (isProtected && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  let shouldRefresh = false;

  if (accessToken) {
    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);

      const expires = decoded.exp;
      const now = Math.floor(Date.now() / 1000);

      if (expires - now < REFRESH_THRESHOLD) {
        shouldRefresh = true;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      shouldRefresh = true;
    }
  } else if (refreshToken) {
    shouldRefresh = true;
  }

  if (shouldRefresh && refreshToken) {
    try {
      const res = await fetch(`${API_URL}/auth-service/api/v1/reissue`, {
        method: 'POST',
        headers: { Cookie: `${REFRESH_TOKEN_KEY}=${refreshToken}` },
      });
      const newAccessToken = extractCookieValue(res, ACCESS_TOKEN_KEY);
      const newRefreshToken = extractCookieValue(res, REFRESH_TOKEN_KEY);

      if (res.ok && newAccessToken && newRefreshToken) {
        // 갱신된 토큰으로 헤더 교체 (이번 요청용)
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('Authorization', `Bearer ${newAccessToken}`);

        // 다음 단계(Page)로 진행
        const response = NextResponse.next({
          request: { headers: requestHeaders },
        });

        // 브라우저 쿠키도 갱신 (다음 요청용)
        response.cookies.set(ACCESS_TOKEN_KEY, newAccessToken, {
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        });
        response.cookies.set(REFRESH_TOKEN_KEY, newRefreshToken, {
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        });

        return response;
      }
    } catch (e) {
      console.error('Middleware Reissue Failed', e);
    }
  }
  const requestHeaders = new Headers(request.headers);
  if (accessToken) {
    requestHeaders.set('Authorization', `Bearer ${accessToken}`);
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
