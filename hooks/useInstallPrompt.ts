'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const useInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(() => {
    // 클라이언트 사이드에서만 확인
    if (typeof window !== 'undefined') {
      return window.matchMedia('(display-mode: standalone)').matches;
    }
    return false;
  });

  useEffect(() => {
    console.log('[useInstallPrompt] Hook mounted');
    console.log('[useInstallPrompt] Initial isInstalled:', isInstalled);

    // beforeinstallprompt 이벤트 리스너
    const handler = (e: Event) => {
      console.log('[useInstallPrompt] beforeinstallprompt event fired!');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [isInstalled]);

  // 디버깅용 useEffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('[useInstallPrompt] Status after 5 seconds:');
      console.log('  - isInstallable:', isInstallable);
      console.log('  - isInstalled:', isInstalled);
      console.log('  - has deferredPrompt:', !!deferredPrompt);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isInstallable, isInstalled, deferredPrompt]);

  const promptInstall = async () => {
    if (!deferredPrompt) {
      return false;
    }

    // 설치 프롬프트 표시
    deferredPrompt.prompt();

    // 사용자 선택 대기
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstallable(false);
      setIsInstalled(true);
    }

    // 프롬프트 초기화
    setDeferredPrompt(null);

    return outcome === 'accepted';
  };

  return {
    isInstallable, // PWA 설치가 가능한지
    isInstalled, // 이미 설치되었는지
    promptInstall, // 설치 프롬프트를 표시하는 함수
  };
};
