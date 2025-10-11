/* =======================================
 *神戸ホットポイント TOPページ
 * URL: src/app/hot/page.tsx
 * Created: 2025-08-20
 * Last updated: 2025-08-20
 * ======================================= */
import Entrance from '@/components/Entrance/Entrance';
import styles from '@/styles/Entrance.module.scss';
import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
export const metadata: Metadata = {
  title: '神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイント',
  description: isRealProduction
    ? '神戸ホットポイントの料金システムをご案内。コース料金・指名料・延長・割引情報に加え、最寄駅からのアクセスマップも掲載。'
    : undefined,
};
export default function VillaEntrance() {
  return (
    <>
      <h1 className={styles.itemH1}>
        ホットポイントヴィラ｜神戸・三宮の風俗｜ファッションヘルス
      </h1>
      <Entrance scope="villa" backPath="/villa/top/" excludeStoreId="kbVilla" />
    </>
  );
}
