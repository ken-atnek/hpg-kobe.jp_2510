/* =======================================
 *神戸ホットポイント 料金ページ
 * URL: src/app/hot/page.tsx
 * Created: 2025-08-27
 * Last updated: 2025-08-27
 * ======================================= */
import styles from '@/styles/ShopTop.module.scss';
import ShopLeft from '@/components/common/ShopLeft';
import SystemMain from '@/components/Shop/Hot/SystemMain';

export default function HotSystem() {
  return (
    <>
      <article className={styles.containerTop}>
        <ShopLeft
          logoUrl="#svg_logoKobeHot"
          photoDiaryUrl="https://blogparts.cityheaven.net/widget/?shopId=4973&mode=2&type=14&limitedKind=0&num=12&col=3&color=6&fontsize=14"
        />
        <SystemMain />
      </article>
    </>
  );
}
