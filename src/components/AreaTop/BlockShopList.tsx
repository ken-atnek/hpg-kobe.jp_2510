/* =======================================
 *神戸ホットポイントグループ ショップリンク
 * URL: src/components/AreaTop/BlockShopList.tsx
 * Referenced in: /app/page.tsx
 * Created: 2025-08-19
 * Last updated: 2025-08-19
 * ======================================= */

import styles from '@/styles/AreaTop.module.scss';
import { Shops } from '@/data/AreaShopData';
import Image from 'next/image';
import Link from 'next/link';
import ExternalLink from '@/components/common/ExternalLink';
const BlockShopList = () => {
  return (
    <ul className={styles.blockShopList}>
      {Shops.map((shop) => (
        <li key={shop.storeId}>
          <Link href={shop.url} className={styles.itemLogo}>
            <div
              className={`${styles.itemImage} ${styles[shop.storeId] ?? ''}`}
            >
              <Image src={shop.logo} alt={shop.name} width={120} height={60} />
            </div>
          </Link>
          <p>{shop.name}</p>
          <ExternalLink href={`tel:${shop.phone}`} className={styles.itemTel}>
            {shop.phone}
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
};

export default BlockShopList;
