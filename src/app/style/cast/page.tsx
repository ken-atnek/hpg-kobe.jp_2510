/* =======================================
 *神戸ホットポイント キャスト一覧
 * URL: src/app/hot/cast/page.tsx
 * Created: 2025-08-28
 * Last updated: 2025-08-28
 * ======================================= */
import LayoutWrapperSub from '@/components/Shop/Style/LayoutWrapperSub';
import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
import PageTitle from '@/components/common/PageTitle';
import CastList from '@/components/CastList';
export const metadata: Metadata = {
  title: '在籍一覧｜神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイント',
  description: isRealProduction
    ? '神戸ホットポイントのリアルタイム出勤情報。出勤中のキャスト、待ち時間、キャンセル待ち状況を即時更新。三宮エリアで最も新鮮な情報をお届け。'
    : undefined,
};
export default function HotCast() {
  return (
    <LayoutWrapperSub>
      <PageTitle titleJp="在籍一覧" titleEn="cast list" />
      <CastList />
    </LayoutWrapperSub>
  );
}
