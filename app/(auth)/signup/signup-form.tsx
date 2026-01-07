'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Logo from '@/components/common/logo';
import { memberService } from '@/services/member.service';
import { authService } from '@/services/auth.service';

// Zod 스키마 정의
const signupSchema = z
  .object({
    nickname: z
      .string()
      .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
      .max(10, '닉네임은 최대 10자까지 가능합니다.'),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, '올바른 이메일 형식이 아닙니다.'),
    password: z
      .string()
      .min(12, '비밀번호는 최소 12자 이상이어야 합니다.')
      .regex(/[A-Za-z]/, '비밀번호에 영문자가 포함되어야 합니다.')
      .regex(/[0-9]/, '비밀번호에 숫자가 포함되어야 합니다.')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, '비밀번호에 특수문자가 포함되어야 합니다.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const emailValue = watch('email');

  // 이메일 인증 메일 발송
  const handleSendVerificationEmail = async () => {
    // 이메일 형식 검증
    const emailSchema = z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const result = emailSchema.safeParse(emailValue);

    if (!result.success) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    setIsSendingEmail(true);
    setEmailError(null);

    try {
      const email = emailValue;
      const isVerified = await authService.verifyEmail({ email: email });
      console.log(isVerified);
      if (!isVerified) {
        setEmailError('이미 존재하는 이메일입니다.');
        setIsSendingEmail(false);
        return;
      }
      const isSuccess = await authService.sendVerifyEmail({ email: email });
      if (!isSuccess) {
        setEmailError('이메일 발송에 실패했습니다. 다시 시도해주세요.');
        setIsSendingEmail(false);
        return;
      }

      setIsEmailSent(true);
      alert('인증 메일이 발송되었습니다. 이메일을 확인해주세요.');
    } catch {
      setEmailError('이메일 발송에 실패했습니다. 다시 시도해주세요.');
      setIsEmailSent(false);
    } finally {
      setIsSendingEmail(false);
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setVerifyError('6자리 인증번호를 입력해주세요.');
      return;
    }

    setIsVerifying(true);
    setVerifyError(null);

    try {
      const isSuccess = await authService.verifyEmailCode({
        email: emailValue,
        code: verificationCode,
      });

      if (!isSuccess) {
        setVerifyError('인증번호가 올바르지 않습니다.');
        setIsVerified(false);
      } else {
        setIsVerified(true);
        alert('이메일 인증이 완료되었습니다.');
      }
    } catch {
      setVerifyError('인증에 실패했습니다. 다시 시도해주세요.');
      setIsVerified(false);
    } finally {
      setIsVerifying(false);
    }
  };

  // 폼 제출 처리
  const onSubmit = async (data: SignupFormData) => {
    // 이메일 인증 여부 체크
    if (!isVerified) {
      setVerifyError('이메일 인증을 완료해주세요.');
      return;
    }

    setIsSubmitting(true);
    const isSuccess = await memberService.signup({
      nickname: data.nickname,
      email: data.email,
      password: data.password,
    });
    if (!isSuccess) {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      setIsSubmitting(false);
      return;
    }
    alert('회원가입이 완료되었습니다.');
    setIsSubmitting(false);
    window.location.href = '/login';
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            <Logo />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="nickname">닉네임</FieldLabel>
                <Input
                  id="nickname"
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  {...register('nickname')}
                  className={errors.nickname ? 'border-red-500' : ''}
                />
                {errors.nickname && (
                  <FieldDescription className="text-red-500">
                    {errors.nickname.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">이메일</FieldLabel>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    {...register('email', {
                      onChange: () => {
                        setIsEmailSent(false);
                        setIsVerified(false);
                        setEmailError(null);
                        setVerificationCode('');
                      },
                    })}
                    className={errors.email || emailError ? 'border-red-500' : ''}
                    disabled={isVerified}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSendVerificationEmail}
                    disabled={isSendingEmail || !emailValue || isVerified}
                  >
                    {isSendingEmail ? '발송 중...' : '인증하기'}
                  </Button>
                </div>
                {errors.email && (
                  <FieldDescription className="text-red-500">
                    {errors.email.message}
                  </FieldDescription>
                )}
                {emailError && (
                  <FieldDescription className="text-red-500">{emailError}</FieldDescription>
                )}
                {isEmailSent && !errors.email && !emailError && !isVerified && (
                  <FieldDescription className="text-green-600">
                    인증 메일이 발송되었습니다. 이메일을 확인해주세요.
                  </FieldDescription>
                )}
              </Field>
              {isEmailSent && (
                <Field>
                  <FieldLabel htmlFor="verification-code">인증번호</FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      id="verification-code"
                      type="text"
                      placeholder="6자리 인증번호"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => {
                        setVerificationCode(e.target.value);
                        setVerifyError(null);
                      }}
                      className={verifyError ? 'border-red-500' : ''}
                      disabled={isVerified}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleVerifyCode}
                      disabled={isVerified}
                    >
                      {isVerifying ? '확인 중...' : '확인'}
                    </Button>
                  </div>
                  {verifyError && (
                    <FieldDescription className="text-red-500">{verifyError}</FieldDescription>
                  )}
                </Field>
              )}
              {isVerified && (
                <Field>
                  <FieldDescription className="text-green-600">
                    ✓ 이메일 인증이 완료되었습니다.
                  </FieldDescription>
                </Field>
              )}
              <Field>
                <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  autoComplete="new-password"
                  {...register('password')}
                  className={errors.password ? 'border-red-500' : ''}
                />
                <FieldDescription>
                  최소 12자 이상, 영문과 숫자, 특수문자를 포함해야 합니다.
                </FieldDescription>
                {errors.password && (
                  <FieldDescription className="text-red-500">
                    {errors.password.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">비밀번호 확인</FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="비밀번호를 다시 입력해주세요"
                  autoComplete="new-password"
                  {...register('confirmPassword')}
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                {errors.confirmPassword && (
                  <FieldDescription className="text-red-500">
                    {errors.confirmPassword.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  회원가입
                </Button>
                <FieldDescription className="text-center">
                  이미 계정이 있으신가요?{' '}
                  <Link href="/login" className="underline">
                    로그인
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
