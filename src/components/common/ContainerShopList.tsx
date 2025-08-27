/* =======================================
 *神戸ホットポイントグループ ショップリンク
 * URL: src/components/common/ContainerShopList.tsx
 * Referenced in: /app/page.tsx
 * Created: 2025-08-19
 * Last updated: 2025-08-19
 * ======================================= */
'use client';
import styles from '@/styles/components/common/ContainerShopList.module.scss';
import { Shops } from '@/data/AreaShopData';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ExternalLink from '@/components/common/ExternalLink';
import clsx from 'clsx';

const ContainerShopList = () => {
  const pathname = usePathname();
  const path = pathname.split('/')[1];

  const storeIdMap: Record<string, string> = {
    hot: 'kbHot',
    villa: 'kbVilla',
  };

  const storeId = storeIdMap[path];

  return (
    <section className={clsx(styles.containerShopList, styles[storeId])}>
      <h2>hotpoint group kobe area</h2>
      <ul>
        {Shops.map((shop) => (
          <li key={shop.storeId}>
            <Link href={shop.url} className={styles.itemLogo}>
              <div
                className={`${styles.itemImage} ${styles[shop.storeId] ?? ''}`}
              >
                <Image
                  src={shop.logo}
                  alt={shop.name}
                  width={120}
                  height={60}
                />
              </div>
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
