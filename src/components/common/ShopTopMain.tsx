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

const ShopTopMain = () => {
  const pathname = usePathname();
  const store = pathname.split('/')[1];
  return (
    <section className={styles.containerShopTopMain}>
      <TopPickUp />

      <CastSlide
        titleJp="新人紹介"
        titleEn="new face"
        titleEnSub="cast"
        jsonPath={`/data/${store}/TopNewFace.json`}
      />
      <CastRanking
        titleJp="キャストランキング"
        titleEn="cast"
        titleEnSub="ranking"
        jsonPath={`/data/${store}/TopRanking.json`}
      />
    </section>
  );
};
export default ShopTopMain;
