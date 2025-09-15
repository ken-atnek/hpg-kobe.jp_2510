'use client';
/* =======================================
 *店舗 TOP MAIN
 * URL: src/components/common/ShopTopMain.tsx
 * Created: 2025-08-22
 * Last updated: 2025-09-11
 * ======================================= */
import styles from '@/styles/ShopCommon.module.scss';
import castSlideStyles from '@/styles/components/ShopTopCastSlide.module.scss';
import TopPickUp from '@/components/Shop/TopPickUp';
import CastSlide from '@/components/Shop/TopCastSlide';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import CastRanking from '@/components/Shop/TopCastRanking';
import TopSlideBan from '@/components/Shop/TopSlideBan';
import BannerGroup from '@/components/common/BannerGroup';
import ShopNews from '@/components/Shop/TopNews';
import { getShopFromPath, getStoreClass } from '@/lib/shopUtils';
import BlockAccess from '@/components/Shop/system/BlockAccess';
const ShopTopMain = () => {
  const pathname = usePathname();
  const shop = getShopFromPath(pathname);
  const activeStoreClass = getStoreClass(shop);

  // 🔽 JSON パスを店舗別に切り替え
  const jsonBasePath = `/data/${shop}`;
  const jsonPathBanMain = `${jsonBasePath}/TopMainBan01.json`;

  return (
    <section
      className={clsx(styles.containerShopTopMain, styles[activeStoreClass])}
    >
      <TopPickUp />
      <CastSlide
        titleJp="新人紹介"
        titleEn="new face"
        titleEnSub="cast"
        classNameStyles={castSlideStyles.newFace}
        jsonPath={`/data/${shop}/TopNewFace.json`}
      />
      <ShopNews
        titleJp="新着情報・トピックス"
        titleEn="news"
        jsonPath={`/data/${shop}/TopNews.json`}
      />
      <CastRanking
        titleJp="キャストランキング"
        titleEn="cast"
        titleEnSub="ranking"
        jsonPath={`/data/${shop}/TopRanking.json`}
      />
      <TopSlideBan />
      <BannerGroup jsonPath={jsonPathBanMain} className={styles.boxBanMain} />
      <BlockAccess
        variant="topPage"
        googleMapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d205.03222338293656!2d135.19077178090814!3d34.6921737674493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f60.!3m3!1m2!1s0x60008f7b0fbf9cd9%3A0xfe2ecc533108053d!2z56We5oi444Ob44OD44OI44Od44Kk44Oz44OI5pys5bqX!5e0!3m2!1sja!2sjp!4v1750246830699!5m2!1sja!2sjp"
      />
    </section>
  );
};
export default ShopTopMain;
