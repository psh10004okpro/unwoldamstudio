import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WebsiteSchema, OrganizationSchema, WebApplicationSchema } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL('https://unwoldamstudio.vercel.app'),
  title: {
    default: 'Unwoldam Tarot - AI 타로 리딩',
    template: '%s | Unwoldam Tarot'
  },
  description: 'AI 기반 타로 리딩 서비스로 당신의 질문에 대한 통찰을 제공합니다. 78장의 타로 카드와 함께 원카드, 쓰리카드, 켈틱크로스 스프레드를 경험하세요.',
  keywords: ['타로', '타로카드', 'AI 타로', '타로 리딩', '온라인 타로', '무료 타로', '타로 점', '타로 해석', 'Tarot', 'Tarot Reading'],
  authors: [{ name: 'Unwoldam Studio' }],
  creator: 'Unwoldam Studio',
  publisher: 'Unwoldam Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://unwoldamstudio.vercel.app',
    siteName: 'Unwoldam Tarot',
    title: 'Unwoldam Tarot - AI 타로 리딩',
    description: 'AI 기반 타로 리딩 서비스로 당신의 질문에 대한 통찰을 제공합니다.',
  },
  twitter: {
    card: 'summary',
    title: 'Unwoldam Tarot - AI 타로 리딩',
    description: 'AI 기반 타로 리딩 서비스로 당신의 질문에 대한 통찰을 제공합니다.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // 나중에 Google Search Console에서 받은 코드로 교체
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        <WebsiteSchema />
        <OrganizationSchema />
        <WebApplicationSchema />
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
