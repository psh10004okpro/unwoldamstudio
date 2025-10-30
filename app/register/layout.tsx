import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입',
  description: '무료로 가입하고 AI 타로 리딩을 경험해보세요. 78장의 타로 카드와 다양한 스프레드로 당신의 질문에 대한 통찰을 얻으세요.',
  openGraph: {
    title: '회원가입 | Unwoldam Tarot',
    description: '무료로 가입하고 AI 타로 리딩을 경험해보세요.',
    url: 'https://unwoldamstudio.vercel.app/register',
  },
  robots: {
    index: false, // 회원가입 페이지는 검색 엔진에서 제외
    follow: true,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
