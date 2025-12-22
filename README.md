# Boilerplate Frontend

Next.js 기반의 모던 웹 애플리케이션 보일러플레이트입니다.

## 기술 스택

### 핵심 프레임워크

- **Next.js 16.1.0** - React 프레임워크 (App Router)
- **React 19.2.3** - UI 라이브러리
- **TypeScript 5** - 타입 안정성

### 상태 관리 & 데이터 페칭

- **Zustand 5.0.9** - 경량 상태 관리
- **TanStack Query 5.90.12** - 서버 상태 관리 및 데이터 페칭
- **Axios 1.13.2** - HTTP 클라이언트

### UI & 스타일링

- **Tailwind CSS 4** - 유틸리티 기반 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 UI 컴포넌트 (New York 스타일)
- **Radix UI** - 접근성이 뛰어난 헤드리스 UI 컴포넌트
- **Lucide React** - 아이콘 라이브러리
- **next-themes** - 다크 모드 지원

### 폼 & 검증

- **React Hook Form 7.69.0** - 성능 최적화된 폼 관리
- **Zod 4.2.1** - TypeScript 기반 스키마 검증
- **@hookform/resolvers** - React Hook Form + Zod 통합

### 기타

- **Sonner** - 토스트 알림
- **class-variance-authority** - 타입 안전 CSS 클래스 관리
- **clsx & tailwind-merge** - 조건부 클래스 네이밍

## 프로젝트 구조

```
boilerplate-frontend/
├── app/                      # Next.js App Router
│   ├── (auth)/              # 인증 관련 라우트 그룹
│   ├── auth/                # 인증 API 엔드포인트
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈 페이지
│   └── globals.css          # 전역 스타일
├── components/              # React 컴포넌트
│   ├── banner/             # 배너 컴포넌트
│   ├── card/               # 카드 컴포넌트
│   ├── common/             # 공통 컴포넌트
│   ├── providers/          # Context Providers
│   └── ui/                 # shadcn/ui 컴포넌트
├── hooks/                   # 커스텀 React 훅
├── lib/                     # 유틸리티 함수
├── services/                # API 서비스 레이어
│   └── auth.service.ts     # 인증 서비스
├── store/                   # Zustand 스토어
│   └── auth.ts             # 인증 상태 관리
├── types/                   # TypeScript 타입 정의
└── public/                  # 정적 파일
```

## 시작하기

### 필수 요구사항

- Node.js 20 이상
- npm, yarn, pnpm 또는 bun

### 설치

```bash
npm install
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 필요한 환경 변수를 설정하세요:

```env
# API 엔드포인트
NEXT_PUBLIC_API_URL=your_api_url
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 서버 실행

```bash
npm start
```

### 린트

```bash
npm run lint
```

## 주요 기능

- ✅ **인증 시스템** - 로그인/회원가입 구현
- ✅ **다크 모드** - next-themes를 활용한 테마 전환
- ✅ **반응형 디자인** - 모바일 우선 디자인
- ✅ **타입 안전성** - TypeScript를 활용한 타입 체크
- ✅ **폼 검증** - React Hook Form + Zod
- ✅ **상태 관리** - Zustand + TanStack Query
- ✅ **코드 품질** - ESLint + Prettier

## 개발 가이드

### shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add [component-name]
```

### 새로운 페이지 추가

`app` 디렉토리에 새 폴더를 만들고 `page.tsx` 파일을 추가하세요.

### API 서비스 추가

`services` 디렉토리에 새 서비스 파일을 생성하고 axios 인스턴스를 사용하세요.

## 배포

### Vercel (권장)

가장 쉬운 배포 방법은 Next.js 제작사인 Vercel을 사용하는 것입니다.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

자세한 내용은 [Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying)를 참조하세요.

## 참고 자료

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
