/* =======================================
 *神戸ホットポイントグループ 年齢認証 店舗リスト
 * URL: src/components/Entrance/AreaShopList.tsx
 * Referenced in: src/components/Entrance/Entrance.tsx
 * Created: 2025-08-19
 * Last updated: 2025-08-19
 * ======================================= */
import styles from '@/styles/Entrance.module.scss';
import { Shops } from '@/data/AreaShopData';
import Image from 'next/image';
import Link from 'next/link';

const EntranceAreaShopList = () => {
  return (
    <ul className={styles.listAreaShop}>
      {Shops.map((shop) => (
        <li key={shop.storeId}>
          <Link href={shop.url}></Link>
          <Image src={shop.logo} alt={shop.name} width={120} height={60} />
          <h4 style={{ color: shop.shopColor }}>{shop.name}</h4>
        </li>
      ))}
    </ul>
  );
};
export default EntranceAreaShopList;
