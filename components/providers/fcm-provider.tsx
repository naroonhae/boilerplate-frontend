'use client';

import { useFCM } from '@/hooks/useFCM';
import { notificationService } from '@/services/notification.service';
import { useAuthStore } from '@/store/auth';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function FCMProvider({ children }: { children: React.ReactNode }) {
  const { token, notification } = useFCM();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (token) {
      // 서버에 FCM 토큰 전송
      console.log('FCM 토큰을 서버에 저장:', token);
      if (isLoggedIn) {
        notificationService.setDeviceTokens({
          token: token,
          platform: 'WEB',
        });
      }
    }
  }, [token, isLoggedIn]);

  useEffect(() => {
    if (notification) {
      // 포그라운드 알림 표시
      console.log('포그라운드 알림:', notification);

      // Sonner 토스트로 표시
      if (notification.notification) {
        const url = notification.data?.url;

        toast(notification.notification.title || '새 알림', {
          description: notification.notification.body || '',
          action: url
            ? {
                label: '보기',
                onClick: () => {
                  window.location.href = url;
                },
              }
            : undefined,
          duration: 5000,
        });
      }
    }
  }, [notification]);

  return <>{children}</>;
}
