import { cookies } from 'next/headers';

// [중요] 서버 내부 통신용 주소 (Docker라면 서비스명, 로컬이라면 localhost:8080)
const BASE_URL = process.env.INTERNAL_API_URL || 'http://localhost:8080';

// 토큰 재발급 함수
const reissueToken = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('X-REFRESH-TOKEN')?.value;

    if (!refreshToken) {
      console.error('Refresh token not found');
      return null;
    }

    const response = await fetch(`${BASE_URL}/auth-service/api/v1/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Token reissue failed:', response.status);
      return null;
    }

    const data = await response.json();
    const newAccessToken = data.data;

    // 새로운 액세스 토큰을 쿠키에 저장
    (await cookies()).set('X-ACCESS-TOKEN', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return newAccessToken;
  } catch (error) {
    console.error('Token reissue error:', error);
    return null;
  }
};

export const serverApi = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const cookieStore = await cookies();

  // 1. 브라우저가 보내준 쿠키 꾸러미에서 accessToken을 꺼냄
  const accessToken = cookieStore.get('X-ACCESS-TOKEN')?.value;
  console.log('ACCESS', accessToken);

  // 2. 헤더 구성 (마치 미들웨어가 해주던 것처럼 직접 Bearer 토큰 주입)
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options.headers,
  };

  // 3. 백엔드로 직통 요청
  // path는 '/auth-service/api/v1/...' 처럼 서비스 경로 포함
  let response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    cache: 'no-store', // SSR (항상 최신 데이터)
  });

  // 4. 401 응답 처리 - 토큰 재발급 시도
  if (response.status === 401) {
    console.log('401 Unauthorized - Attempting token reissue');
    const newAccessToken = await reissueToken();

    if (newAccessToken) {
      // 새로운 토큰으로 재요청
      const retryHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${newAccessToken}`,
        ...options.headers,
      };

      response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: retryHeaders,
        cache: 'no-store',
      });
    } else {
      // 토큰 재발급 실패 - 쿠키 삭제 및 로그아웃 처리
      (await cookies()).delete('X-ACCESS-TOKEN');
      (await cookies()).delete('X-REFRESH-TOKEN');
      throw new Error('Authentication failed: Token reissue failed');
    }
  }

  if (!response.ok) {
    // 에러 처리 (필요시 throw)
    console.error(`Server API Error: ${response.status} ${path}`);
    throw new Error(`API call failed: ${response.status}`);
  }

  const data = await response.json();
  return data.data; // ApiResponse 구조에 맞춰 리턴
};
