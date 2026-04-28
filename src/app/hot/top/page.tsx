/* =======================================
 *神戸ホットポイント TOPページ
 * URL: src/app/hot/page.tsx
 * Created: 2025-08-20
 * Last updated: 2025-08-20
 * ======================================= */
import ShopTopMain from '@/components/common/ShopTopMain';
import LayoutWrapperMain from '@/components/Shop/Hot/LayoutWrapperMain';
import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
export const metadata: Metadata = {
  title: '神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイント',
  description: isRealProduction
    ? '神戸ホットポイントの料金システムをご案内。コース料金・指名料・延長・割引情報に加え、最寄駅からのアクセスマップも掲載。'
    : undefined,
};
export default function HotTop() {
  return (
    <LayoutWrapperMain>
      <ShopTopMain />
    </LayoutWrapperMain>
  );
}
