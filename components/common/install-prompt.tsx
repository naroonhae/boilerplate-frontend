'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    console.log('InstallPrompt component mounted');

    // 이미 설치했는지 확인
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    console.log('Is already installed?', isInstalled);
    if (isInstalled) {
      return;
    }

    // 이전에 닫았는지 확인
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    console.log('Was dismissed before?', dismissed);
    if (dismissed) {
      return;
    }

    // beforeinstallprompt 이벤트 리스너
    const handler = (e: Event) => {
      console.log('beforeinstallprompt event fired!', e);
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // 5초 후에도 이벤트가 안 왔다면 로그 출력
    const timeout = setTimeout(() => {
      console.log('beforeinstallprompt event did not fire after 5 seconds');
      console.log('This usually means:');
      console.log('1. PWA is already installed');
      console.log('2. PWA installation criteria are not met');
      console.log('3. Browser does not support PWA installation');
    }, 5000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timeout);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // 설치 프롬프트 표시
    deferredPrompt.prompt();

    // 사용자 선택 대기
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);

    // 프롬프트 초기화
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 p-4 shadow-lg sm:left-auto sm:right-4 sm:w-96">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">앱으로 설치하기</h3>
          <p className="text-sm text-muted-foreground mt-1">
            홈 화면에 추가하여 더 빠르고 편리하게 이용하세요
          </p>
          <div className="flex gap-2 mt-3">
            <Button onClick={handleInstall} size="sm" className="flex-1">
              설치
            </Button>
            <Button onClick={handleDismiss} variant="outline" size="sm">
              나중에
            </Button>
          </div>
        </div>
        <Button onClick={handleDismiss} variant="ghost" size="icon" className="shrink-0 h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
