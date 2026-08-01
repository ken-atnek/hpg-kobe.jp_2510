/* =======================================
 *神戸ホットポイントグループ Layout
 * URL:src/app/layout.tsx
 * Created: 2025-08-18
 * Last updated: 2025-08-18
 * ======================================= */

import '@/styles/globals.scss';
import type { Metadata, Viewport } from 'next';
import SvgDefs from '@/components/SvgDefs';
import { Noto_Sans_JP, Roboto } from 'next/font/google';
import { Bebas_Neue, Reenie_Beanie } from 'next/font/google';
import { isRealProduction, metadataBase } from '@/lib/env';
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

const siteTitle = '神戸ホットポイントグループ';
const siteName = '神戸ホットポイントグループ';
const siteDescription =
  '神戸ホットポイント、神戸ヴィラ、神戸スタイルのキャスト情報、出勤情報、リアルタイム情報を掲載する公式サイトです。';

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  ...(isRealProduction && {
    metadataBase,
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      siteName,
      locale: 'ja_JP',
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
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
