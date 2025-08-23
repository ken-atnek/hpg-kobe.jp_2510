/* =======================================
 *神戸ホットポイント TOPページ
 * URL: src/app/hot/page.tsx
 * Created: 2025-08-20
 * Last updated: 2025-08-20
 * ======================================= */
import styles from '@/styles/ShopTop.module.scss';
import ShopLeft from '@/components/common/ShopLeft';
import ShopTopMain from '@/components/common/ShopTopMain';

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
