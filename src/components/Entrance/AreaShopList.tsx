/* =======================================
 *神戸ホットポイントグループ 年齢認証 店舗リスト
 * URL: src/components/Entrance/AreaShopList.tsx
 * Referenced in: src/components/Entrance/Entrance.tsx
 * Created: 2025-08-19
 * Last updated: 2025-08-19
 * ======================================= */
import styles from '@/styles/Entrance.module.scss';
import { Shops } from '@/data/AreaShopData';
import Link from 'next/link';

const EntranceAreaShopList = ({
  excludeStoreId,
}: {
  excludeStoreId?: string;
}) => {
  return (
    <ul className={styles.listAreaShop}>
      {Shops.filter((shop) => shop.storeId !== excludeStoreId).map((shop) => (
        <li
          key={shop.storeId}
          className={styles[shop.storeId as keyof typeof styles]}
        >
          <Link href={shop.url}></Link>
          <svg
            className={styles.logoSvg}
            width="200"
            height="50"
            aria-hidden="true"
          >
            <use href={shop.svgLogo} />
          </svg>
          <h4 style={{ color: shop.shopColor }}>{shop.name}</h4>
        </li>
      ))}
    </ul>
  );
};
export default EntranceAreaShopList;
