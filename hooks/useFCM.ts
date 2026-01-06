import { useEffect, useState, useCallback } from 'react';
import {
  requestNotificationPermission,
  onMessageListener,
  checkNotificationPermission,
  isNotificationSupported,
} from '@/lib/firebase';

interface NotificationPayload {
  notification?: {
    title?: string;
    body?: string;
    image?: string;
  };
  data?: Record<string, string>;
}

export const useFCM = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationPayload | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>(() =>
    typeof window !== 'undefined' && isNotificationSupported()
      ? checkNotificationPermission()
      : 'default'
  );
  const [isSupported] = useState(() =>
    typeof window !== 'undefined' ? isNotificationSupported() : false
  );

  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      console.error('이 브라우저는 알림을 지원하지 않습니다.');
      return null;
    }

    const fcmToken = await requestNotificationPermission();
    if (fcmToken) {
      setToken(fcmToken);
      setPermission('granted');
      console.log('FCM 토큰:', fcmToken);
      return fcmToken;
    } else {
      setPermission(checkNotificationPermission());
      return null;
    }
  }, [isSupported]);

  useEffect(() => {
    const initServiceWorker = async () => {
      try {
        if ('serviceWorker' in navigator) {
          await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          console.log('Service Worker 등록 완료');

          // 자동으로 권한 요청
          await requestPermission();
        }
      } catch (error) {
        console.error('Service Worker 등록 실패:', error);
      }
    };

    if (isSupported) {
      initServiceWorker();
    }
  }, [isSupported, requestPermission]);

  useEffect(() => {
    if (!isSupported) return;

    onMessageListener()
      .then((payload) => {
        setNotification(payload as NotificationPayload);
        console.log('포그라운드 메시지 수신:', payload);
      })
      .catch((err) => console.error('메시지 수신 실패:', err));
  }, [isSupported]);

  return {
    token,
    notification,
    permission,
    isSupported,
    requestPermission,
  };
};
