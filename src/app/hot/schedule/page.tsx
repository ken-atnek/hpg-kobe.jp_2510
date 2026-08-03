/* =======================================
 *神戸ホットポイント 出勤情報
 * URL: src/app/hot/schedule/page.tsx
 * Created: 2025-08-30
 * Last updated: 2025-08-30
 * ======================================= */
import LayoutWrapperSub from '@/components/Shop/Hot/LayoutWrapperSub';
import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
import PageTitle from '@/components/common/PageTitle';
import CastScheduleByDay from '@/components/Shop/schedule/CastScheduleByDay';

export const metadata: Metadata = {
  title: '出勤情報｜神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイント',
  description: isRealProduction
    ? '神戸ホットポイントの出勤情報。出勤中のキャスト、待ち時間、キャンセル待ち状況を即時更新。三宮エリアで最も新鮮な情報をお届け。'
    : undefined,
  ...(isRealProduction && {
    alternates: {
      canonical: '/hot/schedule/',
    },
  }),
};
export default function HotSchedule() {
  return (
    <LayoutWrapperSub>
      <PageTitle titleJp="出勤情報" titleEn="schedule" />
      <CastScheduleByDay />
    </LayoutWrapperSub>
  );
}
