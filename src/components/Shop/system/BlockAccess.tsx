'use client';
/* =======================================
 *店舗システム  アクセスマップ
 * URL: src/components/Shop/system/BlockAccess.tsx
 * Referenced in: src/components/Shop/Hot/SystemMain.tsx
 * Created: 2025-08-27
 * Last updated: 2025-09-11
 * ======================================= */
import styles from '@/styles/components/BlockAccess.module.scss';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Shops } from '@/data/AreaShopData';
import ExternalLink from '@/components/common/ExternalLink';
import { getShopFromPath, getStoreClass } from '@/lib/shopUtils';

type ShopDetails = {
  googleMapUrl?: string;
  variant?: 'default' | 'systemPage' | 'topPage'; // バリアント追加
};

const BlockAccess = ({ googleMapUrl, variant = 'default' }: ShopDetails) => {
  const pathname = usePathname();
  const shop = getShopFromPath(pathname);
  const activeStoreClass = getStoreClass(shop);

  // shopからstoreIdへのマッピング
  const getStoreId = (shop: string) => {
    const mapping: { [key: string]: string } = {
      hot: 'kbHot',
      villa: 'kbVilla',
      style: 'kbStyle',
    };
    return mapping[shop] || shop;
  };

  const storeId = getStoreId(shop);
  const shopData = Shops.find((s) => s.storeId === storeId);

  // googleMapUrlの優先順位: props > shopData.mapUrl
  const finalGoogleMapUrl = googleMapUrl || shopData?.mapUrl;

  return (
    <div
      className={clsx(
        styles.blockAccess,
        styles[activeStoreClass],
        styles[variant] // バリアントクラスを適用
      )}
    >
      <h2 className="pageH2">
        <span>access</span>
        アクセス／地図
      </h2>
      {shopData ? (
        <div className={styles.wrapText}>
          <address>
            {shopData.post} {shopData.address}
          </address>
          <ExternalLink href={`tel:${shopData.phone}`}>
            tel.{shopData.phone}
          </ExternalLink>
          <p>
            <span>営業時間</span>9:00〜23:59
          </p>
        </div>
      ) : (
        <div className={styles.wrapText}>
          <p>店舗情報が見つかりません</p>
        </div>
      )}
      <div className={styles.wrapMap}>
        {finalGoogleMapUrl ? (
          <iframe
            src={finalGoogleMapUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        ) : (
          <div>
            <p>地図情報が見つかりません</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default BlockAccess;
