import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: 'Unwoldam Tarot에 로그인하여 AI 타로 리딩을 시작하세요.',
  openGraph: {
    title: '로그인 | Unwoldam Tarot',
    description: 'Unwoldam Tarot에 로그인하여 AI 타로 리딩을 시작하세요.',
    url: 'https://unwoldamstudio.vercel.app/login',
  },
  robots: {
    index: false, // 로그인 페이지는 검색 엔진에서 제외
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
