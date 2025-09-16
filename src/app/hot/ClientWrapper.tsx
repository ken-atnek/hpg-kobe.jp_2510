'use client';
/* =======================================
 * 神戸ホットポイント セクション共通レイアウト
 * - 対象: /hot/ 以下の全ページ
 * - 機能: フォント適用、共通Footer、年齢認証制御
 * URL: src/app/hot/ClientWrapper.tsx
 * Referenced in: src/app/hot/layout.tsx
 * Created: 2025-08-21
 * Last updated: 2025-08-21
 * ======================================= */
import styles from '@/styles/ShopCommon.module.scss';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import RequireAge from '@/components/RequireAge';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/ShopHeader';
import { navMenu } from '@/data/hot/navMenuData'; // 必要に応じて別店舗に切り替え
import ContainerShopList from '@/components/common/ContainerShopList';
import ShopFooterMenu from '@/components/common/ShopFooterMenu';
import ShopLeft from '@/components/common/ShopLeft';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // デバイス判定
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // レスポンシブ対応のサイドバー表示制御
  const isLeftActive = isMobile
    ? pathname === '/hot/' // スマホは/hot/のみ
    : ['/hot/', '/hot/system/', '/hot/news/'].includes(pathname); // PCは3ページ

  const isAuthPage = pathname.startsWith('/hot/auth');

  return (
    <div
      className={styles.bodyContents}
      style={{ '--baseColor': '#3da3fc' } as React.CSSProperties}
    >
      {isAuthPage ? (
        children
      ) : (
        <RequireAge scope="hot" authPath="/hot/auth">
          <>
            <Header
              title="神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイント"
              navMenu={navMenu}
              selectedNavIds={[
                'navRealTime',
                'navSchedule',
                'navCastList',
                'navPhotoBlog',
              ]}
            />
            <div className={styles.innerMain}>
              <main
                className={`${styles.shopMainContainer} ${
                  isLeftActive ? styles.isLeftActive : ''
                }`}
              >
                {isLeftActive && (
                  <ShopLeft photoDiaryUrl="https://blogparts.cityheaven.net/widget/?shopId=1684&mode=2&type=14&limitedKind=0&num=9&col=3&color=2&fontsize=12" />
                )}
                {children}
              </main>
            </div>
            <ShopFooterMenu navMenu={navMenu} />
            <ContainerShopList />
            <Footer className={styles.shopHotFooter} />
          </>
        </RequireAge>
      )}
    </div>
  );
}
