'use client';
/* =======================================
 *店舗システム  アクセスマップ
 * URL: src/components/Shop/system/BlockAccess.tsx
 * Referenced in: src/components/Shop/Hot/SystemMain.tsx
 * Created: 2025-08-27
 * Last updated: 2025-08-27
 * ======================================= */
import styles from '@/styles/ShopSystem.module.scss';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Shops } from '@/data/AreaShopData';
import ExternalLink from '@/components/common/ExternalLink';
type ShopDetails = {
  mapUrl?: string;
};

const BlockAccess = ({ mapUrl }: ShopDetails) => {
  const pathname = usePathname();
  const path = pathname.split('/')[1];

  const storeIdMap: Record<string, string> = {
    hot: 'kbHot',
    villa: 'kbVilla',
  };
  const storeId = storeIdMap[path];
  const shopData = Shops.find((shop) => shop.storeId === storeId);

  return (
    <div className={clsx(styles.blockAccess, styles[storeId])}>
      <h2 className="pageH2">
        <span>access</span>
        アクセス／地図
      </h2>
      {shopData && (
        <div className={styles.wrapText}>
          <address>{shopData.address}</address>
          <ExternalLink href={`tel:${shopData.phone}`}>
            tel.{shopData.phone}
          </ExternalLink>
          <p>
            <span>営業時間</span>9:00〜23:59
          </p>
        </div>
      )}
      <div className={styles.wrapMap}>
        <iframe
          src={mapUrl}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};
export default BlockAccess;
