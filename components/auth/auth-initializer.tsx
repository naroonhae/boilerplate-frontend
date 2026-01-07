// src/components/auth/auth-initializer.tsx
'use client';

import { useRef } from 'react';

import { Member } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth';

export default function AuthInitializer({ member }: { member: Member | null }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useAuthStore.setState({ member, isLoggedIn: !!member });
    initialized.current = true;
  }

  return null;
}
