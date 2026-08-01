/* =======================================
 *ホットポイントヴィラ 料金ページ
 * URL: src/app/hot/system/page.tsx
 * Created: 2025-09-17
 * Last updated: 2025-09-17
 * ======================================= */
import LayoutWrapperMain from '@/components/Shop/Villa/LayoutWrapperMain';
import SystemMain from '@/components/Shop/Villa/SystemMain';
import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
export const metadata: Metadata = {
  title:
    '料金システム｜神戸・三宮の風俗｜ファッションヘルス:ホットポイントヴィラ',
  description: isRealProduction
    ? 'ホットポイントヴィラの料金システムをご案内。コース料金・指名料・延長・割引情報に加え、最寄駅からのアクセスマップも掲載。'
    : undefined,
  ...(isRealProduction && {
    alternates: {
      canonical: '/villa/system/',
    },
  }),
};
export default function VillaSystem() {
  return (
    <LayoutWrapperMain>
      <SystemMain />
    </LayoutWrapperMain>
  );
}
