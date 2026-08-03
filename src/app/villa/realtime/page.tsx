/* =======================================
 *ホットポイントヴィラ リアルタイムページ
 * URL: src/app/hot/realtime/page.tsx
 * Created: 2025-09-18
 * Last updated: 2025-09-18
 * ======================================= */
import LayoutWrapperSub from '@/components/Shop/Villa/LayoutWrapperSub';
import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
import PageTitle from '@/components/common/PageTitle';
import ContainerRealtime from '@/components/Shop/ContainerRealTime';
export const metadata: Metadata = {
  title:
    'リアルタイム情報｜神戸・三宮の風俗｜ファッションヘルス:ホットポイントヴィラ',
  description: isRealProduction
    ? 'ホットポイントヴィラのリアルタイム出勤情報。出勤中のキャスト、待ち時間、キャンセル待ち状況を即時更新。三宮エリアで最も新鮮な情報をお届け。'
    : undefined,
  ...(isRealProduction && {
    alternates: {
      canonical: '/villa/realtime/',
    },
  }),
};
export default function VillaRealTime() {
  return (
    <LayoutWrapperSub>
      <PageTitle titleJp="リアルタイム" titleEn="realtime" />
      <ContainerRealtime />
    </LayoutWrapperSub>
  );
}
