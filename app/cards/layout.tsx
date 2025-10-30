import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '타로 카드 목록',
  description: '78장의 타로 카드를 탐색하세요. 메이저 아르카나 22장과 마이너 아르카나 56장의 상세한 의미와 해석을 확인할 수 있습니다.',
  openGraph: {
    title: '타로 카드 목록 | Unwoldam Tarot',
    description: '78장의 타로 카드를 탐색하세요. 메이저 아르카나 22장과 마이너 아르카나 56장의 상세한 의미와 해석을 확인할 수 있습니다.',
    url: 'https://unwoldamstudio.vercel.app/cards',
  },
};

export default function CardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
