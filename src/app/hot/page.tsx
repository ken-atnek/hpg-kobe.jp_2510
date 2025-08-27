/* =======================================
 *神戸ホットポイント TOPページ
 * URL: src/app/hot/page.tsx
 * Created: 2025-08-20
 * Last updated: 2025-08-20
 * ======================================= */
import styles from '@/styles/ShopTop.module.scss';
import ShopLeft from '@/components/common/ShopLeft';
import ShopTopMain from '@/components/common/ShopTopMain';
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
    <>
      <article className={styles.containerTop}>
        <ShopLeft
          logoUrl="#svg_logoKobeHot"
          photoDiaryUrl="https://blogparts.cityheaven.net/widget/?shopId=4973&mode=2&type=14&limitedKind=0&num=12&col=3&color=6&fontsize=14"
        />
        <ShopTopMain />
      </article>
    </>
  );
}
