import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setCookie = (name: string, value: string, days: number = 1) => {
  // 브라우저 환경인지 체크 (Next.js는 서버에서도 실행될 수 있으므로)
  if (typeof window === 'undefined') return;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;

  // path=/: 모든 페이지에서 접근 가능
  // secure: HTTPS 환경에서만 전송 (운영 환경 권장)
  document.cookie = `${name}=${value}; ${expires}; path=/; samesite=Lax`;
};

export const deleteCookie = (name: string) => {
  if (typeof window === 'undefined') return;

  // 만료 시간을 과거로 설정하여 삭제
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};

export const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};
