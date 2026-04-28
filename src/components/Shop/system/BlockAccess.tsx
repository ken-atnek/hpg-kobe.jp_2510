'use client';
/* =======================================
 *店舗システム  アクセスマップ
 * URL: src/components/Shop/system/BlockAccess.tsx
 * Referenced in: src/components/Shop/Hot/SystemMain.tsx
 * Created: 2025-08-27
 * Last updated: 2025-09-17
 * ======================================= */
import styles from '@/styles/components/BlockAccess.module.scss';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Shops } from '@/data/AreaShopData';
import ExternalLink from '@/components/common/ExternalLink';
import { getShopFromPath, getStoreClass } from '@/lib/shopUtils';

type ShopDetails = {
  variant?: 'default' | 'systemPage' | 'topPage'; // バリアント追加
};

const BlockAccess = ({ variant = 'default' }: ShopDetails) => {
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

  // shopからGoogleマップURLを取得
  const getGoogleMapUrl = (shop: string) => {
    const mapUrls: { [key: string]: string } = {
      hot: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d205.03222338293656!2d135.19077178090814!3d34.6921737674493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f60.!3m3!1m2!1s0x60008f7b0fbf9cd9%3A0xfe2ecc533108053d!2z56We5oi444Ob44OD44OI44Od44Kk44Oz44OI5pys5bqX!5e0!3m2!1sja!2sjp!4v1750246830699!5m2!1sja!2sjp', // hotのマップURL
      villa:
        'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d820.1184078352044!2d135.191745!3d34.693232!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60008ee49f0cd7ef%3A0xe210857088893020!2z44CSNjUwLTAwMTIg5YW15bqr55yM56We5oi45biC5Lit5aSu5Yy65YyX6ZW354ut6YCa77yR5LiB55uu77yR77yQ4oiS77yR77yTIOODmeOCrOOCueODk-ODqw!5e0!3m2!1sja!2sjp!4v1758098714799!5m2!1sja!2sjp', // villaのマップURL
      style:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5012.697747895469!2d135.18728349355078!3d34.69228700195405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60008ee3503c6ff3%3A0x6f768caa6c53d6a0!2z44CSNjUwLTAwMTIg5YW15bqr55yM56We5oi45biC5Lit5aSu5Yy65YyX6ZW354ut6YCa77yS5LiB55uu77yR4oiS77yUIDFm!5e0!3m2!1sja!2sjp!4v1777373762643!5m2!1sja!2sjp', // villaのマップURL
    };
    return mapUrls[shop];
  };

  const storeId = getStoreId(shop);
  const shopData = Shops.find((s) => s.storeId === storeId);
  const googleMapUrl = getGoogleMapUrl(shop);

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
        {googleMapUrl ? (
          <iframe
            src={googleMapUrl}
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
