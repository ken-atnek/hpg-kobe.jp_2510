/* =======================================
 *店舗 TOP MAIN
 * URL: src/components/common/ShopTopMain.tsx
 * Created: 2025-08-22
 * Last updated: 2025-08-22
 * ======================================= */
import TopPickUp from '@/components/Shop/TopPickUp';
import styles from '@/styles/ShopCommon.module.scss';

const ShopTopMain = () => {
  return (
    <section className={styles.containerShopTopMain}>
      <TopPickUp />
    </section>
  );
};
export default ShopTopMain;
