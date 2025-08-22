/* =======================================
 *神戸ホットポイントグループ Layout
 * URL:src/app/layout.tsx
 * Created: 2025-08-18
 * Last updated: 2025-08-18
 * ======================================= */

import type { Metadata } from 'next';
import '@/styles/globals.scss';
import SvgDefs from '@/components/SvgDefs';
import { Noto_Sans_JP, Roboto } from 'next/font/google';
const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
});
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
});
// 実際の本番環境かどうかを判定
const isRealProduction = process.env.NEXT_PUBLIC_IS_REAL_PROD === 'true';

// 本番のみ metadataBase を設定
const metadataBase = isRealProduction
  ? new URL(process.env.NEXT_PUBLIC_METADATA_BASE || 'https://www.hpg-kobe.jp/')
  : undefined;

export const metadata: Metadata = {
  ...(isRealProduction && {
    metadataBase,
    openGraph: {
      url: metadataBase?.toString(),
      type: 'website',
      images: [
        {
          url: '/ogp.jpg',
          width: 1200,
          height: 630,
          alt: '神戸ホットポイントグループのOGP画像',
        },
      ],
    },
  }),
  title: '神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイントグループ',
  description: isRealProduction
    ? '神戸 風俗のホットポイントグループは２０年以上連続、エリアシェアＮｏ.１の三宮の風俗店（ファッションヘルス）です。神戸・三宮でトップクラスの美女達と熱いお時間をお過ごしください。'
    : undefined,
  robots: isRealProduction ? 'index, follow' : 'noindex, nofollow',
  icons: {
    icon: [
      {
        url: '/favicon/favicon-light.svg',
        media: '(prefers-color-scheme: light)',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon/favicon-light.svg',
        media: '(prefers-color-scheme: dark)',
        type: 'image/svg+xml',
      },
      // { url: '/favicon/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSans.className} ${roboto.className}`}>
      <body>
        <SvgDefs />
        {children}
      </body>
    </html>
  );
}
