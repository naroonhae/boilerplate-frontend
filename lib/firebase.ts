import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { getMessaging, getToken, Messaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let messaging: Messaging | null = null;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const initializeMessaging = (): Messaging | null => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    if (!messaging) {
      messaging = getMessaging(app);
    }
    return messaging;
  }
  return null;
};

export const requestNotificationPermission = async (): Promise<string | null> => {
  try {
    // 이미 권한이 부여되었는지 확인
    if (Notification.permission === 'granted') {
      const messagingInstance = initializeMessaging();
      if (messagingInstance) {
        const token = await getToken(messagingInstance, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });
        return token;
      }
    }

    // 권한이 거부되지 않은 경우에만 요청
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      console.log('알림 권한 상태:', permission);

      if (permission === 'granted') {
        const messagingInstance = initializeMessaging();
        if (messagingInstance) {
          const token = await getToken(messagingInstance, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });
          console.log('FCM 토큰 발급 성공');
          return token;
        }
      } else if (permission === 'denied') {
        console.warn('사용자가 알림 권한을 거부했습니다. 브라우저 설정에서 권한을 허용해주세요.');
      }
    } else {
      console.warn('알림 권한이 차단되어 있습니다. 브라우저 설정에서 권한을 허용해주세요.');
    }

    return null;
  } catch (error) {
    console.error('알림 권한 요청 실패:', error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    const messagingInstance = initializeMessaging();
    if (messagingInstance) {
      onMessage(messagingInstance, (payload) => {
        resolve(payload);
      });
    }
  });

export const checkNotificationPermission = (): NotificationPermission => {
  return Notification.permission;
};

export const isNotificationSupported = (): boolean => {
  return 'Notification' in window && 'serviceWorker' in navigator;
};

export { app, messaging };
