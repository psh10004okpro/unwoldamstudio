import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/readings/[id]'], // 개인 리딩은 검색 엔진에서 제외
      },
    ],
    sitemap: 'https://unwoldamstudio.vercel.app/sitemap.xml',
  };
}
