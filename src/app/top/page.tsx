/* =======================================
 *神戸ホットポイントグループ TOPページ
 * URL: /app/page.tsx
 * Created: 2025-08-18
 * Last updated: 2025-08-18
 * ======================================= */

import styles from '@/styles/AreaTop.module.scss';
import type { Metadata } from 'next';
import Footer from '@/components/common/Footer';
import GroupLogo from '@/assets/images/logo/group.webp';
import Image from 'next/image';
import BlockTelop from '@/components/AreaTop/BlockTelop';
import BlockPickUp from '@/components/AreaTop/BlockPickUp';
import BannerGroup from '@/components/common/BannerGroup';
import BlockNewFace from '@/components/AreaTop/BlockNewFace';
import ContainerShopList from '@/components/common/ContainerShopList';
import BlockRealTIme from '@/components/AreaTop/BlockRealTIme';
import { isRealProduction } from '@/lib/env';

export const generateMetadata = (): Metadata => {
  return {
    title: '神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイントグループ',
    description: isRealProduction
      ? '神戸 風俗のホットポイントグループは２０年以上連続、エリアシェアＮｏ.１の三宮の風俗店（ファッションヘルス）です。神戸・三宮でトップクラスの美女達と熱いお時間をお過ごしください。'
      : undefined,
  };
};

export default function AreaTop() {
  // 🔽 タイムスタンプでキャッシュバスティング
  const timestamp = Date.now();

  return (
    <>
      <main className={styles.areaTop}>
        <h1>神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイントグループ</h1>
        <section className={styles.containerHeadTitle}>
          <Image src={GroupLogo} alt="hot point group" priority />
          <p>神戸ホットポイントグループ</p>
        </section>
        <section className={styles.containerPickUp}>
          <BlockPickUp />
        </section>
        <section className={styles.containerTelop}>
          <h2>news</h2>
          <BlockTelop />
        </section>
        <ContainerShopList />
        <section className={styles.containerContents}>
          <article className={styles.innerContainerContents}>
            <div className={styles.boxLeftBan}>
              <h2 className={styles.h2Topics}>
                <span>topics</span>トピックス
              </h2>
              <BannerGroup
                jsonPath={`/data/area-top/areaTopLeftBanGroup.json?t=${timestamp}`}
                title="kobe area event"
                className={styles.boxGroup}
              />
              <BannerGroup
                jsonPath={`/data/area-top/areaTopLeftBanHot.json?t=${timestamp}`}
                title="kobe hotpoint event"
                className={styles.boxHot}
              />
              <BannerGroup
                jsonPath={`/data/area-top/areaTopLeftBanVilla.json?t=${timestamp}`}
                title="hotpoint villa event"
                className={styles.boxVilla}
              />
              <BannerGroup
                jsonPath={`/data/area-top/areaTopLeftBanRecruit.json?t=${timestamp}`}
                title="recruit"
                className={styles.boxRecruit}
              />
            </div>
            <div className={styles.boxMainContents}>
              <BannerGroup
                jsonPath={`/data/area-top/areaTopMainHead.json?t=${timestamp}`}
                className={styles.wrapMainBanHead}
              />
              <div className={styles.wrapNewFace}>
                <h2 className={styles.itemH2}>
                  <span>new face</span>
                  新人情報
                </h2>
                <BlockNewFace />
              </div>
              <div className={styles.wrapRealTime}>
                <h2 className={styles.itemH2}>
                  <span>real time</span>
                  リアルタイム情報
                </h2>
                <div className={styles.contentsRealtime}>
                  <BlockRealTIme />
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>
      <Footer className={styles.areaFooter} />
    </>
  );
}
