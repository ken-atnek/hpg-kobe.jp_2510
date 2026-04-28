/* =======================================
 * ホットポイントヴィラ メインレイアウト
 * URL: src/components/Shop/Villa/LayoutWrapperMain.tsx
 * Referenced in: src/app/hot/layout.tsx
 * Created: 2025-10-11
 * Last updated: 2025-10-11
 * ======================================= */
import styles from '@/styles/ShopCommon.module.scss';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/ShopHeader';
import ContainerShopList from '@/components/common/ContainerShopList';
import ShopFooterMenu from '@/components/common/ShopFooterMenu';
import ShopLeft from '@/components/common/ShopLeft';
import { navMenu } from '@/data/villa/navMenuData';
export default function LayoutWrapperMain({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeStoreClass = 'kbVilla';
  return (
    <>
      <Header
        title="神戸・三宮の風俗｜ファッションヘルス:ホットポイントヴィラ"
        navMenu={navMenu}
        selectedNavIds={[
          'navRealTime',
          'navSchedule',
          'navCastList',
          'navPhotoBlog',
        ]}
      />
      <div className={styles.innerMain}>
        <main className={styles.shopMainContainer}>
          <ShopLeft
            shop="villa"
            photoDiaryUrl="https://blogparts.cityheaven.net/widget/?shopId=1800&mode=2&type=14&limitedKind=0&num=9&col=3&color=2&fontsize=12"
          />
          {children}
        </main>
      </div>
      <ShopFooterMenu navMenu={navMenu} />
      <ContainerShopList activeStoreClass={activeStoreClass} />
      <Footer />
    </>
  );
}
