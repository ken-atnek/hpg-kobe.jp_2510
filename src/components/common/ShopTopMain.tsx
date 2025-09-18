'use client';
/* =======================================
 *店舗 TOP MAIN
 * URL: src/components/common/ShopTopMain.tsx
 * Created: 2025-08-22
 * Last updated: 2025-09-17
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
      <BlockAccess variant="topPage" />
    </section>
  );
};
export default ShopTopMain;
