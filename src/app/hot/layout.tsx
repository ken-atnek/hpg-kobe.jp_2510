/* =======================================
 *神戸ホットポイントグループ Layout
 * URL:src/app/hot/layout.tsx
 * Created: 2025-08-20
 * Last updated: 2025-08-20
 * ======================================= */
import ClientWrapper from '@/app/hot/ClientWrapper'; // 新しく作る
import { Noto_Sans_JP, Roboto } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.scss';
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
export const metadata: Metadata = {
  title: '神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイント',
  description:
    '神戸 風俗のホットポイントグループは２０年以上連続、エリアシェアＮｏ.１の三宮の風俗店（ファッションヘルス）です。神戸でトップクラスの美女達と熱いお時間をお過ごしください',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSans.className} ${roboto.className}`}>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
