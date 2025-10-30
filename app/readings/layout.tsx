import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '내 리딩',
  description: 'AI 타로 리딩 기록을 관리하고 확인하세요. 저장된 리딩을 카테고리별, 스프레드 타입별로 필터링하고 즐겨찾기를 설정할 수 있습니다.',
  openGraph: {
    title: '내 리딩 | Unwoldam Tarot',
    description: 'AI 타로 리딩 기록을 관리하고 확인하세요.',
    url: 'https://unwoldamstudio.vercel.app/readings',
  },
};

export default function ReadingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
