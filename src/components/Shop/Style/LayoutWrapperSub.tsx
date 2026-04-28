/* =======================================
 * ホットポイント スタイル サブレイアウト
 * URL: src/components/Shop/Style/LayoutWrapperSub.tsx
 * Created: 2026-04-28
 * Last updated: 2026-04-28
 * ======================================= */
import styles from '@/styles/ShopCommon.module.scss';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/ShopHeader';
import ContainerShopList from '@/components/common/ContainerShopList';
import ShopFooterMenu from '@/components/common/ShopFooterMenu';
import { navMenu } from '@/data/style/navMenuData';
export default function LayoutWrapperSub({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeStoreClass = 'kbStyle';
  return (
    <>
      <Header
        title="神戸・三宮の風俗｜ファッションヘルス:ホットポイント スタイル"
        navMenu={navMenu}
        selectedNavIds={[
          'navRealTime',
          'navSchedule',
          'navCastList',
          'navPhotoBlog',
        ]}
      />
      <div className={styles.innerMain}>
        <main className={styles.shopSubContainer}>{children}</main>
      </div>
      <ShopFooterMenu navMenu={navMenu} />
      <ContainerShopList activeStoreClass={activeStoreClass} />
      <Footer />
    </>
  );
}
