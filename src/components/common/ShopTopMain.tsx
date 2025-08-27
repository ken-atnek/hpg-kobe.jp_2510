'use client';
/* =======================================
 *店舗 TOP MAIN
 * URL: src/components/common/ShopTopMain.tsx
 * Created: 2025-08-22
 * Last updated: 2025-08-22
 * ======================================= */
import styles from '@/styles/ShopCommon.module.scss';
import TopPickUp from '@/components/Shop/TopPickUp';
import CastSlide from '@/components/Shop/TopCastSlide';
import { usePathname } from 'next/navigation';
import CastRanking from '@/components/Shop/TopCastRanking';
import TopSlideBan from '@/components/Shop/TopSlideBan';
import BannerGroup from '@/components/common/BannerGroup';
import ShopNews from '@/components/Shop/TopNews';
const ShopTopMain = () => {
  const pathname = usePathname();
  const store = pathname.split('/')[1];

  // 🔽 JSON パスを店舗別に切り替え
  const jsonBasePath = `/data/${store}`;
  const jsonPathBanMain = `${jsonBasePath}/TopMainBan01.json`;

  return (
    <section className={styles.containerShopTopMain}>
      <TopPickUp />
      <CastSlide
        titleJp="新人紹介"
        titleEn="new face"
        titleEnSub="cast"
        jsonPath={`/data/${store}/TopNewFace.json`}
      />
      <ShopNews
        titleJp="新着情報・トピックス"
        titleEn="news"
        jsonPath={`/data/${store}/TopNews.json`}
      />
      <CastRanking
        titleJp="キャストランキング"
        titleEn="cast"
        titleEnSub="ranking"
        jsonPath={`/data/${store}/TopRanking.json`}
      />
      <TopSlideBan />
      <BannerGroup jsonPath={jsonPathBanMain} className={styles.boxBanMain} />
    </section>
  );
};
export default ShopTopMain;
