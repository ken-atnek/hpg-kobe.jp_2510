/* =======================================
 *神戸ホットポイント 料金ページ
 * URL: src/app/hot/system/page.tsx
 * Created: 2025-08-27
 * Last updated: 2025-08-27
 * ======================================= */
import LayoutWrapperMain from '@/components/Shop/Style/LayoutWrapperMain';
import SystemMain from '@/components/Shop/Hot/SystemMain';
import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
export const metadata: Metadata = {
  title:
    '料金システム｜神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイント',
  description: isRealProduction
    ? '神戸ホットポイントの料金システムをご案内。コース料金・指名料・延長・割引情報に加え、最寄駅からのアクセスマップも掲載。'
    : undefined,
  ...(isRealProduction && {
    alternates: {
      canonical: '/style/system/',
    },
  }),
};
export default function HotSystem() {
  return (
    <LayoutWrapperMain>
      <SystemMain />
    </LayoutWrapperMain>
  );
}
