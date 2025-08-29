/* =======================================
 *神戸ホットポイント 店舗 タイトル
 * URL: src/components/common/PageTitle.tsx
 * Created: 2025-08-28
 * Last updated: 2025-08-28
 * ======================================= */
'use client';
import styles from '@/styles/components/common/PageTitle.module.scss';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
type PageTitleProps = {
  titleJp: string;
  titleEn: string;
};

const PageTitle = ({ titleJp, titleEn }: PageTitleProps) => {
  const pathname = usePathname();
  const path = pathname.split('/')[1];

  const storeIdMap: Record<string, string> = {
    hot: 'kbHot',
    villa: 'kbVilla',
  };

  const logoHrefMap: Record<string, string> = {
    hot: '#svg_logoKobeHot',
    villa: '#svg_logoVilla',
  };

  const storeId = storeIdMap[path];
  const logoHref = logoHrefMap[path] || '#svg_logoKobeHot';

  return (
    <section className={clsx(styles.containerPageTitle, styles[storeId])}>
      <article>
        <div className={styles.boxH2}>
          <span className={styles.sidebarH2}>{titleEn}</span>
          <h2>{titleJp}</h2>
        </div>
        <div className={styles.itemLogo}>
          <svg
            className={styles.logoSvg}
            width="200"
            height="50"
            aria-hidden="true"
          >
            <use href={logoHref} />
          </svg>
        </div>
      </article>
    </section>
  );
};
export default PageTitle;
