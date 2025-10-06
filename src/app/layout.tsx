/* =======================================
 *神戸ホットポイントグループ Layout
 * URL:src/app/layout.tsx
 * Created: 2025-08-18
 * Last updated: 2025-08-18
 * ======================================= */

import '@/styles/globals.scss';
import type { Metadata } from 'next';
import SvgDefs from '@/components/SvgDefs';
import { Noto_Sans_JP, Roboto } from 'next/font/google';
import { Bebas_Neue, Reenie_Beanie } from 'next/font/google';
import { isRealProduction } from '@/lib/env';
import Script from 'next/script';
const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});
const reenineBeanie = Reenie_Beanie({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});
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
    <html
      lang="ja"
      data-scroll-behavior="smooth"
      className={`${notoSans.className} ${roboto.className} ${bebasNeue.className} ${reenineBeanie.className}`}
    >
      <head>
        <meta
          name="format-detection"
          content="telephone=no, address=no, email=no"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-35J5J9835B"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-35J5J9835B');
          `}
        </Script>
      </head>
      <body>
        <SvgDefs />
        {children}
      </body>
    </html>
  );
}
