/* =======================================
 *神戸ホットポイント ニュース
 * URL: src/app/hot/system/page.tsx
 * Created: 2025-09-11
 * Last updated: 2025-09-11
 * ======================================= */
import LayoutWrapperMain from '@/components/Shop/Style/LayoutWrapperMain';
import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
import styles from '@/styles/components/ShopNews.module.scss';
import PageNews from '@/components/Shop/PageNews';
export const metadata: Metadata = {
  title: 'ニュース｜神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイント',
  description: isRealProduction
    ? '神戸ホットポイントの料金システムをご案内。コース料金・指名料・延長・割引情報に加え、最寄駅からのアクセスマップも掲載。'
    : undefined,
};

export default function HotNews() {
  return (
    <LayoutWrapperMain>
      <section className={styles.containerNews}>
        <h2 className="pageH2">
          <span>news</span>
          ニュース
        </h2>
        <PageNews jsonPath={`/data/hot/TopNews.json`} />
      </section>
    </LayoutWrapperMain>
  );
}
