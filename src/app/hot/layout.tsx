/* =======================================
 *神戸ホットポイントホットポイント
 * URL:src/app/hot/layout.tsx
 * Created: 2025-08-20
 * Last updated: 2025-08-20
 * ======================================= */
import styles from '@/styles/ShopCommon.module.scss';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={styles.bodyContents}
      style={{ '--baseColor': '#3da3fc' } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
