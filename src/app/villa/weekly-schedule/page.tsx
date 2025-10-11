/* =======================================
 *ホットポイントヴィラ 出勤情報一覧表示
 * URL:src/app/hot/weekly-schedule/page.tsx
 * Created: 2025-09-18
 * Last updated: 2025-09-18
 * ======================================= */
import LayoutWrapperSub from '@/components/Shop/Villa/LayoutWrapperSub';
import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
import PageTitle from '@/components/common/PageTitle';
import CastScheduleByPeriod from '@/components/Shop/schedule/CastScheduleByPeriod';
export const metadata: Metadata = {
  title:
    '出勤情報情報｜神戸・三宮の風俗｜ファッションヘルス:ホットポイントヴィラ',
  description: isRealProduction
    ? 'ホットポイントヴィラの出勤情報。出勤中のキャスト、待ち時間、キャンセル待ち状況を即時更新。三宮エリアで最も新鮮な情報をお届け。'
    : undefined,
};
export default function VillaWeeklySchedule() {
  return (
    <LayoutWrapperSub>
      <PageTitle titleJp="週間出勤表" titleEn="weekly schedule" />
      <CastScheduleByPeriod />
    </LayoutWrapperSub>
  );
}
