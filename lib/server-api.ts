import { redirect } from 'next/navigation';

const BASE_URL = process.env.INTERNAL_API_URL;

export const serverApi = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    cache: 'no-store',
  });

  if (response.status === 401) {
    console.log('401 Unauthorized - Server side cannot reissue httpOnly cookies');
    await fetch(`${BASE_URL}/auth-service/api/v1/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    redirect('/login');
  }

  if (!response.ok) {
    // 에러 처리 (필요시 throw)
    console.error(`Server API Error: ${response.status} ${path}`);
    throw new Error(`API call failed: ${response.status}`);
  }

  const data = await response.json();
  return data.data;
};
