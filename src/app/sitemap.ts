import type { MetadataRoute } from 'next';
import { isRealProduction, metadataBase } from '@/lib/env';

export const dynamic = 'force-static';

const sitemapPaths = [
  '/',
  '/top/',
  '/hot/',
  '/hot/top/',
  '/hot/cast/',
  '/hot/news/',
  '/hot/realtime/',
  '/hot/schedule/',
  '/hot/system/',
  '/hot/weekly-schedule/',
  '/villa/',
  '/villa/top/',
  '/villa/cast/',
  '/villa/news/',
  '/villa/realtime/',
  '/villa/schedule/',
  '/villa/system/',
  '/villa/weekly-schedule/',
  '/style/',
  '/style/top/',
  '/style/cast/',
  '/style/news/',
  '/style/realtime/',
  '/style/schedule/',
  '/style/system/',
  '/style/weekly-schedule/',
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isRealProduction) {
    return [];
  }

  return sitemapPaths.map((path) => ({
    url: new URL(path, metadataBase).toString(),
    lastModified: new Date(),
  }));
}
