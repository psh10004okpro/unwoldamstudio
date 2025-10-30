import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://unwoldamstudio.vercel.app';

  // 정적 페이지들
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/cards`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/readings`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/readings/new`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // 타로 카드 name_short 목록 (78장)
  const cardNameShorts = [
    // Major Arcana (0-21)
    'ar00', 'ar01', 'ar02', 'ar03', 'ar04', 'ar05', 'ar06', 'ar07', 'ar08', 'ar09',
    'ar10', 'ar11', 'ar12', 'ar13', 'ar14', 'ar15', 'ar16', 'ar17', 'ar18', 'ar19',
    'ar20', 'ar21',
    // Cups
    'cuac', 'cu02', 'cu03', 'cu04', 'cu05', 'cu06', 'cu07', 'cu08', 'cu09', 'cu10',
    'cupa', 'cukn', 'cuqu', 'cuki',
    // Wands
    'waac', 'wa02', 'wa03', 'wa04', 'wa05', 'wa06', 'wa07', 'wa08', 'wa09', 'wa10',
    'wapa', 'wakn', 'waqu', 'waki',
    // Swords
    'swac', 'sw02', 'sw03', 'sw04', 'sw05', 'sw06', 'sw07', 'sw08', 'sw09', 'sw10',
    'swpa', 'swkn', 'swqu', 'swki',
    // Pentacles
    'peac', 'pe02', 'pe03', 'pe04', 'pe05', 'pe06', 'pe07', 'pe08', 'pe09', 'pe10',
    'pepa', 'pekn', 'pequ', 'peki',
  ];

  // 각 카드 페이지를 sitemap에 추가
  const cardRoutes = cardNameShorts.map((nameShort) => ({
    url: `${baseUrl}/cards/${nameShort}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...cardRoutes];
}
