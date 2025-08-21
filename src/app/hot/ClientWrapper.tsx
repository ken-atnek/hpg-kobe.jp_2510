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
import { usePathname } from 'next/navigation';
import RequireAge from '@/components/RequireAge';
import Footer from '@/components/common/Footer';
import styles from '@/styles/ShopCommon.module.scss';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/hot/auth');

  return (
    <div className={styles.bodyContents}>
      {isAuthPage ? (
        children
      ) : (
        <RequireAge scope="hot" authPath="/hot/auth">
          <>
            <main className={styles.shopTop}>{children}</main>
            <Footer className={styles.shopHotFooter} />
          </>
        </RequireAge>
      )}
    </div>
  );
}
