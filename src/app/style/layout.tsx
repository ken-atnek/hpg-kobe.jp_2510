/* =======================================
 *神戸ホットポイントスタイル
 * URL:src/app/hot/layout.tsx
 * Created: 2025-08-20
 * Last updated: 2025-08-20
 * ======================================= */
import styles from '@/styles/ShopCommon.module.scss';
export default function HotRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={styles.bodyContents}
      style={{ '--baseColor': '#ff558b' } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
/* =======================================
 * 神戸ホットポイントスタイル（閉店対応）
 * URL: src/app/hot/layout.tsx
 *  * Created: 2025-08-20
 * Last updated: 2026-01-15
 * ======================================= */
// import { redirect } from 'next/navigation';

// export default function HotRootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   redirect('/');

//   return <>{children}</>;
// }
