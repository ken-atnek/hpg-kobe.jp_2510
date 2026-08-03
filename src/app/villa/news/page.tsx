/* =======================================
 *ホットポイントヴィラ ニュース
 * URL: src/app/hot/system/page.tsx
 * Created: 2025-09-18
 * Last updated: 2025-09-18
 * ======================================= */
import LayoutWrapperMain from '@/components/Shop/Villa/LayoutWrapperMain';
import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
import styles from '@/styles/components/ShopNews.module.scss';
import PageNews from '@/components/Shop/PageNews';
export const metadata: Metadata = {
  title: 'ニュース｜神戸・三宮の風俗｜ファッションヘルス:ホットポイントヴィラ',
  description: isRealProduction
    ? 'ホットポイントヴィラの料金システムをご案内。コース料金・指名料・延長・割引情報に加え、最寄駅からのアクセスマップも掲載。'
    : undefined,
  ...(isRealProduction && {
    alternates: {
      canonical: '/villa/news/',
    },
  }),
};

export default function VillaNews() {
  return (
    <LayoutWrapperMain>
      <section className={styles.containerNews}>
        <h2 className="pageH2">
          <span>news</span>
          ニュース
        </h2>
        <PageNews jsonPath={`/data/villa/TopNews.json`} />
      </section>
    </LayoutWrapperMain>
  );
}
