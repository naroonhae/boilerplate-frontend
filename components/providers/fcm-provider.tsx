'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

import { useFCM } from '@/hooks/useFCM';
import { notificationService } from '@/services/notification.service';
import { useAuthStore } from '@/store/auth';

export default function FCMProvider({ children }: { children: React.ReactNode }) {
  const { token, notification } = useFCM();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (token) {
      // 서버에 FCM 토큰 전송
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
