/* =======================================
 *神戸ホットポイントグループ ショップリンク
 * URL: src/components/common/ContainerShopList.tsx
 * Referenced in: /app/page.tsx
 * Created: 2025-08-19
 * Last updated: 2025-09-11
 * ======================================= */
'use client';
import styles from '@/styles/components/common/ContainerShopList.module.scss';
import { Shops } from '@/data/AreaShopData';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ExternalLink from '@/components/common/ExternalLink';
import clsx from 'clsx';
import { getShopFromPath, getStoreClass } from '@/lib/shopUtils';

const ContainerShopList = () => {
  const pathname = usePathname();
  const shop = getShopFromPath(pathname);
  const activeStoreClass = getStoreClass(shop);

  return (
    <section
      className={clsx(styles.containerShopList, styles[activeStoreClass])}
    >
      <h2>hotpoint group kobe area</h2>
      <ul>
        {Shops.map((shop) => (
          <li key={shop.storeId}>
            <Link
              href={shop.url}
              className={clsx(styles.itemLogo, styles[shop.storeId])}
            >
              <svg
                className={styles.logoSvg}
                width="200"
                height="50"
                aria-hidden="true"
              >
                <use href={shop.svgLogo} />
              </svg>
            </Link>
            <p>{shop.name}</p>
            <ExternalLink href={`tel:${shop.phone}`} className={styles.itemTel}>
              {shop.phone}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ContainerShopList;
