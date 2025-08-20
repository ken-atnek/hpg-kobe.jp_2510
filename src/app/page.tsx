/* =======================================
 *神戸ホットポイントグループ TOPページ
 * URL: /app/page.tsx
 * Created: 2025-08-18
 * Last updated: 2025-08-18
 * ======================================= */

import type { Metadata } from 'next';
import RequireAge from '@/components/RequireAge';
import styles from '@/styles/AreaTop.module.scss';
import Footer from '@/components/common/Footer';
import GroupLogo from '@/assets/images/logo/group.webp';
import Image from 'next/image';
import BlockTelop from '@/components/AreaTop/BlockTelop';
import BlockShopList from '@/components/AreaTop/BlockShopList';
import BlockPickUp from '@/components/AreaTop/BlockPickUp';
import AreaLeftBannerGroup from '@/components/common/AreaLeftBannerGroup';

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
      <main className={styles.areaTop}>
        <h1>神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイントグループ</h1>
        <section className={styles.containerHeadTitle}>
          <Image src={GroupLogo} alt="hot point group" />
          <p>神戸ホットポイントグループ</p>
        </section>
        <section className={styles.containerPickUp}>
          <BlockPickUp />
        </section>
        <section className={styles.containerTelop}>
          <h2>news</h2>
          <BlockTelop />
        </section>
        <section className={styles.containerShopList}>
          <h2>hotpoint group kobe area</h2>
          <BlockShopList />
        </section>
        <section className={styles.containerContents}>
          <article>
            <div className={styles.boxLeftBan}>
              <h2>
                <span>topics</span>トピックス
              </h2>
              <AreaLeftBannerGroup
                jsonPath="/data/area-top/areaTopLeftBanGroup.json"
                title="kobe area event"
                className={styles.boxGroup}
              />
              <AreaLeftBannerGroup
                jsonPath="/data/area-top/areaTopLeftBanHot.json"
                title="kobe hotpoint event"
                className={styles.boxHot}
              />
              <AreaLeftBannerGroup
                jsonPath="/data/area-top/areaTopLeftBanVilla.json"
                title="hotpoint villa event"
                className={styles.boxVilla}
              />
              <AreaLeftBannerGroup
                jsonPath="/data/area-top/areaTopLeftBanRecruit.json"
                title="recruit"
                className={styles.boxRecruit}
              />
            </div>
            <div className={styles.boxMainContents}></div>
          </article>
        </section>
      </main>
      <Footer className={styles.areaFooter} />
    </RequireAge>
  );
}
