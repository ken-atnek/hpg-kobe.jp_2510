/* =======================================
 *ホットポイントヴィラ 出勤情報
 * URL: src/app/hot/schedule/page.tsx
 * Created: 2025-09-18
 * Last updated: 2025-10-11
 * ======================================= */
import LayoutWrapperSub from '@/components/Shop/Villa/LayoutWrapperSub';
import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
import PageTitle from '@/components/common/PageTitle';
import CastScheduleByDay from '@/components/Shop/schedule/CastScheduleByDay';

export const metadata: Metadata = {
  title: '出勤情報｜神戸・三宮の風俗｜ファッションヘルス:ホットポイントヴィラ',
  description: isRealProduction
    ? 'ホットポイントヴィラの出勤情報。出勤中のキャスト、待ち時間、キャンセル待ち状況を即時更新。三宮エリアで最も新鮮な情報をお届け。'
    : undefined,
  ...(isRealProduction && {
    alternates: {
      canonical: '/villa/schedule/',
    },
  }),
};
export default function VillaSchedule() {
  return (
    <LayoutWrapperSub>
      <PageTitle titleJp="出勤情報" titleEn="schedule" />
      <CastScheduleByDay />
    </LayoutWrapperSub>
  );
}
