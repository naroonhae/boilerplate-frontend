import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Set-Cookie 헤더를 파싱하여 쿠키 정보 추출
 */
export function parseCookieHeader(setCookieHeader: string): {
  name: string;
  value: string;
  attributes: Record<string, string | boolean>;
} | null {
  const parts = setCookieHeader.split(';').map((part) => part.trim());

  const [nameValue] = parts;
  const [name, value] = nameValue.split('=');
  if (!name || !value) return null;

  const attributes: Record<string, string | boolean> = {};
  for (let i = 1; i < parts.length; i++) {
    const [key, val] = parts[i].split('=');
    if (!key) continue;
    attributes[key.toLowerCase()] = val || true;
  }

  return { name, value, attributes };
}

/**
 * Set-Cookie 헤더에서 특정 쿠키 값 추출
 */
export function extractCookieValue(response: Response, cookieName: string): string | null {
  const setCookieHeaders = response.headers.get('set-cookie');
  if (!setCookieHeaders) return null;

  // Set-Cookie 헤더는 여러 개일 수 있음
  const cookies = setCookieHeaders.split(',').map((h) => h.trim());

  for (const cookieHeader of cookies) {
    const parsed = parseCookieHeader(cookieHeader);
    if (parsed && parsed.name === cookieName) {
      return parsed.value;
    }
  }

  return null;
}
