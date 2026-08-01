/* =======================================
 *神戸ホットポイントグループ エントランス
 * URL: /app/page.tsx
 * Created: 2025-08-18
 * Last updated: 2025-10-11
 * ======================================= */
import styles from '@/styles/Entrance.module.scss';
import type { Metadata } from 'next';
import Entrance from '@/components/Entrance/Entrance';
import { isRealProduction } from '@/lib/env';

export const generateMetadata = (): Metadata => {
  return {
    title: '神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイントグループ',
    description: isRealProduction
      ? '神戸 風俗のホットポイントグループは２０年以上連続、エリアシェアＮｏ.１の三宮の風俗店（ファッションヘルス）です。神戸・三宮でトップクラスの美女達と熱いお時間をお過ごしください。'
      : undefined,
    ...(isRealProduction && {
      alternates: {
        canonical: '/',
      },
    }),
  };
};

export default function AreaEntrance() {
  return (
    <>
      <h1 className={styles.itemH1}>
        神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイントグループ
      </h1>
      <Entrance scope="group" backPath="/top/" />
    </>
  );
}
