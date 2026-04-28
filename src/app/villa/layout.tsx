/* =======================================
 *ホットポイントヴィラ Layout
 * URL:src/app/hot/layout.tsx
 * Created: 2025-09-17
 * Last updated: 2025-10-11
 * ======================================= */
import styles from '@/styles/ShopCommon.module.scss';
export default function VillaRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={styles.bodyContents}
      style={{ '--baseColor': '#c654cb' } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
