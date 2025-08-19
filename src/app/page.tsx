/* =======================================
 *神戸ホットポイントグループ TOPページ
 * URL: /app/page.tsx
 * Created: 2025-08-18
 * Last updated: 2025-08-18
 * ======================================= */

import type { Metadata } from 'next';
import RequireAge from '@/components/RequireAge';
import styles from '@/styles/AreaTop.module.scss';
export const generateMetadata = (): Metadata => {
  return {
    title: '神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイントグループ',
    description:
      '神戸 風俗のホットポイントグループは２０年以上連続、エリアシェアＮｏ.１の三宮の風俗店（ファッションヘルス）です。神戸・三宮でトップクラスの美女達と熱いお時間をお過ごしください。',
  };
};
export default function AreaTop() {
  return (
    <RequireAge scope="global" authPath="/auth">
      <main className={styles.top}>
        <h1 className={styles['top__title']}>エリアTOP</h1>
        {/* 後で News / Topics / Ranking を追加 */}
      </main>
    </RequireAge>
  );
}
