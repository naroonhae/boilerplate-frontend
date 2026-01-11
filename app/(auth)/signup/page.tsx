'use client';

import { SignupForm } from '@/app/(auth)/signup/signup-form';
import Logo from '@/components/common/logo';

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Logo className="flex items-center gap-2 self-center font-medium" />
        <SignupForm />
      </div>
    </div>
  );
}
